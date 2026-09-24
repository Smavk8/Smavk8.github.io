(() => {
  const body = document.body;
  if (!body) return;

  const ambient = document.createElement('div');
  ambient.className = 'xylen-ambient';
  ambient.setAttribute('aria-hidden', 'true');
  body.prepend(ambient);

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const videos = Array.from(document.querySelectorAll('.motion-preview-video, .stack-video-cover'));
  const videoObserver = new IntersectionObserver(entries => {
    entries.forEach(({ target: video, isIntersecting }) => {
      if (!isIntersecting || document.hidden) {
        video.pause();
        return;
      }

      if (reducedMotion.matches) {
        video.pause();
        if (video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
          video.addEventListener('loadeddata', () => video.pause(), { once: true });
          video.load();
        }
        return;
      }

      if (video.readyState === HTMLMediaElement.HAVE_NOTHING) video.load();
      video.play().catch(() => {});
    });
  }, { rootMargin: '180px 320px 180px 320px', threshold: 0.01 });

  videos.forEach(video => {
    video.autoplay = false;
    video.removeAttribute('autoplay');
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = 'none';
    videoObserver.observe(video);
  });

  document.addEventListener('visibilitychange', () => {
    videos.forEach(video => {
      if (document.hidden) video.pause();
      else if (videoObserver && !reducedMotion.matches && video.getBoundingClientRect().width > 0) {
        const rect = video.getBoundingClientRect();
        if (rect.bottom > -180 && rect.top < window.innerHeight + 180) video.play().catch(() => {});
      }
    });
  });

  let pointerX = 54;
  let pointerY = 34;
  let targetX = 54;
  let targetY = 34;
  let pointerMotionFrame = 0;
  let targetTiltX = 0;
  let targetTiltY = 0;
  let tiltX = 0;
  let tiltY = 0;
  const onPointerMove = event => {
    targetX = event.clientX / Math.max(window.innerWidth, 1) * 100;
    targetY = event.clientY / Math.max(window.innerHeight, 1) * 100;
    const hero = document.querySelector('.silent-motion-hero');
    const heroVisual = hero?.querySelector('.silent-motion-orbit');
    if (hero && heroVisual) {
      const rect = hero.getBoundingClientRect();
      const withinHero = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
      if (withinHero) {
        const visualRect = heroVisual.getBoundingClientRect();
        targetTiltX = ((event.clientX - visualRect.left) / Math.max(visualRect.width, 1) - .5) * 8;
        targetTiltY = ((event.clientY - visualRect.top) / Math.max(visualRect.height, 1) - .5) * -7;
      } else {
        targetTiltX = 0;
        targetTiltY = 0;
      }
    }
    if (pointerMotionFrame || reducedMotion.matches) return;
    const animatePointer = () => {
      pointerX += (targetX - pointerX) * .12;
      pointerY += (targetY - pointerY) * .12;
      tiltX += (targetTiltX - tiltX) * .12;
      tiltY += (targetTiltY - tiltY) * .12;
      body.style.setProperty('--xylen-pointer-x', `${pointerX.toFixed(2)}%`);
      body.style.setProperty('--xylen-pointer-y', `${pointerY.toFixed(2)}%`);
      body.style.setProperty('--xylen-tilt-x', `${tiltX.toFixed(2)}deg`);
      body.style.setProperty('--xylen-tilt-y', `${tiltY.toFixed(2)}deg`);
      if (Math.abs(targetX - pointerX) > .08 || Math.abs(targetY - pointerY) > .08 || Math.abs(targetTiltX - tiltX) > .03 || Math.abs(targetTiltY - tiltY) > .03) pointerMotionFrame = requestAnimationFrame(animatePointer);
      else pointerMotionFrame = 0;
    };
    pointerMotionFrame = requestAnimationFrame(animatePointer);
  };
  window.addEventListener('pointermove', onPointerMove, { passive: true });
  document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.silent-motion-hero');
    hero?.addEventListener('pointerleave', () => {
      targetTiltX = 0;
      targetTiltY = 0;
      body.style.setProperty('--xylen-tilt-x', '0deg');
      body.style.setProperty('--xylen-tilt-y', '0deg');
    }, { passive: true });
  }, { once: true });
  reducedMotion.addEventListener?.('change', () => {
    if (reducedMotion.matches) videos.forEach(video => video.pause());
    else videos.forEach(video => {
      const rect = video.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < window.innerHeight) video.play().catch(() => {});
    });
  });
})();
