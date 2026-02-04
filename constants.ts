import { Doctor, Specialty } from './types';

export const SPECIALTIES: Specialty[] = [
  { id: 'general-physician', name: 'General Physician', icon: 'Stethoscope' },
  { id: 'dentist', name: 'Dentist', icon: 'Smile' },
  { id: 'cardiologist', name: 'Cardiologist', icon: 'HeartPulse' },
  { id: 'dermatologist', name: 'Dermatologist', icon: 'User' },
  { id: 'neurologist', name: 'Neurologist', icon: 'Brain' },
  { id: 'orthopedist', name: 'Orthopedist', icon: 'Bone' },
  { id: 'psychologist', name: 'Psychologist', icon: 'HeartHandshake' },
  { id: 'gynecologist', name: 'Gynecologist', icon: 'Baby' },
  { id: 'ent', name: 'ENT', icon: 'Ear' },
  { id: 'ophthalmologist', name: 'Ophthalmologist', icon: 'Eye' },
];

export const INSURANCE_PROVIDERS = ['Star Health', 'HDFC ERGO', 'ICICI Lombard', 'Niva Bupa', 'Care Health', 'Bajaj Allianz', 'Reliance General'];

export const DOCTORS: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Mitchell',
    specialty: 'Cardiologist',
    image: 'https://images.unsplash.com/photo-1559839734-2b71f1536783?q=80&w=300&h=300&auto=format&fit=crop',
    location: 'Kochi',
    clinicName: 'Aster Medcity',
    rating: 4.9,
    reviews: 124,
    experience: 12,
    fee: 800,
    availableSlots: ['10:00 AM', '11:30 AM', '02:00 PM', '04:00 PM'],
    about: 'Dr. Mitchell is a board-certified cardiologist specializing in interventional cardiology and heart health.',
    isVerified: true,
    languages: ['English', 'Malayalam', 'Hindi'],
    insuranceAccepted: ['Star Health', 'HDFC ERGO'],
    totalBookings: 1250,
    type: 'Clinic-based'
  },
  {
    id: '2',
    name: 'Dr. Ahmed Hassan',
    specialty: 'Dentist',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=300&h=300&auto=format&fit=crop',
    location: 'Calicut',
    clinicName: 'Starlight Dental Clinic',
    rating: 4.8,
    reviews: 210,
    experience: 10,
    fee: 500,
    availableSlots: ['09:00 AM', '10:00 AM', '01:00 PM', '03:00 PM'],
    about: 'Expert in cosmetic dentistry and orthodontics with a focus on painless treatments.',
    isVerified: true,
    languages: ['English', 'Malayalam'],
    insuranceAccepted: ['Star Health', 'Niva Bupa'],
    totalBookings: 3400,
    type: 'Clinic-based'
  },
  {
    id: '3',
    name: 'Dr. Emily Chen',
    specialty: 'Dermatologist',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=300&h=300&auto=format&fit=crop',
    location: 'Thrissur',
    clinicName: 'DermaCare Skin Hospital',
    rating: 4.8,
    reviews: 89,
    experience: 8,
    fee: 600,
    availableSlots: ['11:00 AM', '02:00 PM', '04:30 PM'],
    about: 'Specialist in medical and aesthetic dermatology, helping you achieve healthy, radiant skin.',
    isVerified: true,
    languages: ['English', 'Malayalam'],
    insuranceAccepted: ['Care Health', 'ICICI Lombard'],
    totalBookings: 890,
    type: 'Clinic-based'
  },
  {
    id: '4',
    name: 'Dr. Michael Ross',
    specialty: 'General Physician',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=300&h=300&auto=format&fit=crop',
    location: 'Kannur',
    clinicName: 'Family Wellness Center',
    rating: 4.7,
    reviews: 56,
    experience: 15,
    fee: 400,
    availableSlots: ['08:00 AM', '10:30 AM', '01:30 PM'],
    about: 'Leading general physician focusing on preventive care and chronic disease management.',
    isVerified: true,
    languages: ['English', 'Malayalam', 'Hindi'],
    insuranceAccepted: ['Star Health', 'Niva Bupa'],
    totalBookings: 2100,
    type: 'Independent'
  }
];

export const LOCATIONS = [
  'Calicut',
  'Malappuram',
  'Thrissur',
  'Kochi',
  'Kannur'
];