'use client';

import React, { useRef, useEffect } from 'react';

const CODE_SNIPPETS = [
  'import { OpenAI } from "openai";',
  'const model = tf.sequential();',
  'await model.fit(xs, ys, {epochs: 100});',
  'const res = vectorDb.query(embeddings);',
  'optimizer: Adam(lr=0.001)',
  'epoch: 45/100 | loss: 0.021',
  '01101100 01101111 0111001',
  'val_acc: 0.9942 | test_acc: 0.9880',
  'model.compile({optimizer: "adam", loss: "mse"});',
  'const chain = new RetrievalQAChain();',
  'export default async function GET() {',
  'n8n.triggerWorkflow("Lead Gen");',
  'document.querySelectorAll(".card")',
  'const { ref, x, y } = useMagnetic();',
  'system: "You are an AI assistant"',
  'import torch.nn as nn',
  'loss = criterion(output, target)',
  'optimizer.step()',
  'agent.act(observation)',
];

export const DataStreams: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let isReduced = mediaQuery.matches;

    const handleReducedChange = (e: MediaQueryListEvent) => {
      isReduced = e.matches;
      if (isReduced) {
        ctx.clearRect(0, 0, width, height);
      }
    };
    mediaQuery.addEventListener('change', handleReducedChange);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const fontSize = 11;
    // Calculate columns based on width
    const columnsCount = Math.floor(width / 220);
    const columns: Array<{
      x: number;
      y: number;
      speed: number;
      text: string;
      opacity: number;
    }> = [];

    for (let i = 0; i < columnsCount; i++) {
      columns.push({
        x: i * 220 + Math.random() * 40 + 10,
        y: Math.random() * -height - 100, // Starts off-screen at random offsets
        speed: Math.random() * 0.4 + 0.2,
        text: CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)],
        opacity: Math.random() * 0.12 + 0.02,
      });
    }

    const draw = () => {
      if (isReduced) {
        ctx.clearRect(0, 0, width, height);
        animationFrameId = requestAnimationFrame(draw);
        return;
      }
      ctx.clearRect(0, 0, width, height);
      ctx.font = `${fontSize}px var(--font-mono), Courier, monospace`;

      columns.forEach((col) => {
        ctx.fillStyle = `rgba(207, 157, 123, ${col.opacity})`;
        ctx.fillText(col.text, col.x, col.y);

        col.y += col.speed;

        // Reset once text drifts below screen
        if (col.y > height + 20) {
          col.y = -50;
          col.speed = Math.random() * 0.4 + 0.2;
          col.text = CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)];
          col.opacity = Math.random() * 0.12 + 0.02;
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      mediaQuery.removeEventListener('change', handleReducedChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.5 }}
    />
  );
};

export default DataStreams;
