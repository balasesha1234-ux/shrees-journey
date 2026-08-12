import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ASSET_PATHS } from '../utils/assetPaths';
import { GridMotion } from '../components/GridMotion';
import SpecularButton from '../components/SpecularButton';
import ElasticSlider from '../components/ElasticSlider';
import BlurText from '../components/BlurText';
import WarpText from '../components/WarpText';
import { Sparkles } from 'lucide-react';

interface OpeningSceneProps {
  onTransitionToSky: () => void;
  onUserInteractAudio?: () => void;
}

export const OpeningScene: React.FC<OpeningSceneProps> = ({
  onTransitionToSky,
  onUserInteractAudio,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

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

  // GridMotion Pure High-Resolution Serial Photo Collection Array
  const gridItems = [...ASSET_PATHS.serial, ...ASSET_PATHS.serial.slice(0, 3)];

  return (
    <section
      ref={containerRef}
      id="opening-scene-container"
      className="relative w-full h-screen min-h-[100dvh] bg-[#0B0B0F] text-[#f0f0f5] font-general select-none overflow-hidden flex flex-col items-center justify-center text-center"
    >
      {/* INTERACTIVE GRID MOTION BACKGROUND ANIMATION - 100% EDGE-TO-EDGE FULL-SCREEN COVERAGE */}
      <div className="absolute inset-0 w-full h-full z-0 opacity-85 brightness-110 scale-110 pointer-events-none overflow-hidden">
        <GridMotion items={gridItems} gradientColor="transparent" />
      </div>

      {/* Subtle Dark Radial Blur Overlay for Readable Hero Text */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(11,11,15,0.4)_0%,rgba(11,11,15,0.85)_100%)] pointer-events-none z-0" />

      {/* Title Text Mask & Opening Sequence Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 max-w-4xl p-8">
        <div className="flex items-center gap-2 text-[#e5c158] bg-[#0c0d12]/80 px-4 py-1.5 rounded-full border border-[#e5c158]/30 backdrop-blur-md">
          <Sparkles className="w-4 h-4 animate-spin-slow" />
          <span className="font-general text-xs font-bold uppercase tracking-[0.3em]">
            A Tribute Experience
          </span>
        </div>

        <WarpText
          text="SHREE'S JOURNEY"
          color="#e5c158"
          warpStrength={0.09}
          warpScale={1.7}
          speed={0.5}
          pointerInfluence={0.45}
          pointerStrength={0.42}
          refraction={0.022}
          ripple
          fontSize="clamp(2.6rem, 9vw, 7.5rem)"
          fontWeight={900}
          fontFamily="inherit"
          letterSpacing="-0.06em"
          lineHeight={0.92}
          style={{ height: 'clamp(110px, 18vw, 200px)', width: '100%', maxWidth: '900px' }}
        />

        <BlurText
          text="“Some journeys are not measured by time... but by the hearts they touch.”"
          delay={90}
          animateBy="words"
          direction="bottom"
          className="font-general italic text-base sm:text-2xl text-[#f0f0f5]/90 max-w-2xl leading-relaxed mt-2 drop-shadow-lg justify-center text-center"
        />

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

export default OpeningScene;
