import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative w-full py-16 px-6 bg-[#050507] text-[#f0f0f5] font-general border-t border-[#e5c158]/30 select-none overflow-hidden z-20">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(229,193,88,0.1),transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col items-center text-center gap-6 relative z-10">
        <div className="flex items-center gap-2 text-[#e5c158]">
          <Sparkles className="w-4 h-4 animate-spin-slow" />
          <span className="font-general text-xs font-bold uppercase tracking-[0.3em]">
            Shree's Journey • Tribute
          </span>
        </div>

        {/* Primary Tribute Statement */}
        <div className="flex flex-col items-center gap-2">
          <p className="font-general text-base sm:text-xl font-medium tracking-wide flex items-center justify-center gap-2 text-[#f0f0f5]">
            Made with <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" /> by{' '}
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#e5c158] via-white to-[#e5c158]">
              Karthik
            </span>
          </p>

          <p className="font-general text-xs sm:text-sm font-semibold tracking-widest text-[#f0f0f5]/70 uppercase">
            In partnership with{' '}
            <span className="text-[#e5c158] font-bold">Arun</span>
          </p>
        </div>

        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#e5c158]/40 to-transparent my-2" />

        <p className="font-general text-[10px] uppercase tracking-widest text-[#f0f0f5]/40 font-bold">
          © 2023 – 2026 SHREE'S JOURNEY • ALL RIGHTS RESERVED
        </p>
      </div>
    </footer>
  );
};

export default Footer;
