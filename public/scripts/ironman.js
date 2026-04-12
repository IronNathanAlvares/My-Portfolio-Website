// Iron Man helmet Three.js code for optional legacy mode in Next.js
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const container = document.getElementById('ironman-3d');
if (container) {
  const scene = new THREE.Scene();
  const width = container.clientWidth || 220;
  const height = container.clientHeight || 220;
  const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
  container.appendChild(renderer.domElement);

  container.classList.add('has-3d');

  scene.add(new THREE.AmbientLight(0xffffff, 0.8));
  const directional = new THREE.DirectionalLight(0xffffff, 1.5);
  directional.position.set(3, 3, 5);
  scene.add(directional);

  const helmetGroup = new THREE.Group();
  scene.add(helmetGroup);

  let helmet;
  const loader = new GLTFLoader();
  loader.load('/models/scene.gltf', (gltf) => {
    helmet = gltf.scene;
    helmet.scale.set(1.5, 1.5, 1.5);
    const box = new THREE.Box3().setFromObject(helmet);
    const center = box.getCenter(new THREE.Vector3());
    helmet.position.sub(center);
    helmetGroup.add(helmet);
    helmetGroup.rotation.set(
      THREE.MathUtils.degToRad(-8),
      THREE.MathUtils.degToRad(5),
      0
    );
  }, undefined, (err) => {
    console.error('Error loading model:', err);
  });

  camera.position.set(0, 0, 5);

  const pointer = new THREE.Vector2(0, 0);
  let targetRotation = { x: 0, y: 0 };

  function onPointerMove(event) {
    const rect = container.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
    targetRotation.y = THREE.MathUtils.degToRad(5) + pointer.x * 0.3;
    targetRotation.x = THREE.MathUtils.degToRad(-8) + pointer.y * 0.2;
  }
  window.addEventListener('pointermove', onPointerMove, { passive: true });

  function animate() {
    requestAnimationFrame(animate);
    if (helmetGroup && helmet) {
      helmetGroup.rotation.y += (targetRotation.y - helmetGroup.rotation.y) * 0.1;
      helmetGroup.rotation.x += (targetRotation.x - helmetGroup.rotation.x) * 0.1;
    }
    renderer.render(scene, camera);
  }
  animate();

  function onResize() {
    const w = container.clientWidth || 220;
    const h = container.clientHeight || 220;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', onResize);
}
