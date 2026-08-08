import React, { useState } from 'react';
import { Heart, Sparkles, User, Globe, PenTool, Wind } from 'lucide-react';
import { ASSET_PATHS } from '../utils/assetPaths';
import SpecularButton from './SpecularButton';

interface CommunityPetalSectionProps {
  onAddPetal: (name: string, country: string, message: string) => void;
}

export const CommunityPetalSection: React.FC<CommunityPetalSectionProps> = ({ onAddPetal }) => {
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLifting, setIsLifting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsLifting(true);

    setTimeout(() => {
      onAddPetal(name.trim(), country.trim(), message.trim());
      setSubmitted(true);
      setIsLifting(false);
    }, 1200);

    setTimeout(() => {
      setName('');
      setCountry('');
      setMessage('');
      setSubmitted(false);
    }, 5500);
  };

  return (
    <section
      id="community-petal-section"
      className="relative w-full py-20 sm:py-36 md:py-48 px-4 sm:px-6 md:px-16 bg-[#0B0B0F] text-[#f0f0f5] font-general select-none flex flex-col items-center justify-center text-center overflow-hidden border-t border-[#e5c158]/20 my-12 sm:my-20 max-w-full"
    >
      {/* BLURRED CINEMATIC PLACEHOLDER BACKGROUND CANVAS */}
      <img
        src={ASSET_PATHS.ending.treeImage}
        alt="Community Canvas Background"
        className="absolute inset-0 w-full h-full object-cover filter blur-3xl scale-110 opacity-25 pointer-events-none z-0"
        onError={(e) => {
          (e.target as HTMLElement).style.display = 'none';
        }}
      />

      {/* OBSIDIAN OVERLAY & WARM GOLDEN RADIAL LIGHTING */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0F]/95 via-[#0B0B0F]/80 to-[#0B0B0F] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(229,193,88,0.25),transparent_70%)] pointer-events-none z-0" />

      {/* SUBTLE FLOATING DUST PARTICLES & SOFT VIGNETTE */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(229,193,88,0.08),transparent_60%)] pointer-events-none z-0" />

      {/* HEADER SECTION WITH STRUCTURED SPACING */}
      <div className="relative z-10 flex flex-col items-center gap-4 sm:gap-6 max-w-4xl mb-12 sm:mb-16 px-2">
        <div className="flex items-center gap-2 text-[#e5c158] bg-[#0c0d12]/90 px-4 py-1.5 sm:px-6 sm:py-2 rounded-full border border-[#e5c158]/40 backdrop-blur-xl shadow-2xl">
          <Sparkles className="w-4 h-4 animate-spin-slow" />
          <span className="font-general text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] sm:tracking-[0.35em]">
            A Sacred Memory Book
          </span>
        </div>

        {/* ELEGANT EDITORIAL CENTERED HEADING */}
        <h2 className="font-general text-4xl sm:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#e5c158] via-white to-[#e5c158] tracking-tight leading-none drop-shadow-[0_0_60px_rgba(229,193,88,0.5)]">
          Leave Your Petal
        </h2>

        <p className="font-general italic text-sm sm:text-xl lg:text-2xl text-[#f0f0f5]/85 max-w-2xl leading-relaxed mt-1 sm:mt-2 drop-shadow-md">
          “Write into this memory book. Your petal will unfold and drift through the Memory Tree for eternity.”
        </p>

        <div className="w-20 sm:w-24 h-0.5 bg-gradient-to-r from-transparent via-[#e5c158]/50 to-transparent mt-2 sm:mt-4" />
      </div>

      {/* FLOATING GLASS CANVAS PANEL WITH PERFECT STRUCTURED PLACEMENT */}
      <div className="relative z-10 max-w-4xl w-full p-5 sm:p-12 md:p-16 rounded-3xl sm:rounded-[48px] bg-[#0c0d12]/80 border border-[#e5c158]/35 backdrop-blur-3xl shadow-[0_0_120px_rgba(229,193,88,0.2)] flex flex-col items-center gap-8 sm:gap-10">
        
        {/* Floating Petal Accents */}
        <div className="absolute -top-4 -left-4 p-2.5 sm:p-3 rounded-full bg-[#0c0d12] border border-[#e5c158]/40 text-[#e5c158] shadow-xl">
          <Wind className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
        </div>
        <div className="absolute -bottom-4 -right-4 p-2.5 sm:p-3 rounded-full bg-[#0c0d12] border border-[#e5c158]/40 text-rose-300 shadow-xl">
          <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-rose-300 animate-pulse" />
        </div>

        {submitted ? (
          <div className="w-full py-12 px-6 sm:py-16 sm:px-8 rounded-3xl bg-rose-500/10 border border-rose-400/40 text-rose-200 font-general text-base font-semibold flex flex-col items-center gap-4 sm:gap-6 animate-fade-in shadow-2xl">
            <div className="relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-rose-500/20 border border-rose-400/60 shadow-[0_0_40px_rgba(244,63,94,0.6)]">
              <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-rose-300 fill-rose-300 animate-pulse" />
            </div>
            <span className="font-serif italic text-2xl sm:text-3xl text-[#e5c158]">
              “Your memory has joined the journey.”
            </span>
            <p className="text-xs text-[#f0f0f5]/70 tracking-widest uppercase max-w-md leading-relaxed">
              Your petal is now drifting smoothly with the wind over the Memory Tree
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6 sm:gap-8">
            {/* FLOATING GLASS INPUTS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="relative">
                <User className="absolute left-4 top-4 w-4 h-4 text-[#e5c158]/80" />
                <input
                  type="text"
                  placeholder="Your Name (Optional)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 sm:py-4 rounded-2xl bg-white/[0.04] border border-white/15 text-[#f0f0f5] font-general text-sm focus:outline-none focus:border-[#e5c158] focus:ring-1 focus:ring-[#e5c158]/60 transition-all placeholder:text-[#f0f0f5]/35 backdrop-blur-md min-h-[44px]"
                />
              </div>

              <div className="relative">
                <Globe className="absolute left-4 top-4 w-4 h-4 text-[#e5c158]/80" />
                <input
                  type="text"
                  placeholder="Country / Location (Optional)"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 sm:py-4 rounded-2xl bg-white/[0.04] border border-white/15 text-[#f0f0f5] font-general text-sm focus:outline-none focus:border-[#e5c158] focus:ring-1 focus:ring-[#e5c158]/60 transition-all placeholder:text-[#f0f0f5]/35 backdrop-blur-md min-h-[44px]"
                />
              </div>
            </div>

            {/* PERSONAL JOURNAL TEXTAREA */}
            <div className="relative">
              <PenTool className="absolute left-4 top-4.5 w-4 h-4 text-[#e5c158]/80" />
              <textarea
                required
                rows={5}
                placeholder="Write your heartfelt memory or reflection..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full pl-11 pr-4 pt-4 pb-4 sm:pt-5 sm:pb-6 rounded-3xl bg-white/[0.04] border border-white/15 text-[#f0f0f5] font-serif italic text-base sm:text-lg leading-relaxed focus:outline-none focus:border-[#e5c158] focus:ring-1 focus:ring-[#e5c158]/60 transition-all placeholder:text-[#f0f0f5]/35 backdrop-blur-md resize-none shadow-inner min-h-[120px]"
              />
            </div>

            {/* SUBMIT PETAL LIFTING BUTTON EXPERIENCE */}
            <div className="relative w-full flex justify-center mt-1 sm:mt-2">
              {isLifting ? (
                <div className="flex items-center gap-3 px-8 py-3.5 sm:px-10 sm:py-4.5 rounded-2xl bg-[#e5c158]/20 border border-[#e5c158]/60 text-[#e5c158] font-general text-xs sm:text-sm font-bold tracking-wider animate-bounce shadow-[0_0_40px_rgba(229,193,88,0.5)]">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-rose-300 fill-rose-300 animate-spin" />
                  <span>Petal Lifting into the Memory Tree...</span>
                </div>
              ) : (
                <SpecularButton
                  size="lg"
                  radius={24}
                  lineColor="#e5c158"
                  baseColor="#0c0d12"
                  type="submit"
                  className="w-full sm:w-auto px-8 sm:px-12 py-3.5 sm:py-4"
                >
                  <Heart className="w-4 h-4 text-rose-300 fill-rose-300" />
                  <span>Release Petal into the Wind →</span>
                </SpecularButton>
              )}
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default CommunityPetalSection;
