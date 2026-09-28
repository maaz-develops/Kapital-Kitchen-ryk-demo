import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import pizzaImg from '../assets/images/dish_artisan_pizza_1790432610272.jpg';
import burgerImg from '../assets/images/dish_smash_burger_1790432584127.jpg';
import dessertImg from '../assets/images/dish_molten_dessert_1790432644141.jpg';

export default function FoodStorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const scale1 = useTransform(scrollYProgress, [0.1, 0.4], [1.15, 1]);
  const yImage1 = useTransform(scrollYProgress, [0.1, 0.4], ['8%', '-8%']);

  const scale2 = useTransform(scrollYProgress, [0.35, 0.65], [1.15, 1]);
  const yImage2 = useTransform(scrollYProgress, [0.35, 0.65], ['8%', '-8%']);

  const scale3 = useTransform(scrollYProgress, [0.6, 0.9], [1.12, 1]);
  const yImage3 = useTransform(scrollYProgress, [0.6, 0.9], ['6%', '-6%']);

  return (
    <section
      ref={containerRef}
      className="relative py-14 sm:py-20 md:py-32 bg-[#0C0C0C] text-[#F7F7F2] overflow-hidden w-full max-w-full"
    >
      {/* Editorial Header Line */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 mb-8 sm:mb-14 flex items-center justify-between border-b border-white/10 pb-4 sm:pb-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-[#EAB308] font-mono text-xs">04</span>
          <span className="text-neutral-500 font-mono text-xs">/</span>
          <span className="text-[11px] sm:text-xs font-bold tracking-widest uppercase text-neutral-400">
            THE EDITORIAL RHYTHM
          </span>
        </div>
        <span className="text-[10px] sm:text-xs font-mono text-neutral-400 uppercase tracking-widest hidden sm:block">
          KAPITAL KITCHEN · RAHIM YAR KHAN
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex flex-col gap-10 sm:gap-16 md:gap-28">
        {/* ROW 1: MADE + Intersecting Food Mask 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-[#EAB308] font-mono text-xs uppercase tracking-widest mb-1.5 block">
              [ PHILOSOPHY ]
            </span>
            <h2 className="font-display font-black text-[clamp(2.35rem,8.5vw,4.5rem)] sm:text-[clamp(3.5rem,8.5vw,5.5rem)] lg:text-[clamp(4.2rem,8.5vw,6.5rem)] xl:text-[clamp(5.5rem,9vw,7.5rem)] leading-[0.88] tracking-tight sm:tracking-tighter text-[#F7F7F2]">
              MADE
            </h2>
            <p className="mt-3 sm:mt-4 text-xs sm:text-base text-neutral-400 font-light max-w-md leading-relaxed">
              Every creation starts with primal raw elements: cold-fermented sourdough, whole San Marzano tomatoes, and artisanal buffalo mozzarella.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 shadow-2xl group">
              <motion.img
                style={{ scale: scale1, y: yImage1 }}
                src={pizzaImg}
                alt="Handcrafted Buffalo Rustica Pizza"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4 sm:p-6">
                <div>
                  <span className="text-[9px] sm:text-[10px] font-mono text-[#EAB308] tracking-widest uppercase block mb-0.5">
                    ARTISAN 480°C
                  </span>
                  <p className="text-white font-display font-bold text-sm sm:text-base lg:text-lg">
                    Buffalo Rustica Margherita
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ROW 2: TO + Intersecting Food Mask 2 (Reversed) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#EAB308]/25 shadow-2xl group">
              <motion.img
                style={{ scale: scale2, y: yImage2 }}
                src={burgerImg}
                alt="Double Angus Smash Burger"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4 sm:p-6">
                <div>
                  <span className="text-[9px] sm:text-[10px] font-mono text-[#EAB308] tracking-widest uppercase block mb-0.5">
                    SMASHED FRESH TO ORDER
                  </span>
                  <p className="text-white font-display font-bold text-sm sm:text-base lg:text-lg">
                    Kapital Double Smash
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col justify-center lg:items-end text-left lg:text-right">
            <span className="text-[#EAB308] font-mono text-xs uppercase tracking-widest mb-1.5 block">
              [ CRAFTED TO PERFECTION ]
            </span>
            <h2 className="font-display font-black text-[clamp(2.35rem,8.5vw,4.5rem)] sm:text-[clamp(3.5rem,8.5vw,5.5rem)] lg:text-[clamp(4.2rem,8.5vw,6.5rem)] xl:text-[clamp(5.5rem,9vw,7.5rem)] leading-[0.88] tracking-tight sm:tracking-tighter text-[#EAB308]">
              TO
            </h2>
            <p className="mt-3 sm:mt-4 text-xs sm:text-base text-neutral-400 font-light max-w-md leading-relaxed">
              Precision searing creates a crunchy lace edge while preserving succulent core juices. Sealed inside brioche with house pickles.
            </p>
          </div>
        </div>

        {/* ROW 3: BE SHARED + Full-bleed Editorial Finale */}
        <div className="flex flex-col gap-6 sm:gap-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4">
            <h2 className="font-display font-black text-[clamp(2.1rem,7.8vw,4rem)] sm:text-[clamp(3.2rem,7.5vw,5.2rem)] lg:text-[clamp(4.2rem,8vw,6.5rem)] xl:text-[clamp(5.2rem,8.5vw,7.5rem)] leading-[0.88] tracking-tight sm:tracking-tighter text-[#F7F7F2]">
              BE SHARED<span className="text-[#EAB308]">.</span>
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-sm font-light pb-1">
              Dining is never solitary. It is laughter around a table, warm memories, and lingering bites of molten chocolate lava.
            </p>
          </div>

          <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/20 shadow-2xl group">
            <motion.img
              style={{ scale: scale3, y: yImage3 }}
              src={dessertImg}
              alt="Molten Valrhona Lava Cake Dessert"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4 sm:p-8 md:p-10 justify-between">
              <div>
                <span className="text-[10px] sm:text-xs font-mono text-[#EAB308] tracking-widest uppercase block mb-0.5">
                  THE SWEET FINALE
                </span>
                <h3 className="font-display font-extrabold text-base sm:text-xl md:text-2xl text-white">
                  Gold Molten Lava with Vanilla Gelato
                </h3>
              </div>
              <span className="hidden sm:inline-block font-mono text-xs text-neutral-400 tracking-wider">
                TABLES RESERVED DAILY
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
