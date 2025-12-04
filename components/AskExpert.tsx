import React from 'react';
import { Page } from '../types';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from './Button';

interface AskExpertProps {
  onNavigate: (page: Page) => void;
}

export const AskExpert: React.FC<AskExpertProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white min-h-[calc(100vh-80px)] relative">
       <div className="absolute top-4 left-4 md:left-8">
        <button 
          onClick={() => onNavigate(Page.HOME)} 
          className="flex items-center text-slate-500 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-1" /> Back
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-16">
        
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-16">
          <div className="md:w-1/2 mb-8 md:mb-0 pr-0 md:pr-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Ask the Expert</h1>
            <p className="text-xl text-slate-600 mb-8">
              You will be able to answer, anonymously, all your health queries.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-teal-500" fill="currentColor" color="white" />
                </div>
                <span className="text-slate-700 font-medium">You will receive a reliable and quality response</span>
              </div>
              <div className="flex items-center gap-3">
                 <div className="flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-teal-500" fill="currentColor" color="white" />
                </div>
                <span className="text-slate-700 font-medium">Your doubt will be resolved within 48 hours</span>
              </div>
              <div className="flex items-center gap-3">
                 <div className="flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-teal-500" fill="currentColor" color="white" />
                </div>
                <span className="text-slate-700 font-medium">And, of course, for free</span>
              </div>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center">
            {/* Illustration */}
            <div className="relative">
              <div className="absolute top-0 right-0 -mr-8 -mt-8 w-20 h-20 bg-yellow-100 rounded-full opacity-50"></div>
              <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-32 h-32 bg-teal-50 rounded-full opacity-50"></div>
              <img 
                src="https://img.freepik.com/free-vector/doctor-concept-illustration_114360-1269.jpg?t=st=1710000000~exp=1710003600~hmac=abcdef" 
                alt="Doctor Consultation Illustration" 
                className="relative z-10 w-full max-w-md h-auto rounded-lg mix-blend-multiply"
                // Fallback to a simple placeholder if external images fail or for better performance
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop";
                  e.currentTarget.classList.add('rounded-2xl', 'shadow-lg');
                }}
              />
            </div>
          </div>
        </div>

        {/* Question Form Section */}
        <div className="bg-teal-50 rounded-2xl p-8 border border-teal-100">
          <h2 className="text-lg font-bold text-slate-900 mb-6">Your question</h2>
          <form className="space-y-6">
            <div className="relative">
              <textarea
                className="w-full h-48 p-4 bg-white border border-slate-200 rounded-xl resize-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-shadow text-slate-700 placeholder:text-slate-400"
                placeholder="Write your question here..."
              ></textarea>
              <div className="absolute bottom-4 right-4 text-slate-400 text-xs">
                Min. 50 characters
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
               <ul className="text-xs text-slate-500 space-y-1 list-disc pl-4">
                 <li>Your question will be posted anonymously.</li>
                 <li>Try to keep your medical visit clear and brief.</li>
                 <li>The question will be addressed to all specialists, not to a specific one.</li>
               </ul>
               <Button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 w-full md:w-auto">
                 Send question
               </Button>
            </div>
            
             <p className="text-[10px] text-slate-400 mt-4 border-t border-teal-100 pt-4">
                This service is not a substitute for a consultation with a healthcare professional. If you have a problem or emergency, go to your doctor or emergency services.
             </p>
          </form>
        </div>
      </div>
    </div>
  );
};