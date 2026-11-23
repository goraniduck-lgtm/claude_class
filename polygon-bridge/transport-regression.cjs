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

function frameJourney(stage,brace,cargo){
 const run=game(stage);
 // Reset to the same starting shape. Only the physical bar graph and load differ.
 const expr='setup();design.rail=railRise;design.gate=90;design.arm=100;'+
   'design.brace='+JSON.stringify(brace)+';design.cargo='+cargo+';begin();'+
   'let sawFall=false,peak=0,maxRodError=0;'+
   'for(let i=0;i<3000;i++){tick();peak=Math.max(peak,model.peakShear);'+
   'for(const r of model.rods){const a=model.nodes[r.a],b=model.nodes[r.b];'+
   'maxRodError=Math.max(maxRodError,Math.abs(Math.hypot(a.x-b.x,a.y-b.y)-r.len))}'+
   'if(phase==="fall")sawFall=true;'+
   'if(phase==="won"||phase==="tested"||phase==="blocked")break}'+
   '({phase,sawFall,peak,maxRodError})';
 return run(expr);
}
const noBrace=frameJourney(5,[],false);
const duplicateBar=frameJourney(5,[0,1],false);
const diagonalAC=frameJourney(5,[0,2],false);
const diagonalBD=frameJourney(5,[1,3],false);
assert.ok(noBrace.sawFall&&noBrace.peak>30,'no brace must let frame shear and worker fall');
assert.ok(duplicateBar.sawFall&&duplicateBar.peak>30,'duplicate edge does not brace a hinged quadrilateral');
for(const r of [diagonalAC,diagonalBD]){
 assert.equal(r.phase,'won','either genuine diagonal must hold the walkway');
 assert.ok(r.peak<2,'diagonal constrains actual frame shear');
 assert.ok(r.maxRodError<1,'all rods maintain their built lengths');
}
assert.equal(frameJourney(6,[],false).phase,'tested','light worker crosses before adding cargo');
assert.ok(frameJourney(6,[],true).sawFall,'heavy cargo distorts unbraced bridge');
assert.ok(frameJourney(6,[0,1],true).sawFall,'duplicate side bar cannot carry heavy cargo');
assert.equal(frameJourney(6,[0,2],true).phase,'won','physical diagonal braces heavy cargo');
assert.equal(frameJourney(8,[1,3],true).phase,'won','same bracing engine works in composite stage');
const tap=game(5);
assert.equal(tap("setup();brace(0);brace(2);design.brace.join('-')"),'0-2','two hinge taps build the rod');
assert.equal(tap("selected"),null,'selection resets after placement');
assert.equal(tap("model.rods.length"),5,'the new brace is a fifth rigid distance constraint');
assert.equal(tap("brace(1);brace(1);selected"),null,'same hinge tap cancels selection');
console.log('PASS: hinged frame shear, redundant edges, two true braces, worker/cargo difference and stage 8 reuse');
