
import React, { useState } from 'react';
import { Plus, Tag, Clock, User, MessageCircle } from 'lucide-react';
import { MOCK_TICKETS } from '../constants';

const Ticketing: React.FC = () => {
  const [showNew, setShowNew] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Support Desk</h2>
          <p className="text-sm text-slate-500">Report issues regarding infrastructure, IT, or facilities.</p>
        </div>
        <button 
          onClick={() => setShowNew(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold flex items-center space-x-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
        >
          <Plus size={18} />
          <span>New Ticket</span>
        </button>
      </div>

      {showNew && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-8 animate-in fade-in zoom-in duration-200">
            <h3 className="text-xl font-bold mb-6">Raise a Complaint</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Department</label>
                <select className="w-full bg-slate-50 border border-slate-100 rounded-lg p-3">
                  <option>IT (Computer, Network, Software)</option>
                  <option>Facilities (Water, Cleanliness, Lighting)</option>
                  <option>HR (Policies, Payroll, Benefits)</option>
                  <option>Admin (Stationery, ID, Visiting Cards)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Subject</label>
                <input type="text" placeholder="Short description of the problem" className="w-full bg-slate-50 border border-slate-100 rounded-lg p-3" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Detailed Message</label>
                <textarea rows={4} className="w-full bg-slate-50 border border-slate-100 rounded-lg p-3" />
              </div>
              <div className="flex space-x-3 pt-2">
                <button type="submit" className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold">Submit Ticket</button>
                <button type="button" onClick={() => setShowNew(false)} className="px-6 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {MOCK_TICKETS.map((ticket) => (
          <div key={ticket.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:border-blue-200 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded uppercase">
                {ticket.id}
              </span>
              <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                ticket.status === 'Open' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
              }`}>
                {ticket.status}
              </span>
            </div>
            <h4 className="font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">{ticket.subject}</h4>
            <p className="text-sm text-slate-500 mb-4 line-clamp-2">{ticket.description}</p>
            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
              <div className="flex items-center text-xs text-slate-400">
                <Tag size={14} className="mr-1" />
                {ticket.category}
              </div>
              <div className="flex items-center text-xs text-slate-400">
                <User size={14} className="mr-1" />
                {ticket.assignedTo}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ticketing;
