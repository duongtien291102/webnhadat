"use client";

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';

function RotatingAbstractShape() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.15;
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={[2, 0, 0]} scale={1.5}>
      <octahedronGeometry args={[1.5, 0]} />
      <meshStandardMaterial 
        roughness={0.1}
        metalness={0.5}
        transparent={true}
        opacity={0.4}
        color="#ffffff"
      />
    </mesh>
  );
}

export default function ThreeCanvas() {
  return (
    <div className="absolute inset-0 z-[1] pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} />
        <directionalLight position={[-10, -10, -10]} intensity={0.5} />
        <RotatingAbstractShape />
      </Canvas>
    </div>
  );
}
