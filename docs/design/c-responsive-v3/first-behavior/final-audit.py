"""Independent C adaptive behavior audit: actual DOM, complete source clock, real controls."""
import json,os
from pathlib import Path
from playwright.sync_api import sync_playwright
OUT=Path(os.environ.get('HUY_AUDIT_OUT',str(Path(__file__).resolve().parent/'final')));OUT.mkdir(parents=True,exist_ok=True)
BASE=os.environ.get('HUY_AUDIT_BASE','http://127.0.0.1:3020')
INIT='''window.auditHold=false;const nativeRAF=requestAnimationFrame;window.requestAnimationFrame=function(cb){return nativeRAF(t=>{if(!window.auditHold)cb(t)})};'''
READ=r'''() => {
 const rect=e=>{const r=e.getBoundingClientRect();return {left:r.left,right:r.right,top:r.top,bottom:r.bottom,width:r.width,height:r.height}};
 const opa=e=>{let o=1;for(let p=e;p;p=p.parentElement){const s=getComputedStyle(p);if(s.display==='none'||s.visibility==='hidden')return 0;o*=Number(s.opacity)}return o};
 const chars=e=>{const out=[];const cap=e.classList.contains('hero-name-ink')?e.parentElement.getBoundingClientRect():null;const w=document.createTreeWalker(e,NodeFilter.SHOW_TEXT);for(let n=w.nextNode();n;n=w.nextNode())for(let i=0;i<n.textContent.length;i++){if(!n.textContent[i].trim())continue;const r=document.createRange();r.setStart(n,i);r.setEnd(n,i+1);for(const b of r.getClientRects())if(b.width&&b.height){const g={char:n.textContent[i],left:b.left,right:b.right,top:b.top,bottom:b.bottom,width:b.width,height:b.height};if(cap){g.left=Math.max(g.left,cap.left);g.right=Math.min(g.right,cap.right);g.top=Math.max(g.top,cap.top);g.bottom=Math.min(g.bottom,cap.bottom);g.width=g.right-g.left;g.height=g.bottom-g.top}if(g.width>0&&g.height>0)out.push(g)}}return out};
 const plane=e=>{if(!e.classList.contains('hero-name-ink'))return null;const row=e.parentElement,origin=row.offsetParent.getBoundingClientRect(),m=new DOMMatrixReadOnly(getComputedStyle(row).transform==='none'?undefined:getComputedStyle(row).transform);return [[0,0],[row.offsetWidth,0],[row.offsetWidth,row.offsetHeight],[0,row.offsetHeight]].map(([x,y])=>{const p=new DOMPoint(x,y,0,1).matrixTransform(m);return {x:origin.left+row.offsetLeft+p.x/p.w,y:origin.top+row.offsetTop+p.y/p.w}})};
 const clippedArea=(poly,a,b)=>{const r={left:Math.max(a.left,b.left),right:Math.min(a.right,b.right),top:Math.max(a.top,b.top),bottom:Math.min(a.bottom,b.bottom)};if(r.right<=r.left||r.bottom<=r.top)return 0;let pts=poly;for(const [axis,limit,sign] of [['x',r.left,1],['x',r.right,-1],['y',r.top,1],['y',r.bottom,-1]]){const next=[];for(let i=0;i<pts.length;i++){const q=pts[i],p=pts[(i+pts.length-1)%pts.length],insideQ=(q[axis]-limit)*sign>=0,insideP=(p[axis]-limit)*sign>=0;if(insideQ!==insideP){const t=(limit-p[axis])/(q[axis]-p[axis]);next.push({x:p.x+t*(q.x-p.x),y:p.y+t*(q.y-p.y)})}if(insideQ)next.push(q)}pts=next;if(!pts.length)return 0}let sum=0;for(let i=0;i<pts.length;i++){const p=pts[i],q=pts[(i+1)%pts.length];sum+=p.x*q.y-p.y*q.x}return Math.abs(sum)/2};
 const area=(a,b)=>Math.max(0,Math.min(a.right,b.right)-Math.max(a.left,b.left))*Math.max(0,Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top));
 const root=document.querySelector('.cosmic-experience');
 const reading=[...document.querySelectorAll('.hero-name-ink,.hero-positioning h2,.hero-description,.hero-explore')].filter(e=>opa(e)>.25).map(e=>({name:e.className||e.tagName,chars:chars(e),plane:plane(e),r:rect(e)}));
 const horizon=document.querySelector('.arrival-horizon'),proof=document.querySelector('.arrival-proof');
 const visibleProof=proof&&opa(proof)>.25;
 const horizonBox=horizon&&visibleProof?rect(horizon):null;
 const curveY=x=>{if(!horizonBox)return Infinity;const local=(x-horizonBox.left)/horizonBox.width*1536;let a=0,b=1;for(let i=0;i<18;i++){const t=(a+b)/2,u=1-t;const xx=u*u*u*-32+3*u*u*t*400+3*u*t*t*980+t*t*t*1568;if(xx<local)a=t;else b=t}const t=(a+b)/2,u=1-t;return horizonBox.top+(u*u*u*19+3*u*u*t*42+3*u*t*t*77+t*t*t*22)/96*horizonBox.height};
 const cards=[...document.querySelectorAll('.orbit-projects .orbit-project')].map((e,index)=>({e,index,label:e.getAttribute('aria-label'),box:rect(e),opacity:opa(e),inert:e.inert,left:e.style.left,top:e.style.top,caption:[...e.querySelectorAll('.orbit-caption strong,.orbit-caption small,.orbit-contribution')].map(x=>({type:x.tagName,text:x.textContent.trim(),chars:chars(x)}))}));
 const issues=[];
 for(const c of cards.filter(c=>c.opacity>.25))for(const cap of c.caption)for(const g of cap.chars){if(g.top>=innerHeight||g.bottom<=0||g.right<=0||g.left>=innerWidth)continue;
  const x=(g.left+g.right)/2,y=(g.top+g.bottom)/2;
  for(const t of reading){const hits=t.chars.filter(r=>(t.plane?clippedArea(t.plane,g,r):area(g,r))>Math.min(3,g.width*g.height*.10));if(hits.length)issues.push({type:'caption-reading',card:c.label,text:cap.text,char:g.char,reading:t.name,readingChars:hits.map(q=>q.char).join(''),box:g})}
  const hit=document.elementFromPoint(x,y);const hitCard=hit?.closest('.orbit-project');if(hitCard&&hitCard!==c.e)issues.push({type:'caption-other-card',card:c.label,text:cap.text,char:g.char,cover:hitCard.getAttribute('aria-label'),box:g});
  if(horizonBox&&x>=horizonBox.left&&x<horizonBox.right&&g.bottom>curveY(x)+2)issues.push({type:'caption-horizon',card:c.label,text:cap.text,char:g.char,curveY:curveY(x),box:g});
 }
 const concise=[];for(const i of issues){const key=i.type+'|'+i.card+'|'+i.text+'|'+(i.reading||i.cover||'');if(!concise.some(x=>x.key===key))concise.push({...i,key})}
 const copy=[...document.querySelectorAll('.chapter-copy')].map(e=>({section:e.closest('section').id,opacity:opa(e),rect:rect(e),inert:e.inert,headingPresent:!!e.querySelector('h2'),bodyPresent:!!e.querySelector('.chapter-description')?.textContent,headingStyle:getComputedStyle(e.querySelector('h2')).visibility,bodyStyle:getComputedStyle(e.querySelector('.chapter-description')).visibility,links:[...e.querySelectorAll('a[href]')].map(a=>({inert:a.inert,box:rect(a)}))}));
 const textNodes=[...document.querySelectorAll('.chapter-copy h2,.chapter-copy .chapter-description,.chapter-copy .chapter-result,.chapter-copy .contribution,#engineering .section-intro h2,#engineering .section-intro p')].filter(e=>opa(e)>.25).map(e=>({section:e.closest('section').id,r:rect(e),name:e.className||e.tagName}));
 const chapterCollisions=[];for(const c of cards.filter(c=>c.opacity>.25))for(const t of textNodes.filter(t=>t.r.top<innerHeight&&t.r.bottom>0))if(area(c.box,t.r)>50)chapterCollisions.push({card:c.label,section:t.section,name:t.name,area:Math.round(area(c.box,t.r))});
 return {scrollY,viewport:{w:innerWidth,h:innerHeight},heroMode:root.dataset.heroLayout,storyMode:root.dataset.storyLayout,heroHeight:document.querySelector('.identity-chapter').offsetHeight,proofTop:proof?rect(proof).top:null,horizon:horizonBox,overflow:document.documentElement.scrollWidth-innerWidth,issues:concise,chapterCollisions,copy,cards:cards.map(({e,...c})=>({...c,caption:c.caption.map(({chars,...cap})=>cap)}))};
}'''
sourceFiles=['src/components/cosmic/experience.tsx','src/components/cosmic/hero-composition.ts','src/app/c-responsive.css','src/app/page.tsx']
import hashlib
sourceHashes={name:hashlib.sha256(Path(name).read_bytes()).hexdigest() for name in sourceFiles}
report={'sourceHashes':sourceHashes,'base':BASE,'cycles':[],'controls':[],'scroll':[],'errors':[],'failures':[]}
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage','--enable-webgl','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
 for name,w,h in [('desktop',1536,1024),('laptop',1366,768),('short',1280,650),('ultrawide',1920,800)]:
  page=b.new_page(viewport={'width':w,'height':h});page.add_init_script(INIT);page.on('pageerror',lambda e:report['errors'].append(str(e)))
  page.goto(BASE,wait_until='networkidle');page.evaluate('document.fonts.ready');page.wait_for_function("document.querySelector('.cosmic-experience').dataset.heroLayout && document.querySelector('.cosmic-experience').dataset.reduced==='false'")
  # Real Pause / Play hit before freezing the browser clock.
  for action in ['Pause ambient motion','Play ambient motion']:
   btn=page.get_by_role('button',name=action);hit=btn.evaluate("e=>{const r=e.getBoundingClientRect();const h=document.elementFromPoint(r.x+r.width/2,r.y+r.height/2);return {hit:h?.closest('button')?.getAttribute('aria-label'),rect:r.toJSON()}}")
   try:btn.click(timeout=8000);error=None
   except Exception as e:error=str(e)[:500]
   report['controls'].append({'profile':name,'action':action,'hit':hit,'error':error});(OUT/'report.json').write_text(json.dumps(report,indent=2)+'\n')
  page.evaluate("document.activeElement.blur();scrollTo({top:0,behavior:'instant'})");page.mouse.move(0,0);page.wait_for_timeout(150)
  page.evaluate('''()=>{window.auditTime=performance.now();window.auditHold=true;Object.defineProperty(performance,'now',{configurable:true,value:()=>window.auditTime});dispatchEvent(new Event('scroll'));}''')
  frames=[]
  for second in range(81):
   if second:page.evaluate("()=>{for(let i=0;i<20;i++){window.auditTime+=50;dispatchEvent(new Event('scroll'))}}")
   state=page.evaluate(READ);state['second']=second;frames.append(state)
   if state['issues'] or state['overflow']:
    if sum(bool(s['issues']) for s in frames)<=4:page.screenshot(path=str(OUT/f'{name}-cycle-{second}-issue.png'))
   if second in [0,20,40,60,79]:page.screenshot(path=str(OUT/f'{name}-cycle-{second}.png'))
  report['cycles'].append({'profile':name,'frames':frames})
  (OUT/'report.json').write_text(json.dumps(report,indent=2)+'\n')
  print(json.dumps({'profile':name,'cycleSamples':len(frames),'issueSamples':sum(bool(s['issues']) for s in frames),'firstIssues':next((s['issues'] for s in frames if s['issues']),[]),'start':[{'left':c['left'],'top':c['top'],'opacity':c['opacity']} for c in frames[0]['cards']],'end':[{'left':c['left'],'top':c['top'],'opacity':c['opacity']} for c in frames[-1]['cards']]}),flush=True)
  page.close()
 # Ordinary event-driven native reading on new pages, with forward and immediate reversal.
 for name,w,h,motion in ([] if os.environ.get('HUY_AUDIT_CYCLES_ONLY')=='1' else [('desktop',1536,1024,'no-preference'),('short',1280,650,'no-preference'),('compact900',900,700,'no-preference'),('tablet768',768,1024,'no-preference'),('phone390',390,844,'no-preference'),('reduced',1536,1024,'reduce')]):
  page=b.new_page(viewport={'width':w,'height':h},reduced_motion=motion);page.on('pageerror',lambda e:report['errors'].append(str(e)))
  page.goto(BASE,wait_until='networkidle');page.evaluate('document.fonts.ready');page.wait_for_timeout(180)
  pause=page.get_by_role('button',name='Pause ambient motion');
  if pause.count():pause.click(timeout=8000);page.evaluate('document.activeElement.blur()')
  starts=page.locator('section[id]').evaluate_all("es=>Object.fromEntries(es.map(e=>[e.id,e.getBoundingClientRect().top+scrollY]))")
  samples=[]
  for slug in ['daily-smith','creative-studio','slide-design','engineering']:
   for off in [-.40,-.02,.08,.35,.65]:samples.append((f'{slug}:{off}',max(0,starts[slug]+off*h)))
  samples+=list(reversed(samples[::2]))
  for label,y in samples:
   page.evaluate("y=>scrollTo({top:y,behavior:'instant'})",y);page.wait_for_timeout(100)
   state=page.evaluate(READ);state.update({'profile':name,'sample':label});report['scroll'].append(state)
   if state['chapterCollisions'] or state['overflow'] or any(c['inert'] or c['headingStyle']=='hidden' or c['bodyStyle']=='hidden' for c in state['copy']):
    report['failures'].append({'profile':name,'sample':label,'collisions':state['chapterCollisions'],'overflow':state['overflow'],'inaccessibleCopy':state['copy']})
    if len(report['failures'])<=7:page.screenshot(path=str(OUT/f'{name}-scroll-{label.replace(":","-")}-issue.png'))
  # Snapshot accessibility includes prose headings even when visual copy is faded.
  report['controls'].append({'profile':name,'headings':[e for e in page.get_by_role('heading',level=2).all_text_contents() if e.strip()],'descriptionCount':page.locator('.chapter-description').count()})
  (OUT/'report.json').write_text(json.dumps(report,indent=2)+'\n');page.close()
 b.close()
report['sourceHashesAfter']={name:hashlib.sha256(Path(name).read_bytes()).hexdigest() for name in sourceFiles}
(OUT/'report.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps({'sourceUnchanged':report['sourceHashes']==report['sourceHashesAfter'],'cycles':len(report['cycles']),'clockFrames':sum(len(x['frames']) for x in report['cycles']),'issueFrames':sum(bool(s['issues']) for c in report['cycles'] for s in c['frames']),'controlFailures':[c for c in report['controls'] if c.get('error')], 'scrollFrames':len(report['scroll']),'scrollFailures':len(report['failures']),'errors':report['errors'],'report':str(OUT/'report.json')},indent=2),flush=True)
