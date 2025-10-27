/*
  # BookMyDoctor Database Schema

  ## Overview
  Complete database schema for a doctor appointment booking platform similar to Doctoralia.
  Enables patients to search for doctors, book appointments, and leave reviews.

  ## New Tables

  ### 1. `specialties`
  Medical specialties that doctors can have
  - `id` (uuid, primary key)
  - `name` (text, unique) - e.g., "Cardiologist", "Dermatologist"
  - `description` (text) - Detailed description of the specialty
  - `icon_name` (text) - Icon identifier for UI
  - `created_at` (timestamptz)

  ### 2. `doctors`
  Healthcare professionals offering services
  - `id` (uuid, primary key, references auth.users)
  - `full_name` (text, not null)
  - `email` (text, unique, not null)
  - `phone` (text)
  - `specialty_id` (uuid, references specialties)
  - `license_number` (text, unique)
  - `bio` (text) - Doctor's biography
  - `years_experience` (integer)
  - `consultation_fee` (decimal)
  - `address` (text)
  - `city` (text)
  - `state` (text)
  - `country` (text, default 'Mexico')
  - `postal_code` (text)
  - `profile_image_url` (text)
  - `is_verified` (boolean, default false)
  - `accepts_online_consultation` (boolean, default false)
  - `accepts_in_person_consultation` (boolean, default true)
  - `rating_average` (decimal, default 0)
  - `total_reviews` (integer, default 0)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 3. `patients`
  Users who book appointments
  - `id` (uuid, primary key, references auth.users)
  - `full_name` (text, not null)
  - `email` (text, unique, not null)
  - `phone` (text)
  - `date_of_birth` (date)
  - `gender` (text)
  - `address` (text)
  - `city` (text)
  - `state` (text)
  - `postal_code` (text)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 4. `doctor_availability`
  Defines when doctors are available for appointments
  - `id` (uuid, primary key)
  - `doctor_id` (uuid, references doctors)
  - `day_of_week` (integer) - 0=Sunday, 6=Saturday
  - `start_time` (time)
  - `end_time` (time)
  - `is_available` (boolean, default true)
  - `consultation_type` (text) - 'online', 'in_person', 'both'
  - `created_at` (timestamptz)

  ### 5. `appointments`
  Booked appointments between patients and doctors
  - `id` (uuid, primary key)
  - `patient_id` (uuid, references patients)
  - `doctor_id` (uuid, references doctors)
  - `appointment_date` (date, not null)
  - `appointment_time` (time, not null)
  - `consultation_type` (text) - 'online' or 'in_person'
  - `status` (text, default 'scheduled') - 'scheduled', 'confirmed', 'completed', 'cancelled'
  - `reason` (text) - Reason for visit
  - `notes` (text) - Patient notes
  - `doctor_notes` (text) - Doctor's notes after appointment
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 6. `reviews`
  Patient reviews and ratings for doctors
  - `id` (uuid, primary key)
  - `patient_id` (uuid, references patients)
  - `doctor_id` (uuid, references doctors)
  - `appointment_id` (uuid, references appointments)
  - `rating` (integer) - 1-5 stars
  - `comment` (text)
  - `is_verified` (boolean, default false) - True if from actual appointment
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ## Security
  - Enable Row Level Security (RLS) on all tables
  - Patients can only view and manage their own data
  - Doctors can only view and manage their own data
  - Public users can view doctor profiles and reviews
  - Appointments require authentication and proper ownership checks

  ## Indexes
  - Added indexes on frequently queried columns for performance optimization
*/

-- Create specialties table
CREATE TABLE IF NOT EXISTS specialties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text,
  icon_name text,
  created_at timestamptz DEFAULT now()
);

-- Create doctors table
CREATE TABLE IF NOT EXISTS doctors (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  specialty_id uuid REFERENCES specialties(id) ON DELETE SET NULL,
  license_number text UNIQUE,
  bio text,
  years_experience integer DEFAULT 0,
  consultation_fee decimal(10,2),
  address text,
  city text,
  state text,
  country text DEFAULT 'Mexico',
  postal_code text,
  profile_image_url text,
  is_verified boolean DEFAULT false,
  accepts_online_consultation boolean DEFAULT false,
  accepts_in_person_consultation boolean DEFAULT true,
  rating_average decimal(3,2) DEFAULT 0,
  total_reviews integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create patients table
CREATE TABLE IF NOT EXISTS patients (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  date_of_birth date,
  gender text,
  address text,
  city text,
  state text,
  postal_code text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create doctor_availability table
CREATE TABLE IF NOT EXISTS doctor_availability (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id uuid REFERENCES doctors(id) ON DELETE CASCADE NOT NULL,
  day_of_week integer NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
  start_time time NOT NULL,
  end_time time NOT NULL,
  is_available boolean DEFAULT true,
  consultation_type text DEFAULT 'both' CHECK (consultation_type IN ('online', 'in_person', 'both')),
  created_at timestamptz DEFAULT now()
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES patients(id) ON DELETE CASCADE NOT NULL,
  doctor_id uuid REFERENCES doctors(id) ON DELETE CASCADE NOT NULL,
  appointment_date date NOT NULL,
  appointment_time time NOT NULL,
  consultation_type text NOT NULL CHECK (consultation_type IN ('online', 'in_person')),
  status text DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'confirmed', 'completed', 'cancelled')),
  reason text,
  notes text,
  doctor_notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES patients(id) ON DELETE CASCADE NOT NULL,
  doctor_id uuid REFERENCES doctors(id) ON DELETE CASCADE NOT NULL,
  appointment_id uuid REFERENCES appointments(id) ON DELETE SET NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  is_verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_doctors_specialty ON doctors(specialty_id);
CREATE INDEX IF NOT EXISTS idx_doctors_city ON doctors(city);
CREATE INDEX IF NOT EXISTS idx_doctors_rating ON doctors(rating_average DESC);
CREATE INDEX IF NOT EXISTS idx_doctor_availability_doctor ON doctor_availability(doctor_id);
CREATE INDEX IF NOT EXISTS idx_appointments_patient ON appointments(patient_id);
CREATE INDEX IF NOT EXISTS idx_appointments_doctor ON appointments(doctor_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_reviews_doctor ON reviews(doctor_id);

-- Enable Row Level Security
ALTER TABLE specialties ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctor_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies for specialties (public read)
CREATE POLICY "Anyone can view specialties"
  ON specialties FOR SELECT
  TO public
  USING (true);

-- RLS Policies for doctors
CREATE POLICY "Anyone can view verified doctors"
  ON doctors FOR SELECT
  TO public
  USING (is_verified = true);

CREATE POLICY "Doctors can view their own profile"
  ON doctors FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Doctors can update their own profile"
  ON doctors FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Doctors can insert their own profile"
  ON doctors FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- RLS Policies for patients
CREATE POLICY "Patients can view their own profile"
  ON patients FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Patients can update their own profile"
  ON patients FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Patients can insert their own profile"
  ON patients FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- RLS Policies for doctor_availability
CREATE POLICY "Anyone can view doctor availability"
  ON doctor_availability FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Doctors can manage their own availability"
  ON doctor_availability FOR ALL
  TO authenticated
  USING (doctor_id = auth.uid())
  WITH CHECK (doctor_id = auth.uid());

-- RLS Policies for appointments
CREATE POLICY "Patients can view their own appointments"
  ON appointments FOR SELECT
  TO authenticated
  USING (patient_id = auth.uid());

CREATE POLICY "Doctors can view appointments with them"
  ON appointments FOR SELECT
  TO authenticated
  USING (doctor_id = auth.uid());

CREATE POLICY "Patients can create appointments"
  ON appointments FOR INSERT
  TO authenticated
  WITH CHECK (patient_id = auth.uid());

CREATE POLICY "Patients can update their own appointments"
  ON appointments FOR UPDATE
  TO authenticated
  USING (patient_id = auth.uid())
  WITH CHECK (patient_id = auth.uid());

CREATE POLICY "Doctors can update appointments with them"
  ON appointments FOR UPDATE
  TO authenticated
  USING (doctor_id = auth.uid())
  WITH CHECK (doctor_id = auth.uid());

-- RLS Policies for reviews
CREATE POLICY "Anyone can view verified reviews"
  ON reviews FOR SELECT
  TO public
  USING (is_verified = true);

CREATE POLICY "Patients can view their own reviews"
  ON reviews FOR SELECT
  TO authenticated
  USING (patient_id = auth.uid());

CREATE POLICY "Doctors can view reviews about them"
  ON reviews FOR SELECT
  TO authenticated
  USING (doctor_id = auth.uid());

CREATE POLICY "Patients can create reviews"
  ON reviews FOR INSERT
  TO authenticated
  WITH CHECK (patient_id = auth.uid());

CREATE POLICY "Patients can update their own reviews"
  ON reviews FOR UPDATE
  TO authenticated
  USING (patient_id = auth.uid())
  WITH CHECK (patient_id = auth.uid());

-- Function to update doctor rating when reviews change
CREATE OR REPLACE FUNCTION update_doctor_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE doctors
  SET 
    rating_average = (
      SELECT COALESCE(AVG(rating), 0)
      FROM reviews
      WHERE doctor_id = COALESCE(NEW.doctor_id, OLD.doctor_id)
    ),
    total_reviews = (
      SELECT COUNT(*)
      FROM reviews
      WHERE doctor_id = COALESCE(NEW.doctor_id, OLD.doctor_id)
    )
  WHERE id = COALESCE(NEW.doctor_id, OLD.doctor_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update doctor ratings
DROP TRIGGER IF EXISTS trigger_update_doctor_rating ON reviews;
CREATE TRIGGER trigger_update_doctor_rating
  AFTER INSERT OR UPDATE OR DELETE ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_doctor_rating();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at columns
DROP TRIGGER IF EXISTS update_doctors_updated_at ON doctors;
CREATE TRIGGER update_doctors_updated_at
  BEFORE UPDATE ON doctors
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_patients_updated_at ON patients;
CREATE TRIGGER update_patients_updated_at
  BEFORE UPDATE ON patients
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_appointments_updated_at ON appointments;
CREATE TRIGGER update_appointments_updated_at
  BEFORE UPDATE ON appointments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_reviews_updated_at ON reviews;
CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();