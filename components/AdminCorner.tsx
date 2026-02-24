
import React, { useState } from 'react';
import { 
  ShieldAlert, FileCode, Copy, Check, ExternalLink, 
  MonitorCheck, Package, Zap, Play, FolderSearch,
  MousePointer2, Command, ArrowRight
} from 'lucide-react';

const AdminCorner: React.FC = () => {
  const [copiedFile, setCopiedFile] = useState<string | null>(null);

  const copyToClipboard = (text: string, fileName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFile(fileName);
    setTimeout(() => setCopiedFile(null), 2000);
  };

  const packageJson = `{
  "name": "nexus-hr-backend",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1"
  }
}`;

  const serverJs = `const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors()); 
app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>Nexus HR Server is Running!</h1>');
});

app.get('/api/status', (req, res) => {
  res.json({ status: "Online", version: "1.0.0" });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log('🚀 SERVER STARTED ON PORT ' + PORT);
});`;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex justify-between items-end border-b border-slate-100 pb-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">SaaS Deployment Fixer</h2>
          <p className="text-slate-500 font-medium">Solving the "Path Not Found" error for you.</p>
        </div>
      </div>

      {/* Path Troubleshooting Section */}
      <div className="bg-rose-50 border border-rose-100 rounded-[2.5rem] p-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-rose-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-rose-200">
            <ShieldAlert size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-rose-900">Path Specified Error? (Fix here)</h3>
            <p className="text-sm text-rose-700">Agar "The system cannot find the path" likha aa raha hai, toh ye try karein:</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-rose-100">
            <div className="flex items-center space-x-2 mb-3">
              <span className="bg-rose-100 text-rose-600 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">1</span>
              <h4 className="font-bold text-slate-800 text-sm">Magic Shortcut</h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Apne folder `nexus-backend` ko kholiye. Sabse upar bar mein jahan rasta likha hota hai, wahan click karke sab mita dein aur **cmd** likhkar Enter dabayein.
            </p>
            <div className="bg-slate-100 p-2 rounded-lg flex items-center justify-center border border-slate-200">
               <img src="https://img.icons8.com/color/48/address-box.png" className="w-6 h-6 mr-2 opacity-50" />
               <span className="text-[10px] font-mono font-bold text-slate-400">Type 'cmd' in Address Bar</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-rose-100">
            <div className="flex items-center space-x-2 mb-3">
              <span className="bg-rose-100 text-rose-600 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">2</span>
              <h4 className="font-bold text-slate-800 text-sm">OneDrive Path</h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Agar aapka Desktop OneDrive par hai, toh CMD mein ye type karein:
            </p>
            <div className="bg-slate-900 p-3 rounded-xl font-mono text-[10px] text-indigo-300">
              cd OneDrive\Desktop\nexus-backend
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Terminal Simulation */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-800">
             <div className="bg-slate-800/50 px-6 py-3 border-b border-slate-700 flex items-center justify-between">
                <div className="flex space-x-2">
                   <div className="w-2.5 h-2.5 bg-rose-500 rounded-full" />
                   <div className="w-2.5 h-2.5 bg-amber-500 rounded-full" />
                   <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
                </div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center">
                  <Command size={12} className="mr-2" /> Correct CMD View
                </span>
             </div>
             <div className="p-8 font-mono text-sm leading-relaxed">
                <div className="mb-6">
                   <p className="text-slate-500 mb-1"># Once inside the folder (After 'cd' success)</p>
                   <p className="text-white">C:\...nexus-backend&gt; <span className="text-indigo-400">npm install</span></p>
                   <p className="text-slate-400 text-xs mt-1 italic">...wait for it to finish...</p>
                </div>
                <div>
                   <p className="text-slate-500 mb-1"># Then start engine</p>
                   <p className="text-white">C:\...nexus-backend&gt; <span className="text-indigo-400">node server.js</span></p>
                </div>
                <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                   <p className="text-emerald-400 font-bold flex items-center">
                     <Zap size={14} className="mr-2" /> 🚀 SERVER STARTED ON PORT 3001
                   </p>
                </div>
             </div>
          </div>
        </div>

        {/* Code Verification */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
             <h3 className="font-bold text-slate-800 mb-6 flex items-center">
                <FileCode className="mr-2 text-blue-600" /> Verify Your Code
             </h3>
             <div className="space-y-3">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 group cursor-pointer" onClick={() => copyToClipboard(serverJs, 'server')}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">server.js</span>
                    {copiedFile === 'server' ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} className="text-slate-300" />}
                  </div>
                  <div className="text-[10px] font-mono text-slate-600 truncate">const express = require('express')...</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 group cursor-pointer" onClick={() => copyToClipboard(packageJson, 'package')}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">package.json</span>
                    {copiedFile === 'package' ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} className="text-slate-300" />}
                  </div>
                  <div className="text-[10px] font-mono text-slate-600 truncate">"dependencies": &#123; "express"...</div>
                </div>
             </div>
          </div>

          <div className="bg-indigo-600 p-8 rounded-[2rem] text-white shadow-xl group">
             <h4 className="font-bold mb-4 flex items-center">
                <MonitorCheck className="mr-2" size={20} /> Final Test
             </h4>
             <p className="text-xs text-indigo-100 mb-6 leading-relaxed">Server start hone ke baad, Chrome mein ye link kholiye verification ke liye.</p>
             <a 
               href="http://localhost:3001/api/status" 
               target="_blank" 
               className="flex items-center justify-between p-4 bg-white text-indigo-600 rounded-2xl font-bold hover:bg-indigo-50 transition-all"
             >
               <span>Check API</span>
               <ArrowRight size={18} />
             </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCorner;
