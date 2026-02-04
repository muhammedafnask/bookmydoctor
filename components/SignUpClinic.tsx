import React, { useState } from 'react';
import { Page } from '../types';
import { Button } from './Button';
import { Users, Gem, TrendingUp, ArrowLeft, CheckCircle, Building, ShieldCheck, CreditCard, ChevronRight } from 'lucide-react';

interface SignUpClinicProps {
  onNavigate: (page: Page) => void;
}

export const SignUpClinic: React.FC<SignUpClinicProps> = ({ onNavigate }) => {
  const [step, setStep] = useState(1);

  const steps = [
    { id: 1, name: 'Clinic Info' },
    { id: 2, name: 'Admin Account' },
    { id: 3, name: 'Doctors' },
    { id: 4, name: 'Subscription' },
    { id: 5, name: 'Verification' }
  ];

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 5) setStep(step + 1);
    else onNavigate(Page.HOME);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col relative">
      <div className="absolute top-6 left-6 z-20">
        <button 
          onClick={() => step > 1 ? setStep(step - 1) : onNavigate(Page.SIGN_UP)} 
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm text-slate-500 hover:text-brand-600 transition-all font-bold text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> {step > 1 ? 'Previous Step' : 'Back'}
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
                    step >= s.id ? 'bg-brand-600 text-white border-brand-100' : 'bg-white text-slate-300 border-slate-50 shadow-sm'
                  }`}>
                    {step > s.id ? <CheckCircle className="w-6 h-6" /> : s.id}
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-widest hidden sm:block ${step >= s.id ? 'text-brand-600' : 'text-slate-400'}`}>
                    {s.name}
                  </span>
                </div>
              ))}
            </div>
            <div className="w-full bg-white h-2 rounded-full overflow-hidden shadow-inner p-0.5">
              <div 
                className="bg-brand-500 h-full rounded-full transition-all duration-700 ease-out" 
                style={{ width: `${(step / 5) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-2xl shadow-brand-100/50 border border-slate-100">
            {step === 1 && (
              <form onSubmit={handleNext} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="mb-8">
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">Register Your Clinic – It’s Free</h2>
                  <p className="text-slate-500 font-medium">Fill in your basic details and start receiving appointment requests today.</p>
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Facility Name *</label>
                  <input type="text" required className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-500 outline-none font-bold text-slate-700" placeholder="e.g. City Health Center" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">DHA License Number *</label>
                    <input type="text" required className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-500 outline-none font-bold text-slate-700" placeholder="DHA-XXXX-XXXX" />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">City *</label>
                    <select className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-500 outline-none font-bold text-slate-700">
                      <option>Dubai</option>
                      <option>Abu Dhabi</option>
                      <option>Sharjah</option>
                    </select>
                  </div>
                </div>
                <Button type="submit" className="w-full py-5 rounded-2xl font-black text-lg tracking-wide shadow-xl shadow-brand-200">
                  GET STARTED FREE <ChevronRight className="ml-2 w-6 h-6" />
                </Button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleNext} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="mb-8">
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">Admin Account</h2>
                  <p className="text-slate-500 font-medium">Create credentials for the clinic manager.</p>
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Admin Full Name *</label>
                  <input type="text" required className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-500 outline-none font-bold text-slate-700" />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Work Email *</label>
                  <input type="email" required className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-500 outline-none font-bold text-slate-700" />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Password *</label>
                  <input type="password" required className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-500 outline-none font-bold text-slate-700" />
                </div>
                <Button type="submit" className="w-full py-5 rounded-2xl font-black text-lg tracking-wide shadow-xl shadow-brand-200">
                  CONTINUE TO DOCTORS <ChevronRight className="ml-2 w-6 h-6" />
                </Button>
              </form>
            )}

            {step === 3 && (
              <form onSubmit={handleNext} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="mb-8">
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">Add Your Doctors</h2>
                  <p className="text-slate-500 font-medium">You can add your primary specialists now or later.</p>
                </div>
                <div className="p-6 border-4 border-dashed border-slate-100 rounded-[32px] bg-slate-50/50 flex flex-col items-center justify-center text-center">
                   <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                      <Users className="w-8 h-8 text-brand-600" />
                   </div>
                   <h3 className="text-lg font-black text-slate-900 mb-2">No doctors added yet</h3>
                   <Button variant="outline" type="button" className="px-6 py-2 rounded-xl text-xs font-black border-2">ADD FIRST DOCTOR</Button>
                </div>
                <Button type="submit" className="w-full py-5 rounded-2xl font-black text-lg tracking-wide shadow-xl shadow-brand-200">
                  SKIP TO SUBSCRIPTION <ChevronRight className="ml-2 w-6 h-6" />
                </Button>
              </form>
            )}

            {step === 4 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="mb-4">
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">Subscription Plan</h2>
                  <p className="text-slate-500 font-medium">Choose a package for your listing.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-[32px] border-4 border-brand-500 bg-brand-50/30 relative">
                     <div className="absolute -top-4 right-6 bg-brand-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Most Popular</div>
                     <h3 className="text-xl font-black text-slate-900 mb-2">Marketplace Plus</h3>
                     <div className="text-4xl font-black text-brand-700 mb-4">AED 499<span className="text-sm font-bold text-slate-400">/mo</span></div>
                     <ul className="space-y-3 mb-8">
                        <li className="flex items-center gap-2 text-sm font-bold text-slate-600"><CheckCircle className="w-4 h-4 text-brand-500" /> Unlimited Bookings</li>
                        <li className="flex items-center gap-2 text-sm font-bold text-slate-600"><CheckCircle className="w-4 h-4 text-brand-500" /> WhatsApp Confirmations</li>
                        <li className="flex items-center gap-2 text-sm font-bold text-slate-600"><CheckCircle className="w-4 h-4 text-brand-500" /> Priority in Search</li>
                     </ul>
                     <Button className="w-full rounded-2xl py-3 font-black">SELECT PLAN</Button>
                  </div>
                   <div className="p-6 rounded-[32px] border-4 border-slate-100 bg-white">
                     <h3 className="text-xl font-black text-slate-900 mb-2">Starter</h3>
                     <div className="text-4xl font-black text-slate-900 mb-4">FREE<span className="text-sm font-bold text-slate-400"> (3 Months)</span></div>
                     <ul className="space-y-3 mb-8">
                        <li className="flex items-center gap-2 text-sm font-bold text-slate-600"><CheckCircle className="w-4 h-4 text-slate-300" /> Basic Listing</li>
                        <li className="flex items-center gap-2 text-sm font-bold text-slate-600"><CheckCircle className="w-4 h-4 text-slate-300" /> SMS Confirmations</li>
                        <li className="flex items-center gap-2 text-sm font-bold text-slate-400"><CheckCircle className="w-4 h-4 text-slate-200" /> No Priority</li>
                     </ul>
                     <Button variant="outline" className="w-full rounded-2xl py-3 font-black border-2" onClick={() => setStep(5)}>TRY FOR FREE</Button>
                  </div>
                </div>
                <div className="flex justify-center">
                   <Button variant="outline" className="border-none text-slate-400 font-bold text-sm" onClick={() => setStep(5)}>Already have a contract? Skip</Button>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="text-center py-10 animate-in fade-in zoom-in duration-500">
                <div className="mx-auto w-24 h-24 bg-brand-50 rounded-full flex items-center justify-center mb-8 shadow-xl shadow-brand-100">
                   <ShieldCheck className="w-12 h-12 text-brand-600" />
                </div>
                <h3 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Reviewing License</h3>
                <p className="text-slate-600 text-xl font-medium leading-relaxed max-w-sm mx-auto mb-10">
                  Our team is manually verifying your DHA/MOH license. We'll notify you via email within 24 hours.
                </p>
                <div className="p-6 bg-slate-50 rounded-[40px] border border-slate-100 text-left mb-10">
                   <div className="flex items-center gap-4 text-slate-500">
                      <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
                      <span className="font-black uppercase text-[10px] tracking-widest">Verification Status: PENDING</span>
                   </div>
                </div>
                <Button onClick={() => onNavigate(Page.HOME)} className="w-full py-5 rounded-2xl font-black text-lg shadow-xl">BACK TO MARKETPLACE</Button>
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Trust & Stats */}
        <div className="w-full lg:w-2/5 bg-brand-900 p-8 md:p-12 lg:p-16 text-white flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl font-black mb-12 tracking-tight leading-tight">Elevate Your Practice's Digital Presence</h2>
            
            <div className="space-y-10">
              <div className="flex gap-6 group">
                <div className="w-14 h-14 bg-brand-800 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-brand-500 transition-colors">
                  <Users className="w-8 h-8 text-brand-300 group-hover:text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-black mb-1">50,000+ Monthly Visitors</h4>
                  <p className="text-brand-200/60 font-medium">Join the largest healthcare discovery platform in the UAE.</p>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="w-14 h-14 bg-brand-800 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-brand-500 transition-colors">
                  <TrendingUp className="w-8 h-8 text-brand-300 group-hover:text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-black mb-1">85% Lower No-Shows</h4>
                  <p className="text-brand-200/60 font-medium">Automated WhatsApp & SMS reminders keep your slots filled.</p>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="w-14 h-14 bg-brand-800 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-brand-500 transition-colors">
                  <ShieldCheck className="w-8 h-8 text-brand-300 group-hover:text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-black mb-1">DHA/MOH Compliant</h4>
                  <p className="text-brand-200/60 font-medium">A platform built around local healthcare regulations.</p>
                </div>
              </div>
            </div>

            <div className="mt-20 p-8 bg-brand-800/50 rounded-[40px] border border-brand-700 backdrop-blur-sm">
               <div className="flex items-center gap-4 mb-4">
                  <div className="flex -space-x-4">
                     {[1,2,3].map(i => (
                       <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} className="w-12 h-12 rounded-full border-4 border-brand-800 shadow-xl" alt="" />
                     ))}
                  </div>
                  <div className="text-xs font-bold text-brand-300 uppercase tracking-widest">+250 Clinics Online</div>
               </div>
               <p className="italic text-brand-100 font-medium leading-relaxed">
                 "Switching to BookMyDoctor increased our patient bookings by 40% in just two months. The dashboard is incredibly intuitive."
               </p>
               <div className="mt-4 font-black text-sm">— Dr. Sarah, Clinic Director</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};