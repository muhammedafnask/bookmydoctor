import React from 'react';
import { Clock, ArrowRight, HeartPulse, ShieldAlert, Sparkles } from 'lucide-react';

export const HealthArticles: React.FC = () => {
  const articles = [
    {
      title: '5 Tips for Better Heart Health in 2025',
      category: 'Cardiology',
      date: 'May 12, 2025',
      icon: HeartPulse,
      color: 'bg-rose-50 text-rose-500'
    },
    {
      title: 'Common Myths About Dental Hygiene',
      category: 'Dental Care',
      date: 'May 10, 2025',
      icon: Sparkles,
      color: 'bg-cyan-50 text-cyan-500'
    },
    {
      title: 'Protecting Your Skin During Summer',
      category: 'Dermatology',
      date: 'May 08, 2025',
      icon: ShieldAlert,
      color: 'bg-orange-50 text-orange-500'
    }
  ];

  return (
    <div className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="text-center mb-16">
          <h2 className="text-[10px] font-black text-brand-600 uppercase tracking-[0.3em] mb-4">Health Insights</h2>
          <h3 className="text-4xl font-black text-slate-900 tracking-tight">Stay Informed, Stay Healthy</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {articles.map((article, i) => (
            <div key={i} className="group cursor-pointer">
              {/* Simplified fast-loading "image" placeholder using Icons */}
              <div className={`h-64 rounded-[40px] flex items-center justify-center mb-8 shadow-sm group-hover:shadow-xl transition-all duration-500 ${article.color}`}>
                <article.icon className="w-24 h-24 stroke-[1.5]" />
              </div>
              
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-brand-50 text-brand-600 px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest">
                  {article.category}
                </span>
                <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold">
                  <Clock className="w-3.5 h-3.5" />
                  {article.date}
                </div>
              </div>
              <h4 className="text-2xl font-black text-slate-900 group-hover:text-brand-600 transition-colors mb-4 leading-tight">
                {article.title}
              </h4>
              <div className="flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-widest group-hover:text-brand-600 group-hover:gap-3 transition-all">
                Read Article <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};