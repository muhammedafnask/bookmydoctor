import React from 'react';
import { SPECIALTIES } from '../constants';
import * as Icons from 'lucide-react';

interface SpecialtyCardsProps {
  onSelectSpecialty: (specialty: string) => void;
}

export const SpecialtyCards: React.FC<SpecialtyCardsProps> = ({ onSelectSpecialty }) => {
  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">Clinical Excellence</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {SPECIALTIES.map((specialty) => {
            const IconComponent = (Icons as any)[specialty.icon] || Icons.Activity;
            
            return (
              <button
                key={specialty.id}
                onClick={() => onSelectSpecialty(specialty.name)}
                className="group flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:border-blue-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="h-16 w-16 rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-sm text-blue-500 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-colors mb-4">
                  <IconComponent className="h-8 w-8" strokeWidth={1.5} />
                </div>
                <span className="text-sm font-semibold text-slate-700 group-hover:text-blue-600 text-center">
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