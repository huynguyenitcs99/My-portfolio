"""Focused live-dev adaptation checks; source is not modified."""
import json,tempfile
from pathlib import Path
from playwright.sync_api import sync_playwright
OUT=Path('/workspace/My-portfolio/docs/design/c-responsive-v3/text-adaptation')
READ=r'''() => {
 const box=e=>{const b=e.getBoundingClientRect();return {x:b.x,y:b.y,width:b.width,height:b.height,right:b.right,bottom:b.bottom};};
 const root=document.querySelector('.cosmic-experience'),copy=document.querySelector('.identity-copy'),portrait=document.querySelector('.hero-portrait');
 const readText=q=>{const e=document.querySelector(q),s=getComputedStyle(e),walker=document.createTreeWalker(e,NodeFilter.SHOW_TEXT);let n;const rects=[];while(n=walker.nextNode()){if(!n.textContent.trim())continue;const r=document.createRange();r.selectNodeContents(n);for(const b of r.getClientRects())if(b.width>1)rects.push({text:n.textContent.trim(),x:b.x,y:b.y,width:b.width,height:b.height,bottom:b.bottom});}const ys=[...new Set(rects.map(b=>Math.round(b.y*10)/10))].sort((a,b)=>a-b);return {q,box:box(e),font:parseFloat(s.fontSize),lineHeight:parseFloat(s.lineHeight),rects,lines:ys,lineAdvances:ys.slice(1).map((y,i)=>y-ys[i])};};
 const text=['.hero-positioning h2','.hero-description','.hero-explore'].map(readText);
 const photo=box(portrait),scale=Math.min(photo.width,photo.height),face={x:photo.x+.305*scale,right:photo.x+.777*scale,y:photo.y+.185*scale,bottom:photo.y+.686*scale};
 const faceCollisions=[];for(const t of text)for(const b of t.rects){const w=Math.max(0,Math.min(face.right,b.x+b.width)-Math.max(face.x,b.x)),h=Math.max(0,Math.min(face.bottom,b.bottom)-Math.max(face.y,b.y));if(w*h>1)faceCollisions.push({q:t.q,area:w*h});}
 const cards=[...document.querySelectorAll('.orbit-project')].map(e=>({name:e.getAttribute('aria-label'),box:box(e),font:parseFloat(getComputedStyle(e.querySelector('.orbit-caption strong')).fontSize)}));
 const intro=box(copy);const ctrl=document.querySelector('.stage-controls button'),cb=box(ctrl),hit=document.elementFromPoint(cb.x+cb.width/2,cb.y+cb.height/2);
 return {viewport:{width:innerWidth,height:innerHeight,dpr:devicePixelRatio},heroLayout:root.dataset.heroLayout,storyLayout:root.dataset.storyLayout,arrivalHeight:parseFloat(getComputedStyle(root).getPropertyValue('--arrival-height')),intro,text,photo,face,faceCollisions,cards,control:{box:cb,hit:hit?.closest('button')===ctrl},overflow:document.documentElement.scrollWidth-innerWidth,portraitSquare:Math.abs(photo.width-photo.height)<1,compactArtworkGap:root.dataset.heroLayout==='compact'?Math.min(photo.y,...cards.map(c=>c.box.y))-intro.bottom:null};
}'''
report={'url':'http://127.0.0.1:3020','profiles':[],'resizes':[],'errors':[],'failures':[]}
BASE=[('zoom-equivalent-200',880,682,2),('boundary-1199',1199,900,1),('boundary-1200',1200,900,1),('phone',390,844,1)]
def validate(state):
 errors=[]
 if state['overflow']>1:errors.append('body horizontal overflow')
 if not state['portraitSquare']:errors.append('portrait not square')
 if state['faceCollisions']:errors.append('main copy glyph rectangles intersect padded face region')
 if state['compactArtworkGap'] is not None and state['compactArtworkGap']<20:errors.append('compact artwork begins inside/too close to intro')
 if not state['control']['hit']:errors.append('pause control pointer target blocked')
 for t in state['text']:
  if t['lineHeight']<t['font']*1.2:errors.append(t['q']+' line height too small for rendered font')
  if any(a<t['font']*1.15 for a in t['lineAdvances']):errors.append(t['q']+' consecutive text lines have insufficient advance')
 return errors
def sample(page,label,collection='profiles'):
 page.wait_for_function("document.querySelector('.cosmic-experience')?.dataset.heroLayout && parseFloat(getComputedStyle(document.querySelector('.cosmic-experience')).getPropertyValue('--arrival-height'))>0")
 page.evaluate('document.fonts.ready')
 page.wait_for_timeout(400)
 state=page.evaluate(READ);state['profile']=label
 pause=page.get_by_role('button',name='Pause ambient motion')
 if pause.count():
  try:pause.click(timeout=2000)
  except Exception as e:state['pauseClickError']=str(e)
 page.evaluate('document.activeElement.blur()')
 state=page.evaluate(READ)|{'profile':label,**({'pauseClickError':state['pauseClickError']}if'pauseClickError'in state else{})}
 state['failures']=validate(state)
 if label.startswith('resize-wide-1200') and state['storyLayout']!='retained':state['failures'].append('eligible compact-to-wide resize did not recover retained story')
 if state.get('pauseClickError'):state['failures'].append('native pause click failed')
 page.screenshot(path=str(OUT/f'{label}.png'),full_page=False)
 report[collection].append(state)
 if state['failures']:report['failures'].append({'profile':label,'failures':state['failures']})
 (OUT/'report.json').write_text(json.dumps(report,indent=2)+'\n')
 print(json.dumps({'profile':label,'viewport':state['viewport'],'heroLayout':state['heroLayout'],'storyLayout':state['storyLayout'],'font':state['text'][1]['font'],'lineHeight':state['text'][1]['lineHeight'],'introBottom':state['intro']['bottom'],'artworkGap':state['compactArtworkGap'],'faceCollisions':state['faceCollisions'],'failures':state['failures']}),flush=True)
 return state
with sync_playwright() as p:
 browser=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage','--disable-webgl'])
 for label,w,h,dpr in BASE:
  ctx=browser.new_context(viewport={'width':w,'height':h},device_scale_factor=dpr)
  page=ctx.new_page();page.on('pageerror',lambda e:report['errors'].append(str(e)))
  page.goto(report['url'],wait_until='networkidle');sample(page,label)
  if label=='boundary-1199':
   for rl,rw,rh in [('resize-wide-1200',1200,900),('resize-compact-1199',1199,900),('resize-wide-1200-repeat',1200,900),('resize-compact-1199-repeat',1199,900),('resize-short-1200',1200,650),('resize-tall-1200',1200,900)]:
    page.set_viewport_size({'width':rw,'height':rh});sample(page,rl,'resizes')
  if label=='phone':
   for rl,rw,rh in [('orientation-landscape',844,390),('orientation-portrait',390,844)]:
    page.set_viewport_size({'width':rw,'height':rh});sample(page,rl,'resizes')
  ctx.close()
 browser.close()
 for minimum in [24,32]:
  prof=Path(tempfile.mkdtemp(prefix=f'huy-v3-minimum-{minimum}-'));(prof/'Default').mkdir();(prof/'Default'/'Preferences').write_text(json.dumps({'webkit':{'webprefs':{'minimum_font_size':minimum,'minimum_logical_font_size':minimum}}}))
  ctx=p.chromium.launch_persistent_context(str(prof),executable_path='/usr/bin/chromium',viewport={'width':1760,'height':1364},args=['--no-sandbox','--disable-dev-shm-usage','--disable-webgl'])
  page=ctx.new_page();page.on('pageerror',lambda e:report['errors'].append(str(e)));page.goto(report['url'],wait_until='networkidle');sample(page,f'minimum-font-{minimum}')
  ctx.close()
(OUT/'report.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps({'profileCount':len(report['profiles']),'resizeCount':len(report['resizes']),'errors':report['errors'],'failures':report['failures'],'report':str(OUT/'report.json')}),flush=True)
