import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Clock, Flame, Utensils, Check, Sparkles } from 'lucide-react';
import { DishItem } from '../data/restaurantData';

interface DishDetailModalProps {
  dish: DishItem | null;
  onClose: () => void;
  onReserveClick: () => void;
}

export default function DishDetailModal({ dish, onClose, onReserveClick }: DishDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (dish) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dish, onClose]);

  if (!dish) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[135] flex items-center justify-center p-4 sm:p-6 md:p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-xl"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl bg-[#121212] rounded-2xl sm:rounded-3xl border border-white/15 shadow-2xl overflow-y-auto max-h-[92svh] z-10 flex flex-col md:flex-row"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 flex items-center justify-center text-white cursor-pointer"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Image Column */}
          <div className="md:w-1/2 relative h-52 sm:h-64 md:h-auto shrink-0 bg-black">
            <img
              src={dish.image}
              alt={dish.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end p-4 sm:p-6">
              <span className="text-[10px] sm:text-[11px] font-mono text-[#EAB308] px-2.5 sm:px-3 py-1 rounded-full bg-black/60 border border-white/15 backdrop-blur-md">
                KAPITAL SIGNATURE {dish.number}
              </span>
            </div>
          </div>

          {/* Details Column */}
          <div className="md:w-1/2 p-5 sm:p-8 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#EAB308] uppercase tracking-widest mb-1">
                <span>{dish.category}</span>
                <span>·</span>
                <span>CHAPTER {dish.categoryNumber}</span>
              </div>

              <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
                {dish.name}
              </h3>

              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-display font-black text-2xl text-[#EAB308]">
                  {dish.price}
                </span>
                <span className="text-xs text-neutral-400">inclusive of taxes</span>
              </div>

              <p className="mt-4 text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                {dish.description}
              </p>

              {/* Specs */}
              <div className="mt-6 pt-4 border-t border-white/10 flex flex-col gap-2.5 text-xs">
                <div className="flex items-center justify-between text-neutral-300">
                  <span className="flex items-center gap-1.5 text-neutral-400">
                    <Clock className="w-3.5 h-3.5 text-[#EAB308]" />
                    Estimated Prep Time
                  </span>
                  <span className="font-mono font-semibold">{dish.prepTime}</span>
                </div>

                <div className="flex items-center justify-between text-neutral-300">
                  <span className="flex items-center gap-1.5 text-neutral-400">
                    <Flame className="w-3.5 h-3.5 text-[#EAB308]" />
                    Preparation Method
                  </span>
                  <span className="font-mono font-semibold">Live Fire / Scratch</span>
                </div>
              </div>

              {/* Tags */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {dish.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[11px] text-neutral-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-3">
              <button
                onClick={() => {
                  onClose();
                  onReserveClick();
                }}
                className="flex-1 py-3 rounded-full bg-[#EAB308] hover:bg-[#FACC15] text-black font-extrabold text-xs uppercase tracking-wider text-center cursor-pointer shadow-lg shadow-[#EAB308]/20"
              >
                Reserve For Tonight
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
