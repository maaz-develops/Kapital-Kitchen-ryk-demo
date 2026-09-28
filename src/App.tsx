/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, useScroll } from 'motion/react';
import Lenis from 'lenis';

import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TypographicScrollIntro from './components/TypographicScrollIntro';
import BrandMomentSection from './components/BrandMomentSection';
import FoodStorySection from './components/FoodStorySection';
import SignatureDishesSection from './components/SignatureDishesSection';
import HorizontalMenuSection from './components/HorizontalMenuSection';
import CenterEditorialBranding from './components/CenterEditorialBranding';
import FlavourRevealSection from './components/FlavourRevealSection';
import AtmosphereSection from './components/AtmosphereSection';
import EditorialGallerySection from './components/EditorialGallerySection';
import LocationReservationSection from './components/LocationReservationSection';
import Footer from './components/Footer';

import MenuModal from './components/MenuModal';
import ReservationModal from './components/ReservationModal';
import LightboxModal from './components/LightboxModal';
import DishDetailModal from './components/DishDetailModal';

import { DishItem, GALLERY_ITEMS } from './data/restaurantData';

export default function App() {
  const [menuModalOpen, setMenuModalOpen] = useState(false);
  const [selectedCategoryForMenu, setSelectedCategoryForMenu] = useState<string | undefined>();
  const [reserveModalOpen, setReserveModalOpen] = useState(false);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<(typeof GALLERY_ITEMS)[0] | null>(null);
  const [selectedDishDetail, setSelectedDishDetail] = useState<DishItem | null>(null);

  const { scrollYProgress } = useScroll();

  // Initialize Lenis smooth momentum scroll
  useEffect(() => {
    // Avoid running on touch devices if prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
    });

    let animationFrameId: number;

    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  const handleOpenCategory = (catId: string) => {
    setSelectedCategoryForMenu(catId);
    setMenuModalOpen(true);
  };

  const handleOpenFullMenu = () => {
    setSelectedCategoryForMenu(undefined);
    setMenuModalOpen(true);
  };

  const scrollToStory = () => {
    const el = document.getElementById('story');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#0C0C0C] text-[#F7F7F2] font-body selection:bg-[#EAB308] selection:text-black overflow-x-hidden w-full max-w-full">
      {/* Interactive Custom Cursor (Desktop) */}
      <CustomCursor />

      {/* Top Scroll Progress Indicator */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-[#EAB308] origin-left z-[110] shadow-[0_0_8px_#EAB308]"
      />

      {/* Minimal Floating Navigation */}
      <Navbar
        onOpenMenuModal={handleOpenFullMenu}
        onOpenReserveModal={() => setReserveModalOpen(true)}
      />

      {/* Main Continuous Editorial Story Experience */}
      <main className="w-full max-w-full overflow-hidden">
        {/* 01: Hero Section */}
        <HeroSection
          onExploreClick={scrollToStory}
          onReserveClick={() => setReserveModalOpen(true)}
        />

        {/* 02: Typographic Scroll Intro ("FOOD", "PEOPLE", "MOMENTS") */}
        <TypographicScrollIntro />

        {/* 03: Kapital Kitchen Brand Moment (Massive horizontal typography crossing section) */}
        <BrandMomentSection />

        {/* 04: Real Food Image Story ("MADE" -> image -> "TO" -> image -> "BE SHARED.") */}
        <FoodStorySection />

        {/* 05: Signature Dishes (Editorial Showcase) */}
        <SignatureDishesSection
          onSelectDish={(dish) => setSelectedDishDetail(dish)}
          onReserveClick={() => setReserveModalOpen(true)}
        />

        {/* 06: Horizontal Scroll Section ("THE MENU" 01 - 07) */}
        <HorizontalMenuSection
          onOpenCategory={handleOpenCategory}
          onOpenFullMenu={handleOpenFullMenu}
        />

        {/* 07: Center Kinetic Editorial Branding ("KAPITAL KITCHEN" / "RAHIM YAR KHAN") */}
        <CenterEditorialBranding />

        {/* 08: Typography + Image Transition ("FLAVOUR") */}
        <FlavourRevealSection />

        {/* 08: Atmosphere Section ("THE EXPERIENCE" / "COME HUNGRY.") */}
        <AtmosphereSection onReserveClick={() => setReserveModalOpen(true)} />

        {/* 09: Artistic Editorial Gallery */}
        <EditorialGallerySection
          onOpenLightbox={(item) => setSelectedGalleryItem(item)}
        />

        {/* 10: Location, Hours & Table Reservation */}
        <LocationReservationSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <MenuModal
        isOpen={menuModalOpen}
        onClose={() => setMenuModalOpen(false)}
        initialCategory={selectedCategoryForMenu}
        onReserveClick={() => setReserveModalOpen(true)}
      />

      <ReservationModal
        isOpen={reserveModalOpen}
        onClose={() => setReserveModalOpen(false)}
      />

      <LightboxModal
        item={selectedGalleryItem}
        onClose={() => setSelectedGalleryItem(null)}
      />

      <DishDetailModal
        dish={selectedDishDetail}
        onClose={() => setSelectedDishDetail(null)}
        onReserveClick={() => setReserveModalOpen(true)}
      />
    </div>
  );
}
