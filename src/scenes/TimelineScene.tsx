import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ASSET_PATHS, getAssetObjectPositionStyle } from '../utils/assetPaths';
import { SectionBackground } from '../components/SectionBackground';
import DriftWall from '../components/DriftWall';
import type { DriftWallItem } from '../components/DriftWall';
import BlurText from '../components/BlurText';
import MagicBento from '../components/MagicBento';
import GradualBlur from '../components/GradualBlur';
import DotField from '../components/DotField';
import SpecularButton from '../components/SpecularButton';
import MilestoneCounter from '../components/MilestoneCounter';
import { Calendar, Sparkles, TrendingUp, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface YearSpreadData {
  year: '2023' | '2024' | '2025' | '2026';
  tag: string;
  badge: string;
  headline: string;
  quote: string;
  bullets: string[];
  milestones?: string[];
  youWereThere?: boolean;
  bgImage: string;
  driftItems: DriftWallItem[];
}

const MAGAZINE_SPREADS: YearSpreadData[] = [
  {
    year: '2023',
    tag: 'AUGUST 2023 • WARM SUNRISE',
    badge: 'Started August 2023',
    headline: 'The Quiet Inception of a Grand Dream',
    quote: '"Small, quiet beginnings lay the groundwork for legendary journeys."',
    bullets: [
      'Chose to show up every single day, even when nobody was watching.',
      'Built something pure — not for numbers, but because it needed to exist.',
      'The first 500K weren\'t followers. They were the first people who believed.',
    ],
    milestones: ['August 2023 Debut', 'First 500K Hearts', 'Daily Consistency'],
    bgImage: ASSET_PATHS.backgrounds.y2023,
    driftItems: [
      { image: ASSET_PATHS.timeline.y2023.heroImage, title: '2023 Inception' },
      { image: ASSET_PATHS.timeline.y2023.gallery1, title: 'First Steps' },
      { image: ASSET_PATHS.timeline.y2023.gallery2, title: 'Quiet Faith' },
      { image: ASSET_PATHS.timeline.y2023.landscape, title: 'Early Vision' },
      { image: '/assets/serial/1s.jpg', title: 'Moment 1s' },
      { image: '/assets/serial/2s.jpg', title: 'Moment 2s' },
      { image: '/assets/serial/3s.jpg', title: 'Moment 3s' },
      { image: '/assets/serial/4s.jpg', title: 'Moment 4s' },
      { image: '/assets/serial/5s.jpg', title: 'Moment 5s' },
      { image: '/assets/serial/6s.jpg', title: 'Moment 6s' },
      { image: '/assets/serial/7s.jpg', title: 'Moment 7s' },
      { image: '/assets/serial/8s.jpg', title: 'Moment 8s' },
      { image: '/assets/serial/9s.jpg', title: 'Moment 9s' },
      { image: '/assets/serial/10s.jpg', title: 'Moment 10s' },
      { image: '/assets/serial/11s.jpg', title: 'Moment 11s' },
    ],
  },
  {
    year: '2024',
    tag: '2024 • GOLDEN DAYLIGHT',
    badge: 'Massive Breakthrough',
    headline: 'Surging Momentum & Rapid Growth',
    quote: '"When authenticity meets passion, momentum becomes unstoppable."',
    bullets: [
      'A million hearts found each other through one shared story.',
      'The community didn\'t grow — it bloomed, organically and beautifully.',
      'Turning everyday effort into milestones that moved an entire generation.',
    ],
    milestones: ['500K Milestone', '1 Million Family', '2 Million Breakthrough'],
    bgImage: ASSET_PATHS.backgrounds.y2024,
    driftItems: [
      { image: ASSET_PATHS.timeline.y2024.heroImage, title: '1 Million Breakthrough' },
      { image: ASSET_PATHS.timeline.y2024.gallery1, title: '500K Spark' },
      { image: ASSET_PATHS.timeline.y2024.gallery2, title: 'Community Wave' },
      { image: ASSET_PATHS.timeline.y2024.landscape, title: 'Growth Horizon' },
      { image: '/assets/serial/12s old.jpg', title: 'Moment 12s' },
      { image: '/assets/serial/13s old.jpg', title: 'Moment 13s' },
      { image: '/assets/serial/14s old.jpg', title: 'Moment 14s' },
      { image: '/assets/serial/15s old.jpg', title: 'Moment 15s' },
      { image: '/assets/serial/16s old.jpg', title: 'Moment 16s' },
      { image: '/assets/serial/17s mid.jpg', title: 'Moment 17s' },
      { image: '/assets/serial/18s mid.jpg', title: 'Moment 18s' },
      { image: '/assets/serial/19s mid.jpg', title: 'Moment 19s' },
      { image: '/assets/serial/20s mid.jpg', title: 'Moment 20s' },
    ],
  },
  {
    year: '2025',
    tag: '2025 • GOLDEN-ORANGE SUNSET',
    badge: 'Deepened Impact',
    headline: 'Growth Continued Across Boundaries',
    quote: '"True impact is measured not just in numbers, but in lives transformed."',
    bullets: [
      'The message crossed borders — different languages, one shared feeling.',
      'Millions didn\'t just watch. They carried something home with them.',
      'A foundation of purpose, creativity and trust that no algorithm can erase.',
    ],
    milestones: ['4M Global Family', 'Cross-Border Reach', 'Purpose Solidified'],
    bgImage: ASSET_PATHS.backgrounds.y2025,
    driftItems: [
      { image: ASSET_PATHS.timeline.y2025.heroImage, title: 'Global Reach' },
      { image: ASSET_PATHS.timeline.y2025.gallery1, title: 'Deep Connections' },
      { image: ASSET_PATHS.timeline.y2025.gallery2, title: 'Creative Purpose' },
      { image: ASSET_PATHS.timeline.y2025.gallery3, title: 'Memory 21s' },
      { image: ASSET_PATHS.timeline.y2025.gallery4, title: 'Memory 22s' },
      { image: ASSET_PATHS.timeline.y2025.gallery5, title: 'Memory 23s' },
      { image: ASSET_PATHS.timeline.y2025.landscape, title: 'Expanding Impact' },
      { image: '/assets/serial/21s.jpg', title: 'Moment 21s' },
      { image: '/assets/serial/22s.jpg', title: 'Moment 22s' },
      { image: '/assets/serial/23s.jpg', title: 'Moment 23s' },
      { image: '/assets/serial/24s.jpg', title: 'Moment 24s' },
      { image: '/assets/serial/25s.jpg', title: 'Moment 25s' },
      { image: '/assets/serial/26s.jpg', title: 'Moment 26s' },
      { image: '/assets/serial/27s.jpg', title: 'Moment 27s' },
    ],
  },
  {
    year: '2026',
    tag: '2026 • DEEP BLUE TWILIGHT',
    badge: '5 Million Reached',
    headline: 'The Dream Became Reality',
    quote: '"Where a dream transcended into a global family."',
    bullets: [
      'Five million people didn\'t just find a creator. They found a reason to keep going.',
      'The summit wasn\'t the end — it was the beginning of everything that comes next.',
      'Where followers became family, and a quiet August promise became eternal.',
    ],
    milestones: ['5 Million Summit', 'Global Family', 'Eternal Story'],
    youWereThere: true,
    bgImage: ASSET_PATHS.backgrounds.y2026,
    driftItems: [
      { image: ASSET_PATHS.timeline.y2026.heroImage, title: '5 Million Summit' },
      { image: ASSET_PATHS.timeline.y2026.gallery1, title: 'Global Celebration' },
      { image: ASSET_PATHS.timeline.y2026.gallery2, title: 'Eternal Bond' },
      { image: ASSET_PATHS.timeline.y2026.gallery3, title: 'Memory 24s' },
      { image: ASSET_PATHS.timeline.y2026.gallery4, title: 'Memory 25s' },
      { image: ASSET_PATHS.timeline.y2026.gallery5, title: 'Memory 26s' },
      { image: ASSET_PATHS.timeline.y2026.gallery6, title: 'Memory 27s' },
      { image: ASSET_PATHS.timeline.y2026.landscape, title: 'Future Horizons' },
      { image: '/assets/serial/28s.jpg', title: 'Moment 28s' },
      { image: '/assets/serial/29s.jpg', title: 'Moment 29s' },
      { image: '/assets/serial/30s.jpg', title: 'Moment 30s' },
      { image: '/assets/serial/31s.jpg', title: 'Moment 31s' },
      { image: '/assets/serial/32s.jpg', title: 'Moment 32s' },
      { image: '/assets/serial/33s.jpg', title: 'Moment 33s' },
    ],
  },
];

export const TimelineScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selectedDriftItem, setSelectedDriftItem] = useState<{
    item: DriftWallItem;
    year: string;
    tag: string;
    quote: string;
  } | null>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768 || 'ontouchstart' in window;
    if (isMobile) {
      // Guarantee immediate visibility on mobile viewports
      const reveals = containerRef.current?.querySelectorAll('.animate-reveal');
      reveals?.forEach((el) => {
        (el as HTMLElement).style.opacity = '1';
        (el as HTMLElement).style.transform = 'none';
      });
      return;
    }

    const ctx = gsap.context(() => {
      MAGAZINE_SPREADS.forEach((item) => {
        const sectionEl = document.getElementById(`year-section-${item.year}`);
        if (sectionEl) {
          // Reveal animation per section on desktop/tablet
          gsap.fromTo(
            sectionEl.querySelectorAll('.animate-reveal'),
            {
              opacity: 0,
              y: 25,
            },
            {
              opacity: 1,
              y: 0,
              duration: 1.1,
              stagger: 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: sectionEl,
                start: 'top 85%',
              },
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="timeline-section"
      className="relative w-full min-h-screen py-16 sm:py-24 bg-[#0B0B0F] text-[#f0f0f5] font-general select-none overflow-hidden max-w-full"
    >
      {/* ATMOSPHERIC INTERACTIVE DOT FIELD CONSTELLATION BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-35">
        <DotField
          dotRadius={1.5}
          dotSpacing={18}
          bulgeStrength={65}
          glowRadius={180}
          sparkle={false}
          waveAmplitude={0}
          cursorRadius={450}
          cursorForce={0.1}
          bulgeOnly
          gradientFrom="rgba(229, 193, 88, 0.25)"
          gradientTo="rgba(229, 193, 88, 0.06)"
          glowColor="rgba(229, 193, 88, 0.15)"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 pr-4 sm:pr-6 md:pr-48 lg:pr-56 flex flex-col gap-28 sm:gap-40 md:gap-56 relative z-10">
        
        {MAGAZINE_SPREADS.map((spread, spreadIdx) => {
          const isEven = spreadIdx % 2 === 0;
          const BRIDGE_PHRASES: Record<string, string> = {
            '2023': 'And then… everything changed.',
            '2024': 'The world was watching now. And she kept going.',
            '2025': 'Numbers became names. Names became family.',
          };

          return (
            <React.Fragment key={spread.year}>
              <article
                id={`year-section-${spread.year}`}
                className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16 sm:my-24 scroll-mt-24"
              >
              {/* GRADUAL BLUR CINEMATIC FOCUS REVEAL */}
              <GradualBlur
                height="5rem"
                strength={1.2}
                divCount={6}
                curve="bezier"
                exponential
                opacity={0.7}
                position="item"
              >
                {/* DYNAMIC CHAPTER ATMOSPHERIC LIGHTING BACKGROUND */}
                <SectionBackground src={spread.bgImage} opacity={0.22} year={spread.year} />

                {/* MAGIC BENTO SECTION WRAPPER */}
                <MagicBento
                  textAutoHide={true}
                  enableStars
                  enableSpotlight
                  enableBorderGlow={true}
                  enableTilt={false}
                  enableMagnetism={false}
                  clickEffect
                  spotlightRadius={450}
                  particleCount={14}
                  glowColor={
                    spread.year === '2023'
                      ? '245, 158, 11'
                      : spread.year === '2024'
                      ? '234, 179, 8'
                      : spread.year === '2025'
                      ? '249, 115, 22'
                      : '99, 102, 241'
                  }
                  disableAnimations={false}
                  className="p-5 sm:p-8 md:p-12 border-white/5"
                >
                  {/* Watermark Year Typography */}
                  <div className="absolute left-[-1rem] sm:left-[-2rem] top-[-2rem] sm:top-[-3rem] pointer-events-none select-none font-general text-[6rem] sm:text-[14rem] lg:text-[22rem] font-black text-white/[0.02] leading-none z-0 overflow-hidden">
                    {spread.year}
                  </div>

                  {/* Header Bar */}
                  <header className="relative z-10 animate-reveal flex flex-wrap items-center justify-between border-b border-white/10 pb-4 sm:pb-6 gap-3 sm:gap-4">
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <Sparkles className="w-4 h-4 text-[#e5c158]" />
                      <span className="font-general text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] sm:tracking-[0.35em] text-[#e5c158]">
                        {spread.tag}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-[#0c0d12]/90 border border-white/10 shadow-lg">
                      <Calendar className="w-3.5 h-3.5 text-[#e5c158]" />
                      <span className="font-general text-[10px] sm:text-[11px] font-semibold tracking-wider text-[#f0f0f5]/80 uppercase">
                        {spread.badge}
                      </span>
                    </div>
                  </header>

                  {/* Editorial Layout Spreads */}
                  <div
                    className={`relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center mt-6 sm:mt-8 ${
                      isEven ? '' : 'lg:flex-row-reverse'
                    }`}
                  >
                    {/* Text Column */}
                    <div className={`lg:col-span-5 flex flex-col gap-4 sm:gap-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                      
                      <div className="animate-reveal flex flex-col gap-2.5 sm:gap-3">
                        <BlurText
                          text={spread.headline}
                          delay={140}
                          animateBy="words"
                          direction="top"
                          className="font-general text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#f0f0f5] leading-tight"
                        />

                        <div className="border-l-2 border-[#e5c158] pl-3 sm:pl-4 mt-1.5 sm:mt-2">
                          <BlurText
                            text={spread.quote}
                            delay={100}
                            animateBy="words"
                            direction="bottom"
                            className="font-general italic text-sm sm:text-base lg:text-lg text-[#e5c158]/90 leading-relaxed"
                          />
                        </div>
                      </div>

                      <ul className="animate-reveal flex flex-col gap-3 sm:gap-4 my-1.5 sm:my-2 text-xs sm:text-base text-[#f0f0f5]/80 leading-relaxed font-normal">
                        {spread.bullets.map((b, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 sm:gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#e5c158] mt-1.5 shrink-0 shadow-[0_0_8px_#e5c158]" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>

                      {spread.milestones && (
                        <div className="animate-reveal flex flex-wrap gap-2 sm:gap-2.5 mt-1.5 sm:mt-2">
                          {spread.milestones.map((ms, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-xl bg-[#e5c158]/10 border border-[#e5c158]/30 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#e5c158]"
                            >
                              <TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                              <span>{ms}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* YOU WERE THERE — direct address moment, only in 2026 */}
                      {spread.youWereThere && (
                        <div
                          className="animate-reveal mt-3 w-full px-5 py-4 rounded-2xl border border-[#e5c158]/25 bg-[#e5c158]/5 backdrop-blur-sm"
                          style={{ animation: 'fadeIn 1.4s ease-out 0.6s both' }}
                        >
                          <p className="font-serif italic text-sm sm:text-base text-[#f0f0f5]/85 leading-relaxed">
                            If you're reading this, you're one of the 5 million.
                            <span className="block mt-1.5 text-[#e5c158] not-italic font-general text-xs font-bold uppercase tracking-[0.25em]">
                              This chapter belongs to you too. ✦
                            </span>
                          </p>
                        </div>
                      )}

                      {/* ANIMATED MILESTONE COUNTER FOR 2023 (500K), 2024 (2.5M), 2025 (4M), 2026 (5M) */}
                      <div className="animate-reveal w-full mt-2">
                        <MilestoneCounter
                          targetValue={
                            spread.year === '2023'
                              ? 500000
                              : spread.year === '2024'
                              ? 2500000
                              : spread.year === '2025'
                              ? 4000000
                              : 5000000
                          }
                          label={
                            spread.year === '2023'
                              ? '500K Subscribers'
                              : spread.year === '2024'
                              ? '2.5M Subscribers'
                              : spread.year === '2025'
                              ? '4.0M Family Impact'
                              : '5.0M Summit Milestone'
                          }
                          subtitle={`${spread.year} Milestone Reached`}
                          badgeText={`${spread.year} Milestone`}
                          badgeColor={
                            spread.year === '2023'
                              ? '#f59e0b'
                              : spread.year === '2024'
                              ? '#72a5cf'
                              : spread.year === '2025'
                              ? '#c29be4'
                              : '#e5c158'
                          }
                        />
                      </div>

                      {/* MOBILE INTERACTIVE PHOTO CARDS GALLERY */}
                      <div className="md:hidden grid grid-cols-2 gap-3 mt-4">
                        {spread.driftItems.slice(0, 4).map((item, itemIdx) => (
                          <button
                            key={itemIdx}
                            onClick={() =>
                              setSelectedDriftItem({
                                item,
                                year: spread.year,
                                tag: spread.tag,
                                quote: spread.quote,
                              })
                            }
                            className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#e5c158]/30 shadow-lg active:scale-95 transition-transform"
                          >
                            <img
                              src={item.image}
                              alt={item.title}
                              style={getAssetObjectPositionStyle(item.image)}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2">
                              <span className="text-[10px] font-bold text-[#e5c158] truncate">{item.title}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* MOBILE ATMOSPHERIC BACKGROUND DRIFTWALL (NON-CLICKABLE BEHIND TEXT) */}
                    <div className="md:hidden absolute inset-0 pointer-events-none opacity-20 filter blur-[2px] scale-110 z-0 overflow-hidden rounded-3xl">
                      <DriftWall
                        items={spread.driftItems}
                        columns={3}
                        tileWidth={110}
                        tileHeight={120}
                        gap={6}
                        tilt={15}
                        turn={-10}
                        perspective={1200}
                        depth={200}
                        speed={30}
                        direction="down"
                        dim={0.5}
                        overlayColor="#0B0B0F"
                        radius={16}
                        roll={-5}
                        pauseOnHover={false}
                        grayscale={false}
                      />
                    </div>

                    {/* DESKTOP INTERACTIVE 3D DRIFTWALL MEDIA FRAME */}
                    <div className={`hidden md:block lg:col-span-7 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                      <div className="animate-reveal relative w-full h-[500px] md:h-[620px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                        <DriftWall
                          items={spread.driftItems}
                          columns={5}
                          tileWidth={135}
                          tileHeight={145}
                          gap={8}
                          tilt={21}
                          turn={-14}
                          perspective={1550}
                          depth={380}
                          speed={42}
                          direction="down"
                          dim={0.45}
                          overlayColor="#0B0B0F"
                          radius={22}
                          roll={-8}
                          pauseOnHover={false}
                          grayscale={false}
                          onItemClick={(item) =>
                            setSelectedDriftItem({
                              item,
                              year: spread.year,
                              tag: spread.tag,
                              quote: spread.quote,
                            })
                          }
                        />
                      </div>
                    </div>

                  </div>
                </MagicBento>
              </GradualBlur>
              </article>

              {/* CHAPTER BRIDGE — cinematic breath between years */}
              {spreadIdx < MAGAZINE_SPREADS.length - 1 && BRIDGE_PHRASES[spread.year] && (
                <div className="relative flex flex-col items-center justify-center py-8 sm:py-12 gap-5 animate-reveal">
                  {/* Top hairline */}
                  <div className="w-full max-w-xs h-px bg-gradient-to-r from-transparent via-[#e5c158]/40 to-transparent" />

                  {/* Bridge content */}
                  <div className="flex flex-col items-center gap-2 px-6 text-center">
                    <span className="text-[#e5c158]/50 text-lg select-none">✦</span>
                    <p className="font-serif italic text-base sm:text-xl text-[#f0f0f5]/55 tracking-wide leading-relaxed max-w-sm">
                      {BRIDGE_PHRASES[spread.year]}
                    </p>
                  </div>

                  {/* Bottom hairline */}
                  <div className="w-full max-w-xs h-px bg-gradient-to-r from-transparent via-[#e5c158]/40 to-transparent" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* DRIFTWALL PHOTO POPUP LIGHTBOX MODAL */}
      {selectedDriftItem && (
        <div
          onClick={() => setSelectedDriftItem(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/92 backdrop-blur-2xl animate-fade-in cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full p-5 sm:p-8 md:p-10 rounded-3xl bg-[#0c0d12] border border-[#e5c158]/40 flex flex-col items-center gap-5 sm:gap-6 shadow-[0_0_90px_rgba(229,193,88,0.25)] text-center cursor-default animate-fade-in max-h-[92vh] overflow-y-auto custom-scrollbar"
          >
            <button
              onClick={() => setSelectedDriftItem(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 sm:p-2.5 rounded-full bg-white/5 border border-white/15 text-[#f0f0f5]/70 hover:text-[#e5c158] hover:border-[#e5c158] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Uncropped Full Image Container */}
            <div className="w-full max-h-[52vh] sm:max-h-[62vh] md:max-h-[68vh] rounded-2xl overflow-hidden border border-white/10 bg-[#050507] p-2 flex items-center justify-center shadow-2xl">
              <img
                src={selectedDriftItem.item.image}
                alt={selectedDriftItem.item.title}
                className="max-w-full max-h-[48vh] sm:max-h-[58vh] md:max-h-[64vh] object-contain rounded-xl"
              />
            </div>

            <div className="flex flex-col gap-1.5 sm:gap-2 max-w-xl px-2">
              <span className="font-general text-[11px] sm:text-xs font-bold uppercase tracking-[0.3em] text-[#e5c158]">
                {selectedDriftItem.year} • {selectedDriftItem.item.title}
              </span>
              <h4 className="font-serif italic text-xl sm:text-2xl md:text-3xl text-[#f0f0f5] leading-snug">
                {selectedDriftItem.quote}
              </h4>
            </div>

            <SpecularButton
              size="md"
              radius={20}
              lineColor="#e5c158"
              baseColor="#0c0d12"
              onClick={() => setSelectedDriftItem(null)}
              className="mt-1 sm:mt-2 px-6 sm:px-8"
            >
              <span>Return to Timeline ✨</span>
            </SpecularButton>
          </div>
        </div>
      )}
    </section>
  );
};

export default TimelineScene;
