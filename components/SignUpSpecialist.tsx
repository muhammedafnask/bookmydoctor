import React from 'react';
import { Page } from '../types';
import { Button } from './Button';
import { Eye, MapPin, Calendar, Shield, Search, Star, User, ArrowLeft } from 'lucide-react';

interface SignUpSpecialistProps {
  onNavigate: (page: Page) => void;
}

export const SignUpSpecialist: React.FC<SignUpSpecialistProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 relative">
       <div className="absolute top-4 left-4 sm:top-8 sm:left-8">
        <button 
          onClick={() => onNavigate(Page.SIGN_UP)} 
          className="flex items-center text-slate-500 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-1" /> Back
        </button>
      </div>

      <div className="max-w-6xl mx-auto pt-8">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900">Create your free professional profile on BookMyDoctor</h1>
          <p className="text-slate-600 mt-2 text-lg">More than 4 million patients visit our platform every month. Show up in searches and attract the right patients, at no cost.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Form Section */}
          <div className="flex-1 w-full bg-transparent">
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onNavigate(Page.HOME); }}>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">First Name(s)</label>
                  <input type="text" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Last Name(s)</label>
                  <input type="text" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Specialty</label>
                  <div className="relative">
                    <input type="text" placeholder="" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all" />
                    <Search className="absolute right-3 top-3.5 h-5 w-5 text-slate-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Practice Location</label>
                  <div className="relative">
                    <input type="text" placeholder="Enter city" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all" />
                    <Search className="absolute right-3 top-3.5 h-5 w-5 text-slate-400" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Mobile Phone Number</label>
                <p className="text-xs text-slate-500 mb-2">We need your phone to set up your account. It won't show up on your profile.</p>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    defaultValue="+34"
                    className="w-24 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all text-center" 
                  />
                  <input type="tel" className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
                 <input type="email" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all" />
                 <p className="text-xs text-slate-500 mt-1">We need your email to set up your account. It won't show up on your profile.</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
                 <div className="relative">
                    <input type="password" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all" />
                    <Eye className="absolute right-3 top-3.5 h-5 w-5 text-slate-400 cursor-pointer" />
                 </div>
              </div>

              <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="notifications"
                      name="notifications"
                      type="checkbox"
                      className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="notifications" className="font-medium text-slate-700">
                      I want to receive profile statistics, notifications about reviews, and information about BookMyDoctor's functionalities.
                      <span className="block text-slate-500 font-normal">You can choose not to receive these messages at any time.</span>
                    </label>
                  </div>
              </div>

              <div className="pt-4 border-t border-slate-200">
                 <p className="text-sm text-slate-600 mb-6">
                   By registering, you confirm that you agree to our <a href="#" className="text-teal-600 underline">terms and conditions</a> and that you understand our <a href="#" className="text-teal-600 underline">privacy policy</a>.
                 </p>
                 <Button type="submit" className="bg-teal-700 hover:bg-teal-800 text-white font-bold py-3 px-8 rounded-lg w-auto float-right shadow-none">
                   Create a Specialist Account
                 </Button>
              </div>

            </form>
          </div>

          {/* Preview Section */}
          <div className="hidden lg:block w-96">
            <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-6 sticky top-24">
              <div className="w-10 h-10 mb-6">
                 {/* Logo placeholder */}
                 <div className="text-teal-500 font-bold text-2xl">*</div> 
              </div>

              {/* Fake Search Bar */}
              <div className="bg-slate-50 rounded-full h-10 w-full mb-8 border border-slate-100 flex items-center px-4">
                 <Search className="h-4 w-4 text-slate-300 ml-auto" />
              </div>

              {/* Profile Card Preview */}
              <div className="flex gap-4 mb-6">
                 <div className="h-16 w-16 bg-slate-200 rounded-lg flex-shrink-0 flex items-end justify-center overflow-hidden text-slate-400">
                    <User className="h-16 w-16 relative top-2" />
                 </div>
                 <div>
                    <div className="text-slate-900 font-bold">Your Name</div>
                    <div className="text-teal-500 text-sm">Your specialty · Your city</div>
                    <div className="flex gap-1 text-teal-400 mt-1">
                       <Star className="h-3 w-3 fill-current" />
                       <Star className="h-3 w-3 fill-current" />
                       <Star className="h-3 w-3 fill-current" />
                       <Star className="h-3 w-3 fill-current" />
                       <Star className="h-3 w-3 fill-current" />
                    </div>
                 </div>
              </div>

              {/* Layout for Details and Map - Side by Side */}
              <div className="flex gap-4">
                 {/* Left side details */}
                 <div className="flex-1 space-y-3 mb-6">
                    <div className="flex gap-3 items-center">
                       <MapPin className="h-4 w-4 text-slate-300" />
                       <div className="h-2 w-full bg-slate-100 rounded"></div>
                    </div>
                    <div className="flex gap-3 items-center">
                       <Calendar className="h-4 w-4 text-slate-300" />
                       <div className="h-2 w-3/4 bg-slate-100 rounded"></div>
                    </div>
                    <div className="flex gap-3 items-center">
                       <Shield className="h-4 w-4 text-slate-300" />
                       <div className="h-2 w-1/2 bg-slate-100 rounded"></div>
                    </div>
                 </div>
                 
                 {/* Right side Map */}
                 <div className="w-24 h-24 bg-slate-100 rounded-lg overflow-hidden relative border border-slate-100">
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:8px_8px]"></div>
                    <div className="absolute bottom-1 right-1 h-6 w-6 bg-teal-100 rounded-full flex items-center justify-center">
                        <div className="h-2 w-2 bg-teal-400 rounded-full"></div>
                    </div>
                 </div>
              </div>


              {/* Text Placeholders */}
               <div className="mt-4 space-y-2 opacity-50">
                 <div className="h-2 w-full bg-slate-100 rounded"></div>
                 <div className="h-2 w-5/6 bg-slate-100 rounded"></div>
                 <div className="h-2 w-full bg-slate-100 rounded"></div>
                 <div className="h-2 w-4/5 bg-slate-100 rounded"></div>
               </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};