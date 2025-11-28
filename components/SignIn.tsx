import React from 'react';
import { Button } from './Button';
import { Page } from '../types';
import { Eye, ArrowLeft } from 'lucide-react';

interface SignInProps {
  onNavigate: (page: Page) => void;
}

export const SignIn: React.FC<SignInProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
       <div className="absolute top-4 left-4 sm:top-8 sm:left-8">
        <button 
          onClick={() => onNavigate(Page.HOME)} 
          className="flex items-center text-slate-500 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-1" /> Back
        </button>
      </div>

      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900">Log in to your account</h2>
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

        <form className="mt-8 space-y-6" onSubmit={(e) => { e.preventDefault(); onNavigate(Page.HOME); }}>
          <div className="space-y-4">
            <div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none relative block w-full px-4 py-3 border border-slate-300 placeholder-slate-400 text-slate-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Email"
              />
            </div>
            <div className="relative">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none relative block w-full px-4 py-3 border border-slate-300 placeholder-slate-400 text-slate-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Password"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
                <Eye className="h-5 w-5 text-slate-400" />
              </div>
            </div>
          </div>

          <div>
            <Button type="submit" className="w-full py-3">
              Sign in
            </Button>
          </div>

          <div className="flex items-center justify-center">
            <button type="button" className="text-sm font-medium text-blue-600 hover:text-blue-500">
              I forgot my password
            </button>
          </div>
          
          <div className="pt-6 border-t border-slate-100 text-center">
             <span className="text-slate-600 text-sm">Still no account? </span>
             <button 
               type="button" 
               onClick={() => onNavigate(Page.SIGN_UP)}
               className="text-sm font-bold text-blue-600 hover:text-blue-800"
             >
               I want to register
             </button>
          </div>
        </form>
      </div>
    </div>
  );
};