export function initCursor() {
  if (window.innerWidth <= 768) return;

  const cursorEl = document.getElementById('cursor');
  const dot = cursorEl?.querySelector('.cursor-dot');
  const ring = cursorEl?.querySelector('.cursor-ring');
  if (!cursorEl || !dot || !ring) return;

  // Pre-calculated half-sizes to avoid translate(-50%,-50%) every frame
  const DOT_HALF = 3.5;   // 7px / 2
  const RING_HALF = 17;   // 34px / 2

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let dotX = mouseX, dotY = mouseY;
  let ringX = mouseX, ringY = mouseY;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  document.addEventListener('mousedown', () => document.body.classList.add('cursor-click'));
  document.addEventListener('mouseup', () => document.body.classList.remove('cursor-click'));

  function loop() {
    // Dot tracks quickly, ring trails
    dotX += (mouseX - dotX) * 0.82;
    dotY += (mouseY - dotY) * 0.82;
    ringX += (mouseX - ringX) * 0.13;
    ringY += (mouseY - ringY) * 0.13;

    // translate3d forces GPU layer, pre-offset avoids extra matrix multiply
    dot.style.transform = `translate3d(${dotX - DOT_HALF}px,${dotY - DOT_HALF}px,0)`;
    ring.style.transform = `translate3d(${ringX - RING_HALF}px,${ringY - RING_HALF}px,0)`;

    requestAnimationFrame(loop);
  }
  loop();

  const hoverTargets = document.querySelectorAll('a, button, .magnetic-btn, .gallery-card, .feature-card, .social-card, .step-card');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}
