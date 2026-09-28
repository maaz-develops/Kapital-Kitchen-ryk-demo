import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Utensils, Calendar, MapPin, X, ArrowUpRight, Clock } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface NavbarProps {
  onOpenMenuModal: () => void;
  onOpenReserveModal: () => void;
}

export default function Navbar({ onOpenMenuModal, onOpenReserveModal }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'STORY', href: '#story' },
    { label: 'SIGNATURES', href: '#signatures' },
    { label: 'THE MENU', href: '#menu' },
    { label: 'ATMOSPHERE', href: '#atmosphere' },
    { label: 'GALLERY', href: '#gallery' },
    { label: 'LOCATION', href: '#location' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Floating Desktop & Tablet Header */}
      <header className="fixed top-0 inset-x-0 z-50 flex justify-center pt-2 sm:pt-3 md:pt-4 px-2 sm:px-4 md:px-6 pointer-events-none w-full max-w-full box-border">
        <motion.div
          animate={{
            y: 0,
            scale: isScrolled ? 0.98 : 1,
            backgroundColor: isScrolled ? 'rgba(18, 18, 18, 0.95)' : 'rgba(24, 24, 24, 0.82)',
            boxShadow: isScrolled
              ? '0 20px 40px -15px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.12)'
              : '0 10px 30px -10px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)',
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto backdrop-blur-xl rounded-full px-2.5 sm:px-4 md:px-6 py-1.5 sm:py-2 flex items-center justify-between gap-1.5 sm:gap-3 md:gap-4 w-full max-w-[calc(100vw-16px)] sm:max-w-[calc(100vw-32px)] lg:max-w-5xl border border-white/10 box-border"
        >
          {/* Brand Wordmark (Fluid with clamp and truncate protection) */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-1.5 sm:gap-2 group shrink min-w-0"
          >
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#EAB308] group-hover:scale-125 transition-transform shrink-0" />
            <span className="font-display font-extrabold tracking-tight text-[clamp(11px,2.2vw,15px)] text-white whitespace-nowrap truncate">
              KAPITAL <span className="text-[#EAB308]">KITCHEN</span>
            </span>
          </a>

          {/* Desktop Nav Links (Visible on xl: 1280px+ where ample room is guaranteed) */}
          <nav className="hidden xl:flex items-center gap-3.5 2xl:gap-5 shrink min-w-0">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className="text-[11px] 2xl:text-xs uppercase tracking-wider font-semibold text-neutral-300 hover:text-[#EAB308] transition-colors relative py-1 group shrink-0 whitespace-nowrap"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#EAB308] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Primary Action Buttons Container */}
          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-2.5 shrink-0 justify-end">
            <button
              onClick={onOpenMenuModal}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-[11px] sm:text-xs font-semibold text-neutral-200 border border-white/10 hover:border-white/20 transition-all cursor-pointer shrink-0 whitespace-nowrap"
            >
              <Utensils className="w-3.5 h-3.5 text-[#EAB308] shrink-0" />
              <span>Full Menu</span>
            </button>

            <button
              onClick={onOpenReserveModal}
              className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 md:px-4 py-1.5 sm:py-2 rounded-full bg-[#EAB308] hover:bg-[#FACC15] text-black text-[11px] sm:text-xs font-black tracking-tight transition-transform active:scale-95 cursor-pointer shadow-md shadow-[#EAB308]/20 min-h-[32px] sm:min-h-[36px] shrink-0 whitespace-nowrap"
            >
              <Calendar className="w-3.5 h-3.5 text-black shrink-0" />
              <span className="max-[359px]:hidden">BOOK TABLE</span>
              <span className="min-[360px]:hidden">BOOK</span>
            </button>

            {/* Navigation Menu Trigger Button (Visible on screens < 1280px) */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="xl:hidden w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 flex flex-col items-center justify-center gap-1 cursor-pointer shrink-0"
            >
              <span className="w-3 sm:w-3.5 h-[1.5px] bg-white block transition-transform" />
              <span className="w-3 sm:w-3.5 h-[1.5px] bg-[#EAB308] block transition-transform" />
            </button>
          </div>
        </motion.div>
      </header>

      {/* Mobile Fullscreen Animated Overlay Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-[#0C0C0C]/98 backdrop-blur-2xl flex flex-col justify-between p-5 sm:p-8 md:p-10 overflow-y-auto max-h-[100dvh]"
          >
            {/* Top Bar inside Mobile Menu */}
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EAB308]" />
                <span className="font-display font-extrabold tracking-tighter text-lg text-white">
                  KAPITAL <span className="text-[#EAB308]">KITCHEN</span>
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Oversized Typographic Mobile Navigation */}
            <div className="flex flex-col gap-2 my-auto py-6">
              {navLinks.map((item, idx) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 + 0.1, duration: 0.3 }}
                  className="font-display font-black text-3xl sm:text-5xl text-neutral-300 hover:text-[#EAB308] tracking-tighter transition-colors flex items-center justify-between group py-1.5"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 text-[#EAB308] transition-opacity" />
                </motion.a>
              ))}
            </div>

            {/* Bottom Actions & Details */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
              <div className="text-xs text-neutral-400 space-y-1">
                <p className="flex items-center gap-1.5 text-neutral-300 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#EAB308]" />
                  Modal Town, Rahim Yar Khan
                </p>
                <p className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-neutral-500" />
                  {RESTAURANT_INFO.openingHours}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenMenuModal();
                  }}
                  className="flex-1 sm:flex-none px-5 py-3 rounded-full bg-white/10 text-white font-semibold text-xs tracking-wider uppercase border border-white/15 cursor-pointer text-center"
                >
                  View Menu
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenReserveModal();
                  }}
                  className="flex-1 sm:flex-none px-6 py-3 rounded-full bg-[#EAB308] text-black font-extrabold text-xs tracking-wider uppercase cursor-pointer text-center shadow-lg shadow-[#EAB308]/20"
                >
                  Reserve Table
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
