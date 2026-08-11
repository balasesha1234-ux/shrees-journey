import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Calendar, Heart, Compass, Image, X, Lock, Share2 } from 'lucide-react';
import SpecularButton from '../components/SpecularButton';
import CommunityPetalSection from '../components/CommunityPetalSection';
import LivingGardenCounter from '../components/LivingGardenCounter';
import FilmCredits from '../components/FilmCredits';
import MilestoneCounter from '../components/MilestoneCounter';
import ShareTributeModal from '../components/ShareTributeModal';
import CelebrationBurst from '../components/CelebrationBurst';
import BlurText from '../components/BlurText';
import { ASSET_PATHS } from '../utils/assetPaths';
import { useSupabasePetals } from '../hooks/useSupabasePetals';

interface MobileExperienceProps {
  onUserInteractAudio?: () => void;
  onOpenSecretModal?: () => void;
  onOpenShareModal?: () => void;
}

export const MobileExperience: React.FC<MobileExperienceProps> = ({
  onUserInteractAudio,
  onOpenSecretModal,
  onOpenShareModal,
}) => {
  const [selectedEra, setSelectedEra] = useState<string>('all');
  const [activeMoment, setActiveMoment] = useState<any | null>(null);
  const [activePetalModal, setActivePetalModal] = useState<any | null>(null);
  const [loveCount, setLoveCount] = useState<number>(5000000);
  const [heartBurst, setHeartBurst] = useState<boolean>(false);
  const [celebrationBurst, setCelebrationBurst] = useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [developerMotiveOpen, setDeveloperMotiveOpen] = useState<boolean>(false);

  const mobilePetalBoxRef = useRef<HTMLDivElement | null>(null);
  const mobilePhysicsRef = useRef<Record<string, {
    x: number;
    y: number;
    vx: number;
    vy: number;
    phaseX: number;
    phaseY: number;
    phaseRot: number;
    speedX: number;
    speedY: number;
    speedRot: number;
    swayAmpX: number;
    swayAmpY: number;
    rotAmp: number;
    baseRot: number;
  }>>({});

  const { petals: dbPetals, addPetal, deletePetal } = useSupabasePetals();

  // HIGH-PERFORMANCE ORGANIC 2D FLOATING PETALS ANIMATION ENGINE FOR MOBILE
  useEffect(() => {
    let animId: number;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    let lastTime = performance.now();

    const animateMobilePetals = (time: number) => {
      animId = requestAnimationFrame(animateMobilePetals);

      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      const container = mobilePetalBoxRef.current;
      if (!container) return;

      const containerWidth = container.clientWidth || 300;
      const containerHeight = container.clientHeight || 220;

      const petalWidth = 44;
      const petalHeight = 64;

      const minX = petalWidth / 2 + 8;
      const maxX = containerWidth - petalWidth / 2 - 8;
      const minY = petalHeight / 2 + 8;
      const maxY = containerHeight - petalHeight / 2 - 8;

      const petalNodes = container.querySelectorAll('.mobile-petal-node') as NodeListOf<HTMLButtonElement>;

      petalNodes.forEach((node, index) => {
        const id = node.getAttribute('data-petal-id') || `mobile-petal-${index}`;

        if (!mobilePhysicsRef.current[id]) {
          const cols = 4;
          const col = index % cols;
          const row = Math.floor(index / cols);

          const startX = minX + (col / (cols - 1 || 1)) * Math.max(maxX - minX, 1);
          const startY = minY + (row / 2.5) * Math.max(maxY - minY, 1);

          mobilePhysicsRef.current[id] = {
            x: startX + (Math.random() - 0.5) * 15,
            y: startY + (Math.random() - 0.5) * 15,
            vx: (Math.random() - 0.5) * 14,
            vy: (Math.random() - 0.5) * 14,
            phaseX: Math.random() * Math.PI * 2,
            phaseY: Math.random() * Math.PI * 2,
            phaseRot: Math.random() * Math.PI * 2,
            speedX: 0.4 + Math.random() * 0.5,
            speedY: 0.3 + Math.random() * 0.6,
            speedRot: 0.2 + Math.random() * 0.4,
            swayAmpX: 12 + Math.random() * 16,
            swayAmpY: 10 + Math.random() * 14,
            rotAmp: 14 + Math.random() * 10,
            baseRot: (Math.random() - 0.5) * 20,
          };
        }

        const state = mobilePhysicsRef.current[id];

        state.phaseX += state.speedX * dt;
        state.phaseY += state.speedY * dt;
        state.phaseRot += state.speedRot * dt;

        state.x += state.vx * dt;
        state.y += state.vy * dt;

        const swayX = Math.sin(state.phaseX) * state.swayAmpX + Math.sin(state.phaseX * 2.3) * (state.swayAmpX * 0.4);
        const swayY = Math.cos(state.phaseY) * state.swayAmpY + Math.cos(state.phaseY * 1.7) * (state.swayAmpY * 0.3);

        const currentX = state.x + swayX;
        const currentY = state.y + swayY;

        if (currentX < minX) {
          state.x = minX - swayX;
          state.vx = Math.abs(state.vx) * 0.8 + 4;
        } else if (currentX > maxX) {
          state.x = maxX - swayX;
          state.vx = -Math.abs(state.vx) * 0.8 - 4;
        }

        if (currentY < minY) {
          state.y = minY - swayY;
          state.vy = Math.abs(state.vy) * 0.8 + 4;
        } else if (currentY > maxY) {
          state.y = maxY - swayY;
          state.vy = -Math.abs(state.vy) * 0.8 - 4;
        }

        const rot = state.baseRot + Math.sin(state.phaseRot) * state.rotAmp + Math.sin(state.phaseX * 1.5) * 5;

        node.style.transform = `translate3d(${currentX - petalWidth / 2}px, ${currentY - petalHeight / 2}px, 0) rotate(${rot}deg)`;
      });
    };

    animId = requestAnimationFrame(animateMobilePetals);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

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
    <div className="relative w-full min-h-screen bg-[#0B0B0F] text-[#f0f0f5] font-general select-none pb-12 overflow-x-hidden">
      
      {/* 1. MOBILE HERO SECTION */}
      <section
        id="mobile-hero"
        className="relative w-full min-h-[85dvh] flex flex-col items-center justify-center text-center px-6 py-12 border-b border-[#e5c158]/20 bg-[radial-gradient(ellipse_at_top,rgba(229,193,88,0.2),transparent_70%)]"
      >
        <BlurText
          text="SHREE'S JOURNEY"
          delay={90}
          animateBy="words"
          direction="top"
          className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#e5c158] via-white to-[#e5c158] tracking-tight leading-tight drop-shadow-[0_0_50px_rgba(229,193,88,0.6)] justify-center text-center"
        />

        <BlurText
          text="“Some journeys are not measured by time... but by the hearts they touch.”"
          delay={60}
          animateBy="words"
          direction="bottom"
          className="font-serif italic text-base sm:text-xl text-[#f0f0f5]/90 max-w-sm mt-4 leading-relaxed justify-center text-center"
        />

        <div className="mt-10 flex flex-col items-center gap-3.5 w-full max-w-xs z-20">
          <SpecularButton
            size="lg"
            radius={22}
            lineColor="#e5c158"
            baseColor="#0c0d12"
            onClick={() => {
              if (onUserInteractAudio) onUserInteractAudio();
              const el = document.getElementById('mobile-timeline');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full justify-center py-4 text-sm font-extrabold uppercase tracking-widest shadow-[0_0_40px_rgba(229,193,88,0.5)] active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-[#e5c158]" />
            <span>Begin Experience ✦</span>
          </SpecularButton>

          <SpecularButton
            size="lg"
            radius={22}
            lineColor="#e5c158"
            baseColor="#0c0d12"
            onClick={() => {
              if (onOpenShareModal) onOpenShareModal();
              setIsShareModalOpen(true);
            }}
            className="w-full justify-center py-3.5 text-xs font-bold uppercase tracking-widest text-[#e5c158] shadow-[0_0_30px_rgba(229,193,88,0.3)] active:scale-95"
          >
            <Share2 className="w-4 h-4 text-[#e5c158]" />
            <span>Share Tribute 🌸</span>
          </SpecularButton>
        </div>
      </section>

      {/* 2. MOBILE TIMELINE CHAPTERS */}
      <section id="mobile-timeline" className="relative w-full py-16 px-4 flex flex-col gap-12 border-b border-[#e5c158]/15">
        <div className="flex flex-col items-center text-center gap-3">
          <div className="flex items-center gap-2 text-[#e5c158] bg-[#0c0d12] px-4 py-1.5 rounded-full border border-[#e5c158]/30 shadow-lg">
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
            className="relative w-full p-6 sm:p-8 rounded-[32px] bg-black/60 border-2 border-[#e5c158]/40 shadow-[0_0_60px_rgba(229,193,88,0.25)] backdrop-blur-xl flex flex-col gap-6 overflow-hidden transition-all duration-300 active:border-[#e5c158]"
          >
            {/* VIBRANT CHAPTER BACKGROUND PHOTO */}
            <div className="absolute inset-0 z-0 opacity-55 pointer-events-none overflow-hidden rounded-[32px]">
              <img
                src={item.bgImage}
                alt={`${item.year} Background`}
                className="w-full h-full object-cover filter brightness-110 contrast-110 scale-105 mix-blend-overlay"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0c0d12]/85 via-[#0c0d12]/75 to-[#0c0d12]" />
            </div>

            {/* Giant Background Watermark Number */}
            <div className="absolute right-[-1rem] top-[-1.5rem] pointer-events-none select-none font-black text-[9.5rem] text-white/[0.06] leading-none z-0">
              {item.year}
            </div>

            {/* Top Badge & Header */}
            <div className="relative z-10 flex items-center justify-between border-b border-white/15 pb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#e5c158]" />
                <span className="text-2xl font-black text-[#e5c158] tracking-tight">{item.year}</span>
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#e5c158] bg-[#e5c158]/15 px-3.5 py-1.5 rounded-full border border-[#e5c158]/40 shadow-inner">
                {item.badge}
              </span>
            </div>

            {/* Headline & Quote */}
            <div className="relative z-10 flex flex-col gap-3">
              <h3 className="text-xl sm:text-2xl font-black text-[#f0f0f5] leading-snug tracking-tight">
                {item.headline}
              </h3>

              <p className="font-serif italic text-sm text-[#e5c158] border-l-2 border-[#e5c158] pl-3 py-0.5 leading-relaxed drop-shadow">
                {item.quote}
              </p>
            </div>

            {/* Bullet Points */}
            <ul className="relative z-10 flex flex-col gap-2.5 text-xs text-[#f0f0f5]/90 font-medium leading-relaxed">
              {item.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="text-[#e5c158] font-bold text-sm shrink-0">✦</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            {/* ANIMATED MILESTONE COUNTER FOR MOBILE */}
            <div className="relative z-10 w-full mt-2">
              <MilestoneCounter
                targetValue={
                  item.year === '2023'
                    ? 500000
                    : item.year === '2024'
                    ? 2500000
                    : item.year === '2025'
                    ? 4000000
                    : 5000000
                }
                label={
                  item.year === '2023'
                    ? '500K Subscribers'
                    : item.year === '2024'
                    ? '2.5M Subscribers'
                    : item.year === '2025'
                    ? '4.0M Family Impact'
                    : '5.0M Summit Milestone'
                }
                subtitle={`${item.year} Milestone Reached`}
                badgeText={`${item.year} Milestone`}
                badgeColor={
                  item.year === '2023'
                    ? '#f59e0b'
                    : item.year === '2024'
                    ? '#72a5cf'
                    : item.year === '2025'
                    ? '#c29be4'
                    : '#e5c158'
                }
              />
            </div>

            {/* Mobile Touch Photo Carousel */}
            <div className="relative z-10 w-full flex gap-3.5 overflow-x-auto pt-3 pb-2 snap-x snap-mandatory no-scrollbar">
              {item.photos.map((src, i) => (
                <div
                  key={i}
                  className="group shrink-0 w-40 h-52 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl snap-center bg-black/60 transition-all active:scale-95"
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
        <div className="flex flex-wrap items-center justify-center gap-2.5 z-30 max-w-full touch-auto">
          {['all', '2023', '2024', '2025', '2026'].map((era) => {
            const isSelected = selectedEra === era;
            return (
              <button
                key={era}
                onClick={() => setSelectedEra(era)}
                className={`px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-widest transition-all shadow-lg active:scale-95 ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#e5c158] via-[#ffd700] to-[#b89530] text-[#0c0d12] shadow-[0_0_20px_rgba(229,193,88,0.7)] scale-105 border-2 border-white'
                    : 'bg-[#0c0d12] border-2 border-[#e5c158]/40 text-[#f0f0f5]/90 hover:border-[#e5c158]'
                }`}
              >
                {era === 'all' ? 'All Eras ✦' : `${era} Era 🌸`}
              </button>
            );
          })}
        </div>

        {/* Mobile Grid */}
        <div className="grid grid-cols-2 gap-3 w-full">
          {filteredMoments.map((m) => (
            <div
              key={m.id}
              onClick={() => setActiveMoment(m)}
              className="relative rounded-2xl overflow-hidden border-2 border-[#e5c158]/40 bg-[#0c0d12] shadow-xl p-1.5 flex flex-col gap-1.5 active:scale-95 transition-transform cursor-pointer"
            >
              <div className="w-full h-40 rounded-xl overflow-hidden bg-black/50">
                <img src={m.img} alt={m.title} className="w-full h-full object-cover" />
              </div>
              <span className="text-[11px] font-extrabold text-[#e5c158] truncate px-1">{m.title}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. MOBILE DEVELOPER MOTIVE */}
      <section className="w-full py-12 px-4 flex flex-col items-center text-center gap-6 border-b border-[#e5c158]/15">
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0c0d12] border-2 border-[#e5c158]/50 shadow-[0_0_50px_rgba(229,193,88,0.2)] flex flex-col items-center gap-4 w-full">
          <Compass className="w-9 h-9 text-[#e5c158] animate-spin-slow" />
          <span className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#e5c158]">
            Behind The Journey
          </span>
          <p className="font-serif italic text-base text-[#f0f0f5] leading-relaxed">
            “I created this website to honor a journey of consistency, passion, and spiritual light.”
          </p>

          {!developerMotiveOpen ? (
            <SpecularButton
              size="md"
              radius={18}
              lineColor="#e5c158"
              baseColor="#0c0d12"
              onClick={() => setDeveloperMotiveOpen(true)}
              className="w-full justify-center py-3.5 text-xs font-extrabold uppercase tracking-widest mt-2 shadow-[0_0_20px_rgba(229,193,88,0.4)]"
            >
              <span>Read Motive ✦</span>
            </SpecularButton>
          ) : (
            <div className="text-xs text-[#f0f0f5]/90 text-left leading-relaxed flex flex-col gap-3.5 pt-4 border-t border-white/15 w-full animate-fade-in">
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

      {/* 5. MOBILE REFLECTION GARDEN WITH ANIMATED FLOATING MEMORY PETALS */}
      <section id="mobile-garden" className="relative w-full py-16 px-4 flex flex-col items-center gap-8">
        <div className="flex flex-col items-center text-center gap-2">
          <div className="flex items-center gap-2 text-[#e5c158] bg-[#0c0d12] px-4 py-1.5 rounded-full border border-[#e5c158]/30 shadow-lg">
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Reflection Chapter</span>
          </div>
          <h2 className="text-3xl font-black text-[#f0f0f5]">Living Garden</h2>
        </div>

        {/* Mobile Floating Memory Petals Box with Organic 2D Float Animation */}
        <div className="relative z-10 w-full h-[380px] rounded-[32px] bg-black/80 border-2 border-[#e5c158]/60 shadow-[0_0_60px_rgba(229,193,88,0.3)] overflow-hidden p-5 flex flex-col items-center justify-between backdrop-blur-xl">
          <div className="relative z-10 flex items-center gap-2 text-[#e5c158] bg-[#050507]/90 px-4 py-2 rounded-full border border-[#e5c158]/50 text-[10px] font-extrabold uppercase tracking-widest text-center shadow-xl">
            <Sparkles className="w-4 h-4 text-[#e5c158] animate-spin-slow" />
            <span>Tap floating petals to unfold memory 🌸</span>
          </div>

          {/* Floating Memory Petals Box Container */}
          <div ref={mobilePetalBoxRef} className="relative w-full h-60 overflow-hidden">
            {dbPetals.slice(0, 10).map((p, idx) => (
              <button
                key={p.id || idx}
                data-petal-id={p.id || idx}
                onClick={() => setActivePetalModal(p)}
                aria-label={`Unfold memory petal by ${p.author}`}
                className="mobile-petal-node absolute top-0 left-0 z-20 w-11 h-16 rounded-[50%_0_50%_50%] bg-gradient-to-br from-rose-300 via-pink-400 to-rose-500 border-2 border-[#e5c158] shadow-[0_0_25px_rgba(244,63,94,0.7)] flex items-center justify-center active:scale-125 transition-transform will-change-transform"
              >
                <Heart className="w-4 h-4 text-white fill-white pointer-events-none" />
              </button>
            ))}
          </div>

          <div className="relative z-10 text-[10px] font-extrabold uppercase tracking-widest text-[#e5c158] bg-[#050507]/90 px-4 py-1.5 rounded-full border border-[#e5c158]/30 shadow-md">
            🌸 {dbPetals.length} Memory Petals Floating
          </div>
        </div>

        {/* Celebration Burst Canvas Component */}
        <CelebrationBurst trigger={celebrationBurst} onComplete={() => setCelebrationBurst(false)} />

        {/* Love Button & Share Tribute Buttons */}
        <div className="w-full flex flex-col gap-3">
          <SpecularButton
            size="lg"
            radius={24}
            lineColor="#f43f5e"
            baseColor="#0c0d12"
            onClick={() => {
              setLoveCount((p) => p + 1);
              setHeartBurst(true);
              setCelebrationBurst(true);
              setTimeout(() => setHeartBurst(false), 1500);
            }}
            className="w-full justify-center py-4 text-xs font-bold uppercase tracking-widest text-[#f0f0f5]"
          >
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
            <span>Send Love to Shree ({loveCount.toLocaleString()}) 💖</span>
          </SpecularButton>

          <SpecularButton
            size="lg"
            radius={24}
            lineColor="#e5c158"
            baseColor="#0c0d12"
            onClick={() => setIsShareModalOpen(true)}
            className="w-full justify-center py-4 text-xs font-bold uppercase tracking-widest text-[#e5c158]"
          >
            <Sparkles className="w-4 h-4 text-[#e5c158]" />
            <span>Share Tribute 🌸</span>
          </SpecularButton>
        </div>

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

        {/* UNLOCK SECRET EPILOGUE BUTTON ON MOBILE */}
        {onOpenSecretModal && (
          <div className="w-full flex justify-center py-6">
            <SpecularButton
              size="md"
              radius={20}
              lineColor="#e5c158"
              baseColor="#0c0d12"
              onClick={onOpenSecretModal}
              className="w-full max-w-xs justify-center py-3.5 text-xs font-extrabold uppercase tracking-widest"
            >
              <Lock className="w-4 h-4 text-[#e5c158]" />
              <span>Unlock Secret Epilogue ✦</span>
            </SpecularButton>
          </div>
        )}
      </section>

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

      {/* MOBILE UNFOLDED PETAL MODAL */}
      {activePetalModal && (
        <div
          onClick={() => setActivePetalModal(null)}
          className="fixed inset-0 z-50 p-6 bg-black/92 backdrop-blur-2xl flex items-center justify-center cursor-pointer animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-sm w-full p-8 rounded-3xl bg-[#0c0d12] border-2 border-[#e5c158]/60 shadow-2xl flex flex-col items-center text-center gap-5"
          >
            <button
              onClick={() => setActivePetalModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 text-[#f0f0f5]/70"
            >
              <X className="w-5 h-5" />
            </button>
            <Heart className="w-8 h-8 text-rose-400 fill-rose-400 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#e5c158]">
              Unfolded Memory Petal 🌸
            </span>
            <p className="font-serif italic text-base text-[#f0f0f5] leading-relaxed">
              “{activePetalModal.text}”
            </p>
            <span className="text-xs font-bold text-[#e5c158]">
              — {activePetalModal.author} {activePetalModal.country ? `(${activePetalModal.country})` : ''}
            </span>
          </div>
        </div>
      )}

      {/* SHARE TRIBUTE MODAL */}
      <ShareTributeModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} />

      {/* FILM END CREDITS FOOTER ON MOBILE */}
      <FilmCredits onOpenSecretModal={onOpenSecretModal} />

    </div>
  );
};

export default MobileExperience;
