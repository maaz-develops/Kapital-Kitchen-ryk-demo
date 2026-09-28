import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronDown, MapPin, Compass, Sparkles } from 'lucide-react';
import heroAmbiance from '../assets/images/hero_restaurant_ambiance_1790432565003.jpg';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface HeroSectionProps {
  onExploreClick: () => void;
  onReserveClick: () => void;
}

export default function HeroSection({ onExploreClick, onReserveClick }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax transforms
  const yImage = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const scaleImage = useTransform(scrollYProgress, [0, 1], [1.08, 1.25]);
  const opacityText = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const yText = useTransform(scrollYProgress, [0, 0.7], ['0%', '-15%']);

  const kapitalLetters = 'KAPITAL'.split('');
  const kitchenLetters = 'KITCHEN'.split('');

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] w-full flex flex-col justify-between overflow-hidden bg-[#0C0C0C] pt-16 min-[360px]:pt-20 sm:pt-24 md:pt-28 pb-4 min-[360px]:pb-6 sm:pb-8 px-3 min-[360px]:px-4 sm:px-8 md:px-14 lg:px-20"
    >
      {/* Background Image with Cinematic Underneath Parallax */}
      <motion.div
        style={{ y: yImage, scale: scaleImage }}
        className="absolute inset-0 pointer-events-none will-change-transform"
      >
        <img
          src={heroAmbiance}
          alt="Kapital Kitchen Interior Ambiance, Rahim Yar Khan"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center brightness-[0.42] contrast-[1.12]"
        />
        {/* Subtle Dark Vignette & Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-transparent to-[#0C0C0C]/80" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#0C0C0C]/40 to-[#0C0C0C]/90" />
      </motion.div>

      {/* Top Meta Kicker */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3 sm:pb-4 text-[11px] sm:text-xs font-semibold tracking-widest text-neutral-300 uppercase"
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:py-1 rounded-full bg-[#EAB308]/20 border border-[#EAB308]/40 text-[#EAB308] text-[10px] font-mono tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EAB308] animate-ping" />
            LIVE KITCHEN
          </span>
          <span className="hidden sm:inline-block text-neutral-500">·</span>
          <span className="flex items-center gap-1 text-white">
            <MapPin className="w-3.5 h-3.5 text-[#EAB308]" />
            {RESTAURANT_INFO.city}
          </span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 text-neutral-300">
          <span className="hidden md:inline font-mono tracking-normal text-neutral-400 text-xs">
            {RESTAURANT_INFO.tagline}
          </span>
          <span className="text-[#EAB308] font-bold text-xs">EST. RYK</span>
        </div>
      </motion.div>

      {/* Main Massive Editorial Typography Anchor: KAPITAL KITCHEN */}
      <motion.div
        style={{ opacity: opacityText, y: yText }}
        className="relative z-10 my-auto py-2 sm:py-6 md:py-8 flex flex-col justify-center select-none w-full max-w-full"
      >
        {/* Row 1: KAPITAL */}
        <div className="leading-[0.92] w-full py-0.5">
          <div className="flex items-baseline tracking-tight sm:tracking-tighter justify-start flex-nowrap">
            {kapitalLetters.map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.12 + index * 0.035,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="font-display font-black text-[clamp(2.1rem,min(9vw,10vh),3.6rem)] sm:text-[clamp(3.2rem,min(9.8vw,12vh),5.5rem)] md:text-[clamp(4.2rem,min(10.5vw,13vh),7.5rem)] lg:text-[clamp(5.2rem,min(11vw,14vh),9.5rem)] xl:text-[clamp(6rem,min(11.5vw,15vh),11rem)] text-[#F7F7F2] inline-block will-change-transform drop-shadow-2xl"
              >
                {char}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Row 2: KITCHEN - Solid, bright, vibrant and fully visible */}
        <div className="leading-[0.92] mt-1 sm:mt-2 flex items-baseline justify-between gap-4 w-full py-0.5">
          <div className="flex items-baseline tracking-tight sm:tracking-tighter justify-start flex-nowrap shrink-0">
            {kitchenLetters.map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.25 + index * 0.035,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="font-display font-black text-[clamp(2.1rem,min(9vw,10vh),3.6rem)] sm:text-[clamp(3.2rem,min(9.8vw,12vh),5.5rem)] md:text-[clamp(4.2rem,min(10.5vw,13vh),7.5rem)] lg:text-[clamp(5.2rem,min(11vw,14vh),9.5rem)] xl:text-[clamp(6rem,min(11.5vw,15vh),11rem)] text-[#EAB308] inline-block will-change-transform drop-shadow-[0_4px_25px_rgba(234,179,8,0.25)]"
              >
                {char}
              </motion.span>
            ))}
          </div>

          {/* Editorial statement block nested beside huge letters on large screens */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: 'easeOut' }}
            className="hidden 2xl:flex flex-col max-w-xs text-right pr-4 pb-1 shrink-0"
          >
            <span className="text-[#EAB308] font-mono text-xs uppercase tracking-widest mb-1 flex items-center justify-end gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Gastronomic Artistry
            </span>
            <p className="text-xs sm:text-sm font-light text-neutral-300 leading-relaxed">
              Charcoal-fire steaks, artisan smash patties, and blistered crusts. Redefining dining in Rahim Yar Khan.
            </p>
          </motion.div>
        </div>

        {/* Sub-Tagline & Location Ribbon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-6 sm:mt-8 md:mt-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 sm:w-12 h-[2px] bg-[#EAB308]" />
            <p className="font-display font-bold tracking-widest text-[11px] sm:text-sm uppercase text-neutral-300">
              GOOD FOOD. GOOD MOOD.
            </p>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            <button
              onClick={onExploreClick}
              className="group inline-flex items-center gap-2 py-2 sm:py-1 text-[11px] sm:text-xs font-bold tracking-widest uppercase text-white hover:text-[#EAB308] transition-colors cursor-pointer"
            >
              <span>Explore The Story</span>
              <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#EAB308] group-hover:rotate-45 transition-transform duration-300" />
            </button>
            <span className="text-neutral-600">/</span>
            <button
              onClick={onReserveClick}
              className="py-2 sm:py-1 text-[11px] sm:text-xs font-bold tracking-widest uppercase text-[#EAB308] hover:underline cursor-pointer"
            >
              Reserve Table
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Tiny Elegant Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="relative z-10 flex items-center justify-between border-t border-white/10 pt-3 sm:pt-4"
      >
        <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono tracking-widest text-neutral-400 uppercase">
          <span className="text-[#EAB308]">01</span>
          <span>//</span>
          <span>SCROLL TO DISCOVER</span>
        </div>

        <motion.button
          onClick={onExploreClick}
          aria-label="Scroll down"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/20 flex items-center justify-center text-neutral-300 hover:text-[#EAB308] hover:border-[#EAB308] transition-colors cursor-pointer"
        >
          <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </motion.button>

        <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono tracking-widest text-neutral-400">
          <span>MODAL TOWN</span>
          <span>·</span>
          <span>RAHIM YAR KHAN</span>
        </div>
      </motion.div>
    </section>
  );
}
