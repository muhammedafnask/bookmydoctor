import React from 'react';
import { Page } from '../types';
import { Button } from './Button';
import { Users, Gem, TrendingUp, ArrowLeft } from 'lucide-react';

interface SignUpClinicProps {
  onNavigate: (page: Page) => void;
}

export const SignUpClinic: React.FC<SignUpClinicProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col relative">
       <div className="absolute top-4 left-4">
        <button 
          onClick={() => onNavigate(Page.SIGN_UP)} 
          className="flex items-center text-slate-500 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-1" /> Back
        </button>
      </div>

       <div className="flex-grow flex flex-col md:flex-row max-w-7xl mx-auto w-full pt-8 md:pt-0">
         
         {/* Left Side - Form */}
         <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Register as a Medical Center</h2>
            
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onNavigate(Page.HOME); }}>
               <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Name of clinic/facility *</label>
                  <input type="text" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
               </div>

               <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">How many specialists work at the centre? *</label>
                  <select className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white">
                     <option>---Choose---</option>
                     <option>1-5</option>
                     <option>6-20</option>
                     <option>20+</option>
                  </select>
               </div>

               <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">City *</label>
                  <input type="text" placeholder="Introduce the city" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
               </div>

               <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Management program used (optional)</label>
                  <select className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white">
                     <option>Select from list</option>
                     <option>Other</option>
                  </select>
               </div>

               <div className="pt-6">
                  <Button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-none rounded-md">
                     Sign up for free
                  </Button>
               </div>
               
               <div className="text-center pt-4">
                  <span className="text-slate-600">Not a healthcare professional? </span>
                  <button onClick={() => onNavigate(Page.HOME)} className="text-blue-600 font-medium hover:underline">Return</button>
               </div>
               
               <p className="text-xs text-slate-400 mt-8">* Required field</p>
            </form>
         </div>

         {/* Right Side - Info */}
         <div className="w-full md:w-1/2 bg-slate-50 p-8 md:p-12 lg:p-16 border-l border-slate-100 flex flex-col justify-center">
             <h2 className="text-3xl font-bold text-slate-900 mb-2">Boost your facility's prestige</h2>
             <h3 className="text-xl font-bold text-slate-900 mb-12">You will notice the results month by month</h3>
             
             <div className="space-y-8">
                <div className="flex gap-4">
                   <div className="flex-shrink-0">
                      <Users className="w-8 h-8 text-teal-600" />
                   </div>
                   <div>
                      <p className="text-slate-700 font-medium text-lg">Reach <span className="font-bold">3.5 million patients per month</span></p>
                   </div>
                </div>

                <div className="flex gap-4">
                   <div className="flex-shrink-0">
                      <Gem className="w-8 h-8 text-teal-600" />
                   </div>
                   <div>
                      <p className="text-slate-700 font-medium text-lg">Put your doctors on <span className="font-bold">the world's leading health platform</span></p>
                   </div>
                </div>

                <div className="flex gap-4">
                   <div className="flex-shrink-0">
                      <TrendingUp className="w-8 h-8 text-teal-600" />
                   </div>
                   <div>
                      <p className="text-slate-700 font-medium text-lg">Reduce patient absenteeism <span className="text-slate-500 font-normal">by up to 85%</span></p>
                   </div>
                </div>
             </div>
         </div>

       </div>
    </div>
  );
};