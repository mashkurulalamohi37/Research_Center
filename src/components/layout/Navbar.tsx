import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  Atom, Search, Sun, Moon, Menu, X, ChevronDown, 
  ShieldAlert, UserCheck, LogIn, Sparkles, LogOut,
  BookOpen, FolderGit2, Users, Newspaper, Calendar,
  Briefcase, Database, Mail, Info, Award
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';
import { GlobalSearchModal } from '../shared/GlobalSearchModal';

const primaryLinks = [
  { name: 'Research', path: '/research' },
  { name: 'Faculty', path: '/researchers' },
  { name: 'Projects', path: '/projects' },
  { name: 'Publications', path: '/publications' },
  { name: 'News', path: '/news' },
];

const exploreLinks = [
  { name: 'About Institute', path: '/about', icon: Info, desc: 'Mission, governance, and history' },
  { name: 'Events & Symposia', path: '/events', icon: Calendar, desc: 'Conferences and research talks' },
  { name: 'Opportunities', path: '/opportunities', icon: Briefcase, desc: 'Ph.D. fellowships and careers' },
  { name: 'Open Resources', path: '/resources', icon: Database, desc: 'Datasets, models, and code' },
  { name: 'Academic Partners', path: '/partners', icon: Award, desc: 'Consortia and alliances' },
  { name: 'Contact & Campus', path: '/contact', icon: Mail, desc: 'Cambridge campus directory' },
];

const allMobileLinks = [
  { name: 'Home', path: '/' },
  { name: 'Research Disciplines', path: '/research' },
  { name: 'Faculty & Researchers', path: '/researchers' },
  { name: 'Research Projects', path: '/projects' },
  { name: 'Publications & Preprints', path: '/publications' },
  { name: 'News & Press', path: '/news' },
  { name: 'Events & Symposia', path: '/events' },
  { name: 'Opportunities & Fellowships', path: '/opportunities' },
  { name: 'Open Resources & Models', path: '/resources' },
  { name: 'About the Institute', path: '/about' },
  { name: 'Contact & Directory', path: '/contact' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [portalMenuOpen, setPortalMenuOpen] = useState(false);
  const [exploreMenuOpen, setExploreMenuOpen] = useState(false);

  const portalRef = useRef<HTMLDivElement>(null);
  const exploreRef = useRef<HTMLDivElement>(null);

  const { theme, toggleTheme } = useTheme();
  const { role, switchRole, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setPortalMenuOpen(false);
    setExploreMenuOpen(false);
  }, [location.pathname]);

  // Click outside listener for dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (portalRef.current && !portalRef.current.contains(event.target as Node)) {
        setPortalMenuOpen(false);
      }
      if (exploreRef.current && !exploreRef.current.contains(event.target as Node)) {
        setExploreMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcut Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSwitchPortal = (targetRole: 'guest' | 'researcher' | 'admin') => {
    switchRole(targetRole);
    setPortalMenuOpen(false);
    setMobileMenuOpen(false);
    if (targetRole === 'guest') navigate('/');
    else if (targetRole === 'researcher') navigate('/dashboard');
    else if (targetRole === 'admin') navigate('/admin');
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-slate-900/95 dark:bg-navy-950/95 backdrop-blur-xl border-b border-slate-200/80 dark:border-cyan-500/20 shadow-xl py-2.5'
            : 'bg-slate-900/80 dark:bg-navy-950/80 backdrop-blur-md py-3.5 border-b border-slate-200/40 dark:border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2 lg:gap-4">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5 shadow-md shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all">
              <div className="w-full h-full bg-slate-900 dark:bg-navy-950 rounded-[10px] flex items-center justify-center">
                <Atom className="w-4 h-4 text-cyan-400 group-hover:rotate-180 transition-transform duration-700" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-black tracking-wider text-slate-900 dark:text-slate-100 font-sans flex items-center gap-1.5 leading-tight">
                AIRC <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 font-semibold">INSTITUTE</span>
              </span>
              <span className="text-[9px] text-slate-500 dark:text-slate-400 tracking-tight font-medium hidden md:block">
                Advanced Intelligent Research Center
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 shrink-0">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-2.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  isActive
                    ? 'text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/40'
                }`
              }
            >
              Home
            </NavLink>

            {primaryLinks.map(link => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-2.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 font-bold'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/40'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            {/* Explore Dropdown */}
            <div ref={exploreRef} className="relative">
              <button
                onClick={() => setExploreMenuOpen(!exploreMenuOpen)}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  exploreMenuOpen
                    ? 'text-cyan-600 dark:text-cyan-400 bg-cyan-500/10'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/40'
                }`}
              >
                <span>Explore</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${exploreMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {exploreMenuOpen && (
                <div className="absolute left-0 mt-2 w-64 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/95 shadow-2xl backdrop-blur-xl p-2 animate-fade-in z-50">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Institute Directory
                  </div>
                  <div className="space-y-1">
                    {exploreLinks.map(item => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setExploreMenuOpen(false)}
                          className="flex items-start gap-2.5 p-2 rounded-xl text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors group"
                        >
                          <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors shrink-0 mt-0.5">
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="font-semibold">{item.name}</div>
                            <div className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">{item.desc}</div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-cyan-600 dark:hover:text-cyan-400 border border-slate-300 dark:border-slate-700/60 transition-all cursor-pointer"
              title="Search (Ctrl + K)"
            >
              <Search className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden xl:inline text-[9px] bg-white dark:bg-slate-900 px-1 py-0.2 rounded text-slate-500 dark:text-slate-400 border border-slate-300 dark:border-slate-700 font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-1.5 sm:p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 bg-slate-100 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700/60 transition-all cursor-pointer"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-indigo-600" />}
            </button>

            {/* Portal Switcher Dropdown */}
            <div ref={portalRef} className="relative">
              <button
                onClick={() => setPortalMenuOpen(!portalMenuOpen)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium border border-slate-300 dark:border-slate-700/80 bg-white dark:bg-slate-900/80 text-slate-800 dark:text-slate-200 hover:border-cyan-500/40 transition-colors cursor-pointer shadow-sm"
              >
                {role === 'admin' ? (
                  <span className="flex items-center gap-1 text-purple-600 dark:text-purple-400 font-semibold text-xs">
                    <ShieldAlert className="w-3.5 h-3.5" /> Admin
                  </span>
                ) : role === 'researcher' ? (
                  <span className="flex items-center gap-1 text-cyan-600 dark:text-cyan-400 font-semibold text-xs">
                    <UserCheck className="w-3.5 h-3.5" /> Faculty
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400 text-xs">
                    <LogIn className="w-3.5 h-3.5" /> Portal
                  </span>
                )}
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${portalMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {portalMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/95 shadow-2xl backdrop-blur-xl p-2 animate-fade-in z-50">
                  <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Switch Active Workspace
                  </div>
                  <button
                    onClick={() => handleSwitchPortal('guest')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors flex items-center justify-between cursor-pointer ${
                      role === 'guest' ? 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 font-semibold' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>Public Website</span>
                    {role === 'guest' && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>}
                  </button>
                  <button
                    onClick={() => handleSwitchPortal('researcher')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors flex items-center justify-between cursor-pointer ${
                      role === 'researcher' ? 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 font-semibold' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">Researcher Portal</span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">Dr. Marcus Vance</span>
                    </div>
                    {role === 'researcher' && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>}
                  </button>
                  <button
                    onClick={() => handleSwitchPortal('admin')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors flex items-center justify-between cursor-pointer ${
                      role === 'admin' ? 'bg-purple-500/15 text-purple-600 dark:text-purple-400 font-semibold' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">Director Admin CMS</span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">Prof. Sarah Lin</span>
                    </div>
                    {role === 'admin' && <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>}
                  </button>
                  {role !== 'guest' && (
                    <div className="mt-1 pt-1 border-t border-slate-200 dark:border-slate-800">
                      <button
                        onClick={() => { logout(); setPortalMenuOpen(false); navigate('/login'); }}
                        className="w-full text-left px-3 py-1.5 rounded-lg text-xs text-red-500 hover:bg-red-500/10 transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <LogOut className="w-3 h-3" /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Primary CTA */}
            <Link to="/collaborate" className="hidden sm:inline-flex shrink-0">
              <Button variant="cyan" size="sm" className="h-8 px-3 text-xs">
                <Sparkles className="w-3 h-3 mr-1" />
                Collaborate
              </Button>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700/60 shrink-0"
              aria-label="Open Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-[58px] bg-white/98 dark:bg-navy-950/98 border-b border-slate-200 dark:border-cyan-500/20 backdrop-blur-2xl p-5 shadow-2xl animate-fade-in max-h-[85vh] overflow-y-auto">
            <div className="flex flex-col gap-1.5 mb-5">
              {allMobileLinks.map(link => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 font-bold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 space-y-2.5 mb-4">
              <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Direct Workspace Switcher
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSwitchPortal('researcher')}
                  className={`text-xs ${role === 'researcher' ? 'border-cyan-500 text-cyan-500' : ''}`}
                >
                  Researcher UI
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSwitchPortal('admin')}
                  className={`text-xs ${role === 'admin' ? 'border-purple-500 text-purple-500' : ''}`}
                >
                  Admin Portal
                </Button>
              </div>
            </div>

            <Link to="/collaborate" className="w-full">
              <Button variant="cyan" size="md" className="w-full text-xs">
                <Sparkles className="w-3.5 h-3.5 mr-1" />
                Collaborate With AIRC
              </Button>
            </Link>
          </div>
        )}
      </header>

      {/* Global Search Modal Trigger */}
      <GlobalSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};
