import React from 'react';
import { Page } from '../types';
import { CheckCircle, ArrowLeft, MessageSquare } from 'lucide-react';
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
          className="flex items-center text-slate-400 font-black uppercase text-[10px] tracking-widest hover:text-brand-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-16">
        
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-24">
          <div className="md:w-1/2 mb-12 md:mb-0 pr-0 md:pr-12">
            <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
               <MessageSquare className="w-3.5 h-3.5" /> Healthcare Knowledge
            </div>
            <h1 className="text-5xl font-black text-slate-900 mb-6 tracking-tight leading-tight">Ask the Expert</h1>
            <p className="text-xl text-slate-500 font-medium mb-10 leading-relaxed">
              Resolve your health queries anonymously within 48 hours, free of charge.
            </p>
            
            <div className="space-y-6">
              {[
                "Reliable and high-quality responses from certified doctors",
                "Your doubt will be resolved within 48 hours",
                "Completely anonymous and 100% for free"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="flex-shrink-0 bg-brand-100 p-1.5 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-brand-600" />
                  </div>
                  <span className="text-slate-700 font-bold">{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="absolute top-0 right-0 -mr-12 -mt-12 w-40 h-40 bg-brand-50 rounded-full blur-3xl opacity-60"></div>
              <div className="absolute bottom-0 left-0 -ml-12 -mb-12 w-48 h-48 bg-brand-100 rounded-full blur-3xl opacity-40"></div>
              <img 
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=600&auto=format&fit=crop" 
                alt="Doctor Consultation" 
                className="relative z-10 w-full max-w-md h-auto rounded-[48px] shadow-2xl border-4 border-white grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-slate-50 rounded-[48px] p-8 md:p-16 border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-600/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
          
          <h2 className="text-3xl font-black text-slate-900 mb-8 tracking-tight relative z-10">Your Question</h2>
          
          <form className="space-y-8 relative z-10" onSubmit={(e) => { e.preventDefault(); alert('Question Sent!'); onNavigate(Page.HOME); }}>
            <div>
              <textarea 
                rows={6}
                placeholder="Write your medical query here..."
                className="w-full p-8 bg-white border-none rounded-[32px] focus:ring-4 focus:ring-brand-100 outline-none transition-all resize-none text-slate-700 font-bold shadow-sm"
              ></textarea>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4">
               {[
                 "Question is posted anonymously",
                 "Keep your query clear and brief",
                 "Addressed to all platform specialists",
                 "Not a substitute for clinical consultation"
               ].map((tip, i) => (
                 <div key={i} className="flex items-center gap-3 text-sm text-slate-400 font-bold">
                   <div className="w-1.5 h-1.5 rounded-full bg-brand-500"></div>
                   {tip}
                 </div>
               ))}
            </div>

            <div className="pt-6">
              <Button type="submit" className="w-full sm:w-auto px-12 py-5 bg-brand-600 hover:bg-brand-700 text-white font-black rounded-2xl shadow-xl shadow-brand-100 transition-all">
                SEND QUESTION
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};