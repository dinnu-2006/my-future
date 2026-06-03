'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Modal } from '../ui/Modal';
import { fadeUp, scaleUp } from '@/lib/animations';
import { projects } from '@/data/projects';
import { Project } from '@/types/project';
import { ExternalLink, Search, SlidersHorizontal, BookOpen, BarChart3 } from 'lucide-react';

const CATEGORY_TABS = [
  { id: 'all', label: 'All Projects' },
  { id: 'ai', label: 'AI Engineering' },
  { id: 'fullstack', label: 'Full Stack' },
  { id: 'automation', label: 'Automations' },
  { id: 'marketing', label: 'SEO & Growth' }
];

export const Projects: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-[#07131A]/10">
      {/* Background radial glow */}
      <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] rounded-full bg-emerald-500/[0.02] blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* Title */}
        <motion.div
          variants={fadeUp(0.6, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <Badge variant="primary" className="mb-3">
            Startup Portfolio
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wider text-white">
            Project Command Panel
          </h2>
          <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-primary-accent to-transparent mx-auto mt-4" />
        </motion.div>

        {/* Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-12 border-b border-white/8 pb-8">
          
          {/* Tab Selector */}
          <div className="flex flex-wrap items-center justify-center gap-2 w-full md:w-auto">
            {CATEGORY_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-xs md:text-sm font-mono uppercase tracking-wider rounded-lg border transition-all duration-300 cursor-pointer ${
                  activeTab === tab.id
                    ? 'border-primary-accent bg-primary-accent/10 text-primary-accent shadow-[0_0_12px_rgba(167,255,74,0.15)]'
                    : 'border-white/8 bg-white/[0.02] text-text-muted hover:text-white hover:border-white/20'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:max-w-xs flex items-center">
            <Search className="w-4 h-4 absolute left-3.5 text-text-muted pointer-events-none" />
            <Input
              type="text"
              placeholder="Search stack or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border-white/6"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                variants={scaleUp(0.5, idx * 0.05)}
                initial="hidden"
                animate="visible"
                exit="hidden"
                viewport={{ once: true }}
                className="h-full"
              >
                <Card glowColor="rgba(167, 255, 74, 0.12)" className="p-6 bg-[#030712]/50 border border-white/6 flex flex-col justify-between h-full group">
                  <div>
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-primary-accent px-2 py-0.5 rounded border border-primary-accent/20 bg-primary-accent/5">
                        {project.category}
                      </span>
                      <span className="text-[10px] md:text-xs font-mono text-text-muted">
                        {project.timeline}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-accent transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-sm text-text-muted leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Performance Score */}
                    <div className="flex items-center gap-2 mb-6 bg-white/[0.02] border border-white/5 px-3 py-2 rounded-lg w-fit">
                      <BarChart3 className="w-4 h-4 text-[#00FFB2]" />
                      <span className="text-xs font-mono text-text-muted uppercase tracking-wider">
                        Performance Score:
                      </span>
                      <span className="text-xs font-mono font-bold text-white">
                        {project.performance}%
                      </span>
                    </div>

                    {/* Grid of Metrics */}
                    <div className="grid grid-cols-3 gap-3 mb-6 bg-[#07131A]/25 border border-white/6 p-3 rounded-lg">
                      {project.metrics.map((metric, mIdx) => (
                        <div key={mIdx} className="flex flex-col text-center">
                          <span className="text-[10px] text-text-muted uppercase font-mono tracking-wider">
                            {metric.label}
                          </span>
                          <span className="text-xs md:text-sm font-extrabold text-white mt-1">
                            {metric.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-8">
                      {project.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] font-mono px-2 py-1 rounded bg-white/5 border border-white/6 text-white/80"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between border-t border-white/8 pt-4">
                    <Button
                      variant="glow"
                      size="sm"
                      onClick={() => setSelectedProject(project)}
                      className="flex items-center gap-2 text-xs border-white/10"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      Case Study
                    </Button>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        href={project.github}
                        className="w-8 h-8 p-0 rounded-lg flex items-center justify-center border-white/10"
                      >
                        <svg className="w-4 h-4 text-white hover:text-primary-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                      </Button>
                      {project.demo && (
                        <Button
                          variant="secondary"
                          size="sm"
                          href={project.demo}
                          className="w-8 h-8 p-0 rounded-lg flex items-center justify-center border-white/10"
                        >
                          <ExternalLink className="w-4 h-4 text-primary-accent" />
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <SlidersHorizontal className="w-10 h-10 text-text-muted mx-auto mb-4" />
            <p className="text-text-muted font-mono">No matching projects found.</p>
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
              <h4 className="text-xs uppercase font-mono tracking-widest text-primary-accent font-semibold mb-2">
                Problem Statement
              </h4>
              <p className="text-sm md:text-base text-text-muted leading-relaxed">
                {selectedProject.caseStudy.problem}
              </p>
            </div>

            <div>
              <h4 className="text-xs uppercase font-mono tracking-widest text-[#00FFB2] font-semibold mb-2">
                Engineered Solution
              </h4>
              <p className="text-sm md:text-base text-text-muted leading-relaxed">
                {selectedProject.caseStudy.solution}
              </p>
            </div>

            <div>
              <h4 className="text-xs uppercase font-mono tracking-widest text-white font-semibold mb-3">
                Key Deliverables & Results
              </h4>
              <ul className="flex flex-col gap-2">
                {selectedProject.caseStudy.results.map((res, rIdx) => (
                  <li key={rIdx} className="flex items-start gap-2.5 text-sm md:text-base text-text-muted leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-accent mt-2 flex-shrink-0" />
                    <span>{res}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-3 border-t border-white/8 pt-6">
              <Button variant="primary" href={selectedProject.github} size="sm" className="flex items-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                Inspect Repository
              </Button>
              {selectedProject.demo && (
                <Button variant="outline" href={selectedProject.demo} size="sm" className="flex items-center gap-2">
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
