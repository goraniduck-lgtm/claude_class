const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
function element(){return {style:{},append(){},add(){},replaceChildren(){},setAttribute(){},querySelectorAll(){return []},getContext(){return {}}}}
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
console.log('PASS: rail capture/release, eight journeys, gate contact/reset/obstruction and landing gaps');