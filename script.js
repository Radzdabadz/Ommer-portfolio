/* A small game-connection exercise, opened only when a visitor chooses to explore it. */
const demo = {
  "scope": {
    "heading": "One game, or every app?",
    "copy": "Check whether the issue affects only the game, other apps or other devices before choosing a test.",
    "button": "Only this game",
    "response": "Next: check the game’s service status and note the exact error message. Compare another app or game if available."
  },
  "check": {
    "heading": "Test one thing at a time.",
    "copy": "Check service status, record the error and compare the connection with another app before changing settings.",
    "button": "Still disconnecting",
    "response": "Document the symptoms and completed checks so the issue can be reproduced or passed on for further investigation."
  },
  "explain": {
    "heading": "Explain what you found.",
    "copy": "Summarise the pattern and the next step in plain language, without promising a fix before the cause is known.",
    "button": "Show an update",
    "response": "“Other apps are staying connected, so I’m checking whether the issue is specific to this game. I’ll record the error and test one change at a time.”"
  }
};
const dialog = document.getElementById('support-dialog');
const tabs = [...document.querySelectorAll('[role="tab"]')];
let currentStep = 'scope';
let previousFocus;
function setStep(step) {
  currentStep = step;
  tabs.forEach(tab => {const selected = tab.dataset.step === step; tab.setAttribute('aria-selected',String(selected));tab.tabIndex=selected?0:-1;});
  document.getElementById('demo-panel').setAttribute('aria-labelledby',step+'-tab');
  document.getElementById('demo-heading').textContent=demo[step].heading;
  document.getElementById('demo-copy').textContent=demo[step].copy;
  document.getElementById('demo-response').firstChild.textContent=demo[step].button+' ';
  document.getElementById('demo-status').textContent='Choose a response to explore the next step.';
}
document.getElementById('open-demo').addEventListener('click',()=>{previousFocus=document.activeElement;setStep('scope');dialog.showModal();document.body.style.overflow='hidden';});
document.getElementById('close-demo').addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',()=>{document.body.style.overflow='';previousFocus?.focus();});
dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();});
tabs.forEach((tab,index)=>{tab.addEventListener('click',()=>setStep(tab.dataset.step));tab.addEventListener('keydown',event=>{let next;if(event.key==='ArrowRight')next=(index+1)%tabs.length;if(event.key==='ArrowLeft')next=(index+tabs.length-1)%tabs.length;if(event.key==='Home')next=0;if(event.key==='End')next=tabs.length-1;if(next!==undefined){event.preventDefault();setStep(tabs[next].dataset.step);tabs[next].focus();}});});
document.getElementById('demo-response').addEventListener('click',()=>{document.getElementById('demo-status').textContent=demo[currentStep].response;});

/* A fine progress rule adds a small editorial reading cue. */
let queued=false;
function updateProgress(){const max=document.documentElement.scrollHeight-window.innerHeight;document.querySelector('.reading-progress').style.transform='scaleX('+(max>0?Math.min(1,window.scrollY/max):0)+')';queued=false;}
window.addEventListener('scroll',()=>{if(!queued){requestAnimationFrame(updateProgress);queued=true;}},{passive:true});
window.addEventListener('resize',updateProgress);
document.getElementById('year').textContent=new Date().getFullYear();
updateProgress();

/* Three independently addressable opening experiments. Skip and Escape always work. */
const welcome=document.getElementById('welcome-dialog');
const openingVariants=[...document.querySelectorAll('[data-opening]')];
const requestedOpening=new URLSearchParams(location.search).get('opening');
const openingStyle=['keycap','terminal','boot'].includes(requestedOpening)?requestedOpening:'terminal';
let entering=false;
let entryTimer;
function finishOpening(){
  clearTimeout(entryTimer);entering=false;
  if(welcome.open)welcome.close();
  document.body.style.overflow='';
  try{sessionStorage.setItem('ommer-editorial-visited','yes');}catch{}
  const heading=document.getElementById('hero-title');heading.tabIndex=-1;heading.focus({preventScroll:true});
}
function showOpening(){
  entering=false;clearTimeout(entryTimer);
  welcome.dataset.style=openingStyle;
  openingVariants.forEach(variant=>variant.hidden=variant.dataset.opening!==openingStyle);
  const selected=openingVariants.find(variant=>!variant.hidden);
  welcome.removeAttribute('aria-labelledby');
  welcome.setAttribute('aria-label','Welcome to Ommer’s portfolio: '+openingStyle+' opening');
  document.getElementById('welcome-stage').hidden=false;
  document.getElementById('opening-transition').hidden=true;
  welcome.showModal();document.body.style.overflow='hidden';
  selected.querySelector('.opening-trigger').focus({preventScroll:true});
}
function beginOpening(){
  if(entering)return;entering=true;
  document.getElementById('welcome-stage').hidden=true;
  document.getElementById('opening-transition').hidden=false;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  entryTimer=setTimeout(finishOpening,reduced?100:850);
}
document.querySelectorAll('.opening-trigger').forEach(button=>button.addEventListener('click',beginOpening));
welcome.addEventListener('cancel',()=>{clearTimeout(entryTimer);entering=false;});
welcome.addEventListener('close',()=>{clearTimeout(entryTimer);document.body.style.overflow='';try{sessionStorage.setItem('ommer-editorial-visited','yes');}catch{}});
document.getElementById('skip-opening').addEventListener('click',finishOpening);
document.getElementById('replay-opening').addEventListener('click',showOpening);
let visited=false;try{visited=sessionStorage.getItem('ommer-editorial-visited')==='yes';}catch{}
if(requestedOpening!=='none' && (['keycap','terminal','boot'].includes(requestedOpening)||!visited))showOpening();
