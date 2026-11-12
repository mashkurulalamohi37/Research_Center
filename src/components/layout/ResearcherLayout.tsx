import React, { useState } from 'react';
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  Atom, LayoutDashboard, User, BookOpen, FolderGit2, 
  GraduationCap, Activity, FileText, Bell, Settings, 
  LogOut, Menu, X, ArrowLeft, Shield
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export const ResearcherLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout, switchRole } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard Overview', path: '/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: 'My Profile', path: '/dashboard/profile', icon: <User className="w-4 h-4" /> },
    { name: 'My Publications', path: '/dashboard/publications', icon: <BookOpen className="w-4 h-4" /> },
    { name: 'My Projects', path: '/dashboard/projects', icon: <FolderGit2 className="w-4 h-4" /> },
    { name: 'My Students', path: '/dashboard/students', icon: <GraduationCap className="w-4 h-4" /> },
    { name: 'Research Activities', path: '/dashboard/activities', icon: <Activity className="w-4 h-4" /> },
    { name: 'Lab Resources', path: '/dashboard/resources', icon: <FileText className="w-4 h-4" /> },
    { name: 'Notifications', path: '/dashboard/notifications', icon: <Bell className="w-4 h-4" /> },
    { name: 'Settings', path: '/dashboard/settings', icon: <Settings className="w-4 h-4" /> },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="h-screen w-full overflow-hidden bg-slate-50 dark:bg-navy-950 flex text-slate-900 dark:text-slate-100">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/40 dark:bg-navy-950/80 backdrop-blur-md lg:hidden"
        />
      )}

      {/* Fixed Sidebar */}
      <aside
        className={`fixed lg:static top-0 bottom-0 left-0 z-50 w-64 h-screen shrink-0 bg-white dark:bg-slate-950/98 border-r border-slate-200 dark:border-slate-800/80 flex flex-col justify-between p-4 transition-transform duration-300 shadow-xl lg:shadow-none ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
          {/* Logo & Portal Badge */}
          <div className="flex items-center justify-between px-3 py-3 mb-3 border-b border-slate-200 dark:border-slate-800/80 shrink-0">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/iricc-logo.jpg"
                alt="IRICC Official Seal"
                width="36"
                height="36"
                className="w-9 h-9 rounded-full object-cover shadow-sm ring-2 ring-amber-400/40 shrink-0"
              />
              <div className="flex flex-col">
                <span className="text-base font-black tracking-wider text-slate-900 dark:text-slate-100 font-sans">IRICC PORTAL</span>
                <span className="text-[10px] text-cyan-700 dark:text-cyan-400 font-mono font-bold">FACULTY CONSOLE</span>
              </div>
            </Link>
            <button onClick={() => setSidebarOpen(false)} aria-label="Close Researcher Sidebar" className="lg:hidden text-slate-400 hover:text-slate-600 dark:hover:text-white focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-lg p-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items with Independent Scroll */}
          <nav className="space-y-1 overflow-y-auto pr-1 flex-1 py-1 custom-scrollbar">
            {navItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/dashboard'}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-cyan-50 text-cyan-800 border border-cyan-200 font-bold dark:bg-cyan-500/15 dark:text-cyan-400 dark:border-cyan-500/30'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-900/60'
                  }`
                }
              >
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom User Area */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 space-y-3 shrink-0">
          <div className="flex items-center gap-3 px-2">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
              alt={user?.name}
              className="w-9 h-9 rounded-xl object-cover border border-cyan-300 dark:border-cyan-500/40 shadow-xs shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">{user?.name || 'Dr. Marcus Vance'}</div>
              <div className="text-[10px] text-cyan-700 dark:text-cyan-400 font-mono font-semibold truncate">{user?.title || 'Lead Investigator'}</div>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <Link to="/" className="flex-1">
              <Button variant="outline" size="sm" className="w-full text-[11px] gap-1">
                <ArrowLeft className="w-3 h-3" /> Public Site
              </Button>
            </Link>
            <button
              onClick={handleLogout}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 hover:bg-red-50 dark:hover:bg-red-500/10 text-slate-500 hover:text-red-600 transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area with Separate Scroll */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Header Bar */}
        <header className="h-16 border-b border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-mono hidden sm:block">
              Connected to <strong className="text-cyan-700 dark:text-cyan-400">IRICC Secure Node (Cambridge-East)</strong>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => { switchRole('admin'); navigate('/admin'); }}
              className="text-xs hidden md:flex items-center gap-1 border-purple-500/30 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-500/10 cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5" /> Admin View
            </Button>

            <Badge variant="cyan">Faculty Active</Badge>
          </div>
        </header>

        {/* Sub-page Outlet */}
        <main className="flex-1 overflow-y-auto p-6 sm:p-8 bg-slate-50/70 dark:bg-navy-950">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
