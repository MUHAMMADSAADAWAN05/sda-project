import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, MeshWobbleMaterial, Sphere, Torus, RoundedBox } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

const FloatingDonut = ({ position, color, speed = 1 }: { position: [number, number, number]; color: string; speed?: number }) => {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.3;
    ref.current.rotation.z = Math.cos(state.clock.elapsedTime * speed * 0.4) * 0.2;
  });
  return (
    <Float speed={speed * 1.5} rotationIntensity={0.8} floatIntensity={1.2}>
      <Torus ref={ref} args={[0.6, 0.25, 16, 32]} position={position}>
        <MeshWobbleMaterial color={color} factor={0.15} speed={2} metalness={0.3} roughness={0.4} />
      </Torus>
    </Float>
  );
};

const FloatingBurger = ({ position }: { position: [number, number, number] }) => {
  const ref = useRef<THREE.Group>(null!);
  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.3;
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
  });
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
      <group ref={ref} position={position}>
        {/* Bottom bun */}
        <RoundedBox args={[1, 0.2, 1]} radius={0.08} position={[0, -0.25, 0]}>
          <meshStandardMaterial color="#D4890A" metalness={0.1} roughness={0.7} />
        </RoundedBox>
        {/* Patty */}
        <RoundedBox args={[0.9, 0.15, 0.9]} radius={0.06} position={[0, -0.05, 0]}>
          <meshStandardMaterial color="#5C3317" metalness={0.05} roughness={0.8} />
        </RoundedBox>
        {/* Cheese */}
        <RoundedBox args={[0.95, 0.05, 0.95]} radius={0.02} position={[0, 0.05, 0]}>
          <meshStandardMaterial color="#FFD700" metalness={0.2} roughness={0.5} />
        </RoundedBox>
        {/* Lettuce */}
        <RoundedBox args={[0.92, 0.06, 0.92]} radius={0.03} position={[0, 0.12, 0]}>
          <MeshWobbleMaterial color="#4CAF50" factor={0.3} speed={1.5} roughness={0.6} />
        </RoundedBox>
        {/* Top bun */}
        <Sphere args={[0.52, 16, 16]} position={[0, 0.35, 0]} scale={[1, 0.55, 1]}>
          <meshStandardMaterial color="#E8A020" metalness={0.1} roughness={0.6} />
        </Sphere>
      </group>
    </Float>
  );
};

const GlowOrb = ({ position, color }: { position: [number, number, number]; color: string }) => {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    ref.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1);
  });
  return (
    <Float speed={2} floatIntensity={1.5}>
      <Sphere ref={ref} args={[0.2, 16, 16]} position={position}>
        <MeshDistortMaterial color={color} distort={0.4} speed={3} metalness={0.8} roughness={0.2} emissive={color} emissiveIntensity={0.3} />
      </Sphere>
    </Float>
  );
};

const HeroScene3D = () => {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#fff5e6" />
        <pointLight position={[-3, 2, 2]} intensity={0.8} color="#ff3008" />
        <pointLight position={[3, -1, 3]} intensity={0.5} color="#ffaa00" />

        {/* Main burger - center right */}
        <FloatingBurger position={[2.2, 0.2, 0]} />

        {/* Donuts */}
        <FloatingDonut position={[-2.5, 1, -1]} color="#FF3008" speed={0.8} />
        <FloatingDonut position={[-1.8, -1.2, -0.5]} color="#FFaa00" speed={1.2} />

        {/* Glow orbs */}
        <GlowOrb position={[1.5, 1.5, -1]} color="#FF3008" />
        <GlowOrb position={[-1, 1.8, -0.5]} color="#FFaa00" />
        <GlowOrb position={[2.8, -1.2, -0.8]} color="#4CAF50" />
      </Canvas>
    </div>
  );
};

export default HeroScene3D;
