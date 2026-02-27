import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import HRCorner from './HRCorner';
import LeaveManagement from './LeaveManagement';
import Ticketing from './Ticketing';
import AdminCorner from './AdminCorner';
import LearningPage from './LearningPage';
import TalentHub from './TalentHub';
import Login from './Login';
import { UserRole, User } from '../types';
import { Bell, Search, HelpCircle, LogOut } from 'lucide-react';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentView, setView] = useState('dashboard');
  const [role, setRole] = useState<UserRole>('EMPLOYEE');
  const [userEmail, setUserEmail] = useState('');
  const [employees, setEmployees] = useState<any[]>([]);
  

  useEffect(() => {
    const savedAuth = localStorage.getItem('nexus_auth');
    if (savedAuth) {
      try {
        const { email, role: savedRole } = JSON.parse(savedAuth);
        setUserEmail(email);
        setRole(savedRole);
        setIsAuthenticated(true);
      } catch {
        localStorage.removeItem('nexus_auth');
      }
    }

    fetch("http://localhost:3001/api/employees")
      .then((res) => res.json())
      .then((data) => {
        setEmployees(data);
        console.log('Employees loaded:', data);
      })
      .catch((err) => console.error('Fetch error:', err));
  }, []);

  const handleLogin = (email: string, userRole: UserRole) => {
    setUserEmail(email);
    setRole(userRole);
    setIsAuthenticated(true);
    localStorage.setItem('nexus_auth', JSON.stringify({ email, role: userRole }));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('nexus_auth');
    setView('dashboard');
  };

  const getRoleLabel = (r: UserRole) => {
    switch (r) {
      case 'TL': return 'Team Lead';
      case 'SR_MANAGER': return 'Senior Manager';
      case 'VP': return 'Vice President';
      case 'ADMIN': return 'Administrator';
      default: return r.charAt(0) + r.slice(1).toLowerCase();
    }
  };

  const getRoleColor = (r: UserRole) => {
    switch (r) {
      case 'ADMIN': return 'bg-rose-50 text-rose-600 border-rose-100';
      case 'VP': return 'bg-purple-50 text-purple-600 border-purple-100';
      case 'SR_MANAGER': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'MANAGER': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'TL': return 'bg-indigo-50 text-indigo-600 border-indigo-100';
      default: return 'bg-blue-50 text-blue-600 border-blue-100';
    }
  };

  const user: User = {
    id: `EMP-${userEmail ? userEmail.length * 123 : 5501}`,
    name:
      role === 'ADMIN'
        ? 'System Admin'
        : role === 'VP'
        ? 'Sarah Jenkins'
        : 'Alexander Pierce',
    department:
      role === 'ADMIN'
        ? 'Infrastructure'
        : role === 'VP'
        ? 'Strategy'
        : 'Product Engineering',
    role: role,
    email: userEmail || 'guest@nexus.com',
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userEmail || 'nexus'}`
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard employees={employees} />;
      case 'talent-hub': return <TalentHub />;
      case 'hr-corner': return <HRCorner />;
      case 'leave': return <LeaveManagement />;
      case 'ticketing': return <Ticketing />;
      case 'admin-corner': return <AdminCorner />;
      case 'learning': return <LearningPage />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <Sidebar currentView={currentView} setView={setView} role={role} onLogout={handleLogout} />

      <main className="flex-1 ml-64 p-8">
        <header className="flex justify-between items-center mb-8 bg-white/80 p-4 rounded-2xl border border-slate-100 shadow-sm sticky top-4 z-40 backdrop-blur-md">
          <div className="flex items-center space-x-4 flex-1">
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search resources, tickets, docs..."
                className="w-full bg-slate-50 border-none rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none"
              />
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex space-x-2">
              <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-lg transition-colors relative">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-lg transition-colors">
                <HelpCircle size={20} />
              </button>
            </div>

            <div className="h-8 w-[1px] bg-slate-200"></div>

            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-800 leading-none mb-1.5">{user.name}</p>
                <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full border ${getRoleColor(role)}`}>
                  {getRoleLabel(role)}
                </span>
              </div>
              <div className="relative group cursor-pointer" onClick={handleLogout} title="Logout">
                <img
                  src={user.avatar}
                  alt="Profile"
                  className="w-10 h-10 rounded-xl object-cover border-2 border-white shadow-sm ring-1 ring-slate-100 group-hover:ring-blue-200 transition-all"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/60 rounded-xl">
                  <LogOut size={16} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 min-h-[calc(100vh-200px)]">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight capitalize">
              {currentView.replace('-', ' ')}
            </h1>
            <div className="text-xs font-bold text-slate-400 bg-white px-3 py-1.5 rounded-full border border-slate-100 shadow-sm">
              NexusHR SaaS • Enterprise v2.5.0
            </div>
          </div>

          {renderView()}
        </div>

        <footer className="mt-16 text-center text-slate-400 text-xs py-8 border-t border-slate-100">
          <p>© 2024 NexusHR SaaS Solutions. All rights reserved. • ISO 27001 Certified • SOC2 Compliant</p>
        </footer>
      </main>
    </div>
  );
};

export default App;