import React from 'react';
import { SPECIALTIES } from '../constants';
import * as Icons from 'lucide-react';

interface SpecialtyCardsProps {
  onSelectSpecialty: (specialty: string) => void;
}

export const SpecialtyCards: React.FC<SpecialtyCardsProps> = ({ onSelectSpecialty }) => {
  return (
    <div id="specialties" className="bg-white py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
           <div className="max-w-xl">
              <h2 className="text-[10px] font-black text-brand-600 uppercase tracking-[0.3em] mb-4">Popular Specialties</h2>
              <h3 className="text-4xl font-black text-slate-900 tracking-tight">World-Class Care <br/>Across All Disciplines</h3>
           </div>
           <p className="text-slate-400 font-medium max-w-xs text-right hidden md:block">Select a specialty to browse our curated list of verified medical experts near you.</p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {SPECIALTIES.map((specialty) => {
            const IconComponent = (Icons as any)[specialty.icon] || Icons.Activity;
            
            return (
              <button
                key={specialty.id}
                onClick={() => onSelectSpecialty(specialty.name)}
                className="group flex flex-col items-center justify-center p-8 rounded-[40px] bg-slate-50/50 border border-slate-100 hover:bg-white hover:border-brand-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ease-out"
              >
                <div className="h-20 w-20 rounded-[24px] bg-white border border-slate-100 flex items-center justify-center shadow-sm text-brand-500 group-hover:bg-brand-600 group-hover:text-white group-hover:border-brand-600 transition-all duration-500 mb-6">
                  <IconComponent className="h-10 w-10" strokeWidth={1.5} />
                </div>
                <span className="text-sm font-black text-slate-700 group-hover:text-brand-600 text-center tracking-tight transition-colors">
                  {specialty.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};