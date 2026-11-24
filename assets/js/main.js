import { initPreloader } from './modules/preloader.js';
import { initCursor } from './modules/cursor.js';
import { initNav } from './modules/nav.js';
import { initScrollAnimations } from './modules/scroll-animations.js';
import { initMagnetic } from './modules/magnetic.js';
import { initGalleryTilt } from './modules/gallery-tilt.js';
import { initThreeScene } from './modules/three-scene.js';
import { initCounters } from './modules/counters.js';
import { initScrollProgress } from './modules/scroll-progress.js';

function waitForDeps(deps, callback) {
  const check = setInterval(() => {
    if (deps.every(d => window[d])) {
      clearInterval(check);
      callback();
    }
  }, 40);
  // Timeout fallback after 5 seconds
  setTimeout(() => { clearInterval(check); callback(); }, 5000);
}

waitForDeps(['THREE', 'gsap', 'ScrollTrigger'], () => {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  initCursor();
  initScrollProgress();
  initThreeScene();

  initPreloader(() => {
    initNav();
    initScrollAnimations();
    initMagnetic();
    initGalleryTilt();
    initCounters();
  });
});
