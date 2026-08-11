import React, { useState } from 'react';
import { Star, Sparkles, CheckCircle2 } from 'lucide-react';
import SpecularButton from './SpecularButton';
import CelebrationBurst from './CelebrationBurst';
import { useSupabaseStars } from '../hooks/useSupabaseStars';

interface StarBlessingCounterProps {
  className?: string;
}

interface FloatingStarParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
}

export const StarBlessingCounter: React.FC<StarBlessingCounterProps> = ({ className = '' }) => {
  const { globalStarCount, userStars, maxUserStars, isLimitReached, lightStar } = useSupabaseStars();
  const [isSparkling, setIsSparkling] = useState<boolean>(false);
  const [burstTrigger, setBurstTrigger] = useState<boolean>(false);
  const [floatingStars, setFloatingStars] = useState<FloatingStarParticle[]>([]);

  const handleLightStar = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isLimitReached) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Spawn 6 floating upward shooting star particles
    const newParticles: FloatingStarParticle[] = Array.from({ length: 6 }, (_, i) => ({
      id: Date.now() + i + Math.random(),
      x: clickX + (Math.random() - 0.5) * 80,
      y: clickY + (Math.random() - 0.5) * 40,
      size: Math.random() * 16 + 12,
      rotation: Math.random() * 360,
    }));

    setFloatingStars((prev) => [...prev, ...newParticles]);
    setTimeout(() => {
      setFloatingStars((prev) => prev.filter((s) => !newParticles.includes(s)));
    }, 1200);

    const success = await lightStar();
    if (success) {
      setIsSparkling(true);
      setBurstTrigger(true);
      setTimeout(() => setIsSparkling(false), 600);
    }
  };

  return (
    <div className={`relative flex flex-col items-center text-center gap-4 p-6 sm:p-8 rounded-[36px] bg-[#0c0d12]/95 border-2 border-[#e5c158]/50 backdrop-blur-2xl shadow-[0_0_80px_rgba(229,193,88,0.3)] transition-all overflow-hidden ${className}`}>
      
      {/* Background Pulse Glow */}
      <div className={`absolute inset-0 bg-radial-gradient(ellipse_at_center,rgba(229,193,88,0.25),transparent_70%) pointer-events-none transition-opacity duration-500 ${isSparkling ? 'opacity-100' : 'opacity-40'}`} />

      {/* Screen Burst on Click */}
      <CelebrationBurst trigger={burstTrigger} onComplete={() => setBurstTrigger(false)} />

      {/* Badge Header */}
      <div className="flex items-center gap-2 text-[#e5c158] text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] bg-[#e5c158]/15 px-4 py-1.5 rounded-full border border-[#e5c158]/40 shadow-inner">
        <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
        <span>Global Star Blessings</span>
      </div>

      {/* Main Counter Display */}
      <div className="flex flex-col items-center gap-1 z-10">
        <div className="flex items-center gap-3">
          <Star className={`w-8 h-8 sm:w-10 sm:h-10 text-[#e5c158] fill-[#e5c158] transition-transform duration-300 ${isSparkling ? 'scale-135 rotate-45 drop-shadow-[0_0_35px_rgba(255,215,0,1)]' : 'animate-pulse'}`} />
          <span className="font-general text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] via-[#f7e6a7] to-[#e5c158] tracking-tight drop-shadow-[0_0_30px_rgba(229,193,88,0.6)]">
            {globalStarCount.toLocaleString()}
          </span>
        </div>
        <p className="font-general text-xs sm:text-sm text-[#f0f0f5]/80 mt-1">
          Golden stars lit by the 5 Million Family around the globe ✨
        </p>
      </div>

      {/* User Progress Indicator (Max 5 Stars) */}
      <div className="flex flex-col items-center gap-2 z-10 my-1">
        <div className="flex items-center gap-1.5">
          {Array.from({ length: maxUserStars }).map((_, idx) => (
            <Star
              key={idx}
              className={`w-5 h-5 transition-all duration-300 ${
                idx < userStars
                  ? 'text-[#e5c158] fill-[#e5c158] scale-110 drop-shadow-[0_0_12px_rgba(229,193,88,0.9)]'
                  : 'text-white/20 fill-none border-white/10'
              }`}
            />
          ))}
        </div>
        <span className="text-[11px] font-bold text-[#e5c158] uppercase tracking-widest bg-[#e5c158]/10 px-3 py-0.5 rounded-full border border-[#e5c158]/30">
          Your Stars: {userStars} / {maxUserStars} ⭐
        </span>
      </div>

      {/* Light Star Action Button */}
      <div className="relative w-full max-w-xs z-10 mt-1">
        {!isLimitReached ? (
          <SpecularButton
            onClick={handleLightStar}
            size="lg"
            radius={24}
            lineColor="#e5c158"
            baseColor="#0c0d12"
            className="w-full justify-center py-4 text-xs font-bold uppercase tracking-widest text-[#e5c158] shadow-[0_0_40px_rgba(229,193,88,0.45)] active:scale-95 transition-transform"
          >
            <Star className="w-4 h-4 text-[#e5c158] fill-[#e5c158] animate-bounce" />
            <span>Light a Golden Star 🌟</span>
          </SpecularButton>
        ) : (
          <div className="w-full py-3.5 px-4 rounded-2xl bg-[#e5c158]/15 border-2 border-[#e5c158] text-[#e5c158] text-xs font-bold flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(229,193,88,0.4)] animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>5 Stars Lit 🌟 Thank You For Your Blessings!</span>
          </div>
        )}

        {/* Upward Floating Shooting Stars Animation */}
        {floatingStars.map((star) => (
          <div
            key={star.id}
            className="absolute pointer-events-none text-[#e5c158] font-bold animate-float-up opacity-90 drop-shadow-[0_0_20px_rgba(255,215,0,1)]"
            style={{
              left: `${star.x}px`,
              top: `${star.y}px`,
              fontSize: `${star.size}px`,
              transform: `rotate(${star.rotation}deg)`,
            }}
          >
            🌟
          </div>
        ))}
      </div>

    </div>
  );
};

export default StarBlessingCounter;
