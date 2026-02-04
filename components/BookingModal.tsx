import React, { useState } from 'react';
import { Doctor } from '../types';
import { X, Calendar, Clock, CheckCircle, ShieldCheck, ChevronRight, MapPin, User, Mail, Phone, BellRing } from 'lucide-react';
import { Button } from './Button';

interface BookingModalProps {
  doctor: Doctor | null;
  onClose: () => void;
  onConfirm: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ doctor, onClose, onConfirm }) => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [step, setStep] = useState(1); // 1: Select Time, 2: Patient Details, 3: Success

  if (!doctor) return null;

  const dates = [
    { label: 'Today', value: '2025-05-15' },
    { label: 'Tomorrow', value: '2025-05-16' },
    { label: 'Mon, 17 May', value: '2025-05-17' },
  ];

  const handleNext = () => {
    if (step === 1 && selectedDate && selectedSlot) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
      setTimeout(() => {
        onConfirm();
      }, 4000);
    }
  };

  const ProgressIndicator = () => (
    <div className="flex items-center justify-between mb-8 px-4">
      {[1, 2, 3].map((s) => (
        <React.Fragment key={s}>
          <div className="flex flex-col items-center gap-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black border-4 transition-all ${
              step >= s ? 'bg-brand-600 text-white border-brand-100' : 'bg-slate-50 text-slate-300 border-slate-50'
            }`}>
              {step > s ? <CheckCircle className="w-6 h-6" /> : s}
            </div>
            <span className={`text-[10px] font-black uppercase tracking-widest ${step >= s ? 'text-brand-600' : 'text-slate-400'}`}>
              {s === 1 ? 'Time' : s === 2 ? 'Details' : 'Done'}
            </span>
          </div>
          {s < 3 && (
            <div className={`flex-1 h-1 mx-4 rounded-full transition-colors ${step > s ? 'bg-brand-600' : 'bg-slate-100'}`}></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen px-4 py-8">
        <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-xl transition-opacity" onClick={onClose}></div>

        <div className="relative bg-white rounded-[40px] text-left overflow-hidden shadow-2xl transform transition-all sm:max-w-xl w-full border border-slate-100">
          
          <div className="p-8 md:p-10">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">Book Appointment</h3>
              <button onClick={onClose} className="bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-full p-2.5 transition-colors">
                <X className="h-6 w-6" />
              </button>
            </div>

            <ProgressIndicator />

            {step === 1 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Doctor Snippet */}
                <div className="flex items-center gap-5 p-5 bg-brand-50/50 rounded-[28px] border border-brand-100/50">
                  <img src={doctor.image} alt="" className="h-20 w-20 rounded-2xl object-cover shadow-lg border-2 border-white" />
                  <div>
                    <h4 className="font-black text-slate-900 text-xl">{doctor.name}</h4>
                    <p className="text-sm text-brand-600 font-bold uppercase tracking-widest">{doctor.specialty}</p>
                    <div className="flex items-center gap-1.5 mt-1 text-slate-500 font-bold text-xs uppercase">
                      <MapPin className="w-3.5 h-3.5" /> {doctor.location}
                    </div>
                  </div>
                </div>

                {/* Date Selection */}
                <div>
                  <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-brand-600" /> 1. Select Date
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    {dates.map((d) => (
                      <button
                        key={d.value}
                        onClick={() => setSelectedDate(d.value)}
                        className={`px-4 py-5 rounded-2xl text-sm font-black transition-all border-2 ${
                          selectedDate === d.value 
                            ? 'bg-brand-600 text-white border-brand-600 shadow-xl shadow-brand-100 scale-[1.05]' 
                            : 'bg-white text-slate-700 border-slate-100 hover:border-brand-200'
                        }`}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Selection */}
                <div>
                  <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-brand-600" /> 2. Choose Time
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    {doctor.availableSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={`px-4 py-4 rounded-2xl text-sm font-black transition-all border-2 ${
                          selectedSlot === slot 
                            ? 'bg-brand-600 text-white border-brand-600 shadow-xl shadow-brand-100 scale-[1.05]' 
                            : 'bg-white text-slate-700 border-slate-100 hover:border-brand-200'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <Button 
                  onClick={handleNext} 
                  disabled={!selectedDate || !selectedSlot}
                  className="w-full py-5 text-lg font-black bg-brand-600 hover:bg-brand-700 shadow-2xl shadow-brand-200/50 rounded-[20px] flex items-center justify-center gap-3"
                >
                  NEXT STEP <ChevronRight className="w-6 h-6" />
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center mb-6">
                  <h4 className="text-xl font-black text-slate-900">Patient Information</h4>
                  <p className="text-slate-500 font-medium">We'll send your confirmation to these details.</p>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input type="text" placeholder="Full Name" className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl font-bold focus:ring-2 focus:ring-brand-500 outline-none" />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input type="email" placeholder="Email Address" className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl font-bold focus:ring-2 focus:ring-brand-500 outline-none" />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input type="tel" placeholder="Phone Number (for SMS/WhatsApp)" className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl font-bold focus:ring-2 focus:ring-brand-500 outline-none" />
                  </div>
                </div>

                <div className="bg-brand-50 p-5 rounded-[24px] border border-brand-100 flex items-start gap-4">
                  <BellRing className="w-6 h-6 text-brand-600 shrink-0" />
                  <p className="text-sm font-bold text-brand-800 leading-relaxed">
                    By clicking confirm, you'll receive an instant confirmation via SMS & WhatsApp. No booking fees required.
                  </p>
                </div>

                <div className="flex gap-4">
                   <Button variant="outline" onClick={() => setStep(1)} className="flex-1 py-5 font-black border-2 border-slate-100 rounded-[20px]">
                      BACK
                   </Button>
                   <Button onClick={handleNext} className="flex-[2] py-5 text-lg font-black bg-brand-600 hover:bg-brand-700 shadow-2xl rounded-[20px]">
                      CONFIRM BOOKING
                   </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="text-center py-10 animate-in fade-in zoom-in duration-500">
                <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-emerald-100 mb-8 shadow-xl shadow-emerald-50">
                  <CheckCircle className="h-12 w-12 text-emerald-600" />
                </div>
                <h3 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Confirmed!</h3>
                <p className="text-slate-600 text-xl font-medium leading-relaxed max-w-sm mx-auto mb-8">
                  Your appointment with <strong>Dr. {doctor.name.split(' ').pop()}</strong> is scheduled. Check your phone for confirmation.
                </p>
                <div className="flex items-center justify-center gap-3 text-brand-600 font-bold uppercase text-xs tracking-widest">
                  <ShieldCheck className="w-5 h-5" /> Verified Booking
                </div>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
};