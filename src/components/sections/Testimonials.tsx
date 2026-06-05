'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { ChevronLeft, ChevronRight, MessageSquare, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    role: 'CEO, Nexus Digital Group',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120',
    quote: 'The automation pipelines Synapse built saved our marketing consultancy over 20 hours every week. We went from manually searching directories to running closed-loop lead generation within 48 hours.',
  },
  {
    id: 2,
    name: 'David Chen',
    role: 'Co-Founder, Aura AI Startups',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
    quote: 'For a third-year engineering student, his technical depth in LangChain structures and Next.js SSR is incredible. The cognitive code indexer he built as an intern is a key tool in our stealth system.',
  },
  {
    id: 3,
    name: 'Elena Rostova',
    role: 'Growth Marketing Director',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120',
    quote: 'The organic traffic portal increased our product visibility by over 300% in a few short months. Programmatic SEO pipelines combined with semantic optimization drafts are highly effective.',
  }
];

export const Testimonials: React.FC = () => {
  const [index, setIndex] = useState(0);

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xc = rect.width / 2;
    const yc = rect.height / 2;

    const rotateX = ((yc - y) / yc) * 5; // Max 5deg tilt
    const rotateY = ((x - xc) / xc) * 5;

    card.style.setProperty('--rx', `${rotateX}deg`);
    card.style.setProperty('--ry', `${rotateY}deg`);
    card.style.setProperty('--mx', `${(x / rect.width) * 100}%`);
    card.style.setProperty('--my', `${(y / rect.height) * 100}%`);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
    card.style.setProperty('--mx', '50%');
    card.style.setProperty('--my', '50%');
  };

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden bg-[#162127]/35">
      {/* Background glowing details */}
      <div className="absolute top-1/4 right-1/2 w-[300px] h-[300px] rounded-full bg-primary-accent/[0.01] blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <Badge variant="primary" className="mb-3">
            Client Transcripts
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wider text-white">
            Client Evaluation Loops
          </h2>
          <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-primary-accent to-transparent mx-auto mt-4" />
        </motion.div>

        {/* 3D Testimonial Carousel Area */}
        <div className="flex flex-col items-center justify-center min-h-[400px] relative w-full max-w-4xl mx-auto py-8">
          
          {/* Card Stack Deck Container */}
          <div 
            className="relative w-full h-[300px] md:h-[260px] flex items-center justify-center select-none"
            style={{
              perspective: '1000px',
              transformStyle: 'preserve-3d',
            }}
          >
            {TESTIMONIALS.map((item, i) => {
              // Calculate offset relative to active card index
              let offset = i - index;
              if (offset < -1) offset += TESTIMONIALS.length;
              if (offset > 1) offset -= TESTIMONIALS.length;

              const isActive = offset === 0;
              const isPrev = offset === -1;
              const isNext = offset === 1;

              // 3D cover-flow positioning parameters
              const tx = isActive ? 0 : isPrev ? -22 : 22; // translation X in %
              const tz = isActive ? 0 : -130;              // translation Z in px
              const scale = isActive ? 1 : 0.88;
              const ry = isActive ? 0 : isPrev ? 20 : -20; // Y rotation facing center
              const zIndex = isActive ? 20 : 10;
              const opacity = isActive ? 1 : 0.35;
              const blur = isActive ? 'blur(0px)' : 'blur(2.5px)';

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    if (isPrev) handlePrev();
                    if (isNext) handleNext();
                  }}
                  className="absolute w-full max-w-2xl transform cursor-pointer will-change-transform"
                  style={{
                    transform: `translate3d(${tx}%, 0, ${tz}px) scale(${scale}) rotateY(${ry}deg)`,
                    opacity,
                    zIndex,
                    filter: blur,
                    transformStyle: 'preserve-3d',
                    pointerEvents: isActive || isPrev || isNext ? 'auto' : 'none',
                    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), filter 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <Card
                    glowColor={isActive ? "rgba(207, 157, 123, 0.25)" : "rgba(255, 255, 255, 0.01)"}
                    className={`p-6 md:p-8 bg-[#0C1519]/92 border rounded-2xl flex flex-col justify-between h-[250px] relative transition-all duration-300 ${
                      isActive 
                        ? 'border-[#CF9D7B]/30 shadow-[0_0_30px_rgba(207, 157, 123,0.12)]' 
                        : 'border-white/5 shadow-md'
                    }`}
                    onMouseMove={isActive ? handleMouseMove : undefined}
                    onMouseLeave={isActive ? handleMouseLeave : undefined}
                    style={{
                      transform: isActive ? 'perspective(1000px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))' : undefined,
                      transition: 'transform 0.1s ease-out, border-color 0.3s, box-shadow 0.3s',
                      background: isActive 
                        ? 'radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(207, 157, 123, 0.08) 0%, transparent 65%), rgba(3, 7, 18, 0.92)' 
                        : undefined,
                    }}
                  >
                    <Quote className="absolute top-6 right-6 w-10 h-10 text-white/5 pointer-events-none" />

                    {/* Fade out card content for background slides to prevent text overlapping */}
                    <div 
                      className="flex flex-col justify-between h-full transition-opacity duration-300"
                      style={{ 
                        opacity: isActive ? 1 : 0,
                        pointerEvents: isActive ? 'auto' : 'none'
                      }}
                    >
                      <div>
                        {/* Quote Body */}
                        <p className="text-sm md:text-base text-text-muted leading-relaxed italic mb-6">
                          "{item.quote}"
                        </p>
                      </div>

                      {/* Footer Info */}
                      <div className="flex items-center justify-between border-t border-white/5 pt-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-10 h-10 rounded-full border border-white/10 object-cover"
                          />
                          <div className="text-left">
                            <h4 className="text-sm font-bold text-white tracking-wide">
                              {item.name}
                            </h4>
                            <span className="text-xs text-text-muted font-mono">
                              {item.role}
                            </span>
                          </div>
                        </div>
                        <MessageSquare className="w-5 h-5 text-[#CF9D7B] opacity-50" />
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>

          {/* Navigation Controls & Audio Voice Wave visual */}
          <div className="flex flex-col items-center gap-6 mt-8 z-30">
            {/* AI voice-wave visual effects */}
            <div className="flex items-center justify-center gap-1.5 h-8 my-2 select-none pointer-events-none">
              {Array.from({ length: 22 }).map((_, i) => {
                const animDelays = [0.1, 0.4, 0.2, 0.5, 0.7, 0.3, 0.1, 0.4, 0.8, 0.5, 0.2, 0.6, 0.9, 0.3, 0.7, 0.4, 0.1, 0.8, 0.5, 0.2, 0.6, 0.3];
                return (
                  <div
                    key={i}
                    className="w-[3px] bg-gradient-to-t from-[#CF9D7B] to-primary-accent rounded-full origin-bottom"
                    style={{
                      height: `${Math.sin((i / 22) * Math.PI) * 70 + 30}%`,
                      animation: `voice-wave 1s ease-in-out infinite`,
                      animationDelay: `${animDelays[i]}s`,
                    }}
                  />
                );
              })}
            </div>

            {/* Nav Arrows */}
            <div className="flex items-center gap-4">
              <Button
                variant="glow"
                size="sm"
                onClick={handlePrev}
                className="w-10 h-10 p-0 rounded-full flex items-center justify-center border-white/10 hover:border-primary-accent/40 text-white"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="glow"
                size="sm"
                onClick={handleNext}
                className="w-10 h-10 p-0 rounded-full flex items-center justify-center border-white/10 hover:border-primary-accent/40 text-white"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Testimonials;
