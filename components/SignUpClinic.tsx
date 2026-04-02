import React, { useState } from 'react';
import { Page, Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { Button } from './Button';
import { Users, ArrowLeft, CheckCircle, ShieldCheck, ChevronRight, Clock } from 'lucide-react';

interface SignUpClinicProps {
  onNavigate: (page: Page) => void;
  language: Language;
}

export const SignUpClinic: React.FC<SignUpClinicProps> = ({ onNavigate, language }) => {
  const t = TRANSLATIONS[language];
  const [step, setStep] = useState(1);

  const steps = [
    { id: 1, name: t.clinicInfo },
    { id: 2, name: t.adminAccount },
    { id: 3, name: t.doctors },
    { id: 4, name: t.subscription },
    { id: 5, name: t.verification }
  ];

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 5) setStep(step + 1);
    else onNavigate(Page.HOME);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col relative">
      <div className="absolute top-6 left-6 z-20">
        <button 
          onClick={() => step > 1 ? setStep(step - 1) : onNavigate(Page.SIGN_UP)} 
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm text-slate-500 hover:text-sky-600 transition-all font-bold text-sm border border-slate-100"
        >
          <ArrowLeft className="w-4 h-4" /> {step > 1 ? t.previousStep : t.back}
        </button>
      </div>

      <div className="flex-grow flex flex-col lg:flex-row max-w-7xl mx-auto w-full pt-20 lg:pt-0">
        
        {/* Left Side - Form Content */}
        <div className="w-full lg:w-3/5 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          
          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex justify-between mb-4">
              {steps.map((s) => (
                <div key={s.id} className="flex flex-col items-center gap-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black transition-all border-4 ${
                    step >= s.id ? 'bg-sky-600 text-white border-sky-100' : 'bg-white text-slate-300 border-slate-50 shadow-sm'
                  }`}>
                    {step > s.id ? <CheckCircle className="w-6 h-6" /> : s.id}
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-widest hidden sm:block ${step >= s.id ? 'text-sky-600' : 'text-slate-400'}`}>
                    {s.name}
                  </span>
                </div>
              ))}
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden shadow-inner p-0.5">
              <div 
                className="bg-sky-500 h-full rounded-full transition-all duration-700 ease-out" 
                style={{ width: `${(step / 5) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-2xl shadow-sky-100/50 border border-slate-100">
            {step === 1 && (
              <form onSubmit={handleNext} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="mb-8">
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t.registerClinicFree}</h2>
                  <p className="text-slate-500 font-medium">{t.registerClinicFreeDesc}</p>
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">{t.facilityName} *</label>
                  <input type="text" required className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-sky-500 outline-none font-bold text-slate-700" placeholder="e.g. City Health Center" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">{t.dhaLicenseNumber} *</label>
                    <input type="text" required className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-sky-500 outline-none font-bold text-slate-700" placeholder="DHA-XXXX-XXXX" />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">{t.city} *</label>
                    <select className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-sky-500 outline-none font-bold text-slate-700">
                      <option>{t.selectCity}</option>
                      <option>Dubai</option>
                      <option>Abu Dhabi</option>
                      <option>Sharjah</option>
                    </select>
                  </div>
                </div>
                <Button type="submit" className="w-full py-5 rounded-2xl font-black text-lg tracking-wide shadow-xl shadow-sky-200 bg-sky-600 hover:bg-sky-700 text-white">
                  {t.getStartedFree} <ChevronRight className="ml-2 w-6 h-6" />
                </Button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleNext} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="mb-8">
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t.adminAccount}</h2>
                  <p className="text-slate-500 font-medium">Create credentials for the clinic manager.</p>
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">{t.adminFullName} *</label>
                  <input type="text" required className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-sky-500 outline-none font-bold text-slate-700" />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">{t.workEmail} *</label>
                  <input type="email" required className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-sky-500 outline-none font-bold text-slate-700" />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">{t.password} *</label>
                  <input type="password" required className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-sky-500 outline-none font-bold text-slate-700" />
                </div>
                <Button type="submit" className="w-full py-5 rounded-2xl font-black text-lg tracking-wide shadow-xl shadow-sky-200 bg-sky-600 hover:bg-sky-700 text-white">
                  {t.continueToDoctors} <ChevronRight className="ml-2 w-6 h-6" />
                </Button>
              </form>
            )}

            {step === 3 && (
              <form onSubmit={handleNext} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="mb-8">
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t.addYourDoctors}</h2>
                  <p className="text-slate-500 font-medium">{t.addYourDoctorsDesc}</p>
                </div>
                <div className="p-6 border-4 border-dashed border-slate-100 rounded-[32px] bg-slate-50/50 flex flex-col items-center justify-center text-center">
                   <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                      <Users className="w-8 h-8 text-sky-600" />
                   </div>
                   <h3 className="text-lg font-black text-slate-900 mb-2">{t.noDoctorsAdded}</h3>
                   <Button variant="outline" type="button" className="px-6 py-2 rounded-xl text-xs font-black border-2 border-sky-500 text-sky-600 hover:bg-sky-50">{t.addFirstDoctor}</Button>
                </div>
                <Button type="submit" className="w-full py-5 rounded-2xl font-black text-lg tracking-wide shadow-xl shadow-sky-200 bg-sky-600 hover:bg-sky-700 text-white">
                  {t.skipToSubscription} <ChevronRight className="ml-2 w-6 h-6" />
                </Button>
              </form>
            )}

            {step === 4 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="mb-4">
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t.subscriptionPlan}</h2>
                  <p className="text-slate-500 font-medium">{t.subscriptionPlanDesc}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-[32px] border-4 border-sky-500 bg-sky-50/30 relative">
                     <div className="absolute -top-4 right-6 bg-sky-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{t.mostPopular}</div>
                     <h3 className="text-xl font-black text-slate-900 mb-2">{t.marketplacePlus}</h3>
                     <div className="text-4xl font-black text-sky-700 mb-4">AED 499<span className="text-sm font-bold text-slate-400">/mo</span></div>
                     <ul className="space-y-3 mb-8">
                        <li className="flex items-center gap-2 text-sm font-bold text-slate-600"><CheckCircle className="w-4 h-4 text-sky-500" /> {t.unlimitedBookings}</li>
                        <li className="flex items-center gap-2 text-sm font-bold text-slate-600"><CheckCircle className="w-4 h-4 text-sky-500" /> {t.whatsappConfirmations}</li>
                        <li className="flex items-center gap-2 text-sm font-bold text-slate-600"><CheckCircle className="w-4 h-4 text-sky-500" /> {t.priorityInSearch}</li>
                     </ul>
                     <Button className="w-full rounded-2xl py-3 font-black bg-sky-600 hover:bg-sky-700 text-white">{t.selectPlan}</Button>
                  </div>
                   <div className="p-6 rounded-[32px] border-4 border-slate-100 bg-white">
                     <h3 className="text-xl font-black text-slate-900 mb-2">{t.starter}</h3>
                     <div className="text-4xl font-black text-slate-900 mb-4">FREE<span className="text-sm font-bold text-slate-400"> ({t.free3Months})</span></div>
                     <ul className="space-y-3 mb-8">
                        <li className="flex items-center gap-2 text-sm font-bold text-slate-600"><CheckCircle className="w-4 h-4 text-slate-300" /> {t.basicListing}</li>
                        <li className="flex items-center gap-2 text-sm font-bold text-slate-600"><CheckCircle className="w-4 h-4 text-slate-300" /> {t.smsConfirmations}</li>
                        <li className="flex items-center gap-2 text-sm font-bold text-slate-400"><CheckCircle className="w-4 h-4 text-slate-200" /> {t.noPriority}</li>
                     </ul>
                     <Button variant="outline" className="w-full rounded-2xl py-3 font-black border-2 border-slate-200 text-slate-700 hover:bg-slate-50" onClick={() => setStep(5)}>{t.tryForFree}</Button>
                  </div>
                </div>
                <div className="flex justify-center">
                   <Button variant="outline" className="border-none text-slate-400 font-bold text-sm hover:text-sky-600" onClick={() => setStep(5)}>{t.alreadyHaveContract}</Button>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="text-center py-10 animate-in fade-in zoom-in duration-500">
                <div className="mx-auto w-24 h-24 bg-sky-50 rounded-full flex items-center justify-center mb-8 shadow-xl shadow-sky-100">
                   <ShieldCheck className="w-12 h-12 text-sky-600" />
                </div>
                <h3 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">{t.reviewingLicense}</h3>
                <p className="text-slate-600 text-xl font-medium leading-relaxed max-w-sm mx-auto mb-10">
                  {t.reviewingLicenseDesc}
                </p>
                <div className="p-6 bg-slate-50 rounded-[40px] border border-slate-100 text-left mb-10">
                   <div className="flex items-center gap-4 text-slate-500">
                      <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
                      <span className="font-black uppercase text-[10px] tracking-widest">{t.verificationStatus}: {t.pending}</span>
                   </div>
                </div>
                <div className="space-y-4">
                  <Button onClick={() => onNavigate(Page.HOME)} className="w-full py-5 rounded-2xl font-black text-lg shadow-xl bg-slate-900 hover:bg-black text-white">{t.visitMarketplace}</Button>
                  
                  <button 
                    onClick={() => {
                      const message = `Hi, I just registered my clinic on BookMyDoctor and I'm waiting for verification. I'd like to chat with the team.`;
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
        </div>

        {/* Right Side - Trust & Stats */}
        <div className="w-full lg:w-2/5 bg-slate-900 p-8 md:p-12 lg:p-16 text-white flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 bg-sky-600/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl font-black mb-12 tracking-tight leading-tight">{t.elevatePractice}</h2>
            
            <div className="space-y-10">
              <div className="flex gap-6 group">
                <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-sky-500 transition-colors">
                  <Users className="w-8 h-8 text-sky-300 group-hover:text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-black mb-1">{t.monthlyVisitors}</h4>
                  <p className="text-slate-400 font-medium">{t.monthlyVisitorsDesc}</p>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-sky-500 transition-colors">
                  <Clock className="w-8 h-8 text-sky-300 group-hover:text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-black mb-1">{t.lowerNoShows}</h4>
                  <p className="text-slate-400 font-medium">{t.lowerNoShowsDesc}</p>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-sky-500 transition-colors">
                  <ShieldCheck className="w-8 h-8 text-sky-300 group-hover:text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-black mb-1">{t.dhaCompliant}</h4>
                  <p className="text-slate-400 font-medium">{t.dhaCompliantDesc}</p>
                </div>
              </div>
            </div>

            <div className="mt-20 p-8 bg-slate-800/50 rounded-[40px] border border-slate-700 backdrop-blur-sm">
               <div className="flex items-center gap-4 mb-4">
                  <div className="flex -space-x-4">
                     {[1,2,3].map(i => (
                       <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} className="w-12 h-12 rounded-full border-4 border-slate-800 shadow-xl" alt="" />
                     ))}
                  </div>
                  <div className="text-xs font-bold text-sky-300 uppercase tracking-widest">{t.clinicsOnline}</div>
               </div>
               <p className="italic text-slate-300 font-medium leading-relaxed">
                 {t.clinicTestimonial}
               </p>
               <div className="mt-4 font-black text-sm">— {t.clinicDirector}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
