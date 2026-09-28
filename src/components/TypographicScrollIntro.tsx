import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import burgerImg from '../assets/images/dish_smash_burger_1790432584127.jpg';
import friesImg from '../assets/images/dish_loaded_fries_1790432627838.jpg';
import pizzaImg from '../assets/images/dish_artisan_pizza_1790432610272.jpg';

export default function TypographicScrollIntro() {
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

  // Responsive parallax transforms for words
  const travelFood = isMobile ? ['-2%', '1.5%'] : isTablet ? ['-5%', '3.5%'] : ['-10%', '6%'];
  const travelPeople = isMobile ? ['1.5%', '-2%'] : isTablet ? ['4%', '-3.5%'] : ['10%', '-8%'];
  const travelMoments = isMobile ? ['-1.5%', '2%'] : isTablet ? ['-3%', '5%'] : ['-6%', '12%'];

  const xFood = useTransform(scrollYProgress, [0.1, 0.5], travelFood);
  const xPeople = useTransform(scrollYProgress, [0.3, 0.7], travelPeople);
  const xMoments = useTransform(scrollYProgress, [0.5, 0.9], travelMoments);

  const opacityFood = useTransform(scrollYProgress, [0.1, 0.3, 0.6], [0.35, 1, 0.45]);
  const opacityPeople = useTransform(scrollYProgress, [0.25, 0.5, 0.8], [0.35, 1, 0.45]);
  const opacityMoments = useTransform(scrollYProgress, [0.45, 0.7, 0.95], [0.35, 1, 0.45]);

  const scaleImg1 = useTransform(scrollYProgress, [0.15, 0.45], [0.92, 1.05]);
  const rotateImg1 = useTransform(scrollYProgress, [0.15, 0.45], [-2, 2]);

  const scaleImg2 = useTransform(scrollYProgress, [0.35, 0.65], [0.92, 1.05]);
  const rotateImg2 = useTransform(scrollYProgress, [0.35, 0.65], [2, -2]);

  return (
    <section
      id="story"
      ref={containerRef}
      className="relative min-h-[105vh] sm:min-h-[125vh] md:min-h-[140vh] py-14 sm:py-20 md:py-32 bg-[#0C0C0C] text-[#F7F7F2] overflow-hidden w-full max-w-full flex flex-col justify-center"
    >
      {/* Decorative vertical editorial line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent pointer-events-none" />

      {/* Section Sub-header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-10 sm:mb-14 md:mb-20 flex items-center justify-between border-b border-white/10 pb-4 sm:pb-6 w-full relative z-10">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-[#EAB308] font-mono text-xs">02</span>
          <span className="text-neutral-500 font-mono text-xs">/</span>
          <span className="text-[11px] sm:text-xs font-bold tracking-widest uppercase text-neutral-400">
            PHILOSOPHY & RHYTHM
          </span>
        </div>
        <p className="text-[10px] sm:text-xs font-mono text-neutral-400 uppercase tracking-widest hidden sm:block">
          THE THREE PILLARS OF KAPITAL
        </p>
      </div>

      {/* Dynamic Typographic Stagger Container */}
      <div className="w-full max-w-full flex flex-col gap-8 sm:gap-12 md:gap-18 relative z-10 overflow-hidden">
        {/* WORD 1: FOOD with interleaved floating preview image */}
        <div className="relative w-full max-w-full flex items-center justify-start overflow-hidden py-1.5 sm:py-3">
          <motion.div
            style={{ x: xFood, opacity: opacityFood }}
            className="flex items-center gap-2 xs:gap-3 sm:gap-6 md:gap-10 pl-2 sm:pl-6 md:pl-12 whitespace-nowrap will-change-transform max-w-full"
          >
            <span className="font-display font-black text-[clamp(1.85rem,6.8vw,3.2rem)] sm:text-[clamp(2.8rem,6.5vw,4.5rem)] md:text-[clamp(3.8rem,7.5vw,6rem)] lg:text-[clamp(5.5rem,9.5vw,9rem)] xl:text-[clamp(7rem,11.5vw,11.5rem)] tracking-tight sm:tracking-tighter leading-none text-[#F7F7F2]">
              FOOD
            </span>

            {/* Embedded Floating Image Card */}
            <motion.div
              style={{ scale: scaleImg1, rotate: rotateImg1 }}
              className="w-14 h-10 xs:w-18 xs:h-12 sm:w-28 sm:h-18 md:w-40 md:h-26 lg:w-56 lg:h-34 rounded-xl sm:rounded-2xl overflow-hidden border border-white/15 shadow-2xl relative shrink-0 group"
            >
              <img
                src={burgerImg}
                alt="Kapital Smash Burger"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-1 sm:p-2.5">
                <span className="text-[8px] sm:text-[10px] font-mono text-[#EAB308] tracking-widest uppercase">
                  SMASH PATTY
                </span>
              </div>
            </motion.div>

            <span className="font-display font-extrabold text-[clamp(1.25rem,4.5vw,2.2rem)] sm:text-[clamp(2rem,4.8vw,3.2rem)] md:text-[clamp(2.6rem,5.5vw,4.2rem)] lg:text-[clamp(3.8rem,7vw,6.5rem)] xl:text-[clamp(5rem,8.5vw,8.5rem)] tracking-tight sm:tracking-tighter leading-none text-outline">
              CRAFT
            </span>
          </motion.div>
        </div>

        {/* Editorial Interlude Statement */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center my-1 sm:my-2">
          <p className="text-xs sm:text-base md:text-lg text-neutral-400 font-light leading-relaxed max-w-xl mx-auto">
            We don’t believe in rushed nourishment. Every sauce is crafted in-house, each cut hand-trimmed, and every plate served with relentless hospitality.
          </p>
        </div>

        {/* WORD 2: PEOPLE with interleaved floating preview image */}
        <div className="relative w-full max-w-full flex items-center justify-end overflow-hidden py-1.5 sm:py-3">
          <motion.div
            style={{ x: xPeople, opacity: opacityPeople }}
            className="flex items-center gap-2 xs:gap-3 sm:gap-6 md:gap-10 pr-2 sm:pr-6 md:pr-12 whitespace-nowrap will-change-transform flex-row-reverse max-w-full"
          >
            <span className="font-display font-black text-[clamp(1.85rem,6.8vw,3.2rem)] sm:text-[clamp(2.8rem,6.5vw,4.5rem)] md:text-[clamp(3.8rem,7.5vw,6rem)] lg:text-[clamp(5.5rem,9.5vw,9rem)] xl:text-[clamp(7rem,11.5vw,11.5rem)] tracking-tight sm:tracking-tighter leading-none text-[#EAB308]">
              PEOPLE
            </span>

            {/* Embedded Floating Image Card */}
            <motion.div
              style={{ scale: scaleImg2, rotate: rotateImg2 }}
              className="w-14 h-10 xs:w-18 xs:h-12 sm:w-28 sm:h-18 md:w-40 md:h-26 lg:w-56 lg:h-34 rounded-xl sm:rounded-2xl overflow-hidden border border-[#EAB308]/30 shadow-2xl relative shrink-0 group"
            >
              <img
                src={pizzaImg}
                alt="Kapital Woodfired Pizza"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-1 sm:p-2.5">
                <span className="text-[8px] sm:text-[10px] font-mono text-[#EAB308] tracking-widest uppercase">
                  SHARED TABLES
                </span>
              </div>
            </motion.div>

            <span className="font-display font-extrabold text-[clamp(1.25rem,4.5vw,2.2rem)] sm:text-[clamp(2rem,4.8vw,3.2rem)] md:text-[clamp(2.6rem,5.5vw,4.2rem)] lg:text-[clamp(3.8rem,7vw,6.5rem)] xl:text-[clamp(5rem,8.5vw,8.5rem)] tracking-tight sm:tracking-tighter leading-none text-outline">
              CONNECT
            </span>
          </motion.div>
        </div>

        {/* WORD 3: MOMENTS with full viewport presence */}
        <div className="relative w-full max-w-full flex items-center justify-center overflow-hidden py-1.5 sm:py-3">
          <motion.div
            style={{ x: xMoments, opacity: opacityMoments }}
            className="flex items-center gap-2 xs:gap-3 sm:gap-6 md:gap-8 whitespace-nowrap will-change-transform max-w-full"
          >
            <span className="font-display font-black text-[clamp(1.6rem,6vw,2.8rem)] sm:text-[clamp(2.5rem,6vw,4rem)] md:text-[clamp(3.4rem,7vw,5.5rem)] lg:text-[clamp(5rem,9vw,8rem)] xl:text-[clamp(6.5rem,10.5vw,10.5rem)] tracking-tight sm:tracking-tighter leading-none text-[#F7F7F2]">
              MOMENTS
            </span>

            {/* Embedded Floating Image Card */}
            <div className="w-12 h-9 xs:w-16 xs:h-11 sm:w-26 sm:h-17 md:w-36 md:h-24 lg:w-48 lg:h-30 rounded-xl sm:rounded-2xl overflow-hidden border border-white/20 shadow-2xl relative shrink-0">
              <img
                src={friesImg}
                alt="Kapital Loaded Mexican Fries"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-1 sm:p-1.5">
                <span className="text-[7px] sm:text-[9px] font-mono text-white tracking-widest uppercase">
                  UNFORGETTABLE
                </span>
              </div>
            </div>

            <span className="font-display font-black text-[clamp(1.6rem,6vw,2.8rem)] sm:text-[clamp(2.5rem,6vw,4rem)] md:text-[clamp(3.4rem,7vw,5.5rem)] lg:text-[clamp(5rem,9vw,8rem)] xl:text-[clamp(6.5rem,10.5vw,10.5rem)] tracking-tight sm:tracking-tighter leading-none text-[#EAB308]">
              ETERNAL
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
