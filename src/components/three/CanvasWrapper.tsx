'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the 3D Scene to disable SSR and avoid compilation/hydration warnings
const DynamicScene = dynamic(() => import('./Scene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[300px] md:min-h-[450px] flex items-center justify-center">
      <div className="relative w-12 h-12 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-2 border-primary-accent/20 border-t-primary-accent animate-spin" />
        <span className="text-[10px] uppercase tracking-widest font-mono text-primary-accent/60">AI</span>
      </div>
    </div>
  ),
});

export const CanvasWrapper: React.FC = () => {
  return <DynamicScene />;
};

export default CanvasWrapper;
