'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { blogPosts } from '@/data/blog';
import { BlogPost } from '@/types/blog';
import NeuralNetwork from '@/components/effects/NeuralNetwork';
import DataStreams from '@/components/effects/DataStreams';
import AICursor from '@/components/effects/AICursor';
import DeveloperConsole from '@/components/ui/DeveloperConsole';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Calendar, Clock, BookOpen } from 'lucide-react';

export default function BlogPage() {
  const [consoleOpen, setConsoleOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Monitor url hashes to open article details
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        const post = blogPosts.find((p) => p.slug === hash);
        if (post) setSelectedPost(post);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Run initially
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Listen to console keyboard hotkeys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        setConsoleOpen((prev) => !prev);
      }
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        setConsoleOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0C1519]">
      {/* Background visual components */}
      <NeuralNetwork />
      <DataStreams />
      <AICursor />

      {/* Header navbar */}
      <Navbar onTerminalToggle={() => setConsoleOpen(true)} />

      <main className="pt-32 pb-24 container mx-auto px-4 md:px-8">
        
        {/* Title */}
        <div className="max-w-4xl mx-auto mb-16 text-left">
          <Badge variant="primary" className="mb-3">
            Operational Log
          </Badge>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-wide font-display">
            The AI Engineering Journal
          </h1>
          <p className="text-text-muted mt-4 font-mono text-xs md:text-sm max-w-2xl leading-relaxed">
            Technical reports regarding multi-agent LLM systems, semantic vector retrieval models, serverless SaaS architectures, and search engine optimization.
          </p>
        </div>

        {/* Articles List */}
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          {blogPosts.map((post) => (
            <Card
              key={post.slug}
              glowColor="rgba(207, 157, 123, 0.12)"
              className="p-6 md:p-8 bg-[#162127]/20 border border-white/6 cursor-pointer group flex flex-col justify-between"
              onClick={() => {
                setSelectedPost(post);
                window.location.hash = post.slug;
              }}
            >
              <div className="flex flex-col items-start gap-4 text-left">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#CF9D7B]">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-3 text-xs font-mono text-text-muted">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.publishedAt}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-primary-accent transition-colors duration-300">
                  {post.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  {post.description}
                </p>
              </div>

              <div className="border-t border-white/5 pt-4 mt-6 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-primary-accent hover:text-accent-glow flex items-center gap-1">
                  Inspect Operations
                  <BookOpen className="w-4 h-4" />
                </span>
              </div>
            </Card>
          ))}
        </div>

      </main>

      {/* Footer */}
      <Footer />

      {/* Reader Modal */}
      <Modal
        isOpen={!!selectedPost}
        onClose={() => {
          setSelectedPost(null);
          // Clear hash without reload
          window.history.pushState(null, '', window.location.pathname);
        }}
        title={selectedPost?.title}
      >
        {selectedPost && (
          <article className="prose prose-invert max-w-none text-left flex flex-col gap-6 text-text-muted leading-relaxed text-sm md:text-base font-sans select-text">
            <div className="flex items-center gap-4 text-xs font-mono text-text-muted border-b border-white/8 pb-4">
              <span className="text-primary-accent uppercase">{selectedPost.category}</span>
              <span>•</span>
              <span>{selectedPost.publishedAt}</span>
              <span>•</span>
              <span>{selectedPost.readTime}</span>
            </div>
            
            <div className="flex flex-col gap-4">
              <p className="text-white font-medium">{selectedPost.description}</p>
              {selectedPost.content.split('\n\n').map((para, pIdx) => {
                if (para.startsWith('## ')) {
                  return (
                    <h4 key={pIdx} className="text-lg font-bold text-white uppercase tracking-wider mt-6 border-b border-white/5 pb-2">
                      {para.replace('## ', '')}
                    </h4>
                  );
                }
                if (para.startsWith('### ')) {
                  return (
                    <h5 key={pIdx} className="text-base font-semibold text-white mt-4">
                      {para.replace('### ', '')}
                    </h5>
                  );
                }
                if (para.startsWith('```')) {
                  return (
                    <pre key={pIdx} className="bg-black/50 border border-white/8 p-4 rounded-lg font-mono text-xs text-primary-accent overflow-x-auto whitespace-pre-wrap leading-relaxed">
                      {para.replace(/```[a-z]*/g, '')}
                    </pre>
                  );
                }
                return <p key={pIdx} className="leading-relaxed">{para}</p>;
              })}
            </div>
          </article>
        )}
      </Modal>

      {/* Command Terminal Overlay */}
      <DeveloperConsole isOpen={consoleOpen} onClose={() => setConsoleOpen(false)} />
    </div>
  );
}
