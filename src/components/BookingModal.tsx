import { X, Calendar, Clock } from 'lucide-react';
import { useState } from 'react';
import type { Doctor } from '../lib/supabase';

interface BookingModalProps {
  doctor: Doctor & { specialty_name?: string };
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (bookingData: BookingData) => void;
}

export interface BookingData {
  date: string;
  time: string;
  consultationType: 'online' | 'in_person';
  reason: string;
  notes: string;
}

export default function BookingModal({ doctor, isOpen, onClose, onConfirm }: BookingModalProps) {
  const [bookingData, setBookingData] = useState<BookingData>({
    date: '',
    time: '',
    consultationType: doctor.accepts_in_person_consultation ? 'in_person' : 'online',
    reason: '',
    notes: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(bookingData);
  };

  const minDate = new Date().toISOString().split('T')[0];

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Book Appointment</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Dr. {doctor.full_name}
            </h3>
            <p className="text-blue-600 font-medium">
              {doctor.specialty_name || 'General Practice'}
            </p>
            {doctor.consultation_fee && (
              <p className="text-gray-700 mt-2">
                Consultation Fee: ${doctor.consultation_fee.toFixed(2)}
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Consultation Type
              </label>
              <div className="grid grid-cols-2 gap-4">
                {doctor.accepts_in_person_consultation && (
                  <button
                    type="button"
                    onClick={() => setBookingData({ ...bookingData, consultationType: 'in_person' })}
                    className={`p-4 border-2 rounded-lg font-medium transition-all ${
                      bookingData.consultationType === 'in_person'
                        ? 'border-blue-600 bg-blue-50 text-blue-600'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    In-Person Visit
                  </button>
                )}
                {doctor.accepts_online_consultation && (
                  <button
                    type="button"
                    onClick={() => setBookingData({ ...bookingData, consultationType: 'online' })}
                    className={`p-4 border-2 rounded-lg font-medium transition-all ${
                      bookingData.consultationType === 'online'
                        ? 'border-blue-600 bg-blue-50 text-blue-600'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    Online Consultation
                  </button>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Appointment Date
              </label>
              <input
                type="date"
                required
                min={minDate}
                value={bookingData.date}
                onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="w-4 h-4 inline mr-1" />
                Preferred Time
              </label>
              <select
                required
                value={bookingData.time}
                onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              >
                <option value="">Select a time</option>
                {timeSlots.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason for Visit
              </label>
              <input
                type="text"
                required
                placeholder="e.g., Annual checkup, Follow-up visit"
                value={bookingData.reason}
                onChange={(e) => setBookingData({ ...bookingData, reason: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="Any additional information for the doctor"
                value={bookingData.notes}
                onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Confirm Booking
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
