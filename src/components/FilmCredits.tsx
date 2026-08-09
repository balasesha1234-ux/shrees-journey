import React from 'react';
import { Lock } from 'lucide-react';
import SpecularButton from './SpecularButton';

interface FilmCreditsProps {
  onOpenSecretModal?: () => void;
}

export const FilmCredits: React.FC<FilmCreditsProps> = ({ onOpenSecretModal }) => {
  return (
    <footer className="relative w-full py-32 px-6 bg-[#0B0B0F] text-[#f0f0f5] font-general select-none overflow-hidden flex flex-col items-center justify-center text-center border-t border-white/5">
      {/* Soft Ambient Radial Warm Light */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(229,193,88,0.06),transparent_70%)] pointer-events-none" />

      {/* Film End Credits Content Container */}
      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center gap-14 tracking-widest uppercase text-xs sm:text-sm font-medium">
        
        {/* Crafted by Section */}
        <div className="flex flex-col items-center gap-3">
          <span className="font-general text-[10px] sm:text-xs text-[#e5c158] font-extrabold tracking-[0.4em] opacity-80">
            Crafted with Gratitude
          </span>
          <span className="font-general text-[10px] text-[#f0f0f5]/40 font-normal tracking-[0.3em]">
            by
          </span>
          <h4 className="font-general text-xl sm:text-3xl font-black text-[#f0f0f5] tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-b from-white via-[#f0f0f5] to-[#e5c158]/80">
            Karthik
          </h4>
        </div>

        {/* Visual Assets Section */}
        <div className="flex flex-col items-center gap-3">
          <span className="font-general text-[10px] sm:text-xs text-[#e5c158] font-extrabold tracking-[0.4em] opacity-80">
            Visual Assets & Resources
          </span>
          <h4 className="font-general text-lg sm:text-2xl font-extrabold text-[#f0f0f5] tracking-[0.25em]">
            Arun
          </h4>
        </div>

        {/* Special Thanks Section */}
        <div className="flex flex-col items-center gap-3">
          <span className="font-general text-[10px] sm:text-xs text-[#e5c158] font-extrabold tracking-[0.4em] opacity-80">
            Special Thanks
          </span>
          <p className="font-general text-sm sm:text-lg font-bold text-[#f0f0f5]/90 tracking-[0.2em] flex flex-col gap-1">
            <span>Dhrubayan</span>
            <span>Vardhan Ji</span>
          </p>
        </div>

        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#e5c158]/30 to-transparent my-2" />

        {/* Final Closing Statement */}
        <div className="flex flex-col items-center gap-2">
          <p className="font-general normal-case italic text-base sm:text-xl text-[#e5c158] font-light tracking-wide">
            Thank you for experiencing
          </p>
          <h2 className="font-general text-2xl sm:text-4xl font-black text-[#f0f0f5] tracking-tight">
            SHREE'S JOURNEY
          </h2>
        </div>

        {/* Subtle Discreet Specular Button */}
        {onOpenSecretModal && (
          <div className="mt-4">
            <SpecularButton
              size="lg"
              radius={24}
              lineColor="#e5c158"
              baseColor="#0c0d12"
              onClick={onOpenSecretModal}
              className="px-8 sm:px-12 py-3.5 sm:py-4"
            >
              <Lock className="w-4 h-4 text-[#e5c158]" />
              <span>Private Epilogue ✦</span>
            </SpecularButton>
          </div>
        )}

      </div>

      {/* Slow Fade to Black at the Bottom */}
      <div className="w-full h-32 bg-gradient-to-b from-transparent to-[#0B0B0F] mt-16 pointer-events-none" />
    </footer>
  );
};

export default FilmCredits;
