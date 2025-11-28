import React, { useState } from 'react';
import { Doctor } from '../types';
import { X, Calendar, Clock, CheckCircle } from 'lucide-react';
import { Button } from './Button';

interface BookingModalProps {
  doctor: Doctor | null;
  onClose: () => void;
  onConfirm: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ doctor, onClose, onConfirm }) => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [step, setStep] = useState(1);

  if (!doctor) return null;

  const dates = [
    { label: 'Today', value: '2023-10-27' },
    { label: 'Tomorrow', value: '2023-10-28' },
    { label: 'Mon, 29 Oct', value: '2023-10-29' },
  ];

  const handleBook = () => {
    if (selectedDate && selectedSlot) {
      setStep(2);
      // Simulate API call
      setTimeout(() => {
        onConfirm();
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        
        {/* Overlay */}
        <div className="fixed inset-0 bg-slate-900 bg-opacity-75 transition-opacity backdrop-blur-sm" aria-hidden="true" onClick={onClose}></div>

        {/* Modal Panel */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full border border-slate-100">
          
          {step === 1 ? (
            <>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg leading-6 font-bold text-slate-900" id="modal-title">
                    Book Appointment
                  </h3>
                  <button onClick={onClose} className="text-slate-400 hover:text-slate-500 p-1">
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="mt-4 flex items-center gap-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <img src={doctor.image} alt="" className="h-16 w-16 rounded-full object-cover border-2 border-white shadow-sm" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">{doctor.name}</h4>
                    <p className="text-sm text-blue-600 font-medium">{doctor.specialty}</p>
                    <p className="text-xs text-slate-500">{doctor.location}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-500" /> Select Date
                  </h4>
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {dates.map((d) => (
                      <button
                        key={d.value}
                        onClick={() => setSelectedDate(d.value)}
                        className={`px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all border ${selectedDate === d.value ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-white text-slate-700 border-slate-200 hover:border-blue-400 hover:text-blue-600'}`}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-500" /> Select Time
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    {doctor.availableSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={`px-3 py-2 rounded-lg text-sm text-center transition-all border ${selectedSlot === slot ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-white text-slate-700 border-slate-200 hover:border-blue-400 hover:text-blue-600'}`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 px-4 py-4 sm:px-6 sm:flex sm:flex-row-reverse border-t border-slate-100">
                <Button 
                  onClick={handleBook} 
                  disabled={!selectedDate || !selectedSlot}
                  className="w-full sm:w-auto sm:ml-3"
                >
                  Confirm Booking
                </Button>
                <Button 
                  variant="outline"
                  onClick={onClose} 
                  className="mt-3 w-full sm:w-auto sm:mt-0"
                >
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <div className="p-10 text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6 animate-bounce">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl leading-6 font-bold text-slate-900">Booking Confirmed!</h3>
              <p className="text-slate-500 mt-2">Your appointment with Dr. {doctor.name.split(' ')[1]} is scheduled.</p>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
};