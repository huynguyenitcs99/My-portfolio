"""Native arrival/Creative preview and natural-scroll Slide preview after shared geometry fix."""
import json,hashlib
from pathlib import Path
from playwright.sync_api import sync_playwright
OUT=Path(__file__).resolve().parent/'arrival-confirmation';OUT.mkdir(exist_ok=True)
sourceFiles=['src/components/cosmic/experience.tsx','src/components/cosmic/hero-composition.ts','src/app/c-responsive.css','src/app/page.tsx']
HASH=lambda:{name:hashlib.sha256(Path(name).read_bytes()).hexdigest() for name in sourceFiles}
READ=r'''e=>{const caption=e.querySelector('.orbit-caption strong'),r=caption.getBoundingClientRect(),card=e.getBoundingClientRect(),style=getComputedStyle(e);const candidates=[];for(const fx of [.25,.5,.75])for(const fy of [.35,.65]){const x=r.left+r.width*fx,y=r.top+r.height*fy;if(x<0||x>=innerWidth||y<0||y>=innerHeight)continue;const hit=document.elementFromPoint(x,y);candidates.push({x,y,hit:hit?.closest('.orbit-project')?.getAttribute('aria-label'),valid:hit?.closest('.orbit-project')===e})}return {name:caption.textContent.trim(),bounds:r.toJSON(),cardBounds:card.toJSON(),opacity:Number(style.opacity),inert:e.inert,inViewport:r.top<innerHeight&&r.bottom>0&&r.left<innerWidth&&r.right>0,fullyVisible:r.top>=0&&r.bottom<=innerHeight&&r.left>=0&&r.right<=innerWidth,candidates,scrollY,heroHeight:document.querySelector('.identity-chapter').offsetHeight,heroLayout:document.querySelector('.cosmic-experience').dataset.heroLayout,storyLayout:document.querySelector('.cosmic-experience').dataset.storyLayout}}'''
report={'base':'http://127.0.0.1:3040','sourceHashes':HASH(),'initial':[],'results':[],'errors':[]}
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage','--enable-webgl','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
 page=b.new_page(viewport={'width':1920,'height':800});page.on('pageerror',lambda e:report['errors'].append(str(e)));page.goto(report['base'],wait_until='networkidle');page.evaluate('document.fonts.ready');page.wait_for_function("document.querySelector('.cosmic-experience').dataset.heroLayout && document.querySelector('.cosmic-experience').dataset.reduced==='false'")
 pause=page.get_by_role('button',name='Pause ambient motion');r=pause.bounding_box();hit=pause.evaluate("e=>{const r=e.getBoundingClientRect();return document.elementFromPoint(r.x+r.width/2,r.y+r.height/2)?.closest('button')?.getAttribute('aria-label')}");page.mouse.click(r['x']+r['width']/2,r['y']+r['height']/2);page.get_by_role('button',name='Play ambient motion').wait_for();page.mouse.move(0,0);page.evaluate('document.activeElement.blur()');page.wait_for_timeout(650);report['pause']={'hit':hit,'playPresent':page.get_by_role('button',name='Play ambient motion').count()==1}
 report['initial']=[page.get_by_role('button',name='Preview '+name).evaluate(READ) for name in ['Daily Smith','Creative Studio','Slide Design']];page.screenshot(path=str(OUT/'ultrawide-initial.png'));print(json.dumps({'initial':report['initial'],'pause':report['pause']}),flush=True)
 for name in ['Creative Studio','Slide Design']:
  card=page.get_by_role('button',name='Preview '+name)
  if name=='Slide Design':
   target=page.locator('#slide-design').evaluate('e=>e.getBoundingClientRect().top+scrollY')+800*.2
   page.evaluate("y=>scrollTo({top:y,behavior:'instant'})",target);page.wait_for_timeout(800);page.screenshot(path=str(OUT/'ultrawide-slide-reading.png'))
  state=card.evaluate(READ);point=next((p for p in state['candidates'] if p['valid']),None)
  try:
   if not point or state['opacity']<.2 or state['inert']:raise RuntimeError('No visible readable native caption target')
   page.mouse.click(point['x'],point['y']);page.get_by_role('dialog',name=name).wait_for(timeout=4000);page.wait_for_timeout(650);active=page.evaluate("document.activeElement?.getAttribute('aria-label')");page.keyboard.press('Escape');page.wait_for_function("!document.querySelector('.project-dialog').open");restored=page.evaluate("document.activeElement?.getAttribute('aria-label')");passed=active=='Close project preview' and restored=='Preview '+name;result={'name':name,'passed':passed,'state':state,'point':point,'active':active,'restored':restored}
  except Exception as e:result={'name':name,'passed':False,'state':state,'error':str(e)[:1000]};page.screenshot(path=str(OUT/f'ultrawide-{name.replace(" ","-")}-failure.png'))
  report['results'].append(result);page.evaluate('document.activeElement.blur()');page.mouse.move(0,0);print(json.dumps(result),flush=True)
 page.close();b.close()
report['sourceHashesAfter']=HASH();report['sourceUnchanged']=report['sourceHashes']==report['sourceHashesAfter'];(OUT/'arrival-native.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps({'sourceUnchanged':report['sourceUnchanged'],'failures':sum(not x['passed'] for x in report['results']),'errors':report['errors']}),flush=True)
