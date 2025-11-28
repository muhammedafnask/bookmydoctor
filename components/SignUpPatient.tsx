import React from 'react';
import { Page } from '../types';
import { Button } from './Button';
import { Eye, ArrowLeft } from 'lucide-react';

interface SignUpPatientProps {
  onNavigate: (page: Page) => void;
}

export const SignUpPatient: React.FC<SignUpPatientProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8">
        <button 
          onClick={() => onNavigate(Page.SIGN_UP)} 
          className="flex items-center text-slate-500 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-1" /> Back
        </button>
      </div>

      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900">Create Account</h2>
        </div>

        <div className="mt-8 space-y-4">
          <button className="w-full flex justify-center items-center gap-3 px-4 py-3 border border-slate-300 rounded-lg text-slate-700 bg-white hover:bg-slate-50 font-medium transition-colors">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="h-5 w-5" alt="Google" />
            Continue with Google
          </button>
          
          <button className="w-full flex justify-center items-center gap-3 px-4 py-3 border border-slate-300 rounded-lg text-slate-700 bg-white hover:bg-slate-50 font-medium transition-colors">
            <img src="https://www.svgrepo.com/show/511330/apple-173.svg" className="h-5 w-5" alt="Apple" />
            Continue with Apple
          </button>
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-slate-500">or</span>
          </div>
        </div>

        <form className="mt-8 space-y-4" onSubmit={(e) => { e.preventDefault(); onNavigate(Page.HOME); }}>
          <div>
            <input
              type="email"
              required
              className="appearance-none relative block w-full px-4 py-3 border border-slate-300 placeholder-slate-400 text-slate-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="What is the email address?"
            />
          </div>
          
          <div>
            <input
              type="email"
              required
              className="appearance-none relative block w-full px-4 py-3 border border-slate-300 placeholder-slate-400 text-slate-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Verify your email"
            />
          </div>

          <div className="relative">
            <input
              type="password"
              required
              className="appearance-none relative block w-full px-4 py-3 border border-slate-300 placeholder-slate-400 text-slate-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Password"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
              <Eye className="h-5 w-5 text-slate-400" />
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="privacy"
                  name="privacy"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="privacy" className="font-medium text-slate-700">
                  I consent to BookMyDoctor processing my health data in order to use the services. <a href="#" className="text-blue-600">Find out more</a>
                </label>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="marketing"
                  name="marketing"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="marketing" className="font-medium text-slate-700">
                  I want to receive commercial communications from BookMyDoctor (optional). <a href="#" className="text-blue-600">Find out more</a>
                </label>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <Button type="submit" className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow-none">
              Sign up for free
            </Button>
            <p className="mt-4 text-xs text-slate-500 text-center">
              By registering, you confirm that you agree to our <a href="#" className="text-blue-600">terms and conditions</a> and that you understand our <a href="#" className="text-blue-600">privacy policy</a>.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};