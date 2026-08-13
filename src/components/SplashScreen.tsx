import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'visible' | 'fading'>('visible');

  useEffect(() => {
    // Phase 1: Show the symbol for 1.4s
    const fadeTimer = setTimeout(() => {
      setPhase('fading');
    }, 1400);

    // Phase 2: After fade-out completes (600ms), unmount
    const doneTimer = setTimeout(() => {
      onComplete();
    }, 2000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050507]"
      style={{
        opacity: phase === 'fading' ? 0 : 1,
        transition: 'opacity 600ms ease-out',
        pointerEvents: 'none',
      }}
    >
      {/* Single gold symbol — pulses once, no text, no logo */}
      <span
        style={{
          fontSize: '4rem',
          color: '#e5c158',
          filter: 'drop-shadow(0 0 40px rgba(229,193,88,0.9))',
          animation: 'splashPulse 1.4s ease-in-out forwards',
          display: 'inline-block',
          userSelect: 'none',
        }}
      >
        ✦
      </span>

      <style>{`
        @keyframes splashPulse {
          0%   { opacity: 0; transform: scale(0.6); filter: drop-shadow(0 0 0px rgba(229,193,88,0)); }
          40%  { opacity: 1; transform: scale(1.08); filter: drop-shadow(0 0 55px rgba(229,193,88,1)); }
          70%  { opacity: 1; transform: scale(1.0);  filter: drop-shadow(0 0 35px rgba(229,193,88,0.8)); }
          100% { opacity: 0.85; transform: scale(1.0); }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
