import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { MapPin, Clock, Sparkles } from 'lucide-react';
import heroAmbiance from '../assets/images/hero_restaurant_ambiance_1790432565003.jpg';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface AtmosphereProps {
  onReserveClick: () => void;
}

export default function AtmosphereSection({ onReserveClick }: AtmosphereProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const yImg = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  const scaleImg = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);

  return (
    <section
      id="atmosphere"
      ref={containerRef}
      className="relative min-h-screen py-14 sm:py-20 md:py-32 bg-[#080808] text-[#F7F7F2] overflow-hidden w-full max-w-full flex flex-col justify-between"
    >
      {/* Top Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 w-full flex items-center justify-between border-b border-white/10 pb-4 sm:pb-6 relative z-10">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-[#EAB308] font-mono text-xs">08</span>
          <span className="text-neutral-500 font-mono text-xs">/</span>
          <span className="text-[11px] sm:text-xs font-bold tracking-widest uppercase text-neutral-400">
            THE EXPERIENCE
          </span>
        </div>
        <span className="text-[10px] sm:text-xs font-mono text-neutral-400 uppercase tracking-widest hidden sm:block">
          MODAL TOWN · RAHIM YAR KHAN
        </span>
      </div>

      {/* Main Breathing Center Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 my-auto py-8 sm:py-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center relative z-10">
        {/* Left Column: Huge Minimal Typography */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <span className="text-[#EAB308] font-mono text-xs uppercase tracking-widest mb-2.5 sm:mb-4 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            COZY CORNERS & WARM LIGHTING
          </span>

          <h2 className="font-display font-black text-[clamp(2.4rem,8vw,3.8rem)] sm:text-[clamp(3.2rem,7.5vw,5rem)] md:text-[clamp(4rem,8vw,6rem)] lg:text-[clamp(4.2rem,6.2vw,6.5rem)] xl:text-[clamp(5rem,6.8vw,7.8rem)] leading-[0.88] tracking-tight sm:tracking-tighter text-[#F7F7F2]">
            COME <br />
            <span className="text-[#EAB308]">HUNGRY.</span>
          </h2>

          <p className="mt-3.5 sm:mt-6 text-xs sm:text-sm md:text-base text-neutral-300 font-light max-w-md leading-relaxed">
            Step away from the bustle of Rahim Yar Khan into an intimate haven designed for slow dining, lingering aromas, and celebrated company.
          </p>

          <div className="mt-5 sm:mt-8 flex flex-wrap items-center gap-3.5 sm:gap-6">
            <button
              onClick={onReserveClick}
              className="px-5 sm:px-7 py-2.5 sm:py-3 rounded-full bg-[#EAB308] hover:bg-[#FACC15] text-black font-extrabold text-[11px] sm:text-xs tracking-widest uppercase transition-transform active:scale-95 cursor-pointer shadow-lg shadow-[#EAB308]/20"
            >
              Reserve An Evening
            </button>

            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
              <Clock className="w-4 h-4 text-[#EAB308]" />
              <span>{RESTAURANT_INFO.openingHours}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Architectural Photography Frame */}
        <div className="lg:col-span-6">
          <div className="relative aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 shadow-2xl group">
            <motion.img
              style={{ y: yImg, scale: scaleImg }}
              src={heroAmbiance}
              alt="Kapital Kitchen Warm Dining Hall, Rahim Yar Khan"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-between p-5 sm:p-8">
              <span className="self-end px-3 py-1 rounded-full bg-black/60 border border-white/15 backdrop-blur-md text-[10px] sm:text-[11px] font-mono text-[#EAB308]">
                INTERIOR AMBIANCE
              </span>

              <div>
                <p className="text-[10px] sm:text-xs uppercase tracking-widest text-[#EAB308] font-bold mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  Modal Town, Near City Park
                </p>
                <h4 className="font-display font-extrabold text-base sm:text-lg lg:text-xl text-white">
                  Designed for Conversation
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Quiet Proof Line */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 w-full flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-neutral-500 pt-4 sm:pt-6 border-t border-white/10 relative z-10">
        <span>// KAPITAL KITCHEN EXPERIENCE</span>
        <span>RESERVATIONS WELCOME · WALK-INS HONORED</span>
      </div>
    </section>
  );
}
