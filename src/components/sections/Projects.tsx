'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Modal } from '../ui/Modal';
import { fadeUp } from '@/lib/animations';
import { projects } from '@/data/projects';
import { Project } from '@/types/project';
import { ExternalLink, Search, SlidersHorizontal, BookOpen, BarChart3, ChevronUp, ChevronDown } from 'lucide-react';

const CATEGORY_TABS = [
  { id: 'all', label: 'All Projects' },
  { id: 'ai', label: 'AI Engineering' },
  { id: 'fullstack', label: 'Full Stack' },
  { id: 'automation', label: 'Automations' },
  { id: 'marketing', label: 'SEO & Growth' }
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
}

export const Projects: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Slide Stack State
  const [activeIndex, setActiveIndex] = useState(0);
  const [progressState, setProgressState] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const progressRef = useRef(0);
  const targetRef = useRef(0);
  const activeIndexRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const lastWheelTime = useRef(0);
  const touchStartY = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Filter projects based on tab and search query
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesTab = activeTab === 'all' || p.category === activeTab;
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  const N = filteredProjects.length;

  // SSR Safe Mobile Viewport Check
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Ambient Particles Canvas Background (60 FPS GPU Assisted)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId: number;
    let particles: Particle[] = [];
    const count = 35;

    const resize = () => {
      if (canvas && canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize particles
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -(Math.random() * 0.25 + 0.08), // Soft float upwards
        size: Math.random() * 1.5 + 0.8,
        alpha: Math.random() * 0.4 + 0.1,
      });
    }

    let mouseX = 0;
    let mouseY = 0;
    const handleMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    window.addEventListener('mousemove', handleMove);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.y += p.vy;
        p.x += p.vx;

        // Wrap around canvas limits
        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;

        // Mouse Parallax Pull
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          const factor = (140 - dist) / 140;
          p.x -= (dx / dist) * factor * 0.35;
          p.y -= (dy / dist) * factor * 0.35;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        // Soft Antique Brass (#CF9D7B) particles
        ctx.fillStyle = `rgba(207, 157, 123, ${p.alpha})`;
        ctx.fill();
      });

      animFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMove);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  // Spring Deceleration Physics Loop for Stack Transitions
  const step = () => {
    const diff = targetRef.current - progressRef.current;
    if (Math.abs(diff) < 0.001) {
      progressRef.current = targetRef.current;
      setProgressState(progressRef.current);
      animationFrameRef.current = null;
    } else {
      // Apple-like spring easing factor
      const springDecel = 0.125;
      progressRef.current += diff * springDecel;
      setProgressState(progressRef.current);
      animationFrameRef.current = requestAnimationFrame(step);
    }
  };

  const setTargetIndex = (nextIndex: number) => {
    if (N <= 1) return;

    // Shortest path circular calculations to enable infinite wrapping
    let diff = nextIndex - activeIndexRef.current;
    if (diff < -N / 2) diff += N;
    if (diff > N / 2) diff -= N;

    targetRef.current = progressRef.current + diff;
    activeIndexRef.current = (nextIndex + N) % N;
    setActiveIndex(activeIndexRef.current);

    if (!animationFrameRef.current) {
      animationFrameRef.current = requestAnimationFrame(step);
    }
  };

  const handleNext = () => {
    if (N <= 1) return;
    setTargetIndex((activeIndexRef.current + 1) % N);
  };

  const handlePrev = () => {
    if (N <= 1) return;
    setTargetIndex((activeIndexRef.current - 1 + N) % N);
  };

  // Keyboard navigation listener
  useEffect(() => {
    if (N <= 1) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      // Navigate only if not typing in the search bar
      if (document.activeElement?.tagName === 'INPUT') return;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [N]);

  // Reset indices on query or filter category switches
  useEffect(() => {
    setActiveIndex(0);
    progressRef.current = 0;
    targetRef.current = 0;
    activeIndexRef.current = 0;
    setProgressState(0);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, [activeTab, searchQuery]);

  // Mouse Wheel Gesture Handler (with locks)
  const handleWheel = (e: React.WheelEvent) => {
    if (N <= 1) return;
    const now = Date.now();
    if (now - lastWheelTime.current < 650) return; // Prevent scroll spamming

    if (Math.abs(e.deltaY) > 15) {
      if (e.deltaY > 0) {
        handleNext();
      } else {
        handlePrev();
      }
      lastWheelTime.current = now;
    }
  };

  // Mobile Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (N <= 1) return;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchStartY.current - touchEndY;

    if (deltaY > 50) {
      handleNext();
    } else if (deltaY < -50) {
      handlePrev();
    }
  };

  // 3D Parallax Tilt Effect for active card
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xc = rect.width / 2;
    const yc = rect.height / 2;

    const rotateX = ((yc - y) / yc) * 6; // Max 6deg tilt
    const rotateY = ((x - xc) / xc) * 6;

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
    <section id="projects" className="py-24 relative overflow-hidden bg-[#162127]/10 min-h-[900px] flex flex-col justify-between">
      {/* Background Ambient dust particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />
      
      {/* Background radial glow */}
      <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] rounded-full bg-primary-accent/[0.015] blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10 w-full flex-grow flex flex-col justify-between">
        
        {/* Title Block */}
        <motion.div
          variants={fadeUp(0.6, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <Badge variant="primary" className="mb-3 border-[#CF9D7B]/30 text-[#CF9D7B] bg-[#CF9D7B]/5">
            Startup Portfolio
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wider text-white hover-glitch inline-block" data-text="Project Command Panel">
            Project Command Panel
          </h2>
          <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-[#CF9D7B] to-transparent mx-auto mt-4" />
        </motion.div>

        {/* Filter Navigation */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-16 border-b border-white/8 pb-8 max-w-5xl mx-auto w-full">
          <div className="flex flex-wrap items-center justify-center gap-2 w-full md:w-auto">
            {CATEGORY_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-xs md:text-sm font-mono uppercase tracking-wider rounded-lg border transition-all duration-300 cursor-pointer ${
                  activeTab === tab.id
                    ? 'border-[#CF9D7B] bg-[#CF9D7B]/10 text-[#CF9D7B] shadow-[0_0_12px_rgba(207,157,123,0.15)]'
                    : 'border-white/8 bg-white/[0.02] text-text-muted hover:text-white hover:border-white/20'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:max-w-xs flex items-center">
            <Search className="w-4 h-4 absolute left-3.5 text-text-muted pointer-events-none" />
            <Input
              type="text"
              placeholder="Search stack or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border-white/6 focus:border-[#CF9D7B]/50"
            />
          </div>
        </div>

        {/* Immersive 3D Stack Container */}
        {N > 0 ? (
          <div 
            className="relative h-[560px] md:h-[620px] w-full max-w-5xl mx-auto flex items-center justify-center select-none"
            onWheel={handleWheel}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{
              perspective: '1200px',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Nav Arrows */}
            {N > 1 && (
              <>
                <button 
                  onClick={handlePrev}
                  className="absolute left-2 md:left-4 z-50 w-10 h-10 rounded-full border border-white/10 bg-[#0C1519]/50 flex items-center justify-center text-text-muted hover:text-[#CF9D7B] hover:border-[#CF9D7B]/30 transition-all cursor-pointer backdrop-blur-sm"
                  aria-label="Previous Project"
                >
                  <ChevronUp className="w-5 h-5" />
                </button>
                <button 
                  onClick={handleNext}
                  className="absolute right-2 md:right-4 z-50 w-10 h-10 rounded-full border border-white/10 bg-[#0C1519]/50 flex items-center justify-center text-text-muted hover:text-[#CF9D7B] hover:border-[#CF9D7B]/30 transition-all cursor-pointer backdrop-blur-sm"
                  aria-label="Next Project"
                >
                  <ChevronDown className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Render Dossier Stack */}
            <div className="relative w-full h-[480px] flex items-center justify-center overflow-visible">
              {filteredProjects.map((project, idx) => {
                // Calculate circular offset
                let d = idx - (progressState % N);
                if (d < -N / 2) d += N;
                if (d > N / 2) d -= N;

                const isActive = idx === activeIndex;

                // Physics values for 3D layout layering
                const translateY = isMobile ? d * 45 : d * 60;
                const translateZ = isMobile ? -Math.abs(d) * 80 : -Math.abs(d) * 110;
                const scale = isMobile ? 1 - Math.abs(d) * 0.08 : 1 - Math.abs(d) * 0.09;
                const rotate = isMobile ? d * 2 : d * 3.5;
                const opacity = Math.max(0, 1 - Math.abs(d) * 0.45);
                const zIndex = Math.round(100 - Math.abs(d) * 10);

                return (
                  <div
                    key={project.id}
                    className="absolute w-[92%] md:w-[75%] max-w-2xl transition-all duration-300"
                    style={{
                      transform: `translate3d(0, ${translateY}px, ${translateZ}px) scale(${scale}) rotate(${rotate}deg)`,
                      opacity,
                      zIndex,
                      pointerEvents: isActive ? 'auto' : 'none',
                      willChange: 'transform, opacity',
                      transformStyle: 'preserve-3d',
                      // Smooth fallback transition when animation loop stops
                      transition: animationFrameRef.current 
                        ? 'none' 
                        : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  >
                    <Card
                      glowColor={isActive ? "rgba(207, 157, 123, 0.25)" : "rgba(255, 255, 255, 0.01)"}
                      className={`p-6 md:p-8 bg-[#162127]/92 border rounded-2xl h-[450px] transition-all duration-300 relative overflow-hidden backdrop-blur-md text-left ${
                        isActive 
                          ? 'border-[#CF9D7B]/30 shadow-[0_0_35px_rgba(207,157,123,0.2)]' 
                          : 'border-white/5 shadow-md'
                      }`}
                      onMouseMove={isActive ? handleMouseMove : undefined}
                      onMouseLeave={isActive ? handleMouseLeave : undefined}
                      style={{
                        transform: isActive ? 'perspective(1000px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translateZ(24px)' : undefined,
                        transition: 'transform 0.08s ease-out, border-color 0.3s, box-shadow 0.3s',
                        // Spotlight hover glow
                        background: isActive 
                          ? 'radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(207, 157, 123, 0.1) 0%, transparent 65%), rgba(22, 33, 39, 0.92)' 
                          : undefined,
                      }}
                    >
                      {isActive && (
                        <>
                          <div className="scanning-line" />
                          <div className="holographic-corner holographic-corner-tl" />
                          <div className="holographic-corner holographic-corner-tr" />
                          <div className="holographic-corner holographic-corner-bl" />
                          <div className="holographic-corner holographic-corner-br" />
                        </>
                      )}
                      {/* Fade out card content for background slides to prevent text overlapping */}
                      <div 
                        className="flex flex-col justify-between h-full transition-opacity duration-300"
                        style={{ 
                          opacity: isActive ? 1 : 0,
                          pointerEvents: isActive ? 'auto' : 'none'
                        }}
                      >
                        <div>
                          {/* Dossier Header */}
                          <div className="flex justify-between items-start mb-4">
                            <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-[#CF9D7B] px-2.5 py-0.5 rounded border border-[#CF9D7B]/20 bg-[#CF9D7B]/5">
                              {project.category}
                            </span>
                            <span className="text-[10px] md:text-xs font-mono text-text-muted">
                              {project.timeline}
                            </span>
                          </div>

                          {/* Project Title */}
                          <h3 className="text-xl md:text-2xl font-bold text-white mb-3 hover:text-[#CF9D7B] transition-colors duration-300 font-sans tracking-wide">
                            {project.title}
                          </h3>
                          <p className="text-xs md:text-sm text-text-muted leading-relaxed mb-6 font-mono">
                            {project.description}
                          </p>

                          {/* Performance Score Metric */}
                          <div className="flex items-center gap-2 mb-6 bg-white/[0.015] border border-white/5 px-3 py-1.5 rounded-lg w-fit">
                            <BarChart3 className="w-3.5 h-3.5 text-[#CF9D7B]" />
                            <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider">
                              Engineered Performance:
                            </span>
                            <span className="text-xs font-mono font-bold text-white">
                              {project.performance}%
                            </span>
                          </div>

                          {/* Results Grid */}
                          <div className="grid grid-cols-3 gap-3 mb-6 bg-[#0C1519]/20 border border-white/5 p-3 rounded-lg font-mono">
                            {project.metrics.map((metric, mIdx) => (
                              <div key={mIdx} className="flex flex-col text-center">
                                <span className="text-[9px] text-text-muted uppercase tracking-wider truncate">
                                  {metric.label}
                                </span>
                                <span className="text-xs md:text-sm font-bold text-white mt-1">
                                  {metric.value}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* Tech Stack Tags */}
                          <div className="flex flex-wrap gap-1.5 mb-6">
                            {project.tags.map((tag, tIdx) => (
                              <span
                                key={tIdx}
                                className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/6 text-white/70"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Action Triggers */}
                        <div className="flex items-center justify-between border-t border-white/5 pt-4">
                          <Button
                            variant="glow"
                            size="sm"
                            onClick={() => setSelectedProject(project)}
                            className="flex items-center gap-2 text-xs border-white/10 hover:border-[#CF9D7B]/30"
                          >
                            <BookOpen className="w-3.5 h-3.5" />
                            Case Study
                          </Button>

                          <div className="flex items-center gap-2">
                            <Button
                              variant="secondary"
                              size="sm"
                              href={project.github}
                              className="w-8 h-8 p-0 rounded-lg flex items-center justify-center border-white/10 hover:border-[#CF9D7B]/20"
                            >
                              <svg className="w-4 h-4 text-white hover:text-[#CF9D7B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                            </Button>
                            {project.demo && (
                              <Button
                                variant="secondary"
                                size="sm"
                                href={project.demo}
                                className="w-8 h-8 p-0 rounded-lg flex items-center justify-center border-white/10 hover:border-[#CF9D7B]/20"
                              >
                                <ExternalLink className="w-4 h-4 text-[#CF9D7B]" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="text-center py-24 z-10 relative">
            <SlidersHorizontal className="w-10 h-10 text-text-muted mx-auto mb-4" />
            <p className="text-text-muted font-mono">No matching projects found.</p>
          </div>
        )}

        {/* Stack Dots Indicators */}
        {N > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8 z-10 relative">
            {filteredProjects.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => setTargetIndex(dotIdx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  dotIdx === activeIndex 
                    ? 'w-6 bg-[#CF9D7B]' 
                    : 'w-1.5 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to project ${dotIdx + 1}`}
              />
            ))}
          </div>
        )}

      </div>

      {/* Case Study Detailed Modal */}
      <Modal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title}
      >
        {selectedProject?.caseStudy && (
          <div className="flex flex-col gap-6 text-left">
            <div>
              <h4 className="text-xs uppercase font-mono tracking-widest text-[#CF9D7B] font-semibold mb-2">
                Problem Statement
              </h4>
              <p className="text-sm md:text-base text-text-muted leading-relaxed font-mono">
                {selectedProject.caseStudy.problem}
              </p>
            </div>

            <div>
              <h4 className="text-xs uppercase font-mono tracking-widest text-[#724B39] font-semibold mb-2">
                Engineered Solution
              </h4>
              <p className="text-sm md:text-base text-text-muted leading-relaxed font-mono">
                {selectedProject.caseStudy.solution}
              </p>
            </div>

            <div>
              <h4 className="text-xs uppercase font-mono tracking-widest text-white font-semibold mb-3">
                Key Deliverables & Results
              </h4>
              <ul className="flex flex-col gap-2 font-mono">
                {selectedProject.caseStudy.results.map((res, rIdx) => (
                  <li key={rIdx} className="flex items-start gap-2.5 text-xs md:text-sm text-text-muted leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#CF9D7B] mt-2 flex-shrink-0" />
                    <span>{res}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-3 border-t border-white/8 pt-6">
              <Button variant="primary" href={selectedProject.github} size="sm" className="flex items-center gap-2 border-[#CF9D7B]/30 bg-[#CF9D7B] text-[#0C1519] hover:bg-[#CF9D7B]/90">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                Inspect Repository
              </Button>
              {selectedProject.demo && (
                <Button variant="outline" href={selectedProject.demo} size="sm" className="flex items-center gap-2 border-white/10 hover:border-[#CF9D7B]/30">
                  <ExternalLink className="w-4 h-4" />
                  Visit Platform
                </Button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default Projects;
