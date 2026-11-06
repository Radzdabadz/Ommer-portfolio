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
welcome.querySelector('.welcome-logo').addEventListener('click', event => {
  event.preventDefault();
  finishOpening();
});
const replay = document.getElementById('replay-opening');
replay.hidden = false;
replay.addEventListener('click', showOpening);
let visited=false;try{visited=sessionStorage.getItem('ommer-editorial-visited')==='yes';}catch{}
if(requestedOpening!=='none' && (['keycap','terminal','boot'].includes(requestedOpening)||!visited))showOpening();
