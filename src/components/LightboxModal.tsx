import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/restaurantData';

interface LightboxModalProps {
  item: (typeof GALLERY_ITEMS)[0] | null;
  onClose: () => void;
}

export default function LightboxModal({ item, onClose }: LightboxModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (item) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, onClose]);

  if (!item) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[140] flex items-center justify-center p-3 sm:p-6 md:p-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/92 backdrop-blur-2xl"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.93 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.93 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-5xl w-full max-h-[92vh] flex flex-col items-center z-10"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close lightbox"
            className="absolute top-3 right-3 sm:-top-12 sm:right-0 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/80 hover:bg-black/90 border border-white/25 flex items-center justify-center text-white cursor-pointer transition-colors shadow-lg"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* High-Resolution Media Container */}
          <div className="w-full rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-black relative max-h-[75vh]">
            <img
              src={item.image}
              alt={item.title}
              referrerPolicy="no-referrer"
              className="w-full h-full max-h-[75vh] object-contain mx-auto"
            />
          </div>

          {/* Editorial Caption Bar */}
          <div className="w-full mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-3 text-white">
            <div>
              <span className="text-[10px] font-mono text-[#EAB308] uppercase tracking-widest block mb-0.5">
                {item.category} · ARCHIVE
              </span>
              <h4 className="font-display font-black text-xl sm:text-2xl">
                {item.title}
              </h4>
              <p className="text-xs text-neutral-400 font-light mt-0.5">
                {item.quote}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
              <MapPin className="w-3.5 h-3.5 text-[#EAB308]" />
              <span>Rahim Yar Khan</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
