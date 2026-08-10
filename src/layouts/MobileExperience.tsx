import React, { useState } from 'react';
import { Sparkles, Calendar, Heart, Compass, Image, Home } from 'lucide-react';
import SpecularButton from '../components/SpecularButton';
import CommunityPetalSection from '../components/CommunityPetalSection';
import LivingGardenCounter from '../components/LivingGardenCounter';
import { ASSET_PATHS } from '../utils/assetPaths';
import { useSupabasePetals } from '../hooks/useSupabasePetals';

interface MobileExperienceProps {
  onUserInteractAudio?: () => void;
  onOpenSecretModal?: () => void;
}

export const MobileExperience: React.FC<MobileExperienceProps> = ({
  onUserInteractAudio,
  onOpenSecretModal,
}) => {
  const [activeTab, setActiveTab] = useState<'home' | 'timeline' | 'wall' | 'garden'>('home');
  const [selectedEra, setSelectedEra] = useState<string>('all');
  const [activeMoment, setActiveMoment] = useState<any | null>(null);
  const [loveCount, setLoveCount] = useState<number>(5000000);
  const [heartBurst, setHeartBurst] = useState<boolean>(false);
  const [developerMotiveOpen, setDeveloperMotiveOpen] = useState<boolean>(false);

  const { petals: dbPetals, addPetal, deletePetal } = useSupabasePetals();

  const handleNavClick = (tab: 'home' | 'timeline' | 'wall' | 'garden', elementId: string) => {
    setActiveTab(tab);
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const timelineYears = [
    {
      year: '2023',
      badge: 'Started August 2023',
      headline: 'The Quiet Inception of a Grand Dream',
      quote: '“Small, quiet beginnings lay the groundwork for legendary journeys.”',
      bullets: [
        'Started creating content with pure intention and unwavering faith.',
        'Embracing continuous learning and daily consistency.',
        'Nurturing early dreams that would soon inspire millions.',
      ],
      bgImage: ASSET_PATHS.backgrounds.y2023,
      photos: [
        ASSET_PATHS.timeline.y2023.heroImage,
        ASSET_PATHS.timeline.y2023.gallery1,
        ASSET_PATHS.timeline.y2023.gallery2,
        ASSET_PATHS.timeline.y2023.landscape,
      ],
    },
    {
      year: '2024',
      badge: 'Massive Breakthrough',
      headline: 'Surging Momentum & Rapid Growth',
      quote: '“When authenticity meets passion, momentum becomes unstoppable.”',
      bullets: [
        'A massive breakthrough that united hundreds of thousands worldwide.',
        'Connecting deeply with an expanding, vibrant community.',
        'Turning everyday effort into unforgettable shared milestones.',
      ],
      bgImage: ASSET_PATHS.backgrounds.y2024,
      photos: [
        ASSET_PATHS.timeline.y2024.heroImage,
        ASSET_PATHS.timeline.y2024.gallery1,
        ASSET_PATHS.timeline.y2024.gallery2,
        ASSET_PATHS.timeline.y2024.landscape,
      ],
    },
    {
      year: '2025',
      badge: 'Deepened Impact',
      headline: 'Growth Continued Across Boundaries',
      quote: '“True impact is measured not just in numbers, but in lives transformed.”',
      bullets: [
        'Growth continued gracefully as the message reached a larger global audience.',
        'Creating deeper impact and weaving timeless memories with supporters.',
        'Solidifying a foundation of purpose, creativity, and mutual trust.',
      ],
      bgImage: ASSET_PATHS.backgrounds.y2025,
      photos: [
        ASSET_PATHS.timeline.y2025.heroImage,
        ASSET_PATHS.timeline.y2025.gallery1,
        ASSET_PATHS.timeline.y2025.gallery2,
        ASSET_PATHS.timeline.y2025.landscape,
      ],
    },
    {
      year: '2026',
      badge: '5 Million Reached',
      headline: 'The Dream Became Reality',
      quote: '“Where a dream transcended into a global family.”',
      bullets: [
        'Reached the monumental summit of 5 Million strong.',
        'Celebrating the journey, the hardships overcome, and the joy ahead.',
        'Where followers became family, and the story continues forever.',
      ],
      bgImage: ASSET_PATHS.backgrounds.y2026,
      photos: [
        ASSET_PATHS.timeline.y2026.heroImage,
        ASSET_PATHS.timeline.y2026.gallery1,
        ASSET_PATHS.timeline.y2026.gallery2,
        ASSET_PATHS.timeline.y2026.landscape,
      ],
    },
  ];

  const allMoments = [
    { id: 'm1', year: '2026', title: '5 Million Summit', img: ASSET_PATHS.timeline.y2026.heroImage },
    { id: 'm2', year: '2023', title: 'Inception', img: ASSET_PATHS.timeline.y2023.heroImage },
    { id: 'm3', year: '2024', title: '1 Million Breakthrough', img: ASSET_PATHS.timeline.y2024.heroImage },
    { id: 'm4', year: '2025', title: 'Global Horizons', img: ASSET_PATHS.timeline.y2025.heroImage },
    { id: 'm5', year: '2023', title: 'First Spark', img: ASSET_PATHS.timeline.y2023.gallery1 },
    { id: 'm6', year: '2024', title: 'Community Wave', img: ASSET_PATHS.timeline.y2024.gallery1 },
  ];

  const filteredMoments = selectedEra === 'all'
    ? allMoments
    : allMoments.filter((m) => m.year === selectedEra);

  return (
    <div className="relative w-full min-h-screen bg-[#0B0B0F] text-[#f0f0f5] font-general select-none pb-24 overflow-x-hidden">
      
      {/* 1. MOBILE HERO SECTION */}
      <section
        id="mobile-hero"
        className="relative w-full min-h-[92dvh] flex flex-col items-center justify-center text-center px-6 py-12 border-b border-[#e5c158]/20 bg-[radial-gradient(ellipse_at_top,rgba(229,193,88,0.16),transparent_70%)]"
      >
        <div className="flex items-center gap-2 text-[#e5c158] bg-[#0c0d12]/90 px-4 py-1.5 rounded-full border border-[#e5c158]/40 backdrop-blur-xl shadow-xl mb-6">
          <Sparkles className="w-4 h-4 text-[#e5c158] animate-spin-slow" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em]">
            A Mobile Tribute Experience
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#e5c158] via-white to-[#e5c158] tracking-tight leading-tight drop-shadow-[0_0_40px_rgba(229,193,88,0.5)]">
          SHREE'S JOURNEY
        </h1>

        <p className="font-serif italic text-base text-[#f0f0f5]/90 max-w-sm mt-4 leading-relaxed">
          “Some journeys are not measured by time... but by the hearts they touch.”
        </p>

        <div className="mt-8 flex flex-col items-center gap-4 w-full max-w-xs">
          <SpecularButton
            size="lg"
            radius={20}
            lineColor="#e5c158"
            baseColor="#0c0d12"
            onClick={() => {
              if (onUserInteractAudio) onUserInteractAudio();
              handleNavClick('timeline', 'mobile-timeline');
            }}
            className="w-full justify-center py-4 text-sm font-bold uppercase tracking-widest shadow-[0_0_30px_rgba(229,193,88,0.4)]"
          >
            <Sparkles className="w-4 h-4 text-[#e5c158]" />
            <span>Begin Experience ✦</span>
          </SpecularButton>
        </div>
      </section>

      {/* 2. MOBILE TIMELINE CHAPTERS */}
      <section id="mobile-timeline" className="relative w-full py-16 px-4 flex flex-col gap-12 border-b border-[#e5c158]/15">
        <div className="flex flex-col items-center text-center gap-3">
          <div className="flex items-center gap-2 text-[#e5c158] bg-[#0c0d12] px-4 py-1 rounded-full border border-[#e5c158]/30">
            <Calendar className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold uppercase tracking-widest">
              Interactive Story (2023 - 2026)
            </span>
          </div>
          <h2 className="text-3xl font-black text-[#f0f0f5]">The Timeline</h2>
        </div>

        {timelineYears.map((item) => (
          <article
            key={item.year}
            id={`year-section-${item.year}`}
            className="relative w-full p-6 sm:p-8 rounded-[32px] bg-[#0c0d12]/95 border-2 border-[#e5c158]/35 shadow-[0_0_50px_rgba(229,193,88,0.18)] backdrop-blur-2xl flex flex-col gap-6 overflow-hidden transition-all duration-300 active:border-[#e5c158]/70"
          >
            {/* Giant Background Watermark Number */}
            <div className="absolute right-[-1rem] top-[-1.5rem] pointer-events-none select-none font-black text-[9rem] text-white/[0.03] leading-none z-0">
              {item.year}
            </div>

            {/* Top Badge & Header */}
            <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#e5c158]" />
                <span className="text-2xl font-black text-[#e5c158] tracking-tight">{item.year}</span>
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#e5c158] bg-[#e5c158]/10 px-3.5 py-1.5 rounded-full border border-[#e5c158]/30 shadow-inner">
                {item.badge}
              </span>
            </div>

            {/* Headline & Quote */}
            <div className="relative z-10 flex flex-col gap-3">
              <h3 className="text-xl sm:text-2xl font-black text-[#f0f0f5] leading-snug tracking-tight">
                {item.headline}
              </h3>

              <p className="font-serif italic text-sm text-[#e5c158]/95 border-l-2 border-[#e5c158] pl-3 py-0.5 leading-relaxed">
                {item.quote}
              </p>
            </div>

            {/* Bullet Points */}
            <ul className="relative z-10 flex flex-col gap-2.5 text-xs text-[#f0f0f5]/85 font-medium leading-relaxed">
              {item.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="text-[#e5c158] font-bold text-sm shrink-0">✦</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            {/* Mobile Touch Photo Carousel */}
            <div className="relative z-10 w-full flex gap-3.5 overflow-x-auto pt-3 pb-2 snap-x snap-mandatory no-scrollbar">
              {item.photos.map((src, i) => (
                <div
                  key={i}
                  className="group shrink-0 w-40 h-52 rounded-2xl overflow-hidden border-2 border-white/15 shadow-xl snap-center bg-black/50 transition-all active:scale-95"
                >
                  <img
                    src={src}
                    alt={`${item.year} memory ${i}`}
                    className="w-full h-full object-cover group-active:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>

      {/* 3. MOBILE CINEMATIC MEMORY WALL */}
      <section id="mobile-wall" className="relative w-full py-16 px-4 flex flex-col items-center gap-8 border-b border-[#e5c158]/15">
        <div className="flex flex-col items-center text-center gap-2">
          <div className="flex items-center gap-2 text-[#e5c158] bg-[#0c0d12] px-4 py-1.5 rounded-full border border-[#e5c158]/30 shadow-lg">
            <Image className="w-3.5 h-3.5 text-[#e5c158]" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Memory Collection</span>
          </div>
          <h2 className="text-3xl font-black text-[#f0f0f5]">Wall of Memories</h2>
        </div>

        {/* Mobile Specular Era Selector Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 z-20 max-w-full">
          {['all', '2023', '2024', '2025', '2026'].map((era) => {
            const isSelected = selectedEra === era;
            return (
              <SpecularButton
                key={era}
                size="sm"
                radius={20}
                lineColor={isSelected ? '#ffffff' : '#e5c158'}
                baseColor={isSelected ? '#e5c158' : '#0c0d12'}
                onClick={() => setSelectedEra(era)}
                className={`transition-all duration-300 ${
                  isSelected
                    ? '!bg-gradient-to-r !from-[#e5c158] !via-[#ffd700] !to-[#b89530] !text-[#0c0d12] font-black shadow-[0_0_20px_rgba(229,193,88,0.7)] scale-105'
                    : 'hover:scale-105'
                }`}
              >
                <span className={`text-[10px] font-extrabold uppercase tracking-widest ${isSelected ? 'text-[#0c0d12]' : 'text-[#f0f0f5]/90'}`}>
                  {era === 'all' ? 'All Eras ✦' : `${era} Era 🌸`}
                </span>
              </SpecularButton>
            );
          })}
        </div>

        {/* Mobile Grid */}
        <div className="grid grid-cols-2 gap-3 w-full">
          {filteredMoments.map((m) => (
            <div
              key={m.id}
              onClick={() => setActiveMoment(m)}
              className="relative rounded-2xl overflow-hidden border border-[#e5c158]/30 bg-[#0c0d12] shadow-xl p-1.5 flex flex-col gap-1.5 active:scale-95 transition-transform"
            >
              <div className="w-full h-40 rounded-xl overflow-hidden bg-black/50">
                <img src={m.img} alt={m.title} className="w-full h-full object-cover" />
              </div>
              <span className="text-[11px] font-bold text-[#e5c158] truncate px-1">{m.title}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. MOBILE DEVELOPER MOTIVE */}
      <section className="w-full py-12 px-4 flex flex-col items-center text-center gap-6 border-b border-[#e5c158]/15">
        <div className="p-6 rounded-3xl bg-[#0c0d12] border border-[#e5c158]/40 shadow-2xl flex flex-col items-center gap-4 w-full">
          <Compass className="w-8 h-8 text-[#e5c158]" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#e5c158]">
            Behind The Journey
          </span>
          <p className="font-serif italic text-sm text-[#f0f0f5]/90">
            “I created this website to honor a journey of consistency, passion, and spiritual light.”
          </p>

          {!developerMotiveOpen ? (
            <SpecularButton
              size="md"
              radius={18}
              lineColor="#e5c158"
              baseColor="#0c0d12"
              onClick={() => setDeveloperMotiveOpen(true)}
              className="w-full justify-center py-3 text-xs font-bold uppercase tracking-widest mt-2"
            >
              <span>Read Motive ✦</span>
            </SpecularButton>
          ) : (
            <div className="text-xs text-[#f0f0f5]/80 text-left leading-relaxed flex flex-col gap-3 pt-2 border-t border-white/10">
              <p>
                Seeing someone dedicate years of unyielding effort to inspire millions was a profound reminder of what determination can accomplish.
              </p>
              <p>
                This platform is crafted as a living tribute to celebrate every step, milestone, and memory shared along the way.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 5. MOBILE REFLECTION GARDEN */}
      <section id="mobile-garden" className="relative w-full py-16 px-4 flex flex-col items-center gap-8">
        <div className="flex flex-col items-center text-center gap-2">
          <div className="flex items-center gap-2 text-[#e5c158] bg-[#0c0d12] px-4 py-1 rounded-full border border-[#e5c158]/30">
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Reflection Chapter</span>
          </div>
          <h2 className="text-3xl font-black text-[#f0f0f5]">Living Garden</h2>
        </div>

        {/* Love Button */}
        <button
          onClick={() => {
            setLoveCount((p) => p + 1);
            setHeartBurst(true);
            setTimeout(() => setHeartBurst(false), 1500);
          }}
          className="w-full py-4 rounded-full bg-gradient-to-r from-rose-500/20 via-rose-400/10 to-rose-500/20 border border-rose-400/50 text-rose-200 text-xs font-bold uppercase tracking-widest shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
          <span>Send Love to Shree ({loveCount.toLocaleString()}) 💖</span>
        </button>

        {heartBurst && (
          <div className="text-xs font-bold text-rose-300 uppercase tracking-widest">
            💖 Heart sent into the sky!
          </div>
        )}

        {/* Community Petal Form */}
        <div className="w-full">
          <CommunityPetalSection
            onAddPetal={async (author, country, text) => {
              await addPetal(author, country, text);
            }}
            onDeletePetal={deletePetal}
          />
        </div>

        {/* Counter */}
        <div className="w-full">
          <LivingGardenCounter petals={dbPetals} />
        </div>

        {onOpenSecretModal && (
          <button
            onClick={onOpenSecretModal}
            className="text-xs font-bold uppercase tracking-widest text-[#e5c158]/80 hover:text-[#e5c158] underline py-4"
          >
            Unlock Secret Chapter ✦
          </button>
        )}
      </section>

      {/* 6. FLOATING GLASSMORPHIC MOBILE BOTTOM NAVIGATION BAR */}
      <nav
        aria-label="Mobile Navigation"
        className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md bg-[#0c0d12]/95 border border-[#e5c158]/40 rounded-full px-3 py-2 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] flex items-center justify-around text-[10px] font-bold uppercase tracking-wider"
      >
        <button
          onClick={() => handleNavClick('home', 'mobile-hero')}
          className={`flex flex-col items-center gap-1 px-3 py-1 rounded-full transition-colors ${
            activeTab === 'home' ? 'text-[#e5c158] bg-white/5' : 'text-[#f0f0f5]/60'
          }`}
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </button>

        <button
          onClick={() => handleNavClick('timeline', 'mobile-timeline')}
          className={`flex flex-col items-center gap-1 px-3 py-1 rounded-full transition-colors ${
            activeTab === 'timeline' ? 'text-[#e5c158] bg-white/5' : 'text-[#f0f0f5]/60'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Timeline</span>
        </button>

        <button
          onClick={() => handleNavClick('wall', 'mobile-wall')}
          className={`flex flex-col items-center gap-1 px-3 py-1 rounded-full transition-colors ${
            activeTab === 'wall' ? 'text-[#e5c158] bg-white/5' : 'text-[#f0f0f5]/60'
          }`}
        >
          <Image className="w-4 h-4" />
          <span>Wall</span>
        </button>

        <button
          onClick={() => handleNavClick('garden', 'mobile-garden')}
          className={`flex flex-col items-center gap-1 px-3 py-1 rounded-full transition-colors ${
            activeTab === 'garden' ? 'text-[#e5c158] bg-white/5' : 'text-[#f0f0f5]/60'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Garden</span>
        </button>
      </nav>

      {/* FULL SCREEN PHOTO MODAL */}
      {activeMoment && (
        <div
          onClick={() => setActiveMoment(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl p-6 flex flex-col items-center justify-center text-center gap-4 cursor-pointer"
        >
          <div className="w-full max-w-sm h-80 rounded-2xl overflow-hidden border border-[#e5c158]/50 shadow-2xl">
            <img src={activeMoment.img} alt={activeMoment.title} className="w-full h-full object-cover" />
          </div>
          <h3 className="text-xl font-bold text-[#e5c158]">{activeMoment.title}</h3>
          <span className="text-xs text-[#f0f0f5]/60">{activeMoment.year} Memory</span>
          <button className="px-6 py-2 rounded-full bg-white/10 text-xs font-bold uppercase tracking-widest text-[#f0f0f5] mt-2">
            Close
          </button>
        </div>
      )}

    </div>
  );
};

export default MobileExperience;
