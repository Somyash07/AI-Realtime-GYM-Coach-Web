export function initThreeScene() {
  const canvas = document.getElementById('three-canvas');
  if (!canvas || !window.THREE) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 6.5;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x07070a, 0);

  // Colors
  const gymGreen = new THREE.Color(0x00FF87);
  const cyberCyan = new THREE.Color(0x00F0FF);
  const aiViolet = new THREE.Color(0x8B5CF6);
  const colorsList = [gymGreen, cyberCyan, aiViolet, gymGreen, cyberCyan];

  const nodeCount = 50;
  const positions = [];
  const colors = [];

  for (let i = 0; i < nodeCount; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    const r = 2.0 + Math.random() * 1.2;

    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);

    positions.push(new THREE.Vector3(x, y, z));
    const col = colorsList[Math.floor(Math.random() * colorsList.length)];
    colors.push(col);

    const geo = new THREE.SphereGeometry(0.038, 10, 10);
    const mat = new THREE.MeshBasicMaterial({
      color: col,
      transparent: true,
      opacity: 0.75
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(x, y, z);
    scene.add(mesh);
  }

  // Connection lines
  const lineVerts = [];
  const lineCols = [];

  for (let i = 0; i < nodeCount; i++) {
    for (let j = i + 1; j < nodeCount; j++) {
      const dist = positions[i].distanceTo(positions[j]);
      if (dist < 1.9) {
        lineVerts.push(positions[i].x, positions[i].y, positions[i].z);
        lineVerts.push(positions[j].x, positions[j].y, positions[j].z);
        lineCols.push(colors[i].r, colors[i].g, colors[i].b);
        lineCols.push(colors[j].r, colors[j].g, colors[j].b);
      }
    }
  }

  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(lineVerts, 3));
  lineGeo.setAttribute('color', new THREE.Float32BufferAttribute(lineCols, 3));

  const lineMat = new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.18
  });

  const poseMesh = new THREE.LineSegments(lineGeo, lineMat);
  scene.add(poseMesh);

  // Rings
  const ring1 = new THREE.Mesh(
    new THREE.TorusGeometry(2.4, 0.005, 16, 128),
    new THREE.MeshBasicMaterial({ color: 0x00FF87, transparent: true, opacity: 0.15 })
  );
  ring1.rotation.x = Math.PI * 0.4;
  scene.add(ring1);

  const ring2 = new THREE.Mesh(
    new THREE.TorusGeometry(3.0, 0.004, 16, 128),
    new THREE.MeshBasicMaterial({ color: 0x00F0FF, transparent: true, opacity: 0.1 })
  );
  ring2.rotation.x = Math.PI * 0.3;
  ring2.rotation.z = Math.PI * 0.25;
  scene.add(ring2);

  const ring3 = new THREE.Mesh(
    new THREE.TorusGeometry(3.6, 0.003, 16, 128),
    new THREE.MeshBasicMaterial({ color: 0x8B5CF6, transparent: true, opacity: 0.07 })
  );
  ring3.rotation.x = Math.PI * 0.6;
  ring3.rotation.y = Math.PI * 0.1;
  scene.add(ring3);

  // Mouse parallax
  let targetX = 0, targetY = 0;
  document.addEventListener('mousemove', (e) => {
    targetX = (e.clientX / window.innerWidth - 0.5) * 0.55;
    targetY = (e.clientY / window.innerHeight - 0.5) * 0.55;
  }, { passive: true });

  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    poseMesh.rotation.y = t * 0.045;
    poseMesh.rotation.x = Math.sin(t * 0.025) * 0.12;

    ring1.rotation.z = t * 0.07;
    ring2.rotation.z = -t * 0.055;
    ring3.rotation.y = t * 0.035;

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
  }, { passive: true });
}
