import { useState, useEffect, useRef } from 'react';
import { ArrowUp, MapPin, Phone, Instagram, Facebook, ArrowRight, ArrowLeft } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scroll-direction motion for bottom editorial typography
  const lastScrollY = useRef(0);
  const offsetRef = useRef(0);
  const targetOffsetRef = useRef(0);
  const [trackOffset, setTrackOffset] = useState(0);

  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;
      if (Math.abs(delta) > 0.5) {
        // Subtle velocity accumulation based on scroll direction
        targetOffsetRef.current += delta * 0.25;
      }
      lastScrollY.current = currentScrollY;
    };

    const updateMotion = () => {
      // Smooth dampening towards target
      offsetRef.current += (targetOffsetRef.current - offsetRef.current) * 0.08;
      setTrackOffset(offsetRef.current);
      rafId = requestAnimationFrame(updateMotion);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    rafId = requestAnimationFrame(updateMotion);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <footer className="relative bg-[#060606] text-[#F7F7F2] pt-14 sm:pt-20 md:pt-24 pb-8 sm:pb-12 px-4 sm:px-8 lg:px-16 overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col justify-between">
        {/* Upper Footer: Brand & Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 pb-12 sm:pb-16 border-b border-white/10">
          <div className="md:col-span-5 flex flex-col gap-3.5 sm:gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#EAB308]" />
              <span className="font-display font-extrabold tracking-tighter text-lg sm:text-xl text-white">
                KAPITAL <span className="text-[#EAB308]">KITCHEN</span>
              </span>
            </div>
            <p className="text-xs font-mono text-[#EAB308] tracking-widest uppercase">
              {RESTAURANT_INFO.tagline}
            </p>
            <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-sm leading-relaxed">
              An experimental typography-driven culinary experience in Rahim Yar Khan. Steakhouse, artisan smash burgers, woodfired pizzas, and warm memories.
            </p>
          </div>

          <div className="md:col-span-3 flex flex-col gap-2 sm:gap-2.5">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#EAB308] mb-1">
              NAVIGATION
            </span>
            <a href="#story" className="text-xs sm:text-sm text-neutral-300 hover:text-white transition-colors py-0.5">
              The Story & Philosophy
            </a>
            <a href="#signatures" className="text-xs sm:text-sm text-neutral-300 hover:text-white transition-colors py-0.5">
              Signature Dishes
            </a>
            <a href="#menu" className="text-xs sm:text-sm text-neutral-300 hover:text-white transition-colors py-0.5">
              The Editorial Menu
            </a>
            <a href="#atmosphere" className="text-xs sm:text-sm text-neutral-300 hover:text-white transition-colors py-0.5">
              The Experience
            </a>
            <a href="#gallery" className="text-xs sm:text-sm text-neutral-300 hover:text-white transition-colors py-0.5">
              Visual Archive
            </a>
            <a href="#location" className="text-xs sm:text-sm text-neutral-300 hover:text-white transition-colors py-0.5">
              Location & Hours
            </a>
          </div>

          <div className="md:col-span-4 flex flex-col gap-2.5 sm:gap-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#EAB308] mb-1">
              CONNECT & VISIT
            </span>
            <p className="text-xs text-neutral-400 flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#EAB308] shrink-0 mt-0.5" />
              <span>{RESTAURANT_INFO.fullAddress}</span>
            </p>
            <p className="text-xs text-neutral-400 flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#EAB308] shrink-0" />
              <a href={`tel:${RESTAURANT_INFO.phone}`} className="hover:text-white transition-colors">
                Direct: {RESTAURANT_INFO.phoneDisplay}
              </a>
            </p>

            <div className="flex items-center gap-3 mt-2 sm:mt-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-300 hover:text-[#EAB308] hover:border-[#EAB308] transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-300 hover:text-[#EAB308] hover:border-[#EAB308] transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Phase 12 & 13: Luxury Editorial Typography with Scroll-Direction Motion */}
        <div className="py-8 sm:py-12 border-b border-white/10 overflow-hidden select-none flex flex-col gap-3 sm:gap-5 w-full">
          {/* Track 1: KAPITAL KITCHEN -> -> -> */}
          <div className="w-full overflow-hidden whitespace-nowrap">
            <div
              style={{
                transform: `translate3d(${-(trackOffset * 0.4) % 360}px, 0, 0)`,
                willChange: 'transform',
              }}
              className="inline-flex items-center gap-6 sm:gap-10 text-[clamp(1.5rem,4.5vw,3.5rem)] font-display font-black tracking-tighter text-[#F7F7F2]/40 uppercase"
            >
              {[...Array(6)].map((_, i) => (
                <span key={i} className="inline-flex items-center gap-3 sm:gap-5">
                  <span>KAPITAL</span>
                  <span className="text-[#EAB308]/60">KITCHEN</span>
                  <ArrowRight className="w-4 h-4 sm:w-6 sm:h-6 text-[#EAB308]/50 inline-block" />
                </span>
              ))}
            </div>
          </div>

          {/* Track 2: <- <- <- RAHIM YAR KHAN */}
          <div className="w-full overflow-hidden whitespace-nowrap">
            <div
              style={{
                transform: `translate3d(${(trackOffset * 0.4) % 360}px, 0, 0)`,
                willChange: 'transform',
              }}
              className="inline-flex items-center gap-6 sm:gap-10 text-[clamp(1.2rem,3.8vw,3rem)] font-display font-black tracking-tight text-outline uppercase"
            >
              {[...Array(6)].map((_, i) => (
                <span key={i} className="inline-flex items-center gap-3 sm:gap-5">
                  <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-600 inline-block" />
                  <span>RAHIM YAR KHAN</span>
                  <span className="text-[#EAB308]/50 text-xs sm:text-sm font-mono tracking-widest">
                    [ EST. RYK ]
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Phase 14: Giant Monolithic Interactive Wordmark in the Footer */}
        <div className="py-8 sm:py-12 md:py-16 select-none text-center w-full max-w-full flex justify-center items-center overflow-hidden">
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="group font-display font-black text-[clamp(1.4rem,min(6vw,6.5vh),7.5rem)] sm:text-[clamp(2.4rem,min(6.5vw,7.5vh),8.5rem)] lg:text-[clamp(3.5rem,min(7vw,8.5vh),9.5rem)] leading-none tracking-tight sm:tracking-tighter text-white/20 hover:text-[#EAB308] transition-all duration-500 cursor-pointer inline-flex items-center justify-center gap-2 sm:gap-4 uppercase whitespace-nowrap hover:drop-shadow-[0_0_35px_rgba(234,179,8,0.35)]"
          >
            <span>KAPITAL</span>
            <span className="text-[#EAB308]/60 group-hover:text-[#EAB308] transition-colors">KITCHEN</span>
          </button>
        </div>

        {/* Lower Row: Copyright & Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10 text-xs text-neutral-400">
          <div className="flex items-center gap-2 text-neutral-400">
            <span>© {new Date().getFullYear()} Kapital Kitchen RYK</span>
            <span>·</span>
            <span>Rahim Yar Khan, Punjab, Pakistan</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-[#EAB308] text-xs transition-colors cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#EAB308]" />
          </button>
        </div>
      </div>
    </footer>
  );
}
