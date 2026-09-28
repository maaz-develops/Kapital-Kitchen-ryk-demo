import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import steakImg from '../assets/images/dish_charcoal_steak_1790432597387.jpg';

export default function BrandMomentSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Responsive horizontal typography motion
  const travelTop = isMobile ? ['1%', '-8%'] : isTablet ? ['3%', '-16%'] : ['5%', '-30%'];
  const travelBottom = isMobile ? ['-8%', '1%'] : isTablet ? ['-16%', '3%'] : ['-30%', '5%'];
  const travelImage = isMobile ? ['-2%', '2%'] : isTablet ? ['-5%', '5%'] : ['-12%', '12%'];

  const xTextTop = useTransform(scrollYProgress, [0, 1], travelTop);
  const xTextBottom = useTransform(scrollYProgress, [0, 1], travelBottom);

  // Central editorial image moves in counter-direction
  const xImage = useTransform(scrollYProgress, [0, 1], travelImage);
  const scaleImage = useTransform(scrollYProgress, [0.2, 0.7], [0.96, 1.08]);
  const rotateImage = useTransform(scrollYProgress, [0, 1], [-1.5, 1.5]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[95vh] sm:min-h-[110vh] md:min-h-[120vh] py-12 sm:py-20 bg-[#0A0A0A] overflow-hidden w-full max-w-full flex flex-col justify-center select-none border-y border-white/5"
    >
      {/* Background Accent Grid / Subtle Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#EAB308_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.04] pointer-events-none" />

      {/* Row 1: Massive KAPITAL KITCHEN (moving horizontally) */}
      <div className="w-full max-w-full overflow-hidden leading-none z-10 py-1">
        <motion.div
          style={{ x: xTextTop }}
          className="whitespace-nowrap flex items-center gap-4 sm:gap-8 md:gap-12 will-change-transform max-w-full"
        >
          <span className="font-display font-black text-[clamp(2.2rem,8.5vw,3.8rem)] sm:text-[clamp(3.5rem,10vw,6rem)] md:text-[clamp(4.5rem,12vw,8rem)] lg:text-[13vw] tracking-tight sm:tracking-tighter text-[#F7F7F2] uppercase">
            KAPITAL <span className="text-[#EAB308]">KITCHEN</span>
          </span>
          <span className="font-display font-black text-[clamp(2.2rem,8.5vw,3.8rem)] sm:text-[clamp(3.5rem,10vw,6rem)] md:text-[clamp(4.5rem,12vw,8rem)] lg:text-[13vw] tracking-tight sm:tracking-tighter text-outline-thick uppercase">
            KAPITAL <span className="text-[#EAB308]">KITCHEN</span>
          </span>
          <span className="font-display font-black text-[clamp(2.2rem,8.5vw,3.8rem)] sm:text-[clamp(3.5rem,10vw,6rem)] md:text-[clamp(4.5rem,12vw,8rem)] lg:text-[13vw] tracking-tight sm:tracking-tighter text-[#EAB308] uppercase">
            KAPITAL <span className="text-[#F7F7F2]">KITCHEN</span>
          </span>
        </motion.div>
      </div>

      {/* Central Counter-Floating Visual with Editorial Framing */}
      <div className="relative z-20 my-[-2vw] sm:my-[-5vw] md:my-[-8vw] max-w-4xl mx-auto px-4 sm:px-6 w-full flex flex-col items-center">
        <motion.div
          style={{ x: xImage, scale: scaleImage, rotate: rotateImage }}
          className="relative w-full max-w-[280px] xs:max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] border border-white/20 will-change-transform group"
        >
          <img
            src={steakImg}
            alt="Kapital Kitchen Live Charcoal Grill"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-between p-3.5 sm:p-6">
            <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono text-[#EAB308]">
              <span>[ 03 · THE HARVEST & GRILL ]</span>
              <span>RAHIM YAR KHAN</span>
            </div>
            <div>
              <p className="text-[9px] sm:text-xs uppercase tracking-widest text-neutral-300 font-bold mb-0.5 sm:mb-1">
                HARDWOOD CHARCOAL EMBERS
              </p>
              <h3 className="font-display font-extrabold text-sm sm:text-xl md:text-2xl text-white">
                Crafted With Fierce Precision
              </h3>
            </div>
          </div>
        </motion.div>

        {/* Small editorial caption underneath */}
        <div className="mt-3 sm:mt-6 flex items-center justify-between w-full max-w-[280px] xs:max-w-xs sm:max-w-md md:max-w-lg text-[9px] sm:text-[11px] font-mono text-neutral-400">
          <span>// FLAME TEMPERATURE: 480°C</span>
          <span className="text-[#EAB308]">AUTHENTIC DINING EXPERIENCE</span>
        </div>
      </div>

      {/* Row 2: Massive KAPITAL KITCHEN (moving in opposite direction) */}
      <div className="w-full max-w-full overflow-hidden leading-none z-10 py-1">
        <motion.div
          style={{ x: xTextBottom }}
          className="whitespace-nowrap flex items-center gap-4 sm:gap-8 md:gap-12 will-change-transform max-w-full"
        >
          <span className="font-display font-black text-[clamp(2.2rem,8.5vw,3.8rem)] sm:text-[clamp(3.5rem,10vw,6rem)] md:text-[clamp(4.5rem,12vw,8rem)] lg:text-[13vw] tracking-tight sm:tracking-tighter text-[#EAB308] uppercase">
            KAPITAL <span className="text-[#F7F7F2]">KITCHEN</span>
          </span>
          <span className="font-display font-black text-[clamp(2.2rem,8.5vw,3.8rem)] sm:text-[clamp(3.5rem,10vw,6rem)] md:text-[clamp(4.5rem,12vw,8rem)] lg:text-[13vw] tracking-tight sm:tracking-tighter text-[#F7F7F2] uppercase">
            KAPITAL <span className="text-[#EAB308]">KITCHEN</span>
          </span>
          <span className="font-display font-black text-[clamp(2.2rem,8.5vw,3.8rem)] sm:text-[clamp(3.5rem,10vw,6rem)] md:text-[clamp(4.5rem,12vw,8rem)] lg:text-[13vw] tracking-tight sm:tracking-tighter text-outline-thick uppercase">
            KAPITAL <span className="text-[#EAB308]">KITCHEN</span>
          </span>
        </motion.div>
      </div>
    </section>
  );
}
