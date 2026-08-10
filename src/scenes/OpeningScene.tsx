import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ASSET_PATHS } from '../utils/assetPaths';
import { GridMotion } from '../components/GridMotion';
import SpecularButton from '../components/SpecularButton';
import ElasticSlider from '../components/ElasticSlider';
import { Sparkles, Heart } from 'lucide-react';

interface OpeningSceneProps {
  onTransitionToSky: () => void;
  onUserInteractAudio?: () => void;
}

export const OpeningScene: React.FC<OpeningSceneProps> = ({
  onTransitionToSky,
  onUserInteractAudio,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.8, ease: 'power2.out' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // GridMotion 28-Item Comprehensive Asset Grid
  const gridItems = [
    ASSET_PATHS.timeline.y2023.heroImage,
    <div key="badge-1" className="flex flex-col items-center gap-1 text-[#e5c158] p-2 select-none">
      <Sparkles className="w-5 h-5 animate-pulse" />
      <span className="text-[10px] font-bold uppercase tracking-widest">Inception</span>
    </div>,
    ASSET_PATHS.timeline.y2023.gallery1,
    ASSET_PATHS.timeline.y2023.gallery2,
    ASSET_PATHS.timeline.y2023.landscape,
    ASSET_PATHS.backgrounds.y2023,

    ASSET_PATHS.timeline.y2024.heroImage,
    <div key="badge-2" className="flex flex-col items-center gap-1 text-[#72a5cf] p-2 select-none">
      <Sparkles className="w-5 h-5" />
      <span className="text-[10px] font-bold uppercase tracking-widest">Breakthrough</span>
    </div>,
    ASSET_PATHS.timeline.y2024.gallery1,
    ASSET_PATHS.timeline.y2024.gallery2,
    ASSET_PATHS.timeline.y2024.landscape,
    ASSET_PATHS.backgrounds.y2024,

    <div key="badge-3" className="flex flex-col items-center gap-1 text-[#e5c158] p-2 select-none">
      <span className="text-base font-black">1 Million</span>
      <span className="text-[9px] font-bold uppercase tracking-wider">Family</span>
    </div>,
    ASSET_PATHS.timeline.y2025.heroImage,
    ASSET_PATHS.timeline.y2025.gallery1,
    ASSET_PATHS.timeline.y2025.gallery2,
    ASSET_PATHS.timeline.y2025.landscape,
    ASSET_PATHS.backgrounds.y2025,

    <div key="badge-4" className="flex flex-col items-center gap-1 text-[#c29be4] p-2 select-none">
      <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
      <span className="text-[10px] font-bold uppercase tracking-widest">Gratitude</span>
    </div>,
    ASSET_PATHS.timeline.y2026.heroImage,
    ASSET_PATHS.timeline.y2026.gallery1,
    ASSET_PATHS.timeline.y2026.gallery2,
    ASSET_PATHS.timeline.y2026.landscape,
    ASSET_PATHS.backgrounds.y2026,

    <div key="badge-5" className="flex flex-col items-center gap-1 text-[#e5c158] p-2 select-none">
      <span className="text-base font-black">5 Million</span>
      <span className="text-[9px] font-bold uppercase tracking-wider">Summit</span>
    </div>,
    ASSET_PATHS.backgrounds.intro,
    ASSET_PATHS.ending.treeImage,
    ASSET_PATHS.timeline.y2023.heroImage,
  ];

  return (
    <section
      ref={containerRef}
      id="opening-scene-container"
      className="relative w-full h-screen bg-[#0B0B0F] text-[#f0f0f5] font-general select-none overflow-hidden flex flex-col items-center justify-center text-center"
    >
      {/* AMBIENT LOOPING BACKGROUND VIDEO LAYER ON LANDING PAGE */}
      {!videoError && (
        <video
          autoPlay
          loop
          muted
          playsInline
          onError={() => setVideoError(true)}
          className="absolute inset-0 w-full h-full object-cover opacity-20 filter blur-sm scale-105 z-0"
        >
          <source src={ASSET_PATHS.intro.montageVideo} type="video/mp4" />
        </video>
      )}

      {/* GRID MOTION BACKGROUND ANIMATION ON LANDING PAGE */}
      <div className="absolute inset-0 z-0 opacity-50 filter blur-[0.5px]">
        <GridMotion items={gridItems} gradientColor="#0B0B0F" />
      </div>

      {/* Dark Vignette Overlay Mask */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0F]/90 via-[#0B0B0F]/50 to-[#0B0B0F] pointer-events-none z-0" />

      {/* Title Text Mask & Opening Sequence Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 max-w-4xl p-8">
        <div className="flex items-center gap-2 text-[#e5c158] bg-[#0c0d12]/80 px-4 py-1.5 rounded-full border border-[#e5c158]/30 backdrop-blur-md">
          <Sparkles className="w-4 h-4 animate-spin-slow" />
          <span className="font-general text-xs font-bold uppercase tracking-[0.3em]">
            A Tribute Experience
          </span>
        </div>

        <h1 className="font-general text-5xl sm:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#e5c158] via-white to-[#e5c158] tracking-tight leading-none drop-shadow-[0_0_60px_rgba(229,193,88,0.5)]">
          SHREE'S JOURNEY
        </h1>

        <p className="font-general italic text-base sm:text-2xl text-[#f0f0f5]/90 max-w-2xl leading-relaxed mt-2 drop-shadow-lg">
          “Some journeys are not measured by time... but by the hearts they touch.”
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-6 mt-4">
          <SpecularButton
            size="lg"
            radius={18}
            lineColor="#e5c158"
            baseColor="#0c0d12"
            followMouse
            onClick={() => {
              if (onUserInteractAudio) onUserInteractAudio();
              onTransitionToSky();
            }}
          >
            <Sparkles className="w-4 h-4" />
            <span>Begin Experience</span>
          </SpecularButton>

          {/* ELASTIC SLIDER SOUND CONTROL */}
          <ElasticSlider
            defaultValue={75}
            onVolumeChange={() => {
              if (onUserInteractAudio) onUserInteractAudio();
            }}
          />
        </div>
      </div>
    </section>
  );
};
