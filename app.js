/* ═══════════════════════════════════════════════════════════
   AI GYM COACH — 3D Biometric Engine & Interactive Logic
   GSAP Animations + Three.js AI Skeletal Grid + UI Handlers
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── Wait for Dependencies ──
  function waitForDeps(callback) {
    const check = setInterval(() => {
      if (window.THREE && window.gsap && window.ScrollTrigger) {
        clearInterval(check);
        callback();
      }
    }, 40);
  }

  waitForDeps(init);

  function init() {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // ── PRELOADER ──
    const preloader = document.getElementById('preloader');
    const preloaderFill = document.getElementById('preloader-fill');
    const preloaderPct = document.getElementById('preloader-pct');
    let loadProgress = 0;

    function animatePreloader() {
      const interval = setInterval(() => {
        loadProgress += Math.random() * 15 + 5;
        if (loadProgress > 100) loadProgress = 100;
        if (preloaderFill) preloaderFill.style.width = loadProgress + '%';
        if (preloaderPct) preloaderPct.textContent = Math.round(loadProgress) + '%';
        if (loadProgress >= 100) {
          clearInterval(interval);
          setTimeout(finishPreloader, 300);
        }
      }, 60);
    }

    function finishPreloader() {
      if (!preloader) return;
      gsap.to(preloader, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.inOut',
        onComplete: () => {
          preloader.style.display = 'none';
          startEntryAnimations();
        }
      });
    }

    animatePreloader();

    // ── ENTRY ANIMATIONS ──
    function startEntryAnimations() {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.to('#hero-badge', { opacity: 1, y: 0, duration: 0.8 });

      tl.to('.word', {
        y: 0,
        duration: 1.0,
        ease: 'power4.out',
        stagger: 0.1
      }, '-=0.4');

      tl.to('#hero-desc', { opacity: 1, y: 0, duration: 0.8 }, '-=0.5');
      tl.to('#hero-actions', { opacity: 1, y: 0, duration: 0.8 }, '-=0.4');
      tl.to('#hero-metrics', { opacity: 1, y: 0, duration: 0.8, onStart: animateCounters }, '-=0.3');
      tl.to('#scroll-indicator', { opacity: 1, duration: 0.6 }, '-=0.2');
    }

    // ── COUNTER ANIMATION ──
    function animateCounters() {
      document.querySelectorAll('.metric-number').forEach(el => {
        const target = parseInt(el.dataset.count, 10);
        gsap.fromTo(el, { textContent: 0 }, {
          textContent: target,
          duration: 2,
          ease: 'power2.out',
          snap: { textContent: 1 },
          onUpdate: function () {
            el.textContent = Math.round(gsap.getProperty(el, 'textContent'));
          }
        });
      });
    }

    // ── SCROLL REVEAL ANIMATIONS ──
    gsap.utils.toArray('.reveal-up').forEach(el => {
      const delay = parseFloat(el.dataset.delay) || 0;
      gsap.to(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: delay,
        ease: 'power3.out'
      });
    });

    gsap.utils.toArray('.reveal-text').forEach(el => {
      gsap.to(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out'
      });
    });

    // ── NAV SCROLL EFFECT ──
    ScrollTrigger.create({
      start: 60,
      onUpdate: (self) => {
        const nav = document.getElementById('nav');
        if (!nav) return;
        if (self.direction === 1 && self.progress > 0) {
          nav.classList.add('scrolled');
        }
        if (self.scroll() < 60) {
          nav.classList.remove('scrolled');
        }
      }
    });

    // ── SMOOTH ANCHOR SCROLLING ──
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.length > 1) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            gsap.to(window, {
              scrollTo: { y: target, offsetY: 72 },
              duration: 1.0,
              ease: 'power3.inOut'
            });
            const mobileNav = document.getElementById('mobile-nav');
            const burger = document.getElementById('nav-burger');
            if (mobileNav && mobileNav.classList.contains('active')) {
              mobileNav.classList.remove('active');
              if (burger) burger.classList.remove('active');
            }
          }
        }
      });
    });

    // ── MOBILE NAV ──
    const burger = document.getElementById('nav-burger');
    const mobileNav = document.getElementById('mobile-nav');

    if (burger && mobileNav) {
      burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        mobileNav.classList.toggle('active');
      });
    }

    // ── CUSTOM CURSOR ──
    const cursorEl = document.getElementById('cursor');
    const cursorDot = cursorEl ? cursorEl.querySelector('.cursor-dot') : null;
    const cursorRing = cursorEl ? cursorEl.querySelector('.cursor-ring') : null;
    let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
    let cursorX = mouseX, cursorY = mouseY;
    let ringX = mouseX, ringY = mouseY;

    if (cursorEl && window.innerWidth > 768) {
      document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
      });

      function updateCursor() {
        cursorX += (mouseX - cursorX) * 0.5;
        cursorY += (mouseY - cursorY) * 0.5;
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;

        if (cursorDot) {
          cursorDot.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        }
        if (cursorRing) {
          cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
        }
        requestAnimationFrame(updateCursor);
      }
      updateCursor();

      const hoverTargets = document.querySelectorAll('a, button, .magnetic-btn, .gallery-card, .feature-card, .social-card');
      hoverTargets.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
      });
    }

    // ── MAGNETIC BUTTONS ──
    if (window.innerWidth > 768) {
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
          gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
        });
      });
    }

    // ── GALLERY 3D TILT EFFECT ──
    if (window.innerWidth > 768) {
      document.querySelectorAll('.gallery-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          gsap.to(card, {
            rotateY: x * 6,
            rotateX: -y * 6,
            transformPerspective: 800,
            duration: 0.4,
            ease: 'power2.out'
          });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.6, ease: 'elastic.out(1, 0.6)' });
        });
      });
    }

    // ── THREE.JS SCENE — 3D BIOMETRIC POSE SKELETON MESH ──
    initThreeScene();
  }

  function initThreeScene() {
    const canvas = document.getElementById('three-canvas');
    if (!canvas || !window.THREE) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x07070a, 0);

    // ── Create 3D Skeletal Pose Nodes ──
    const nodeCount = 45;
    const nodePositions = [];
    const nodeColors = [];
    const nodes = [];

    const gymGreen = new THREE.Color(0x00FF87);
    const cyberCyan = new THREE.Color(0x00F0FF);
    const aiViolet = new THREE.Color(0x8B5CF6);

    const colorsList = [gymGreen, cyberCyan, aiViolet];

    // Spherical / Biometric grid generation
    for (let i = 0; i < nodeCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.2 + Math.random() * 0.8;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      nodePositions.push(new THREE.Vector3(x, y, z));
      const col = colorsList[Math.floor(Math.random() * colorsList.length)];
      nodeColors.push(col);

      // Node mesh dot
      const dotGeo = new THREE.SphereGeometry(0.04, 12, 12);
      const dotMat = new THREE.MeshBasicMaterial({
        color: col,
        transparent: true,
        opacity: 0.8
      });
      const dotMesh = new THREE.Mesh(dotGeo, dotMat);
      dotMesh.position.set(x, y, z);
      scene.add(dotMesh);
      nodes.push(dotMesh);
    }

    // ── Connect Neighbor Nodes with Cyber Pose Lines ──
    const linePositions = [];
    const lineColors = [];

    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dist = nodePositions[i].distanceTo(nodePositions[j]);
        if (dist < 1.8) {
          linePositions.push(nodePositions[i].x, nodePositions[i].y, nodePositions[i].z);
          linePositions.push(nodePositions[j].x, nodePositions[j].y, nodePositions[j].z);

          lineColors.push(nodeColors[i].r, nodeColors[i].g, nodeColors[i].b);
          lineColors.push(nodeColors[j].r, nodeColors[j].g, nodeColors[j].b);
        }
      }
    }

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.22
    });

    const poseMeshLines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(poseMeshLines);

    // ── Concentric Biometric Target Rings ──
    const ringGeo = new THREE.TorusGeometry(2.2, 0.006, 16, 120);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00FF87,
      transparent: true,
      opacity: 0.18
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI * 0.45;
    scene.add(ring);

    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(2.8, 0.004, 16, 120),
      new THREE.MeshBasicMaterial({ color: 0x00F0FF, transparent: true, opacity: 0.12 })
    );
    ring2.rotation.x = Math.PI * 0.35;
    ring2.rotation.z = Math.PI * 0.2;
    scene.add(ring2);

    // Mouse Parallax Interaction
    let targetX = 0, targetY = 0;
    document.addEventListener('mousemove', (e) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 0.6;
      targetY = (e.clientY / window.innerHeight - 0.5) * 0.6;
    });

    // ── Animation Loop ──
    let clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth slow rotation
      poseMeshLines.rotation.y = elapsedTime * 0.05;
      poseMeshLines.rotation.x = Math.sin(elapsedTime * 0.03) * 0.1;

      ring.rotation.z = elapsedTime * 0.08;
      ring2.rotation.z = -elapsedTime * 0.06;

      // Parallax smooth interpolation
      camera.position.x += (targetX - camera.position.x) * 0.03;
      camera.position.y += (-targetY - camera.position.y) * 0.03;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

})();
