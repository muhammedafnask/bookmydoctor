import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, MessageSquare, CheckCircle, Send, Loader2, User, Bot } from 'lucide-react';
import { Button } from './Button';
import { Page, Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { geminiService } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AskExpertProps {
  onNavigate: (page: Page) => void;
  language: Language;
}

export const AskExpert: React.FC<AskExpertProps> = ({ onNavigate, language }) => {
  const t = TRANSLATIONS[language];
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        role: 'assistant',
        content: language === 'EN' 
          ? "Hello! I'm HealthBuddy, your AI Health Assistant. How can I help you today? You can describe your symptoms, ask about medical conditions, or get general health advice."
          : "नमस्ते! मैं हेल्थ बडी हूँ, आपका AI स्वास्थ्य सहायक। आज मैं आपकी कैसे मदद कर सकता हूँ? आप अपने लक्षणों का वर्णन कर सकते हैं, चिकित्सा स्थितियों के बारे में पूछ सकते हैं, या सामान्य स्वास्थ्य सलाह ले सकते हैं।",
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [language, messages.length]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await geminiService.askMedicalExpert(input, language);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response || (language === 'EN' ? "Sorry, I couldn't process that." : "क्षमा करें, मैं उसे संसाधित नहीं कर सका।"),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-[calc(100vh-80px)] relative flex flex-col">
       <div className="absolute top-4 left-4 md:left-8 z-20">
        <button 
          onClick={() => onNavigate(Page.HOME)} 
          className="flex items-center text-slate-400 font-black uppercase text-[10px] tracking-widest hover:text-sky-600 transition-colors bg-white/80 backdrop-blur-sm p-2 rounded-lg"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> {t.back}
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-16 w-full flex-grow flex flex-col">
        
        {/* Header Section - Only show if only welcome message */}
        <AnimatePresence>
          {messages.length <= 1 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col md:flex-row items-center justify-between mb-12"
            >
              <div className="md:w-1/2 mb-12 md:mb-0 pr-0 md:pr-12">
                <div className="inline-flex items-center gap-2 bg-sky-50 text-sky-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
                   <MessageSquare className="w-3.5 h-3.5" /> Healthcare Knowledge
                </div>
                <h1 className="text-5xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
                  {t.aiAssistant}
                </h1>
                <p className="text-xl text-slate-500 font-medium mb-10 leading-relaxed">
                  {language === 'EN' ? "Describe your symptoms or ask any health-related questions. HealthBuddy is here to help you 24/7." : "अपने लक्षणों का वर्णन करें या स्वास्थ्य संबंधी कोई भी प्रश्न पूछें। हेल्थ बडी आपकी 24/7 मदद के लिए यहाँ है।"}
                </p>
                
                <div className="space-y-4 mb-10">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Quick Questions</p>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { en: "Common cold symptoms", hi: "सामान्य सर्दी के लक्षण" },
                      { en: "How to manage stress?", hi: "तनाव को कैसे प्रबंधित करें?" },
                      { en: "Healthy diet tips", hi: "स्वस्थ आहार के टिप्स" },
                      { en: "When to see a doctor?", hi: "डॉक्टर को कब दिखाएं?" }
                    ].map((q, i) => (
                      <button 
                        key={i}
                        onClick={() => {
                          setInput(language === 'EN' ? q.en : q.hi);
                        }}
                        className="px-4 py-2 bg-white border border-slate-100 rounded-xl text-xs font-bold text-slate-600 hover:border-sky-500 hover:text-sky-600 transition-all shadow-sm"
                      >
                        {language === 'EN' ? q.en : q.hi}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  {[
                    language === 'EN' ? "Reliable and high-quality responses from certified doctors" : "प्रमाणित डॉक्टरों से विश्वसनीय और उच्च गुणवत्ता वाली प्रतिक्रियाएं",
                    language === 'EN' ? "Your doubt will be resolved within 48 hours" : "आपकी शंका का समाधान 48 घंटों के भीतर किया जाएगा",
                    language === 'EN' ? "Completely anonymous and 100% for free" : "पूरी तरह से गुमनाम और 100% मुफ्त"
                  ].map((text, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="flex-shrink-0 bg-sky-100 p-1.5 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-sky-600" />
                      </div>
                      <span className="text-slate-700 font-bold">{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:w-1/2 flex justify-center">
                <div className="relative">
                  <div className="absolute top-0 right-0 -mr-12 -mt-12 w-40 h-40 bg-sky-50 rounded-full blur-3xl opacity-60"></div>
                  <div className="absolute bottom-0 left-0 -ml-12 -mb-12 w-48 h-48 bg-sky-100 rounded-full blur-3xl opacity-40"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=600&auto=format&fit=crop" 
                    alt="Doctor Consultation" 
                    className="relative z-10 w-full max-w-md h-auto rounded-[48px] shadow-2xl border-4 border-white grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Area */}
        <div className={cn(
          "flex-grow flex flex-col bg-slate-50 rounded-[48px] border border-slate-100 relative overflow-hidden transition-all duration-500",
          messages.length > 0 ? "h-[600px]" : "h-auto p-8 md:p-16"
        )}>
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-600/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
          
          {messages.length > 0 ? (
            <div className="flex-grow flex flex-col overflow-hidden p-6 md:p-10">
              <div 
                ref={scrollRef}
                className="flex-grow overflow-y-auto space-y-6 pr-4 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent"
              >
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={cn(
                      "flex gap-4 max-w-[85%]",
                      msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                    )}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm",
                      msg.role === 'user' ? "bg-sky-600 text-white" : "bg-white text-sky-600 border border-slate-100"
                    )}>
                      {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                    </div>
                    <div className={cn(
                      "p-4 md:p-6 rounded-[24px] text-sm md:text-base font-medium leading-relaxed shadow-sm",
                      msg.role === 'user' 
                        ? "bg-sky-600 text-white rounded-tr-none" 
                        : "bg-white text-slate-700 rounded-tl-none border border-slate-100"
                    )}>
                      <div className="prose prose-sm max-w-none prose-slate">
                        <ReactMarkdown>
                          {msg.content}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <div className="flex gap-4 mr-auto max-w-[85%]">
                    <div className="w-10 h-10 rounded-2xl bg-white text-sky-600 border border-slate-100 flex items-center justify-center shrink-0 shadow-sm">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div className="p-6 rounded-[24px] rounded-tl-none bg-white border border-slate-100 shadow-sm">
                      <Loader2 className="w-5 h-5 animate-spin text-sky-600" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <h2 className="text-3xl font-black text-slate-900 mb-8 tracking-tight relative z-10">{t.yourQuestion}</h2>
          )}
          
          <form 
            className={cn(
              "relative z-10 p-6 md:p-10 bg-white/50 backdrop-blur-sm border-t border-slate-100",
              messages.length === 0 && "bg-transparent border-none p-0"
            )} 
            onSubmit={handleSubmit}
          >
            <div className="relative group">
              <textarea 
                rows={messages.length > 0 ? 1 : 4}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey && messages.length > 0) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                placeholder={language === 'EN' ? "Write your medical query here..." : "अपनी चिकित्सा संबंधी शंका यहाँ लिखें..."}
                className={cn(
                  "w-full p-6 md:p-8 bg-white border-none rounded-[32px] focus:ring-4 focus:ring-sky-100 outline-none transition-all resize-none text-slate-700 font-bold shadow-lg group-hover:shadow-xl",
                  messages.length > 0 && "pr-16 py-4 rounded-[24px]"
                )}
              ></textarea>
              
              {messages.length > 0 && (
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-sky-600 text-white rounded-xl flex items-center justify-center hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                </button>
              )}
            </div>
            
            {messages.length === 0 && (
              <>
                <div className="grid sm:grid-cols-2 gap-4 mt-8">
                   {[
                     language === 'EN' ? "Question is posted anonymously" : "प्रश्न गुमनाम रूप से पोस्ट किया गया है",
                     language === 'EN' ? "Keep your query clear and brief" : "अपनी शंका स्पष्ट और संक्षिप्त रखें",
                     language === 'EN' ? "Addressed to all platform specialists" : "सभी प्लेटफॉर्म विशेषज्ञों को संबोधित",
                     language === 'EN' ? "Not a substitute for clinical consultation" : "नैदानिक परामर्श का विकल्प नहीं"
                   ].map((tip, i) => (
                     <div key={i} className="flex items-center gap-3 text-sm text-slate-400 font-bold">
                       <div className="w-1.5 h-1.5 rounded-full bg-sky-500"></div>
                       {tip}
                     </div>
                   ))}
                </div>

                <div className="pt-6">
                  <Button 
                    type="submit" 
                    disabled={isLoading || !input.trim()}
                    className="w-full sm:w-auto px-12 py-5 bg-sky-600 hover:bg-sky-700 text-white font-black rounded-2xl shadow-xl shadow-sky-100 transition-all"
                  >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
                    {t.sendQuestion}
                  </Button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
