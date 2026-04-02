import React, { useState } from 'react';
import { Page, Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { Button } from './Button';
// Fixed: Added Users to imports
import { Shield, Star, Users, ArrowLeft, CheckCircle, FileText, Lock, ChevronRight } from 'lucide-react';

interface SignUpSpecialistProps {
  onNavigate: (page: Page) => void;
  language: Language;
}

export const SignUpSpecialist: React.FC<SignUpSpecialistProps> = ({ onNavigate, language }) => {
  const t = TRANSLATIONS[language];
  const [step, setStep] = useState(1);

  const steps = [
    { id: 1, name: t.basicInfo },
    { id: 2, name: t.licensing },
    { id: 3, name: t.account },
    { id: 4, name: t.agreement },
    { id: 5, name: t.approval }
  ];

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 5) setStep(step + 1);
    else onNavigate(Page.HOME);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col relative overflow-x-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 -mr-64 -mt-64 w-[800px] h-[800px] bg-sky-50 rounded-full blur-3xl opacity-60"></div>
      
      <div className="absolute top-6 left-6 z-20">
        <button 
          onClick={() => step > 1 ? setStep(step - 1) : onNavigate(Page.SIGN_UP)} 
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm text-slate-500 hover:text-sky-600 transition-all font-bold text-sm border border-slate-100"
        >
          <ArrowLeft className="w-4 h-4" /> {t.back}
        </button>
      </div>

      <div className="max-w-6xl mx-auto w-full px-6 py-20 relative z-10">
        {/* Registration Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6">{t.joinAsDoctor}</h1>
          <p className="text-lg text-slate-500 font-medium">{t.joinAsDoctorDesc}</p>
        </div>

        {/* Multi-step Tracker */}
        <div className="flex justify-between max-w-3xl mx-auto mb-16 relative">
          <div className="absolute top-5 left-0 w-full h-1 bg-slate-200 -z-10"></div>
          <div 
            className="absolute top-5 left-0 h-1 bg-sky-500 -z-10 transition-all duration-700 ease-in-out" 
            style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
          ></div>
          {steps.map((s) => (
            <div key={s.id} className="flex flex-col items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black border-4 transition-all duration-500 ${
                step >= s.id ? 'bg-sky-600 text-white border-sky-100 scale-110' : 'bg-white text-slate-300 border-slate-100'
              }`}>
                {step > s.id ? <CheckCircle className="w-6 h-6" /> : s.id}
              </div>
              <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${step >= s.id ? 'text-sky-600' : 'text-slate-400'}`}>
                {s.name}
              </span>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Form Container */}
          <div className="lg:col-span-8 bg-white p-8 md:p-12 rounded-[48px] shadow-2xl shadow-sky-100/30 border border-slate-100">
            {step === 1 && (
              <form onSubmit={handleNext} className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.firstName} *</label>
                    <input type="text" required className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-sky-500 outline-none font-bold text-slate-700" placeholder="e.g. John" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.lastName} *</label>
                    <input type="text" required className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-sky-500 outline-none font-bold text-slate-700" placeholder="e.g. Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.primarySpecialty} *</label>
                  <select className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-sky-500 outline-none font-bold text-slate-700">
                    <option>{t.generalPhysician}</option>
                    <option>{t.cardiologist}</option>
                    <option>{t.dermatologist}</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.experienceYears} *</label>
                  <input type="number" required className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-sky-500 outline-none font-bold text-slate-700" placeholder="e.g. 10" />
                </div>
                <Button type="submit" className="w-full py-5 rounded-[20px] font-black text-lg tracking-wide shadow-xl shadow-sky-200 bg-sky-600 hover:bg-sky-700 text-white">
                  {t.createDoctorProfile} <ChevronRight className="ml-2 w-6 h-6" />
                </Button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleNext} className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="p-8 bg-sky-50/50 rounded-[32px] border border-sky-100 border-dashed text-center">
                   <FileText className="w-12 h-12 text-sky-500 mx-auto mb-4" />
                   <h3 className="text-xl font-black text-slate-900 mb-2">{t.uploadLicense}</h3>
                   <p className="text-sm text-slate-500 font-medium mb-6">{t.uploadLicenseDesc}</p>
                   <input type="file" className="hidden" id="license-upload" />
                   <label htmlFor="license-upload" className="inline-block px-8 py-3 bg-white border-2 border-sky-200 rounded-xl font-black text-xs text-sky-600 hover:bg-sky-50 transition-all cursor-pointer">
                     {t.chooseFile}
                   </label>
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.licenseNumber} *</label>
                   <input type="text" required className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-sky-500 outline-none font-bold text-slate-700" placeholder="UAE-MED-XXXX" />
                </div>
                <Button type="submit" className="w-full py-5 rounded-[20px] font-black text-lg tracking-wide shadow-xl shadow-sky-200 bg-sky-600 hover:bg-sky-700 text-white">
                  {t.verifyLicense} <ChevronRight className="ml-2 w-6 h-6" />
                </Button>
              </form>
            )}

            {step === 3 && (
              <form onSubmit={handleNext} className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.workEmailAddress} *</label>
                  <input type="email" required className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-sky-500 outline-none font-bold text-slate-700" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.contactPhone} *</label>
                  <input type="tel" required className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-sky-500 outline-none font-bold text-slate-700" placeholder="05X XXX XXXX" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.securePassword} *</label>
                  <div className="relative">
                    <input type="password" required className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-sky-500 outline-none font-bold text-slate-700" />
                    <Lock className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                  </div>
                </div>
                <Button type="submit" className="w-full py-5 rounded-[20px] font-black text-lg tracking-wide shadow-xl shadow-sky-200 bg-sky-600 hover:bg-sky-700 text-white">
                  {t.continue} <ChevronRight className="ml-2 w-6 h-6" />
                </Button>
              </form>
            )}

            {step === 4 && (
              <form onSubmit={handleNext} className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="bg-slate-50 p-8 rounded-[32px] border border-slate-100 max-h-60 overflow-y-auto text-sm text-slate-600 leading-relaxed font-medium">
                  <h4 className="font-black text-slate-900 mb-4 uppercase text-[10px] tracking-widest">{t.platformTerms}</h4>
                  <p className="mb-4">{t.platformTermsDesc1}</p>
                  <p className="mb-4">{t.platformTermsDesc2}</p>
                  <p>{t.platformTermsDesc3}</p>
                </div>
                <div className="flex items-center gap-4 p-6 bg-sky-50 rounded-2xl border border-sky-100">
                   <input type="checkbox" required className="w-6 h-6 rounded-lg text-sky-600 focus:ring-sky-500 cursor-pointer" id="agree" />
                   <label htmlFor="agree" className="text-sm font-bold text-sky-900">{t.acceptTerms}</label>
                </div>
                <Button type="submit" className="w-full py-5 rounded-[20px] font-black text-lg tracking-wide shadow-xl shadow-sky-200 bg-sky-600 hover:bg-sky-700 text-white">
                  {t.completeRegistration} <ChevronRight className="ml-2 w-6 h-6" />
                </Button>
              </form>
            )}

            {step === 5 && (
              <div className="text-center py-10 animate-in fade-in zoom-in duration-500">
                <div className="mx-auto w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mb-8 shadow-xl shadow-emerald-100">
                   <CheckCircle className="w-12 h-12 text-emerald-600" />
                </div>
                <h3 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">{t.applicationReceived}</h3>
                <p className="text-slate-600 text-xl font-medium leading-relaxed max-w-sm mx-auto mb-10">
                  {t.applicationReceivedDesc}
                </p>
                <div className="p-8 bg-slate-50 rounded-[40px] border border-slate-100 text-left mb-10 relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-full bg-sky-500/5 rotate-12 -mr-10"></div>
                   <div className="space-y-4 relative">
                      <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-slate-400">
                        <span>{t.identityCheck}</span>
                        <span className="text-emerald-600">{t.completed}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-slate-400">
                        <span>{t.licenseValidation}</span>
                        <span className="text-amber-600">{t.inProgress}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-slate-400">
                        <span>{t.profileVisibility}</span>
                        <span className="text-slate-400">{t.offline}</span>
                      </div>
                   </div>
                </div>
                <div className="space-y-4">
                  <Button onClick={() => onNavigate(Page.HOME)} className="w-full py-5 rounded-[20px] font-black text-lg shadow-xl bg-slate-900 hover:bg-black text-white">{t.visitMarketplace}</Button>
                  
                  <button 
                    onClick={() => {
                      const message = `Hi, I just registered as a specialist on BookMyDoctor and I'm waiting for approval. I'd like to chat with the team.`;
                      window.open(`https://wa.me/${TRANSLATIONS[language].whatsappSupport.replace('+', '')}?text=${encodeURIComponent(message)}`, '_blank');
                    }}
                    className="w-full py-5 rounded-2xl font-black text-lg border-2 border-sky-500 text-sky-600 hover:bg-sky-50 flex items-center justify-center gap-2 transition-all"
                  >
                    <Users className="w-6 h-6" /> {t.chatWithOurTeam}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Side Info/Benefits */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-slate-900 text-white p-8 md:p-10 rounded-[40px] shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/20 rounded-full blur-3xl"></div>
               <h3 className="text-2xl font-black mb-8 leading-tight">{t.whySpecialistsChooseUs}</h3>
               <ul className="space-y-6">
                  <li className="flex gap-4">
                     <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center shrink-0">
                        <Users className="w-5 h-5 text-sky-300" />
                     </div>
                     <div>
                        <div className="font-black text-sm mb-1">{t.targetedReach}</div>
                        <div className="text-xs text-sky-200 font-medium">{t.targetedReachDesc}</div>
                     </div>
                  </li>
                  <li className="flex gap-4">
                     <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center shrink-0">
                        <Star className="w-5 h-5 text-sky-300" />
                     </div>
                     <div>
                        <div className="font-black text-sm mb-1">{t.verifiedTrust}</div>
                        <div className="text-xs text-sky-200 font-medium">{t.verifiedTrustDesc}</div>
                     </div>
                  </li>
                  <li className="flex gap-4">
                     <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center shrink-0">
                        <Shield className="w-5 h-5 text-sky-300" />
                     </div>
                     <div>
                        <div className="font-black text-sm mb-1">{t.dhaCompliant}</div>
                        <div className="text-xs text-sky-200 font-medium">{t.dhaCompliantDesc}</div>
                     </div>
                  </li>
               </ul>
            </div>
            
            <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-100/50">
               <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">{t.supportTeam}</h4>
               <p className="text-sm font-bold text-slate-700 leading-relaxed">
                 {t.supportTeamDesc}
               </p>
               <button 
                onClick={() => {
                  const message = `Hi, I need help with my registration as a specialist on BookMyDoctor.`;
                  window.open(`https://wa.me/${TRANSLATIONS[language].whatsappSupport.replace('+', '')}?text=${encodeURIComponent(message)}`, '_blank');
                }}
                className="mt-4 text-sky-600 font-black text-sm border-b-2 border-sky-100 hover:border-sky-600 transition-all"
               >
                 {t.chatWithSpecialistSupport}
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};