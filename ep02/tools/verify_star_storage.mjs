// Run from the repository: node ep02/tools/verify_star_storage.mjs http://localhost:8716/
// Requires the existing tools/tests Puppeteer dependency and a served repository.
// Uses real public pages and the actual card/ending flow; no app-function extraction,
// audio interception, source rewriting, or shortened timing metadata.
import puppeteer from '../../tools/tests/node_modules/puppeteer-core/lib/puppeteer/puppeteer-core.js';
import assert from 'node:assert/strict';
const base=new URL(process.argv[2]||'http://localhost:8716/');
const browser=await puppeteer.launch({headless:true,executablePath:process.env.CHROME||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',args:['--use-angle=swiftshader','--enable-unsafe-swiftshader','--autoplay-policy=no-user-gesture-required']});
try{
 const episode=await browser.newPage(),other=await browser.newPage();
 await episode.setViewport({width:390,height:844,isMobile:true,hasTouch:true});
 const cardUrl=new URL('ep02/?jump=card&mute=1&rm=1',base).href;
 await episode.goto(cardUrl);await episode.waitForFunction(()=>window.__ready,{polling:100});
 await other.goto(new URL('ep16/?mute=1&rm=1',base).href);await other.waitForFunction(()=>window.__ready,{polling:100});
 assert.equal(new URL(episode.url()).origin,new URL(other.url()).origin,'two actual tabs must share an origin');
 const stored=()=>episode.evaluate(()=>JSON.parse(localStorage.getItem('cc_stars')));
 async function completeCard(){
  await episode.bringToFront(); // Switch the active tab within this headless browser only.
  await episode.click('[data-value="shield"]');await episode.click('#carve');
  await episode.waitForFunction(()=>{const b=document.querySelector('#carve');return b&&!b.disabled&&b.textContent.includes('送回罗盘');},{timeout:20000,polling:100});
  await episode.click('#carve');await episode.waitForFunction(()=>window.__done,{timeout:20000,polling:100});
 }
 async function scenario(initial,latest,expected,label){
  await episode.evaluate(initial=>{localStorage.setItem('cc_stars',JSON.stringify(initial));localStorage.setItem('cc_rate','1');},initial);
  await episode.bringToFront();await episode.goto(cardUrl);await episode.waitForFunction(()=>window.__ready,{polling:100});
  assert.match(await episode.$eval('#stars',e=>e.textContent),new RegExp(initial.length+' / 17'),'ep02 starts with its earlier snapshot');
  // Arrange a completion written by another tab through the actual same-origin
  // localStorage API. This arranges the other tab's updated precondition; it does not replace
  // a full end-to-end acceptance test of episode 16.
  await other.evaluate(latest=>localStorage.setItem('cc_stars',JSON.stringify(latest)),latest);
  assert.deepEqual(await stored(),latest,'second tab really changed the shared store before ep02 completes');
  await completeCard();assert.deepEqual(await stored(),expected,label);
  assert.match(await episode.$eval('#stars',e=>e.textContent),new RegExp(expected.length+' / 17'),'HUD reflects merged total');
  console.log('PASS',label,JSON.stringify(await stored()));
  await episode.bringToFront();await episode.goto(new URL('ep02/?mute=1&rm=1',base).href);await episode.waitForFunction(()=>window.__ready,{polling:100});
  assert.match(await episode.$eval('#stars',e=>e.textContent),new RegExp(expected.length+' / 17'),'reopening restores the merged total');
 }
 await scenario([1],[1,16],[1,2,16],'another tab\'s star 16 survives ep02 completion');
 await scenario([1,5],[2,2,16,16,17,0,18,-1,'bad',true,null],[1,2,5,16,17],'merge prior memory and latest valid stars; remove duplicates and invalid ids');
 console.log('PASS both real same-origin tabs, real public card flow, and restored totals');
}finally{
 // Closing two live rendering tabs can leave a CDP pipe open on macOS. Bound
 // cleanup to this script's own headless child; failed assertions still throw.
 await Promise.race([browser.close(),new Promise(resolve=>setTimeout(resolve,3000))]);
 browser.disconnect();
 const child=browser.process();if(child&&child.exitCode===null)child.kill('SIGTERM');
}
process.exit(0);
