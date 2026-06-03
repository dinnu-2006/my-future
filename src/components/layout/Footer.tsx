'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, useAnimation } from 'framer-motion';
import { Button } from '../ui/Button';
import { ArrowUp, Terminal as LogoIcon } from 'lucide-react';

const FOOTER_LINKS = [
  { label: 'Home', href: '/#home' },
  { label: 'About', href: '/#about' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Resume', href: '/resume' },
  { label: 'Blog', href: '/blog' }
];

export const Footer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rocketControls = useAnimation();

  // Simple starfield canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = 200);

    const stars: Array<{ x: number; y: number; radius: number; speed: number }> = [];
    for (let i = 0; i < 40; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.05 + 0.02
      });
    }

    let frameId: number;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();

        star.y -= star.speed;
        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        }
      });
      frameId = requestAnimationFrame(draw);
    };
    draw();

    return () => cancelAnimationFrame(frameId);
  }, []);

  const handleScrollTop = async () => {
    // Launching rocket animation
    await rocketControls.start({
      y: -120,
      opacity: 0,
      transition: { duration: 0.4, ease: 'easeIn' }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Reset rocket position after landing
    setTimeout(() => {
      rocketControls.set({ y: 0, opacity: 1 });
    }, 1000);
  };

  return (
    <footer className="relative bg-[#030712] border-t border-white/6 pt-16 pb-8 overflow-hidden">
      {/* Background Starfield */}
      <canvas
        ref={canvasRef}
        className="absolute inset-x-0 bottom-0 w-full h-[200px] pointer-events-none z-0 opacity-40"
      />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-white/6 pb-12">
          
          {/* Logo & Vision Info */}
          <div className="md:col-span-5 flex flex-col items-start gap-4 text-left">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary-accent/10 border border-primary-accent/35 flex items-center justify-center text-primary-accent">
                <LogoIcon className="w-4.5 h-4.5" />
              </div>
              <span className="text-sm font-extrabold uppercase tracking-widest text-white">
                Synapse<span className="text-primary-accent">.core</span>
              </span>
            </Link>
            <p className="text-xs text-text-muted leading-relaxed max-w-sm font-mono">
              Autonomous workflows, programmatic organic indexing, and bespoke developer interfaces. Building tech infrastructure for the future.
            </p>
          </div>

          {/* Quick Links Nav */}
          <div className="md:col-span-4 flex flex-col items-start gap-4 text-left">
            <span className="text-xs uppercase font-mono tracking-widest text-white font-semibold">
              Quick Links
            </span>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
              {FOOTER_LINKS.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.href}
                  className="text-xs font-mono text-text-muted hover:text-primary-accent transition-colors py-1 focus:outline-none"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Rocket Back to Top Trigger */}
          <div className="md:col-span-3 flex items-center justify-center md:justify-end">
            <motion.button
              onClick={handleScrollTop}
              animate={rocketControls}
              whileHover={{ rotate: 5, scale: 1.05 }}
              className="group p-4 rounded-xl border border-white/8 bg-white/[0.02] hover:border-primary-accent/40 text-text-muted hover:text-primary-accent transition-all flex flex-col items-center gap-2 focus:outline-none cursor-pointer shadow-lg"
            >
              <ArrowUp className="w-5 h-5 animate-bounce" />
              <span className="text-[9px] uppercase tracking-widest font-mono font-medium">
                Rocket Launch
              </span>
            </motion.button>
          </div>

        </div>

        {/* Legal / Copyright details */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-center sm:text-left text-[10px] font-mono text-text-muted">
          <span>
            © {new Date().getFullYear()} Synapse.core. Engineered by CSE AI Builder.
          </span>
          <div className="flex items-center gap-4">
            <a href="https://github.com/dinnu-2006" target="_blank" className="hover:text-primary-accent">GitHub</a>
            <a href="https://www.linkedin.com/in/dinesh-p-666867413?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" className="hover:text-primary-accent">LinkedIn</a>
            <a href="mailto:mrdineshcse@gmail.com" className="hover:text-primary-accent">Email</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
