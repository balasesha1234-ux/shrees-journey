import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface MilestoneCounterProps {
  targetValue: number; // e.g. 500000, 2500000, 4000000, 5000000
  label: string;      // e.g. "500K Subscribers", "2.5M Family", "4M Impact", "5M Summit"
  subtitle?: string;  // e.g. "End of 2023 Milestone"
  badgeText?: string;
  badgeColor?: string; // Hex or Tailwind color class
}

export const MilestoneCounter: React.FC<MilestoneCounterProps> = ({
  targetValue,
  label,
  subtitle,
  badgeText,
  badgeColor = '#e5c158',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const numberRef = useRef<HTMLSpanElement | null>(null);

  const formatNumber = (num: number, isComplete: boolean = false): string => {
    if (targetValue >= 1000000) {
      const millions = num / 1000000;
      if (isComplete) {
        return millions % 1 === 0 ? `${millions.toFixed(0)}M` : `${millions.toFixed(1)}M`;
      }
      return `${millions.toFixed(2)}M`;
    }
    if (targetValue >= 1000) {
      const thousands = num / 1000;
      if (isComplete) {
        return `${thousands.toFixed(0)}K`;
      }
      return `${thousands.toFixed(1)}K`;
    }
    return Math.floor(num).toLocaleString();
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const counterObj = { val: 0 };

    const ctx = gsap.context(() => {
      gsap.to(counterObj, {
        val: targetValue,
        duration: 2.4,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        onUpdate: () => {
          if (numberRef.current) {
            const isDone = counterObj.val >= targetValue - 10;
            numberRef.current.innerText = formatNumber(counterObj.val, isDone);
          }
        },
        onComplete: () => {
          if (numberRef.current) {
            numberRef.current.innerText = formatNumber(targetValue, true);
          }
        },
      });
    }, el);

    return () => ctx.revert();
  }, [targetValue]);

  return (
    <div
      ref={containerRef}
      className="relative z-10 flex flex-col items-center justify-center p-6 sm:p-8 rounded-[28px] bg-[#0c0d12]/90 border border-[#e5c158]/40 shadow-[0_0_45px_rgba(229,193,88,0.18)] backdrop-blur-2xl text-center gap-3 select-none my-4 max-w-sm w-full mx-auto"
    >
      {/* Premium Header Tag */}
      {badgeText && (
        <div
          className="flex items-center gap-2 px-4 py-1.5 rounded-full border text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] backdrop-blur-md shadow-md"
          style={{ borderColor: `${badgeColor}60`, color: badgeColor, backgroundColor: `${badgeColor}15` }}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{badgeText}</span>
        </div>
      )}

      {/* Main Counter Display with High-Contrast Gold Gradient */}
      <div className="flex flex-col items-center leading-none my-1">
        <span
          ref={numberRef}
          className="font-general font-black text-4xl sm:text-6xl md:text-7xl tracking-[0.05em] text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] via-[#f7e6a7] to-[#e5c158] drop-shadow-[0_0_25px_rgba(229,193,88,0.5)]"
        >
          0
        </span>
      </div>

      {/* Label and Subtitle with Custom Height & Word Spacing */}
      <div className="flex flex-col items-center gap-1">
        <span className="font-general text-xs sm:text-sm font-extrabold uppercase tracking-[0.25em] text-[#e5c158] leading-snug">
          {label}
        </span>
        {subtitle && (
          <span className="font-general italic text-xs text-[#f0f0f5]/70 tracking-widest">
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
};

export default MilestoneCounter;
