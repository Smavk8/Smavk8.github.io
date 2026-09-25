/* Scroll-linked stacking and procedural 3D scene entrances for the report path. */
(() => {
  const section = document.getElementById('data-path-story');
  if (!section) return;

  const cards = Array.from(section.querySelectorAll('[data-path-card]'));
  const progressCount = section.querySelector('.data-path-progress-count b');
  const progressSegments = Array.from(section.querySelectorAll('.data-path-progress-track i'));
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let frame = 0;

  if (reducedMotion.matches) cards.forEach(card => card.classList.add('is-entered'));
  else if ('IntersectionObserver' in window) {
    const entranceObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-entered');
        entranceObserver.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -9% 0px', threshold: 0.04 });
    cards.forEach(card => entranceObserver.observe(card));
  } else cards.forEach(card => card.classList.add('is-entered'));

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const render = () => {
    frame = 0;
    const narrow = window.innerWidth <= 700;
    let activeIndex = 0;

    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const pinTop = Number.parseFloat(getComputedStyle(card).top) || (narrow ? 114 : 112);
      if (rect.top <= pinTop + 58) activeIndex = index + 1;

      let cover = 0;
      const next = cards[index + 1];
      if (next && !reducedMotion.matches) {
        const nextTop = next.getBoundingClientRect().top;
        const startAt = pinTop + rect.height * .72;
        const travel = Math.max(190, rect.height * .48);
        cover = clamp((startAt - nextTop) / travel, 0, 1);
      }

      const side = Number(card.dataset.pathSide) || 1;
      const offset = Math.min(narrow ? 22 : 84, window.innerWidth * (narrow ? .055 : .045));
      card.style.setProperty('--path-cover-x', `${(-side * cover * offset).toFixed(1)}px`);
      card.style.setProperty('--path-cover-y', `${(-cover * (narrow ? 8 : 18)).toFixed(1)}px`);
      card.style.setProperty('--path-cover-z', `${(-cover * (narrow ? 38 : 112)).toFixed(1)}px`);
      card.style.setProperty('--path-cover-turn', `${(side * cover * (narrow ? 2.2 : 6.5)).toFixed(2)}deg`);
      card.style.setProperty('--path-cover-scale', `${(1 - cover * (narrow ? .025 : .075)).toFixed(4)}`);
      card.style.setProperty('--path-cover-opacity', `${(1 - cover * .84).toFixed(3)}`);
      card.style.setProperty('--path-cover-blur', `${(cover * (narrow ? .35 : 1.1)).toFixed(2)}px`);
      card.classList.toggle('is-covered', cover > .04);
      card.classList.toggle('is-scene-visible', !reducedMotion.matches && rect.bottom > -100 && rect.top < window.innerHeight + 100 && cover <= .04);
    });

    if (progressCount) progressCount.textContent = String(Math.max(1, activeIndex)).padStart(2, '0');
    progressSegments.forEach((segment, index) => {
      segment.classList.toggle('is-passed', index < activeIndex);
      segment.classList.toggle('is-active', index === Math.max(0, activeIndex - 1));
    });
  };
  const scheduleRender = () => {
    if (frame || reducedMotion.matches) return;
    frame = requestAnimationFrame(render);
  };

  render();
  window.addEventListener('scroll', scheduleRender, { passive: true });
  window.addEventListener('resize', scheduleRender, { passive: true });
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) scheduleRender();
  });
  reducedMotion.addEventListener?.('change', () => {
    if (reducedMotion.matches) {
      cards.forEach(card => {
        card.classList.add('is-entered');
        card.style.removeProperty('--path-cover-x');
        card.style.removeProperty('--path-cover-y');
        card.style.removeProperty('--path-cover-z');
        card.style.removeProperty('--path-cover-turn');
        card.style.removeProperty('--path-cover-scale');
        card.style.removeProperty('--path-cover-opacity');
        card.style.removeProperty('--path-cover-blur');
      });
    } else scheduleRender();
  });
})();
