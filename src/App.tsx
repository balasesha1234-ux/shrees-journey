import React, { useState, useEffect } from 'react';
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
import { EndingScene } from './scenes/EndingScene';
import { ViewModeToggle } from './components/ViewModeToggle';
import StardustCursor from './components/StardustCursor';
import AudioController from './components/AudioController';
import ShareTributeModal from './components/ShareTributeModal';
import ShreeCreatorPortalModal from './components/ShreeCreatorPortalModal';
import SpecularButton from './components/SpecularButton';
import { Share2, Crown } from 'lucide-react';
import { useSupabasePetals } from './hooks/useSupabasePetals';
import SplashScreen from './components/SplashScreen';

export const App: React.FC = () => {
  // Smooth scroll instance
  useLenis();

  // Audio manager hook
  const { toggleMute } = useAudio();
  const autoMobile = useIsMobile(768);
  const { petals } = useSupabasePetals();

  const [viewMode, setViewMode] = useState<'auto' | 'mobile' | 'desktop'>('auto');
  const [showSplash, setShowSplash] = useState(true);
  const [isSecretModalOpen, setIsSecretModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isVipPortalOpen, setIsVipPortalOpen] = useState(false);

  // Volume cross-fade: swells from 25% → 55% when 2026 chapter enters viewport
  useEffect(() => {
    const el = document.getElementById('year-section-2026');
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        const audio = document.querySelector('audio') as HTMLAudioElement | null;
        if (!audio) return;
        if (entry.isIntersecting) {
          // Smoothly swell to 55% over 3s
          const start = audio.volume;
          const end = 0.55;
          const steps = 60;
          let i = 0;
          const interval = setInterval(() => {
            i++;
            audio.volume = Math.min(start + (end - start) * (i / steps), 1);
            if (i >= steps) clearInterval(interval);
          }, 3000 / steps);
        } else {
          // Fade back down to 30%
          const start = audio.volume;
          const end = 0.3;
          const steps = 60;
          let i = 0;
          const interval = setInterval(() => {
            i++;
            audio.volume = Math.max(start + (end - start) * (i / steps), 0);
            if (i >= steps) clearInterval(interval);
          }, 2000 / steps);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [showSplash]);

  const isMobile = viewMode === 'auto' ? autoMobile : viewMode === 'mobile';

  const handleScrollToNext = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReplayJourney = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isMobile) {
    return (
      <main className="relative min-h-screen bg-[#0B0B0F] text-[#f0f0f5] overflow-x-hidden font-general selection:bg-[#e5c158]/30 selection:text-white">
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
        <FilmGrain />
        <ParticleField count={20} />

        {/* Top Floating Control Bar on Mobile */}
        <div className="fixed top-4 left-3 right-3 z-[70] flex items-center justify-between pointer-events-none">
          <div className="pointer-events-auto flex items-center gap-2">
            <SpecularButton
              size="sm"
              radius={18}
              lineColor="#e5c158"
              baseColor="#0c0d12"
              onClick={() => setIsShareModalOpen(true)}
              className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#e5c158] hover:shadow-[0_0_20px_rgba(229,193,88,0.35)]"
            >
              <Share2 className="w-3 h-3 text-[#e5c158]" />
              <span>Share 🌸</span>
            </SpecularButton>

            <SpecularButton
              size="sm"
              radius={18}
              lineColor="#e5c158"
              baseColor="#0c0d12"
              onClick={() => setIsVipPortalOpen(true)}
              className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#e5c158] hover:shadow-[0_0_20px_rgba(229,193,88,0.35)]"
            >
              <Crown className="w-3 h-3 text-[#e5c158]" />
              <span>VIP 👑</span>
            </SpecularButton>
          </div>

          <div className="pointer-events-auto flex items-center gap-2">
            <AudioController />
          </div>
        </div>

        <ViewModeToggle viewMode={viewMode} onChangeViewMode={setViewMode} />

        <MobileExperience
          onUserInteractAudio={toggleMute}
          onOpenSecretModal={() => setIsSecretModalOpen(true)}
          onOpenShareModal={() => setIsShareModalOpen(true)}
          onOpenVipModal={() => setIsVipPortalOpen(true)}
        />

        <ShareTributeModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
        />

        <ShreeCreatorPortalModal
          isOpen={isVipPortalOpen}
          onClose={() => setIsVipPortalOpen(false)}
          petals={petals}
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
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      {/* Luxury Magnetic Custom Cursor */}
      <CustomCursor />

      {/* Stardust Sparkle Particle Trail on Desktop */}
      <StardustCursor />

      {/* Centered Max-Width Wrapper for Top Fixed Controls on Ultra-Wide Desktop Monitors */}
      <div className="fixed top-6 inset-x-0 max-w-[1800px] mx-auto px-6 z-50 pointer-events-none hidden md:flex items-center justify-between">
        <div className="pointer-events-auto">
          <SpecularButton
            size="sm"
            radius={20}
            lineColor="#e5c158"
            baseColor="#0c0d12"
            onClick={() => setIsShareModalOpen(true)}
            className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#e5c158] hover:shadow-[0_0_20px_rgba(229,193,88,0.35)]"
          >
            <Share2 className="w-3.5 h-3.5 text-[#e5c158]" />
            <span>Share Tribute 🌸</span>
          </SpecularButton>
        </div>

        <div className="pointer-events-auto flex items-center gap-3">
          <SpecularButton
            size="sm"
            radius={20}
            lineColor="#e5c158"
            baseColor="#0c0d12"
            onClick={() => setIsVipPortalOpen(true)}
            className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#e5c158] hover:shadow-[0_0_20px_rgba(229,193,88,0.35)]"
          >
            <Crown className="w-3.5 h-3.5 text-[#e5c158]" />
            <span>VIP Sanctuary 👑</span>
          </SpecularButton>

          <AudioController />
        </div>
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

      {/* Shree's VIP Creator Sanctuary Portal */}
      <ShreeCreatorPortalModal
        isOpen={isVipPortalOpen}
        onClose={() => setIsVipPortalOpen(false)}
        petals={petals}
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

        {/* Scene 5: GRAND CINEMATIC CLIMAX & REPLAY JOURNEY */}
        <EndingScene onReplayJourney={handleReplayJourney} />
      </div>

      {/* Film End Credits with Private Epilogue Lock */}
      <FilmCredits onOpenSecretModal={() => setIsSecretModalOpen(true)} />

      {/* Floating View Mode Switcher Badge (Allows switching Desktop / Mobile view instantly) */}
      <ViewModeToggle viewMode={viewMode} onChangeViewMode={setViewMode} />
    </main>
  );
};

export default App;
