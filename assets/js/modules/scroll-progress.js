export function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    if (docH <= 0) return;
    const pct = (window.scrollY / docH) * 100;
    bar.style.width = pct + '%';
  }, { passive: true });
}
