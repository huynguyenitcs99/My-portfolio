"""Scroll must advance the same preview's explanation; no clicking is required."""
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
 browser=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage','--enable-webgl','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
 page=browser.new_page(viewport={'width':1440,'height':1000})
 page.goto('http://127.0.0.1:3020',wait_until='networkidle')
 page.get_by_role('button',name='Pause ambient motion').click()
 card=page.get_by_role('button',name='Preview Daily Smith')
 start=page.locator('#daily-smith').evaluate('(e)=>e.getBoundingClientRect().top+scrollY')
 height=page.evaluate('innerHeight')
 def progress(y):
  page.evaluate('(y)=>scrollTo({top:y,behavior:"instant"})',y)
  page.wait_for_timeout(1000)
  return card.evaluate('(e)=>Number(getComputedStyle(e).getPropertyValue("--workflow"))')
 early=progress(start+height*.10)
 assert card.locator('.art-email-source').is_visible() and card.locator('.art-calendar-source').is_visible(), 'Connected source inputs are missing'
 early_conversation=card.locator('.art-conversation-panel').evaluate('(e)=>Number(getComputedStyle(e).opacity)')
 assert early_conversation < .1, 'Conversation result appears before the readable workflow starts'
 late=progress(start+height*.65)
 assert late-early > .5, f'Scroll does not advance the explanation: {early} → {late}'
 assert card.is_visible() and card.evaluate('(e)=>!e.inert'), 'Focused project is unavailable'
 late_conversation=card.locator('.art-conversation-panel').evaluate('(e)=>Number(getComputedStyle(e).opacity)')
 assert late_conversation > .9, 'Follow-up conversation does not resolve through scroll'
 assert card.locator('.art-brief-priority').evaluate_all('(es)=>es.length===4&&es.every(e=>Number(getComputedStyle(e).opacity)>.9)'), 'Daily priorities do not become readable'
 print({'samePreviewWorkflow': [early,late], 'conversationOpacity': [early_conversation,late_conversation], 'sourceInputsAndPriorities': True, 'scrollExplainsWithoutClick': True})
 browser.close()
