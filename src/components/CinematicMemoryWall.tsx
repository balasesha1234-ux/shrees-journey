import React, { useState } from 'react';
import { Sparkles, X, ZoomIn } from 'lucide-react';
import { ASSET_PATHS } from '../utils/assetPaths';
import SpecularButton from './SpecularButton';

export interface MemoryMoment {
  id: string;
  image: string;
  title: string;
  caption: string;
  subtext?: string;
  isHero?: boolean;
}

/**
 * CENTRALIZED EDITABLE MEMORY MOMENTS CONFIGURATION
 * Add, remove, reorder, or update photographs easily here.
 */
export const MEMORY_MOMENTS: MemoryMoment[] = [
  {
    id: 'moment-hero',
    image: ASSET_PATHS.timeline.y2026.heroImage,
    title: 'The 5 Million Family',
    caption: 'A landmark milestone built on gratitude.',
    subtext: 'Standing together celebrating 5 million hearts connected along the path.',
    isHero: true,
  },
  {
    id: 'moment-01',
    image: ASSET_PATHS.timeline.y2023.heroImage,
    title: 'Quiet Beginnings',
    caption: 'Where the journey first took root.',
    subtext: 'The small, unseen steps of dedication and passion.',
  },
  {
    id: 'moment-02',
    image: ASSET_PATHS.timeline.y2024.heroImage,
    title: 'Building Momentum',
    caption: 'Persistence in every single detail.',
    subtext: 'Showing up day after day until the vision began breaking through.',
  },
  {
    id: 'moment-03',
    image: ASSET_PATHS.timeline.y2025.heroImage,
    title: 'Reaching New Horizons',
    caption: 'Connecting hearts around the world.',
    subtext: 'A growing community united by authenticity and shared joy.',
  },
  {
    id: 'moment-04',
    image: ASSET_PATHS.timeline.y2025.landscape,
    title: 'Cherished Reflections',
    caption: 'Unforgettable memories along the way.',
    subtext: 'Memories shared with family, team, and lifelong supporters.',
  },
  {
    id: 'moment-05',
    image: ASSET_PATHS.timeline.y2026.landscape,
    title: 'Looking to the Future',
    caption: 'The story continues forward.',
    subtext: 'Every milestone is simply the threshold of a greater chapter.',
  },
  {
    id: 'moment-06',
    image: ASSET_PATHS.timeline.y2025.gallery1,
    title: 'Behind the Scenes',
    caption: 'The quiet hours of preparation.',
    subtext: 'Crafting content with care when no one was watching.',
  },
  {
    id: 'moment-07',
    image: ASSET_PATHS.timeline.y2026.gallery2,
    title: 'Shared Celebrations',
    caption: 'Moments of genuine happiness.',
    subtext: 'Grateful for every single soul who believes in this journey.',
  },
];

export const CinematicMemoryWall: React.FC = () => {
  const [activeMoment, setActiveMoment] = useState<MemoryMoment | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const heroMoment = MEMORY_MOMENTS.find((m) => m.isHero) || MEMORY_MOMENTS[0];
  const surroundingMoments = MEMORY_MOMENTS.filter((m) => m.id !== heroMoment.id);

  return (
    <section
      id="cinematic-memory-wall"
      className="relative w-full py-28 md:py-40 px-6 bg-[#0B0B0F] text-[#f0f0f5] font-general select-none flex flex-col items-center justify-center overflow-hidden border-t border-[#e5c158]/20 max-w-full"
    >
      {/* Soft Ambient Radial Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(229,193,88,0.12),transparent_70%)] pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 max-w-3xl text-center flex flex-col items-center gap-3 mb-16 sm:mb-24">
        <div className="flex items-center gap-2 text-[#e5c158] bg-[#0c0d12]/90 px-4 py-1.5 rounded-full border border-[#e5c158]/30 backdrop-blur-md shadow-lg">
          <Sparkles className="w-4 h-4 text-[#e5c158]" />
          <span className="font-general text-xs font-bold uppercase tracking-[0.35em]">
            Cinematic Memory Wall
          </span>
        </div>

        <h2 className="font-general text-4xl sm:text-6xl font-black text-[#f0f0f5] tracking-tight">
          A Wall of Memories
        </h2>

        <p className="font-general italic text-base sm:text-xl text-[#e5c158]/90 max-w-lg leading-relaxed">
          “Moments that shaped the story, floating softly through time.”
        </p>
      </header>

      {/* ORGANIC FLOATING MEMORY WALL CONTAINER (DESKTOP) */}
      <div className="relative z-10 max-w-6xl w-full hidden md:flex flex-col items-center justify-center min-h-[620px] my-4">
        
        {/* CENTER HERO PHOTOGRAPH */}
        <div
          onClick={() => setActiveMoment(heroMoment)}
          onMouseEnter={() => setHoveredId(heroMoment.id)}
          onMouseLeave={() => setHoveredId(null)}
          data-cursor-hover
          className="relative z-20 w-72 h-96 rounded-3xl p-2.5 bg-[#0c0d12] border-2 border-[#e5c158]/50 shadow-[0_0_50px_rgba(229,193,88,0.35)] cursor-pointer transition-all duration-700 ease-out group animate-pulse-subtle"
          style={{
            transform: hoveredId === heroMoment.id ? 'scale(1.06) translateZ(30px)' : 'scale(1)',
            filter: hoveredId === heroMoment.id ? 'brightness(115%) contrast(105%)' : 'brightness(100%)',
          }}
        >
          {/* Hero Tag */}
          <div className="absolute top-4 left-4 z-30 px-3 py-1 rounded-full bg-[#0c0d12]/90 border border-[#e5c158]/60 text-[#e5c158] font-general text-[10px] font-bold uppercase tracking-widest backdrop-blur-md">
            ⭐ Main Memory
          </div>

          {/* Uncropped Hero Photo Container */}
          <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#050507] flex items-center justify-center">
            <img
              src={heroMoment.image}
              alt={heroMoment.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-contain filter contrast-105 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d12] via-transparent to-transparent opacity-60 pointer-events-none" />
          </div>

          {/* Hover View Badge */}
          <div className="absolute bottom-4 left-4 right-4 z-30 flex items-center justify-between font-general text-[11px] font-bold uppercase tracking-wider text-[#e5c158]">
            <span className="truncate">{heroMoment.title}</span>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 px-3 py-1 rounded-full border border-[#e5c158]/50 shadow-md">
              <ZoomIn className="w-3.5 h-3.5 text-[#e5c158]" />
              <span>View</span>
            </div>
          </div>
        </div>

        {/* SURROUNDING ORGANIC FLOATING PHOTOGRAPHS */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          {surroundingMoments.map((moment, index) => {
            // Calculated organic offsets around the center hero photo
            const positions = [
              { top: '4%', left: '8%', rotate: '-3deg', delay: '0s' },    // Top-Left
              { top: '6%', right: '8%', rotate: '4deg', delay: '1.2s' },   // Top-Right
              { top: '42%', left: '4%', rotate: '2deg', delay: '2.4s' },   // Mid-Left
              { top: '44%', right: '4%', rotate: '-4deg', delay: '3.6s' }, // Mid-Right
              { bottom: '4%', left: '12%', rotate: '-2deg', delay: '0.8s' }, // Bottom-Left
              { bottom: '6%', right: '12%', rotate: '3deg', delay: '2.0s' }, // Bottom-Right
              { bottom: '2%', left: '42%', rotate: '1deg', delay: '1.6s' },  // Bottom-Center
            ];

            const pos = positions[index % positions.length];
            const isHovered = hoveredId === moment.id;

            return (
              <div
                key={moment.id}
                onClick={() => setActiveMoment(moment)}
                onMouseEnter={() => setHoveredId(moment.id)}
                onMouseLeave={() => setHoveredId(null)}
                data-cursor-hover
                className="absolute w-52 h-72 rounded-3xl p-2 bg-[#0c0d12] border border-[#e5c158]/30 shadow-xl cursor-pointer pointer-events-auto transition-all duration-500 ease-out group"
                style={{
                  top: pos.top,
                  left: pos.left,
                  right: pos.right,
                  bottom: pos.bottom,
                  transform: isHovered
                    ? 'scale(1.08) rotate(0deg) translateZ(20px)'
                    : `rotate(${pos.rotate})`,
                  zIndex: isHovered ? 40 : 10 + index,
                  boxShadow: isHovered
                    ? '0 0 40px rgba(229,193,88,0.45)'
                    : '0 10px 25px rgba(0,0,0,0.7)',
                  filter: isHovered ? 'brightness(115%) contrast(105%)' : 'brightness(92%)',
                  animation: !isHovered ? `floatDrift 7s ease-in-out infinite alternate ${pos.delay}` : 'none',
                }}
              >
                {/* Uncropped Photo Container */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#050507] flex items-center justify-center">
                  <img
                    src={moment.image}
                    alt={moment.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain filter contrast-105 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d12] via-transparent to-transparent opacity-60 pointer-events-none" />
                </div>

                {/* Minimal Hover Badge */}
                <div className="absolute bottom-3 left-3 right-3 z-30 flex items-center justify-between font-general text-[10px] font-bold uppercase tracking-wider text-[#e5c158]">
                  <span className="truncate">{moment.title}</span>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 px-2.5 py-1 rounded-full border border-[#e5c158]/50 shadow-md">
                    <ZoomIn className="w-3 h-3 text-[#e5c158]" />
                    <span className="text-[9px]">View</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* RESPONSIVE GRID LAYOUT (MOBILE & TABLET) */}
      <div className="relative z-10 w-full max-w-xl md:hidden flex flex-col gap-6 my-4">
        {MEMORY_MOMENTS.map((moment) => (
          <div
            key={moment.id}
            onClick={() => setActiveMoment(moment)}
            data-cursor-hover
            className="w-full h-72 rounded-3xl p-2 bg-[#0c0d12] border border-[#e5c158]/30 shadow-xl cursor-pointer flex flex-col justify-between"
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#050507] flex items-center justify-center">
              <img
                src={moment.image}
                alt={moment.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-3 flex items-center justify-between text-xs font-bold text-[#e5c158] uppercase tracking-wider">
              <span>{moment.title}</span>
              <span className="text-[10px] opacity-70">Tap to expand</span>
            </div>
          </div>
        ))}
      </div>

      {/* LIGHTBOX EXPANDED PRESENTATION MODAL */}
      {activeMoment && (
        <div
          onClick={() => setActiveMoment(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/92 backdrop-blur-2xl animate-fade-in cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full p-6 sm:p-10 rounded-3xl bg-[#0c0d12] border border-[#e5c158]/40 flex flex-col items-center gap-6 shadow-[0_0_90px_rgba(229,193,88,0.25)] text-center cursor-default animate-fade-in"
          >
            <button
              onClick={() => setActiveMoment(null)}
              className="absolute top-6 right-6 p-2.5 rounded-full bg-white/5 border border-white/15 text-[#f0f0f5]/70 hover:text-[#e5c158] hover:border-[#e5c158] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Uncropped Full Image Container */}
            <div className="w-full max-h-[62vh] sm:max-h-[68vh] rounded-2xl overflow-hidden border border-white/10 bg-[#050507] p-2 flex items-center justify-center shadow-2xl">
              <img
                src={activeMoment.image}
                alt={activeMoment.title}
                className="max-w-full max-h-[58vh] sm:max-h-[64vh] object-contain rounded-xl"
              />
            </div>

            <div className="flex flex-col gap-2 max-w-xl">
              <span className="font-general text-xs font-bold uppercase tracking-[0.3em] text-[#e5c158]">
                {activeMoment.title}
              </span>
              <h4 className="font-serif italic text-2xl sm:text-3xl text-[#f0f0f5] leading-snug">
                “{activeMoment.caption}”
              </h4>
              {activeMoment.subtext && (
                <p className="font-general text-xs sm:text-sm text-[#f0f0f5]/70 mt-1 leading-relaxed">
                  {activeMoment.subtext}
                </p>
              )}
            </div>

            <SpecularButton
              size="md"
              radius={20}
              lineColor="#e5c158"
              baseColor="#0c0d12"
              onClick={() => setActiveMoment(null)}
              className="mt-2 px-8"
            >
              <span>Return to Memory Wall ✨</span>
            </SpecularButton>
          </div>
        </div>
      )}

      {/* Floating Drift Keyframes Injection */}
      <style>{`
        @keyframes floatDrift {
          0% { transform: translateY(0px) rotate(-1deg); }
          50% { transform: translateY(-8px) rotate(1deg); }
          100% { transform: translateY(0px) rotate(-1deg); }
        }
        @keyframes pulse-subtle {
          0%, 100% { box-shadow: 0 0 50px rgba(229, 193, 88, 0.35); }
          50% { box-shadow: 0 0 65px rgba(229, 193, 88, 0.5); }
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default CinematicMemoryWall;
