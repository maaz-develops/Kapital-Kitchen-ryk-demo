import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, Sparkles, ChevronRight } from 'lucide-react';
import { MENU_CATEGORIES } from '../data/restaurantData';

interface HorizontalMenuProps {
  onOpenCategory: (categoryId: string) => void;
  onOpenFullMenu: () => void;
}

export default function HorizontalMenuSection({ onOpenCategory, onOpenFullMenu }: HorizontalMenuProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll progress for desktop horizontal track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Transform vertical scroll to horizontal offset
  // We have 8 slides (1 intro slide + 7 menu categories)
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-76%']);

  return (
    <section
      id="menu"
      ref={containerRef}
      className="relative bg-[#0A0A0A] text-[#F7F7F2] w-full max-w-full overflow-hidden"
    >
      {/* Desktop Sticky Horizontal Scroll Viewport (hidden on mobile, enabled on md+) */}
      <div className="hidden md:block h-[350vh] relative w-full max-w-full">
        <div className="sticky top-0 h-screen w-full max-w-full overflow-hidden flex flex-col justify-between py-8 md:py-12 px-6 lg:px-14">
          {/* Header bar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 z-20 w-full">
            <div className="flex items-center gap-3">
              <span className="text-[#EAB308] font-mono text-xs">06</span>
              <span className="text-neutral-500 font-mono text-xs">/</span>
              <span className="text-xs font-bold tracking-widest uppercase text-neutral-400">
                THE EDITORIAL MENU
              </span>
            </div>
            <button
              onClick={onOpenFullMenu}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#EAB308] hover:text-white transition-colors cursor-pointer"
            >
              <span>Explore All Categories</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Horizontal Track */}
          <div className="relative flex-1 flex items-center overflow-hidden my-auto w-full">
            <motion.div
              style={{ x }}
              className="flex items-center gap-6 lg:gap-8 pl-2 sm:pl-4 will-change-transform"
            >
              {/* Slide 0: THE MENU Intro Poster */}
              <div className="w-[clamp(280px,30vw,440px)] shrink-0 flex flex-col justify-center pr-4 lg:pr-6">
                <span className="text-[#EAB308] font-mono text-xs uppercase tracking-widest mb-2 lg:mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Seven Culinary Chapters
                </span>
                <h2 className="font-display font-black text-[clamp(2.4rem,4.5vw,3.8rem)] lg:text-[clamp(2.8rem,4.5vw,4.5rem)] tracking-tight sm:tracking-tighter leading-none text-[#F7F7F2]">
                  THE <br />
                  <span className="text-[#EAB308]">MENU</span>
                </h2>
                <p className="mt-3.5 lg:mt-5 text-xs sm:text-sm text-neutral-400 leading-relaxed font-light">
                  From searing hardwood charcoal grills to 480°C blistered sourdough pizzas and dripping smash burgers. Handcrafted daily in Rahim Yar Khan.
                </p>
                <div className="mt-5 lg:mt-7 flex items-center gap-2 text-xs font-mono text-neutral-400">
                  <span>SCROLL HORIZONTALLY</span>
                  <span className="text-[#EAB308]">→</span>
                </div>
              </div>

              {/* 7 Menu Category Cards */}
              {MENU_CATEGORIES.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => onOpenCategory(cat.id)}
                  className="w-[clamp(280px,28vw,400px)] h-[clamp(360px,58vh,500px)] rounded-3xl overflow-hidden relative shrink-0 border border-white/15 bg-[#141414] shadow-2xl group cursor-pointer transition-transform duration-500 hover:-translate-y-2"
                >
                  <img
                    src={cat.image}
                    alt={cat.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 brightness-[0.7]"
                  />

                  {/* Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/20 flex flex-col justify-between p-5 lg:p-7">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#EAB308] px-2.5 py-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-md">
                        {cat.number}
                      </span>
                      <span className="text-white/60 group-hover:text-[#EAB308] transition-colors">
                        <ArrowUpRight className="w-5 h-5" />
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-[#EAB308] uppercase block mb-1">
                        {cat.tagline}
                      </span>
                      <h3 className="font-display font-black text-xl lg:text-2xl xl:text-3xl text-white tracking-tight">
                        {cat.title}
                      </h3>

                      {/* Mini preview list */}
                      <div className="mt-3 lg:mt-4 pt-3 lg:pt-4 border-t border-white/10 flex flex-col gap-1.5">
                        {cat.items.slice(0, 2).map((item) => (
                          <div
                            key={item.name}
                            className="flex items-center justify-between text-[11px] lg:text-xs text-neutral-300"
                          >
                            <span className="truncate pr-2 font-medium">{item.name}</span>
                            <span className="font-mono text-[#EAB308] shrink-0 font-semibold">
                              {item.price}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-3 lg:mt-4 text-xs font-semibold text-[#EAB308] group-hover:underline flex items-center gap-1">
                        <span>View All {cat.items.length} Dishes</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Bottom track indicator */}
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-neutral-400 pt-3 md:pt-4 border-t border-white/10 w-full">
            <span>// HORIZONTAL PANORAMA</span>
            <span>01 — 07 COURSES</span>
          </div>
        </div>
      </div>

      {/* Mobile Swipe View (Visible on mobile/tablet screens < md) */}
      <div className="md:hidden py-14 sm:py-20 px-4 sm:px-6 w-full max-w-full overflow-hidden">
        <div className="mb-6 sm:mb-8">
          <span className="text-[#EAB308] font-mono text-[11px] sm:text-xs uppercase tracking-widest mb-1 block">
            [ 06 · SEVEN CHAPTERS ]
          </span>
          <h2 className="font-display font-black text-[clamp(2.25rem,9.5vw,3.5rem)] text-white tracking-tighter">
            THE <span className="text-[#EAB308]">MENU</span>
          </h2>
          <p className="mt-1.5 sm:mt-2 text-xs text-neutral-400 font-light">
            Swipe sideways to explore each category or tap to view full recipes and prices.
          </p>
        </div>

        {/* Mobile Horizontal Carousel */}
        <div className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4 w-full max-w-full touch-pan-x">
          {MENU_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onOpenCategory(cat.id)}
              className="snap-center shrink-0 w-[78vw] max-w-[310px] h-[380px] sm:h-[420px] rounded-3xl overflow-hidden relative border border-white/15 bg-[#141414] shadow-xl group cursor-pointer"
            >
              <img
                src={cat.image}
                alt={cat.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover brightness-[0.7]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-between p-5 sm:p-6">
                <span className="font-mono text-xs font-bold text-[#EAB308] self-start px-2 py-0.5 rounded-full bg-black/60 border border-white/10">
                  {cat.number}
                </span>

                <div>
                  <span className="text-[10px] font-mono text-[#EAB308] uppercase tracking-widest block mb-0.5">
                    {cat.tagline}
                  </span>
                  <h3 className="font-display font-black text-2xl text-white">
                    {cat.title}
                  </h3>

                  <div className="mt-3 pt-3 border-t border-white/10 flex flex-col gap-1">
                    {cat.items.slice(0, 2).map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center justify-between text-[11px] text-neutral-300"
                      >
                        <span className="truncate pr-1">{item.name}</span>
                        <span className="font-mono text-[#EAB308] shrink-0">
                          {item.price}
                        </span>
                      </div>
                    ))}
                  </div>

                  <span className="mt-3 inline-block text-[11px] font-bold text-[#EAB308]">
                    Explore {cat.items.length} items →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
