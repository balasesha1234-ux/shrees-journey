import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ASSET_PATHS } from '../utils/assetPaths';
import { Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface GuideMessage {
  id: string;
  triggerSection: string;
  message: string;
  subtext: string;
}

const GUIDE_MESSAGES: GuideMessage[] = [
  {
    id: 'welcome',
    triggerSection: 'sky-scene-container',
    message: 'Welcome. Every great journey begins with one step.',
    subtext: 'Chapter One • The Entrance',
  },
  {
    id: '2023',
    triggerSection: 'year-section-2023',
    message: 'This is where courage became consistency.',
    subtext: 'August 2023 • The Inception',
  },
  {
    id: '2024',
    triggerSection: 'year-section-2024',
    message: 'When dreams meet discipline, extraordinary things happen.',
    subtext: '2024 • Rapid Growth & Momentum',
  },
  {
    id: '2025',
    triggerSection: 'year-section-2025',
    message: 'Growth is measured by lives touched.',
    subtext: '2025 • Expanding Impact',
  },
  {
    id: '2026',
    triggerSection: 'year-section-2026',
    message: 'Some journeys become home for millions.',
    subtext: '2026 • 5 Million Milestone',
  },
];

export const MemoryCurator: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const characterRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  const [activeMessage, setActiveMessage] = useState<GuideMessage | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasImageError, setHasImageError] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      GUIDE_MESSAGES.forEach((item) => {
        const triggerEl = document.getElementById(item.triggerSection);
        if (triggerEl) {
          ScrollTrigger.create({
            trigger: triggerEl,
            start: 'top 40%',
            end: 'bottom 40%',
            onEnter: () => showMessage(item),
            onEnterBack: () => showMessage(item),
            onLeave: () => hideMessage(),
            onLeaveBack: () => hideMessage(),
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const showMessage = (msg: GuideMessage) => {
    setActiveMessage(msg);
    setIsVisible(true);

    if (characterRef.current && textRef.current) {
      gsap.to(characterRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.4,
        ease: 'power3.out',
      });
      gsap.to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 0.3,
        ease: 'power2.out',
      });
    }
  };

  const hideMessage = () => {
    if (characterRef.current && textRef.current) {
      gsap.to([characterRef.current, textRef.current], {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power2.in',
        onComplete: () => setIsVisible(false),
      });
    }
  };

  if (!isVisible && !activeMessage) return null;

  return (
    <aside
      ref={containerRef}
      className="fixed right-6 md:right-12 bottom-12 z-40 pointer-events-none select-none flex items-end gap-5"
    >
      {/* Floating Narrator Thought Box */}
      <div
        ref={textRef}
        className="opacity-0 transform translate-y-5 max-w-xs md:max-w-md p-5 rounded-2xl bg-[#0c0d12]/95 border border-[#e5c158]/40 backdrop-blur-xl shadow-[0_0_35px_rgba(229,193,88,0.2)] text-right flex flex-col items-end gap-1.5 pointer-events-auto"
      >
        <div className="flex items-center gap-1.5 text-[#e5c158]">
          <Sparkles className="w-3.5 h-3.5" />
          <span className="font-general text-[10px] font-bold uppercase tracking-[0.25em]">
            Memory Curator
          </span>
        </div>

        <p className="font-general italic text-sm md:text-base text-[#f0f0f5] leading-relaxed">
          “{activeMessage?.message}”
        </p>

        <span className="font-general text-[10px] uppercase tracking-widest text-[#e5c158]/80 font-medium">
          {activeMessage?.subtext}
        </span>
      </div>

      {/* Guide Character Visual */}
      <div
        ref={characterRef}
        className="opacity-0 transform translate-y-5 relative w-20 h-28 md:w-24 md:h-32 shrink-0 rounded-2xl overflow-hidden border border-[#e5c158]/30 bg-[#0c0d12] backdrop-blur-md shadow-2xl flex items-center justify-center animate-pulse"
      >
        {!hasImageError ? (
          <img
            src={ASSET_PATHS.guide.characterImage}
            alt="Memory Curator"
            onError={() => setHasImageError(true)}
            className="w-full h-full object-cover filter contrast-110 opacity-90"
          />
        ) : (
          <div className="relative w-full h-full flex flex-col items-center justify-center p-2 bg-gradient-to-b from-[#181920] to-[#050507]">
            <div className="w-10 h-10 rounded-full border border-[#e5c158] bg-[#e5c158]/10 flex items-center justify-center text-[#e5c158] shadow-[0_0_15px_rgba(229,193,88,0.4)]">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="font-general text-[9px] uppercase tracking-widest text-[#e5c158] mt-2 font-bold">
              Curator
            </span>
          </div>
        )}
      </div>
    </aside>
  );
};
