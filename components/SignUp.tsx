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
          <h2 className="text-3xl font-black text-slate-900 sm:text-4xl tracking-tight">Create a free account</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Patient Card */}
          <button 
            className="group bg-white rounded-[40px] p-8 border border-slate-200 hover:border-brand-500 hover:shadow-2xl transition-all duration-500 text-center flex flex-col items-center"
            onClick={() => onNavigate(Page.SIGN_UP_PATIENT)}
          >
            <div className="h-40 w-40 bg-brand-50 rounded-full flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-brand-600 transition-all duration-500">
              <User className="h-20 w-20 text-brand-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight">I'm a patient</h3>
            <p className="text-slate-500 font-bold leading-relaxed">
              Find and book verified doctors in Dubai quickly and easily.
            </p>
          </button>

          {/* Specialist Card */}
          <button 
            className="group bg-white rounded-[40px] p-8 border border-slate-200 hover:border-brand-500 hover:shadow-2xl transition-all duration-500 text-center flex flex-col items-center"
            onClick={() => onNavigate(Page.SIGN_UP_SPECIALIST)}
          >
             <div className="h-40 w-40 bg-brand-100/50 rounded-full flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-brand-600 transition-all duration-500">
              <Stethoscope className="h-20 w-20 text-brand-700 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight">I am a doctor</h3>
            <p className="text-slate-500 font-bold leading-relaxed">
              Create your profile, set availability, and connect with new patients.
            </p>
          </button>

          {/* Clinic Manager Card */}
          <button 
            className="group bg-white rounded-[40px] p-8 border border-slate-200 hover:border-brand-500 hover:shadow-2xl transition-all duration-500 text-center flex flex-col items-center"
            onClick={() => onNavigate(Page.SIGN_UP_CLINIC)}
          >
             <div className="h-40 w-40 bg-brand-900 rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
              <Building className="h-20 w-20 text-brand-100" />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight">I am a clinic manager</h3>
            <p className="text-slate-500 font-bold leading-relaxed">
              Register your clinic, manage multiple doctors, and get verified.
            </p>
          </button>
        </div>
        
        <div className="mt-16 text-center">
            <span className="text-slate-400 font-bold uppercase text-xs tracking-widest">Already have an account? </span>
            <button 
               onClick={() => onNavigate(Page.SIGN_IN)}
               className="font-black text-brand-600 hover:text-brand-800 ml-1 uppercase text-xs tracking-widest"
            >
               Sign in
            </button>
        </div>
      </div>
    </div>
  );
};