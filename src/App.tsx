import React, { useState } from 'react';
import { useLenis } from './hooks/useLenis';
import { useAudio } from './hooks/useAudio';
import { useIsMobile } from './hooks/useIsMobile';
import { MobileExperience } from './layouts/MobileExperience';
import { CustomCursor } from './components/CustomCursor';
import { FilmGrain } from './components/FilmGrain';
import { ParticleField } from './components/ParticleField';
import { MemoryCurator } from './components/MemoryCurator';
import { PrivateEpilogueModal } from './components/PrivateEpilogueModal';
import { FilmCredits } from './components/FilmCredits';
import { CinematicMemoryWall } from './components/CinematicMemoryWall';
import { DeveloperMotiveSection } from './components/DeveloperMotiveSection';
import Hyperspeed, { hyperspeedPresets } from './components/Hyperspeed';
import { OpeningScene } from './scenes/OpeningScene';
import { SkyScene } from './scenes/SkyScene';
import { TimelineScene } from './scenes/TimelineScene';
import { ReflectionChapter } from './scenes/ReflectionChapter';
import { ViewModeToggle } from './components/ViewModeToggle';
import StardustCursor from './components/StardustCursor';
import AudioController from './components/AudioController';
import ShareTributeModal from './components/ShareTributeModal';
import SpecularButton from './components/SpecularButton';
import { Share2 } from 'lucide-react';

export const App: React.FC = () => {
  // Smooth scroll instance
  useLenis();

  // Audio manager hook
  const { toggleMute } = useAudio();
  const autoMobile = useIsMobile(768);

  const [viewMode, setViewMode] = useState<'auto' | 'mobile' | 'desktop'>('auto');
  const [isSecretModalOpen, setIsSecretModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const isMobile = viewMode === 'auto' ? autoMobile : viewMode === 'mobile';

  const handleScrollToNext = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isMobile) {
    return (
      <main className="relative min-h-screen bg-[#0B0B0F] text-[#f0f0f5] overflow-x-hidden font-general selection:bg-[#e5c158]/30 selection:text-white">
        <FilmGrain />
        <ParticleField count={20} />
        
        {/* Top Left Floating Share Button on Mobile */}
        <div className="fixed top-5 left-5 z-50">
          <SpecularButton
            size="sm"
            radius={18}
            lineColor="#e5c158"
            baseColor="#0c0d12"
            onClick={() => setIsShareModalOpen(true)}
            className="px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#e5c158] shadow-[0_0_20px_rgba(229,193,88,0.3)]"
          >
            <Share2 className="w-3.5 h-3.5 text-[#e5c158]" />
            <span>Share 🌸</span>
          </SpecularButton>
        </div>

        <ViewModeToggle viewMode={viewMode} onChangeViewMode={setViewMode} />
        
        <MobileExperience
          onUserInteractAudio={toggleMute}
          onOpenSecretModal={() => setIsSecretModalOpen(true)}
        />

        <ShareTributeModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
        />

        <PrivateEpilogueModal
          isOpen={isSecretModalOpen}
          onClose={() => setIsSecretModalOpen(false)}
        />
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-[#0B0B0F] text-[#f0f0f5] overflow-x-hidden font-general selection:bg-[#e5c158]/30 selection:text-white flex flex-col justify-between">
      {/* Luxury Magnetic Custom Cursor */}
      <CustomCursor />

      {/* Stardust Sparkle Particle Trail on Desktop */}
      <StardustCursor />

      {/* Floating Audio Controller with Sound Wave Equalizer */}
      <AudioController />

      {/* Floating Share Tribute Button (Top-Left Desktop) */}
      <div className="fixed top-6 left-6 z-50 hidden md:block">
        <SpecularButton
          size="sm"
          radius={20}
          lineColor="#e5c158"
          baseColor="#0c0d12"
          onClick={() => setIsShareModalOpen(true)}
          className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#e5c158] shadow-[0_0_20px_rgba(229,193,88,0.3)]"
        >
          <Share2 className="w-3.5 h-3.5 text-[#e5c158]" />
          <span>Share Tribute 🌸</span>
        </SpecularButton>
      </div>

      {/* Atmospheric Film Grain Overlay */}
      <FilmGrain />

      {/* Floating Dust & Ambient Light Particles */}
      <ParticleField count={45} />

      {/* Memory Curator Narrator Companion */}
      <MemoryCurator />

      {/* Share Tribute Story Modal */}
      <ShareTributeModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />

      {/* Secret Chapter & Private Letter Modal */}
      <PrivateEpilogueModal
        isOpen={isSecretModalOpen}
        onClose={() => setIsSecretModalOpen(false)}
      />

      {/* UNIFIED CONTINUOUS CINEMATIC SCENES FLOW */}
      <div className="relative z-10 w-full flex flex-col flex-grow">
        {/* Scene 1: LANDING PAGE HERO SECTION */}
        <OpeningScene
          onTransitionToSky={() => handleScrollToNext('sky-scene-container')}
          onUserInteractAudio={toggleMute}
        />

        {/* Scene 2: Peaceful Cinematic Sky & World Entrance */}
        <SkyScene onScrollToNext={() => handleScrollToNext('timeline-section')} />

        {/* Scene 3: Emotional Interactive Timeline (2023 - 2026) */}
        <TimelineScene />

        {/* CINEMATIC MEMORY WALL (Personal floating memory collection) */}
        <CinematicMemoryWall />

        {/* A LETTER FROM THE DEVELOPER / CREATOR'S MOTIVE SECTION */}
        <DeveloperMotiveSection />

        {/* HYPERSPEED 3D WARP TUNNEL TRANSITION */}
        <section className="relative w-full h-[380px] sm:h-[600px] md:h-[750px] my-12 sm:my-16 overflow-hidden flex items-center justify-center border-y border-[#e5c158]/30 shadow-2xl select-none">
          <Hyperspeed effectOptions={hyperspeedPresets.one} />

          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0F] via-transparent to-[#0B0B0F] pointer-events-none z-10" />

          {/* DEAD-CENTERED TYPOGRAPHY OVER WARP PORTAL */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-6 pointer-events-none">
            <div className="max-w-xl flex flex-col items-center gap-3">
              <span className="font-general text-xs font-extrabold uppercase tracking-[0.35em] text-[#e5c158]">
                Warping Through Time
              </span>
              <h3 className="font-general text-3xl sm:text-5xl font-extrabold text-[#f0f0f5] leading-tight drop-shadow-[0_0_35px_rgba(229,193,88,0.6)]">
                Entering the Reflection Chapter
              </h3>
            </div>
          </div>
        </section>

        {/* Scene 4: REFLECTION CHAPTER (Memory Tree, Petal Form, Living Counter, Global Map) */}
        <ReflectionChapter />
      </div>

      {/* Film End Credits */}
      <FilmCredits onOpenSecretModal={() => setIsSecretModalOpen(true)} />

      {/* Floating View Mode Switcher Badge (Allows switching Desktop / Mobile view instantly) */}
      <ViewModeToggle viewMode={viewMode} onChangeViewMode={setViewMode} />
    </main>
  );
};

export default App;
