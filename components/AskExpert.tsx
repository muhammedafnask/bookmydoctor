import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Loader2, User, Bot, Image as ImageIcon, Mic, MicOff, Volume2, VolumeX, X, Sparkles } from 'lucide-react';
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
  suggestedQuestions?: string[];
  image?: string;
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
  const [selectedImage, setSelectedImage] = useState<{ data: string, mimeType: string } | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        role: 'assistant',
        content: language === 'EN' 
          ? "Hello! I'm HealthBuddy, your AI Health Assistant. How can I help you today? You can describe your symptoms, upload a photo of a rash or injury, or ask any health questions."
          : "नमस्ते! मैं हेल्थ बडी हूँ, आपका AI स्वास्थ्य सहायक। आज मैं आपकी कैसे मदद कर सकता हूँ? आप अपने लक्षणों का वर्णन कर सकते हैं, दाने या चोट की फोटो अपलोड कर सकते हैं, या कोई भी स्वास्थ्य प्रश्न पूछ सकते हैं।",
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [language, messages.length]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isLoading]);

  const parseFollowUpQuestions = (text: string) => {
    const startTag = '[FOLLOW_UP_START]';
    const endTag = '[FOLLOW_UP_END]';
    const startIndex = text.indexOf(startTag);
    const endIndex = text.indexOf(endTag);

    if (startIndex !== -1 && endIndex !== -1) {
      const questionsPart = text.substring(startIndex + startTag.length, endIndex).trim();
      const cleanText = text.replace(text.substring(startIndex, endIndex + endTag.length), '').trim();
      
      const questions = questionsPart
        .split('\n')
        .map(q => q.replace(/^-\s*/, '').trim())
        .filter(q => q.length > 0);
      
      return { cleanText, questions };
    }
    return { cleanText: text, questions: [] };
  };

  const handleClearChat = () => {
    setMessages([]);
    setSelectedImage(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage({
          data: (reader.result as string).split(',')[1],
          mimeType: file.type
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const startListening = () => {
    interface SpeechRecognitionEvent extends Event {
      results: {
        [key: number]: {
          [key: number]: {
            transcript: string;
          };
        };
      };
    }

    interface SpeechRecognitionInstance {
      lang: string;
      onstart: () => void;
      onend: () => void;
      onresult: (event: SpeechRecognitionEvent) => void;
      start: () => void;
    }

    const SpeechRecognition = (window as Window & { SpeechRecognition?: new () => SpeechRecognitionInstance; webkitSpeechRecognition?: new () => SpeechRecognitionInstance }).SpeechRecognition || 
                        (window as Window & { SpeechRecognition?: new () => SpeechRecognitionInstance; webkitSpeechRecognition?: new () => SpeechRecognitionInstance }).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in your browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = language === 'EN' ? 'en-US' : 'hi-IN';
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: { results: { [key: number]: { [key: number]: { transcript: string } } } }) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };
    recognition.start();
  };

  const playTTS = async (text: string, messageId: string) => {
    if (isSpeaking === messageId) {
      if (audioRef.current) {
        audioRef.current.pause();
        setIsSpeaking(null);
      }
      return;
    }

    setIsSpeaking(messageId);
    try {
      const base64Audio = await geminiService.textToSpeech(text, language);
      if (base64Audio) {
        const audioUrl = `data:audio/wav;base64,${base64Audio}`;
        if (audioRef.current) {
          audioRef.current.src = audioUrl;
          audioRef.current.play();
          audioRef.current.onended = () => setIsSpeaking(null);
        } else {
          const audio = new Audio(audioUrl);
          audioRef.current = audio;
          audio.play();
          audio.onended = () => setIsSpeaking(null);
        }
      }
    } catch (error) {
      console.error("TTS Error:", error);
      setIsSpeaking(null);
    }
  };

  const handleSubmit = async (e?: React.FormEvent, overrideInput?: string) => {
    if (e) e.preventDefault();
    const messageText = overrideInput || input;
    if (!messageText.trim() && !selectedImage) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date(),
      image: selectedImage ? `data:${selectedImage.mimeType};base64,${selectedImage.data}` : undefined
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    const currentImage = selectedImage;
    setSelectedImage(null);
    setIsLoading(true);

    try {
      const history = messages.map(msg => ({
        role: (msg.role === 'user' ? 'user' : 'model') as 'user' | 'model',
        parts: [{ text: msg.content }]
      }));

      const response = await geminiService.chatWithHealthBuddy(messageText, history, language, currentImage || undefined);
      
      if (response) {
        const { cleanText, questions } = parseFollowUpQuestions(response);
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: cleanText,
          timestamp: new Date(),
          suggestedQuestions: questions
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        throw new Error("No response");
      }
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: language === 'EN' ? "Sorry, I'm having trouble connecting. Please try again." : "क्षमा करें, मुझे जुड़ने में समस्या हो रही है। कृपया पुनः प्रयास करें।",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const SPECIALTIES = [
    "General Physician", "Dentist", "Cardiologist", "Dermatologist", 
    "Neurologist", "Orthopedist", "Psychologist", "Gynecologist", 
    "ENT", "Ophthalmologist"
  ];

  const detectSpecialty = (text: string) => {
    for (const specialty of SPECIALTIES) {
      if (text.toLowerCase().includes(specialty.toLowerCase())) {
        return specialty;
      }
    }
    return null;
  };

  const handleSpecialtyClick = () => {
    onNavigate(Page.SEARCH);
  };

  return (
    <div className="bg-white min-h-[calc(100vh-80px)] relative flex flex-col">
       <div className="absolute top-4 left-4 md:left-8 z-20 flex items-center gap-4">
        <button 
          onClick={() => onNavigate(Page.HOME)} 
          className="flex items-center text-slate-400 font-black uppercase text-[10px] tracking-widest hover:text-sky-600 transition-colors bg-white/80 backdrop-blur-sm p-2 rounded-lg border border-slate-100"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> {t.back}
        </button>
        {messages.length > 1 && (
          <button 
            onClick={handleClearChat}
            className="flex items-center text-slate-400 font-black uppercase text-[10px] tracking-widest hover:text-rose-600 transition-colors bg-white/80 backdrop-blur-sm p-2 rounded-lg border border-slate-100"
          >
            {language === 'EN' ? "Clear Chat" : "चैट साफ़ करें"}
          </button>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-16 w-full flex-grow flex flex-col">
        
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
                   <Sparkles className="w-3.5 h-3.5" /> Advanced AI HealthBuddy
                </div>
                <h1 className="text-5xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
                  {t.aiAssistant}
                </h1>
                <p className="text-xl text-slate-500 font-medium mb-10 leading-relaxed">
                  {language === 'EN' 
                    ? "Your personal AI health companion. Ask about symptoms, wellness, or medical conditions with confidence. Now supports voice and image analysis." 
                    : "आपका व्यक्तिगत AI स्वास्थ्य साथी। आत्मविश्वास के साथ लक्षणों, कल्याण या चिकित्सा स्थितियों के बारे में पूछें। अब आवाज और छवि विश्लेषण का समर्थन करता है।"}
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
                          handleSubmit(undefined, language === 'EN' ? q.en : q.hi);
                        }}
                        className="px-4 py-2 bg-white border border-slate-100 rounded-xl text-xs font-bold text-slate-600 hover:border-sky-500 hover:text-sky-600 transition-all shadow-sm"
                      >
                        {language === 'EN' ? q.en : q.hi}
                      </button>
                    ))}
                  </div>
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

        <div className={cn(
          "flex-grow flex flex-col bg-slate-50 rounded-[48px] border border-slate-100 relative overflow-hidden transition-all duration-500",
          messages.length > 0 ? "h-[650px]" : "h-auto p-8 md:p-16"
        )}>
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-600/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
          
          {messages.length > 0 ? (
            <div className="flex-grow flex flex-col overflow-hidden">
              <div 
                ref={scrollRef}
                className="flex-grow overflow-y-auto space-y-6 p-6 md:p-10 pr-4 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent"
              >
                {messages.map((msg, idx) => (
                  <div key={msg.id} className="space-y-4">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
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
                        "p-4 md:p-6 rounded-[24px] text-sm md:text-base font-medium leading-relaxed shadow-sm relative group/msg",
                        msg.role === 'user' 
                          ? "bg-sky-600 text-white rounded-tr-none" 
                          : "bg-white text-slate-700 rounded-tl-none border border-slate-100"
                      )}>
                        {msg.role === 'assistant' && (
                          <button 
                            onClick={() => playTTS(msg.content, msg.id)}
                            className="absolute -right-12 top-0 p-2 text-slate-400 hover:text-sky-600 transition-colors"
                          >
                            {isSpeaking === msg.id ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                          </button>
                        )}
                        {msg.image && (
                          <div className="mb-4 rounded-xl overflow-hidden border border-white/20 shadow-md">
                            <img src={msg.image} alt="User upload" className="max-w-full h-auto max-h-60 object-cover" />
                          </div>
                        )}
                        <div className="prose prose-sm max-w-none prose-slate prose-p:leading-relaxed prose-headings:font-black prose-headings:text-slate-900 prose-strong:text-sky-700">
                          <ReactMarkdown>
                            {msg.content}
                          </ReactMarkdown>
                        </div>

                        {msg.role === 'assistant' && detectSpecialty(msg.content) && (
                          <div className="mt-6 pt-4 border-t border-slate-100">
                            <button 
                              onClick={() => handleSpecialtyClick(detectSpecialty(msg.content)!)}
                              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-sky-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-sky-700 transition-all shadow-md group/btn"
                            >
                              Find {detectSpecialty(msg.content)} Doctors
                              <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.div>

                    {msg.role === 'assistant' && msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && idx === messages.length - 1 && !isLoading && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="ml-14 flex flex-wrap gap-2"
                      >
                        {msg.suggestedQuestions.map((q, i) => (
                          <button
                            key={i}
                            onClick={() => handleSubmit(undefined, q)}
                            className="px-4 py-2 bg-sky-50 border border-sky-100 rounded-full text-xs font-bold text-sky-700 hover:bg-sky-100 transition-all"
                          >
                            {q}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-4 mr-auto max-w-[85%]">
                    <div className="w-10 h-10 rounded-2xl bg-white text-sky-600 border border-slate-100 flex items-center justify-center shrink-0 shadow-sm">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div className="p-6 rounded-[24px] rounded-tl-none bg-white border border-slate-100 shadow-sm flex items-center gap-2">
                      <div className="flex gap-1">
                        <motion.div 
                          animate={{ scale: [1, 1.2, 1] }} 
                          transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                          className="w-2 h-2 bg-sky-400 rounded-full" 
                        />
                        <motion.div 
                          animate={{ scale: [1, 1.2, 1] }} 
                          transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                          className="w-2 h-2 bg-sky-500 rounded-full" 
                        />
                        <motion.div 
                          animate={{ scale: [1, 1.2, 1] }} 
                          transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                          className="w-2 h-2 bg-sky-600 rounded-full" 
                        />
                      </div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-2">HealthBuddy is thinking...</span>
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
              "relative z-10 p-6 md:p-10 bg-white/80 backdrop-blur-md border-t border-slate-100 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)]",
              messages.length === 0 && "bg-transparent border-none p-0"
            )} 
            onSubmit={handleSubmit}
          >
            {selectedImage && (
              <div className="mb-4 relative inline-block">
                <img 
                  src={`data:${selectedImage.mimeType};base64,${selectedImage.data}`} 
                  alt="Preview" 
                  className="w-20 h-20 object-cover rounded-xl border-2 border-sky-500" 
                />
                <button 
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-2 -right-2 bg-rose-500 text-white rounded-full p-1 shadow-md"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
            <div className="relative group flex items-end gap-3">
              <div className="flex-grow relative">
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
                  placeholder={language === 'EN' ? "Type your message..." : "अपना संदेश लिखें..."}
                  className={cn(
                    "w-full p-6 md:p-8 bg-white border border-slate-100 rounded-[32px] focus:ring-4 focus:ring-sky-100 outline-none transition-all resize-none text-slate-700 font-bold shadow-lg group-hover:shadow-xl",
                    messages.length > 0 && "pr-16 py-4 rounded-[24px] border-slate-200"
                  )}
                ></textarea>
                
                <div className="absolute right-4 bottom-4 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 text-slate-400 hover:text-sky-600 transition-colors"
                  >
                    <ImageIcon className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={startListening}
                    className={cn(
                      "p-2 transition-colors",
                      isListening ? "text-rose-600 animate-pulse" : "text-slate-400 hover:text-sky-600"
                    )}
                  >
                    {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || (!input.trim() && !selectedImage)}
                className={cn(
                  "bg-sky-600 text-white rounded-xl flex items-center justify-center hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shrink-0",
                  messages.length > 0 ? "w-12 h-12" : "w-16 h-16"
                )}
              >
                {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Send className="w-6 h-6" />}
              </button>
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleImageUpload} 
            />
            
            {messages.length === 0 && (
              <div className="grid sm:grid-cols-2 gap-4 mt-8">
                 {[
                   language === 'EN' ? "Conversations are private & secure" : "बातचीत निजी और सुरक्षित है",
                   language === 'EN' ? "HealthBuddy understands symptoms" : "हेल्थ बडी लक्षणों को समझता है",
                   language === 'EN' ? "Get specialty recommendations" : "विशेषज्ञ सिफारिशें प्राप्त करें",
                   language === 'EN' ? "Always consult a real doctor" : "हमेशा असली डॉक्टर से सलाह लें"
                 ].map((tip, i) => (
                   <div key={i} className="flex items-center gap-3 text-sm text-slate-400 font-bold">
                     <div className="w-1.5 h-1.5 rounded-full bg-sky-500"></div>
                     {tip}
                   </div>
                 ))}
              </div>
            )}
          </form>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] max-w-2xl mx-auto leading-relaxed">
            {language === 'EN' 
              ? "HealthBuddy is an AI assistant and does not provide medical diagnosis. In case of emergency, please call your local emergency services immediately." 
              : "हेल्थ बडी एक AI सहायक है और चिकित्सा निदान प्रदान नहीं करता है। आपातकाल के मामले में, कृपया तुरंत अपनी स्थानीय आपातकालीन सेवाओं को कॉल करें।"}
          </p>
        </div>
      </div>
    </div>
  );
};
