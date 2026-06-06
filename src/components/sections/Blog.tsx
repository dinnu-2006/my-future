'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { fadeUp } from '@/lib/animations';
import { blogPosts } from '@/data/blog';
import { Calendar, Clock, BookOpen, Send, Check } from 'lucide-react';

export const Blog: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <section id="blog" className="py-24 relative overflow-hidden bg-[#0C1519]">
      {/* Background decoration */}
      <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-emerald-500/[0.01] blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* Title & Navigation Link */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-white/8 pb-8">
          <motion.div
            variants={fadeUp(0.6, 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-left"
          >
            <Badge variant="primary" className="mb-3">
              Intelligence Stream
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wider text-white">
              The AI Engineering Blog
            </h2>
            <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-primary-accent to-transparent mt-4" />
          </motion.div>

          <Button
            variant="outline"
            href="/blog"
            magnetic={true}
            className="text-xs uppercase tracking-wider self-start border-white/10"
          >
            Open Blog Terminal
          </Button>
        </div>

        {/* Featured Post Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {blogPosts.filter(post => post.featured).map((post) => (
            <motion.div
              key={post.slug}
              variants={fadeUp(0.8, 0.15)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-12"
            >
              <Card
                glowColor="rgba(207, 157, 123, 0.12)"
                className="p-6 md:p-8 bg-[#162127]/20 border border-white/8 flex flex-col lg:flex-row gap-8 items-center justify-between group cursor-pointer transition-[transform,border-color] duration-300 hover:-translate-y-2 hover:scale-[1.01] hover:border-[#CF9D7B]/30 relative overflow-hidden"
              >
                {/* Reading Progress Indicator */}
                <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-[#724B39] to-primary-accent w-full scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-[2200ms] ease-out pointer-events-none" />

                <div className="flex flex-col items-start gap-4 text-left lg:max-w-2xl">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-primary-accent px-2 py-0.5 rounded border border-primary-accent/20 bg-primary-accent/5">
                      Featured
                    </span>
                    <span className="text-xs font-mono text-text-muted">
                      {post.category}
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-wide group-hover:text-primary-accent transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-sm md:text-base text-text-muted leading-relaxed">
                    {post.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs font-mono text-text-muted mt-2">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.publishedAt}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>
                </div>

                <div className="flex-shrink-0 w-full lg:w-auto mt-4 lg:mt-0">
                  <Button variant="primary" href={`/blog#${post.slug}`} className="flex items-center gap-2 text-xs uppercase tracking-wider w-full lg:w-auto">
                    <BookOpen className="w-4 h-4" />
                    Read Article
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Blog Post List (Non-featured Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {blogPosts.filter(post => !post.featured).map((post, idx) => (
            <motion.div
              key={post.slug}
              variants={fadeUp(0.8, idx * 0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="h-full"
            >
              <Card
                glowColor="rgba(207, 157, 123, 0.1)"
                className="p-6 bg-[#162127]/10 border border-white/6 flex flex-col justify-between h-full group cursor-pointer transition-[transform,border-color] duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:border-[#CF9D7B]/30 relative overflow-hidden"
              >
                {/* Reading Progress Indicator */}
                <div className="absolute top-0 left-0 h-[3px] bg-gradient-to-r from-[#724B39] to-[#CF9D7B] w-full scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-[1800ms] ease-out pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#CF9D7B]">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-3 text-[10px] font-mono text-text-muted">
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

                  <h4 className="text-lg font-bold text-white mb-2 group-hover:text-primary-accent transition-colors">
                    {post.title}
                  </h4>
                  <p className="text-xs md:text-sm text-text-muted leading-relaxed mb-6">
                    {post.description}
                  </p>
                </div>

                <a
                  href={`/blog#${post.slug}`}
                  className="text-xs font-mono font-semibold text-primary-accent hover:text-accent-glow flex items-center gap-1 mt-auto"
                >
                  Inspect Article
                  <BookOpen className="w-3.5 h-3.5 ml-1" />
                </a>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Subscription Card */}
        <motion.div
          variants={fadeUp(0.8, 0.3)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Card glowColor="rgba(207, 157, 123, 0.15)" className="p-8 bg-[#162127]/35 border border-white/6 text-center flex flex-col items-center gap-6">
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-bold uppercase tracking-wider text-white">
                Join the Pipeline
              </h3>
              <p className="text-xs md:text-sm text-text-muted max-w-md mx-auto">
                Subscribe to get periodic research notes on autonomous LLM agents, workflow scripts, growth statistics, and engineering updates.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
              <Input
                type="email"
                required
                placeholder="Enter neural email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#0C1519]/60 border-white/10"
                disabled={subscribed}
              />
              <Button
                type="submit"
                variant={subscribed ? 'glow' : 'primary'}
                className="flex items-center justify-center gap-2 text-xs uppercase tracking-wider px-6 flex-shrink-0"
                disabled={subscribed}
              >
                {subscribed ? (
                  <>
                    <Check className="w-4 h-4 text-primary-accent animate-pulse" />
                    Subscribed
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Deploy
                  </>
                )}
              </Button>
            </form>
          </Card>
        </motion.div>

      </div>
    </section>
  );
};

export default Blog;
