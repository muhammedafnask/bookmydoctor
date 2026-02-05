import React from 'react';
import { Doctor } from '../types';
import { Star, MapPin, ThumbsUp, ShieldCheck, Globe, Users, Search, Building2, Clock, ChevronRight } from 'lucide-react';
import { Button } from './Button';

interface DoctorListProps {
  doctors: Doctor[];
  onBook: (doctor: Doctor) => void;
}

export const DoctorList: React.FC<DoctorListProps> = ({ doctors, onBook }) => {
  if (doctors.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 bg-slate-50/50 rounded-[48px] border-4 border-dashed border-slate-100">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-xl shadow-slate-200/50">
           <Search className="w-10 h-10 text-slate-200" />
        </div>
        <h3 className="text-3xl font-black text-slate-900 tracking-tight">No specialists found</h3>
        <p className="text-slate-400 mt-2 font-bold max-w-xs text-center">Try adjusting your filters or search criteria for more results.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {doctors.map((doctor) => (
        <div key={doctor.id} className="group bg-white rounded-[40px] border border-slate-100 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_32px_60px_-15px_rgba(13,148,136,0.1)] transition-all duration-500 flex flex-col md:flex-row gap-8 relative overflow-hidden">
          
          {/* Left Column: Media & Trust */}
          <div className="flex-shrink-0 flex flex-col items-center">
            <div className="relative mb-6">
              <img 
                src={doctor.image} 
                alt={doctor.name} 
                className="h-40 w-40 rounded-[32px] object-cover border-4 border-white shadow-xl group-hover:scale-105 transition-transform duration-700"
              />
              {doctor.isVerified && (
                <div className="absolute -bottom-2 -right-2 bg-brand-600 p-2 rounded-2xl border-4 border-white shadow-xl text-white">
                   <ShieldCheck className="w-5 h-5" />
                </div>
              )}
            </div>
            
            <div className="flex flex-col gap-2 w-full max-w-[160px]">
               <div className="flex items-center justify-center gap-2 bg-[#f0fdfa] text-brand-700 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-brand-100">
                  <ThumbsUp className="w-3 h-3" />
                  <span>98% Patient Approval</span>
               </div>
               <div className="flex items-center justify-center gap-2 bg-[#f8fafc] text-slate-400 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-slate-100">
                  <Users className="w-3 h-3" />
                  <span>{doctor.totalBookings}+ Booked</span>
               </div>
            </div>
          </div>

          {/* Main Info Column */}
          <div className="flex-1 flex flex-col">
            <div className="flex flex-col xl:flex-row justify-between items-start gap-4 mb-6">
              <div className="space-y-3">
                <div>
                  <h3 className="text-3xl font-black text-slate-900 group-hover:text-brand-700 transition-colors leading-tight mb-1">
                    {doctor.name}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3 py-1 bg-brand-50 text-brand-700 rounded-lg text-[10px] font-black uppercase tracking-widest">
                      {doctor.specialty}
                    </span>
                    <div className="flex items-center gap-1.5 text-slate-400 font-bold text-sm">
                      <Building2 className="w-4 h-4" />
                      {doctor.clinicName}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-4">
                   <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-3 py-1 rounded-xl text-xs font-black border border-amber-100">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      {doctor.rating}
                   </div>
                   <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{doctor.reviews} Reviews</span>
                   <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{doctor.experience} Yrs Exp</span>
                   <div className="flex items-center gap-1">
                     <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Fee:</span>
                     <span className="text-slate-900 font-black text-lg">₹{doctor.fee}</span>
                   </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-slate-500">
              <div className="flex items-start gap-2 text-sm font-bold">
                <MapPin className="w-4 h-4 text-brand-400 shrink-0" />
                <span>{doctor.location}, India</span>
              </div>
              <div className="flex items-start gap-2 text-sm font-bold">
                <Globe className="w-4 h-4 text-brand-400 shrink-0" />
                <span>{doctor.languages.slice(0, 2).join(', ')}</span>
              </div>
            </div>

            {/* Bottom Section: Slots & Action */}
            <div className="mt-auto pt-6 border-t border-slate-100 flex flex-col xl:flex-row items-end gap-6">
               <div className="w-full">
                 <div className="flex items-center gap-2 mb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <Clock className="w-4 h-4 text-brand-500" /> Available Times
                 </div>
                 <div className="flex flex-wrap gap-2">
                    {doctor.availableSlots.map(slot => (
                      <button 
                        key={slot}
                        onClick={() => onBook(doctor)}
                        className="px-5 py-3 rounded-2xl border-2 border-slate-50 bg-white text-[11px] text-slate-700 font-black hover:bg-brand-50 hover:border-brand-100 transition-all active:scale-95"
                      >
                        {slot}
                      </button>
                    ))}
                 </div>
               </div>
               <Button 
                onClick={() => onBook(doctor)} 
                className="w-full xl:w-[180px] h-20 bg-brand-600 hover:bg-brand-700 text-white font-black tracking-widest rounded-[24px] group border-none flex flex-col leading-none"
               >
                 <span className="text-xs mb-1">BOOK</span>
                 <span className="text-lg">NOW</span>
               </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};