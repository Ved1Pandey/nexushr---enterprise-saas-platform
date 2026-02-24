import React from 'react';
import { 
  Home, FileText, Calendar, ShieldCheck, 
  BookOpen, Briefcase, BarChart3, Users,
  Rocket, LogOut, Ticket, UserCheck
} from 'lucide-react';
import { UserRole } from '../types';

interface SidebarProps {
  currentView: string;
  setView: (view: string) => void;
  role: UserRole;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, role, onLogout }) => {
  const ALL_ROLES: UserRole[] = ['EMPLOYEE', 'TL', 'MANAGER', 'SR_MANAGER', 'VP', 'ADMIN'];
  const LEADERSHIP_ROLES: UserRole[] = ['TL', 'MANAGER', 'SR_MANAGER', 'VP', 'ADMIN'];
  const EXEC_ROLES: UserRole[] = ['VP', 'ADMIN'];

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, roles: ALL_ROLES },
    { id: 'talent-hub', label: 'Talent & Mobility', icon: Rocket, roles: ALL_ROLES },
    { id: 'team', label: 'My Team', icon: Users, roles: LEADERSHIP_ROLES },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, roles: EXEC_ROLES },
    { id: 'hr-corner', label: 'HR Corner', icon: FileText, roles: ALL_ROLES },
    { id: 'attendance', label: 'Attendance', icon: UserCheck, roles: ALL_ROLES },
    { id: 'leave', label: 'Leave & WFH', icon: Calendar, roles: ALL_ROLES },
    { id: 'admin-corner', label: 'Admin Corner', icon: ShieldCheck, roles: ['ADMIN'] },
    { id: 'ticketing', label: 'Ticketing', icon: Ticket, roles: ALL_ROLES },
    { id: 'learning', label: 'Learning', icon: BookOpen, roles: ALL_ROLES },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white h-screen flex flex-col fixed left-0 top-0 z-50 shadow-2xl">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-1">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <ShieldCheck size={20} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            NexusHR
          </h1>
        </div>
        <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-[0.2em] font-bold">Enterprise Suite</p>
      </div>

      <nav className="flex-1 px-4 space-y-1 mt-4 overflow-y-auto">
        {menuItems.filter(item => item.roles.includes(role)).map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-all duration-200 ${
                isActive 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon size={18} />
              <span className="font-semibold text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800 bg-slate-900/50">
        <button 
          onClick={onLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors"
        >
          <LogOut size={20} />
          <span className="font-semibold text-sm">Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;