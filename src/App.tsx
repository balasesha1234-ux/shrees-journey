import React, { useState } from 'react';
import { useLenis } from './hooks/useLenis';
import { useAudio } from './hooks/useAudio';
import { CustomCursor } from './components/CustomCursor';
import { FilmGrain } from './components/FilmGrain';
import { ParticleField } from './components/ParticleField';
import { AudioToggle } from './components/AudioToggle';
import { TimeCompass } from './components/TimeCompass';
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

export const App: React.FC = () => {
  // Smooth scroll instance
  useLenis();

  // Audio manager hook
  const { isPlaying, isMuted, toggleMute } = useAudio();

  const [isSecretModalOpen, setIsSecretModalOpen] = useState(false);

  const handleScrollToNext = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="relative min-h-screen bg-[#0B0B0F] text-[#f0f0f5] overflow-x-hidden font-general selection:bg-[#e5c158]/30 selection:text-white flex flex-col justify-between">
      {/* Luxury Magnetic Custom Cursor */}
      <CustomCursor />

      {/* Atmospheric Film Grain Overlay */}
      <FilmGrain />

      {/* Floating Dust & Ambient Light Particles */}
      <ParticleField count={45} />

      {/* Floating Ambient Audio Control */}
      <AudioToggle
        isMuted={isMuted}
        isPlaying={isPlaying}
        onToggle={toggleMute}
      />

      {/* Memory Curator Narrator Companion */}
      <MemoryCurator />

      {/* Signature Time Compass Instrument */}
      <TimeCompass />

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
    </main>
  );
};

export default App;
