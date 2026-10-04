"""User-visible portfolio checks. Run against a separately started Next server."""
import argparse, json, os
from playwright.sync_api import sync_playwright

parser = argparse.ArgumentParser()
parser.add_argument('--url', default='http://127.0.0.1:3020')
parser.add_argument('--screenshots', default='test-results/cosmic')
args = parser.parse_args()
os.makedirs(args.screenshots, exist_ok=True)
results, errors = [], []
with sync_playwright() as p:
    browser = p.chromium.launch(executable_path='/usr/bin/chromium', args=['--no-sandbox', '--disable-dev-shm-usage', '--enable-webgl', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'])
    page = browser.new_page(viewport={'width':1440,'height':1000}, device_scale_factor=1)
    page.on('pageerror', lambda e: errors.append(str(e)))
    page.goto(args.url, wait_until='networkidle')
    page.get_by_role('heading', name='Huy Nguyen', exact=True).wait_for()
    assert page.locator('main').inner_text().count('Vulcan Labs') == 0
    page.locator('.universe-canvas[data-state="ready"]').wait_for()
    canvas = page.locator('.universe-canvas canvas')
    first_frame = canvas.screenshot()
    page.wait_for_timeout(300)
    assert canvas.screenshot() != first_frame, 'Celestial canvas is not moving'
    page.get_by_role('button', name='Pause ambient motion').click()
    page.wait_for_timeout(150)
    paused_frame = canvas.screenshot()
    page.wait_for_timeout(300)
    assert canvas.screenshot() == paused_frame, 'Ambient pause did not stop celestial rendering'
    results.append('actual Three.js frame changes and stable paused frame')
    page.get_by_role('button', name='Preview Daily Smith').hover(force=True)
    page.get_by_role('button', name='Preview Daily Smith').click()
    dialog = page.get_by_role('dialog', name='Daily Smith')
    assert dialog.is_visible()
    assert 'PIC' in dialog.inner_text()
    for _ in range(4):
        page.keyboard.press('Tab')
        assert dialog.evaluate('(e)=>e.contains(document.activeElement)'), 'Preview focus escaped'
    page.keyboard.press('Escape')
    dialog.wait_for(state='hidden')
    assert not dialog.is_visible()
    assert page.get_by_role('button', name='Preview Daily Smith').evaluate('(e)=>e===document.activeElement')
    results.append('project preview opens, Escape closes, focus returns')
    page.screenshot(path=f'{args.screenshots}/desktop-hero.png')
    for anchor in ['daily-smith','creative-studio','slide-design','engineering','playground','about','contact']:
        page.locator('#'+anchor).scroll_into_view_if_needed()
        page.wait_for_timeout(300)
        assert page.locator('#'+anchor).is_visible()
    page.locator('#creative-studio').scroll_into_view_if_needed()
    page.screenshot(path=f'{args.screenshots}/desktop-creative.png')
    assert page.locator('a[href="mailto:huynguyen.itcs99@gmail.com"]').count() > 0
    page.locator('#playground').scroll_into_view_if_needed()
    page.get_by_role('button', name='Pause motion study').wait_for()
    page.get_by_role('button', name='Pause motion study').click()
    assert page.locator('[data-motion-study="paused"]').count() == 1
    results.append('Remotion study loads on view and pauses on demand')
    results.append('all story chapters and direct contact accessible by native scroll')
    for path, title in [('daily-smith','Daily Smith'),('creative-studio','Creative Studio'),('slide-design','Slide Design'),('nextsight','NextSight'),('multi-camera-reid','Multi-camera ReID'),('crystalsound','CrystalSound')]:
        response = page.goto(args.url+'/work/'+path,wait_until='networkidle')
        assert response.status == 200
        assert title in page.locator('h1').inner_text()
    for path in ['/work','/about']:
        assert page.goto(args.url+path,wait_until='networkidle').status == 200
    assert page.goto(args.url+'/work/1-Nextsight-inspection-system',wait_until='networkidle').status == 200
    assert page.url.endswith('/work/nextsight')
    assert page.goto(args.url+'/not-a-real-page',wait_until='networkidle').status == 404
    results.append('six case studies, Work, About, legacy redirect and 404')
    for width in [360,390,768,1440]:
        page.set_viewport_size({'width':width,'height':900})
        page.emulate_media(reduced_motion='reduce')
        page.goto(args.url,wait_until='networkidle')
        assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'), f'Overflow at {width}'
        assert page.get_by_role('heading',name='Huy Nguyen',exact=True).is_visible()
        if width == 390:
            page.get_by_role('button',name='Open navigation').click()
            assert page.get_by_role('dialog',name='Navigation',exact=True).is_visible()
            page.keyboard.press('Escape')
            assert not page.get_by_role('dialog',name='Navigation',exact=True).is_visible()
            page.screenshot(path=f'{args.screenshots}/mobile-hero.png')
            page.locator('#creative-studio').scroll_into_view_if_needed()
            page.screenshot(path=f'{args.screenshots}/mobile-creative.png')
    results.append('responsive widths and reduced-motion navigation')
    nojs = browser.new_page(java_script_enabled=False,viewport={'width':390,'height':844})
    nojs.goto(args.url)
    assert nojs.get_by_role('heading',name='Huy Nguyen',exact=True).is_visible()
    assert nojs.locator('a[href="/work/daily-smith"]').count() > 0
    assert nojs.evaluate('document.documentElement.scrollWidth<=innerWidth')
    results.append('no-JavaScript content, navigation and case links')
    fallback = browser.new_page(viewport={'width':390,'height':844})
    fallback.add_init_script("const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){return String(type).includes('webgl')?null:original.call(this,type,...args)}")
    fallback.goto(args.url,wait_until='networkidle')
    fallback.locator('.universe-canvas[data-state="unavailable"]').wait_for()
    assert fallback.get_by_role('heading',name='Huy Nguyen',exact=True).is_visible()
    fallback.get_by_role('button',name='Preview Creative Studio').click()
    assert 'Contributor' in fallback.get_by_role('dialog',name='Creative Studio').inner_text()
    results.append('WebGL-unavailable mobile fallback retains content and project previews')
    assert not errors, errors
    browser.close()
print(json.dumps({'checks':results,'browserErrors':errors},indent=2))
