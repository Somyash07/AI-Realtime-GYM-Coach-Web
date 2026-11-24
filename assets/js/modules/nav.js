export function initNav() {
  const nav = document.getElementById('nav');
  const burger = document.getElementById('nav-burger');
  const mobileNav = document.getElementById('mobile-nav');
  const navLinks = document.querySelectorAll('.nav-link');

  // Scroll state
  ScrollTrigger.create({
    start: 50,
    onUpdate: (self) => {
      if (!nav) return;
      if (self.scroll() > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }
  });

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  ScrollTrigger.create({
    onUpdate: () => {
      const scrollY = window.scrollY + 120;
      sections.forEach(section => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-link[href="#${id}"]`);
        if (link) {
          link.classList.toggle('active', scrollY >= top && scrollY < bottom);
        }
      });
    }
  });

  // Mobile nav toggle
  if (burger && mobileNav) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('active');
      mobileNav.classList.toggle('active');
    });
  }

  // Smooth scrolling + mobile nav close
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          gsap.to(window, {
            scrollTo: { y: target, offsetY: 68 },
            duration: 1.0,
            ease: 'power3.inOut'
          });
        }
        if (mobileNav?.classList.contains('active')) {
          mobileNav.classList.remove('active');
          burger?.classList.remove('active');
        }
      }
    });
  });
}
