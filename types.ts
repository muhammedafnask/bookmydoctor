
export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image: string;
  location: string;
  clinicName: string;
  rating: number;
  reviews: number;
  experience: number;
  fee: number;
  availableSlots: string[];
  about: string;
  isVerified: boolean;
  languages: string[];
  insuranceAccepted: string[];
  totalBookings: number;
  type: 'Independent' | 'Clinic-based';
}

export interface Specialty {
  id: string;
  name: string;
  icon: string;
}

export interface FilterState {
  specialty: string;
  location: string;
  query: string;
  type?: 'Independent' | 'Clinic-based' | 'all';
}

export enum Page {
  HOME = 'HOME',
  SEARCH = 'SEARCH',
  DOCTOR_DETAILS = 'DOCTOR_DETAILS',
  APPOINTMENT_SUCCESS = 'APPOINTMENT_SUCCESS',
  SIGN_IN = 'SIGN_IN',
  SIGN_UP = 'SIGN_UP',
  SIGN_UP_PATIENT = 'SIGN_UP_PATIENT',
  SIGN_UP_SPECIALIST = 'SIGN_UP_SPECIALIST',
  SIGN_UP_CLINIC = 'SIGN_UP_CLINIC',
  ASK_EXPERT = 'ASK_EXPERT'
}

export interface AISymptomResponse {
  suggestedSpecialty: string;
  reasoning: string;
  isEmergency: boolean;
}
