export function initMagnetic() {
  if (window.innerWidth <= 768) return;

  document.querySelectorAll('.magnetic-btn').forEach(btn => {
    const strength = parseInt(btn.dataset.strength) || 25;

    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, {
        x: x * (strength / 100),
        y: y * (strength / 100),
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.5)'
      });
    });
  });
}
