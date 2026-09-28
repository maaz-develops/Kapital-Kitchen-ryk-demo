import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, MapPin, AlertCircle } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { submitReservation } from '../services/reservationService';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReservationModal({ isOpen, onClose }: ReservationModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guests: '2 Guests',
    date: '',
    time: '20:00',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const result = await submitReservation(formData);
      setBookingRef(result.referenceId);
      setIsSubmitted(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('Failed to submit reservation. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setErrorMessage('');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-xl bg-[#121212] rounded-2xl sm:rounded-3xl border border-white/15 shadow-2xl overflow-y-auto max-h-[92svh] z-10 p-5 sm:p-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 sm:pb-5 mb-5 sm:mb-6">
            <div>
              <span className="text-[10px] font-mono text-[#EAB308] uppercase tracking-widest block mb-1">
                KAPITAL KITCHEN RYK
              </span>
              <h3 className="font-display font-black text-xl sm:text-2xl text-white">
                Reserve A Table
              </h3>
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-10 flex flex-col items-center text-center gap-4"
            >
              <div className="w-16 h-16 rounded-full bg-[#EAB308]/20 border border-[#EAB308] flex items-center justify-center text-[#EAB308]">
                <Check className="w-8 h-8" />
              </div>
              <h4 className="font-display font-black text-2xl text-white">
                Booking Confirmed!
              </h4>
              {bookingRef && (
                <span className="font-mono text-xs px-3 py-1 rounded-full bg-[#EAB308]/20 border border-[#EAB308]/40 text-[#EAB308]">
                  REFERENCE: {bookingRef}
                </span>
              )}
              <p className="text-sm text-neutral-300 max-w-sm">
                We have reserved a table for <strong className="text-white">{formData.guests}</strong> on{' '}
                <strong className="text-white">{formData.date || 'today'}</strong> at{' '}
                <strong className="text-white">{formData.time}</strong> for {formData.name}.
              </p>
              <p className="text-xs text-[#EAB308] font-mono">
                SMS confirmation sent to {formData.phone}
              </p>
              <button
                onClick={handleReset}
                className="mt-4 px-6 py-2.5 rounded-full bg-[#EAB308] text-black font-extrabold text-xs uppercase cursor-pointer"
              >
                Close & Return
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {errorMessage && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{errorMessage}</span>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tariq Malik"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-[#EAB308] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0300-1234567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-[#EAB308] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                    Guests
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#1c1c1c] border border-white/10 text-white text-sm focus:border-[#EAB308] focus:outline-none"
                  >
                    <option value="1 Guest">1 Guest</option>
                    <option value="2 Guests">2 Guests</option>
                    <option value="4 Guests">4 Guests</option>
                    <option value="6 Guests">6 Guests</option>
                    <option value="8+ Party">8+ Party</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-[#EAB308] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-[#EAB308] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                  Special Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="Special requests or dietary needs..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-[#EAB308] focus:outline-none resize-none"
                />
              </div>

              <div className="flex items-center justify-between text-xs text-neutral-400 pt-2 border-t border-white/5">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#EAB308]" />
                  Modal Town, RYK
                </span>
                <span className="text-[#EAB308] font-mono">12 PM – 1 AM</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 py-3.5 rounded-full bg-[#EAB308] hover:bg-[#FACC15] disabled:opacity-50 text-black font-extrabold text-xs tracking-widest uppercase transition-transform active:scale-98 cursor-pointer shadow-lg shadow-[#EAB308]/20"
              >
                {isSubmitting ? 'Confirming...' : 'Confirm Table Reservation'}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
