"""Record an actual browser walkthrough of the local production build."""
from pathlib import Path
import json
import os
import playwright
from playwright.sync_api import sync_playwright

out=Path(__file__).resolve().parents[1]/'docs/design/previews'
# Reuse the environment's ffmpeg in a writable Playwright cache.
cache=out.parents[2]/'.cache/playwright'
registry=Path(playwright.__file__).parent/'driver/package/browsers.json'
revision=next(b['revision'] for b in json.loads(registry.read_text())['browsers'] if b['name']=='ffmpeg')
executable=cache/f'ffmpeg-{revision}'/'ffmpeg-linux'
executable.parent.mkdir(parents=True,exist_ok=True)
if not executable.exists():executable.symlink_to('/usr/bin/ffmpeg')
os.environ['PLAYWRIGHT_BROWSERS_PATH']=str(cache)
with sync_playwright() as p:
    browser=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage'])
    context=browser.new_context(viewport={'width':1440,'height':960},record_video_dir=str(out),record_video_size={'width':1440,'height':960})
    page=context.new_page()
    page.goto('http://127.0.0.1:3000',wait_until='networkidle')
    page.evaluate("document.documentElement.style.scrollBehavior='auto'")
    page.screenshot(path=str(out/'desktop-arrival.png'))
    page.wait_for_timeout(1500)
    def move(y,ms=1300):
        page.evaluate('''({y,ms})=>new Promise(resolve=>{
            const from=scrollY,start=performance.now();
            const step=t=>{const p=Math.min(1,(t-start)/ms);const eased=p*p*(3-2*p);window.scrollTo(0,from+(y-from)*eased);if(p<1)requestAnimationFrame(step);else resolve();};
            requestAnimationFrame(step);
        })''',{'y':y,'ms':ms})
    track=page.locator('.orbit-track').evaluate('(e)=>({top:e.getBoundingClientRect().top+scrollY,height:e.offsetHeight})')
    move(track['top']-110)
    page.wait_for_timeout(500)
    move(track['top']+track['height']-960,1800)
    page.wait_for_timeout(1200)
    for anchor in ['creative-method','daily-smith','slide-design','playground','contact']:
        y=page.locator(f'#{anchor}').evaluate('(e)=>e.getBoundingClientRect().top+scrollY-105')
        move(y)
        page.wait_for_timeout(1800 if anchor!='playground' else 3000)
    page.wait_for_timeout(700)
    video=page.video
    context.close()
    video.save_as(str(out/'website-walkthrough.webm'))
    Path(video.path()).unlink(missing_ok=True)
    browser.close()
print(out/'website-walkthrough.webm')
