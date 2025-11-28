import React from 'react';
import { Page } from '../types';
import { User, Stethoscope, Building } from 'lucide-react';

interface SignUpProps {
  onNavigate: (page: Page) => void;
}

export const SignUp: React.FC<SignUpProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Create a free account</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Patient Card */}
          <button 
            className="group bg-white rounded-2xl p-8 border border-slate-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center"
            onClick={() => onNavigate(Page.SIGN_UP_PATIENT)}
          >
            <div className="h-40 w-40 bg-teal-50 rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              <User className="h-20 w-20 text-teal-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">I'm a patient</h3>
            <p className="text-slate-600 leading-relaxed">
              Share basic information with your specialist before the visit
            </p>
          </button>

          {/* Specialist Card */}
          <button 
            className="group bg-white rounded-2xl p-8 border border-slate-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center"
            onClick={() => onNavigate(Page.SIGN_UP_SPECIALIST)}
          >
             <div className="h-40 w-40 bg-blue-50 rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              <Stethoscope className="h-20 w-20 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">I am a specialist</h3>
            <p className="text-slate-600 leading-relaxed">
              Get your patients to know you, trust you and book with you.
            </p>
          </button>

          {/* Clinic Manager Card */}
          <button 
            className="group bg-white rounded-2xl p-8 border border-slate-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center"
            onClick={() => onNavigate(Page.SIGN_UP_CLINIC)}
          >
             <div className="h-40 w-40 bg-indigo-50 rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              <Building className="h-20 w-20 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">I am a clinic manager</h3>
            <p className="text-slate-600 leading-relaxed">
              Give your clinic greater visibility with your own profile.
            </p>
          </button>
        </div>
        
        <div className="mt-12 text-center">
            <span className="text-slate-600">Already have an account? </span>
            <button 
               onClick={() => onNavigate(Page.SIGN_IN)}
               className="font-semibold text-blue-600 hover:text-blue-800 ml-1"
            >
               Sign in
            </button>
        </div>
      </div>
    </div>
  );
};