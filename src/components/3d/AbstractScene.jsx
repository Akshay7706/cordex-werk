import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Icosahedron, MeshDistortMaterial, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

function CoreShape({ mouse }) {
  const meshRef = useRef();
  const targetRotation = useRef(new THREE.Euler());
  const currentRotation = useRef(new THREE.Euler());

  useFrame((state) => {
    if (meshRef.current) {
      // Magnetic Tilt Logic: Rotate towards normalized mouse coordinates
      targetRotation.current.set(
        mouse.y * 0.5,
        mouse.x * 0.5,
        0
      );

      // Smooth interpolation (lerp)
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotation.current.x, 0.05);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotation.current.y, 0.05);

      // Subtle base continuous rotation
      meshRef.current.rotation.z += 0.002;
      
      const scale = 1 + Math.sin(state.clock.elapsedTime) * 0.02;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <Float seed={1} speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <Icosahedron args={[1.5, 2]}>
          <MeshDistortMaterial 
            color="#00E5FF" 
            attach="material" 
            distort={0.4} 
            speed={2} 
            roughness={0.2}
            metalness={0.8}
            wireframe={true}
          />
        </Icosahedron>
        
        <Icosahedron args={[1.2, 2]}>
          <MeshDistortMaterial 
            color="#3A86FF" 
            attach="material" 
            distort={0.3} 
            speed={1.5} 
            roughness={0.5}
            metalness={1}
            opacity={0.4}
            transparent={true}
          />
        </Icosahedron>
      </mesh>
    </Float>
  );
}

export default function AbstractScene() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handlePointerMove = (e) => {
    // Normalize mouse to -1 to 1
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;
    setMouse({ x, y });
  };

  return (
    <div 
      className="absolute inset-0 z-0 pointer-events-auto opacity-60 mix-blend-screen"
      onPointerMove={handlePointerMove}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ antialias: false, alpha: true }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <directionalLight position={[-10, -10, -5]} color="#00E5FF" intensity={2} />
        
        <CoreShape mouse={mouse} />
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
