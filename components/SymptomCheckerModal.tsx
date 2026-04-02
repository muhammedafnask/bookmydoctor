import React, { useState } from 'react';
import { X, Activity, Loader2, ChevronRight, AlertTriangle, Stethoscope } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { geminiService } from '../services/geminiService';
import { Button } from './Button';
import { cn } from '../lib/utils';

interface SymptomCheckerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSpecialty: (specialty: string) => void;
  language: 'EN' | 'HI';
}

export const SymptomCheckerModal: React.FC<SymptomCheckerModalProps> = ({ isOpen, onClose, onSelectSpecialty }) => {
  const [symptoms, setSymptoms] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    analysis: string;
    recommendedSpecialty: string;
    urgency: string;
    disclaimer: string;
  } | null>(null);

  const handleCheck = async () => {
    if (!symptoms.trim() || isLoading) return;
    setIsLoading(true);
    try {
      const data = await geminiService.checkSymptoms(symptoms);
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-[48px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="p-8 md:p-12 overflow-y-auto">
              <button 
                onClick={onClose}
                className="absolute top-8 right-8 p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-slate-400" />
              </button>

              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-sky-50 rounded-2xl flex items-center justify-center">
                  <Activity className="w-8 h-8 text-sky-600" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">AI Symptom Checker</h2>
                  <p className="text-slate-500 font-bold">Powered by Gemini AI</p>
                </div>
              </div>

              {!result ? (
                <div className="space-y-8">
                  <p className="text-lg text-slate-600 font-medium leading-relaxed">
                    Describe how you're feeling. Our AI will analyze your symptoms and suggest the right specialist for you.
                  </p>
                  
                  <div className="relative">
                    <textarea
                      value={symptoms}
                      onChange={(e) => setSymptoms(e.target.value)}
                      placeholder="E.g., I have a persistent headache and feel dizzy when I stand up..."
                      className="w-full p-8 bg-slate-50 border-none rounded-[32px] focus:ring-4 focus:ring-sky-100 outline-none transition-all resize-none text-slate-700 font-bold h-48"
                    />
                  </div>

                  <Button 
                    onClick={handleCheck}
                    disabled={isLoading || !symptoms.trim()}
                    className="w-full py-6 rounded-[24px] text-xl font-black shadow-xl shadow-sky-100"
                  >
                    {isLoading ? <Loader2 className="w-6 h-6 animate-spin mr-3" /> : <ChevronRight className="w-6 h-6 mr-2" />}
                    Analyze Symptoms
                  </Button>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <div className="p-8 bg-sky-50 rounded-[32px] border border-sky-100">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                        result.urgency === 'High' || result.urgency === 'Emergency' ? "bg-rose-100 text-rose-600" : "bg-sky-100 text-sky-600"
                      )}>
                        Urgency: {result.urgency}
                      </div>
                    </div>
                    <p className="text-lg text-slate-700 font-bold leading-relaxed mb-6">
                      {result.analysis}
                    </p>
                    <div className="flex items-center gap-4 p-6 bg-white rounded-2xl border border-sky-100 shadow-sm">
                      <div className="w-12 h-12 bg-sky-600 rounded-xl flex items-center justify-center text-white">
                        <Stethoscope className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Recommended Specialist</div>
                        <div className="text-xl font-black text-slate-900">{result.recommendedSpecialty}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-6 bg-amber-50 rounded-[24px] border border-amber-100">
                    <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
                    <p className="text-sm text-amber-800 font-bold leading-relaxed">
                      {result.disclaimer}
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <Button 
                      variant="outline" 
                      onClick={() => setResult(null)}
                      className="flex-1 py-5 rounded-[20px] font-black border-2"
                    >
                      Check Again
                    </Button>
                    <Button 
                      onClick={() => {
                        onSelectSpecialty(result.recommendedSpecialty);
                        onClose();
                      }}
                      className="flex-[2] py-5 rounded-[20px] font-black shadow-xl shadow-sky-100"
                    >
                      Find {result.recommendedSpecialty}s
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
