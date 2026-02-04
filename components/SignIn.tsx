import React from 'react';
import { Button } from './Button';
import { Page } from '../types';
import { Eye, ArrowLeft } from 'lucide-react';

export const SignIn: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
       <div className="absolute top-4 left-4 sm:top-8 sm:left-8">
        <button 
          onClick={() => onNavigate(Page.HOME)} 
          className="flex items-center text-slate-400 font-black uppercase text-[10px] tracking-widest hover:text-brand-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back Home
        </button>
      </div>

      <div className="max-w-md w-full bg-white p-10 rounded-[40px] shadow-2xl shadow-brand-100 border border-slate-100">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Welcome back</h2>
          <p className="text-slate-400 font-bold text-sm mt-2">Sign in to manage your health</p>
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
            <div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-slate-900 placeholder:text-slate-400 font-bold focus:ring-4 focus:ring-brand-100 outline-none transition-all"
                placeholder="Email Address"
              />
            </div>
            <div className="relative">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-slate-900 placeholder:text-slate-400 font-bold focus:ring-4 focus:ring-brand-100 outline-none transition-all"
                placeholder="Password"
              />
              <div className="absolute inset-y-0 right-0 pr-6 flex items-center cursor-pointer">
                <Eye className="h-5 w-5 text-slate-300 hover:text-brand-500" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button type="button" className="text-xs font-black text-brand-600 hover:text-brand-700 uppercase tracking-widest">
              Forgot password?
            </button>
          </div>

          <Button type="submit" className="w-full py-5 rounded-2xl font-black text-lg shadow-xl shadow-brand-100">
            SIGN IN
          </Button>
          
          <div className="pt-6 border-t border-slate-100 text-center">
             <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">No account? </span>
             <button 
               type="button" 
               onClick={() => onNavigate(Page.SIGN_UP)}
               className="text-xs font-black text-brand-600 hover:text-brand-800 ml-1 uppercase tracking-widest"
             >
               Register Now
             </button>
          </div>
        </form>
      </div>
    </div>
  );
};