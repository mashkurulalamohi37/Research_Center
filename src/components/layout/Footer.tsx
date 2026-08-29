import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Atom, Mail, ArrowRight, Github, Linkedin, BookOpen, Shield, Globe, Sparkles } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const { success } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      success('Subscribed to AIRC Research Dispatch', `Monthly research papers and breakthroughs will be sent to ${email}`);
      setEmail('');
    }
  };

  return (
    <footer className="relative bg-slate-100 dark:bg-navy-950 border-t border-slate-200 dark:border-slate-800/80 text-slate-600 dark:text-slate-400 text-sm overflow-hidden transition-colors duration-200">
      {/* Decorative radial gradient in footer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gradient-to-b from-cyan-500/10 to-transparent blur-3xl pointer-events-none" />

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Institute Brand & Vision */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/20">
                <div className="w-full h-full bg-slate-900 dark:bg-navy-950 rounded-[10px] flex items-center justify-center">
                  <Atom className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-wider text-slate-900 dark:text-slate-100 font-sans">
                  AIRC
                </span>
                <span className="text-xs text-slate-600 dark:text-slate-400 font-medium -mt-1">
                  Advanced Intelligent Research Center
                </span>
              </div>
            </Link>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-sm">
              Advancing intelligence. Enabling innovation. A multidisciplinary academic research institute dedicated to verifiable neural foundations, embodied robotics, and clinical translational AI.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500/40 shadow-sm transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500/40 shadow-sm transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://scholar.google.com" target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500/40 shadow-sm transition-colors">
                <BookOpen className="w-4 h-4" />
              </a>
              <a href="https://arxiv.org" target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500/40 shadow-sm transition-colors">
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Research Areas */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-4">Research Disciplines</h4>
            <ul className="space-y-2.5">
              <li><Link to="/research/artificial-intelligence" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">AI Foundations & Logic</Link></li>
              <li><Link to="/research/computer-vision" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Computer Vision & 3D</Link></li>
              <li><Link to="/research/natural-language-processing" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">NLP & Generative AI</Link></li>
              <li><Link to="/research/robotics-autonomous-systems" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Robotics & Autonomous</Link></li>
              <li><Link to="/research/healthcare-ai" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Healthcare AI & Biotech</Link></li>
              <li><Link to="/research/cybersecurity-trustworthy-ai" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Trustworthy & Cyber AI</Link></li>
            </ul>
          </div>

          {/* Col 3: Academic Portals */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-4">Institution & Portals</h4>
            <ul className="space-y-2.5">
              <li><Link to="/about" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">About & Leadership</Link></li>
              <li><Link to="/researchers" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Faculty & Investigators</Link></li>
              <li><Link to="/projects" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Research Projects</Link></li>
              <li><Link to="/publications" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Publications & Papers</Link></li>
              <li><Link to="/opportunities" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Fellowships & Grants</Link></li>
              <li><Link to="/resources" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Open Models & Datasets</Link></li>
              <li><Link to="/collaborate" className="text-cyan-600 dark:text-cyan-400 font-semibold hover:underline flex items-center gap-1">
                Collaborate <Sparkles className="w-3 h-3" />
              </Link></li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-4">Research Newsletter</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
              Receive monthly peer-reviewed preprints, open dataset releases, and symposium announcements.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@university.edu"
                  className="w-full h-10 px-3.5 pr-10 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors shadow-sm"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-2.5 rounded-lg bg-cyan-500 text-white dark:text-navy-950 hover:bg-cyan-400 transition-colors flex items-center justify-center cursor-pointer"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-500 block">No spam. Unsubscribe at any time.</span>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2026 Advanced Intelligent Research Center. All rights reserved.</p>
          <div className="flex items-center gap-6 text-slate-600 dark:text-slate-500">
            <Link to="/contact" className="hover:text-slate-900 dark:hover:text-slate-400">Contact</Link>
            <Link to="/partners" className="hover:text-slate-900 dark:hover:text-slate-400">Academic Consortia</Link>
            <Link to="/login" className="hover:text-slate-900 dark:hover:text-slate-400 flex items-center gap-1">
              <Shield className="w-3 h-3" /> Staff Sign In
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
