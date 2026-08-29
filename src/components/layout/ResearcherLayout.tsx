import React, { useState } from 'react';
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  Atom, LayoutDashboard, User, BookOpen, FolderGit2, 
  GraduationCap, Activity, FileText, Bell, Settings, 
  LogOut, Menu, X, ArrowLeft, Shield, Sparkles 
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
    <div className="min-h-screen bg-navy-950 flex text-slate-100">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-navy-950/80 backdrop-blur-md lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 bottom-0 left-0 z-50 w-64 bg-slate-950/98 border-r border-slate-800/80 flex flex-col justify-between p-4 transition-transform duration-300 shadow-2xl lg:shadow-none ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Logo & Portal Badge */}
          <div className="flex items-center justify-between px-3 py-3 mb-6 border-b border-slate-800/80">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-sm">
                <Atom className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-black tracking-wider text-slate-100 font-sans">AIRC PORTAL</span>
                <span className="text-[11px] text-cyan-400 font-mono font-bold">FACULTY CONSOLE</span>
              </div>
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1">
            {navItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/dashboard'}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 font-bold'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/60'
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
        <div className="pt-4 border-t border-slate-800/80 space-y-3">
          <div className="flex items-center gap-3 px-2">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
              alt={user?.name}
              className="w-9 h-9 rounded-xl object-cover border border-cyan-500/40 shadow-sm"
            />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-slate-100 truncate">{user?.name || 'Dr. Marcus Vance'}</div>
              <div className="text-[10px] text-cyan-400 font-mono font-semibold truncate">{user?.title || 'Lead Investigator'}</div>
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
              className="p-2 rounded-xl border border-slate-800 bg-slate-900 hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header Bar */}
        <header className="h-16 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white bg-slate-900 border border-slate-800"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="text-xs text-slate-400 font-mono hidden sm:block">
              Connected to <strong className="text-cyan-400">AIRC Secure Node (Cambridge-East)</strong>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => { switchRole('admin'); navigate('/admin'); }}
              className="text-xs hidden md:flex items-center gap-1 border-purple-500/30 text-purple-300 hover:bg-purple-500/10 cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5" /> Admin View
            </Button>

            <Badge variant="cyan">Faculty Active</Badge>
          </div>
        </header>

        {/* Sub-page Outlet */}
        <main className="flex-1 overflow-y-auto p-6 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
