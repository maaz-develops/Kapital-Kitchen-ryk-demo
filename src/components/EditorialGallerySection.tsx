import { useState } from 'react';
import { motion } from 'motion/react';
import { Maximize2, Sparkles } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/restaurantData';

interface GalleryProps {
  onOpenLightbox: (item: (typeof GALLERY_ITEMS)[0]) => void;
}

export default function EditorialGallerySection({ onOpenLightbox }: GalleryProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section
      id="gallery"
      className="relative py-14 sm:py-20 md:py-32 bg-[#0C0C0C] text-[#F7F7F2] overflow-hidden"
    >
      {/* Top Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 mb-10 sm:mb-14 flex items-center justify-between border-b border-white/10 pb-4 sm:pb-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-[#EAB308] font-mono text-xs">09</span>
          <span className="text-neutral-500 font-mono text-xs">/</span>
          <span className="text-[11px] sm:text-xs font-bold tracking-widest uppercase text-neutral-400">
            VISUAL ARCHIVE
          </span>
        </div>
        <span className="text-[10px] sm:text-xs font-mono text-neutral-400 uppercase tracking-widest hidden sm:block">
          AN ASYMMETRICAL EDITORIAL PORTFOLIO
        </span>
      </div>

      {/* Massive Gallery Title */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 mb-8 sm:mb-12">
        <h2 className="font-display font-black text-[clamp(2.25rem,10vw,4.5rem)] sm:text-6xl md:text-7xl lg:text-8xl tracking-tight sm:tracking-tighter text-white leading-none">
          THE <span className="text-outline">GALLERY</span>
        </h2>
        <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-neutral-400 max-w-lg font-light">
          Click any frame to inspect high-resolution culinary craftsmanship and intimate dining room details.
        </p>
      </div>

      {/* Asymmetrical Editorial Composition Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 flex flex-col gap-8 sm:gap-12 md:gap-14">
        {/* ROW 1: Wide 16:9 Hero Frame */}
        <div
          onClick={() => onOpenLightbox(GALLERY_ITEMS[0])}
          onMouseEnter={() => setHoveredId(GALLERY_ITEMS[0].id)}
          onMouseLeave={() => setHoveredId(null)}
          className="relative w-full aspect-[16/10] sm:aspect-[21/9] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 shadow-2xl group cursor-pointer"
        >
          <img
            src={GALLERY_ITEMS[0].image}
            alt={GALLERY_ITEMS[0].title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.75]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-between p-4 sm:p-8 md:p-10">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-black/60 border border-white/15 text-[10px] font-mono text-[#EAB308]">
                {GALLERY_ITEMS[0].category}
              </span>
              <span className="w-10 h-10 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white group-hover:bg-[#EAB308] group-hover:text-black transition-colors">
                <Maximize2 className="w-4 h-4" />
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <h3 className="font-display font-black text-2xl sm:text-4xl text-white">
                  {GALLERY_ITEMS[0].title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 font-light mt-1">
                  {GALLERY_ITEMS[0].quote}
                </p>
              </div>
              <span className="text-[11px] font-mono text-neutral-400">
                {GALLERY_ITEMS[0].subtitle}
              </span>
            </div>
          </div>
        </div>

        {/* ROW 2: Asymmetric Two-Column (5:7 ratio) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Card 2: Left 4:5 Smash Burger (Narrow Col-5) */}
          <div
            onClick={() => onOpenLightbox(GALLERY_ITEMS[1])}
            onMouseEnter={() => setHoveredId(GALLERY_ITEMS[1].id)}
            onMouseLeave={() => setHoveredId(null)}
            className="md:col-span-5 relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/15 shadow-2xl group cursor-pointer"
          >
            <img
              src={GALLERY_ITEMS[1].image}
              alt={GALLERY_ITEMS[1].title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 brightness-[0.8]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-between p-5 sm:p-6">
              <div className="flex justify-between items-center">
                <span className="px-3 py-1 rounded-full bg-black/60 border border-white/15 text-[10px] font-mono text-[#EAB308]">
                  {GALLERY_ITEMS[1].category}
                </span>
                <span className="w-8 h-8 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white group-hover:bg-[#EAB308] group-hover:text-black transition-colors">
                  <Maximize2 className="w-3.5 h-3.5" />
                </span>
              </div>
              <div>
                <h3 className="font-display font-black text-lg sm:text-xl lg:text-2xl text-white">
                  {GALLERY_ITEMS[1].title}
                </h3>
                <p className="text-[11px] sm:text-xs text-neutral-300 font-light mt-0.5">
                  {GALLERY_ITEMS[1].subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Card 3: Right 1:1 Pizza with offset typography (Wide Col-7) */}
          <div
            onClick={() => onOpenLightbox(GALLERY_ITEMS[2])}
            onMouseEnter={() => setHoveredId(GALLERY_ITEMS[2].id)}
            onMouseLeave={() => setHoveredId(null)}
            className="md:col-span-7 relative aspect-[1/1] sm:aspect-[4/3] rounded-3xl overflow-hidden border border-[#EAB308]/20 shadow-2xl group cursor-pointer"
          >
            <img
              src={GALLERY_ITEMS[2].image}
              alt={GALLERY_ITEMS[2].title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 brightness-[0.8]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex flex-col justify-between p-5 sm:p-8">
              <div className="flex justify-between items-center">
                <span className="px-3 py-1 rounded-full bg-black/60 border border-white/15 text-[10px] font-mono text-[#EAB308]">
                  {GALLERY_ITEMS[2].category}
                </span>
                <span className="w-8 h-8 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white group-hover:bg-[#EAB308] group-hover:text-black transition-colors">
                  <Maximize2 className="w-3.5 h-3.5" />
                </span>
              </div>
              <div>
                <h3 className="font-display font-black text-xl sm:text-2xl lg:text-3xl text-white">
                  {GALLERY_ITEMS[2].title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 font-light mt-1">
                  {GALLERY_ITEMS[2].quote}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ROW 3: Inverted Asymmetric Pair */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Card 4: Left 4:3 Ribeye Steak (Wide Col-7) */}
          <div
            onClick={() => onOpenLightbox(GALLERY_ITEMS[3])}
            onMouseEnter={() => setHoveredId(GALLERY_ITEMS[3].id)}
            onMouseLeave={() => setHoveredId(null)}
            className="md:col-span-7 relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/15 shadow-2xl group cursor-pointer"
          >
            <img
              src={GALLERY_ITEMS[3].image}
              alt={GALLERY_ITEMS[3].title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 brightness-[0.8]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex flex-col justify-between p-5 sm:p-8">
              <div className="flex justify-between items-center">
                <span className="px-3 py-1 rounded-full bg-black/60 border border-white/15 text-[10px] font-mono text-[#EAB308]">
                  {GALLERY_ITEMS[3].category}
                </span>
                <span className="w-8 h-8 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white group-hover:bg-[#EAB308] group-hover:text-black transition-colors">
                  <Maximize2 className="w-3.5 h-3.5" />
                </span>
              </div>
              <div>
                <h3 className="font-display font-black text-xl sm:text-2xl lg:text-3xl text-white">
                  {GALLERY_ITEMS[3].title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 font-light mt-1">
                  {GALLERY_ITEMS[3].quote}
                </p>
              </div>
            </div>
          </div>

          {/* Card 5: Right 4:5 Loaded Mexican Fries (Narrow Col-5) */}
          <div
            onClick={() => onOpenLightbox(GALLERY_ITEMS[4])}
            onMouseEnter={() => setHoveredId(GALLERY_ITEMS[4].id)}
            onMouseLeave={() => setHoveredId(null)}
            className="md:col-span-5 relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/15 shadow-2xl group cursor-pointer"
          >
            <img
              src={GALLERY_ITEMS[4].image}
              alt={GALLERY_ITEMS[4].title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 brightness-[0.8]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-between p-5 sm:p-6">
              <div className="flex justify-between items-center">
                <span className="px-3 py-1 rounded-full bg-black/60 border border-white/15 text-[10px] font-mono text-[#EAB308]">
                  {GALLERY_ITEMS[4].category}
                </span>
                <span className="w-8 h-8 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white group-hover:bg-[#EAB308] group-hover:text-black transition-colors">
                  <Maximize2 className="w-3.5 h-3.5" />
                </span>
              </div>
              <div>
                <h3 className="font-display font-black text-lg sm:text-xl lg:text-2xl text-white">
                  {GALLERY_ITEMS[4].title}
                </h3>
                <p className="text-[11px] sm:text-xs text-neutral-300 font-light mt-0.5">
                  {GALLERY_ITEMS[4].subtitle}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Card 6: Full-bleed Molten Dessert Finale (Full Width Panorama) */}
        <div
          onClick={() => onOpenLightbox(GALLERY_ITEMS[5])}
          onMouseEnter={() => setHoveredId(GALLERY_ITEMS[5].id)}
          onMouseLeave={() => setHoveredId(null)}
          className="relative w-full aspect-[21/9] sm:aspect-[24/9] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 shadow-2xl group cursor-pointer"
        >
          <img
            src={GALLERY_ITEMS[5].image}
            alt={GALLERY_ITEMS[5].title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.75]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-between p-5 sm:p-8 md:p-10">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-black/60 border border-white/15 text-[10px] font-mono text-[#EAB308]">
                {GALLERY_ITEMS[5].category}
              </span>
              <span className="w-10 h-10 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white group-hover:bg-[#EAB308] group-hover:text-black transition-colors">
                <Maximize2 className="w-4 h-4" />
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <h3 className="font-display font-black text-xl sm:text-3xl lg:text-4xl text-white">
                  {GALLERY_ITEMS[5].title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 font-light mt-0.5">
                  {GALLERY_ITEMS[5].quote}
                </p>
              </div>
              <span className="text-[11px] font-mono text-[#EAB308]">
                CLICK TO EXPAND
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
