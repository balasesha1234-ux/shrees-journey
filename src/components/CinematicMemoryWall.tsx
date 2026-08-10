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
  year?: '2023' | '2024' | '2025' | '2026';
}

/**
 * CENTRALIZED EDITABLE MEMORY MOMENTS CONFIGURATION
 * Real memory moments using authentic timeline photographs.
 */
export const MEMORY_MOMENTS: MemoryMoment[] = [
  {
    id: 'moment-hero',
    image: ASSET_PATHS.timeline.y2026.heroImage,
    title: 'The 5 Million Family',
    caption: 'A landmark milestone built on gratitude.',
    subtext: 'Standing together celebrating 5 million hearts connected along the path.',
    isHero: true,
    year: '2026',
  },
  {
    id: 'moment-01',
    image: ASSET_PATHS.timeline.y2023.heroImage,
    title: 'Quiet Beginnings',
    caption: 'Where the journey first took root.',
    subtext: 'The small, unseen steps of dedication and passion.',
    year: '2023',
  },
  {
    id: 'moment-02',
    image: ASSET_PATHS.timeline.y2023.gallery1,
    title: 'First Spark',
    caption: 'Creating content with pure intention.',
    subtext: 'Nurturing early dreams that would soon inspire millions.',
    year: '2023',
  },
  {
    id: 'moment-03',
    image: ASSET_PATHS.timeline.y2023.gallery2,
    title: 'Unwavering Faith',
    caption: 'Believing in the vision before the world saw it.',
    subtext: 'Quiet daily consistency laying the groundwork for legendary chapters.',
    year: '2023',
  },
  {
    id: 'moment-04',
    image: ASSET_PATHS.timeline.y2024.heroImage,
    title: 'Building Momentum',
    caption: 'Persistence in every single detail.',
    subtext: 'Showing up day after day until the vision began breaking through.',
    year: '2024',
  },
  {
    id: 'moment-05',
    image: ASSET_PATHS.timeline.y2024.gallery1,
    title: '1 Million Breakthrough',
    caption: 'A massive wave of shared joy.',
    subtext: 'Uniting hundreds of thousands across boundaries with authentic love.',
    year: '2024',
  },
  {
    id: 'moment-06',
    image: ASSET_PATHS.timeline.y2024.gallery2,
    title: 'Community Spark',
    caption: 'Connecting deeply with a vibrant audience.',
    subtext: 'Turning everyday effort into unforgettable shared milestones.',
    year: '2024',
  },
  {
    id: 'moment-07',
    image: ASSET_PATHS.timeline.y2025.heroImage,
    title: 'Reaching New Horizons',
    caption: 'Connecting hearts around the world.',
    subtext: 'A growing community united by authenticity and shared purpose.',
    year: '2025',
  },
  {
    id: 'moment-08',
    image: ASSET_PATHS.timeline.y2025.gallery1,
    title: 'Deep Connections',
    caption: 'Creating deeper impact across borders.',
    subtext: 'Weaving timeless memories with supporters worldwide.',
    year: '2025',
  },
  {
    id: 'moment-09',
    image: ASSET_PATHS.timeline.y2025.gallery2,
    title: 'Creative Purpose',
    caption: 'Crafting memories with care and devotion.',
    subtext: 'Solidifying a foundation of purpose, creativity, and mutual trust.',
    year: '2025',
  },
  {
    id: 'moment-10',
    image: ASSET_PATHS.timeline.y2025.landscape,
    title: 'Cherished Reflections',
    caption: 'Unforgettable memories along the way.',
    subtext: 'Memories shared with family, team, and lifelong supporters.',
    year: '2025',
  },
  {
    id: 'moment-11',
    image: ASSET_PATHS.timeline.y2026.gallery1,
    title: 'Eternal Celebration',
    caption: 'Moments of genuine happiness and unity.',
    subtext: 'Grateful for every single soul who believes in this journey.',
    year: '2026',
  },
  {
    id: 'moment-12',
    image: ASSET_PATHS.timeline.y2026.landscape,
    title: 'Looking to the Future',
    caption: 'The story continues forward into eternity.',
    subtext: 'Every milestone is simply the threshold of a greater chapter.',
    year: '2026',
  },
];

export const CinematicMemoryWall: React.FC = () => {
  const [activeMoment, setActiveMoment] = useState<MemoryMoment | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedMobileId, setSelectedMobileId] = useState<string | null>(null);
  const [selectedEra, setSelectedEra] = useState<string>('all');

  const heroMoment = MEMORY_MOMENTS.find((m) => m.isHero) || MEMORY_MOMENTS[0];
  const surroundingMoments = MEMORY_MOMENTS.filter((m) => m.id !== heroMoment.id);

  // Hand-curated organic balanced layout offsets for surrounding photo cards
  const organicPositions = [
    { top: '2%', left: '4%', rotate: '-5deg', animClass: 'animate-float-a' },     // Top-Left
    { top: '4%', left: '26%', rotate: '3deg', animClass: 'animate-float-c' },    // Top-Center-Left
    { top: '4%', right: '26%', rotate: '-3deg', animClass: 'animate-float-b' },  // Top-Center-Right
    { top: '2%', right: '4%', rotate: '5deg', animClass: 'animate-float-d' },    // Top-Right
    { top: '38%', left: '1.5%', rotate: '2deg', animClass: 'animate-float-b' },   // Mid-Far-Left
    { top: '42%', left: '20%', rotate: '-4deg', animClass: 'animate-float-c' },  // Mid-Inner-Left
    { top: '42%', right: '20%', rotate: '4deg', animClass: 'animate-float-a' },  // Mid-Inner-Right
    { top: '38%', right: '1.5%', rotate: '-2deg', animClass: 'animate-float-d' }, // Mid-Far-Right
    { top: '74%', left: '4%', rotate: '-4deg', animClass: 'animate-float-d' },   // Bottom-Left
    { top: '76%', left: '26%', rotate: '3deg', animClass: 'animate-float-a' },   // Bottom-Mid-Left
    { top: '76%', right: '26%', rotate: '-3deg', animClass: 'animate-float-c' }, // Bottom-Mid-Right
    { top: '74%', right: '4%', rotate: '4deg', animClass: 'animate-float-b' },   // Bottom-Right
  ];

  // Touch tap handler for mobile & tablet compatibility
  const handleCardTap = (moment: MemoryMoment) => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      if (selectedMobileId === moment.id) {
        setActiveMoment(moment);
      } else {
        setSelectedMobileId(moment.id);
      }
    } else {
      setActiveMoment(moment);
    }
  };

  return (
    <section
      id="cinematic-memory-wall"
      className="relative w-full py-20 sm:py-28 md:py-40 px-4 sm:px-6 bg-[#0B0B0F] text-[#f0f0f5] font-general select-none flex flex-col items-center justify-center overflow-hidden border-t border-[#e5c158]/20 max-w-full"
    >
      {/* Soft Ambient Radial Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(229,193,88,0.12),transparent_70%)] pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 max-w-3xl text-center flex flex-col items-center gap-3 mb-8 sm:mb-12 lg:mb-16">
        <div className="flex items-center gap-2 text-[#e5c158] bg-[#0c0d12]/90 px-4 py-1.5 rounded-full border border-[#e5c158]/30 backdrop-blur-md shadow-lg">
          <Sparkles className="w-4 h-4 text-[#e5c158]" />
          <span className="font-general text-[11px] sm:text-xs font-bold uppercase tracking-[0.35em]">
            Cinematic Memory Wall
          </span>
        </div>

        <h2 className="font-general text-3xl sm:text-5xl lg:text-6xl font-black text-[#f0f0f5] tracking-tight">
          A Wall of Memories
        </h2>

        <p className="font-general italic text-sm sm:text-lg lg:text-xl text-[#e5c158]/90 max-w-lg leading-relaxed px-2">
          “Moments that shaped the story, floating softly through time.”
        </p>

        {/* ERA FILTER PILL BAR */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4 z-20">
          {['all', '2023', '2024', '2025', '2026'].map((era) => (
            <button
              key={era}
              onClick={() => setSelectedEra(era)}
              className={`px-4 py-1.5 rounded-full font-general text-[11px] font-bold uppercase tracking-wider transition-all duration-300 ${
                selectedEra === era
                  ? 'bg-[#e5c158] text-[#0c0d12] shadow-[0_0_20px_rgba(229,193,88,0.5)] scale-105'
                  : 'bg-[#0c0d12]/90 border border-white/10 text-[#f0f0f5]/70 hover:text-[#e5c158] hover:border-[#e5c158]/50'
              }`}
            >
              {era === 'all' ? 'All Eras' : `${era} Era`}
            </button>
          ))}
        </div>
      </header>

      {/* ORGANIC FLOATING MEMORY WALL CONTAINER (DESKTOP / LARGE TABLET) */}
      <div className="relative z-10 max-w-7xl w-full hidden md:flex flex-col items-center justify-center min-h-[820px] my-4">
        
        {/* CENTER HERO PHOTOGRAPH */}
        <div
          onClick={() => setActiveMoment(heroMoment)}
          onMouseEnter={() => setHoveredId(heroMoment.id)}
          onMouseLeave={() => setHoveredId(null)}
          data-cursor-hover
          className={`relative z-20 cursor-pointer pointer-events-auto transition-all duration-500 ${
            selectedEra !== 'all' && heroMoment.year !== selectedEra ? 'opacity-40 filter brightness-75 scale-95' : 'opacity-100'
          }`}
        >
          {/* LAYER 2: PURE FLOAT KEYFRAME ANIMATION */}
          <div className={hoveredId === heroMoment.id ? '' : 'animate-float-hero'}>
            {/* LAYER 3: CARD & HOVER TRANSFORM */}
            <div
              className={`w-72 h-96 rounded-3xl p-2.5 bg-[#0c0d12] border-2 shadow-[0_0_50px_rgba(229,193,88,0.35)] transition-all duration-400 ease-out group ${
                selectedEra === heroMoment.year ? 'border-[#e5c158] shadow-[0_0_70px_rgba(229,193,88,0.7)]' : 'border-[#e5c158]/50'
              }`}
              style={{
                transform: hoveredId === heroMoment.id ? 'scale(1.08)' : 'scale(1)',
                filter: hoveredId === heroMoment.id ? 'brightness(112%) contrast(104%)' : 'brightness(100%)',
              }}
            >
              {/* Hero Tag */}
              <div className="absolute top-4 left-4 z-30 px-3 py-1 rounded-full bg-[#0c0d12]/90 border border-[#e5c158]/60 text-[#e5c158] font-general text-[10px] font-bold uppercase tracking-widest backdrop-blur-md pointer-events-none">
                ⭐ Main Memory
              </div>

              {/* Uncropped Hero Photo Container */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#050507] flex items-center justify-center">
                <img
                  src={heroMoment.image}
                  alt={heroMoment.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain filter contrast-105 group-hover:scale-[1.03] transition-transform duration-400 ease-out"
                />
                {/* Smooth Fading Ambient Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d12]/90 via-[#0c0d12]/20 to-transparent opacity-50 group-hover:opacity-85 transition-opacity duration-400 ease-out pointer-events-none" />
              </div>

              {/* Smooth Revealing Hover Badge & Title */}
              <div className="absolute bottom-3.5 left-3.5 right-3.5 z-30 flex items-center justify-between font-general text-[11px] font-bold uppercase tracking-wider text-[#e5c158] pointer-events-none">
                <span className="truncate drop-shadow transition-transform duration-400 ease-out group-hover:-translate-y-0.5">
                  {heroMoment.title}
                </span>
                <div className="transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 ease-out bg-black/85 backdrop-blur-md px-3 py-1 rounded-full border border-[#e5c158]/50 shadow-md flex items-center gap-1 shrink-0">
                  <ZoomIn className="w-3.5 h-3.5 text-[#e5c158]" />
                  <span>View</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SURROUNDING ORGANIC FLOATING PHOTOGRAPHS */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          {surroundingMoments.map((moment, index) => {
            const pos = organicPositions[index % organicPositions.length];
            const isHovered = hoveredId === moment.id;
            const isSelectedEra = selectedEra === moment.year;
            const isFilteredOut = selectedEra !== 'all' && !isSelectedEra;

            return (
              /* LAYER 1: ABSOLUTE GRID PLACEMENT */
              <div
                key={moment.id}
                onClick={() => setActiveMoment(moment)}
                onMouseEnter={() => setHoveredId(moment.id)}
                onMouseLeave={() => setHoveredId(null)}
                data-cursor-hover
                className={`absolute cursor-pointer pointer-events-auto transition-all duration-500 ${
                  isFilteredOut ? 'opacity-30 filter brightness-65 scale-95' : 'opacity-100'
                }`}
                style={{
                  top: pos.top,
                  left: pos.left,
                  right: pos.right,
                  zIndex: isHovered ? 40 : 10 + index,
                }}
              >
                {/* LAYER 2: PURE FLOAT KEYFRAME ANIMATION */}
                <div className={`w-48 lg:w-52 h-64 lg:h-72 ${!isHovered ? pos.animClass : ''}`}>
                  {/* LAYER 3: INNER CARD WITH ORGANIC TILT & HOVER SCALE */}
                  <div
                    className={`w-full h-full rounded-3xl p-2 bg-[#0c0d12] border shadow-xl transition-all duration-400 ease-out group ${
                      isSelectedEra
                        ? 'border-[#e5c158] shadow-[0_0_35px_rgba(229,193,88,0.55)] scale-[1.04]'
                        : 'border-[#e5c158]/30'
                    }`}
                    style={{
                      transform: isHovered ? 'scale(1.08) rotate(0deg)' : `rotate(${pos.rotate})`,
                      boxShadow: isHovered
                        ? '0 0 45px rgba(229,193,88,0.55)'
                        : isSelectedEra
                        ? '0 0 35px rgba(229,193,88,0.55)'
                        : '0 10px 30px rgba(0,0,0,0.8)',
                      filter: isHovered ? 'brightness(112%) contrast(104%)' : 'brightness(92%)',
                    }}
                  >
                    {/* Uncropped Photo Container */}
                    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#050507] flex items-center justify-center">
                      <img
                        src={moment.image}
                        alt={moment.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-contain filter contrast-105 group-hover:scale-[1.03] transition-transform duration-400 ease-out"
                      />
                      {/* Smooth Fading Ambient Dark Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d12]/90 via-[#0c0d12]/20 to-transparent opacity-50 group-hover:opacity-85 transition-opacity duration-400 ease-out pointer-events-none" />
                    </div>

                    {/* Smooth Revealing Hover Badge & Title */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 z-30 flex items-center justify-between font-general text-[10px] font-bold uppercase tracking-wider text-[#e5c158] pointer-events-none">
                      <span className="truncate drop-shadow transition-transform duration-400 ease-out group-hover:-translate-y-0.5">
                        {moment.title}
                      </span>
                      <div className="transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 ease-out bg-black/85 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#e5c158]/50 shadow-md flex items-center gap-1 shrink-0">
                        <ZoomIn className="w-3 h-3 text-[#e5c158]" />
                        <span className="text-[9px]">View</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* INTENTIONAL RESPONSIVE COMPOSITION (MOBILE FLOATING HORIZONTAL SNAP CAROUSEL) */}
      <div className="relative z-10 w-full md:hidden flex flex-col gap-6 my-4 px-2">
        
        <div className="flex items-center justify-between px-2 text-xs font-bold text-[#e5c158] uppercase tracking-widest">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#e5c158] animate-pulse" />
            <span>Swipe Memories ✦</span>
          </span>
          <span className="text-[10px] text-[#f0f0f5]/50">Tap card to expand</span>
        </div>

        {/* HORIZONTAL SNAP CAROUSEL WITH FLOATING ANIMATIONS */}
        <div className="w-full flex gap-4 overflow-x-auto snap-x snap-mandatory py-4 px-2 custom-scrollbar">
          
          {/* MOBILE HERO CARD */}
          <div
            onClick={() => handleCardTap(heroMoment)}
            className={`snap-center shrink-0 w-[280px] h-[360px] animate-float-hero relative rounded-3xl p-2.5 bg-[#0c0d12] border-2 border-[#e5c158]/60 shadow-[0_0_40px_rgba(229,193,88,0.35)] transition-all duration-300 active:scale-[0.98] ${
              selectedMobileId === heroMoment.id ? 'border-[#e5c158] shadow-[0_0_55px_rgba(229,193,88,0.6)]' : ''
            }`}
          >
            <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-[#0c0d12]/90 border border-[#e5c158]/60 text-[#e5c158] font-general text-[10px] font-bold uppercase tracking-widest backdrop-blur-md">
              ⭐ Main Memory
            </div>
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#050507] flex items-center justify-center">
              <img
                src={heroMoment.image}
                alt={heroMoment.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d12]/90 via-transparent to-transparent opacity-80" />
            </div>
            <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between font-general text-xs font-bold uppercase tracking-wider text-[#e5c158]">
              <span className="truncate max-w-[160px]">{heroMoment.title}</span>
              <div className="flex items-center gap-1 bg-[#0c0d12]/90 px-3 py-1 rounded-full border border-[#e5c158]/50 text-[10px]">
                <ZoomIn className="w-3.5 h-3.5" />
                <span>{selectedMobileId === heroMoment.id ? 'View' : 'Tap'}</span>
              </div>
            </div>
          </div>

          {/* SURROUNDING MEMORIES CARDS */}
          {surroundingMoments.map((moment, idx) => {
            const isSelected = selectedMobileId === moment.id;
            const animClass = idx % 2 === 0 ? 'animate-float-a' : 'animate-float-b';
            const isFilteredOut = selectedEra !== 'all' && moment.year !== selectedEra;

            return (
              <div
                key={moment.id}
                onClick={() => handleCardTap(moment)}
                className={`snap-center shrink-0 w-[240px] h-[340px] ${animClass} relative rounded-3xl p-2 bg-[#0c0d12] border border-[#e5c158]/40 shadow-xl cursor-pointer transition-all duration-300 active:scale-[0.98] flex flex-col justify-between ${
                  isFilteredOut ? 'opacity-40 grayscale' : 'opacity-100'
                } ${isSelected ? 'scale-[1.02] border-[#e5c158] shadow-[0_0_35px_rgba(229,193,88,0.5)]' : ''}`}
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#050507] flex items-center justify-center">
                  <img
                    src={moment.image}
                    alt={moment.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d12]/90 via-transparent to-transparent opacity-75" />
                </div>
                <div className="p-2.5 flex items-center justify-between text-[11px] font-bold text-[#e5c158] uppercase tracking-wider">
                  <span className="truncate max-w-[140px]">{moment.title}</span>
                  <span className="text-[9px] opacity-80 shrink-0 ml-1">
                    {isSelected ? 'View' : 'Tap'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* LIGHTBOX EXPANDED PRESENTATION MODAL */}
      {activeMoment && (
        <div
          onClick={() => setActiveMoment(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/92 backdrop-blur-2xl animate-fade-in cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full p-5 sm:p-8 md:p-10 rounded-3xl bg-[#0c0d12] border border-[#e5c158]/40 flex flex-col items-center gap-5 sm:gap-6 shadow-[0_0_90px_rgba(229,193,88,0.25)] text-center cursor-default animate-fade-in max-h-[92vh] overflow-y-auto custom-scrollbar"
          >
            <button
              onClick={() => setActiveMoment(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 sm:p-2.5 rounded-full bg-white/5 border border-white/15 text-[#f0f0f5]/70 hover:text-[#e5c158] hover:border-[#e5c158] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Uncropped Full Image Container */}
            <div className="w-full max-h-[52vh] sm:max-h-[62vh] md:max-h-[68vh] rounded-2xl overflow-hidden border border-white/10 bg-[#050507] p-2 flex items-center justify-center shadow-2xl">
              <img
                src={activeMoment.image}
                alt={activeMoment.title}
                className="max-w-full max-h-[48vh] sm:max-h-[58vh] md:max-h-[64vh] object-contain rounded-xl"
              />
            </div>

            <div className="flex flex-col gap-1.5 sm:gap-2 max-w-xl px-2">
              <span className="font-general text-[11px] sm:text-xs font-bold uppercase tracking-[0.3em] text-[#e5c158]">
                {activeMoment.year ? `${activeMoment.year} Era • ` : ''}{activeMoment.title}
              </span>
              <h4 className="font-serif italic text-xl sm:text-2xl md:text-3xl text-[#f0f0f5] leading-snug">
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
              className="mt-1 sm:mt-2 px-6 sm:px-8"
            >
              <span>Return to Memory Wall ✨</span>
            </SpecularButton>
          </div>
        </div>
      )}
    </section>
  );
};

export default CinematicMemoryWall;
