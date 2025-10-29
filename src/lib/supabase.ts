import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export type Specialty = {
  id: string;
  name: string;
  description: string | null;
  icon_name: string | null;
  created_at: string;
};

export type Doctor = {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  specialty_id: string | null;
  license_number: string | null;
  bio: string | null;
  years_experience: number;
  consultation_fee: number | null;
  address: string | null;
  city: string | null;
  state: string | null;
  country: string;
  postal_code: string | null;
  profile_image_url: string | null;
  is_verified: boolean;
  accepts_online_consultation: boolean;
  accepts_in_person_consultation: boolean;
  rating_average: number;
  total_reviews: number;
  created_at: string;
  updated_at: string;
};

export type Patient = {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  date_of_birth: string | null;
  gender: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  postal_code: string | null;
  created_at: string;
  updated_at: string;
};

export type Appointment = {
  id: string;
  patient_id: string;
  doctor_id: string;
  appointment_date: string;
  appointment_time: string;
  consultation_type: 'online' | 'in_person';
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
  reason: string | null;
  notes: string | null;
  doctor_notes: string | null;
  created_at: string;
  updated_at: string;
};

export type Review = {
  id: string;
  patient_id: string;
  doctor_id: string;
  appointment_id: string | null;
  rating: number;
  comment: string | null;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
};
