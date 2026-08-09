import React, { useState } from 'react';
import { Heart, Sparkles, User, Globe, PenTool, Wind, Award, X } from 'lucide-react';
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
  const [showKeepsake, setShowKeepsake] = useState(false);
  const [savedPetalInfo, setSavedPetalInfo] = useState<{
    id: string;
    name: string;
    country: string;
    message: string;
    date: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsLifting(true);

    const petalId = `PETAL #${Math.floor(4800 + Math.random() * 400)}`;
    const formattedDate = new Date().toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });

    const info = {
      id: petalId,
      name: name.trim() || 'Anonymous Fan',
      country: country.trim() || 'Global Family',
      message: message.trim(),
      date: formattedDate,
    };

    setTimeout(() => {
      onAddPetal(info.name, info.country, info.message);
      setSavedPetalInfo(info);
      setSubmitted(true);
      setIsLifting(false);
      setShowKeepsake(true);
    }, 1200);
  };

  const handleResetForm = () => {
    setName('');
    setCountry('');
    setMessage('');
    setSubmitted(false);
    setShowKeepsake(false);
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
          <div className="w-full py-10 px-6 sm:py-14 sm:px-8 rounded-3xl bg-rose-500/10 border border-rose-400/40 text-rose-200 font-general text-base font-semibold flex flex-col items-center gap-4 sm:gap-6 animate-fade-in shadow-2xl">
            <div className="relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-rose-500/20 border border-rose-400/60 shadow-[0_0_40px_rgba(244,63,94,0.6)]">
              <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-rose-300 fill-rose-300 animate-pulse" />
            </div>
            <span className="font-serif italic text-2xl sm:text-3xl text-[#e5c158]">
              “Your memory has joined the journey.”
            </span>
            <p className="text-xs text-[#f0f0f5]/70 tracking-widest uppercase max-w-md leading-relaxed">
              Your petal is now drifting smoothly with the wind over the Memory Tree
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-2">
              <SpecularButton
                size="md"
                radius={20}
                lineColor="#e5c158"
                baseColor="#0c0d12"
                onClick={() => setShowKeepsake(true)}
              >
                <Award className="w-4 h-4 text-[#e5c158]" />
                <span>View Digital Keepsake Card ✨</span>
              </SpecularButton>

              <button
                onClick={handleResetForm}
                className="px-5 py-2.5 rounded-2xl bg-white/5 border border-white/15 text-xs text-[#f0f0f5]/80 hover:text-white hover:border-white/30 transition-all font-semibold uppercase tracking-wider"
              >
                Plant Another Petal 🌱
              </button>
            </div>
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

      {/* DIGITAL KEEPSAKE CARD MODAL */}
      {showKeepsake && savedPetalInfo && (
        <div
          onClick={() => setShowKeepsake(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/92 backdrop-blur-2xl animate-fade-in cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-xl w-full p-6 sm:p-10 rounded-[36px] bg-[#0c0d12] border-2 border-[#e5c158]/60 flex flex-col items-center gap-6 shadow-[0_0_100px_rgba(229,193,88,0.3)] text-center cursor-default animate-fade-in"
          >
            {/* Close Button */}
            <button
              onClick={() => setShowKeepsake(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 border border-white/15 text-[#f0f0f5]/70 hover:text-[#e5c158] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Gold Foil Header Tag */}
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e5c158]/15 border border-[#e5c158]/50 text-[#e5c158] font-general text-[10px] sm:text-xs font-bold uppercase tracking-[0.35em]">
              <Award className="w-4 h-4" />
              <span>Official Memory Keepsake</span>
            </div>

            {/* Keepsake Certificate Inner Frame */}
            <div className="w-full p-6 sm:p-8 rounded-3xl bg-[#050507] border border-[#e5c158]/30 flex flex-col items-center gap-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 bg-[radial-gradient(circle_at_center,rgba(229,193,88,0.15),transparent_70%)] pointer-events-none" />

              <span className="font-general text-xs font-extrabold tracking-[0.4em] text-[#e5c158] uppercase">
                {savedPetalInfo.id}
              </span>

              <h3 className="font-general text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#e5c158] via-white to-[#e5c158] tracking-tight">
                Shree’s 5 Million Garden
              </h3>

              <div className="w-16 h-0.5 bg-[#e5c158]/40" />

              <p className="font-serif italic text-base sm:text-lg text-[#f0f0f5]/90 leading-relaxed px-2">
                “{savedPetalInfo.message}”
              </p>

              <div className="flex flex-col items-center gap-1 mt-2 text-xs font-semibold text-[#e5c158]">
                <span>— {savedPetalInfo.name}</span>
                <span className="text-[10px] text-[#f0f0f5]/60 uppercase tracking-widest">
                  {savedPetalInfo.country} • {savedPetalInfo.date}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 w-full">
              <SpecularButton
                size="md"
                radius={20}
                lineColor="#e5c158"
                baseColor="#0c0d12"
                onClick={() => setShowKeepsake(false)}
                className="px-6"
              >
                <Sparkles className="w-4 h-4 text-[#e5c158]" />
                <span>Keep Memory Card ✨</span>
              </SpecularButton>

              <button
                onClick={handleResetForm}
                className="px-5 py-2.5 rounded-2xl bg-white/5 border border-white/15 text-xs text-[#f0f0f5]/80 hover:text-white hover:border-white/30 transition-all font-semibold uppercase tracking-wider"
              >
                Plant Another Petal 🌱
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CommunityPetalSection;
