document.addEventListener('DOMContentLoaded', () => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const motion = () => reduced.matches ? 'auto' : 'smooth';
  const nav = document.getElementById('site-nav');
  const menu = document.querySelector('.menu-toggle');
  function closeMenu(returnFocus = false) {
    if (!menu || !nav) return;
    const wasOpen = menu.getAttribute('aria-expanded') === 'true';
    nav.classList.remove('is-open'); menu.setAttribute('aria-expanded', 'false');
    if (wasOpen && returnFocus) menu.focus();
  }
  menu?.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open)); nav?.classList.toggle('is-open', open);
  });
  nav?.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(true); });
  document.addEventListener('click', e => { if (!e.target.closest('.topbar')) closeMenu(); });
  window.matchMedia('(min-width: 851px)').addEventListener('change', () => closeMenu());

  document.querySelectorAll('.grab-rail').forEach(rail => {
    let down = false, startX = 0, startScroll = 0;
    rail.addEventListener('pointerdown', e => {
      if (e.pointerType !== 'mouse' || e.button !== 0 || e.target.closest('a,button,summary')) return;
      down = true; startX = e.clientX; startScroll = rail.scrollLeft;
      rail.classList.add('grabbing'); rail.setPointerCapture(e.pointerId);
    });
    rail.addEventListener('pointermove', e => { if (down) rail.scrollLeft = startScroll - (e.clientX - startX); });
    const release = () => { down = false; rail.classList.remove('grabbing'); };
    rail.addEventListener('pointerup', release); rail.addEventListener('pointercancel', release);
    rail.addEventListener('keydown', e => {
      if (e.target !== rail || !['ArrowLeft','ArrowRight'].includes(e.key)) return;
      e.preventDefault(); rail.scrollBy({left: (e.key === 'ArrowRight' ? 1 : -1) * rail.clientWidth * .8, behavior: motion()});
    });
  });
  document.querySelectorAll('.rail-btn').forEach(btn => btn.addEventListener('click', () => {
    const rail = document.getElementById(btn.dataset.target);
    if (rail) rail.scrollBy({left: Math.min(rail.clientWidth * .82, 600) * Number(btn.dataset.dir), behavior: motion()});
  }));
  const sections = document.querySelectorAll('main section[id]');
  if ('IntersectionObserver' in window && sections.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        nav?.querySelectorAll('a').forEach(a => {
          if (a.hash === '#' + entry.target.id) a.setAttribute('aria-current','location');
          else a.removeAttribute('aria-current');
        });
      });
    }, {rootMargin:'-15% 0px -60% 0px'});
    sections.forEach(s => observer.observe(s));
  }
  const emailReveal = document.getElementById('email-reveal');
  const emailPanel = document.getElementById('email-panel');
  const emailInput = document.getElementById('contact-email');
  const emailCopy = document.getElementById('email-copy');
  const emailStatus = document.getElementById('email-copy-status');
  emailReveal?.addEventListener('click', () => {
    const expanded = emailReveal.getAttribute('aria-expanded') !== 'true';
    emailReveal.setAttribute('aria-expanded', String(expanded));
    emailPanel.hidden = !expanded;
    if (expanded) { emailInput.focus({preventScroll:true}); emailInput.select(); }
  });
  emailInput?.addEventListener('click', () => emailInput.select());
  emailCopy?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(emailInput.value);
      emailStatus.textContent = 'Email address copied!';
    } catch {
      emailInput.focus({preventScroll:true}); emailInput.select();
      emailStatus.textContent = 'The address is selected. Use your device’s Copy command.';
    }
  });

});
