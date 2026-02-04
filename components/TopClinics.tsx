import React from 'react';
import { Building2, Star, MapPin, ChevronRight } from 'lucide-react';

export const TopClinics: React.FC = () => {
  const clinics = [
    { name: 'Aster Medcity', location: 'Kochi', rating: 4.9, image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=400&auto=format&fit=crop' },
    { name: 'Starlight Dental', location: 'Calicut', rating: 4.8, image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=400&auto=format&fit=crop' },
    { name: 'DermaCare Hospital', location: 'Thrissur', rating: 4.7, image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=400&auto=format&fit=crop' },
    { name: 'Family Wellness', location: 'Kannur', rating: 4.9, image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=400&auto=format&fit=crop' },
  ];

  return (
    <div id="clinics" className="bg-slate-50 py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-[10px] font-black text-brand-600 uppercase tracking-[0.3em] mb-4">Partner Clinics</h2>
            <h3 className="text-4xl font-black text-slate-900 tracking-tight">Top Rated Healthcare Facilities</h3>
          </div>
          <button className="flex items-center gap-2 text-brand-600 font-black text-xs uppercase tracking-widest hover:gap-3 transition-all">
            View All Clinics <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {clinics.map((clinic, i) => (
            <div key={i} className="group bg-white rounded-[40px] overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="h-48 overflow-hidden relative">
                <img src={clinic.image} alt={clinic.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-2xl flex items-center gap-1.5 shadow-sm">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span className="text-xs font-black text-slate-900">{clinic.rating}</span>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 text-[10px] font-black text-brand-600 uppercase tracking-widest mb-2">
                  <Building2 className="w-3.5 h-3.5" /> Clinic
                </div>
                <h4 className="text-xl font-black text-slate-900 mb-4">{clinic.name}</h4>
                <div className="flex items-center gap-2 text-slate-400 text-sm font-bold">
                  <MapPin className="w-4 h-4" />
                  {clinic.location}, India
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};