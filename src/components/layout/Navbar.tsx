import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  Atom, Search, Sun, Moon, Menu, X, ChevronDown, 
  ShieldAlert, UserCheck, LogIn, ExternalLink, Sparkles, LogOut 
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';
import { GlobalSearchModal } from '../shared/GlobalSearchModal';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Research', path: '/research' },
  { name: 'Researchers', path: '/researchers' },
  { name: 'Projects', path: '/projects' },
  { name: 'Publications', path: '/publications' },
  { name: 'News', path: '/news' },
  { name: 'Events', path: '/events' },
  { name: 'Opportunities', path: '/opportunities' },
  { name: 'Resources', path: '/resources' },
  { name: 'Contact', path: '/contact' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [portalMenuOpen, setPortalMenuOpen] = useState(false);
  const portalRef = useRef<HTMLDivElement>(null);

  const { theme, toggleTheme } = useTheme();
  const { role, switchRole, user, logout } = useAuth();
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
  }, [location.pathname]);

  // Click outside listener for portal dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (portalRef.current && !portalRef.current.contains(event.target as Node)) {
        setPortalMenuOpen(false);
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
            ? 'bg-slate-900/90 dark:bg-navy-950/90 backdrop-blur-xl border-b border-slate-200 dark:border-cyan-500/15 shadow-lg py-3'
            : 'bg-transparent py-5 border-b border-slate-200/40 dark:border-white/5'
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all">
              <div className="w-full h-full bg-slate-900 dark:bg-navy-950 rounded-[10px] flex items-center justify-center">
                <Atom className="w-5 h-5 text-cyan-400 group-hover:rotate-180 transition-transform duration-700" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-wider text-slate-900 dark:text-slate-100 font-sans flex items-center gap-1.5">
                AIRC <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30">INSTITUTE</span>
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 tracking-tight font-medium -mt-1 hidden sm:block">
                Advanced Intelligent Research Center
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map(link => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 font-bold'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/40'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Icons & CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Global Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-cyan-600 dark:hover:text-cyan-400 border border-slate-300 dark:border-slate-700/60 transition-all cursor-pointer"
              title="Search (Ctrl + K)"
            >
              <Search className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span className="hidden md:inline">Search</span>
              <kbd className="hidden md:inline text-[10px] bg-white dark:bg-slate-900 px-1.5 py-0.5 rounded text-slate-500 dark:text-slate-400 border border-slate-300 dark:border-slate-700 font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 bg-slate-100 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700/60 transition-all cursor-pointer"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>

            {/* Quick Role Switcher / Portal Access */}
            <div ref={portalRef} className="relative hidden sm:block">
              <button
                onClick={() => setPortalMenuOpen(!portalMenuOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border border-slate-300 dark:border-slate-700/80 bg-white dark:bg-slate-900/80 text-slate-800 dark:text-slate-200 hover:border-cyan-500/40 transition-colors cursor-pointer shadow-sm"
              >
                {role === 'admin' ? (
                  <span className="flex items-center gap-1 text-purple-600 dark:text-purple-400 font-semibold">
                    <ShieldAlert className="w-3.5 h-3.5" /> Admin
                  </span>
                ) : role === 'researcher' ? (
                  <span className="flex items-center gap-1 text-cyan-600 dark:text-cyan-400 font-semibold">
                    <UserCheck className="w-3.5 h-3.5" /> Faculty
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                    <LogIn className="w-3.5 h-3.5" /> Portal
                  </span>
                )}
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${portalMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Portal Dropdown Menu */}
              {portalMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/95 shadow-2xl backdrop-blur-xl p-2 animate-fade-in z-50">
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
            <Link to="/collaborate" className="hidden sm:inline-flex">
              <Button variant="cyan" size="sm">
                <Sparkles className="w-3.5 h-3.5 mr-1" />
                Collaborate
              </Button>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700/60"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden fixed inset-x-0 top-[65px] bg-white/98 dark:bg-navy-950/98 border-b border-slate-200 dark:border-cyan-500/20 backdrop-blur-2xl p-6 shadow-2xl animate-fade-in max-h-[85vh] overflow-y-auto">
            <div className="flex flex-col gap-2 mb-6">
              {navLinks.map(link => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 space-y-3 mb-6">
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Direct Portal Switcher
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSwitchPortal('researcher')}
                  className={role === 'researcher' ? 'border-cyan-500 text-cyan-500' : ''}
                >
                  Researcher UI
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSwitchPortal('admin')}
                  className={role === 'admin' ? 'border-purple-500 text-purple-500' : ''}
                >
                  Admin Portal
                </Button>
              </div>
            </div>

            <Link to="/collaborate" className="w-full">
              <Button variant="cyan" size="md" className="w-full">
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
