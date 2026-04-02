import React from 'react';
import { Page, Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { ArrowLeft, User, Mail, Lock, Eye } from 'lucide-react';
import { Button } from './Button';

interface SignUpPatientProps {
  onNavigate: (page: Page) => void;
  language: Language;
}

export const SignUpPatient: React.FC<SignUpPatientProps> = ({ onNavigate, language }) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8">
        <button 
          onClick={() => onNavigate(Page.SIGN_UP)} 
          className="flex items-center text-slate-400 font-black uppercase text-[10px] tracking-widest hover:text-sky-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-1" /> {t.back}
        </button>
      </div>

      <div className="max-w-md w-full bg-white p-10 rounded-[40px] shadow-2xl shadow-sky-100 border border-slate-100">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t.createAccount}</h2>
          <p className="text-slate-400 font-bold text-sm mt-2">{t.joinForEasyBooking}</p>
        </div>

        <div className="space-y-4">
          <button className="w-full flex justify-center items-center gap-3 px-4 py-4 border border-slate-100 rounded-2xl text-slate-700 bg-slate-50 hover:bg-white hover:border-sky-200 font-black text-xs uppercase tracking-widest transition-all">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="h-5 w-5" alt="Google" />
            {t.continueWithGoogle}
          </button>
          
          <button className="w-full flex justify-center items-center gap-3 px-4 py-4 border border-slate-100 rounded-2xl text-slate-700 bg-slate-50 hover:bg-white hover:border-sky-200 font-black text-xs uppercase tracking-widest transition-all">
            <img src="https://www.svgrepo.com/show/511330/apple-173.svg" className="h-5 w-5" alt="Apple" />
            {t.continueWithApple}
          </button>
        </div>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-100"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-4 bg-white text-slate-300 font-black uppercase tracking-widest">{t.orEmail}</span>
          </div>
        </div>

        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onNavigate(Page.HOME); }}>
          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
              <input
                type="text"
                required
                className="block w-full pl-12 pr-6 py-4 bg-slate-50 border-none rounded-2xl text-slate-900 placeholder:text-slate-400 font-bold focus:ring-4 focus:ring-sky-100 outline-none transition-all"
                placeholder={t.fullName}
              />
            </div>
            
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
              <input
                type="email"
                required
                className="block w-full pl-12 pr-6 py-4 bg-slate-50 border-none rounded-2xl text-slate-900 placeholder:text-slate-400 font-bold focus:ring-4 focus:ring-sky-100 outline-none transition-all"
                placeholder={t.emailAddress}
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
              <input
                type="password"
                required
                className="block w-full pl-12 pr-12 py-4 bg-slate-50 border-none rounded-2xl text-slate-900 placeholder:text-slate-400 font-bold focus:ring-4 focus:ring-sky-100 outline-none transition-all"
                placeholder={t.password}
              />
              <div className="absolute inset-y-0 right-0 pr-6 flex items-center cursor-pointer">
                <Eye className="h-5 w-5 text-slate-300 hover:text-sky-500" />
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
                  className="h-5 w-5 text-sky-600 focus:ring-sky-500 border-slate-200 rounded-lg cursor-pointer"
                />
              </div>
              <div className="ml-3 text-xs font-bold text-slate-500 leading-relaxed">
                <label htmlFor="privacy">
                  {t.consentMsg} <a href="#" className="text-sky-600 hover:underline">{t.findOutMore}</a>
                </label>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <Button type="submit" className="w-full py-5 rounded-2xl font-black text-lg shadow-xl shadow-sky-100">
              {t.signUpForFree}
            </Button>
            <p className="mt-6 text-[10px] text-slate-400 text-center font-black uppercase tracking-widest leading-relaxed">
              {t.byRegistering} <a href="#" className="text-sky-600 underline">{t.terms}</a> {t.and} <a href="#" className="text-sky-600 underline">{t.privacyPolicy}</a>.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
