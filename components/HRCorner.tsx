
import React from 'react';
import { FileText, Download, ExternalLink, ShieldCheck, UserPlus, UserMinus } from 'lucide-react';

const HRCorner: React.FC = () => {
  const docs = [
    { title: 'Payslip - April 2024', category: 'Payment', date: '2024-04-30', size: '2.4 MB' },
    { title: 'Taxation Declaration 23-24', category: 'Compliance', date: '2024-03-15', size: '1.1 MB' },
    { title: 'Investment Proofs', category: 'Tax', date: '2024-02-10', size: '5.8 MB' },
    { title: 'Employment Contract', category: 'Legal', date: '2023-08-01', size: '1.4 MB' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-xl font-bold mb-6 flex items-center">
            <FileText className="mr-2 text-blue-600" /> My Document Vault
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="pb-4 font-semibold text-slate-500 text-sm">Document Name</th>
                  <th className="pb-4 font-semibold text-slate-500 text-sm">Category</th>
                  <th className="pb-4 font-semibold text-slate-500 text-sm">Date</th>
                  <th className="pb-4 font-semibold text-slate-500 text-sm text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {docs.map((doc, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors group">
                    <td className="py-4 font-medium text-slate-700">{doc.title}</td>
                    <td className="py-4">
                      <span className="px-2 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded uppercase">
                        {doc.category}
                      </span>
                    </td>
                    <td className="py-4 text-slate-500 text-sm">{doc.date}</td>
                    <td className="py-4 text-right">
                      <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                        <Download size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-blue-600 rounded-2xl p-8 text-white relative overflow-hidden shadow-xl shadow-blue-200">
          <div className="relative z-10">
            <h4 className="text-2xl font-bold mb-2">Need HR assistance?</h4>
            <p className="text-blue-100 mb-6 max-w-md">Our AI-powered assistant can help you understand your taxation documents or company policies in seconds.</p>
            <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-bold hover:bg-blue-50 transition-colors">
              Chat with HR Bot
            </button>
          </div>
          <div className="absolute top-[-20%] right-[-10%] opacity-10">
            <FileText size={200} />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors group">
              <div className="flex items-center">
                <div className="bg-emerald-50 text-emerald-600 p-2 rounded-lg mr-3 group-hover:bg-emerald-100">
                  <UserPlus size={18} />
                </div>
                <span className="font-semibold text-slate-700">Joining Docs</span>
              </div>
              <ExternalLink size={16} className="text-slate-400" />
            </button>
            <button className="w-full flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors group">
              <div className="flex items-center">
                <div className="bg-red-50 text-red-600 p-2 rounded-lg mr-3 group-hover:bg-red-100">
                  <UserMinus size={18} />
                </div>
                <span className="font-semibold text-slate-700">Separation Desk</span>
              </div>
              <ExternalLink size={16} className="text-slate-400" />
            </button>
            <button className="w-full flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors group">
              <div className="flex items-center">
                <div className="bg-purple-50 text-purple-600 p-2 rounded-lg mr-3 group-hover:bg-purple-100">
                  <ShieldCheck size={18} />
                </div>
                <span className="font-semibold text-slate-700">Compliance Check</span>
              </div>
              <ExternalLink size={16} className="text-slate-400" />
            </button>
          </div>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 text-white">
          <h4 className="font-bold mb-2">Policy Updates</h4>
          <p className="text-xs text-slate-400 mb-4">Effective from May 1st, 2024</p>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5" />
              <span>WFH extended to 3 days/week</span>
            </li>
            <li className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5" />
              <span>New medical insurance portal live</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HRCorner;
