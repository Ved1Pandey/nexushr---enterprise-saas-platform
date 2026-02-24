import React, { useState } from 'react';
import { 
  Briefcase, Users, RefreshCw, 
  MapPin, Clock, Send, UserCheck, 
  Award, Rocket
} from 'lucide-react';
import { JobOpening, Referral, InternalTransfer } from '../types';

const TalentHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ijp' | 'referral' | 'switch'>('ijp');

  const jobs: JobOpening[] = [
    { id: 'JOB-101', title: 'Senior Product Designer', department: 'Product', location: 'San Francisco / Remote', level: 'L4', type: 'IJP', postedDate: '2 days ago' },
    { id: 'JOB-102', title: 'Lead Fullstack Engineer', department: 'Engineering', location: 'New York', level: 'L5', type: 'IJP', postedDate: '5 days ago' },
    { id: 'JOB-103', title: 'Director of HR Strategy', department: 'HR', location: 'London', level: 'L7', type: 'IJP', postedDate: '1 week ago' },
  ];

  const referrals: Referral[] = [
    { id: 'REF-01', candidateName: 'Jane Smith', position: 'Backend Engineer', status: 'Interviewing', referralBonus: '$2,000' },
    { id: 'REF-02', candidateName: 'Mark Wilson', position: 'UI Designer', status: 'Hired', referralBonus: '$1,500' },
  ];

  const transfers: InternalTransfer[] = [
    { id: 'TR-902', targetRole: 'Senior Solutions Architect', targetDept: 'Sales Engineering', status: 'Pending Approval', requestDate: '2024-05-18' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex bg-white p-1 rounded-2xl border border-slate-100 shadow-sm inline-flex">
        {[
          { id: 'ijp', label: 'Internal Postings', icon: Briefcase },
          { id: 'referral', label: 'Refer a Candidate', icon: Users },
          { id: 'switch', label: 'Internal Switch', icon: RefreshCw },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
              activeTab === tab.id 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <tab.icon size={16} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {activeTab === 'ijp' && (
        <div className="space-y-6 animate-in slide-in-from-left-2 duration-300">
          <div className="bg-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-indigo-100">
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-2">Explore Internal Career Paths</h2>
              <p className="text-indigo-100 max-w-lg mb-6">NexusHR prioritizes internal talent. Check eligibility and accelerate your career growth today.</p>
              <div className="flex items-center space-x-3 text-xs font-bold uppercase tracking-wider">
                <span className="bg-white/20 px-3 py-1 rounded-full">Min. 12 Months in Role</span>
                <span className="bg-white/20 px-3 py-1 rounded-full">Good Standing Status</span>
              </div>
            </div>
            <Briefcase size={180} className="absolute right-[-20px] bottom-[-40px] text-white opacity-10" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <div key={job.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:border-indigo-200 transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded uppercase mb-2 inline-block">
                      {job.department}
                    </span>
                    <h3 className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{job.title}</h3>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400">{job.postedDate}</span>
                </div>
                
                <div className="flex items-center space-x-4 mb-6 text-sm text-slate-500 font-medium">
                  <div className="flex items-center"><MapPin size={14} className="mr-1" /> {job.location}</div>
                  <div className="flex items-center"><UserCheck size={14} className="mr-1" /> Level {job.level}</div>
                </div>

                <div className="flex space-x-3">
                  <button className="flex-1 bg-slate-900 text-white py-2.5 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors">
                    View Details
                  </button>
                  <button className="px-6 py-2.5 bg-indigo-50 text-indigo-600 rounded-xl font-bold text-sm hover:bg-indigo-100 transition-colors">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'referral' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in slide-in-from-left-2 duration-300">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="text-xl font-bold mb-6 flex items-center text-slate-800">
                <Send className="mr-2 text-indigo-600" size={20} /> Submit Referral
              </h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Candidate Name</label>
                    <input type="text" placeholder="Full Name" className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Position</label>
                    <select className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm">
                      <option>Select target role...</option>
                      <option>Backend Engineer</option>
                      <option>Account Manager</option>
                      <option>Marketing Associate</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">LinkedIn URL</label>
                  <input type="text" placeholder="https://linkedin.com/in/..." className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm" />
                </div>
                <button className="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-indigo-200">
                  Refer Candidate
                </button>
              </form>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="text-lg font-bold mb-6 text-slate-800">Track My Referrals</h3>
              <div className="space-y-4">
                {referrals.map((ref) => (
                  <div key={ref.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center font-bold text-indigo-600 border border-slate-100 shadow-sm">
                        {ref.candidateName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{ref.candidateName}</p>
                        <p className="text-xs text-slate-500 font-medium">{ref.position}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        ref.status === 'Hired' ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-100 text-indigo-700'
                      }`}>
                        {ref.status}
                      </span>
                      <p className="text-[10px] text-slate-400 mt-1 font-bold italic">Bonus: {ref.referralBonus}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl">
              <h4 className="font-bold mb-4">Program Rules</h4>
              <ul className="space-y-4">
                {[
                  { step: '1', text: 'Submit candidate details via this portal' },
                  { step: '2', text: 'HR performs initial interview screening' },
                  { step: '3', text: 'Bonus is credited post-probation' },
                ].map((s) => (
                  <li key={s.step} className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-white/10 rounded-full flex items-center justify-center text-xs font-bold">{s.step}</span>
                    <p className="text-xs text-slate-400 leading-relaxed font-medium">{s.text}</p>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm text-center">
              <Award className="mx-auto text-amber-500 mb-3" size={32} />
              <h4 className="font-bold text-slate-800">Top Referrer</h4>
              <p className="text-xs text-slate-500 mb-4 font-medium">Earn additional credits!</p>
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-100">
                <p className="text-xs font-bold text-amber-700">Sarah Jenkins</p>
                <p className="text-[10px] text-amber-600 font-bold">12 Successful Hires</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'switch' && (
        <div className="max-w-2xl mx-auto space-y-6 animate-in slide-in-from-left-2 duration-300">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <RefreshCw size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-800">Internal Switch Request</h3>
              <p className="text-sm text-slate-500 mt-1">Ready for a new challenge? Formalize your movement request.</p>
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Target Dept.</label>
                  <select className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm outline-none">
                    <option>Product Management</option>
                    <option>Global Design</option>
                    <option>Business Operations</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Target Role</label>
                  <input type="text" placeholder="Desired Designation" className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Career Objectives</label>
                <textarea rows={4} placeholder="Why is this movement beneficial for you?" className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-500/20 outline-none" />
              </div>

              <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 flex items-start space-x-3">
                <Clock className="text-amber-600 mt-0.5" size={16} />
                <p className="text-[10px] text-amber-700 font-bold uppercase leading-relaxed">
                  Notice: All transfers require approval from current and target business leaders.
                </p>
              </div>

              <button className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold shadow-xl hover:bg-slate-800 transition-all">
                Submit Switch Request
              </button>
            </form>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h4 className="font-bold text-slate-800 mb-4">Past Movement History</h4>
            {transfers.map((t) => (
              <div key={t.id} className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl group">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-purple-500 transition-colors">
                    <Rocket size={18} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{t.targetRole}</p>
                    <p className="text-xs text-slate-500 font-medium">{t.targetDept} • {t.requestDate}</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-amber-100 text-amber-700 text-[10px] font-bold rounded-full uppercase tracking-wider">
                  {t.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TalentHub;