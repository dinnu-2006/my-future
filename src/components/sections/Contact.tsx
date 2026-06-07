'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input, Textarea } from '../ui/Input';
import { fadeUp } from '@/lib/animations';
import { Mail, Cpu, Terminal, Loader2, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useMagnetic } from '@/hooks/useMagnetic';
// Contact form submissions are routed via secure backend api route handler (/api/contact)


const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
);

const SOCIAL_LINKS = [
  { icon: Mail, url: 'mailto:mrdineshcse@gmail.com', label: 'Email' },
  { icon: GithubIcon, url: 'https://github.com/dinnu-2006', label: 'GitHub' },
  { icon: LinkedinIcon, url: 'https://www.linkedin.com/in/dinesh-p-666867413?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', label: 'LinkedIn' },
  { icon: TwitterIcon, url: 'https://twitter.com', label: 'Twitter/X' },
  { icon: InstagramIcon, url: 'https://www.instagram.com/mr_dinnu_xnx?igsh=MXFlc3pyazkzY3lldQ==', label: 'Instagram' }
];

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitStage, setSubmitStage] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [agentText, setAgentText] = useState('Connection initialized. Awaiting user transmission log...');

  const { ref: nameRef, x: nameX, y: nameY } = useMagnetic(0.06);
  const { ref: emailRef, x: emailX, y: emailY } = useMagnetic(0.06);
  const { ref: subjectRef, x: subjectX, y: subjectY } = useMagnetic(0.06);
  const { ref: messageRef, x: messageX, y: messageY } = useMagnetic(0.04);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitStage(1);
    setAgentText('Neural node parsing incoming payload headers...');

    // Small delay to simulate parsing handshake
    await new Promise((resolve) => setTimeout(resolve, 800));

    setSubmitStage(2);
    setAgentText('Encrypting packets. Transmitting via secure relay server...');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStage(3);
        setAgentText('Transmission accepted! Live email successfully dispatched.');
      } else {
        if (data.error && data.error.includes('misconfigured')) {
          setSubmitStage(4);
          setAgentText(`ERROR: Server relay misconfigured. Ensure Vercel Environment Variables are set.`);
        } else {
          throw new Error(data.error || `Server responded with status ${response.status}`);
        }
      }
    } catch (error: unknown) {
      console.error('Contact transmission error:', error);
      setSubmitStage(4);
      const errorMessage = error instanceof Error ? error.message : 'UNKNOWN_ERR';
      setAgentText(`ERROR: Uplink failed. Code: ${errorMessage}. Run diagnostic debugger.`);
    }
  };

  const handleBypassSimulator = () => {
    setSubmitStage(3);
    setAgentText('Bypassed live check. Transmission simulated! Logged data to local cache.');
    console.log('Form data submitted (Bypass Simulated):', {
      formData,
      targetEmail: 'mrdineshcse@gmail.com'
    });
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', subject: '', message: '' });
    setSubmitStage(0);
    setAgentText('Connection refreshed. Ready for subsequent operational logs.');
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#162127]/20">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-primary-accent/[0.015] blur-[150px] pointer-events-none" />

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
            Secure Portal
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wider text-white hover-glitch inline-block" data-text="Initiate Contact">
            Initiate Contact
          </h2>
          <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-primary-accent to-transparent mx-auto mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-5xl mx-auto">
          
          {/* Left Column: Animated Agent Avatar */}
          <motion.div
            variants={fadeUp(0.8, 0.25)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <Card glowColor="rgba(207, 157, 123, 0.12)" className="p-6 md:p-8 bg-[#0C1519]/50 border border-white/6 flex flex-col justify-between h-full text-left">
              
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-primary-accent mb-4 block">
                  Interactive Node
                </span>
                
                {/* Glowing pulsing Avatar Circle */}
                <div className="relative w-28 h-28 rounded-full border border-primary-accent/30 flex items-center justify-center mx-auto my-6 bg-[#162127] shadow-[0_0_25px_rgba(207, 157, 123,0.12)]">
                  <div className="absolute inset-0 rounded-full border border-teal-400/20 animate-ping" />
                  <div className="absolute inset-2 rounded-full border border-white/5 animate-pulse" />
                  <Cpu className="w-10 h-10 text-primary-accent" />
                  
                  {/* Floating surrounding stats */}
                  <span className="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full bg-[#CF9D7B] border border-[#0C1519] animate-pulse" />
                </div>

                <div className="text-center mb-6">
                  <h3 className="text-base font-bold text-white uppercase tracking-wider">
                    Agent Core v1.4
                  </h3>
                  <span className="text-[10px] text-text-muted font-mono uppercase tracking-widest">
                    Available For Freelance & Collaboration
                  </span>
                </div>

                {/* Simulated Agent Chat Bubble */}
                <div className="p-4 rounded-lg bg-white/[0.02] border border-white/6 flex flex-col gap-2 font-mono text-xs">
                  <div className="flex items-center gap-1.5 text-primary-accent">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>AGENT_LOG:</span>
                  </div>
                  <p className="text-text-muted leading-relaxed">
                    {agentText}
                  </p>
                </div>
              </div>

              {/* Social Channels */}
              <div className="border-t border-white/5 pt-6 mt-8">
                <span className="text-xs uppercase font-mono tracking-widest text-white/70 block mb-4">
                  External Channels
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {SOCIAL_LINKS.map((link, lIdx) => {
                    const LinkIcon = link.icon;
                    return (
                      <Button
                        key={lIdx}
                        variant="secondary"
                        size="sm"
                        href={link.url}
                        className="w-9 h-9 p-0 rounded-lg flex items-center justify-center border-white/10"
                        title={link.label}
                      >
                        <LinkIcon className="w-4 h-4 text-white hover:text-primary-accent" />
                      </Button>
                    );
                  })}
                </div>
              </div>

            </Card>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            variants={fadeUp(0.8, 0.35)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <Card glowColor="rgba(207, 157, 123, 0.15)" className="p-6 md:p-8 bg-[#0C1519]/50 border border-white/6 h-full flex flex-col justify-center">
              
              <AnimatePresence mode="wait">
                {submitStage === 0 ? (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5 text-left"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div
                        ref={nameRef as React.RefObject<HTMLDivElement>}
                        style={{ transform: `translate3d(${nameX}px, ${nameY}px, 0)`, transition: 'transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)' }}
                        className="w-full"
                      >
                        <Input
                          label="Your Name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Sarah Jenkins"
                        />
                      </div>
                      <div
                        ref={emailRef as React.RefObject<HTMLDivElement>}
                        style={{ transform: `translate3d(${emailX}px, ${emailY}px, 0)`, transition: 'transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)' }}
                        className="w-full"
                      >
                        <Input
                          label="Email Address"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="sarah@nexus.com"
                        />
                      </div>
                    </div>
                    <div
                      ref={subjectRef as React.RefObject<HTMLDivElement>}
                      style={{ transform: `translate3d(${subjectX}px, ${subjectY}px, 0)`, transition: 'transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)' }}
                      className="w-full"
                    >
                      <Input
                        label="Subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="AI Operations Pipeline Enquire"
                      />
                    </div>
                    <div
                      ref={messageRef as React.RefObject<HTMLDivElement>}
                      style={{ transform: `translate3d(${messageX}px, ${messageY}px, 0)`, transition: 'transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)' }}
                      className="w-full"
                    >
                      <Textarea
                        label="Your Message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Hi! We would love to collaborate with you on building..."
                      />
                    </div>
                    <Button type="submit" variant="primary" className="w-full mt-2 font-semibold">
                      Establish Uplink Connection
                    </Button>
                  </motion.form>
                ) : submitStage === 1 ? (
                  <motion.div
                    key="stage-1"
                    className="flex flex-col items-center justify-center py-12 gap-4 text-center"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Loader2 className="w-12 h-12 text-primary-accent animate-spin" />
                    <h3 className="text-xl font-bold uppercase tracking-wider text-white">
                      Processing Request...
                    </h3>
                    <p className="text-xs font-mono text-text-muted">
                      Allocating bandwidth, preparing submission headers...
                    </p>
                  </motion.div>
                ) : submitStage === 2 ? (
                  <motion.div
                    key="stage-2"
                    className="flex flex-col items-center justify-center py-12 gap-4 text-center"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Loader2 className="w-12 h-12 text-[#CF9D7B] animate-spin" />
                    <h3 className="text-xl font-bold uppercase tracking-wider text-[#CF9D7B]">
                      Sending Through Neural Network...
                    </h3>
                    <p className="text-xs font-mono text-text-muted">
                      Pushing cryptographically signed packets through RPC endpoints...
                    </p>
                  </motion.div>
                ) : submitStage === 3 ? (
                  <motion.div
                    key="stage-3"
                    className="flex flex-col items-center justify-center py-12 gap-5 text-center"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <CheckCircle2 className="w-14 h-14 text-primary-accent animate-pulse" />
                    <div className="flex flex-col gap-1.5">
                      <h3 className="text-xl font-bold uppercase tracking-wider text-white">
                        Uplink Connection Success
                      </h3>
                      <p className="text-xs font-mono text-text-muted">
                        Headers received. Response packet generated.
                      </p>
                    </div>
                    <Button onClick={handleReset} variant="outline" size="sm" className="mt-2 text-xs border-white/10 uppercase tracking-widest font-mono">
                      Refactor Connection
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="stage-4"
                    className="flex flex-col items-center justify-center py-12 gap-5 text-center"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <AlertTriangle className="w-14 h-14 text-rose-500 animate-pulse" />
                    <div className="flex flex-col gap-1.5">
                      <h3 className="text-xl font-bold uppercase tracking-wider text-rose-500">
                        Uplink Connection Failed
                      </h3>
                      <p className="text-xs font-mono text-text-muted">
                        Transmission disrupted. Secure handshake timed out or credentials invalid.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-3 justify-center mt-2">
                      <Button onClick={() => handleSubmit()} variant="primary" size="sm" className="text-xs uppercase tracking-widest font-mono bg-rose-600 hover:bg-rose-700 text-white">
                        Retry Uplink
                      </Button>
                      <Button onClick={handleBypassSimulator} variant="outline" size="sm" className="text-xs border-white/10 uppercase tracking-widest font-mono hover:bg-white/5">
                        Force Simulator
                      </Button>
                      <Button onClick={handleReset} variant="outline" size="sm" className="text-xs border-white/10 uppercase tracking-widest font-mono hover:bg-white/5">
                        Abort & Reset
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
