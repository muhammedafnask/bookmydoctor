import React from 'react';
import { Stethoscope, Menu, X, Globe, Sparkles } from 'lucide-react';
import { Button } from './Button';
import { Page, Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface NavbarProps {
  onNavigate: (page: Page) => void;
  currentPage: Page;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage, language, onLanguageChange }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const t = TRANSLATIONS[language];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      onNavigate(Page.HOME);
    }
    setIsOpen(false);
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate(Page.HOME)}>
            <div className="flex-shrink-0 flex items-center gap-2">
              <Stethoscope className="h-9 w-9 text-sky-600" strokeWidth={3} />
              <span className="font-black text-2xl text-slate-900 tracking-tighter">BookMyDoctor</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => onNavigate(Page.HOME)}
              className={`${currentPage === Page.HOME ? 'text-sky-600' : 'text-slate-600 hover:text-sky-600'} transition-colors font-black uppercase text-[10px] tracking-widest`}
            >
              {t.home}
            </button>
            <button 
              onClick={() => onNavigate(Page.ASK_EXPERT)}
              className={`${currentPage === Page.ASK_EXPERT ? 'text-sky-600' : 'text-slate-600 hover:text-sky-600'} transition-colors font-black uppercase text-[10px] tracking-widest flex items-center gap-1.5`}
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-500" />
              {t.aiAssistant}
            </button>
            <button 
              onClick={() => scrollToSection('specialties')}
              className="text-slate-600 hover:text-sky-600 transition-colors font-black uppercase text-[10px] tracking-widest"
            >
              {t.specialties}
            </button>
            <button 
              onClick={() => scrollToSection('how-to-book')}
              className="text-slate-600 hover:text-sky-600 transition-colors font-black uppercase text-[10px] tracking-widest"
            >
              {t.howToBook}
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-slate-600 hover:text-sky-600 transition-colors font-black uppercase text-[10px] tracking-widest"
            >
              {t.contact}
            </button>
            
            <div className="h-6 w-px bg-slate-200 mx-2"></div>

            {/* Language Toggle */}
            <button 
              onClick={() => onLanguageChange(language === 'EN' ? 'HI' : 'EN')}
              className="flex items-center gap-1.5 text-slate-600 hover:text-sky-600 transition-colors font-black uppercase text-[10px] tracking-widest"
            >
              <Globe className="w-4 h-4" />
              {language}
            </button>

            <button 
              onClick={() => onNavigate(Page.SIGN_IN)}
              className={`font-black uppercase text-[10px] tracking-widest transition-colors ${currentPage === Page.SIGN_IN ? 'text-sky-600' : 'text-slate-600 hover:text-sky-600'}`}
            >
              {t.signIn}
            </button>
            <Button variant="primary" size="sm" className="rounded-xl px-6 py-2.5 font-black uppercase text-[10px] tracking-widest border-none shadow-lg shadow-sky-100" onClick={() => onNavigate(Page.SIGN_UP)}>
              {t.signUp}
            </Button>
          </div>

          <div className="flex items-center md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 p-2">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <button
              onClick={() => { onNavigate(Page.HOME); setIsOpen(false); }}
              className="block w-full text-left px-3 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-slate-700 hover:text-sky-600 hover:bg-sky-50"
            >
              {t.home}
            </button>
            <button
              onClick={() => { onNavigate(Page.ASK_EXPERT); setIsOpen(false); }}
              className="flex items-center gap-2 w-full text-left px-3 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-sky-600 bg-sky-50"
            >
              <Sparkles className="w-4 h-4" />
              {t.aiAssistant}
            </button>
            <button
              onClick={() => scrollToSection('specialties')}
              className="block w-full text-left px-3 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-slate-700 hover:text-sky-600 hover:bg-sky-50"
            >
              {t.specialties}
            </button>
            <button
              onClick={() => scrollToSection('how-to-book')}
              className="block w-full text-left px-3 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-slate-700 hover:text-sky-600 hover:bg-sky-50"
            >
              {t.howToBook}
            </button>
            <div className="h-px bg-slate-100 my-2"></div>
            <button
              onClick={() => { onNavigate(Page.SIGN_IN); setIsOpen(false); }}
              className="block w-full text-left px-3 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-slate-700 hover:text-sky-600 hover:bg-sky-50"
            >
              {t.signIn}
            </button>
            <div className="pt-2">
               <Button variant="primary" className="w-full justify-center rounded-xl py-4 font-black uppercase text-xs tracking-widest border-none shadow-xl shadow-sky-100" onClick={() => { onNavigate(Page.SIGN_UP); setIsOpen(false); }}>
                {t.signUp}
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};