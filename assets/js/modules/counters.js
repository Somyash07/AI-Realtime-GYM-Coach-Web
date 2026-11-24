export function initCounters() {
  document.querySelectorAll('.metric-number').forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    gsap.fromTo(el,
      { textContent: 0 },
      {
        textContent: target,
        duration: 2.2,
        ease: 'power2.out',
        snap: { textContent: 1 },
        onUpdate() {
          el.textContent = Math.round(gsap.getProperty(el, 'textContent'));
        }
      }
    );
  });
}
