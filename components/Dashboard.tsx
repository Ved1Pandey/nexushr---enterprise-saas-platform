import React, { useState, useEffect } from 'react';
import {
  Clock,
  Calendar as CalendarIcon,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

interface Employee {
  id: number;
  name: string;
  role: string;
  status: string;
}

interface DashboardProps {
  employees: Employee[];
}

const Dashboard: React.FC<DashboardProps> = ({ employees }) => {
  const [timer, setTimer] = useState(0);
  const [isRunning] = useState(true);

  useEffect(() => {
    let interval: any;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer((t) => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m
      .toString()
      .padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const data = [
    { name: 'Mon', hrs: 8.5 },
    { name: 'Tue', hrs: 9.0 },
    { name: 'Wed', hrs: 8.2 },
    { name: 'Thu', hrs: 7.8 },
    { name: 'Fri', hrs: 8.4 },
    { name: 'Sat', hrs: 0 },
    { name: 'Sun', hrs: 0 },
  ];

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<Clock size={24} />}
          title="Time Today"
          value={formatTime(timer + 28800)}
          color="blue"
        />
        <StatCard
          icon={<CheckCircle2 size={24} />}
          title="Attendance"
          value="Present"
          color="emerald"
        />
        <StatCard
          icon={<AlertCircle size={24} />}
          title="Leave Bal."
          value="14.5 Days"
          color="amber"
        />
        <StatCard
          icon={<TrendingUp size={24} />}
          title="Team Status"
          value="92% Active"
          color="purple"
        />
      </div>

      {/* Charts + Biometrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold mb-6 text-slate-800">
            Weekly Working Hours
          </h3>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="hrs" radius={[4, 4, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.hrs > 8 ? '#2563eb' : '#94a3b8'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Live Biometrics */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold mb-4">Live Biometrics</h3>

          <button className="w-full mt-2 py-3 bg-slate-900 text-white rounded-xl font-bold">
            Request Manual Override
          </button>
        </div>
      </div>

      {/* Employees List */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-lg font-bold mb-4">Employees</h2>

        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2">ID</th>
                <th className="py-2">Name</th>
                <th className="py-2">Role</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {employees?.map((emp) => (
                <tr key={emp.id} className="border-b">
                  <td className="py-2">{emp.id}</td>
                  <td className="py-2">{emp.name}</td>
                  <td className="py-2">{emp.role}</td>
                  <td className="py-2">{emp.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/* Small reusable stat card */
const StatCard = ({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  color: string;
}) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center space-x-4">
    <div className="bg-slate-100 p-3 rounded-xl">{icon}</div>
    <div>
      <p className="text-sm text-slate-500 font-medium">{title}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
    </div>
  </div>
);

export default Dashboard;
