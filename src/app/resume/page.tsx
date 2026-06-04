'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import NeuralNetwork from '@/components/effects/NeuralNetwork';
import DataStreams from '@/components/effects/DataStreams';
import AICursor from '@/components/effects/AICursor';
import DeveloperConsole from '@/components/ui/DeveloperConsole';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { experience } from '@/data/experience';
import { skills } from '@/data/skills';
import { achievements } from '@/data/achievements';
import { Printer, ArrowLeft, Mail, Calendar, GraduationCap, Briefcase, Award, ExternalLink } from 'lucide-react';

export default function ResumePage() {
  const [consoleOpen, setConsoleOpen] = useState(false);

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

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="relative min-h-screen bg-[#030712] text-white">
      {/* Background canvases (hidden in print via css) */}
      <div className="no-print">
        <NeuralNetwork />
        <DataStreams />
        <AICursor />
        <Navbar onTerminalToggle={() => setConsoleOpen(true)} />
      </div>

      <main className="pt-28 pb-24 container mx-auto px-4 md:px-8">
        
        {/* Actions bar (hidden in print) */}
        <div className="no-print max-w-4xl mx-auto flex items-center justify-between mb-8 border-b border-white/6 pb-6">
          <Button variant="outline" href="/" size="sm" className="flex items-center gap-2 text-xs uppercase tracking-wider">
            <ArrowLeft className="w-4 h-4" />
            Return to Base
          </Button>

          <Button variant="primary" onClick={handlePrint} size="sm" className="flex items-center gap-2 text-xs uppercase tracking-wider">
            <Printer className="w-4 h-4" />
            Print / Save PDF
          </Button>
        </div>

        {/* Printable CV Container */}
        <div className="print-container max-w-4xl mx-auto glass-card bg-[#07131A]/10 border border-white/6 p-6 md:p-10 shadow-2xl flex flex-col gap-10">
          
          {/* Header Info */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-8 text-left">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-wide">
                Dinesh P
              </h1>
              <h2 className="text-base md:text-lg font-mono text-primary-accent uppercase tracking-widest mt-1">
                Web Developer & AI Developer
              </h2>
              <span className="text-xs text-text-muted mt-2 block font-medium">
                CSE Undergraduate Student (3rd Year)
              </span>
            </div>

            <div className="flex flex-col gap-2 text-xs font-mono text-text-muted">
              <a href="mailto:mrdineshcse@gmail.com" className="flex items-center gap-2 hover:text-primary-accent transition-colors">
                <Mail className="w-4 h-4" />
                mrdineshcse@gmail.com
              </a>
              <a href="https://github.com/dinnu-2006" target="_blank" className="flex items-center gap-2 hover:text-primary-accent transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                github.com/dinnu-2006
              </a>
              <a href="https://www.linkedin.com/in/dinesh-p-666867413?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" className="flex items-center gap-2 hover:text-primary-accent transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                linkedin.com/in/dinesh-p
              </a>
            </div>
          </div>

          {/* Body Columns */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 text-left">
            
            {/* Left Column: Summary, Skills, Education */}
            <div className="md:col-span-4 flex flex-col gap-8">
              
              {/* Summary */}
              <div>
                <h3 className="text-xs uppercase font-mono tracking-widest text-primary-accent font-semibold mb-3 pb-1.5 border-b border-white/6">
                  Executive Brief
                </h3>
                <ul className="flex flex-col gap-1.5 text-xs text-text-muted leading-relaxed">
                  <li className="flex items-start gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-primary-accent/80 mt-1.5 flex-shrink-0" />
                    <span>Computer Science Engineering student with interests in Artificial Intelligence, Web Development, and Digital Marketing.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-primary-accent/80 mt-1.5 flex-shrink-0" />
                    <span>Building practical projects while continuously improving software development and problem-solving skills.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-primary-accent/80 mt-1.5 flex-shrink-0" />
                    <span>Currently learning AI development and exploring modern technologies to create useful applications.</span>
                  </li>
                </ul>
              </div>

              {/* Education */}
              <div>
                <h3 className="text-xs uppercase font-mono tracking-widest text-primary-accent font-semibold mb-3 pb-1.5 border-b border-white/6">
                  Education
                </h3>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold text-white uppercase">
                    B.E. Computer Science Engineering
                  </span>
                  <span className="text-[10px] text-text-muted font-medium">
                    Jaya Engineering College
                  </span>
                  <span className="text-[10px] font-mono text-text-muted">
                    2024 – 2028 (Expected)
                  </span>
                  <span className="text-[10px] font-mono text-primary-accent font-semibold mt-1">
                    Third Year Undergraduate Student
                  </span>
                </div>
              </div>

              {/* Skills Index */}
              <div>
                <h3 className="text-xs uppercase font-mono tracking-widest text-primary-accent font-semibold mb-3 pb-1.5 border-b border-white/6">
                  Core Toolkit
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {skills.slice(0, 16).map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/5 text-text-muted"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div>
                <h3 className="text-xs uppercase font-mono tracking-widest text-primary-accent font-semibold mb-3 pb-1.5 border-b border-white/6">
                  Certifications
                </h3>
                <div className="flex flex-col gap-3 text-[10px] font-mono text-text-muted">
                  {achievements.filter(a => a.category === 'certification').map((cert) => (
                    <div key={cert.id} className="flex flex-col">
                      {cert.credentialUrl ? (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white font-bold hover:text-primary-accent transition-colors flex items-center gap-1 group/link"
                        >
                          {cert.title}
                          <ExternalLink className="w-3 h-3 text-primary-accent opacity-60 group-hover/link:opacity-100 transition-opacity" />
                        </a>
                      ) : (
                        <span className="text-white font-bold">{cert.title}</span>
                      )}
                      <span>{cert.event}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Work Experience */}
            <div className="md:col-span-8 flex flex-col gap-8">
              
              <div>
                <h3 className="text-xs uppercase font-mono tracking-widest text-primary-accent font-semibold mb-6 pb-1.5 border-b border-white/6">
                  Employment & Startup Records
                </h3>

                <div className="flex flex-col gap-8">
                  {experience.map((job) => (
                    <div key={job.id} className="flex flex-col gap-3">
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div>
                          <h4 className="text-sm md:text-base font-bold text-white">
                            {job.role}
                          </h4>
                          <span className="text-xs text-text-muted font-medium">
                            {job.company}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-text-muted self-start sm:self-center">
                          {job.duration}
                        </span>
                      </div>

                      <ul className="flex flex-col gap-1.5 text-xs text-text-muted leading-relaxed">
                        {job.description.map((bullet, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="w-1 h-1 rounded-full bg-white/30 mt-1.5 flex-shrink-0" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>

      </main>

      <div className="no-print">
        <Footer />
      </div>

      <DeveloperConsole isOpen={consoleOpen} onClose={() => setConsoleOpen(false)} />

      {/* Print Overrides CSS */}
      <style jsx global>{`
        @media print {
          body {
            background: white !important;
            color: black !important;
            font-family: Arial, sans-serif !important;
          }
          .no-print {
            display: none !important;
          }
          .print-container {
            background: white !important;
            color: black !important;
            padding: 0 !important;
            border: none !important;
            box-shadow: none !important;
            max-width: 100% !important;
          }
          h1, h2, h3, h4, span, p, li, a {
            color: black !important;
          }
          h2, h3 {
            border-bottom-color: #ddd !important;
          }
          span.text-primary-accent {
            color: #000 !important;
            font-weight: bold !important;
          }
          .bg-white\\/5 {
            background: #eee !important;
            border-color: #ccc !important;
          }
        }
      `}</style>
    </div>
  );
}
