import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, Sparkles, Clock, Tag } from 'lucide-react';
import { SIGNATURE_DISHES, DishItem } from '../data/restaurantData';

interface SignatureDishesProps {
  onSelectDish: (dish: DishItem) => void;
  onReserveClick: () => void;
}

export default function SignatureDishesSection({ onSelectDish, onReserveClick }: SignatureDishesProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentDish = SIGNATURE_DISHES[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % SIGNATURE_DISHES.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + SIGNATURE_DISHES.length) % SIGNATURE_DISHES.length);
  };

  return (
    <section
      id="signatures"
      className="relative min-h-screen py-14 sm:py-20 md:py-32 bg-[#0E0E0E] text-[#F7F7F2] overflow-hidden w-full max-w-full flex flex-col justify-center"
    >
      {/* Background oversized watermark number */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none z-0 overflow-hidden max-w-[45vw]">
        <span className="font-display font-black text-[30vw] sm:text-[40vw] text-white/[0.02] leading-none block">
          {currentDish.number}
        </span>
      </div>

      {/* Top Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 mb-8 sm:mb-12 md:mb-16 w-full flex items-center justify-between border-b border-white/10 pb-4 sm:pb-6 relative z-10">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-[#EAB308] font-mono text-xs">05</span>
          <span className="text-neutral-500 font-mono text-xs">/</span>
          <span className="text-[11px] sm:text-xs font-bold tracking-widest uppercase text-neutral-400">
            SIGNATURE CREATIONS
          </span>
        </div>

        {/* Index pagination tabs */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar">
          {SIGNATURE_DISHES.map((dish, idx) => (
            <button
              key={dish.id}
              onClick={() => setActiveIndex(idx)}
              className={`font-mono text-[11px] sm:text-xs px-2 sm:px-2.5 py-1 rounded transition-all cursor-pointer ${
                activeIndex === idx
                  ? 'bg-[#EAB308] text-black font-bold scale-105'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {dish.number}
            </button>
          ))}
        </div>
      </div>

      {/* Editorial Main Split Stage */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
        {/* Left Column: Number, Title, Description, Price */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentDish.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-4 sm:gap-6"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="font-display font-black text-2xl sm:text-4xl md:text-5xl text-[#EAB308]">
                  {currentDish.number}
                </span>
                <div className="h-[2px] w-8 sm:w-12 bg-white/20" />
                <span className="font-mono text-xs tracking-widest uppercase text-neutral-400">
                  {currentDish.category}
                </span>
              </div>

              <h2 className="font-display font-black text-[clamp(1.75rem,4.5vw,2.8rem)] sm:text-4xl md:text-5xl lg:text-6xl tracking-tight sm:tracking-tighter text-[#F7F7F2] leading-[1.02]">
                {currentDish.name}
              </h2>

              <p className="text-xs sm:text-sm md:text-base text-neutral-300 font-light leading-relaxed max-w-lg">
                {currentDish.description}
              </p>

              {/* Price & Meta info */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 py-2 border-y border-white/10">
                <div>
                  <span className="block text-[9px] sm:text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                    PRICE
                  </span>
                  <span className="font-display font-black text-xl sm:text-2xl md:text-3xl text-[#EAB308]">
                    {currentDish.price}
                  </span>
                </div>

                <div className="w-[1px] h-7 sm:h-8 bg-white/10" />

                <div>
                  <span className="block text-[9px] sm:text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                    PREP TIME
                  </span>
                  <span className="font-mono text-xs sm:text-sm font-semibold text-neutral-200 flex items-center gap-1.5 mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-[#EAB308]" />
                    {currentDish.prepTime}
                  </span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 text-[11px] sm:text-xs">
                {currentDish.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300 font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Actions & Arrows */}
              <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 pt-2 sm:pt-4">
                <button
                  onClick={() => onSelectDish(currentDish)}
                  className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#EAB308] hover:bg-[#FACC15] text-black font-extrabold text-[11px] sm:text-xs tracking-wider uppercase transition-all active:scale-95 cursor-pointer shadow-lg shadow-[#EAB308]/20"
                >
                  Inspect Dish Details
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    aria-label="Previous dish"
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 hover:border-[#EAB308] hover:text-[#EAB308] flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Next dish"
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 hover:border-[#EAB308] hover:text-[#EAB308] flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Column: Large Editorial Image with Masked Reveal */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="relative w-full max-w-lg lg:max-w-xl aspect-[4/3] sm:aspect-[1/1] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/15">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentDish.id}
                initial={{ opacity: 0, scale: 1.05, filter: 'blur(6px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full relative"
              >
                <img
                  src={currentDish.image}
                  alt={currentDish.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4 sm:p-6 md:p-8 justify-between">
                  <div>
                    <span className="text-[9px] sm:text-[10px] font-mono text-[#EAB308] tracking-widest uppercase block mb-0.5 sm:mb-1">
                      KAPITAL KITCHEN RYK
                    </span>
                    <span className="font-display font-bold text-sm sm:text-lg text-white">
                      {currentDish.name}
                    </span>
                  </div>
                  <span className="font-mono text-xs sm:text-sm font-bold text-[#EAB308]">
                    {currentDish.price}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
