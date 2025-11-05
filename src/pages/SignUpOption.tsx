import { User, Stethoscope, Building2, ArrowRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

export default function SignUpOption() {
  const navigate = useNavigate();

  const handlePatientClick = () => {
    window.location.href = 'https://l.doctoralia.com.mx/signup?redirect_uri=https%3A//www.doctoralia.com.mx/social-connect/mx_sso?preregistration=true&_gl=1*re1lx*_gcl_au*MTc2MzAwNDA3MC4xNzYyMzIxMTk3';
  };

  const handleSpecialistClick = () => {
    window.location.href = 'https://www.doctoralia.com.mx/registro-medico?preregistration=true';
  };

  const handleClinicalManagerClick = () => {
    window.location.href = 'https://www.doctoralia.com.mx/registro-medico?preregistration=true';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Create your account</h1>
          <p className="text-xl text-gray-600">Choose the option that best describes you</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Patient Option */}
          <button
            onClick={handlePatientClick}
            className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all hover:scale-105 border-2 border-transparent hover:border-blue-500 group"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-500 transition-colors">
                <User className="w-10 h-10 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Patient</h3>
              <p className="text-gray-600 mb-6">
                Book appointments with doctors and manage your health records
              </p>
              <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
                <span>Continue</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </div>
            </div>
          </button>

          {/* Specialist Option */}
          <button
            onClick={handleSpecialistClick}
            className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all hover:scale-105 border-2 border-transparent hover:border-blue-500 group"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-green-500 transition-colors">
                <Stethoscope className="w-10 h-10 text-green-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Specialist</h3>
              <p className="text-gray-600 mb-6">
                Join as a healthcare professional and manage your practice
              </p>
              <div className="flex items-center text-green-600 font-semibold group-hover:translate-x-2 transition-transform">
                <span>Continue</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </div>
            </div>
          </button>

          {/* Clinical Manager Option */}
          <button
            onClick={handleClinicalManagerClick}
            className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all hover:scale-105 border-2 border-transparent hover:border-blue-500 group"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-purple-500 transition-colors">
                <Building2 className="w-10 h-10 text-purple-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Clinical Manager</h3>
              <p className="text-gray-600 mb-6">
                Manage your clinic, staff, and patient appointments
              </p>
              <div className="flex items-center text-purple-600 font-semibold group-hover:translate-x-2 transition-transform">
                <span>Continue</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </div>
            </div>
          </button>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/signin" className="text-blue-600 hover:text-blue-700 font-semibold">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

