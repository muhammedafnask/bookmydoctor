import React from 'react';
import { Page } from '../types';
import { Button } from './Button';
import { Eye, ArrowLeft, ShieldCheck, Mail, Lock, User } from 'lucide-react';

interface SignUpPatientProps {
  onNavigate: (page: Page) => void;
}

export const SignUpPatient: React.FC<SignUpPatientProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8">
        <button 
          onClick={() => onNavigate(Page.SIGN_UP)} 
          className="flex items-center text-slate-400 font-black uppercase text-[10px] tracking-widest hover:text-brand-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-1" /> Back
        </button>
      </div>

      <div className="max-w-md w-full bg-white p-10 rounded-[40px] shadow-2xl shadow-brand-100 border border-slate-100">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Create Account</h2>
          <p className="text-slate-400 font-bold text-sm mt-2">Join for easy healthcare bookings</p>
        </div>

        <div className="space-y-4">
          <button className="w-full flex justify-center items-center gap-3 px-4 py-4 border border-slate-100 rounded-2xl text-slate-700 bg-slate-50 hover:bg-white hover:border-brand-200 font-black text-xs uppercase tracking-widest transition-all">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="h-5 w-5" alt="Google" />
            Continue with Google
          </button>
          
          <button className="w-full flex justify-center items-center gap-3 px-4 py-4 border border-slate-100 rounded-2xl text-slate-700 bg-slate-50 hover:bg-white hover:border-brand-200 font-black text-xs uppercase tracking-widest transition-all">
            <img src="https://www.svgrepo.com/show/511330/apple-173.svg" className="h-5 w-5" alt="Apple" />
            Continue with Apple
          </button>
        </div>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-100"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-4 bg-white text-slate-300 font-black uppercase tracking-widest">or email</span>
          </div>
        </div>

        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onNavigate(Page.HOME); }}>
          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
              <input
                type="text"
                required
                className="block w-full pl-12 pr-6 py-4 bg-slate-50 border-none rounded-2xl text-slate-900 placeholder:text-slate-400 font-bold focus:ring-4 focus:ring-brand-100 outline-none transition-all"
                placeholder="Full Name"
              />
            </div>
            
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
              <input
                type="email"
                required
                className="block w-full pl-12 pr-6 py-4 bg-slate-50 border-none rounded-2xl text-slate-900 placeholder:text-slate-400 font-bold focus:ring-4 focus:ring-brand-100 outline-none transition-all"
                placeholder="Email Address"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
              <input
                type="password"
                required
                className="block w-full pl-12 pr-12 py-4 bg-slate-50 border-none rounded-2xl text-slate-900 placeholder:text-slate-400 font-bold focus:ring-4 focus:ring-brand-100 outline-none transition-all"
                placeholder="Password"
              />
              <div className="absolute inset-y-0 right-0 pr-6 flex items-center cursor-pointer">
                <Eye className="h-5 w-5 text-slate-300 hover:text-brand-500" />
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-start">
              <div className="flex items-center h-5 pt-1">
                <input
                  id="privacy"
                  name="privacy"
                  type="checkbox"
                  className="h-5 w-5 text-brand-600 focus:ring-brand-500 border-slate-200 rounded-lg cursor-pointer"
                />
              </div>
              <div className="ml-3 text-xs font-bold text-slate-500 leading-relaxed">
                <label htmlFor="privacy">
                  I consent to BookMyDoctor processing my health data to use the services. <a href="#" className="text-brand-600 hover:underline">Find out more</a>
                </label>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <Button type="submit" className="w-full py-5 rounded-2xl font-black text-lg shadow-xl shadow-brand-100">
              SIGN UP FOR FREE
            </Button>
            <p className="mt-6 text-[10px] text-slate-400 text-center font-black uppercase tracking-widest leading-relaxed">
              By registering, you confirm that you agree to our <a href="#" className="text-brand-600 underline">terms</a> and <a href="#" className="text-brand-600 underline">privacy policy</a>.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};