(() => {
  'use strict';
  const root = document.documentElement;
  const systemMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  const desktop = matchMedia('(min-width: 821px)');
  const motionButton = document.querySelector('.motion-toggle');
  const header = document.querySelector('.site-header');
  const hero = document.querySelector('.hero');
  const progress = document.querySelector('.reading-progress');
  const layers = [...document.querySelectorAll('[data-parallax]')];
  const tiltCards = [...document.querySelectorAll('[data-work-tilt]')];
  const sections = [...document.querySelectorAll('main > section[id]')];
  const navLinks = [...document.querySelectorAll('.site-nav a')];
  let manuallyReduced = false;
  try { manuallyReduced = localStorage.getItem('aoyagi-reduce-motion') === 'true'; } catch { /* Storage is optional. */ }
  let lenis = null;
  let revealObserver = null;
  let frame = 0;
  let headerHeight = header.offsetHeight;
  let heroHeight = hero.offsetHeight;
  let reduced = systemMotion.matches || manuallyReduced;

  function revealAll() {
    revealObserver?.disconnect();
    document.querySelectorAll('.reveal').forEach(el => {
      el.classList.remove('is-pending');
      el.classList.add('is-visible');
    });
  }

  function setupReveals() {
    if (reduced || !('IntersectionObserver' in window)) { revealAll(); return; }
    root.classList.add('motion-enabled');
    const els = [...document.querySelectorAll('.reveal:not(.is-visible)')];
    revealObserver?.disconnect();
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('is-pending');
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px 30px 0px' });
    els.forEach(el => {
      // Avoid hiding content that was already visible while scripts loaded.
      if (el.getBoundingClientRect().top < innerHeight) el.classList.add('is-visible');
      else { el.classList.add('is-pending'); revealObserver.observe(el); }
    });
  }

  function update() {
    frame = 0;
    const y = window.scrollY;
    const max = root.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? Math.min(1, Math.max(0, y / max)) : 0})`;
    if (!reduced && desktop.matches && y < heroHeight + headerHeight) {
      layers.forEach(el => { el.style.transform = `translate3d(0,${Math.min(y, heroHeight) * Number(el.dataset.parallax)}px,0)`; });
    }
    let current = '';
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= headerHeight + 100) current = section.id;
    }
    navLinks.forEach(link => {
      if (link.hash === `#${current}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }
  function requestUpdate() { if (!frame) frame = requestAnimationFrame(update); }

  function configureMotion() {
    reduced = systemMotion.matches || manuallyReduced;
    root.classList.toggle('motion-reduced', reduced);
    motionButton.setAttribute('aria-pressed', String(reduced));
    motionButton.textContent = reduced ? '動き：オフ' : '動きを抑える';
    motionButton.disabled = systemMotion.matches;
    motionButton.title = systemMotion.matches ? '端末の設定に合わせて動きを抑えています' : '';
    lenis?.destroy(); lenis = null;
    tiltCards.forEach(el => el.vanillaTilt?.destroy());
    layers.forEach(el => { el.style.transform = ''; });
    if (!reduced && finePointer.matches) {
      if (window.Lenis) lenis = new window.Lenis({ autoRaf:true, lerp:0.09, smoothWheel:true, syncTouch:false, anchors:false });
      if (window.VanillaTilt) window.VanillaTilt.init(tiltCards, { max:3.5, speed:500, perspective:1100, scale:1, glare:false, gyroscope:false });
    }
    setupReveals();
    requestUpdate();
  }

  // Preserve native hashes/history and put keyboard focus at the destination.
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      const target = document.getElementById(link.hash.slice(1));
      if (!target) return;
      event.preventDefault();
      if (location.hash !== link.hash) history.pushState(null, '', link.hash);
      const destination = Math.max(0, target.getBoundingClientRect().top + scrollY - headerHeight - 24);
      if (lenis) lenis.scrollTo(destination);
      else window.scrollTo({ top:destination, behavior:reduced ? 'instant' : 'smooth' });
      const alreadyFocusable = target.hasAttribute('tabindex');
      if (!alreadyFocusable) target.setAttribute('tabindex','-1');
      target.focus({ preventScroll:true });
      if (!alreadyFocusable) target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once:true });
    });
  });

  motionButton.hidden = false;
  motionButton.addEventListener('click', () => {
    manuallyReduced = !manuallyReduced;
    try { localStorage.setItem('aoyagi-reduce-motion', String(manuallyReduced)); } catch { /* Continue without persistence. */ }
    configureMotion();
  });
  function measure() {
    headerHeight = header.offsetHeight;
    heroHeight = hero.offsetHeight;
    root.style.setProperty('--header-height', `${headerHeight}px`);
    requestUpdate();
  }
  if ('ResizeObserver' in window) {
    const observer = new ResizeObserver(measure);
    observer.observe(header); observer.observe(hero);
  }
  addEventListener('resize', measure, { passive:true });
  addEventListener('scroll', requestUpdate, { passive:true });
  addEventListener('pageshow', () => { measure(); requestUpdate(); });
  systemMotion.addEventListener('change', configureMotion);
  finePointer.addEventListener('change', configureMotion);
  desktop.addEventListener('change', configureMotion);
  configureMotion(); measure();
})();
