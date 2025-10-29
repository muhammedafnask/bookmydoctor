import { useEffect, useState } from 'react';
import { supabase, type Doctor } from '../lib/supabase';
import DoctorCard from './DoctorCard';

export default function FeaturedDoctors() {
  const [doctors, setDoctors] = useState<(Doctor & { specialty_name?: string })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedDoctors();
  }, []);

  const fetchFeaturedDoctors = async () => {
    try {
      if (!supabase) {
        setDoctors([]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('doctors')
        .select(`
          *,
          specialties (
            name
          )
        `)
        .eq('is_verified', true)
        .order('rating_average', { ascending: false })
        .limit(6);

      if (error) throw error;

      const doctorsWithSpecialty = (data || []).map(doctor => ({
        ...doctor,
        specialty_name: doctor.specialties?.name,
      }));

      setDoctors(doctorsWithSpecialty);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookAppointment = (doctorId: string) => {
    console.log('Booking appointment with doctor:', doctorId);
  };

  if (loading) {
    return (
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-600">Loading doctors...</p>
        </div>
      </div>
    );
  }

  if (doctors.length === 0) {
    return null;
  }

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Top Rated Doctors
          </h2>
          <p className="text-lg text-gray-600">
            Highly recommended healthcare professionals
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {doctors.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              onBookAppointment={handleBookAppointment}
            />
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
            View All Doctors
          </button>
        </div>
      </div>
    </div>
  );
}
