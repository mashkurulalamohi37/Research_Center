import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Github, Linkedin, BookOpen, Shield, Globe, Sparkles } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { Logo } from '../ui/Logo';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const { success } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      success(
        'Subscribed to IRICC Research & Commercialization Dispatch',
        `Monthly research papers, spinout updates, and breakthrough briefings will be sent to ${email}`
      );
      setEmail('');
    }
  };

  return (
    <footer className="relative bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-sm overflow-hidden transition-colors duration-200">
      {/* Decorative subtle gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gradient-to-b from-cyan-500/5 to-transparent blur-3xl pointer-events-none" />

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Institute Brand & Vision */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="lg" />
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-sm">
              Advancing scientific frontiers, nurturing breakthrough innovation, and translating laboratory discoveries into world-changing commercial technologies.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="IRICC GitHub Organization"
                className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:text-cyan-700 dark:hover:text-cyan-400 hover:border-cyan-500/40 shadow-xs transition-colors focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:outline-none"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="IRICC LinkedIn Page"
                className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:text-cyan-700 dark:hover:text-cyan-400 hover:border-cyan-500/40 shadow-xs transition-colors focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:outline-none"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://scholar.google.com"
                target="_blank"
                rel="noreferrer"
                aria-label="IRICC Google Scholar Profile"
                className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:text-cyan-700 dark:hover:text-cyan-400 hover:border-cyan-500/40 shadow-xs transition-colors focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:outline-none"
              >
                <BookOpen className="w-4 h-4" />
              </a>
              <a
                href="https://arxiv.org"
                target="_blank"
                rel="noreferrer"
                aria-label="IRICC arXiv Repository"
                className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:text-cyan-700 dark:hover:text-cyan-400 hover:border-cyan-500/40 shadow-xs transition-colors focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:outline-none"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Research Areas */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-4">
              Research Disciplines
            </h4>
            <ul className="space-y-2.5">
              <li><Link to="/research/artificial-intelligence" className="hover:text-cyan-700 dark:hover:text-cyan-400 transition-colors">AI Foundations & Logic</Link></li>
              <li><Link to="/research/computer-vision" className="hover:text-cyan-700 dark:hover:text-cyan-400 transition-colors">Computer Vision & 3D</Link></li>
              <li><Link to="/research/natural-language-processing" className="hover:text-cyan-700 dark:hover:text-cyan-400 transition-colors">NLP & Generative Systems</Link></li>
              <li><Link to="/research/robotics-autonomous-systems" className="hover:text-cyan-700 dark:hover:text-cyan-400 transition-colors">Robotics & Autonomous</Link></li>
              <li><Link to="/research/healthcare-ai" className="hover:text-cyan-700 dark:hover:text-cyan-400 transition-colors">Healthcare AI & Biotech</Link></li>
              <li><Link to="/research/cybersecurity-trustworthy-ai" className="hover:text-cyan-700 dark:hover:text-cyan-400 transition-colors">Trustworthy & Cyber AI</Link></li>
            </ul>
          </div>

          {/* Col 3: Academic Portals */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-4">
              Center & Portals
            </h4>
            <ul className="space-y-2.5">
              <li><Link to="/about" className="hover:text-cyan-700 dark:hover:text-cyan-400 transition-colors">About & Leadership</Link></li>
              <li><Link to="/researchers" className="hover:text-cyan-700 dark:hover:text-cyan-400 transition-colors">Faculty & Investigators</Link></li>
              <li><Link to="/projects" className="hover:text-cyan-700 dark:hover:text-cyan-400 transition-colors">Research & Spinout Projects</Link></li>
              <li><Link to="/publications" className="hover:text-cyan-700 dark:hover:text-cyan-400 transition-colors">Publications & Patents</Link></li>
              <li><Link to="/opportunities" className="hover:text-cyan-700 dark:hover:text-cyan-400 transition-colors">Fellowships & Grants</Link></li>
              <li><Link to="/resources" className="hover:text-cyan-700 dark:hover:text-cyan-400 transition-colors">Open Models & Datasets</Link></li>
              <li>
                <Link to="/collaborate" className="text-cyan-700 dark:text-cyan-400 font-semibold hover:underline flex items-center gap-1">
                  Collaborate <Sparkles className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-4">
              Research Dispatch
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
              Receive monthly preprints, open dataset releases, tech transfer bulletins, and commercialization updates.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@institution.org"
                  aria-label="Email address for research dispatch"
                  className="w-full h-10 px-3.5 pr-10 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors shadow-xs"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to dispatch"
                  className="absolute right-1 top-1 bottom-1 px-2.5 rounded-lg bg-cyan-600 text-white dark:bg-cyan-500 dark:text-navy-950 hover:bg-cyan-500 transition-colors flex items-center justify-center cursor-pointer focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:outline-none"
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
          <p>© 2026 International Research and Innovation and Commercialization Center (IRICC). All rights reserved.</p>
          <div className="flex items-center gap-6 text-slate-600 dark:text-slate-400">
            <Link to="/contact" className="hover:text-slate-900 dark:hover:text-slate-200">Contact</Link>
            <Link to="/partners" className="hover:text-slate-900 dark:hover:text-slate-200">International Consortia</Link>
            <Link to="/login" className="hover:text-slate-900 dark:hover:text-slate-200 flex items-center gap-1">
              <Shield className="w-3 h-3" /> Staff Sign In
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
