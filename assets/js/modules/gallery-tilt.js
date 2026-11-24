export function initGalleryTilt() {
  if (window.innerWidth <= 768) return;

  document.querySelectorAll('.gallery-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(card, {
        rotateY: x * 7,
        rotateX: -y * 7,
        transformPerspective: 900,
        duration: 0.4,
        ease: 'power2.out'
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.65,
        ease: 'elastic.out(1, 0.6)'
      });
    });
  });
}
