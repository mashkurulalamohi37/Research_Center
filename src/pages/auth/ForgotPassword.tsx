import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Atom, ArrowLeft, Mail, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useToast } from '../../context/ToastContext';

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);
  const { success } = useToast();

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSent(true);
      success('Recovery Dispatched', `Password reset token link sent to ${email}`);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md space-y-6">
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
            Reset Portal Access
          </h2>
          <p className="text-xs text-slate-400">
            Enter your institutional email to receive a single-use authentication token.
          </p>
        </div>

        <div className="p-8 rounded-3xl border border-slate-800 bg-slate-900/90 shadow-2xl backdrop-blur-xl">
          {isSent ? (
            <div className="text-center py-6 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-cyan-400 mx-auto" />
              <h4 className="text-base font-bold text-slate-100">Recovery Instructions Dispatched</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Check your inbox at <strong>{email}</strong> for instructions to access your researcher console.
              </p>
              <div className="pt-3">
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    Back to Login
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleReset} className="space-y-4">
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

              <Button variant="cyan" size="lg" className="w-full" type="submit">
                <Send className="w-4 h-4 mr-1.5" /> Send Reset Link
              </Button>

              <div className="pt-2 text-center">
                <Link to="/login" className="text-xs text-slate-400 hover:text-cyan-400 inline-flex items-center gap-1">
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
