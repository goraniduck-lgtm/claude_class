const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
function element(){let captured=false;return {style:{},append(){},add(){},replaceChildren(){},setAttribute(){},querySelectorAll(){return []},getContext(){return {}},getBoundingClientRect(){return {left:0,top:0,width:1000,height:410}},setPointerCapture(){captured=true},hasPointerCapture(){return captured},releasePointerCapture(){captured=false}}}
function game(stage){
 const filename=stage===1?'telescopic-bridge.html':'transport.html';
 const source=fs.readFileSync(path.join(__dirname,filename),'utf8').split('<script>')[1].split('</script>')[0];
 const elements={},env={document:{getElementById:id=>elements[id]??=element(),createElement:element},Option:function(){},location:{hash:'#'+stage},requestAnimationFrame(){}};
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