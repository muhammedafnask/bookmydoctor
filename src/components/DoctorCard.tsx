import { Star, MapPin, Calendar, Video, Building2 } from 'lucide-react';
import type { Doctor } from '../lib/supabase';

interface DoctorCardProps {
  doctor: Doctor & { specialty_name?: string };
  onBookAppointment: (doctorId: string) => void;
}

export default function DoctorCard({ doctor, onBookAppointment }: DoctorCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 overflow-hidden">
      <div className="p-6">
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {doctor.full_name.charAt(0)}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-semibold text-gray-900 mb-1">
              Dr. {doctor.full_name}
            </h3>
            <p className="text-blue-600 font-medium mb-2">
              {doctor.specialty_name || 'General Practice'}
            </p>

            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
              {doctor.rating_average > 0 && (
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="font-medium text-gray-900">
                    {doctor.rating_average.toFixed(1)}
                  </span>
                  <span>({doctor.total_reviews})</span>
                </div>
              )}

              {doctor.years_experience > 0 && (
                <span>{doctor.years_experience} years exp.</span>
              )}
            </div>

            {doctor.city && (
              <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                <MapPin className="w-4 h-4" />
                <span>{doctor.city}, {doctor.state}</span>
              </div>
            )}

            <div className="flex items-center gap-3 mb-4">
              {doctor.accepts_in_person_consultation && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                  <Building2 className="w-3 h-3" />
                  In-Person
                </span>
              )}
              {doctor.accepts_online_consultation && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">
                  <Video className="w-3 h-3" />
                  Online
                </span>
              )}
            </div>

            {doctor.bio && (
              <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                {doctor.bio}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="text-lg font-semibold text-gray-900">
            {doctor.consultation_fee ? (
              <>
                ${doctor.consultation_fee.toFixed(2)}
                <span className="text-sm text-gray-600 font-normal"> per visit</span>
              </>
            ) : (
              <span className="text-sm text-gray-600 font-normal">Contact for pricing</span>
            )}
          </div>
          <button
            onClick={() => onBookAppointment(doctor.id)}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Calendar className="w-4 h-4" />
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
