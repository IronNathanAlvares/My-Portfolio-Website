'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, useGLTF, Center, useTexture } from '@react-three/drei';
import { Suspense, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

function Model() {
  const gltf = useGLTF('/iron_man_model/scene.gltf');

  // Load PBR texture set from public/iron_man_model/textures
  const textures = useTexture({
    map: '/iron_man_model/textures/default_baseColor.png',
    normalMap: '/iron_man_model/textures/default_normal.png',
    roughnessMap: '/iron_man_model/textures/default_metallicRoughness.png',
    metalnessMap: '/iron_man_model/textures/default_metallicRoughness.png',
    emissiveMap: '/iron_man_model/textures/default_emissive.png',
  }) as unknown as {
    map: THREE.Texture;
    normalMap: THREE.Texture;
    roughnessMap: THREE.Texture;
    metalnessMap: THREE.Texture;
    emissiveMap: THREE.Texture;
  };

  useEffect(() => {
    // Correct color spaces and orientation
    textures.map.colorSpace = THREE.SRGBColorSpace;
    textures.emissiveMap.colorSpace = THREE.SRGBColorSpace;
    // Normal/roughness/metalness should remain linear
    [textures.map, textures.normalMap, textures.roughnessMap, textures.metalnessMap, textures.emissiveMap].forEach(
      (t) => {
        t.flipY = false; // GLTF convention
        t.anisotropy = 8;
      }
    );

    // Apply textures and tune PBR values on all mesh materials
    gltf.scene.traverse((child: any) => {
      if (child.isMesh && child.material) {
        const mat: THREE.MeshStandardMaterial = child.material as THREE.MeshStandardMaterial;
        mat.map = textures.map;
        mat.normalMap = textures.normalMap;
        mat.roughnessMap = textures.roughnessMap;
        mat.metalnessMap = textures.metalnessMap;
        mat.emissiveMap = textures.emissiveMap;

        // Material tuning for a glossy metallic suit
        mat.metalness = 1.0;
        mat.roughness = 0.25;
        mat.envMapIntensity = 1.6;
        mat.emissive = new THREE.Color('#222222'); // subtle base emissive so emissiveMap shows
        mat.emissiveIntensity = 1.1;
        mat.needsUpdate = true;
      }
    });
  }, [gltf, textures]);

  return <primitive object={gltf.scene} />;
}

interface HelmetRigProps {
  scale?: number;
}

function HelmetRig({ scale = 1.8 }: HelmetRigProps){
  const groupRef = useRef<THREE.Group>(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const { camera } = useThree();

  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.pageYOffset;
      const maxScroll = 800; // Parallax effect active for first 800px
      setScrollOffset(Math.min(scroll / maxScroll, 1));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const g = groupRef.current;
    if (!g) return;
    // Compute bounding box of model after it's added to scene
    const box = new THREE.Box3().setFromObject(g);
    if (box.isEmpty()) return; // model not ready yet
    const size = box.getSize(new THREE.Vector3());

    // Move model down so camera focuses around the chest/upper body
    g.position.y -= size.y * 0.35;

    // Fit camera to only the upper half of the model (torso focus)
    const targetHeight = size.y * 0.55; // show roughly top ~55% of the model
  const cam = camera as THREE.PerspectiveCamera;
  const fov = (cam.fov * Math.PI) / 180;
    let distance = targetHeight / (2 * Math.tan(fov / 2));
    distance *= 1.1; // small margin
  cam.near = Math.max(0.1, distance / 100);
  cam.far = distance * 20;
  cam.position.set(0, 0, distance);
  cam.lookAt(0, 0, 0);
  cam.updateProjectionMatrix();
  }, [camera]);

  useFrame((state) => {
    const g = groupRef.current;
    if (!g) return;
    const baseX = -0.14; // ~-8deg
    const baseY = 0.1;   // ~5deg
    // Pointer-driven rotation disabled - keep model stable to cursor movements
    const px = 0;
    const py = 0;
    
    // Add subtle rotation based on scroll
    const scrollRotation = scrollOffset * 0.3;
    
    // Match legacy feel: smaller multipliers + gentle damping
    const targetY = baseY + px * 0.3 + scrollRotation;
    const targetX = baseX + py * 0.2 - scrollOffset * 0.1;
    g.rotation.y += (targetY - g.rotation.y) * 0.12;
    g.rotation.x += (targetX - g.rotation.x) * 0.12;
  });
  return (
    <Center>
      <group
        ref={groupRef}
        rotation={[-0.14, 0.1, 0]}
        scale={scale}
      >
        <Model />
      </group>
    </Center>
  );
}

export default function IronMan3D({ scale = 1.2, className, id }: { scale?: number; className?: string; id?: string }) {
  return (
    <div id={id} className={"ironman-3d-wrap" + (className ? ` ${className}` : '')} style={{ 
      width: '100%',
      height: '100%',
      position: 'absolute',
      inset: 0,
      pointerEvents: 'auto',
      zIndex: 28
    }}>
      <Canvas
        id="three-canvas"
        camera={{ position: [0, 0, 3.2], fov: 50 }}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 3, 5]} intensity={1.8} color="#ffffff" />
        <directionalLight position={[-3, 1, -2]} intensity={0.8} color="#ffd700" />
        <spotLight position={[0, 5, 0]} angle={0.5} penumbra={1} intensity={1.2} color="#ffaa00" />
        <Suspense fallback={null}>
          {/* Center the model and add pointer-follow rotation */}
          <HelmetRig scale={scale} />
          <Environment preset="sunset" background={false} />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload('/iron_man_model/scene.gltf');
