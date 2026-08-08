import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ASSET_PATHS } from '../utils/assetPaths';
import { SectionBackground } from '../components/SectionBackground';
import DriftWall from '../components/DriftWall';
import type { DriftWallItem } from '../components/DriftWall';
import BlurText from '../components/BlurText';
import MagicBento from '../components/MagicBento';
import OptionWheel from '../components/OptionWheel';
import GradualBlur from '../components/GradualBlur';
import DotField from '../components/DotField';
import { Calendar, Sparkles, TrendingUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface YearSpreadData {
  year: '2023' | '2024' | '2025' | '2026';
  tag: string;
  badge: string;
  headline: string;
  quote: string;
  bullets: string[];
  milestones?: string[];
  bgImage: string;
  driftItems: DriftWallItem[];
}

const MAGAZINE_SPREADS: YearSpreadData[] = [
  {
    year: '2023',
    tag: 'AUGUST 2023 • WARM SUNRISE',
    badge: 'Started August 2023',
    headline: 'The Quiet Inception of a Grand Dream',
    quote: '“Small, quiet beginnings lay the groundwork for legendary journeys.”',
    bullets: [
      'Started creating content with pure intention and unwavering faith.',
      'Embracing the journey of continuous learning and daily consistency.',
      'Nurturing early dreams that would soon inspire millions.',
    ],
    bgImage: ASSET_PATHS.backgrounds.y2023,
    driftItems: [
      { image: ASSET_PATHS.timeline.y2023.heroImage, title: '2023 Inception' },
      { image: ASSET_PATHS.timeline.y2023.gallery1, title: 'First Steps' },
      { image: ASSET_PATHS.timeline.y2023.gallery2, title: 'Quiet Faith' },
      { image: ASSET_PATHS.timeline.y2023.landscape, title: 'Early Vision' },
    ],
  },
  {
    year: '2024',
    tag: '2024 • GOLDEN DAYLIGHT',
    badge: 'Massive Breakthrough',
    headline: 'Surging Momentum & Rapid Growth',
    quote: '“When authenticity meets passion, momentum becomes unstoppable.”',
    bullets: [
      'A massive breakthrough that united hundreds of thousands worldwide.',
      'Connecting deeply with an expanding, vibrant community.',
      'Turning everyday effort into unforgettable shared milestones.',
    ],
    milestones: ['500K Milestone', '1 Million Family', '2 Million Breakthrough'],
    bgImage: ASSET_PATHS.backgrounds.y2024,
    driftItems: [
      { image: ASSET_PATHS.timeline.y2024.heroImage, title: '1 Million Breakthrough' },
      { image: ASSET_PATHS.timeline.y2024.gallery1, title: '500K Spark' },
      { image: ASSET_PATHS.timeline.y2024.gallery2, title: 'Community Wave' },
      { image: ASSET_PATHS.timeline.y2024.landscape, title: 'Growth Horizon' },
    ],
  },
  {
    year: '2025',
    tag: '2025 • GOLDEN-ORANGE SUNSET',
    badge: 'Deepened Impact',
    headline: 'Growth Continued Across Boundaries',
    quote: '“True impact is measured not just in numbers, but in lives transformed.”',
    bullets: [
      'Growth continued gracefully as the message reached a larger global audience.',
      'Creating deeper impact and weaving timeless memories with the community.',
      'Solidifying a foundation of purpose, creativity, and mutual trust.',
    ],
    bgImage: ASSET_PATHS.backgrounds.y2025,
    driftItems: [
      { image: ASSET_PATHS.timeline.y2025.heroImage, title: 'Global Reach' },
      { image: ASSET_PATHS.timeline.y2025.gallery1, title: 'Deep Connections' },
      { image: ASSET_PATHS.timeline.y2025.gallery2, title: 'Creative Purpose' },
      { image: ASSET_PATHS.timeline.y2025.gallery3, title: 'Memory 21s' },
      { image: ASSET_PATHS.timeline.y2025.gallery4, title: 'Memory 22s' },
      { image: ASSET_PATHS.timeline.y2025.gallery5, title: 'Memory 23s' },
      { image: ASSET_PATHS.timeline.y2025.landscape, title: 'Expanding Impact' },
    ],
  },
  {
    year: '2026',
    tag: '2026 • DEEP BLUE TWILIGHT',
    badge: '5 Million Reached',
    headline: 'The Dream Became Reality',
    quote: '“Where a dream transcended into a global family.”',
    bullets: [
      'Reached the monumental summit of 5 Million strong.',
      'Celebrating the journey, the hardships overcome, and the joy ahead.',
      'Where followers became family, and the story continues forever.',
    ],
    milestones: ['5 Million Summit', 'Global Family', 'Eternal Story'],
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
    ],
  },
];

export const TimelineScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeYearIdx, setActiveYearIdx] = useState<number>(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      MAGAZINE_SPREADS.forEach((item, idx) => {
        const sectionEl = document.getElementById(`year-section-${item.year}`);
        if (sectionEl) {
          // Reveal animation per section
          gsap.fromTo(
            sectionEl.querySelectorAll('.animate-reveal'),
            {
              opacity: 0,
              y: 40,
            },
            {
              opacity: 1,
              y: 0,
              duration: 1.4,
              stagger: 0.14,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: sectionEl,
                start: 'top 70%',
              },
            }
          );

          // ScrollTrigger to sync OptionWheel active year based on scroll position
          ScrollTrigger.create({
            trigger: sectionEl,
            start: 'top 50%',
            end: 'bottom 50%',
            onEnter: () => setActiveYearIdx(idx),
            onEnterBack: () => setActiveYearIdx(idx),
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleYearChange = (_index: number, yearItem: string) => {
    const targetEl = document.getElementById(`year-section-${yearItem}`);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

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

      {/* 3D OPTION WHEEL PINNED ROTARY NAVIGATION (DESKTOP ONLY) */}
      <div className="fixed left-3 sm:left-8 top-1/2 -translate-y-1/2 z-40 hidden md:block w-52 h-[480px] pointer-events-auto filter drop-shadow-[0_0_50px_rgba(0,0,0,0.95)]">
        <OptionWheel
          items={['2023', '2024', '2025', '2026']}
          defaultSelected={0}
          selected={activeYearIdx}
          textColor="#8e8e93"
          activeColor="#e5c158"
          side="left"
          fontSize={3.2}
          spacing={1.45}
          curve={1.3}
          tilt={8}
          blur={1.5}
          fade={0.28}
          smoothing={180}
          inset={36}
          loop={false}
          draggable
          onChange={handleYearChange}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 pl-4 sm:pl-6 md:pl-56 lg:pl-64 flex flex-col gap-28 sm:gap-40 md:gap-56 relative z-10">
        
        {MAGAZINE_SPREADS.map((spread, spreadIdx) => {
          const isEven = spreadIdx % 2 === 0;

          return (
            <article
              key={spread.year}
              id={`year-section-${spread.year}`}
              className="relative scroll-mt-24"
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
                    </div>

                    {/* 3D DriftWall Media Frame */}
                    <div className={`lg:col-span-7 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                      <div className="animate-reveal relative w-full h-[360px] sm:h-[480px] md:h-[600px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                        <DriftWall
                          items={spread.driftItems}
                          columns={3}
                          tileWidth={120}
                          tileHeight={126}
                          gap={6}
                          tilt={21}
                          turn={-14}
                          perspective={1550}
                          depth={380}
                          speed={42}
                          direction="down"
                          variance={0.45}
                          parallax={0.6}
                          lift={64}
                          fade={0}
                          dim={0.55}
                          overlayColor="#0B0B0F"
                          radius={25}
                          roll={-8}
                          pauseOnHover={false}
                          grayscale={false}
                        />
                      </div>
                    </div>

                  </div>
                </MagicBento>
              </GradualBlur>
            </article>
          );
        })}

      </div>
    </section>
  );
};
