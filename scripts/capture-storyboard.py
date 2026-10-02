"""Capture the actual eight scenes for comparison with the fixed visual storyboard."""
from pathlib import Path
from playwright.sync_api import sync_playwright

out = Path(__file__).resolve().parents[1] / 'docs/design/previews'
scenes = ['work', 'creative-method', 'daily-smith', 'slide-design', 'engineering', 'playground', 'about']
with sync_playwright() as p:
    browser = p.chromium.launch(executable_path='/usr/bin/chromium', args=['--no-sandbox', '--disable-dev-shm-usage'])
    for width in [1440, 390]:
        page = browser.new_page(viewport={'width': width, 'height': 900 if width == 1440 else 844}, reduced_motion='reduce')
        page.goto('http://127.0.0.1:3000', wait_until='networkidle')
        page.evaluate("document.documentElement.style.scrollBehavior='auto'")
        for image in page.locator('img').all():
            image.scroll_into_view_if_needed()
        page.wait_for_timeout(300)
        page.evaluate("document.activeElement?.blur(); window.scrollTo(0, 0)")
        page.evaluate('document.fonts.ready')
        page.screenshot(path=str(out / f'fidelity-arrival-{width}.png'))
        page.screenshot(path=str(out / f'fidelity-home-{width}.png'), full_page=True)
        # Capture page-coordinate regions from scroll=0 so sticky navigation does
        # not cover a tall scene's heading or appear midway through the capture.
        for scene in scenes:
            box = page.locator(f'#{scene}').bounding_box()
            page.screenshot(path=str(out / f'fidelity-{scene}-{width}.png'), full_page=True, clip=box)
        page.close()
    browser.close()
print(out)
