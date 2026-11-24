export function initScrollAnimations() {
  // Reveal up elements
  gsap.utils.toArray('.reveal-up').forEach(el => {
    const delay = parseFloat(el.dataset.delay) || 0;
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 86%',
        toggleActions: 'play none none none'
      },
      opacity: 1,
      y: 0,
      duration: 0.85,
      delay,
      ease: 'power3.out'
    });
  });

  // Feature cards with stagger
  gsap.utils.toArray('.reveal-card').forEach(el => {
    const delay = parseFloat(el.dataset.delay) || 0;
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none'
      },
      opacity: 1,
      y: 0,
      duration: 0.9,
      delay,
      ease: 'power3.out'
    });
  });

  // Section tags
  gsap.utils.toArray('.reveal-tag').forEach(el => {
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        toggleActions: 'play none none none'
      },
      opacity: 1,
      y: 0,
      duration: 0.65,
      ease: 'power3.out'
    });
  });

  // Section titles
  gsap.utils.toArray('.reveal-title').forEach(el => {
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none'
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 0.1,
      ease: 'power3.out'
    });
  });
}
