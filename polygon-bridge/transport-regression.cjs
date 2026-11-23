const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
function element(){let captured=false;return {style:{},append(){},add(){},replaceChildren(){},setAttribute(){},querySelectorAll(){return []},getContext(){return new Proxy({},{get(o,k){return k in o?o[k]:()=>{}},set(o,k,v){o[k]=v;return true}})},getBoundingClientRect(){return {left:0,top:0,width:1000,height:410}},setPointerCapture(){captured=true},hasPointerCapture(){return captured},releasePointerCapture(){captured=false}}}
function game(stage){
 const filename=stage===1?'telescopic-bridge.html':'transport.html';
 const source=fs.readFileSync(path.join(__dirname,filename),'utf8').split('<script>')[1].split('</script>')[0];
 const elements={},env={document:{getElementById:id=>elements[id]??=element(),createElement:element},Option:function(){},location:{hash:'#'+stage},requestAnimationFrame(){},window:{matchMedia(){return {matches:false}}}};
 for(const id of ['go','reset','view','retry','roll','hint','msg'])env[id]=element();
 const context=vm.createContext(env);vm.runInContext(source,context);return script=>vm.runInContext(script,context)
}
const first=game(1);
for(const [angle,expected] of [[0,true],[2,true],[3.9,true],[4.2,false]])assert.equal(first('held=false;adjust(457+200*Math.tan(Math.atan2(15,200)+'+angle+'*Math.PI/180));held'),expected);
assert.equal(first('held=true;adjust(457+200*Math.tan(Math.atan2(15,200)+5.5*Math.PI/180));d'),472);
assert.equal(first('adjust(457+200*Math.tan(Math.atan2(15,200)+6.1*Math.PI/180));held'),false);
assert.equal(first("demo=0;d=472;rewind('extend');for(let i=0;i<2000;i++)step(1/120);state"),'won');
for(let stage=2;stage<=8;stage++){
 const run=game(stage);
 assert.equal(run("setup();design.rail=railRise;design.gate=90;design.arm=100;design.brace=[0,2];design.cargo=stage===6||stage===8;begin();for(let i=0;i<2500;i++)tick();phase"),'won');
 if(stage>=5)assert.equal(run('draw();true'),true,'frame drawing must execute without canvas errors');
 if(stage===3){for(const value of [97,103,110]){
 run('design.gate='+value+';begin();while(phase==="machine")tick()');assert.equal(run('phase'),'strain');assert.ok(Math.abs(run('gateTip(model.gate).y')-2)<1e-8);
 run('restart()');assert.equal(run('model.wall'),false)}
 assert.equal(run('design.gate=45;begin();for(let i=0;i<1800;i++)tick();phase'),'blocked')}
 if(stage===7){for(const gap of [8,10,12])assert.equal(run('!!connector(pt(0,0),pt('+gap+',1))'),gap<=10)}
}

const touch=(x,y)=>'{clientX:'+x+',clientY:'+y+',pointerId:1,preventDefault(){}}';
const direct=game(5);
const s5=direct("setup();canvas.onpointerdown("+touch(390,258)+");canvas.onpointermove("+touch(570,343)+");canvas.onpointerup("+touch(570,343)+");JSON.stringify(design.brace)");
assert.equal(s5,'[0,2]','Dragging between opposite hinges must create a real brace');
assert.equal(direct('model.rods.length'),5,'New brace must add one fixed-length rod');
const tap=game(5);
assert.equal(tap("setup();canvas.onpointerdown("+touch(390,258)+");canvas.onpointerup("+touch(390,258)+");canvas.onpointerdown("+touch(570,343)+");canvas.onpointerup("+touch(570,343)+");JSON.stringify(design.brace)"),'[0,2]','Two-tap alternative must work');
const mobile=game(5);
assert.equal(mobile("setup();canvas.getBoundingClientRect=()=>({left:0,top:0,width:500,height:205});canvas.onpointerdown("+touch(195,129)+");canvas.onpointermove("+touch(285,171.5)+");canvas.onpointerup("+touch(285,171.5)+");JSON.stringify(design.brace)"),'[0,2]','Touch coordinates must scale correctly on a tablet');
const byButton=game(5);
assert.equal(byButton("setup();brace(0);brace(2);JSON.stringify(design.brace)"),'[0,2]','Accessible joint buttons must still connect braces');
const cancel=game(5);
assert.equal(cancel("setup();canvas.onpointerdown("+touch(390,258)+");canvas.onpointercancel("+touch(485,300)+");design.brace.length"),0,'Cancelled drag must not install a rod');
function trial(stage,brace,cargo){
 const run=game(stage);
 return run('setup();design.rail=railRise;design.gate=90;design.arm=100;design.brace='+JSON.stringify(brace)+';design.cargo='+cargo+';begin();for(let i=0;i<2800&&!["fall","won","blocked","tested"].includes(phase);i++)tick();phase');
}
assert.equal(trial(5,[],false),'fall','Without extra rod the hinged frame must distort');
assert.equal(trial(5,[0,1],false),'fall','Duplicating an edge must not reinforce the frame');
assert.equal(trial(5,[0,2],false),'won','Either diagonal [0,2] must triangulate the frame');
assert.equal(trial(5,[1,3],false),'won','Either diagonal [1,3] must triangulate the frame');
assert.equal(trial(6,[],false),'tested','Light worker must be able to cross unbraced stage 6');
assert.equal(trial(6,[],true),'fall','Heavy cargo must deform an unbraced frame');
assert.equal(trial(6,[0,2],true),'won','Heavy cargo must cross with a braced frame');
assert.equal(trial(8,[],true),'fall','Final cargo must fail without a brace');
assert.equal(trial(8,[1,3],true),'won','Final cargo must cross with a diagonal');
const failed=game(5);
assert.equal(failed("setup();begin();for(let i=0;i<2700&&phase!=='fall';i++)tick();phase"),'fall');
assert.equal(failed('model.nodes[0].x<390'),true,'Failure must visibly deform the top of the frame');
assert.equal(failed("for(let i=0;i<180;i++)tick();phase"),'edit','Failure must return to edit mode');
assert.equal(failed("document.getElementById('status').textContent.includes('흔들려')"),true,'Failure message must describe visible distortion');
console.log('PASS: frame bracing via drag and tap, cancellation, real rod constraints and cargo tests');

const measured=game(5);
assert.equal(measured("setup();begin();for(let i=0;i<2500&&phase!=='fall';i++)tick();model.wind"),2,'05 shaking must come from visible crosswind');
assert.ok(measured('model.peakShear')>35,'failed unbraced frame must actually shift');
const supported=game(5);
assert.equal(supported("setup();design.brace=[1,3];begin();for(let i=0;i<1300&&phase!=='won';i++)tick();phase"),'won');
assert.ok(supported('model.peakShear')<2,'rigid diagonal prevents measured shear even under wind');
assert.equal(supported('draw();true'),true,'brace rendering and displacement overlay work');
const sameWorker=game(6);
assert.equal(sameWorker('setup();model.wind'),0,'06 uses the same mechanism without 05 crosswind');
assert.equal(sameWorker('design.cargo=false;begin();for(let i=0;i<1500&&phase!=="tested";i++)tick();phase'),'tested','the light worker can still cross');
assert.ok(!fs.readFileSync(path.join(__dirname,'transport.html'),'utf8').includes('모터가 멈췄어요'),'child-facing failure text contains no technical motor stop');
console.log('PASS: stage 05 crosswind and measured shear, stable diagonal, stage 06 worker weight, canvas visual checks');

const stages = {
  2: [['design.rail=railRise','won'],['design.rail=0','fall'],['design.rail=54','fall']],
  3: [['design.gate=90','won'],['design.gate=45','blocked'],['design.gate=103','strain']],
  4: [['design.rail=railRise;design.gate=90','won'],['design.rail=0;design.gate=90','fall'],['design.rail=railRise','blocked']],
  7: [['design.arm=100','won'],['design.arm=65','fall'],['design.arm=120','blocked']],
  8: [['design.arm=100;design.rail=railRise;design.gate=90;design.brace=[1,3]','won'],['design.arm=100;design.rail=railRise;design.gate=90','fall'],['design.arm=100;design.rail=railRise;design.brace=[1,3]','blocked']],
  9: [['design.rail=railRise;design.railB=-44','won'],['design.rail=railRise','fall'],['design.railB=-44','fall']],
  10: [['design.gate=90','won'],['design.gate=60','blocked'],['design.gate=98','strain']],
  11: [['design.braces=[{side:0,ends:[0,2]},{side:1,ends:[1,3]}]','won'],['design.braces=[{side:1,ends:[1,3]}]','fall'],['design.braces=[{side:0,ends:[0,2]},{side:0,ends:[1,3]}]','fall']],
  12: [['design.arm=100;design.stopAngle=113','won'],['design.arm=65;design.stopAngle=113','fall'],['design.arm=100;design.stopAngle=125','blocked']]
};
for(const [id,trials] of Object.entries(stages)){
 for(const [designInput,expected] of trials){
  const run=game(+id);
  const actual=run('setup();'+designInput+';begin();for(let i=0;i<4000&&["machine","move"].includes(phase);i++)tick();draw();phase');
  console.log(id,designInput,actual);assert.equal(actual,expected);
 }
}
for(const value of [432,518]){
 assert.equal(first("demo=0;held=false;adjust("+value+");rewind('extend');for(let i=0;i<1200;i++)step(1/120);state"),'jam');
}
for(const gap of [8,10,12]){
 const run=game(7);
 assert.equal(run('!!connector(pt(0,0),pt('+gap+',8))'),gap<=10);
}
for(const hz of [30,60,120]){
 const run=game(9);
 assert.equal(run('setup();design.rail=railRise;design.railB=-44;begin();for(let frame=0;frame<18*'+hz+';frame++)for(let i=0;i<120/'+hz+';i++)tick();phase'),'won');
}
for(const [value,held,expected] of [[3.9,false,true],[4.2,false,false],[5.5,true,true],[6.1,true,false]]){
 const run=game(2);
 assert.equal(run('setup();lock.rail='+held+';setPart("rail",Math.tan(Math.atan2(railRise*.65,187)+'+value+'*rad)*187/.65);lock.rail'),expected);
}
for(const [cargo,minimum,maximum] of [[false,0,15],[true,15,100]]){
 const run=game(6);
 const shear=run('setup();design.cargo='+cargo+';begin();for(let i=0;i<2200&&["machine","move"].includes(phase);i++)tick();model.peakShear');
 assert.ok(shear>=minimum&&shear<maximum,'peak shear '+shear);
}
console.log('PASS: opposed rail errors, angled snap hysteresis, docking boundaries, three frame rates and load displacement');
