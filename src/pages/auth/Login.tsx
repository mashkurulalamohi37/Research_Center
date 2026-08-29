import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Atom, Lock, Mail, ArrowRight, Shield, UserCheck, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { useToast } from '../../context/ToastContext';

export const Login: React.FC = () => {
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
      success('Authentication Successful', `Welcome back to the AIRC Portal.`);
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
    success(`Logged in as ${role === 'admin' ? 'Institute Director' : 'Faculty Investigator'}`);
    navigate(role === 'admin' ? '/admin' : '/dashboard');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5 flex items-center justify-center">
              <div className="w-full h-full bg-navy-950 rounded-[10px] flex items-center justify-center">
                <Atom className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <span className="text-2xl font-black text-slate-100 tracking-wider">AIRC</span>
          </Link>
          <h2 className="text-2xl font-extrabold text-slate-100 tracking-tight">
            Institutional Single Sign-On
          </h2>
          <p className="text-xs text-slate-400">
            Sign in to access Researcher Lab Space or Administrative Controls.
          </p>
        </div>

        {/* Login Card */}
        <div className="p-8 rounded-3xl border border-slate-800 bg-slate-900/90 shadow-2xl backdrop-blur-xl space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Institutional Email Address
              </label>
              <Input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="faculty@airc.research.edu"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-300">Password</label>
                <Link to="/forgot-password" className="text-[11px] text-cyan-400 hover:underline">
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

            <div className="pt-2">
              <Button variant="cyan" size="lg" className="w-full" type="submit" isLoading={isLoading}>
                Sign In to Portal <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </form>

          {/* Quick Demo Role Switcher */}
          <div className="pt-4 border-t border-slate-800/80 space-y-3">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center font-mono">
              Quick Prototype Demo Presets
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuickLogin('researcher')}
                className="text-xs flex items-center justify-center gap-1.5"
              >
                <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
                Researcher
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuickLogin('admin')}
                className="text-xs flex items-center justify-center gap-1.5"
              >
                <Shield className="w-3.5 h-3.5 text-purple-400" />
                Admin Director
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
