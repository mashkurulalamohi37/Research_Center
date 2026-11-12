import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Atom, Shield, UserCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useToast } from '../../context/ToastContext';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export const Login: React.FC = () => {
  useDocumentTitle('Staff & Faculty Sign In');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, switchRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { success, error } = useToast();

  const from = (location.state as any)?.from?.pathname || '/dashboard';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      error('Email Required', 'Please enter your institutional email.');
      return;
    }

    setIsLoading(true);
    try {
      await login(email);
      setIsLoading(false);
      success('Authentication Successful', `Welcome back to the IRICC Portal.`);
      if (email.toLowerCase().includes('admin')) {
        navigate('/admin');
      } else {
        navigate(from);
      }
    } catch {
      setIsLoading(false);
      error('Authentication Failed', 'Invalid credentials.');
    }
  };

  const handleQuickLogin = (role: 'researcher' | 'admin') => {
    switchRole(role);
    success(`Logged in as ${role === 'admin' ? 'Center Director' : 'Faculty Investigator'}`);
    navigate(role === 'admin' ? '/admin' : '/dashboard');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <Link to="/" className="inline-flex flex-col items-center gap-2 mb-2 group">
            <img
              src="/iricc-logo.jpg"
              alt="IRICC Official Seal"
              width="64"
              height="64"
              className="w-16 h-16 rounded-full object-cover shadow-md ring-2 ring-amber-400/50 group-hover:ring-amber-500/80 transition-all duration-300"
            />
            <span className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-wider font-sans">IRICC</span>
          </Link>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Institutional Single Sign-On
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Sign in to access Researcher Lab Space, IP Portfolio, or Administrative Controls.
          </p>
        </div>

        {/* Login Card */}
        <div className="p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-xl backdrop-blur-xl space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Institutional Email Address
              </label>
              <Input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="faculty@iricc.org"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Password</label>
                <Link to="/forgot-password" className="text-[11px] text-cyan-600 dark:text-cyan-400 hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <Input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••••"
              />
            </div>

            <Button variant="cyan" size="lg" type="submit" className="w-full" isLoading={isLoading}>
              Sign In to IRICC Console
            </Button>
          </form>

          {/* Quick Demo Switcher Buttons */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
            <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-center font-mono">
              Demo Instant Access
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuickLogin('researcher')}
                className="text-xs flex items-center justify-center gap-1.5 border-cyan-500/30 text-cyan-700 dark:text-cyan-400"
              >
                <UserCheck className="w-3.5 h-3.5" />
                Faculty Login
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuickLogin('admin')}
                className="text-xs flex items-center justify-center gap-1.5 border-purple-500/30 text-purple-700 dark:text-purple-400"
              >
                <Shield className="w-3.5 h-3.5" />
                Director Admin
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
