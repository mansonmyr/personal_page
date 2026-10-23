// A decorative teenage explorer in a black hoodie. Native CV links keep their normal download behaviour.
document.addEventListener('DOMContentLoaded', () => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const sprite = `<svg class="researcher-sprite" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 56" shape-rendering="crispEdges" aria-hidden="true" focusable="false">
    <g class="sprite-body">
      <!-- Raised hood, tousled fringe and a youthful pixel face. -->
      <path fill="#17151f" d="M13 3h14v3h4v4h2v14h-3v4H10v-4H7V10h2V6h4z"/>
      <path fill="#303039" d="M13 6h14v3h3v14h-3V12H13v11h-3V10h3z"/>
      <path fill="#ffe0cc" d="M12 12h16v11h-3v3H15v-3h-3z"/>
      <path fill="#101016" d="M12 9h15v3h2v4h-4v-3h-3v3h-4v-2h-6z"/>
      <path fill="#fff" d="M13 17h5v3h-5zm10 0h5v3h-5z"/>
      <path fill="#17151f" d="M15 17h2v3h-2zm9 0h2v3h-2zM18 23h5v1h-5z"/>
      <!-- Black pullover hoodie, drawstrings and kangaroo pocket. -->
      <path fill="#101016" d="M12 26h16v2h4v15H8V28h4z"/>
      <path fill="#25252e" d="M12 28h5l3 3 3-3h5v13H12z"/>
      <path fill="#08080e" d="M15 35h10v6H15z"/>
      <path fill="#454550" d="M16 35h8v1h-8zM12 42h16v2H12z"/>
      <path fill="#ddd7ce" d="M16 29h1v5h-1zm7 0h1v5h-1z"/>
      <g class="sprite-arm arm-left"><path fill="#101016" d="M7 28h5v13H5V32h2z"/><path fill="#303039" d="M7 30h2v8H7z"/><path fill="#08080e" d="M6 38h6v3H6z"/><path fill="#ffe0cc" d="M6 41h5v3H6z"/></g>
      <g class="sprite-arm arm-right"><path fill="#101016" d="M28 28h5v4h3v9h-8z"/><path fill="#303039" d="M30 30h2v8h-2z"/><path fill="#08080e" d="M28 38h7v3h-7z"/><path fill="#ffe0cc" d="M29 41h6v3h-6z"/></g>
    </g>
    <g class="sprite-leg leg-left"><path fill="#17151f" d="M12 44h7v8h-1v3H9v-5h3z"/><path fill="#454550" d="M13 44h5v6h-5z"/><path fill="#fff" d="M10 52h8v2h-8z"/><path fill="#7a5cff" d="M11 51h4v1h-4z"/></g>
    <g class="sprite-leg leg-right"><path fill="#17151f" d="M21 44h7v6h3v5H21z"/><path fill="#454550" d="M22 44h5v6h-5z"/><path fill="#fff" d="M22 52h8v2h-8z"/><path fill="#7a5cff" d="M25 51h4v1h-4z"/></g>
    <path class="sprite-shadow" fill="#ddd7ce" d="M7 55h27v1H7z"/></svg>`;
  const companion = document.createElement('div');
  companion.className = 'scroll-companion';
  companion.innerHTML = `<div class="companion-bubble" hidden>Thank you!<br><span>The CV is downloading.</span></div><div class="sprite-facing">${sprite}</div>`;
  companion.setAttribute('aria-hidden','true');
  document.body.append(companion);
  document.body.classList.add('has-companion');
  const status = document.createElement('div'); status.className = 'companion-status';
  status.setAttribute('role','status'); status.setAttribute('aria-live','polite'); status.setAttribute('aria-atomic','true');
  document.body.append(status);
  const bubble = companion.querySelector('.companion-bubble');
  // A separate viewport layer lets the paper fly out toward the visitor.
  const flight = document.createElement('div');
  flight.className = 'cv-flight'; flight.hidden = true; flight.setAttribute('aria-hidden','true');
  flight.innerHTML = '<div class="cv-paper"><span class="cv-paper-label">CURRICULUM VITAE</span><strong>OOI KAI HONG</strong><span class="cv-paper-rule"></span><span class="cv-paper-lines"></span><span class="cv-paper-stamp">CV</span></div>';
  document.body.append(flight);
  const paper = flight.querySelector('.cv-paper');
  let paperAnimation;
  function throwCV() {
    paperAnimation?.cancel(); flight.hidden = true;
    if (reduced.matches) return;
    flight.hidden = false;
    const hand = companion.getBoundingClientRect();
    const width = flight.clientWidth, height = flight.clientHeight;
    const pw = paper.offsetWidth, ph = paper.offsetHeight;
    const startX = hand.left + hand.width * .72 - pw / 2;
    const startY = hand.top + hand.height * .42 - ph / 2;
    const centerX = (width - pw) / 2;
    const centerY = (height - ph) / 2;
    const pose = (x,y,z,scale,rx,ry,rz) => `translate3d(${x}px,${y}px,${z}px) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg) scale(${scale})`;
    paperAnimation = paper.animate([
      {offset:0, opacity:0, transform:pose(startX,startY,0,.16,15,-45,20)},
      {offset:.12, opacity:1, transform:pose(startX,startY-24,0,.2,-15,-25,-15)},
      {offset:.48, opacity:1, transform:pose(centerX,Math.max(40,height*.14)-ph/2,100,.65,24,30,-12)},
      {offset:.76, opacity:1, transform:pose(centerX,centerY,380,1,-8,-12,5)},
      {offset:.88, opacity:1, transform:pose(centerX,centerY,490,1.15,0,0,0)},
      {offset:1, opacity:0, transform:pose(centerX,centerY,690,1.4,0,0,-3)}
    ], {duration:1700, easing:'cubic-bezier(.2,.65,.35,1)', fill:'both'});
    paperAnimation.onfinish = () => { flight.hidden = true; };
  }
  const rail = document.querySelector('.experience-rail');
  const cards = rail ? [...rail.querySelectorAll('.timeline-card')] : [];
  let activeCard = null;
  let stage = null;
  if (rail) {
    stage = document.createElement('div'); stage.className = 'companion-trail'; stage.setAttribute('aria-hidden','true');
    stage.innerHTML = '<span class="trail-sign">EXPLORING THE EXPERIENCE LOG</span><span class="trail-ground"></span>';
    rail.before(stage);
  }
  const toggle = document.createElement('button'); toggle.type='button'; toggle.className='companion-toggle';
  toggle.textContent='Hide character'; toggle.setAttribute('aria-pressed','true');
  (document.querySelector('.footer, .detail-footer') || document.querySelector('main')).append(toggle);
  let shown = true, frame = 0, lastY = window.scrollY, lastRail = rail?.scrollLeft || 0;
  let walkTimer = 0, celebrateTimer = 0;
  let celebrating = false;
  function position() {
    frame = 0;
    if (!shown) return;
    const w = companion.offsetWidth, h = companion.offsetHeight;
    const viewport = window.visualViewport;
    const vw = viewport?.width || window.innerWidth, vh = viewport?.height || window.innerHeight;
    const progress = Math.min(1, Math.max(0,window.scrollY / Math.max(1,document.documentElement.scrollHeight - window.innerHeight)));
    let x = Math.max(4,vw - w - 6);
    let y = 116 + progress * Math.max(0,vh - h - 144);
    let onTrail = false;
    if (stage && !reduced.matches && !celebrating) {
      const headerBottom = Math.max(12,document.querySelector('.topbar')?.getBoundingClientRect().bottom || 92);
      // Keep the walking track below the sticky header while the cards pass beneath it.
      stage.style.top = `${Math.ceil(headerBottom + 10)}px`;
      const rect = stage.getBoundingClientRect();
      const feet = rect.bottom - 8;
      if (feet - h >= headerBottom + 4 && feet <= vh - 12) {
        const fraction = rail.scrollLeft / Math.max(1,rail.scrollWidth - rail.clientWidth);
        x = rect.left + 12 + Math.max(0,Math.min(1,fraction)) * Math.max(0,rect.width - w - 24);
        y = rect.bottom - h - 8; onTrail = true;
      }
    }
    if (reduced.matches) y = vh - h - 20;
    x = Math.max(4,Math.min(x,vw - w - 4)); y=Math.max(100,Math.min(y,vh - h - 12));
    companion.style.transform=`translate3d(${Math.round(x)}px,${Math.round(y)}px,0)`;
    companion.classList.toggle('on-trail',onTrail);
    const rightSpace = vw - x - w - 22, leftSpace = x - 22;
    companion.classList.toggle('bubble-right',rightSpace > leftSpace);
    companion.style.setProperty('--bubble-width',`${Math.min(260,Math.max(120,Math.max(rightSpace,leftSpace)))}px`);
    if (!celebrating) {
      // Describe the card nearest the middle of the visible timeline.
      const railRect = rail?.getBoundingClientRect();
      const inView = railRect && railRect.top < vh && railRect.bottom > 105;
      const showRole = onTrail || (reduced.matches && inView);
      companion.classList.toggle('is-narrating',Boolean(showRole));
      bubble.hidden = !showRole;
      if (showRole && cards.length) {
        const middle = railRect.left + railRect.width / 2;
        const current = cards.reduce((best,card) => {
          const r = card.getBoundingClientRect(), b = best.getBoundingClientRect();
          return Math.abs(r.left+r.width/2-middle) < Math.abs(b.left+b.width/2-middle) ? card : best;
        });
        if (current !== activeCard) {
          activeCard = current;
          bubble.textContent = current.dataset.companionNote;
        }
      }
    }
  }
  function requestPosition() { if (!frame) frame=requestAnimationFrame(position); }
  function walk(direction) {
    if (reduced.matches || !shown || celebrating) return;
    companion.classList.toggle('faces-left',direction < 0); companion.classList.add('is-walking');
    clearTimeout(walkTimer); walkTimer=setTimeout(()=>companion.classList.remove('is-walking'),180);
  }
  window.addEventListener('scroll',()=>{
    const next=window.scrollY; if(next!==lastY) walk(next-lastY); lastY=next; requestPosition();
  },{passive:true});
  rail?.addEventListener('scroll',()=>{
    const next=rail.scrollLeft; if(next!==lastRail) walk(next-lastRail);lastRail=next;requestPosition();
  },{passive:true});
  window.addEventListener('resize',requestPosition,{passive:true});
  window.visualViewport?.addEventListener('resize',requestPosition,{passive:true});
  reduced.addEventListener('change',()=>{companion.classList.remove('is-walking');paperAnimation?.cancel();flight.hidden=true;requestPosition();});
  toggle.addEventListener('click',()=>{
    shown=!shown; companion.hidden=!shown; if(!shown){paperAnimation?.cancel();flight.hidden=true;} document.body.classList.toggle('has-companion',shown);
    toggle.textContent=shown?'Hide character':'Show character';toggle.setAttribute('aria-pressed',String(shown));
    stage?.classList.toggle('companion-disabled',!shown);requestPosition();
  });
  document.addEventListener('click',e=>{
    const a=e.target.closest('a[download]');
    if (!a || e.defaultPrevented || e.button!==0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const url=new URL(a.href,location.href);
    if(url.origin!==location.origin || !url.pathname.toLowerCase().endsWith('.pdf')) return;
    // Do not preventDefault, replace the link or use a delayed synthetic click:
    // the original same-origin download starts in the user's own click gesture.
    status.textContent='Thank you! The CV is downloading.';
    if (!shown) return;
    celebrating=true; clearTimeout(walkTimer); clearTimeout(celebrateTimer);
    companion.classList.remove('is-walking','is-celebrating');
    companion.classList.remove('is-narrating');
    bubble.innerHTML='Thank you!<br><span>The CV is downloading.</span>';
    activeCard=null; bubble.hidden=false; position();
    requestAnimationFrame(()=>{companion.classList.add('is-celebrating');throwCV();});
    celebrateTimer=setTimeout(()=>{celebrating=false;companion.classList.remove('is-celebrating');bubble.hidden=true;requestPosition();},3200);
  });
  document.fonts?.ready.then(requestPosition);
  requestPosition();
});
