import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import steakImg from '../assets/images/dish_charcoal_steak_1790432597387.jpg';

export default function FlavourRevealSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Typography moves upward across viewport
  const yFlavour = useTransform(scrollYProgress, [0.1, 0.7], ['15%', '-60%']);
  const opacityFlavour = useTransform(scrollYProgress, [0.1, 0.45, 0.75], [0.95, 1, 0.2]);

  // Image zoom and reveal
  const scaleImage = useTransform(scrollYProgress, [0.1, 0.8], [1.25, 1.0]);
  const yImage = useTransform(scrollYProgress, [0.1, 0.8], ['-5%', '5%']);

  // Secondary text appears
  const opacitySub = useTransform(scrollYProgress, [0.45, 0.75], [0, 1]);
  const ySub = useTransform(scrollYProgress, [0.45, 0.75], [40, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100vh] sm:min-h-[120vh] md:min-h-[140vh] bg-[#0A0A0A] overflow-hidden w-full max-w-full flex flex-col justify-center items-center py-12 sm:py-20 px-3 sm:px-6"
    >
      {/* Container holding the background image */}
      <div className="relative w-full max-w-6xl aspect-[4/5] xs:aspect-[1/1] sm:aspect-[16/9] min-h-[350px] xs:min-h-[390px] sm:min-h-0 mx-auto rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
        <motion.div
          style={{ scale: scaleImage, y: yImage }}
          className="w-full h-full will-change-transform"
        >
          <img
            src={steakImg}
            alt="Prime Charred Ribeye Steak, Kapital Kitchen"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover brightness-[0.6] contrast-[1.1]"
          />
        </motion.div>

        {/* Masked Dark Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80 pointer-events-none" />

        {/* OVERSIZED "FLAVOUR" TYPOGRAPHY THAT RISES ON SCROLL */}
        <motion.div
          style={{ y: yFlavour, opacity: opacityFlavour }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none will-change-transform z-10 px-4"
        >
          <h2 className="font-display font-black text-[clamp(2.3rem,9.5vw,4.2rem)] sm:text-[clamp(4.2rem,11vw,6.5rem)] md:text-[clamp(5.5rem,11.5vw,8rem)] lg:text-[clamp(7rem,12vw,9.5rem)] leading-none tracking-tight sm:tracking-tighter text-[#F7F7F2] drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
            FLAVOUR
          </h2>
        </motion.div>

        {/* SUBSEQUENT TEXT THAT APPEARS AS FLAVOUR MOVES UP */}
        <motion.div
          style={{ opacity: opacitySub, y: ySub }}
          className="absolute bottom-4 sm:bottom-10 left-3.5 sm:left-10 md:left-12 right-3.5 sm:right-10 md:right-12 z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-2.5 sm:gap-4 pointer-events-auto"
        >
          <div>
            <span className="text-[10px] sm:text-xs font-mono text-[#EAB308] uppercase tracking-widest block mb-1">
              [ UNCOMPROMISED SEASONING ]
            </span>
            <h3 className="font-display font-black text-base xs:text-lg sm:text-2xl md:text-3xl text-white">
              PURE INTENSITY. NO SHORTCUTS.
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-neutral-300 max-w-xs font-light">
            Every sear, spice dust, and reduction is tested to hit the exact note that leaves you wanting another bite.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
