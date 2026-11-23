from playwright.sync_api import sync_playwright
from pathlib import Path
Path('evidence').mkdir(exist_ok=True)
with sync_playwright() as pw:
 b=pw.chromium.launch(args=['--no-sandbox'])
 ctx=b.new_context(viewport={'width':1024,'height':768},has_touch=True,device_scale_factor=2)
 page=ctx.new_page(); errors=[];page.on('pageerror',lambda err: errors.append(str(err)))
 for stage in range(1,13):
  url='http://127.0.0.1:8765/'+('telescopic-bridge.html' if stage==1 else f'transport.html#{stage}')
  page.goto(url);page.reload();page.evaluate("localStorage.setItem('telescopic-seen','1');for(const k of ['g','l','f'])localStorage.setItem('pb2-intro-'+k,'1')")
  page.reload()
  def slider(idx,value):
   page.locator('input[type=range]').nth(idx).evaluate('(r,v)=>{r.value=v;r.dispatchEvent(new Event("input"))}',value)
  def btn(name):
   page.get_by_role('button',name=name,exact=True).tap()
  def advance():
   if stage==1:page.evaluate("for(let i=0;i<2000&&!['won','jam'].includes(state);i++)step(1/120);draw()")
   else:page.evaluate("for(let i=0;i<3000&&['machine','move'].includes(phase);i++)tick();draw()")
  if stage==6:btn('화물 보내기')
  else:page.locator('#go' if stage==1 else '#run').tap()
  advance();page.locator('canvas').screenshot(path=f'evidence/{stage:02}-failure.png')
  page.locator('#reset').tap()
  if stage==1:
   box=page.locator('canvas').bounding_box()
   def pos(x,y):return (box['x']+x*box['width']/1000,box['y']+y*box['height']/510)
   client=ctx.new_cdp_session(page)
   for typ,coords in [('touchStart',pos(290,428)),('touchMove',pos(290,412)),('touchEnd',None)]:
    client.send('Input.dispatchTouchEvent',{'type':typ,'touchPoints':[dict(zip(['x','y'],coords))] if coords else []})
  if stage in [2,4,6,8,9]:slider(0,-44 if stage==2 else 18)
  if stage==9:slider(1,-44)
  if stage in [3,4,8,10]:slider(1 if stage in [4,8] else 0,90)
  if stage in [5,6,8,11]:
   btn('A');btn('C')
   if stage==11:btn('F');btn('H')
  if stage in [7,8,12]:slider(-1,100)
  if stage==12:slider(0,113)
  if stage==6:
   btn('가벼운 시험');advance();assert page.evaluate('phase')=='tested';btn('화물 보내기')
  else:page.locator('#go' if stage==1 else '#run').tap()
  advance();result=page.evaluate('state' if stage==1 else 'phase');assert result=='won',(stage,result)
  page.locator('canvas').screenshot(path=f'evidence/{stage:02}-arrival.png')
  print(stage,result,flush=True)
 assert not errors,errors
 b.close()
