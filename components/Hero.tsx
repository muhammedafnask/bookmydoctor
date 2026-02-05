import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, CheckCircle2, ChevronDown, Activity, Users, Star, Briefcase } from 'lucide-react';
import { Button } from './Button';
import { LOCATIONS, SPECIALTIES } from '../constants';
import { FilterState } from '../types';

interface HeroProps {
  onSearch: (filters: FilterState) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  const [location, setLocation] = useState('');
  const [query, setQuery] = useState('');
  const [availability, setAvailability] = useState<'any' | 'today'>('any');
  const [isLocating, setIsLocating] = useState(false);
  const [showSpecialties, setShowSpecialties] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowSpecialties(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const requestLocationAndProceed = (selectedSpecialty: string = '') => {
    if ("geolocation" in navigator) {
      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setIsLocating(false);
          onSearch({ location, query, specialty: selectedSpecialty, availability });
        },
        (error) => {
          setIsLocating(false);
          // Proceed anyway even if denied
          onSearch({ location, query, specialty: selectedSpecialty, availability });
        },
        { timeout: 5000 }
      );
    } else {
      onSearch({ location, query, specialty: selectedSpecialty, availability });
    }
  };

  const handleManualSearch = (e: React.FormEvent) => {
    e.preventDefault();
    requestLocationAndProceed();
  };

  const handleSelectSpecialty = (specName: string) => {
    setQuery(specName);
    setShowSpecialties(false);
    requestLocationAndProceed(specName);
  };

  return (
    <div className="relative bg-white pt-12 pb-24 lg:pt-20 lg:pb-32 overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[600px] h-[600px] bg-brand-50 rounded-full blur-[120px] opacity-60 z-0"></div>
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-brand-50 rounded-full blur-[120px] opacity-40 z-0"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-3 bg-white text-brand-700 px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest mb-8 animate-fade-in shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-50">
            <Activity className="w-4 h-4 text-brand-500" />
            <span>Trusted Healthcare Marketplace</span>
          </div>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-slate-900 tracking-tighter leading-[0.95] mb-8">
            Book My Doctor <br/><span className="text-brand-600">Feel Better, Faster.</span>
          </h1>
          <p className="text-xl sm:text-2xl text-slate-500 font-medium leading-relaxed mb-12 max-w-2xl mx-auto">
            Find the right doctor quickly and book with ease. <br/>Get instant SMS and WhatsApp confirmations.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-16">
             <div className="flex items-center gap-2 text-sm font-bold text-slate-600 bg-slate-50 px-4 py-2 rounded-2xl">
                <Users className="w-4 h-4 text-brand-500" /> 50,000+ Verified Doctors
             </div>
             <div className="flex items-center gap-2 text-sm font-bold text-slate-600 bg-slate-50 px-4 py-2 rounded-2xl">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" /> 4.9/5 Rating
             </div>
          </div>
        </div>

        {/* Search Container */}
        <div className="max-w-6xl mx-auto" ref={dropdownRef}>
          <div className="bg-white rounded-[40px] shadow-[0_32px_80px_-20px_rgba(13,148,136,0.15)] border border-slate-100 p-4 lg:p-6 transition-all hover:shadow-[0_32px_80px_-10px_rgba(13,148,136,0.2)]">
            <form onSubmit={handleManualSearch} className="flex flex-col gap-5">
              
              {/* Main Search Input */}
              <div className="relative group flex-grow">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                  <Search className="h-6 w-6 text-slate-300 group-focus-within:text-brand-600 transition-colors" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-16 pr-6 py-6 bg-slate-50 border-none rounded-[28px] focus:ring-4 focus:ring-brand-100 text-slate-900 placeholder:text-slate-400 font-black text-xl h-20 transition-all outline-none"
                  placeholder="Search by doctor or specialty"
                  value={query}
                  autoComplete="off"
                  onFocus={() => setShowSpecialties(true)}
                  onChange={(e) => setQuery(e.target.value)}
                />

                {/* Specialty Dropdown */}
                {showSpecialties && (
                  <div className="absolute top-full left-0 w-full mt-4 bg-white rounded-[32px] shadow-2xl border border-slate-100 overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="max-h-[400px] overflow-y-auto">
                      {SPECIALTIES.filter(s => s.name.toLowerCase().includes(query.toLowerCase())).map((spec) => (
                        <button
                          key={spec.id}
                          type="button"
                          onClick={() => handleSelectSpecialty(spec.name)}
                          className="w-full flex items-center justify-between px-8 py-5 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-none group"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-brand-50 rounded-full flex items-center justify-center text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-all">
                              <Briefcase className="w-5 h-5" />
                            </div>
                            <span className="text-lg font-bold text-slate-700 group-hover:text-slate-900">{spec.name}</span>
                          </div>
                          <span className="text-xs font-black text-slate-300 uppercase tracking-widest">Specialty</span>
                        </button>
                      ))}
                      {SPECIALTIES.filter(s => s.name.toLowerCase().includes(query.toLowerCase())).length === 0 && (
                        <div className="p-8 text-center text-slate-400 font-bold">No specialties matching your search</div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Filters & Action */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                
                {/* City Select */}
                <div className="relative group h-16">
                  <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-slate-300" />
                  </div>
                  <select
                    className="block w-full h-full pl-14 pr-10 bg-slate-50 border-none rounded-[24px] focus:ring-4 focus:ring-brand-100 text-slate-700 appearance-none cursor-pointer font-bold text-sm outline-none"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  >
                    <option value="">Select City</option>
                    {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                  </select>
                  <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                </div>

                {/* Availability Toggle */}
                <div 
                  className="relative flex items-center justify-between bg-slate-50 rounded-[24px] px-6 h-16 cursor-pointer hover:bg-slate-100 transition-colors" 
                  onClick={() => setAvailability(availability === 'any' ? 'today' : 'any')}
                >
                  <span className="text-sm font-black text-slate-600">Available Today</span>
                  <div className={`w-12 h-7 rounded-full transition-all flex items-center p-1 ${availability === 'today' ? 'bg-brand-600 shadow-lg shadow-brand-200' : 'bg-slate-200'}`}>
                    <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${availability === 'today' ? 'translate-x-5' : 'translate-x-0'}`}></div>
                  </div>
                </div>

                {/* CTA Button */}
                <Button 
                  type="submit" 
                  size="lg" 
                  disabled={isLocating}
                  className="h-16 text-lg font-black tracking-wider bg-brand-600 hover:bg-brand-700 shadow-2xl shadow-brand-200 transition-all rounded-[24px] hover:-translate-y-1 active:scale-[0.98] disabled:opacity-70"
                >
                  {isLocating ? 'LOCATING...' : 'FIND DOCTOR'}
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Benefits text */}
        <div className="mt-20 flex flex-wrap justify-center gap-10">
          {[
            { label: "SMS/WhatsApp Confirm", icon: Activity },
            { label: "100% Verified Profiles", icon: Star },
            { label: "No Booking Fees", icon: CheckCircle2 }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 text-slate-400 font-black text-[10px] uppercase tracking-[0.2em]">
               <item.icon className="w-5 h-5 text-brand-500" />
               {item.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};