import React from 'react';
import { Stethoscope, Menu, X } from 'lucide-react';
import { Button } from './Button';
import { Page } from '../types';

interface NavbarProps {
  onNavigate: (page: Page) => void;
  currentPage: Page;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate(Page.HOME)}>
            <div className="flex-shrink-0 flex items-center gap-2">
              <Stethoscope className="h-8 w-8 text-blue-600" strokeWidth={2.5} />
              <span className="font-bold text-2xl text-slate-900 tracking-tight">BookMyDoctor</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => onNavigate(Page.HOME)}
              className={`${currentPage === Page.HOME ? 'text-blue-600 font-semibold' : 'text-slate-600 hover:text-blue-600'} transition-colors font-medium`}
            >
              Home
            </button>
            <button 
              onClick={() => onNavigate(Page.ASK_EXPERT)}
              className={`${currentPage === Page.ASK_EXPERT ? 'text-blue-600 font-semibold' : 'text-slate-600 hover:text-blue-600'} transition-colors font-medium`}
            >
              Ask Expert
            </button>
            <div className="h-6 w-px bg-slate-200 mx-2"></div>
            <button 
              onClick={() => onNavigate(Page.SIGN_IN)}
              className={`font-medium transition-colors ${currentPage === Page.SIGN_IN ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}
            >
              Sign In
            </button>
            <Button variant="primary" size="sm" onClick={() => onNavigate(Page.SIGN_UP)}>
              Sign Up
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
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button
              onClick={() => { onNavigate(Page.HOME); setIsOpen(false); }}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50"
            >
              Home
            </button>
             <button
              onClick={() => { onNavigate(Page.ASK_EXPERT); setIsOpen(false); }}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50"
            >
              Ask Expert
            </button>
            <button
              onClick={() => { onNavigate(Page.SIGN_IN); setIsOpen(false); }}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50"
            >
              Sign In
            </button>
            <div className="pt-4 px-3">
               <Button variant="primary" className="w-full justify-center" onClick={() => { onNavigate(Page.SIGN_UP); setIsOpen(false); }}>
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};