import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SpecularButton from './SpecularButton';
import { Compass, Sparkles } from 'lucide-react';

interface WorldEntryModalProps {
  onEnterWorld: () => void;
}

export const WorldEntryModal: React.FC<WorldEntryModalProps> = ({ onEnterWorld }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="world-entry-modal-section"
      className="relative w-full py-24 px-6 bg-gradient-to-b from-[#050507] via-[#0a1329] to-[#050507] text-[#f0f0f5] font-general select-none flex flex-col items-center justify-center text-center overflow-hidden border-t border-[#e5c158]/30"
    >
      <div className="relative z-10 max-w-2xl w-full p-8 md:p-12 rounded-3xl bg-[#0c0d12]/90 border border-[#e5c158]/40 backdrop-blur-2xl shadow-[0_0_70px_rgba(229,193,88,0.25)] flex flex-col items-center gap-6">
        <div className="w-16 h-16 rounded-full bg-[#e5c158]/20 border border-[#e5c158] flex items-center justify-center text-[#e5c158] shadow-[0_0_25px_rgba(229,193,88,0.5)]">
          <Compass className="w-8 h-8 animate-spin-slow" />
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-general text-xs font-bold uppercase tracking-[0.3em] text-[#e5c158]">
            Timeline Complete • Transitioning
          </span>
          <h3 className="font-general text-2xl sm:text-4xl font-extrabold text-[#f0f0f5] leading-tight">
            “Every timeline tells a story. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e5c158] via-white to-[#e5c158]">
              But some journeys are meant to be experienced.”
            </span>
          </h3>
        </div>

        <p className="font-general text-sm sm:text-base text-[#f0f0f5]/80 max-w-md leading-relaxed">
          Step beyond the timeline into an interactive 5-level memory exploration of purpose, community, and reflection.
        </p>

        <SpecularButton
          size="lg"
          radius={20}
          lineColor="#e5c158"
          baseColor="#0c0d12"
          followMouse
          onClick={onEnterWorld}
          className="mt-2"
        >
          <Sparkles className="w-4 h-4 text-[#e5c158]" />
          <span>ENTER SHREE'S WORLD</span>
        </SpecularButton>
      </div>
    </section>
  );
};
