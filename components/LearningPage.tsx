
import React from 'react';
import { PlayCircle, Clock, Award, ChevronRight } from 'lucide-react';
import { COURSES } from '../constants';

const LearningPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4 text-white">Unlock Your Potential</h2>
          <p className="text-indigo-100 mb-6">Explore over 500+ premium courses across leadership, technology, and personal productivity curated for your growth at Nexus.</p>
          <div className="flex space-x-4">
            <button className="bg-white text-indigo-600 px-6 py-2 rounded-xl font-bold hover:bg-indigo-50 transition-colors">Browse Catalog</button>
            <button className="bg-indigo-500/30 backdrop-blur-sm border border-indigo-400/30 text-white px-6 py-2 rounded-xl font-bold hover:bg-indigo-500/40 transition-colors">My Transcript</button>
          </div>
        </div>
        <div className="absolute top-[-20%] right-[-10%] opacity-20 pointer-events-none">
          <Award size={300} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {COURSES.map((course) => (
          <div key={course.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col group">
            <div className="h-40 bg-slate-100 relative overflow-hidden">
              <img src={`https://picsum.photos/seed/${course.id}/400/200`} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <PlayCircle className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={48} />
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded uppercase">{course.provider}</span>
                <span className="flex items-center text-xs text-slate-400">
                  <Clock size={12} className="mr-1" /> {course.duration}
                </span>
              </div>
              <h3 className="font-bold text-slate-800 mb-4">{course.title}</h3>
              
              <div className="mt-auto pt-4 border-t border-slate-50">
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-slate-500">{course.status}</span>
                  <span className="text-indigo-600">{course.progress}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-full transition-all" style={{ width: `${course.progress}%` }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningPage;
