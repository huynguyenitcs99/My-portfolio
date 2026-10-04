"""Real hero regression; projected bounds are deliberately conservative."""
import argparse
import json
from pathlib import Path
from playwright.sync_api import sync_playwright

parser = argparse.ArgumentParser()
parser.add_argument('--url', default='http://127.0.0.1:3020')
parser.add_argument('--out', default='/tmp/huy-c-responsive')
parser.add_argument('--quick', action='store_true')
args = parser.parse_args()
out = Path(args.out)
out.mkdir(parents=True, exist_ok=True)

READ = r'''() => {
 const box=e=>{const b=e.getBoundingClientRect();return {x:b.x,y:b.y,right:b.right,bottom:b.bottom,width:b.width,height:b.height}};
 const glyph=e=>{const r=document.createRange();r.selectNodeContents(e);return [...r.getClientRects()].filter(b=>b.width>1&&b.height>1).map(b=>({x:b.x,y:b.y,right:b.right,bottom:b.bottom,width:b.width,height:b.height}));};
 const overlap=(a,b)=>Math.max(0,Math.min(a.right,b.right)-Math.max(a.x,b.x))*Math.max(0,Math.min(a.bottom,b.bottom)-Math.max(a.y,b.y));
 const root=document.querySelector('.cosmic-experience'),p=document.querySelector('.hero-portrait'),pb=box(p);
 const fit=getComputedStyle(p.querySelector('img')).objectFit;
 const imageSide=fit==='cover'?Math.max(pb.width,pb.height):Math.min(pb.width,pb.height);
 const face={x:pb.x+imageSide*.335,right:pb.x+imageSide*.747,y:pb.y+imageSide*.215,bottom:pb.y+imageSide*.656};
 const textEls=[...document.querySelectorAll('.hero-positioning h2,.hero-description,.hero-explore')];
 const text=textEls.flatMap(e=>glyph(e).map(b=>({text:e.textContent.trim(),box:b})));
 const portraitCollisions=text.filter(t=>overlap(t.box,face)>30);
 const cards=[...document.querySelectorAll('.orbit-project')].map(e=>({title:e.getAttribute('aria-label'),box:box(e),opacity:Number(getComputedStyle(e).opacity),caption:box(e.querySelector('.orbit-caption'))}));
 const captionOverlaps=[];
 for(let i=0;i<cards.length;i++)for(let j=i+1;j<cards.length;j++)if(cards[i].opacity>.2&&cards[j].opacity>.2&&overlap(cards[i].caption,cards[j].caption)>30)captionOverlaps.push([cards[i].title,cards[j].title]);
 const ctl=document.querySelector('.stage-controls button'),cb=box(ctl),hit=document.elementFromPoint(cb.x+cb.width/2,cb.y+cb.height/2);
 return {width:innerWidth,height:innerHeight,layout:root.dataset.heroLayout,storyLayout:root.dataset.storyLayout,portrait:pb,face,text,portraitCollisions,cards,captionOverlaps,controlHit:hit?.closest('.stage-controls')!==null,control:cb,overflow:document.documentElement.scrollWidth>innerWidth,copyBottom:box(document.querySelector('.identity-copy')).bottom};
}'''

report={'frames':[],'failures':[],'errors':[]}
profiles=[(801,900),(800,1024),(884,680),(1536,1024)]
if not args.quick:
 profiles += [(320,568),(390,844),(600,900),(768,1024),(799,900),(1199,800),(1200,800),(1280,650),(1920,800),(2560,1080)]
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage','--enable-webgl','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
 for w,h in profiles:
  page=b.new_page(viewport={'width':w,'height':h})
  page.on('pageerror',lambda e:report['errors'].append(str(e)))
  page.goto(args.url,wait_until='networkidle')
  page.evaluate('document.fonts.ready')
  page.evaluate("scrollTo({top:0,behavior:'instant'});document.activeElement.blur()")
  page.locator('.cosmic-experience[data-hero-layout][data-reduced="false"]').wait_for()
  page.get_by_role('button', name='Pause ambient motion').click()
  page.get_by_role('button', name='Play ambient motion').wait_for()
  page.evaluate("scrollTo({top:0,behavior:'instant'});document.activeElement.blur()")
  page.wait_for_timeout(100)
  s=page.evaluate(READ)
  s['profile']=f'{w}x{h}';report['frames'].append(s)
  failures=[]
  if s['portraitCollisions']:failures.append('copy crosses face')
  if s['captionOverlaps']:failures.append('project captions collide')
  if s['layout']=='wide' and s['cards'][1]['opacity']<.9:failures.append('Creative hidden on initial wide arrival')
  if not s['controlHit']:failures.append('Pause pointer intercepted')
  if s['overflow']:failures.append('horizontal overflow')
  if s['layout']=='compact' and min(c['box']['y'] for c in s['cards'])<s['copyBottom']+10:failures.append('compact art precedes intro end')
  if failures:report['failures'].append({'profile':s['profile'],'defects':failures})
  page.screenshot(path=str(out/f'{w}x{h}.png'))
  page.close()
 b.close()
(out/'report.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps({'frames':len(report['frames']),'failures':report['failures'],'errors':report['errors'],'report':str(out/'report.json')},indent=2))
assert not report['failures'], 'Responsive hero collisions: '+str(report['failures'])
assert not report['errors'], report['errors']
