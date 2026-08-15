import React, { useEffect, useState } from 'react';
import { preloadCriticalAssets } from '../utils/imagePreloader';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'visible' | 'fading'>('visible');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Warm up critical image assets in parallel
    preloadCriticalAssets().catch(() => {});

    // Smooth progress bar fill
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 4;
      });
    }, 40);

    // Fade out trigger after 1.6s
    const fadeTimer = setTimeout(() => {
      setPhase('fading');
    }, 1600);

    // Unmount after fade completes
    const doneTimer = setTimeout(() => {
      onComplete();
    }, 2200);

    return () => {
      clearInterval(interval);
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setPhase('fading');
    setTimeout(() => onComplete(), 300);
  };

  return (
    <div
      onClick={handleSkip}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#050507] select-none cursor-pointer overflow-hidden"
      style={{
        opacity: phase === 'fading' ? 0 : 1,
        transition: 'opacity 600ms cubic-bezier(0.16, 1, 0.3, 1), transform 600ms ease-out',
        transform: phase === 'fading' ? 'scale(1.03)' : 'scale(1)',
        pointerEvents: phase === 'fading' ? 'none' : 'auto',
      }}
    >
      {/* Ambient Starlight Radial Bloom */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(229,193,88,0.18)_0%,transparent_65%)] pointer-events-none" />

      {/* Expanding Ripple Rings */}
      <div className="absolute w-72 h-72 rounded-full border border-[#e5c158]/20 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] pointer-events-none" />
      <div className="absolute w-44 h-44 rounded-full border border-[#e5c158]/30 animate-[pulse_2s_ease-in-out_infinite] pointer-events-none" />

      {/* Central Emblem & Title */}
      <div className="relative z-10 flex flex-col items-center gap-5 text-center px-6">
        {/* Glowing Sacred Starlight Symbol */}
        <div className="relative flex items-center justify-center">
          <span
            className="text-4xl sm:text-5xl text-[#e5c158] select-none"
            style={{
              filter: 'drop-shadow(0 0 35px rgba(229,193,88,0.95))',
              animation: 'splashGlow 1.8s ease-in-out infinite alternate',
            }}
          >
            ✦
          </span>
        </div>

        {/* Refined Cinematic Typography */}
        <div className="flex flex-col items-center gap-2">
          <h1 className="font-general text-xs sm:text-sm font-extrabold uppercase tracking-[0.45em] text-[#e5c158] drop-shadow-[0_0_20px_rgba(229,193,88,0.5)]">
            Shree’s Journey
          </h1>
          <p className="font-serif italic text-sm sm:text-base text-[#f0f0f5]/75 tracking-wider">
            A tribute to 5 million hearts
          </p>
        </div>

        {/* Razor-Thin Champagne Gold Progress Bar */}
        <div className="w-36 sm:w-48 h-[1.5px] bg-white/10 rounded-full overflow-hidden mt-3">
          <div
            className="h-full bg-gradient-to-r from-[#e5c158]/40 via-[#e5c158] to-white rounded-full transition-all duration-75 ease-out shadow-[0_0_12px_rgba(229,193,88,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Subtle Tap Hint */}
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#f0f0f5]/30 mt-2 font-general">
          Tap anywhere to enter
        </span>
      </div>

      <style>{`
        @keyframes splashGlow {
          0% {
            transform: scale(0.92);
            filter: drop-shadow(0 0 20px rgba(229,193,88,0.6));
          }
          100% {
            transform: scale(1.08);
            filter: drop-shadow(0 0 45px rgba(229,193,88,1));
          }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
