
import React, { useState } from 'react';
import { Lock, Mail, Loader2, ShieldCheck, AlertCircle } from 'lucide-react';
import { UserRole } from '../types';

interface LoginProps {
  onLogin: (email: string, role: UserRole) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call with role derivation logic
    setTimeout(() => {
      if (password === 'password123') {
        let role: UserRole = 'EMPLOYEE';
        const lowerEmail = email.toLowerCase();
        
        if (lowerEmail.startsWith('admin')) role = 'ADMIN';
        else if (lowerEmail.startsWith('vp')) role = 'VP';
        else if (lowerEmail.startsWith('srmgr')) role = 'SR_MANAGER';
        else if (lowerEmail.startsWith('mgr')) role = 'MANAGER';
        else if (lowerEmail.startsWith('tl')) role = 'TL';
        
        onLogin(email, role);
      } else {
        setError('Invalid credentials. Hint: use any email and "password123". Use prefixes like "vp@", "admin@", "mgr@" for different roles.');
        setIsLoading(false);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl shadow-xl shadow-blue-200 mb-4">
            <ShieldCheck className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">NexusHR</h1>
          <p className="text-slate-500 mt-2 font-medium text-sm">Enterprise Human Resource Suite</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 p-8 border border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Sign In</h2>
          
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com" 
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                />
              </div>
              <p className="mt-1 text-[10px] text-slate-400">Try vp@, mgr@, tl@, or admin@ for role testing.</p>
            </div>

            <div>
              <div className="flex justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Password</label>
                <button type="button" className="text-xs font-bold text-blue-600 hover:underline">Forgot?</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password123" 
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg text-xs font-bold animate-in fade-in slide-in-from-top-1">
                <AlertCircle size={14} />
                <span>{error}</span>
              </div>
            )}

            <button 
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center space-x-2 disabled:opacity-70"
            >
              {isLoading ? <Loader2 className="animate-spin" size={20} /> : <span>Secure Sign In</span>}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-50">
            <p className="text-xs text-center text-slate-400">
              New company? <button className="text-blue-600 font-bold hover:underline">Start SaaS Trial</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
