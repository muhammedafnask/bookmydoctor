import React, { useState } from 'react';
import { Search, MapPin, Video, Building2 } from 'lucide-react';
import { Button } from './Button';
import { LOCATIONS } from '../constants';
import { FilterState } from '../types';

interface HeroProps {
  onSearch: (filters: FilterState) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  const [location, setLocation] = useState('');
  const [query, setQuery] = useState('');
  const [searchMode, setSearchMode] = useState<'in-person' | 'online'>('in-person');

  const handleManualSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ location, query, specialty: '' });
  };

  return (
    <div className="relative bg-slate-50">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1638202993928-7267aad84c31?q=80&w=1920&auto=format&fit=crop" 
          alt="Medical background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/90 backdrop-blur-[1px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 text-center">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl md:text-6xl mb-6">
          Find and book the <span className="text-blue-600">best doctors</span>
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-slate-600 mb-10">
          Thousands of verified healthcare professionals ready to help you
        </p>

        {/* Search Card Container */}
        <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
          
          {/* Tabs */}
          <div className="flex p-2 gap-2 bg-slate-50/50">
            <button
              onClick={() => setSearchMode('in-person')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all duration-200 ${
                searchMode === 'in-person' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              <Building2 className="w-5 h-5" />
              In-Person
            </button>
            <button
              onClick={() => setSearchMode('online')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all duration-200 ${
                searchMode === 'online' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              <Video className="w-5 h-5" />
              Online
            </button>
          </div>

          <div className="p-6">
            <form onSubmit={handleManualSearch} className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search Input */}
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-11 pr-4 py-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 placeholder:text-slate-400 transition-shadow"
                    placeholder="Specialty, doctor, or condition"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>

                {/* Location Input */}
                <div className="flex-1 relative">
                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-slate-400" />
                  </div>
                  <select
                    className="block w-full pl-11 pr-4 py-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 appearance-none cursor-pointer"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  >
                    <option value="">City or postal code</option>
                    {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                  </select>
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full py-4 text-lg font-bold shadow-blue-200 shadow-lg mt-2">
                Search Doctors
              </Button>
            </form>
          </div>
        </div>

        {/* Footer Features Text */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-slate-600 font-medium">
          <span className="flex items-center gap-2 bg-white/50 px-3 py-1 rounded-full backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            Free booking
          </span>
          <span className="flex items-center gap-2 bg-white/50 px-3 py-1 rounded-full backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            Instant confirmation
          </span>
          <span className="flex items-center gap-2 bg-white/50 px-3 py-1 rounded-full backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            Real patient reviews
          </span>
        </div>
      </div>
    </div>
  );
};