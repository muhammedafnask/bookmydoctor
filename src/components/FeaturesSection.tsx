import { Calendar, Shield, Star, Clock, MessageCircle, Bell } from 'lucide-react';

const features = [
  {
    icon: Calendar,
    title: 'Easy Booking',
    description: 'Book appointments online 24/7 without phone calls',
  },
  {
    icon: Shield,
    title: 'Verified Doctors',
    description: 'All healthcare professionals are verified and licensed',
  },
  {
    icon: Star,
    title: 'Patient Reviews',
    description: 'Read real reviews from patients to make informed decisions',
  },
  {
    icon: Clock,
    title: 'Flexible Scheduling',
    description: 'Choose appointment times that fit your schedule',
  },
  {
    icon: MessageCircle,
    title: 'Online & In-Person',
    description: 'Select between video consultations or in-person visits',
  },
  {
    icon: Bell,
    title: 'Reminders',
    description: 'Get SMS and email reminders for your appointments',
  },
];

export default function FeaturesSection() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Why Choose BookMyDoctor?
          </h2>
          <p className="text-lg text-gray-600">
            Your health deserves the best care and convenience
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-blue-100 rounded-full mb-4">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
