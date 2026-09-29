import { useEffect, useRef } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export default function CenterEditorialBranding() {
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const offsetRef = useRef(0);
  const targetOffsetRef = useRef(0);

  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;
      if (Math.abs(delta) > 0.5) {
        // Smooth velocity accumulation responding to scroll direction
        targetOffsetRef.current += delta * 0.3;
      }
      lastScrollY.current = currentScrollY;
    };

    const updateMotion = () => {
      // Subtle ambient baseline drift + responsive scroll dampening
      targetOffsetRef.current += 0.2;
      offsetRef.current += (targetOffsetRef.current - offsetRef.current) * 0.075;
      const val = offsetRef.current;
      if (track1Ref.current) {
        track1Ref.current.style.transform = `translate3d(${-(val * 0.5) % 480}px, 0, 0)`;
      }
      if (track2Ref.current) {
        track2Ref.current.style.transform = `translate3d(${(val * 0.5) % 480}px, 0, 0)`;
      }
      rafId = requestAnimationFrame(updateMotion);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    rafId = requestAnimationFrame(updateMotion);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      aria-label="Kapital Kitchen Editorial Typography"
      className="relative py-14 sm:py-20 md:py-28 bg-[#080808] overflow-hidden w-full max-w-full select-none border-y border-white/5"
    >
      {/* Subtle Ambient Radial Glow in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] bg-[#EAB308]/[0.03] blur-[100px] pointer-events-none rounded-full" />

      <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 w-full max-w-full">
        {/* Track 1: KAPITAL KITCHEN → → → (Moves smoothly rightwards on scroll down, left on scroll up) */}
        <div className="w-full max-w-full overflow-hidden whitespace-nowrap">
          <div
            ref={track1Ref}
            style={{ willChange: 'transform' }}
            className="inline-flex items-center gap-6 sm:gap-10 md:gap-14 text-[clamp(1.75rem,5.5vw,4.5rem)] font-display font-black tracking-tight sm:tracking-tighter uppercase text-[#F7F7F2]"
          >
            {[...Array(6)].map((_, i) => (
              <span key={i} className="inline-flex items-center gap-3 sm:gap-6 shrink-0">
                <span>KAPITAL</span>
                <span className="text-[#EAB308]">KITCHEN</span>
                <ArrowRight className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 text-[#EAB308]/60 inline-block" />
              </span>
            ))}
          </div>
        </div>

        {/* Track 2: ← ← ← RAHIM YAR KHAN (Moves smoothly counter-directionally) */}
        <div className="w-full max-w-full overflow-hidden whitespace-nowrap">
          <div
            ref={track2Ref}
            style={{ willChange: 'transform' }}
            className="inline-flex items-center gap-6 sm:gap-10 md:gap-14 text-[clamp(1.4rem,4.5vw,3.8rem)] font-display font-black tracking-tight sm:tracking-tighter uppercase text-outline"
          >
            {[...Array(6)].map((_, i) => (
              <span key={i} className="inline-flex items-center gap-3 sm:gap-6 shrink-0">
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7 text-neutral-500 inline-block" />
                <span>RAHIM YAR KHAN</span>
                <span className="text-[#EAB308]/40 text-xs sm:text-sm md:text-base font-mono tracking-widest">
                  [ EST. RYK ]
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
