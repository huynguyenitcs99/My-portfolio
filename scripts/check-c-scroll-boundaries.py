"""Check actual mid-scroll reading boundaries, including reverse and short viewports."""
import argparse
import json
from pathlib import Path
from playwright.sync_api import sync_playwright

parser = argparse.ArgumentParser()
parser.add_argument("--out", default="/tmp/huy-c-scroll-boundaries")
parser.add_argument("--quick", action="store_true")
args = parser.parse_args()
out = Path(args.out)
out.mkdir(parents=True, exist_ok=True)

READ = r"""() => {
  const box = e => { const b=e.getBoundingClientRect(); return {x:b.x,y:b.y,right:b.right,bottom:b.bottom,width:b.width,height:b.height}; };
  const opacity = e => { let value=1; for(let p=e;p;p=p.parentElement) {const s=getComputedStyle(p); if(s.display==='none'||s.visibility==='hidden')return 0; value*=Number(s.opacity);} return value; };
  const cards=[...document.querySelectorAll('.orbit-project')].map(e=>({name:e.getAttribute('aria-label'),box:box(e),opacity:opacity(e),inert:e.inert,workflow:Number(getComputedStyle(e).getPropertyValue('--workflow'))}));
  const texts=[...document.querySelectorAll('.chapter-copy > h2,.chapter-copy > .chapter-description,.chapter-copy > .chapter-result,.chapter-copy > .contribution,.chapter-copy > .inline-link,#engineering .section-intro h2')].map(e=>({section:e.closest('section').id,text:e.textContent.trim(),box:box(e),opacity:opacity(e)})).filter(t=>t.opacity>.2&&t.box.y<innerHeight&&t.box.bottom>0);
  const collisions=[];
  for(const card of cards.filter(c=>c.opacity>.2)) for(const text of texts) {
    const width=Math.max(0,Math.min(card.box.right,text.box.right)-Math.max(card.box.x,text.box.x));
    const height=Math.max(0,Math.min(card.box.bottom,text.box.bottom)-Math.max(card.box.y,text.box.y));
    if(width*height>50)collisions.push({card:card.name,section:text.section,text:text.text,area:Math.round(width*height),cardBox:card.box,textBox:text.box});
  }
  return {scrollY,layout:document.querySelector('.cosmic-experience').dataset.storyLayout,overflow:document.documentElement.scrollWidth>innerWidth,cards,texts,collisions};
}"""

report = {"errors": [], "frames": [], "failures": [], "pointerTargets": []}
with sync_playwright() as p:
    browser = p.chromium.launch(executable_path="/usr/bin/chromium", args=["--no-sandbox", "--disable-dev-shm-usage", "--enable-webgl", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"])
    profiles = [("desktop", 1536, 1024, "no-preference")]
    if not args.quick:
        profiles += [("laptop", 1440, 900, "no-preference"), ("compact", 1280, 800, "no-preference"), ("short", 1280, 650, "no-preference"), ("mobile", 390, 900, "no-preference"), ("reduced", 1536, 1024, "reduce")]
    for label, width, height, motion in profiles:
        page = browser.new_page(viewport={"width": width, "height": height}, reduced_motion=motion)
        page.on("pageerror", lambda error: report["errors"].append(str(error)))
        page.goto("http://127.0.0.1:3020", wait_until="networkidle")
        pause = page.get_by_role("button", name="Pause ambient motion")
        if pause.count():
            pause.click()
        page.evaluate("document.activeElement.blur()")
        if label == "desktop":
            target = page.get_by_role("button", name="Preview Daily Smith").evaluate("e=>{const b=e.getBoundingClientRect();const hit=document.elementFromPoint(b.x+b.width/2,b.y+b.height/2);return {hitClass:hit?.className,project:hit?.closest('.orbit-project')?.getAttribute('aria-label')??null};}")
            report["pointerTargets"].append(target)
            assert target["project"] == "Preview Daily Smith", f"Invisible reading copy intercepts project pointer: {target}"
        starts = page.locator("section[id]").evaluate_all("es=>Object.fromEntries(es.map(e=>[e.id,e.getBoundingClientRect().top+scrollY]))")
        points = [
            ("daily-before", max(0, starts["daily-smith"] - .3 * height)),
            ("daily-reading", starts["daily-smith"] + .35 * height),
            ("daily-rapid-reverse", max(0, starts["daily-smith"] - .75 * height)),
            ("creative-reading", starts["creative-studio"] + .65 * height),
            ("creative-rapid-reverse", starts["creative-studio"] - .45 * height),
            ("slide-reading", starts["slide-design"] + .65 * height),
            ("slide-rapid-reverse", starts["slide-design"] - .3 * height),
            ("engineering-arrival", starts["engineering"] - .75 * height),
        ]
        if not args.quick:
            points = []
            for slug in ["daily-smith", "creative-studio", "slide-design", "engineering"]:
                for offset in [-.75, -.45, -.3, -.02, .08, .35, .65]:
                    points.append((f"{slug}-{offset}", max(0, starts[slug] + offset * height)))
            points += list(reversed(points[::4]))
        for name, y in points:
            page.evaluate("y=>scrollTo({top:y,behavior:'instant'})", y)
            page.wait_for_timeout(100)
            state = page.evaluate(READ)
            state.update({"profile": label, "sample": name})
            report["frames"].append(state)
            if state["collisions"] or state["overflow"]:
                report["failures"].append({"profile": label, "sample": name, "scrollY": state["scrollY"], "collisions": state["collisions"], "overflow": state["overflow"]})
                if len(report["failures"]) <= 6:
                    page.screenshot(path=str(out / f"{label}-{int(state['scrollY'])}-collision.png"))
        if not args.quick:
            page.evaluate("scrollTo({top:0,behavior:'instant'})")
            page.wait_for_timeout(100)
            page.screenshot(path=str(out / f"{label}-arrival.png"))
            if label == "short":
                assert page.locator('.chapter-mobile-art').first.is_visible(), "Short viewport has no readable native artwork fallback"
        page.close()
    browser.close()

(out / "report.json").write_text(json.dumps(report, indent=2) + "\n")
print(json.dumps({"frames": len(report["frames"]), "errors": report["errors"], "collisionFrames": len(report["failures"]), "report": str(out / "report.json")}, indent=2), flush=True)
assert not report["errors"], f"Browser errors: {report['errors']}"
assert not report["failures"], f"Reading copy overlaps retained project artwork: {report['failures'][:1]}"
