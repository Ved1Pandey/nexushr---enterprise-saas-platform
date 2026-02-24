
import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, Laptop, Plus } from 'lucide-react';

const LeaveManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'apply' | 'history'>('apply');

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex space-x-4 border-b border-slate-200">
        <button 
          onClick={() => setActiveTab('apply')}
          className={`pb-4 px-4 font-bold text-sm transition-colors relative ${activeTab === 'apply' ? 'text-blue-600' : 'text-slate-500'}`}
        >
          Apply Request
          {activeTab === 'apply' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-full" />}
        </button>
        <button 
          onClick={() => setActiveTab('history')}
          className={`pb-4 px-4 font-bold text-sm transition-colors relative ${activeTab === 'history' ? 'text-blue-600' : 'text-slate-500'}`}
        >
          My History
          {activeTab === 'history' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-full" />}
        </button>
      </div>

      {activeTab === 'apply' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
            <h3 className="font-bold text-lg">New Request</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Request Type</label>
                <select className="w-full bg-slate-50 border border-slate-100 rounded-lg p-3 text-slate-700 font-medium focus:ring-2 focus:ring-blue-500/20 outline-none">
                  <option>Vacation / Planned Leave</option>
                  <option>Sick / Unplanned Leave</option>
                  <option>Work From Home (WFH)</option>
                  <option>Outdoor Duty</option>
                  <option>Outstation / Business Trip</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">From</label>
                  <input type="date" className="w-full bg-slate-50 border border-slate-100 rounded-lg p-3 text-slate-700" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">To</label>
                  <input type="date" className="w-full bg-slate-50 border border-slate-100 rounded-lg p-3 text-slate-700" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Reason</label>
                <textarea rows={3} placeholder="Explain briefly..." className="w-full bg-slate-50 border border-slate-100 rounded-lg p-3 text-slate-700" />
              </div>
              <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                Submit for Approval
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
              <h4 className="font-bold text-emerald-800 mb-2">Leave Summary</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/50 p-3 rounded-xl">
                  <p className="text-[10px] uppercase font-bold text-emerald-600">Entitled</p>
                  <p className="text-xl font-bold text-emerald-900">22.0</p>
                </div>
                <div className="bg-white/50 p-3 rounded-xl">
                  <p className="text-[10px] uppercase font-bold text-emerald-600">Balance</p>
                  <p className="text-xl font-bold text-emerald-900">14.5</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <h4 className="font-bold mb-4">Quick Shortcuts</h4>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex flex-col items-center p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                  <Laptop className="text-blue-600 mb-2" size={20} />
                  <span className="text-xs font-bold text-slate-700">WFH Day</span>
                </button>
                <button className="flex flex-col items-center p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                  <MapPin className="text-purple-600 mb-2" size={20} />
                  <span className="text-xs font-bold text-slate-700">Outdoor</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="p-4 font-bold text-xs uppercase text-slate-500">Dates</th>
                <th className="p-4 font-bold text-xs uppercase text-slate-500">Type</th>
                <th className="p-4 font-bold text-xs uppercase text-slate-500">Status</th>
                <th className="p-4 font-bold text-xs uppercase text-slate-500">Manager</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { range: 'May 10 - May 12', type: 'Vacation', status: 'Approved', mgr: 'Sarah Chen' },
                { range: 'Apr 02', type: 'WFH', status: 'Approved', mgr: 'Sarah Chen' },
                { range: 'Jun 15 - Jun 20', type: 'Personal', status: 'Pending', mgr: 'Sarah Chen' },
              ].map((req, i) => (
                <tr key={i} className="hover:bg-slate-50/50">
                  <td className="p-4 font-semibold text-slate-700 text-sm">{req.range}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded">{req.type}</span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                      req.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-slate-500">{req.mgr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LeaveManagement;
