import React, { useState } from 'react';
import { Outlet, Link, NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Brain, FolderGit2, BookOpen, 
  Newspaper, Calendar, Briefcase, UserCheck, Handshake, 
  Image, BarChart3, FileText, Settings, LogOut, 
  Menu, X, ShieldAlert, ArrowLeft 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout, switchRole } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Director Dashboard', path: '/admin', icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: 'Researchers & Users', path: '/admin/researchers', icon: <Users className="w-4 h-4" /> },
    { name: 'Research Areas', path: '/admin/research-areas', icon: <Brain className="w-4 h-4" /> },
    { name: 'Projects Oversight', path: '/admin/projects', icon: <FolderGit2 className="w-4 h-4" /> },
    { name: 'Publications Review', path: '/admin/publications', icon: <BookOpen className="w-4 h-4" /> },
    { name: 'News & Press CMS', path: '/admin/news', icon: <Newspaper className="w-4 h-4" /> },
    { name: 'Events Management', path: '/admin/events', icon: <Calendar className="w-4 h-4" /> },
    { name: 'Opportunities', path: '/admin/opportunities', icon: <Briefcase className="w-4 h-4" /> },
    { name: 'Applications Review', path: '/admin/applications', icon: <UserCheck className="w-4 h-4" /> },
    { name: 'Collaborations', path: '/admin/collaborations', icon: <Handshake className="w-4 h-4" /> },
    { name: 'Media Library', path: '/admin/media', icon: <Image className="w-4 h-4" /> },
    { name: 'Analytics', path: '/admin/analytics', icon: <BarChart3 className="w-4 h-4" /> },
    { name: 'Audit Logs', path: '/admin/audit-logs', icon: <FileText className="w-4 h-4" /> },
    { name: 'System Settings', path: '/admin/settings', icon: <Settings className="w-4 h-4" /> },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="h-screen w-full overflow-hidden bg-navy-950 flex text-slate-100">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-navy-950/80 backdrop-blur-md lg:hidden"
        />
      )}

      {/* Admin Fixed Sidebar */}
      <aside
        className={`fixed lg:static top-0 bottom-0 left-0 z-50 w-64 h-screen shrink-0 bg-slate-950/98 border-r border-slate-800 flex flex-col justify-between p-4 transition-transform duration-300 shadow-2xl lg:shadow-none ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
          {/* Brand Header */}
          <div className="flex items-center justify-between px-3 py-3 mb-3 border-b border-slate-800 shrink-0">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 shadow-sm shrink-0">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-black tracking-wider text-slate-100 font-sans">AIRC ADMIN</span>
                <span className="text-[11px] text-purple-400 font-mono font-bold">DIRECTORATE CMS</span>
              </div>
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav List with Independent Scroll */}
          <nav className="space-y-1 overflow-y-auto pr-1 flex-1 py-1 custom-scrollbar">
            {navItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/admin'}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-purple-500/15 text-purple-300 border border-purple-500/30 font-bold'
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

        {/* Admin User Footer */}
        <div className="pt-4 border-t border-slate-800 space-y-3 shrink-0">
          <div className="flex items-center gap-3 px-2">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
              alt="Prof. Sarah Lin"
              className="w-9 h-9 rounded-xl object-cover border border-purple-500/40 shadow-sm shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-slate-100 truncate">Prof. Dr. Sarah Lin</div>
              <div className="text-[10px] text-purple-400 font-mono font-semibold truncate">Founding Director</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
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

      {/* Main Admin Body with Separate Scroll */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <header className="h-16 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white bg-slate-900 border border-slate-800"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="text-xs text-slate-400 font-mono hidden sm:block">
              Executive Institutional Management Console
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => { switchRole('researcher'); navigate('/dashboard'); }}
              className="text-xs hidden md:flex items-center gap-1 border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10 cursor-pointer"
            >
              Researcher View
            </Button>

            <Badge variant="purple">Superadmin Mode</Badge>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
