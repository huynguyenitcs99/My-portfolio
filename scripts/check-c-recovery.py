from playwright.sync_api import sync_playwright
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage','--enable-webgl','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
 page=b.new_page(viewport={'width':1440,'height':1000})
 page.goto('http://127.0.0.1:3020',wait_until='networkidle')
 card=page.get_by_role('button',name='Preview Daily Smith');card.focus();card.hover(force=True);page.mouse.move(2,2)
 page.wait_for_timeout(200);before=card.get_attribute('style');page.wait_for_timeout(500)
 assert before==card.get_attribute('style'), 'Keyboard-focused card moves after pointer departure'
 page.locator('.universe-canvas[data-state="ready"]').wait_for()
 page.locator('.universe-canvas canvas').evaluate('(e)=>{window.loss=e.getContext("webgl2").getExtension("WEBGL_lose_context");window.loss.loseContext()}')
 page.locator('.universe-canvas[data-state="unavailable"]').wait_for()
 page.locator('.universe-canvas canvas').evaluate('()=>window.loss.restoreContext()')
 page.locator('.universe-canvas[data-state="ready"]').wait_for(timeout=10000)
 canvas=page.locator('.universe-canvas canvas')
 frame=canvas.screenshot();page.wait_for_timeout(400)
 assert canvas.screenshot()!=frame, 'Restored context remains frozen'
 failure=b.new_page(viewport={'width':390,'height':900})
 failure.add_init_script('''window.universeTicks=0;const native=requestAnimationFrame;window.requestAnimationFrame=(cb)=>native((t)=>{if(cb.name==='tick')window.universeTicks++;cb(t)})''')
 failure.route('**/planets/earth-day.jpg',lambda route:route.abort())
 failure.goto('http://127.0.0.1:3020',wait_until='networkidle');failure.locator('.universe-canvas[data-state="unavailable"]').wait_for()
 failure.wait_for_timeout(200);n=failure.evaluate('universeTicks');failure.wait_for_timeout(500)
 assert failure.evaluate('universeTicks')==n, 'Texture failure keeps scheduling celestial frames'
 print('Focused preview stationary; WebGL restores; texture failure stops scheduling.')
 b.close()
