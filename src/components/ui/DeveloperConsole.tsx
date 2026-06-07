'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal } from 'lucide-react';

const HELP_OUTPUT = [
  'Available Commands:',
  '  help      - Print command logs directory',
  '  about     - Output narrative biography & mission',
  '  skills    - Render ASCII galaxy capability map',
  '  projects  - Index current portfolio platforms',
  '  contact   - Print secure communication paths',
  '  resume    - Output CV operational history',
  '  clear     - Wipe out all operational logs',
  '  exit      - Close secure uplink connection'
];

const ABOUT_OUTPUT = [
  'SYNPSE CORE AGENT BIOGRAPHY:',
  '  Student: CSE B.Tech 3rd Year | CGPA: 9.1',
  '  Focus:   AI Architect & Full Stack System Engineer',
  '  Mission: Build autonomous operational workflows replacing repetitive human keys.',
  '  Creed:   "Build intelligent engines. Automate operations. Execute ruthlessly."'
];

const SKILLS_OUTPUT = [
  '+------------------------------------------------------+',
  '|               NEURAL CAPABILITY GALAXY               |',
  '+------------------+------------------+----------------+',
  '| AI ENGINE        | FULL STACK CORE  | AUTOMATIONS    |',
  '+------------------+------------------+----------------+',
  '| Python           | TypeScript       | n8n Workflows  |',
  '| OpenAI APIs      | Next.js 15       | Zapier APIs    |',
  '| LangChain Nodes  | React            | Make Pipelines |',
  '| PyTorch / TF     | PostgreSQL/Mongo | AI Agents      |',
  '+------------------+------------------+----------------+',
  '| GROWTH HACKING   |                  |                |',
  '+------------------+------------------+----------------+',
  '| Technical SEO    | GSC Analytics    | Growth Hacks   |',
  '+------------------+------------------+----------------+'
];

const PROJECTS_OUTPUT = [
  'ACTIVE DEPLOYMENTS:',
  '  1. Synapse Core  - Cognitive Multi-Agent LLM System  -> https://github.com/placeholder/synapse-core',
  '  2. Nexus SaaS    - Next.js Subscription Billing Template -> https://github.com/placeholder/nexus-saas',
  '  3. AuraFlow      - n8n Automatic Lead Qualifier         -> https://github.com/placeholder/auraflow',
  '  4. Optima SEO    - AI Search Keyword Analyzer Engine    -> https://github.com/placeholder/optima-seo'
];

const CONTACT_OUTPUT = [
  'COMMUNICATION UPLINKS:',
  '  - Email:    mrdineshcse@gmail.com',
  '  - GitHub:   https://github.com/dinnu-2006',
  '  - LinkedIn: https://www.linkedin.com/in/dinesh-p-666867413?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
  '  - Status:   Available for freelance operational design.'
];

const RESUME_OUTPUT = [
  'OPERATIONAL ROADMAP RECORD:',
  '  - Co-Founder | Synapse Core Automations (Jan 2026 - Present)',
  '  - AI Research Intern | Aura AI Solutions (Nov 2025 - Feb 2026)',
  '  - Freelance Engineer | Automation Systems (May 2025 - Present)',
  '  - B.Tech CSE Student | State Tech University (2023 - 2027)'
];

interface DeveloperConsoleProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeveloperConsole: React.FC<DeveloperConsoleProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState<string[]>([
    'SYNAPSE CORE SECURE INTERACTION TERMINAL v1.4',
    'Connection established on SECURE_RPC_NODE.',
    'Enter "help" to view operations index.',
    ''
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Scroll terminal logs to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Execute terminal input commands
  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    const newLogs = [...logs, `synapse-core@agent:~$ ${cmdStr}`];

    if (!trimmed) {
      setLogs([...newLogs, '']);
      return;
    }

    switch (trimmed) {
      case 'help':
        setLogs([...newLogs, ...HELP_OUTPUT, '']);
        break;
      case 'about':
        setLogs([...newLogs, ...ABOUT_OUTPUT, '']);
        break;
      case 'skills':
        setLogs([...newLogs, ...SKILLS_OUTPUT, '']);
        break;
      case 'projects':
        setLogs([...newLogs, ...PROJECTS_OUTPUT, '']);
        break;
      case 'contact':
        setLogs([...newLogs, ...CONTACT_OUTPUT, '']);
        break;
      case 'resume':
        setLogs([...newLogs, ...RESUME_OUTPUT, '']);
        break;
      case 'clear':
        setLogs([]);
        break;
      case 'exit':
        onClose();
        break;
      default:
        setLogs([
          ...newLogs,
          `command not found: "${trimmed}". Enter "help" for catalog directory.`,
          ''
        ]);
        break;
    }
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden">
          {/* Backdrop blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Console Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25 }}
            className="relative z-10 w-full max-w-3xl h-[450px] rounded-xl border border-primary-accent/25 bg-[#0C1519]/95 shadow-[0_0_30px_rgba(207, 157, 123,0.15)] flex flex-col overflow-hidden font-mono text-xs md:text-sm text-white"
          >
            {/* Header bar */}
            <div className="flex items-center justify-between border-b border-primary-accent/20 bg-[#162127] px-4 py-3 select-none">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-primary-accent" />
                <span className="text-[10px] tracking-wider uppercase font-semibold text-primary-accent">
                  Developer Terminal Mode
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 cursor-pointer" onClick={onClose} />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
            </div>

            {/* Terminal Logs scroll container */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-1.5 scrollbar-thin select-text">
              {logs.map((log, idx) => (
                <div
                  key={idx}
                  className={`text-left leading-relaxed whitespace-pre-wrap ${
                    log.startsWith('synapse-core') 
                      ? 'text-primary-accent' 
                      : log.startsWith('command not found')
                      ? 'text-red-400'
                      : 'text-white/90'
                  }`}
                >
                  {log}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Prompt input line */}
            <div className="flex items-center gap-1.5 border-t border-primary-accent/10 bg-[#0C1519]/80 px-4 py-3">
              <span className="text-primary-accent font-semibold flex-shrink-0 select-none">
                synapse-core@agent:~$
              </span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none border-none text-white font-mono"
                autoFocus
              />
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DeveloperConsole;
