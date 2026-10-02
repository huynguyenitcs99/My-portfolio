"""User-facing regression checks. Uses the environment's Python Playwright."""
import argparse
import json
from pathlib import Path
from playwright.sync_api import sync_playwright, expect

parser = argparse.ArgumentParser()
parser.add_argument('--base-url', default='http://127.0.0.1:3000')
parser.add_argument('--baseline', action='store_true')
parser.add_argument('--screenshots', action='store_true')
args = parser.parse_args()
out = Path(__file__).resolve().parents[1] / 'docs/design/previews'
out.mkdir(parents=True, exist_ok=True)
errors = []
checks = []

def check(name, action):
    try:
        action()
        checks.append(name)
        print(f'PASS {name}', flush=True)
    except Exception as error:
        errors.append({'check': name, 'error': str(error)[:1000]})
        print(f'FAIL {name}: {str(error)[:500]}', flush=True)

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path='/usr/bin/chromium', args=['--no-sandbox', '--disable-dev-shm-usage'])
    page = browser.new_page(viewport={'width': 1440, 'height': 960})
    page.goto(args.base_url, wait_until='networkidle', timeout=120000)
    check('Current AI × creative positioning is visible on arrival', lambda: expect(page.get_by_role('heading', name='AI engineer. Creative builder.')).to_be_visible())
    if not args.baseline:
        def overview():
            for scene in ['work', 'creative-method', 'daily-smith', 'slide-design', 'engineering', 'playground', 'about', 'contact']:
                el = page.locator(f'#{scene}')
                el.scroll_into_view_if_needed()
                expect(el).to_be_visible()
            expect(page.locator('#creative-method')).to_contain_text('JSONL')
            expect(page.locator('#slide-design')).to_contain_text('In development')
            expect(page.locator('#daily-smith')).to_contain_text('Email')
            expect(page.locator('#daily-smith')).to_contain_text('Calendar')
        check('Whole overview is available by scroll without selections', overview)

        def menu():
            page.evaluate('window.scrollTo(0, 0)')
            button = page.get_by_role('button', name='Open navigation')
            button.focus()
            page.keyboard.press('Enter')
            dialog = page.get_by_role('dialog', name='Navigation')
            expect(dialog).to_be_visible()
            expect(dialog.get_by_role('link', name='Selected work')).to_be_focused()
            page.keyboard.press('Shift+Tab')
            expect(dialog.get_by_role('button', name='Close navigation')).to_be_focused()
            page.keyboard.press('Tab')
            expect(dialog.get_by_role('link', name='Selected work')).to_be_focused()
            page.keyboard.press('Escape')
            expect(dialog).not_to_be_visible()
            expect(button).to_be_focused()
        check('Menu keyboard entry, focus loop, Escape and focus restoration', menu)

        def contacts():
            expect(page.locator('#contact a[href="mailto:huynguyen.itcs99@gmail.com"]').first).to_be_visible()
            expect(page.locator('#contact a[href="https://www.linkedin.com/in/huynguyenitcs"]')).to_have_count(1)
        check('Verified email and LinkedIn links', contacts)

        def orbit():
            page.evaluate('window.scrollTo(0,0)')
            page.wait_for_function("!document.querySelector('.orbit-track').classList.contains('is-static')")
            track=page.locator('.orbit-track')
            dimensions=track.evaluate('(e)=>({top:e.getBoundingClientRect().top+scrollY,height:e.offsetHeight})')
            page.evaluate('(y)=>window.scrollTo(0,y)',dimensions['top']-110)
            page.wait_for_timeout(250)
            before=page.locator('.orbit-primary').bounding_box()['width']
            page.evaluate('(y)=>window.scrollTo(0,y)',dimensions['top']+dimensions['height']-960)
            page.wait_for_timeout(300)
            after=page.locator('.orbit-primary').bounding_box()['width']
            assert after>before*1.7, (before,after)
            assert page.locator('.orbit-daily').evaluate('(e)=>e.inert')
            assert page.locator('.orbit-slide').evaluate('(e)=>e.inert')
            assert page.evaluate('document.documentElement.scrollWidth<=innerWidth+1')
            if args.screenshots:
                page.screenshot(path=str(out/'desktop-card-focus.png'))
        check('Native scroll expands the Creative card and removes covered links from focus',orbit)

        def study():
            page.locator('.motion-study').scroll_into_view_if_needed()
            page.wait_for_function("document.querySelector('.motion-study').dataset.motionStudy==='playing'")
            circle=page.locator('.study-player svg circle').first
            expect(circle).to_be_visible()
            first=circle.get_attribute('cx')
            page.wait_for_timeout(300)
            assert first != circle.get_attribute('cx'), 'Authored frames did not advance'
            page.get_by_role('button',name='Pause motion study').click()
            page.wait_for_timeout(100)
            paused=circle.get_attribute('cx')
            page.wait_for_timeout(250)
            assert paused==circle.get_attribute('cx'), 'Frames advanced after pause'
            page.get_by_role('button',name='Play motion study').click()
            page.wait_for_timeout(200)
            page.evaluate('window.scrollTo(0,0)')
            page.wait_for_function("document.querySelector('.motion-study').dataset.motionStudy==='paused'")
            page.wait_for_timeout(100)
            offscreen=circle.get_attribute('cx')
            page.wait_for_timeout(250)
            assert offscreen==circle.get_attribute('cx'), 'Offscreen study did not pause'
        check('Remotion authored frames play, pause and stop offscreen',study)

        def routes():
            for slug in ['creative-studio', 'daily-smith', 'slide-design', 'nextsight', 'multi-camera-reid', 'crystalsound']:
                response = page.goto(f'{args.base_url}/work/{slug}', wait_until='networkidle')
                assert response.status == 200, (slug, response.status)
                expect(page.locator('main h1')).to_be_visible()
            for legacy, slug in [('1-Nextsight-inspection-system', 'nextsight'), ('2-CCTV-ReID-system', 'multi-camera-reid'), ('3-Crystalsound-noise-cancellation', 'crystalsound')]:
                page.goto(f'{args.base_url}/work/{legacy}', wait_until='networkidle')
                assert page.url.endswith(f'/work/{slug}'), page.url
            assert page.goto(f'{args.base_url}/work/not-a-project').status == 404
        check('Six case routes, legacy redirects and unknown-project 404', routes)

        for width in [360, 390, 430, 768, 1440]:
            def mobile(width=width):
                context = browser.new_context(viewport={'width': width, 'height': 844}, reduced_motion='reduce')
                tab = context.new_page()
                tab.goto(args.base_url, wait_until='networkidle')
                expect(tab.get_by_role('heading', name='AI engineer. Creative builder.')).to_be_visible()
                assert tab.locator('#contact a[href="mailto:huynguyen.itcs99@gmail.com"]').last.bounding_box()['height'] >= 44, 'Contact target too short for touch'
                for anchor in ['work', 'creative-method', 'daily-smith', 'slide-design', 'engineering', 'playground', 'contact']:
                    tab.locator(f'#{anchor}').scroll_into_view_if_needed()
                    tab.wait_for_timeout(80)
                    assert tab.evaluate('document.documentElement.scrollWidth <= innerWidth + 1'), (width, anchor)
                    expect(tab.locator(f'#{anchor}')).to_be_visible()
                assert tab.locator('video[autoplay]').count() == 0
                assert tab.locator('[data-motion-study="playing"]').count() == 0
                for image in tab.locator('img').all():
                    image.scroll_into_view_if_needed()
                tab.wait_for_timeout(400)
                broken = tab.evaluate('Array.from(document.images).filter(i => i.complete && i.naturalWidth === 0).map(i=>i.src)')
                assert not broken, broken
                if args.screenshots:
                    tab.screenshot(path=str(out / f'home-{width}.png'), full_page=True)
                context.close()
            check(f'{width}px: readable reduced-motion overview, loaded images, no horizontal overflow', mobile)

        def nojs():
            context = browser.new_context(java_script_enabled=False, viewport={'width':390, 'height':844})
            tab = context.new_page()
            tab.goto(args.base_url, wait_until='networkidle')
            expect(tab.get_by_role('heading', name='AI engineer. Creative builder.')).to_be_visible()
            for anchor in ['creative-method', 'daily-smith', 'slide-design', 'contact']:
                tab.locator(f'#{anchor}').scroll_into_view_if_needed()
                expect(tab.locator(f'#{anchor}')).to_be_visible()
            context.close()
        check('Core SSR content readable with JavaScript disabled', nojs)
    browser.close()

report = {'passed': len(checks), 'failed': len(errors), 'checks': checks, 'errors': errors}
(out / ('baseline.json' if args.baseline else 'checks.json')).write_text(json.dumps(report, indent=2))
print(json.dumps({'passed':len(checks), 'failed':len(errors)}))
raise SystemExit(1 if errors else 0)
