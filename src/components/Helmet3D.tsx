"use client";

import { Canvas } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import { Suspense, useEffect, useRef } from 'react';
import * as THREE from 'three';

function HelmetInner({ scale = 1.5 }: { scale?: number } ){
  const gltf = useGLTF('/iron_man_helmet_model/scene.gltf');
  const groupRef = useRef<THREE.Group | null>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const eyesRef = useRef<Array<THREE.Mesh>>([]);

  useEffect(() => {
    const g = groupRef.current;
    if (!g) return;

    // center the model by subtracting its bounding box center from children
    const box = new THREE.Box3().setFromObject(g);
    if (!box.isEmpty()) {
      const center = box.getCenter(new THREE.Vector3());
      g.children.forEach((c) => c.position.sub(center));
      const size = box.getSize(new THREE.Vector3());
      g.position.y -= size.y * 0.45;
    }

    // scale and base rotation (matches legacy script)
    g.scale.set(scale, scale, scale);
    g.rotation.set(THREE.MathUtils.degToRad(-8), THREE.MathUtils.degToRad(5), 0);

    // Traverse the loaded scene to apply material tweaks and locate eye meshes
    eyesRef.current = [];
    gltf.scene.traverse((child: any) => {
      if (child.isMesh) {
        const mesh: THREE.Mesh = child;
        const name = (mesh.name || '').toLowerCase();
        // gently tune all standard materials to be more metallic (ironman look)
        const mat: any = mesh.material;
        if (mat) {
          try {
            // if material supports PBR props, push it towards metal/gold
            if (typeof mat.metalness !== 'undefined') mat.metalness = 1;
            if (typeof mat.roughness !== 'undefined') mat.roughness = 0.25;
            if (typeof mat.envMapIntensity !== 'undefined') mat.envMapIntensity = 1.6;
            // slightly increase emissive for visor / eye parts
            if (name.includes('eye') || name.includes('visor') || name.includes('led')) {
              // remember as an eye mesh for the follow effect
              eyesRef.current.push(mesh);
              if (typeof mat.emissive !== 'undefined') {
                mat.emissive = mat.emissive || new THREE.Color(0xeeeeff);
                // start subtle
                mat.emissiveIntensity = mat.emissiveIntensity ?? 0.8;
              }
            }
          } catch (e) {
            // ignore unsafe material tweaks
          }
        }
      }
    });

    // pointer listener across the whole window so cursor anywhere affects look direction
    function onPointerMove(e: PointerEvent) {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -((e.clientY / window.innerHeight) * 2 - 1);
      pointer.current.x = Math.max(-1, Math.min(1, nx));
      pointer.current.y = Math.max(-1, Math.min(1, ny));
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, [gltf, scale]);

  // animate helmet rotation (like legacy) and animate eyes to follow cursor subtly
  useEffect(() => {
    let raf = 0;
    const animate = () => {
      const g = groupRef.current;
      if (g) {
        // target rotations from pointer
        const px = Math.max(-1, Math.min(1, pointer.current.x));
        const py = Math.max(-1, Math.min(1, pointer.current.y));
        const baseY = THREE.MathUtils.degToRad(5);
        const baseX = THREE.MathUtils.degToRad(-8);
  // increase turn intensity: larger pointer multipliers for a more pronounced turn
  const targetY = baseY + px * 0.7; // was 0.3
  const targetX = baseX + py * 0.45; // was 0.2
  // lerp faster so it feels snappier but still smooth
  g.rotation.y += (targetY - g.rotation.y) * 0.16; // was 0.1
  g.rotation.x += (targetX - g.rotation.x) * 0.16; // was 0.1

        // eyes follow: small rotation/position and emissive breathing
        const eyes = eyesRef.current;
        for (let i = 0; i < eyes.length; i++) {
          const m = eyes[i];
          // Only animate emissive intensity for the eye meshes to avoid geometry shifts
          const mat: any = m.material;
          if (mat && typeof mat.emissiveIntensity !== 'undefined') {
            // stronger when cursor is nearer center (use inverse of distance)
            const strength = 0.95 + (1 - Math.min(1, Math.sqrt(px * px + py * py))) * 1.2;
            mat.emissiveIntensity += (strength - mat.emissiveIntensity) * 0.12;
          }
        }
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <group ref={groupRef}>
      <primitive object={gltf.scene} />
    </group>
  );
}

export default function Helmet3D({ size = 1 }: { size?: number }) {
  // Make the canvas match the legacy script size so the entire helmet is visible
  const width = 220;
  const height = 220;
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // Idle phrases to cycle through above the helmet
  const idlePhrases = [
    "Need anything? I'm listening.",
    'Standing by for input.',
    'I detect curiosity.',
    'Network ping: excellent.',
    "Try 'Projects' to see work.",
    "Contact me - let's collaborate.",
    "Standing guard over your portfolio.",
    'Ready to assist you.',
    'Awaiting your command.',
    'How can I help you today?',
    'Your wish is my command.',
    'At your service.',
    'Processing... Just kidding, I never stop working.',
    'Engaging conversational protocols.',
    'Analyzing your presence... Welcome back!'
  ];

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

  const dialogEl = document.getElementById('jarvis-dialog');
  if (!dialogEl) return;
  const dialog = dialogEl as HTMLElement;

    let current = 0;
    let hideTimer: number | null = null;
    let intervalId: number | null = null;

    function clearTimers() {
      if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }
      if (intervalId) { clearInterval(intervalId); intervalId = null; }
    }

    function showPhrase(text: string) {
      clearTimers();
      // ensure element is visible (remove hidden attribute) and show the animation
      dialog.hidden = false;
      dialog.classList.add('show');
      dialog.textContent = text;
      // remain visible for 4 seconds, then hide with a short exit animation window
      hideTimer = window.setTimeout(() => {
        dialog.classList.remove('show');
        // after the hide animation ends, set hidden=true so the element is truly removed from layout
        window.setTimeout(() => { try { dialog.hidden = true; } catch (e) {} }, 420);
      }, 4000);
    }

    function showNext() {
      // don't overwrite when Jarvis is busy (form submit GIF/dialog active)
      if ((window as any).__jarvisBusy) return;
      // pick a single random phrase each interval
      const idx = Math.floor(Math.random() * idlePhrases.length);
      showPhrase(idlePhrases[idx]);
    }

    // start cycling after 7s, then every 7s
    const startTimer = window.setTimeout(() => {
      showNext();
      intervalId = window.setInterval(showNext, 7000);
    }, 7000);

    // also allow immediate reveal on hover/click
    function onEnter() { showNext(); }
    function onClick() { showNext(); }

    wrapper.addEventListener('pointerenter', onEnter);
    wrapper.addEventListener('click', onClick);

    return () => {
      clearTimers();
      wrapper.removeEventListener('pointerenter', onEnter);
      wrapper.removeEventListener('click', onClick);
      clearTimeout(startTimer);
    };
  }, []);

  return (
    <div ref={wrapperRef} style={{ width, height, display: 'block' }}>
      <Canvas style={{ width: '100%', height: '100%', display: 'block', background: 'transparent' }} camera={{ position: [0, 0, 5], fov: 50 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[3, 3, 5]} intensity={1.5} />
        <Suspense fallback={null}>
          <HelmetInner scale={1.5} />
          <Environment preset="sunset" background={false} />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload('/iron_man_helmet_model/scene.gltf');
