import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Clock, MessageSquare, Check, Calendar, Users, ExternalLink, AlertCircle } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { submitReservation } from '../services/reservationService';

export default function LocationReservationSection() {
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
  const [currentTime, setCurrentTime] = useState('');

  // Rahim Yar Khan is UTC+5 (PKT)
  useEffect(() => {
    const updatePKT = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Karachi',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setCurrentTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };

    updatePKT();
    const interval = setInterval(updatePKT, 1000);
    return () => clearInterval(interval);
  }, []);

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
        setErrorMessage('Failed to submit reservation. Please check your details.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="location"
      className="relative py-14 sm:py-20 md:py-32 bg-[#080808] text-[#F7F7F2] overflow-hidden border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 sm:pb-6 mb-10 sm:mb-14">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-[#EAB308] font-mono text-xs">10</span>
            <span className="text-neutral-500 font-mono text-xs">/</span>
            <span className="text-[11px] sm:text-xs font-bold tracking-widest uppercase text-neutral-400">
              LOCATION & RESERVATIONS
            </span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs text-[#EAB308]">
            <span className="w-2 h-2 rounded-full bg-[#EAB308] animate-pulse" />
            <span>RYK TIME: {currentTime || 'PKT'}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left Column: Authentic Restaurant Coordinates & Details */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono text-[#EAB308] uppercase tracking-widest mb-1.5 sm:mb-2 block">
                [ WELCOME TO KAPITAL KITCHEN ]
              </span>
              <h2 className="font-display font-black text-[clamp(1.85rem,5.5vw,3rem)] sm:text-[clamp(2.5rem,5.5vw,3.8rem)] md:text-[clamp(2.8rem,5vw,4.2rem)] lg:text-[clamp(3rem,4.5vw,4.5rem)] text-white tracking-tight sm:tracking-tighter leading-[1.05]">
                VISIT US IN <br />
                <span className="text-[#EAB308]">RAHIM YAR KHAN</span>
              </h2>

              <p className="mt-3.5 sm:mt-5 text-neutral-300 font-light text-xs sm:text-sm md:text-base leading-relaxed max-w-md">
                Located in Modal Town near City Park, Rahim Yar Khan. Whether joining us for a celebratory steak, an artisan pizza, or evening mocktails, our doors are open daily.
              </p>

              <div className="mt-6 sm:mt-8 flex flex-col gap-4 sm:gap-5 border-t border-white/10 pt-5 sm:pt-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-[#EAB308]">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-[11px] font-mono uppercase text-neutral-400 block mb-0.5">
                      EXACT ADDRESS
                    </span>
                    <p className="text-xs sm:text-sm font-medium text-white">
                      {RESTAURANT_INFO.fullAddress}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-[#EAB308]">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-[11px] font-mono uppercase text-neutral-400 block mb-0.5">
                      DIRECT PHONE & ORDERS
                    </span>
                    <a
                      href={`tel:${RESTAURANT_INFO.phone}`}
                      className="text-sm sm:text-base font-bold text-[#EAB308] hover:underline"
                    >
                      {RESTAURANT_INFO.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-[#EAB308]">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-[11px] font-mono uppercase text-neutral-400 block mb-0.5">
                      HOURS OF OPERATION
                    </span>
                    <p className="text-xs sm:text-sm font-medium text-white">
                      {RESTAURANT_INFO.openingHours}
                    </p>
                    <p className="text-[11px] sm:text-xs text-neutral-500 mt-0.5">
                      {RESTAURANT_INFO.kitchenClose}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct External Action Links */}
            <div className="mt-6 sm:mt-10 flex flex-wrap gap-2.5 sm:gap-3">
              <a
                href="https://maps.google.com/?q=Kapital+Kitchen,+C8F6%2B9MF,+Modal+Town,+Rahim+Yar+Khan"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-semibold text-white transition-colors"
              >
                <span>Google Maps Directions</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#EAB308]" />
              </a>

              <a
                href="https://wa.me/923357357355?text=Hello%20Kapital%20Kitchen%2C%20I%20would%20like%20to%20reserve%20a%20table%20in%20Rahim%20Yar%20Khan"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-[#EAB308]/20 hover:bg-[#EAB308]/30 border border-[#EAB308]/40 text-xs font-bold text-[#EAB308] transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Inquiries</span>
              </a>
            </div>
          </div>

          {/* Right Column: Working Table Reservation Desk */}
          <div className="lg:col-span-6 bg-[#121212] p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border border-white/15 shadow-2xl relative">
            <div className="mb-6">
              <span className="text-[10px] font-mono text-[#EAB308] uppercase tracking-widest block mb-1">
                ONLINE RESERVATION DESK
              </span>
              <h3 className="font-display font-extrabold text-2xl text-white">
                Book Your Table Experience
              </h3>
              <p className="text-xs text-neutral-400 mt-1 font-light">
                Reserve in advance for guaranteed seating and personalized kitchen prep.
              </p>
            </div>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 flex flex-col items-center text-center gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-[#EAB308]/20 border border-[#EAB308] flex items-center justify-center text-[#EAB308]">
                  <Check className="w-8 h-8" />
                </div>
                <h4 className="font-display font-black text-2xl text-white">
                  Reservation Received!
                </h4>
                {bookingRef && (
                  <span className="font-mono text-xs px-3 py-1 rounded-full bg-[#EAB308]/20 border border-[#EAB308]/40 text-[#EAB308]">
                    REFERENCE: {bookingRef}
                  </span>
                )}
                <p className="text-sm text-neutral-300 max-w-sm">
                  Thank you, <strong className="text-white">{formData.name}</strong>. Our host at Kapital Kitchen Rahim Yar Khan has reserved for {formData.guests} on {formData.date || 'today'} at {formData.time}.
                </p>
                <p className="text-xs text-[#EAB308] font-mono mt-2">
                  CONFIRMATION SENT TO {formData.phone}
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 px-6 py-2 rounded-full bg-white/10 hover:bg-white/15 text-xs text-white uppercase font-bold"
                >
                  Make Another Booking
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
                    <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1.5">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tariq Malik"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-[#EAB308] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0300-1234567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-[#EAB308] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1.5">
                      Party Size
                    </label>
                    <div className="relative">
                      <select
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#1a1a1a] border border-white/10 text-white text-sm focus:border-[#EAB308] focus:outline-none appearance-none"
                      >
                        <option value="1 Guest">1 Guest</option>
                        <option value="2 Guests">2 Guests</option>
                        <option value="4 Guests">4 Guests</option>
                        <option value="6 Guests">6 Guests</option>
                        <option value="8+ Large Party">8+ Large Party</option>
                      </select>
                      <Users className="w-4 h-4 text-neutral-400 absolute right-3 top-3.5 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1.5">
                      Dining Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-[#EAB308] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1.5">
                      Preferred Time
                    </label>
                    <input
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-[#EAB308] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1.5">
                    Dietary Requirements or Special Requests
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Anniversary dinner, booth seating preference..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-[#EAB308] focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 py-4 rounded-full bg-[#EAB308] hover:bg-[#FACC15] disabled:opacity-50 text-black font-extrabold text-xs tracking-widest uppercase transition-transform active:scale-98 cursor-pointer shadow-lg shadow-[#EAB308]/20 flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{isSubmitting ? 'Confirming...' : 'Confirm Table Reservation'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
