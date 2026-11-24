export function initPreloader(onComplete) {
  const preloader = document.getElementById('preloader');
  const fill = document.getElementById('preloader-fill');
  const pct = document.getElementById('preloader-pct');
  const status = document.getElementById('preloader-status');

  if (!preloader) { onComplete(); return; }

  const statuses = [
    'CALIBRATING POSE ENGINE',
    'INITIALIZING 3D MESH',
    'LAUNCHING INTERFACE'
  ];

  let progress = 0;
  let statusIdx = 0;

  const interval = setInterval(() => {
    progress += Math.random() * 14 + 4;
    if (progress > 100) progress = 100;

    if (fill) fill.style.width = progress + '%';
    if (pct) pct.textContent = Math.round(progress) + '%';

    const newIdx = Math.min(Math.floor((progress / 100) * statuses.length), statuses.length - 1);
    if (newIdx !== statusIdx) {
      statusIdx = newIdx;
      if (status) {
        status.style.opacity = '0';
        setTimeout(() => {
          status.textContent = statuses[statusIdx];
          status.style.opacity = '1';
        }, 150);
      }
    }

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        gsap.to(preloader, {
          opacity: 0,
          duration: 0.75,
          ease: 'power2.inOut',
          onComplete: () => {
            preloader.style.display = 'none';
            runHeroAnimation();
            onComplete();
          }
        });
      }, 300);
    }
  }, 55);
}

function runHeroAnimation() {
  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

  tl.fromTo('#hero-badge',
    { opacity: 0, y: 18 },
    { opacity: 1, y: 0, duration: 0.85 }
  );

  tl.fromTo('.word',
    { y: '110%' },
    { y: '0%', duration: 1.1, stagger: 0.08 },
    '-=0.45'
  );

  tl.fromTo('#hero-desc',
    { opacity: 0, y: 22 },
    { opacity: 1, y: 0, duration: 0.85 },
    '-=0.55'
  );

  tl.fromTo('#hero-actions',
    { opacity: 0, y: 22 },
    { opacity: 1, y: 0, duration: 0.8 },
    '-=0.45'
  );

  tl.fromTo('#hero-metrics',
    { opacity: 0, y: 22 },
    { opacity: 1, y: 0, duration: 0.8 },
    '-=0.35'
  );

  tl.fromTo('#scroll-indicator',
    { opacity: 0 },
    { opacity: 1, duration: 0.65 },
    '-=0.25'
  );
}
