import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ASSET_PATHS } from '../utils/assetPaths';
import ScrollExpand from '../components/ScrollExpand';
import { Sparkles } from 'lucide-react';

interface SkySceneProps {
  onScrollToNext: () => void;
}

export const SkyScene: React.FC<SkySceneProps> = ({ onScrollToNext }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: 'power2.out' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="sky-scene-container"
      className="relative w-full min-h-screen bg-[#0B0B0F] text-[#f0f0f5] font-general select-none overflow-hidden"
    >
      {/* SCROLL EXPAND FRAME TRANSITION */}
      <ScrollExpand
        src={ASSET_PATHS.backgrounds.intro}
        alt="Transition into Timeline"
        title="JOURNEY THROUGH TIME"
        scrollHint="Scroll to expand and enter 2023"
        startWidth={42}
        startHeight={58}
        startRadius={24}
        endRadius={0}
        mediaZoom={1.35}
        overlayScrim={0.45}
        onExpandComplete={onScrollToNext}
      >
        <div className="flex flex-col items-center gap-4 max-w-lg">
          <div className="flex items-center gap-2 text-[#e5c158] bg-[#0c0d12]/90 px-4 py-1.5 rounded-full border border-[#e5c158]/30 backdrop-blur-md">
            <Sparkles className="w-4 h-4 animate-spin-slow" />
            <span className="font-general text-xs font-bold uppercase tracking-[0.3em]">
              The Prelude
            </span>
          </div>

          <p className="font-general italic text-base sm:text-xl text-[#e5c158] leading-relaxed drop-shadow-md">
            "What follows is three years of quiet mornings, late nights, and the kind of love that multiplies when shared."
          </p>

          <span className="font-general text-[11px] font-bold uppercase tracking-widest text-[#f0f0f5]/70 mt-1">
            Let it open.
          </span>
        </div>
      </ScrollExpand>
    </section>
  );
};
