
import React, { useState, useMemo, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SpecialtyCards } from './components/SpecialtyCards';
import { DoctorList } from './components/DoctorList';
import { BookingModal } from './components/BookingModal';
import { SignIn } from './components/SignIn';
import { SignUp } from './components/SignUp';
import { SignUpPatient } from './components/SignUpPatient';
import { SignUpSpecialist } from './components/SignUpSpecialist';
import { SignUpClinic } from './components/SignUpClinic';
import { AskExpert } from './components/AskExpert';
import { DOCTORS as MOCK_DOCTORS } from './constants';
import { Doctor, FilterState, Page } from './types';
import { Button } from './components/Button';
import { 
  ArrowLeft, 
  Search,
  CalendarCheck, 
  Clock, 
  ThumbsUp,
  Check,
  Stethoscope,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from 'lucide-react';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [filters, setFilters] = useState<FilterState>({ location: '', specialty: '', query: '' });
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  
  // State for doctors data
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch doctors from API (MySQL) or fallback to mock data
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        // Try to connect to your local backend
        // Make sure your backend is running on port 3000
        const response = await fetch('http://localhost:3000/api/doctors');
        if (!response.ok) {
           throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("Loaded doctors from Database:", data);
        setDoctors(data);
      } catch (error) {
        console.warn("Could not connect to database API. Using Mock Data instead.", error);
        // Fallback to constants.ts if backend is not running
        setDoctors(MOCK_DOCTORS);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleSearch = (newFilters: FilterState) => {
    setFilters(newFilters);
    handleNavigate(Page.SEARCH);
  };

  const handleSelectSpecialty = (specialty: string) => {
    setFilters({ location: '', specialty, query: '' });
    handleNavigate(Page.SEARCH);
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
      const matchLoc = filters.location ? doc.location.includes(filters.location) : true;
      const matchSpec = filters.specialty ? doc.specialty === filters.specialty : true;
      const matchQuery = filters.query 
        ? (doc.name.toLowerCase().includes(filters.query.toLowerCase()) || 
           doc.specialty.toLowerCase().includes(filters.query.toLowerCase()))
        : true;
      return matchLoc && matchSpec && matchQuery;
    });
  }, [filters, doctors]);

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-slate-50">
      <Navbar onNavigate={handleNavigate} currentPage={currentPage} />

      <main className="flex-grow">
        {currentPage === Page.HOME && (
          <>
            <Hero onSearch={handleSearch} />
            <SpecialtyCards onSelectSpecialty={handleSelectSpecialty} />
            
            {/* Why Choose Section - Short & Concise */}
            <div className="bg-white py-16 border-t border-slate-100">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {/* Feature 1 */}
                  <div className="flex flex-col items-start p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Search className="h-6 w-6 text-teal-600" />
                      <h3 className="text-lg font-bold text-slate-900">Find your specialist</h3>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      The real opinions of thousands of patients will help you always make the best decision.
                    </p>
                  </div>

                  {/* Feature 2 */}
                  <div className="flex flex-col items-start p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <CalendarCheck className="h-6 w-6 text-teal-600" />
                      <h3 className="text-lg font-bold text-slate-900">Make an appointment easily</h3>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Choose the time you prefer and make an appointment without having to call. It's easy, convenient and very fast.
                    </p>
                  </div>

                  {/* Feature 3 */}
                  <div className="flex flex-col items-start p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Clock className="h-6 w-6 text-teal-600" />
                      <h3 className="text-lg font-bold text-slate-900">SMS reminders</h3>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      We confirm the appointment instantly and send you a reminder by SMS before the appointment.
                    </p>
                  </div>

                  {/* Feature 4 */}
                  <div className="flex flex-col items-start p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <ThumbsUp className="h-6 w-6 text-teal-600" />
                      <h3 className="text-lg font-bold text-slate-900">No added costs</h3>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Appointment booking is a free service of BookMyDoctor.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Recommended Specialists Section */}
            <div className="bg-slate-50 py-16 border-t border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-8">
                   <div>
                     <h2 className="text-2xl font-bold text-slate-900">Highly Recommended Specialists</h2>
                     <p className="text-slate-500 mt-2">Doctors with the highest patient satisfaction ratings</p>
                   </div>
                   <Button variant="outline" className="mt-4 md:mt-0" onClick={() => handleNavigate(Page.SEARCH)}>View All Doctors</Button>
                </div>
                {isLoading ? (
                  <div className="text-center py-12 text-slate-500">Loading doctors...</div>
                ) : (
                  <DoctorList doctors={doctors.slice(0, 3)} onBook={handleBookClick} />
                )}
              </div>
            </div>
          </>
        )}

        {currentPage === Page.SEARCH && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <button 
              onClick={() => handleNavigate(Page.HOME)} 
              className="flex items-center text-slate-500 hover:text-blue-600 mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1" /> Back to Home
            </button>

            <div className="grid lg:grid-cols-4 gap-8">
              {/* Sidebar Filters */}
              <div className="hidden lg:block space-y-6">
                 <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm sticky top-24">
                    <h3 className="font-semibold text-slate-900 mb-4">Filters</h3>
                    <div className="space-y-4">
                       <div>
                         <label className="text-sm font-medium text-slate-700 mb-1 block">Location</label>
                         <select 
                            className="w-full p-2 border border-slate-300 rounded-lg text-sm"
                            value={filters.location}
                            onChange={(e) => setFilters({...filters, location: e.target.value})}
                         >
                            <option value="">All Locations</option>
                            <option value="New York">New York</option>
                            <option value="Brooklyn">Brooklyn</option>
                         </select>
                       </div>
                       <div>
                          <label className="text-sm font-medium text-slate-700 mb-1 block">Availability</label>
                          <div className="space-y-2">
                             <label className="flex items-center gap-2 text-sm text-slate-600">
                                <input type="checkbox" className="rounded text-blue-600" /> Available Today
                             </label>
                             <label className="flex items-center gap-2 text-sm text-slate-600">
                                <input type="checkbox" className="rounded text-blue-600" /> Female Doctor
                             </label>
                          </div>
                       </div>
                       <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => setFilters({location: '', specialty: '', query: ''})}
                       >
                         Reset Filters
                       </Button>
                    </div>
                 </div>
              </div>

              {/* Main List */}
              <div className="lg:col-span-3">
                 <div className="mb-4 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-slate-900">
                      {filteredDoctors.length} doctors available
                      {filters.specialty && <span className="text-slate-500 font-normal"> for {filters.specialty}</span>}
                    </h2>
                 </div>
                 {isLoading ? (
                   <div className="text-center py-20 text-slate-500">Loading doctors...</div>
                 ) : (
                   <DoctorList doctors={filteredDoctors} onBook={handleBookClick} />
                 )}
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
           <div className="max-w-2xl mx-auto px-4 py-16 text-center">
             <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-green-600" />
             </div>
             <h1 className="text-3xl font-bold text-slate-900 mb-4">Appointment Confirmed!</h1>
             <p className="text-lg text-slate-600 mb-8">
               We have sent a confirmation email to you. Please arrive 15 minutes early for your appointment.
             </p>
             <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-8 text-left">
                <h3 className="font-semibold text-slate-900 border-b border-slate-100 pb-2 mb-4">Booking Details</h3>
                <div className="space-y-3">
                   <div className="flex justify-between">
                      <span className="text-slate-500">Doctor</span>
                      <span className="font-medium">{selectedDoctor?.name}</span>
                   </div>
                   <div className="flex justify-between">
                      <span className="text-slate-500">Specialty</span>
                      <span className="font-medium">{selectedDoctor?.specialty}</span>
                   </div>
                   <div className="flex justify-between">
                      <span className="text-slate-500">Location</span>
                      <span className="font-medium">{selectedDoctor?.location}</span>
                   </div>
                </div>
             </div>
             <Button onClick={() => handleNavigate(Page.HOME)}>Return Home</Button>
           </div>
        )}
      </main>

      {/* Detailed Footer */}
      <footer className="bg-slate-900 text-white py-16 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                 <Stethoscope className="h-6 w-6 text-blue-500" />
                 <span className="text-xl font-bold">BookMyDoctor</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Your trusted platform for finding and booking healthcare professionals. We connect patients with the best doctors.
              </p>
              <div className="flex gap-4 pt-2">
                <Facebook className="h-5 w-5 text-slate-400 hover:text-white cursor-pointer transition-colors" />
                <Twitter className="h-5 w-5 text-slate-400 hover:text-white cursor-pointer transition-colors" />
                <Instagram className="h-5 w-5 text-slate-400 hover:text-white cursor-pointer transition-colors" />
                <Linkedin className="h-5 w-5 text-slate-400 hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>

            {/* For Patients */}
            <div>
              <h3 className="font-bold text-lg mb-4 text-white">For Patients</h3>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><button onClick={() => handleNavigate(Page.SEARCH)} className="hover:text-blue-400 transition-colors text-left">Find Doctors</button></li>
                <li><button onClick={() => handleNavigate(Page.SEARCH)} className="hover:text-blue-400 transition-colors text-left">Book Appointments</button></li>
                <li><button className="hover:text-blue-400 transition-colors text-left">Online Consultations</button></li>
                <li><button className="hover:text-blue-400 transition-colors text-left">Patient Reviews</button></li>
              </ul>
            </div>

            {/* For Doctors */}
            <div>
              <h3 className="font-bold text-lg mb-4 text-white">For Doctors</h3>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><button onClick={() => handleNavigate(Page.SIGN_UP_SPECIALIST)} className="hover:text-blue-400 transition-colors text-left">Join Our Platform</button></li>
                <li><button className="hover:text-blue-400 transition-colors text-left">Manage Appointments</button></li>
                <li><button className="hover:text-blue-400 transition-colors text-left">Resources</button></li>
                <li><button className="hover:text-blue-400 transition-colors text-left">Support</button></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-bold text-lg mb-4 text-white">Company</h3>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><button className="hover:text-blue-400 transition-colors text-left">About Us</button></li>
                <li><button className="hover:text-blue-400 transition-colors text-left">Contact</button></li>
                <li><button className="hover:text-blue-400 transition-colors text-left">Privacy Policy</button></li>
                <li><button className="hover:text-blue-400 transition-colors text-left">Terms of Service</button></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm text-slate-500">
            <p>© 2025 BookMyDoctor. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {isBookingModalOpen && (
        <BookingModal 
          doctor={selectedDoctor} 
          onClose={() => setIsBookingModalOpen(false)} 
          onConfirm={handleBookingConfirm} 
        />
      )}
    </div>
  );
};

export default App;
