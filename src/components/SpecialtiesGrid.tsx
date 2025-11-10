import { useEffect, useState } from 'react';
import {
  Stethoscope, Heart, Sparkles, UserCircle, Baby, Brain,
  Smile, Bone, Eye, Activity, Package, Users, StickyNote,
  Scissors, Headphones, Droplets, AlertCircle
} from 'lucide-react';
import { supabase, type Specialty } from '../lib/supabase';

const iconMap: Record<string, any> = {
  Stethoscope,
  Heart,
  Sparkles,
  UserCircle,
  Baby,
  Brain,
  Smile,
  Bone,
  Eye,
  Activity,
  Package,
  Users,
  StickyNote,
  Scissors,
  Headphones,
  Droplets,
  AlertCircle,
};

// Default specialties to show if database is empty
const defaultSpecialties = [
  'Psychologist',
  'Gynecologist',
  'Traumatologist',
  'Dermatologist',
  'Psychiatrist',
  'Dentist',
  'General practitioner',
  'ENT',
  'Ophthalmologist',
  'Urologist',
  'Podiatrist',
  'Allergist',
];

// Map specialty names to icon names
const specialtyIconMap: Record<string, string> = {
  'Psychologist': 'Brain',
  'Gynecologist': 'Heart',
  'Traumatologist': 'Bone',
  'Dermatologist': 'Scissors',
  'Psychiatrist': 'Brain',
  'Dentist': 'Smile',
  'General practitioner': 'Stethoscope',
  'ENT': 'Headphones',
  'Ophthalmologist': 'Eye',
  'Urologist': 'Droplets',
  'Podiatrist': 'Activity',
  'Allergist': 'AlertCircle',
};

export default function SpecialtiesGrid() {
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const initialDisplayCount = 12;

  useEffect(() => {
    fetchSpecialties();
  }, []);

  const fetchSpecialties = async () => {
    try {
      if (!supabase) {
        // Use default specialties if Supabase is not configured
        const defaultSpecialtiesData: Specialty[] = defaultSpecialties.map((name, index) => ({
          id: `default-${index}`,
          name,
          description: null,
          icon_name: specialtyIconMap[name] || 'Stethoscope',
          created_at: new Date().toISOString(),
        }));
        setSpecialties(defaultSpecialtiesData);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('specialties')
        .select('*')
        .order('name');

      if (error) throw error;
      
      // If no specialties in database, use defaults
      if (!data || data.length === 0) {
        const defaultSpecialtiesData: Specialty[] = defaultSpecialties.map((name, index) => ({
          id: `default-${index}`,
          name,
          description: null,
          icon_name: specialtyIconMap[name] || 'Stethoscope',
          created_at: new Date().toISOString(),
        }));
        setSpecialties(defaultSpecialtiesData);
      } else {
        setSpecialties(data);
      }
    } catch (error) {
      console.error('Error fetching specialties:', error);
      // Fallback to default specialties on error
      const defaultSpecialtiesData: Specialty[] = defaultSpecialties.map((name, index) => ({
        id: `default-${index}`,
        name,
        description: null,
        icon_name: specialtyIconMap[name] || 'Stethoscope',
        created_at: new Date().toISOString(),
      }));
      setSpecialties(defaultSpecialtiesData);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-600">Loading specialties...</p>
        </div>
      </div>
    );
  }

  const displayedSpecialties = showAll ? specialties : specialties.slice(0, initialDisplayCount);
  const hasMore = specialties.length > initialDisplayCount;

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Medical Specialties
          </h2>
          <p className="text-lg text-gray-600">
            Find the right specialist for your health needs
          </p>
        </div>

        {/* Specialties List */}
        <div className="max-w-3xl mx-auto">
          <div className="space-y-2 mb-6">
            {displayedSpecialties.map((specialty) => {
              const iconName = specialty.icon_name || specialtyIconMap[specialty.name] || 'Stethoscope';
              const Icon = iconMap[iconName] || Stethoscope;

              return (
                <button
                  key={specialty.id}
                  className="group w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 rounded-md transition-colors"
                >
                  <div className="flex-shrink-0">
                    <Icon className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
                  </div>
                  <span className="text-gray-700 text-base group-hover:text-blue-600 transition-colors">
                    {specialty.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* See more link */}
          {hasMore && (
            <div className="text-center mt-4">
              <button
                onClick={() => setShowAll(!showAll)}
                className="text-blue-600 hover:text-blue-700 font-medium underline decoration-blue-600 underline-offset-4 transition-colors"
              >
                {showAll ? 'See less' : 'See more'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
