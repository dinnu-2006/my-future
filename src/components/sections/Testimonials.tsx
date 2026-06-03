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

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden bg-[#07131A]/35">
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
          <div className="relative w-full h-[280px] md:h-[240px] flex items-center justify-center select-none">
            {TESTIMONIALS.map((item, i) => {
              // Calculate offset relative to active card index
              let offset = i - index;
              if (offset < -1) offset += TESTIMONIALS.length;
              if (offset > 1) offset -= TESTIMONIALS.length;

              const isActive = offset === 0;
              const isPrev = offset === -1;
              const isNext = offset === 1;

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    if (isPrev) handlePrev();
                    if (isNext) handleNext();
                  }}
                  className={`absolute w-full max-w-2xl transition-all duration-500 transform cursor-pointer ${
                    isActive
                      ? 'z-20 scale-100 opacity-100 translate-x-0 pointer-events-auto'
                      : isPrev
                      ? 'z-10 scale-90 opacity-35 -translate-x-[15%] md:-translate-x-[25%] pointer-events-none md:pointer-events-auto'
                      : 'z-10 scale-90 opacity-35 translate-x-[15%] md:translate-x-[25%] pointer-events-none md:pointer-events-auto'
                  }`}
                >
                  <Card
                    glowColor="rgba(167, 255, 74, 0.15)"
                    className="p-6 md:p-8 bg-[#030712]/90 border border-white/6 shadow-xl flex flex-col justify-between h-full relative"
                  >
                    <Quote className="absolute top-6 right-6 w-10 h-10 text-white/5 pointer-events-none" />

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
                      <MessageSquare className="w-5 h-5 text-primary-accent opacity-40" />
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
                    className="w-[3px] bg-gradient-to-t from-[#00FFB2] to-primary-accent rounded-full origin-bottom"
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
