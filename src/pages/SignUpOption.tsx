import { useEffect } from 'react';
import { User, Stethoscope, Building2, ArrowRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

export default function SignUpOption() {
  const navigate = useNavigate();

  useEffect(() => {
    // Ensure page language is English
    try {
      document.documentElement.lang = 'en';
    } catch {}
  }, []);

  const handlePatientClick = () => {
    navigate('/signup/patient?preregistration=true');
  };

  const handleSpecialistClick = () => {
    navigate('/signup/specialist?preregistration=true');
  };

  const handleClinicalManagerClick = () => {
    navigate('/signup/clinical-manager?preregistration=true');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full">
        {/* BookMyDoctor logo + name */}
        <div className="flex items-center justify-center mb-6">
          <Link to="/" className="inline-flex items-center gap-3 no-underline" aria-label="BookMyDoctor home">
            <span
              className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center"
              aria-hidden="true"
            >
              {/* BookMyDoctor simple cross logo */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-hidden="true"
              >
                <path d="M11 6h2v4h4v2h-4v4h-2v-4H7v-2h4V6z" fill="white" />
              </svg>
            </span>
            <span className="text-2xl font-extrabold text-gray-900 select-none">BookMyDoctor</span>
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Create your account</h1>
          <p className="text-xl text-gray-600">Choose the option that best describes you</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Patient Option */}
          <button
            type="button"
            onClick={handlePatientClick}
            className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all hover:scale-105 border-2 border-transparent hover:border-blue-500 group"
            aria-label="Sign up as patient"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-500 transition-colors">
                <User className="w-10 h-10 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Patient</h3>
              <p className="text-gray-600 mb-6">Book appointments and manage your personal health information</p>
              <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
                <span>Continue</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </div>
            </div>
          </button>

          {/* Specialist Option */}
          <button
            type="button"
            onClick={handleSpecialistClick}
            className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all hover:scale-105 border-2 border-transparent hover:border-blue-500 group"
            aria-label="Sign up as specialist"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-500 transition-colors">
                <Stethoscope className="w-10 h-10 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Specialist</h3>
              <p className="text-gray-600 mb-6">Join as a healthcare professional and manage your practice</p>
              <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
                <span>Continue</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </div>
            </div>
          </button>

          {/* Clinical Manager Option */}
          <button
            type="button"
            onClick={handleClinicalManagerClick}
            className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all hover:scale-105 border-2 border-transparent hover:border-blue-500 group"
            aria-label="Sign up as clinical manager"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-500 transition-colors">
                <Building2 className="w-10 h-10 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Clinical Manager</h3>
              <p className="text-gray-600 mb-6">Manage clinic operations, staff, and appointments</p>
              <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
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

