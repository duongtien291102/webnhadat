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
      <meshPhysicalMaterial 
        thickness={0.5} 
        roughness={0.2} 
        transmission={0.9} 
        ior={1.2} 
        transparent={true}
        color="#fdf8f8"
      />
    </mesh>
  );
}

export default function ThreeCanvas() {
  return (
    <div className="absolute inset-0 z-[1] opacity-70 pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <directionalLight position={[-10, -10, -10]} intensity={0.5} />
        <RotatingAbstractShape />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
