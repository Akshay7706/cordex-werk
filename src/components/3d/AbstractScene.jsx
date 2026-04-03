import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Icosahedron, MeshDistortMaterial, Environment, Float } from '@react-three/drei';

function CoreShape() {
  const meshRef = useRef();

  useFrame((state) => {
    // Subtle, continuous rotation
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.002;
      meshRef.current.rotation.y += 0.003;
      
      // Gentle pulsing effect tied to sine of time
      const scale = 1 + Math.sin(state.clock.elapsedTime) * 0.02;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <Float seed={1} speed={2} rotationIntensity={0.5} floatIntensity={1}>
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
        
        {/* Inner solid core to give the wireframe depth */}
        <Icosahedron args={[1.2, 2]}>
          <MeshDistortMaterial 
            color="#3A86FF" 
            attach="material" 
            distort={0.3} 
            speed={1.5} 
            roughness={0.5}
            metalness={1}
            opacity={0.5}
            transparent={true}
          />
        </Icosahedron>
      </mesh>
    </Float>
  );
}

export default function AbstractScene() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-60 mix-blend-screen">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ antialias: false, alpha: true }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <directionalLight position={[-10, -10, -5]} color="#00E5FF" intensity={2} />
        
        <CoreShape />
        
        {/* High contrast studio lighting environment */}
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
