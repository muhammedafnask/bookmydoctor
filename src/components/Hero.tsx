import { Search, MapPin, Video, Building2 } from 'lucide-react';
import { useState } from 'react';

export default function Hero() {
  const [consultationType, setConsultationType] = useState<'in_person' | 'online'>('in_person');
  const [specialty, setSpecialty] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', { specialty, location, consultationType });
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Find and book the best doctors
          </h1>
          <p className="text-xl text-gray-600">
            Thousands of verified healthcare professionals ready to help you
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <div className="flex gap-4 mb-6 flex-wrap sm:flex-nowrap">
            <button
              onClick={() => setConsultationType('in_person')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all ${
                consultationType === 'in_person'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Building2 className="w-5 h-5" />
              <span>In-Person</span>
            </button>
            <button
              onClick={() => setConsultationType('online')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all ${
                consultationType === 'online'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Video className="w-5 h-5" />
              <span>Online</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Specialty, doctor, or condition"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900 placeholder-gray-500"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="City or postal code"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900 placeholder-gray-500"
              />
            </div>
          </div>

          <button
            onClick={handleSearch}
            className="w-full py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
          >
            Search Doctors
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Free booking • Instant confirmation • Real patient reviews
          </p>
        </div>
      </div>
    </div>
  );
}
