import React, { useState, useMemo, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SpecialtyCards } from './components/SpecialtyCards';
import { DoctorList } from './components/DoctorList';
import { TopClinics } from './components/TopClinics';
import { HealthArticles } from './components/HealthArticles';
import { BookingModal } from './components/BookingModal';
import { SignIn } from './components/SignIn';
import { SignUp } from './components/SignUp';
import { SignUpPatient } from './components/SignUpPatient';
import { SignUpSpecialist } from './components/SignUpSpecialist';
import { SignUpClinic } from './components/SignUpClinic';
import { AskExpert } from './components/AskExpert';
import { DOCTORS as MOCK_DOCTORS, LOCATIONS, SPECIALTIES } from './constants';
import { Doctor, FilterState, Page } from './types';
import { Button } from './components/Button';
import { 
  ArrowLeft, 
  Search,
  Check,
  Stethoscope,
  ShieldCheck,
  Zap,
  Heart,
  CalendarCheck2,
  PhoneCall,
  Calendar,
  Mail,
  Filter
} from 'lucide-react';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [filters, setFilters] = useState<FilterState>({ location: '', specialty: '', query: '', type: 'all' });
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
       setDoctors(MOCK_DOCTORS);
       setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      handleNavigate(Page.HOME);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleSearch = (newFilters: FilterState) => {
    setFilters(newFilters);
    handleNavigate(Page.SEARCH);
  };

  const handleSelectSpecialty = (specialty: string) => {
    // Attempt to request location when a specialty is selected from home
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setFilters({ location: '', specialty, query: '', type: 'all' });
          handleNavigate(Page.SEARCH);
        },
        () => {
          setFilters({ location: '', specialty, query: '', type: 'all' });
          handleNavigate(Page.SEARCH);
        }
      );
    } else {
      setFilters({ location: '', specialty, query: '', type: 'all' });
      handleNavigate(Page.SEARCH);
    }
  };

  const handleBookClick = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsBookingModalOpen(true);
  };

  const handleBookingConfirm = () => {
    setIsBookingModalOpen(false);
    handleNavigate(Page.APPOINTMENT_SUCCESS);
  };

  const filteredDoctors = useMemo(() => {
    return doctors.filter(doc => {
      const matchLoc = filters.location ? doc.location.toLowerCase().includes(filters.location.toLowerCase()) : true;
      const matchSpec = filters.specialty ? doc.specialty.toLowerCase() === filters.specialty.toLowerCase() : true;
      const matchQuery = filters.query 
        ? (doc.name.toLowerCase().includes(filters.query.toLowerCase()) || 
           doc.specialty.toLowerCase().includes(filters.query.toLowerCase()) ||
           doc.clinicName.toLowerCase().includes(filters.query.toLowerCase()))
        : true;
      const matchType = filters.type && filters.type !== 'all'
        ? doc.type === filters.type
        : true;
      return matchLoc && matchSpec && matchQuery && matchType;
    });
  }, [filters, doctors]);

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-white">
      <Navbar onNavigate={handleNavigate} currentPage={currentPage} />

      <main className="flex-grow">
        {currentPage === Page.HOME && (
          <>
            <Hero onSearch={handleSearch} />
            
            <div id="how-to-book" className="bg-slate-50 py-24 relative overflow-hidden scroll-mt-20">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                  <div className="text-center mb-16">
                     <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">How to Book</h2>
                     <p className="text-slate-500 font-bold max-w-xl mx-auto text-lg">3 Simple Steps to your healthcare.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                     <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-1 border-t-4 border-dashed border-slate-200"></div>
                     
                     {[
                       { icon: Search, title: "Search for a doctor", desc: "Browse verified profiles near you by specialty or location." },
                       { icon: Calendar, title: "Choose Date & Time", desc: "Select your preferred date and time from real-time slots." },
                       { icon: CalendarCheck2, title: "Instant Booking", desc: "Confirm your booking and receive instant SMS confirmation." }
                     ].map((item, idx) => (
                       <div key={idx} className="flex flex-col items-center text-center group relative z-10">
                          <div className="w-24 h-24 bg-white rounded-[40px] shadow-xl shadow-brand-100 flex items-center justify-center mb-6 border border-slate-100 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white transition-all duration-500">
                             <item.icon className="w-10 h-10 transition-colors" />
                          </div>
                          <h3 className="text-2xl font-black text-slate-900 mb-3">{item.title}</h3>
                          <p className="text-slate-500 font-bold text-sm leading-relaxed max-w-[240px]">{item.desc}</p>
                       </div>
                     ))}
                  </div>
               </div>
            </div>

            <SpecialtyCards onSelectSpecialty={handleSelectSpecialty} />
            
            <TopClinics />

            <div className="bg-white py-24 border-y border-slate-50">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-16">
                     <h2 className="text-[10px] font-black text-brand-600 uppercase tracking-[0.3em] mb-4">Why Choose BookMyDoctor?</h2>
                     <h3 className="text-4xl font-black text-slate-900 tracking-tight">Trusted by over 100,000 patients</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                     <div className="text-center p-8 rounded-[40px] bg-brand-50/50 border border-brand-100/50">
                        <div className="flex justify-center mb-4"><ShieldCheck className="w-10 h-10 text-brand-600" /></div>
                        <div className="text-lg font-black text-slate-900 mb-1">Verified Doctors</div>
                        <div className="text-slate-500 font-bold text-xs uppercase tracking-widest">100% Certified</div>
                     </div>
                     <div className="text-center p-8 rounded-[40px] bg-brand-50/50 border border-brand-100/50">
                        <div className="flex justify-center mb-4"><Zap className="w-10 h-10 text-brand-600" /></div>
                        <div className="text-lg font-black text-slate-900 mb-1">Instant Booking</div>
                        <div className="text-slate-500 font-bold text-xs uppercase tracking-widest">SMS/WhatsApp</div>
                     </div>
                     <div className="text-center p-8 rounded-[40px] bg-brand-50/50 border border-brand-100/50">
                        <div className="flex justify-center mb-4"><Check className="w-10 h-10 text-brand-600" /></div>
                        <div className="text-lg font-black text-slate-900 mb-1">Zero Fees</div>
                        <div className="text-slate-500 font-bold text-xs uppercase tracking-widest">Always Free</div>
                     </div>
                     <div className="text-center p-8 rounded-[40px] bg-brand-50/50 border border-brand-100/50">
                        <div className="flex justify-center mb-4"><Heart className="w-10 h-10 text-brand-600" /></div>
                        <div className="text-lg font-black text-slate-900 mb-1">Patient Focused</div>
                        <div className="text-slate-500 font-bold text-xs uppercase tracking-widest">4.9/5 Rating</div>
                     </div>
                  </div>
               </div>
            </div>

            <HealthArticles />

            <div id="for-doctors" className="bg-slate-900 py-32 scroll-mt-20 overflow-hidden relative">
               <div className="absolute top-0 right-0 -mr-40 w-[600px] h-[600px] bg-brand-600/10 rounded-full blur-[120px]"></div>
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                  <div className="grid lg:grid-cols-2 gap-20 items-center">
                     <div>
                        <div className="bg-brand-600/20 text-brand-400 px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-8 inline-block">FOR DOCTORS & CLINICS</div>
                        <h2 className="text-4xl sm:text-5xl font-black text-white mb-8 leading-tight tracking-tight">Are You a Clinic or Doctor?</h2>
                        <p className="text-slate-400 text-lg font-medium leading-relaxed mb-12">Join BookMyDoctor and receive new patients without marketing hassle. Simple dashboard. Easy appointment management. Zero setup cost.</p>
                        <div className="flex flex-wrap gap-4">
                           <Button size="lg" className="bg-brand-600 hover:bg-brand-700 text-white font-black px-10 py-5 rounded-[24px] shadow-2xl shadow-brand-900 border-none" onClick={() => handleNavigate(Page.SIGN_UP_CLINIC)}>Register Clinic</Button>
                           <Button variant="outline" size="lg" className="text-white border-slate-700 hover:bg-slate-800 font-black px-10 py-5 rounded-[24px]" onClick={() => handleNavigate(Page.SIGN_UP_SPECIALIST)}>Join as Individual Doctor</Button>
                        </div>
                     </div>
                     <div className="relative">
                        <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop" alt="Doctor Dashboard" className="rounded-[40px] grayscale-0 opacity-90 border border-slate-700 shadow-3xl" />
                     </div>
                  </div>
               </div>
            </div>

            <div id="contact" className="bg-white py-24 scroll-mt-20">
               <div className="max-w-7xl mx-auto px-6 sm:px-8">
                  <div className="grid lg:grid-cols-2 gap-20">
                     <div>
                        <h2 className="text-[10px] font-black text-brand-600 uppercase tracking-[0.3em] mb-4">Contact Us</h2>
                        <h3 className="text-4xl font-black text-slate-900 tracking-tight mb-8">Have questions? <br/>We're here to help.</h3>
                        <div className="space-y-8">
                           <div className="flex gap-6">
                              <div className="w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center shrink-0">
                                 <PhoneCall className="w-7 h-7 text-brand-600" />
                              </div>
                              <div>
                                 <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Support Line</div>
                                 <div className="text-xl font-black text-slate-900">+91 1800-DOCTOR-HP</div>
                              </div>
                           </div>
                           <div className="flex gap-6">
                              <div className="w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center shrink-0">
                                 <Mail className="w-7 h-7 text-brand-600" />
                              </div>
                              <div>
                                 <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Email Support</div>
                                 <div className="text-xl font-black text-slate-900">support@bookmydoctor.in</div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="bg-slate-50 p-10 rounded-[48px] border border-slate-100 shadow-xl shadow-slate-100/50">
                        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Message Sent!'); }}>
                           <div className="grid grid-cols-2 gap-4">
                              <input type="text" placeholder="First Name" className="w-full px-6 py-4 rounded-2xl bg-white border-none focus:ring-2 focus:ring-brand-500 outline-none font-bold" />
                              <input type="text" placeholder="Last Name" className="w-full px-6 py-4 rounded-2xl bg-white border-none focus:ring-2 focus:ring-brand-500 outline-none font-bold" />
                           </div>
                           <input type="email" placeholder="Email Address" className="w-full px-6 py-4 rounded-2xl bg-white border-none focus:ring-2 focus:ring-brand-500 outline-none font-bold" />
                           <textarea rows={4} placeholder="How can we help?" className="w-full px-6 py-4 rounded-2xl bg-white border-none focus:ring-2 focus:ring-brand-500 outline-none font-bold resize-none"></textarea>
                           <Button className="w-full py-5 rounded-2xl font-black shadow-xl shadow-brand-100">SEND MESSAGE</Button>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
          </>
        )}

        {currentPage === Page.SEARCH && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <button onClick={() => handleNavigate(Page.HOME)} className="flex items-center text-slate-400 font-black hover:text-brand-600 mb-10 transition-colors uppercase text-[10px] tracking-[0.3em]">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
            </button>

            <div className="grid lg:grid-cols-4 gap-12">
              <div className="hidden lg:block">
                 <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-xl shadow-slate-100/50 sticky top-24">
                    <h3 className="font-black text-slate-900 text-xl mb-10 tracking-tight flex items-center gap-3">
                       <Filter className="w-5 h-5 text-brand-600" />
                       Refine Results
                    </h3>
                    <div className="space-y-10">
                       <div>
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 block">City</label>
                         <select className="w-full p-4 bg-slate-50 border-none rounded-[18px] text-sm font-bold text-slate-700 focus:ring-2 focus:ring-brand-500 cursor-pointer outline-none" value={filters.location} onChange={(e) => setFilters({...filters, location: e.target.value})}>
                            <option value="">All Regions</option>
                            {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                         </select>
                       </div>
                       <div>
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 block">Specialty</label>
                         <select className="w-full p-4 bg-slate-50 border-none rounded-[18px] text-sm font-bold text-slate-700 focus:ring-2 focus:ring-brand-500 cursor-pointer outline-none" value={filters.specialty} onChange={(e) => setFilters({...filters, specialty: e.target.value})}>
                            <option value="">All Specialties</option>
                            {SPECIALTIES.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                         </select>
                       </div>
                       <div>
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 block">Type</label>
                         <select className="w-full p-4 bg-slate-50 border-none rounded-[18px] text-sm font-bold text-slate-700 focus:ring-2 focus:ring-brand-500 cursor-pointer outline-none" value={filters.type} onChange={(e) => setFilters({...filters, type: e.target.value as any})}>
                            <option value="all">All Types</option>
                            <option value="Independent">Independent</option>
                            <option value="Clinic-based">Clinic-based</option>
                         </select>
                       </div>
                       <Button variant="outline" size="sm" className="w-full py-4.5 font-black text-[10px] uppercase tracking-widest border-2 border-slate-100 text-slate-400 hover:text-brand-600 hover:border-brand-600 rounded-[20px]" onClick={() => setFilters({location: '', specialty: '', query: '', type: 'all'})}>Clear Filters</Button>
                    </div>
                 </div>
              </div>

              <div className="lg:col-span-3">
                 <div className="mb-12 flex flex-col md:flex-row justify-between items-center bg-slate-50/50 p-6 rounded-[32px] border border-slate-100 gap-6">
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight shrink-0">Showing {filteredDoctors.length} <span className="text-brand-600">verified</span> doctors</h2>
                    <div className="flex gap-2 overflow-x-auto w-full md:w-auto scrollbar-hide pb-1">
                       {['Top Rated', 'Near Me', 'Lowest Fee', 'Most Experienced'].map(chip => (
                         <button key={chip} className="whitespace-nowrap px-4 py-2 bg-white border border-slate-100 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-brand-600 hover:border-brand-600 transition-all">
                            {chip}
                         </button>
                       ))}
                    </div>
                 </div>
                 {isLoading ? <div className="text-center py-40 text-slate-300 font-black text-2xl animate-pulse">Finding doctors...</div> : <DoctorList doctors={filteredDoctors} onBook={handleBookClick} />}
              </div>
            </div>
          </div>
        )}

        {currentPage === Page.ASK_EXPERT && <AskExpert onNavigate={handleNavigate} />}
        {currentPage === Page.SIGN_IN && <SignIn onNavigate={handleNavigate} />}
        {currentPage === Page.SIGN_UP && <SignUp onNavigate={handleNavigate} />}
        {currentPage === Page.SIGN_UP_PATIENT && <SignUpPatient onNavigate={handleNavigate} />}
        {currentPage === Page.SIGN_UP_SPECIALIST && <SignUpSpecialist onNavigate={handleNavigate} />}
        {currentPage === Page.SIGN_UP_CLINIC && <SignUpClinic onNavigate={handleNavigate} />}

        {currentPage === Page.APPOINTMENT_SUCCESS && (
           <div className="max-w-3xl mx-auto px-6 py-32 text-center">
             <div className="w-28 h-28 bg-emerald-100 rounded-[40px] flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-emerald-50"><Check className="w-14 h-14 text-emerald-600" /></div>
             <h1 className="text-5xl font-black text-slate-900 mb-6 tracking-tight">Booking confirmed!</h1>
             <p className="text-xl text-slate-500 font-medium mb-16 max-w-xl mx-auto leading-relaxed">Your appointment request has been sent successfully. <br/>You will receive SMS confirmation shortly.</p>
             <Button onClick={() => handleNavigate(Page.HOME)} className="px-12 py-5 font-black bg-slate-900 hover:bg-black shadow-2xl rounded-[24px] border-none">Back Home</Button>
           </div>
        )}
      </main>

      <footer className="bg-slate-900 text-white pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-20">
            <div className="space-y-8">
              <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavigate(Page.HOME)}>
                 <Stethoscope className="h-10 w-10 text-brand-500" strokeWidth={3} />
                 <span className="text-3xl font-black tracking-tighter">BookMyDoctor</span>
              </div>
              <p className="text-slate-400 text-lg leading-relaxed font-medium">BookMyDoctor – Making healthcare booking simple and fast. Verified Professionals. Real-time care.</p>
            </div>
            <div>
              <h3 className="font-black text-xs mb-10 uppercase tracking-[0.3em] text-brand-500">For Patients</h3>
              <ul className="space-y-5 text-sm font-bold text-slate-400">
                <li><button onClick={() => handleNavigate(Page.SEARCH)} className="hover:text-white transition-colors">Find a Doctor</button></li>
                <li><button onClick={() => scrollToSection('how-to-book')} className="hover:text-white transition-colors">How to Book</button></li>
                <li><button onClick={() => handleNavigate(Page.ASK_EXPERT)} className="hover:text-white transition-colors">Ask an Expert</button></li>
              </ul>
            </div>
            <div>
              <h3 className="font-black text-xs mb-10 uppercase tracking-[0.3em] text-brand-500">For Doctors</h3>
              <ul className="space-y-5 text-sm font-bold text-slate-400">
                <li><button onClick={() => handleNavigate(Page.SIGN_UP_SPECIALIST)} className="hover:text-white transition-colors">List your Practice</button></li>
                <li><button onClick={() => handleNavigate(Page.SIGN_UP_CLINIC)} className="hover:text-white transition-colors">Register Clinic</button></li>
              </ul>
            </div>
            <div>
              <h3 className="font-black text-xs mb-10 uppercase tracking-[0.3em] text-brand-500">Corporate</h3>
              <ul className="space-y-5 text-sm font-bold text-slate-400">
                <li><button className="hover:text-white transition-colors">About Us</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors">Contact Us</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-24 pt-12 text-center text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">
            <p>© 2025 BookMyDoctor. Verified Healthcare Excellence in India.</p>
          </div>
        </div>
      </footer>

      {isBookingModalOpen && <BookingModal doctor={selectedDoctor} onClose={() => setIsBookingModalOpen(false)} onConfirm={handleBookingConfirm} />}
    </div>
  );
};

export default App;