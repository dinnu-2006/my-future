'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

const TECHNOLOGIES = [
  'Python', 'React', 'Next.js', 'PyTorch', 'TypeScript',
  'Node.js', 'LangChain', 'TensorFlow', 'MongoDB', 'PostgreSQL',
  'n8n', 'Zapier', 'OpenAI', 'Tailwind', 'Docker',
  'SEO', 'Express', 'Git', 'FastAPI', 'Make'
];

interface WordProps {
  children: string;
  position: THREE.Vector3;
}

const Word: React.FC<WordProps> = ({ children, position }) => {
  const color = useMemo(() => {
    // Randomly assign primary accent (Antique Brass) or secondary accent (Coffee) or Warm Ivory
    const rand = Math.random();
    if (rand < 0.45) return '#CF9D7B'; // Antique Brass
    if (rand < 0.75) return '#724B39'; // Coffee
    return '#F5EDE8'; // Warm Ivory
  }, []);

  const textRef = useRef<THREE.Mesh>(null);

  useFrame(({ camera }) => {
    if (textRef.current) {
      // Make text look at camera (Billboard effect)
      textRef.current.quaternion.copy(camera.quaternion);
    }
  });

  return (
    <Text
      ref={textRef}
      position={position}
      fontSize={0.4}
      font="/fonts/GeistMonoVF.woff" // Fallback to system font if needed, R3F Text handles basic fonts
      color={color}
      anchorX="center"
      anchorY="middle"
    >
      {children}
    </Text>
  );
};

export const TechSphere: React.FC<{ mousePos: { x: number; y: number } }> = ({ mousePos }) => {
  const groupRef = useRef<THREE.Group>(null);

  // Compute spherical coordinates using Fibonacci sphere algorithm
  const words = useMemo(() => {
    const radius = 5.5;
    const count = TECHNOLOGIES.length;
    const temp: Array<{ word: string; pos: THREE.Vector3 }> = [];

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      temp.push({
        word: TECHNOLOGIES[i],
        pos: new THREE.Vector3(x, y, z),
      });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      // Constant auto-rotation
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.12;

      // Mouse-influenced tilt rotation
      const targetX = (mousePos.y / window.innerHeight - 0.5) * 0.4;
      const targetY = (mousePos.x / window.innerWidth - 0.5) * 0.4;

      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05;
      groupRef.current.rotation.z += (targetY - groupRef.current.rotation.z) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Light wireframe sphere backing */}
      <mesh>
        <sphereGeometry args={[4.8, 16, 16]} />
        <meshBasicMaterial
          color="#CF9D7B"
          wireframe={true}
          transparent={true}
          opacity={0.03}
        />
      </mesh>
      
      {words.map(({ word, pos }, index) => (
        <Word key={index} position={pos}>
          {word}
        </Word>
      ))}
    </group>
  );
};

export default TechSphere;
