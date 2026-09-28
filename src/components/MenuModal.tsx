import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search, Sparkles, Utensils, Check } from 'lucide-react';
import { MENU_CATEGORIES, SIGNATURE_DISHES, RESTAURANT_INFO } from '../data/restaurantData';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: string;
  onReserveClick: () => void;
}

export default function MenuModal({
  isOpen,
  onClose,
  initialCategory,
  onReserveClick,
}: MenuModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialCategory || MENU_CATEGORIES[0].id
  );
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const currentCategoryObj = MENU_CATEGORIES.find((c) => c.id === selectedCategory) || MENU_CATEGORIES[0];

  // Filter items across all categories if searching, else within selected category
  const filteredItems = searchQuery.trim()
    ? MENU_CATEGORIES.flatMap((c) =>
        c.items.map((item) => ({ ...item, categoryTitle: c.title, categoryNumber: c.number }))
      ).filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.desc.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : currentCategoryObj.items.map((item) => ({
        ...item,
        categoryTitle: currentCategoryObj.title,
        categoryNumber: currentCategoryObj.number,
      }));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl h-[92svh] sm:h-[88vh] bg-[#121212] rounded-2xl sm:rounded-3xl border border-white/15 shadow-2xl flex flex-col overflow-hidden z-10"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-4 sm:px-8 py-3.5 sm:py-5 border-b border-white/10 bg-[#161616]">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EAB308] shrink-0" />
              <div>
                <h3 className="font-display font-black text-lg sm:text-xl text-white tracking-tight">
                  THE EDITORIAL MENU
                </h3>
                <span className="text-[10px] sm:text-[11px] font-mono text-neutral-400">
                  KAPITAL KITCHEN · RAHIM YAR KHAN
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => {
                  onClose();
                  onReserveClick();
                }}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#EAB308] text-black text-xs font-bold uppercase tracking-wider"
              >
                <span>Reserve Table</span>
              </button>

              <button
                onClick={onClose}
                aria-label="Close menu"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Search & Category Filter Header */}
          <div className="p-3.5 sm:p-6 border-b border-white/10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between bg-[#141414]">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-2.5 sm:top-3" />
              <input
                type="text"
                placeholder="Search dishes (e.g., Ribeye, Smash, Rustica)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-4 py-1.5 sm:py-2 rounded-full bg-white/5 border border-white/10 text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-[#EAB308]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2 sm:top-2.5 text-xs text-neutral-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Filter Tabs */}
            {!searchQuery && (
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                {MENU_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-[#EAB308] text-black font-bold'
                        : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {cat.title}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Menu Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-8">
            <div className="mb-4 sm:mb-6 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-[#EAB308] uppercase tracking-widest block mb-0.5">
                  {searchQuery ? 'SEARCH RESULTS' : currentCategoryObj.tagline}
                </span>
                <h4 className="font-display font-black text-xl sm:text-2xl text-white">
                  {searchQuery ? `Dishes matching "${searchQuery}"` : currentCategoryObj.title}
                </h4>
              </div>
              <span className="text-xs font-mono text-neutral-400">
                {filteredItems.length} ITEMS
              </span>
            </div>

            {filteredItems.length === 0 ? (
              <div className="py-16 text-center text-neutral-400 text-sm">
                No items found matching your search. Try searching for "Steak", "Fries", or "Burger".
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
                {filteredItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#EAB308]/40 transition-colors flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-1.5">
                        <h5 className="font-display font-extrabold text-sm sm:text-base text-white group-hover:text-[#EAB308] transition-colors">
                          {item.name}
                        </h5>
                        <span className="font-mono text-xs sm:text-sm font-bold text-[#EAB308] shrink-0">
                          {item.price}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-400 font-light leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-white/5 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-neutral-500">
                      <span>{item.categoryTitle}</span>
                      <span className="text-[#EAB308]/70">PREPARED FRESH</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Drawer Bar */}
          <div className="px-4 sm:px-8 py-3 sm:py-4 bg-[#161616] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3 text-[11px] sm:text-xs text-neutral-400">
            <span>Prices in PKR inclusive of fresh preparation.</span>
            <div className="flex items-center gap-3 sm:gap-4">
              <a
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="text-white hover:text-[#EAB308] font-mono text-[11px] transition-colors"
              >
                ORDER: {RESTAURANT_INFO.phoneDisplay}
              </a>
              <button
                onClick={() => {
                  onClose();
                  onReserveClick();
                }}
                className="px-3.5 sm:px-4 py-1.5 rounded-full bg-[#EAB308] text-black font-extrabold text-[10px] sm:text-[11px] uppercase tracking-wider cursor-pointer"
              >
                Book Table
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
