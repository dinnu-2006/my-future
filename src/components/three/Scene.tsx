'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import TechSphere from './TechSphere';
import { useMousePosition } from '@/hooks/useMousePosition';

export const Scene: React.FC = () => {
  const mouse = useMousePosition();

  return (
    <div className="w-full h-full min-h-[300px] md:min-h-[450px] relative select-none pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.2} />
        <pointLight position={[5, 5, 5]} intensity={1.5} />
        <TechSphere mousePos={mouse} />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
};

export default Scene;
