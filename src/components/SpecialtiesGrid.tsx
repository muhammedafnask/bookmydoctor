import { useEffect, useState } from 'react';
import {
  Stethoscope, Heart, Sparkles, UserCircle, Baby, Brain,
  Smile, Bone, Eye, Activity, Package
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
};

export default function SpecialtiesGrid() {
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSpecialties();
  }, []);

  const fetchSpecialties = async () => {
    try {
      const { data, error } = await supabase
        .from('specialties')
        .select('*')
        .order('name');

      if (error) throw error;
      setSpecialties(data || []);
    } catch (error) {
      console.error('Error fetching specialties:', error);
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

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Popular Specialties
          </h2>
          <p className="text-lg text-gray-600">
            Find the right specialist for your health needs
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6">
          {specialties.map((specialty) => {
            const Icon = iconMap[specialty.icon_name || 'Stethoscope'] || Stethoscope;

            return (
              <button
                key={specialty.id}
                className="group p-6 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-600 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="p-4 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-900 text-center group-hover:text-blue-600 transition-colors">
                    {specialty.name}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
