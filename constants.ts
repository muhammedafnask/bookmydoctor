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
  { id: 'traumatologist', name: 'Traumatologist', icon: 'Bandage' },
  { id: 'psychiatrist', name: 'Psychiatrist', icon: 'BrainCircuit' },
  { id: 'ent', name: 'ENT', icon: 'Ear' },
  { id: 'ophthalmologist', name: 'Ophthalmologist', icon: 'Eye' },
  { id: 'urologist', name: 'Urologist', icon: 'Droplets' },
  { id: 'podiatrist', name: 'Podiatrist', icon: 'Footprints' },
  { id: 'allergist', name: 'Allergist', icon: 'Flower2' },
];

export const DOCTORS: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Mitchell',
    specialty: 'Cardiologist',
    image: 'https://picsum.photos/id/64/300/300',
    location: 'New York, NY',
    rating: 4.9,
    reviews: 124,
    experience: 12,
    fee: 150,
    availableSlots: ['10:00 AM', '11:30 AM', '02:00 PM', '04:00 PM'],
    about: 'Dr. Mitchell is a board-certified cardiologist with over a decade of experience in treating complex heart conditions. She believes in a holistic approach to heart health.'
  },
  {
    id: '2',
    name: 'Dr. James Wilson',
    specialty: 'General Physician',
    image: 'https://picsum.photos/id/65/300/300',
    location: 'Brooklyn, NY',
    rating: 4.7,
    reviews: 89,
    experience: 8,
    fee: 80,
    availableSlots: ['09:00 AM', '10:00 AM', '01:00 PM'],
    about: 'Dr. Wilson focuses on preventive care and chronic disease management. He is dedicated to helping patients achieve long-term wellness.'
  },
  {
    id: '3',
    name: 'Dr. Emily Chen',
    specialty: 'Dermatologist',
    image: 'https://picsum.photos/id/669/300/300',
    location: 'Queens, NY',
    rating: 4.8,
    reviews: 210,
    experience: 15,
    fee: 120,
    availableSlots: ['11:00 AM', '12:00 PM', '03:30 PM'],
    about: 'Expert in cosmetic and medical dermatology. Dr. Chen is renowned for her gentle approach and effective treatments for all skin types.'
  },
  {
    id: '4',
    name: 'Dr. Michael Ross',
    specialty: 'Orthopedist',
    image: 'https://picsum.photos/id/823/300/300',
    location: 'Manhattan, NY',
    rating: 4.6,
    reviews: 56,
    experience: 20,
    fee: 200,
    availableSlots: ['08:30 AM', '09:30 AM', '04:00 PM'],
    about: 'Specializing in sports injuries and joint replacement. Dr. Ross works with professional athletes to restore mobility and performance.'
  },
  {
    id: '5',
    name: 'Dr. Linda Kim',
    specialty: 'Dentist',
    image: 'https://picsum.photos/id/338/300/300',
    location: 'New York, NY',
    rating: 4.9,
    reviews: 340,
    experience: 10,
    fee: 100,
    availableSlots: ['10:00 AM', '02:00 PM', '05:00 PM'],
    about: 'Dr. Kim provides comprehensive dental care with a focus on patient comfort. She uses the latest technology for painless procedures.'
  },
  {
    id: '6',
    name: 'Dr. Robert Stone',
    specialty: 'Neurologist',
    image: 'https://picsum.photos/id/996/300/300',
    location: 'Staten Island, NY',
    rating: 4.5,
    reviews: 45,
    experience: 18,
    fee: 180,
    availableSlots: ['11:00 AM', '01:00 PM'],
    about: 'Specialist in migraine and headache disorders. Dr. Stone is committed to improving the quality of life for patients with neurological conditions.'
  }
];

export const LOCATIONS = ['New York, NY', 'Brooklyn, NY', 'Queens, NY', 'Manhattan, NY', 'Staten Island, NY'];