(() => {
  const section = document.querySelector('.jitter-stack-container');
  if (!section) return;

  const cards = Array.from(section.querySelectorAll('.stack-card[id^="stack-card-"]'));
  if (!cards.length) return;

  const canvas = document.createElement('canvas');
  canvas.className = 'architecture-telemetry-field';
  canvas.setAttribute('aria-hidden', 'true');
  section.prepend(canvas);

  const context = canvas.getContext('2d', { alpha: true });
  if (!context) {
    canvas.remove();
    return;
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const palette = ['#41dcff', '#42e6d0', '#bd8bff'];
  let width = 0;
  let height = 0;
  let pixelRatio = 1;
  let visible = false;
  let frame = 0;
  let lastPaint = 0;
  let stage = 0;
  let stageProgress = 0;
  let pointerX = .5;
  let pointerY = .5;
  let targetX = .5;
  let targetY = .5;

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const ease = value => value * value * (3 - 2 * value);

  function measure() {
    width = section.clientWidth;
    height = section.scrollHeight;
    pixelRatio = Math.min(window.devicePixelRatio || 1, 1.25);
    canvas.width = Math.max(1, Math.round(width * pixelRatio));
    canvas.height = Math.max(1, Math.round(height * pixelRatio));
    canvas.style.height = `${height}px`;
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    context.lineCap = 'round';
    context.lineJoin = 'round';
    updateJourney();
    schedulePaint();
  }

  function journeyMetrics() {
    const runway = Math.max(320, parseFloat(getComputedStyle(section).getPropertyValue('--architecture-runway')) || window.innerHeight * .7);
    return { runway };
  }

  function updateJourney() {
    const { runway } = journeyMetrics();
    const stickyTop = parseFloat(getComputedStyle(cards[0]).top) || 96;
    let index = 0;
    // offsetTop is browser-dependent for sticky elements. Read the visible top
    // edge instead so the topmost card changes exactly when it reaches the line.
    for (let cardIndex = 1; cardIndex < cards.length; cardIndex += 1) {
      if (cards[cardIndex].getBoundingClientRect().top <= stickyTop + 2) index = cardIndex;
      else break;
    }
    const nextCard = cards[index + 1];
    stage = index;
    stageProgress = nextCard
      ? clamp(1 - (nextCard.getBoundingClientRect().top - stickyTop) / Math.max(runway, 1), 0, .98)
      : 0;

    cards.forEach((card, cardIndex) => {
      const distance = Math.abs((stage + stageProgress) - cardIndex);
      const energy = clamp(1 - distance, 0, 1);
      card.classList.toggle('is-architecture-active', energy >= .5 || (cardIndex === stage && stageProgress < .5));
      card.dataset.architectureState = energy > .6 ? 'active' : energy > .04 ? 'handoff' : 'queued';
      // Promote only the card which has reached the shared sticky line. This lets
      // it cover the prior card as a complete rectangle without resizing either.
      card.style.zIndex = cardIndex === stage ? '60' : cardIndex < stage ? String(20 + cardIndex) : String(10 + cardIndex);
    });
  }

  function drawOrbit(cx, cy, rx, ry, color, time, active, direction) {
    context.save();
    context.translate(cx, cy);
    context.scale(1, .55);
    context.strokeStyle = color;
    context.lineWidth = 1;
    context.globalAlpha = .15 + active * .22;
    for (let ring = 0; ring < 3; ring += 1) {
      context.beginPath();
      context.ellipse(0, 0, rx + ring * 12, ry + ring * 12, 0, 0, Math.PI * 2);
      context.setLineDash(ring === 1 ? [2, 7] : []);
      context.stroke();
    }
    context.setLineDash([]);
    const angle = (reducedMotion.matches ? .8 : time * .00022 * direction) + active * 1.2;
    const nodeX = Math.cos(angle) * (rx + 10);
    const nodeY = Math.sin(angle) * (ry + 10);
    const glow = context.createRadialGradient(nodeX, nodeY, 0, nodeX, nodeY, 15 + active * 9);
    glow.addColorStop(0, color);
    glow.addColorStop(1, 'rgba(42, 207, 255, 0)');
    context.fillStyle = glow;
    context.globalAlpha = .48 + active * .42;
    context.beginPath();
    context.arc(nodeX, nodeY, 15 + active * 9, 0, Math.PI * 2);
    context.fill();
    context.fillStyle = '#d7fbff';
    context.beginPath();
    context.arc(nodeX, nodeY, 2.2 + active * 1.8, 0, Math.PI * 2);
    context.fill();
    context.restore();
  }

  function draw(time) {
    frame = 0;
    if (!visible || document.hidden) return;
    if (!reducedMotion.matches && time - lastPaint < 32) {
      schedulePaint();
      return;
    }
    lastPaint = time;

    const sectionTop = section.getBoundingClientRect().top;
    const visibleTop = clamp(-sectionTop, 0, height);
    const visibleBottom = clamp(visibleTop + window.innerHeight, 0, height);
    if (visibleBottom <= visibleTop) return;

    context.save();
    context.beginPath();
    context.rect(0, visibleTop, width, visibleBottom - visibleTop);
    context.clip();
    context.clearRect(0, visibleTop, width, visibleBottom - visibleTop);

    pointerX += (targetX - pointerX) * .045;
    pointerY += (targetY - pointerY) * .045;
    const parallaxX = (pointerX - .5) * Math.min(width * .018, 22);
    const parallaxY = (pointerY - .5) * 18;
    const stageCenters = cards.map(card => card.offsetTop + card.offsetHeight * .5);

    // A quiet perspective grid gives the stack a dimensional stage without covering card media.
    const gridTop = Math.max(visibleTop - 90, 0);
    const gridBottom = Math.min(visibleBottom + 90, height);
    context.lineWidth = 1;
    for (let line = -5; line <= 5; line += 1) {
      const x = width * .5 + line * width * .115 + parallaxX;
      context.beginPath();
      context.moveTo(width * .5 + parallaxX, gridTop);
      context.lineTo(x, gridBottom);
      context.strokeStyle = 'rgba(86, 197, 225, .075)';
      context.stroke();
    }
    for (let line = 0; line < 18; line += 1) {
      const t = line / 17;
      const y = gridTop + (gridBottom - gridTop) * t * t;
      context.beginPath();
      context.moveTo(width * .04, y + parallaxY);
      context.lineTo(width * .96, y + parallaxY);
      context.strokeStyle = `rgba(86, 197, 225, ${.025 + t * .035})`;
      context.stroke();
    }

    stageCenters.forEach((centerY, index) => {
      const active = clamp(1 - Math.abs((stage + stageProgress) - index), 0, 1);
      const color = palette[index % palette.length];
      const y = centerY + parallaxY;
      drawOrbit(width * .025 + parallaxX, y, 16, 48, color, time, active, 1);
      drawOrbit(width * .975 + parallaxX, y, 16, 48, color, time, active, -1);
      for (const edgeX of [width * .025, width * .975]) {
        context.beginPath();
        context.moveTo(edgeX, y);
        context.lineTo(edgeX + (edgeX < width / 2 ? 16 : -16), y);
        context.strokeStyle = color;
        context.globalAlpha = .23 + active * .4;
        context.stroke();
      }
    });

    // The travelling beacon follows the same three beats as the sticky card handoff.
    const leftIndex = Math.min(stage, stageCenters.length - 1);
    const rightIndex = Math.min(leftIndex + 1, stageCenters.length - 1);
    const travel = rightIndex === leftIndex ? 1 : ease(stageProgress);
    const fromY = stageCenters[leftIndex] + parallaxY;
    const toY = stageCenters[rightIndex] + parallaxY;
    const fromX = width * .025 + parallaxX;
    const toX = width * .975 + parallaxX;
    const controlY = (fromY + toY) * .5;
    const pulseT = reducedMotion.matches ? travel : (travel + (time * .00009) % .18) % 1;
    const pulseX = (1 - pulseT) * (1 - pulseT) * fromX + 2 * (1 - pulseT) * pulseT * width * .5 + pulseT * pulseT * toX;
    const pulseY = (1 - pulseT) * (1 - pulseT) * fromY + 2 * (1 - pulseT) * pulseT * controlY + pulseT * pulseT * toY;
    const pulseGlow = context.createRadialGradient(pulseX, pulseY, 0, pulseX, pulseY, 32);
    pulseGlow.addColorStop(0, 'rgba(181, 248, 255, .9)');
    pulseGlow.addColorStop(.18, palette[leftIndex]);
    pulseGlow.addColorStop(1, 'rgba(40, 198, 255, 0)');
    context.fillStyle = pulseGlow;
    context.globalAlpha = .6;
    context.beginPath();
    context.arc(pulseX, pulseY, 32, 0, Math.PI * 2);
    context.fill();

    // Small particles drift only in the gaps around the cards; none are real telemetry values.
    const seedCount = window.innerWidth < 700 ? 18 : 34;
    for (let i = 0; i < seedCount; i += 1) {
      const x = ((i * .61803398875) % 1) * width;
      const baseY = ((i * .754877666) % 1) * height;
      const drift = reducedMotion.matches ? 0 : Math.sin(time * .00032 + i * 1.7) * 12;
      const y = baseY + drift;
      if (y < visibleTop || y > visibleBottom) continue;
      context.beginPath();
      context.arc(x, y, i % 8 === 0 ? 1.8 : 1.1, 0, Math.PI * 2);
      context.fillStyle = i % 3 === 0 ? 'rgba(137, 111, 255, .42)' : 'rgba(103, 222, 245, .42)';
      context.fill();
    }
    context.restore();
    if (!reducedMotion.matches) schedulePaint();
  }

  function schedulePaint() {
    if (!frame && visible && !document.hidden) frame = requestAnimationFrame(draw);
  }

  function onScroll() {
    updateJourney();
    schedulePaint();
  }

  section.addEventListener('pointermove', event => {
    const box = section.getBoundingClientRect();
    targetX = clamp((event.clientX - box.left) / box.width, 0, 1);
    targetY = clamp((event.clientY - box.top) / Math.max(box.height, 1), 0, 1);
    schedulePaint();
  }, { passive: true });
  section.addEventListener('pointerleave', () => { targetX = .5; targetY = .5; schedulePaint(); }, { passive: true });
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', measure, { passive: true });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && frame) { cancelAnimationFrame(frame); frame = 0; }
    else schedulePaint();
  });
  reducedMotion.addEventListener?.('change', schedulePaint);

  const observer = new IntersectionObserver(entries => {
    visible = entries.some(entry => entry.isIntersecting);
    if (visible) { updateJourney(); schedulePaint(); }
    else if (frame) { cancelAnimationFrame(frame); frame = 0; }
  }, { rootMargin: '120px 0px 120px 0px' });
  observer.observe(section);
  new ResizeObserver(measure).observe(section);
  measure();
})();
