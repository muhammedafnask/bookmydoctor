import React from 'react';
import { Doctor } from '../types';
import { Star, MapPin, ThumbsUp } from 'lucide-react';
import { Button } from './Button';

interface DoctorListProps {
  doctors: Doctor[];
  onBook: (doctor: Doctor) => void;
}

export const DoctorList: React.FC<DoctorListProps> = ({ doctors, onBook }) => {
  if (doctors.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
        <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
          <Search className="h-8 w-8 text-slate-300" />
        </div>
        <h3 className="text-lg font-medium text-slate-900">No doctors found</h3>
        <p className="text-slate-500 mt-2">Try changing your location or filters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {doctors.map((doctor) => (
        <div key={doctor.id} className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition-shadow duration-300 flex flex-col md:flex-row gap-6">
          {/* Avatar Section */}
          <div className="flex-shrink-0 flex flex-col items-center">
            <div className="relative">
              <img 
                src={doctor.image} 
                alt={doctor.name} 
                className="h-28 w-28 rounded-full object-cover border-4 border-white shadow-md"
              />
              <div className="absolute bottom-1 right-1 bg-green-500 h-4 w-4 rounded-full border-2 border-white" title="Available"></div>
            </div>
            <div className="mt-3 flex items-center gap-1 bg-blue-50 px-2 py-1 rounded text-xs font-medium text-blue-700">
               <ThumbsUp className="w-3 h-3" />
               <span>98%</span>
            </div>
          </div>

          {/* Info Section */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
              <div>
                <h3 className="text-xl font-bold text-slate-900 hover:text-blue-600 cursor-pointer">{doctor.name}</h3>
                <p className="text-slate-500 font-medium">{doctor.specialty}</p>
              </div>
              <div className="hidden sm:block text-right">
                <p className="text-lg font-bold text-slate-900">${doctor.fee}</p>
                <p className="text-xs text-slate-400">per visit</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-slate-400" /> {doctor.location}
              </span>
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" /> {doctor.rating}
              </span>
              <span className="text-slate-400">{doctor.experience} yrs exp</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {doctor.availableSlots.slice(0, 4).map(slot => (
                <button 
                  key={slot}
                  onClick={() => onBook(doctor)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm text-green-700 font-medium bg-green-50 hover:bg-green-100 hover:border-green-200 transition-colors"
                >
                  {slot}
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
              <Button onClick={() => onBook(doctor)} className="flex-1 shadow-blue-100 shadow-lg">
                Book Appointment
              </Button>
              <Button variant="outline" className="flex-1 sm:flex-none">View Profile</Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
import { Search } from 'lucide-react';