import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getAssetObjectPositionStyle } from '../utils/assetPaths';

gsap.registerPlugin(ScrollTrigger);

export interface ScrollExpandProps {
  src: string;
  alt?: string;
  title?: string;
  scrollHint?: string;
  useWindowScroll?: boolean;
  startWidth?: number; // e.g. 42
  startHeight?: number; // e.g. 58
  startRadius?: number; // e.g. 24
  endRadius?: number; // e.g. 0
  mediaZoom?: number; // e.g. 1.35
  scrollDistance?: number;
  holdDistance?: number;
  smoothing?: number;
  overlayScrim?: number; // e.g. 0.45
  enabled?: boolean;
  isVideo?: boolean;
  onExpandComplete?: () => void;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const ScrollExpand: React.FC<ScrollExpandProps> = ({
  src,
  alt = 'Hero media',
  title,
  scrollHint = 'Scroll inside the frame',
  startWidth = 42,
  startHeight = 58,
  startRadius = 24,
  endRadius = 0,
  mediaZoom = 1.35,
  overlayScrim = 0.45,
  isVideo = false,
  onExpandComplete,
  children,
  className = '',
  style = {},
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mediaRef = useRef<HTMLDivElement | null>(null);
  const hasCompletedRef = useRef(false);

  const [progress, setProgress] = useState(0);
  const checkIsVideo = isVideo || src.endsWith('.mp4') || src.includes('reference');

  useEffect(() => {
    if (!containerRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom top',
      scrub: 0.8,
      onUpdate: (self) => {
        const p = self.progress;
        setProgress(p);

        if (p >= 0.95 && onExpandComplete && !hasCompletedRef.current) {
          hasCompletedRef.current = true;
          onExpandComplete();
        }
      },
    });

    return () => trigger.kill();
  }, [onExpandComplete]);

  const currentWidth = startWidth + (100 - startWidth) * progress;
  const currentHeight = startHeight + (100 - startHeight) * progress;
  const currentRadius = startRadius - (startRadius - endRadius) * progress;
  const currentZoom = 1 + (mediaZoom - 1) * progress;
  const currentScrim = overlayScrim * progress;

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-screen overflow-hidden select-none flex items-center justify-center ${className}`}
      style={style}
    >
      {/* Background Media Placeholder Layer */}
      <div className="absolute inset-0 z-0 bg-[#0B0B0F]">
        {checkIsVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            src={src}
            className="w-full h-full object-cover opacity-20 filter blur-sm scale-110"
          />
        ) : (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover opacity-20 filter blur-sm scale-110"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0F] via-transparent to-[#0B0B0F]" />
      </div>

      {/* Expanding Frame Element */}
      <div
        ref={mediaRef}
        className="relative z-10 overflow-hidden shadow-[0_0_80px_rgba(229,193,88,0.25)] transition-all duration-100 ease-out border border-[#e5c158]/40 flex items-center justify-center"
        style={{
          width: `${currentWidth}%`,
          height: `${currentHeight}%`,
          borderRadius: `${currentRadius}px`,
        }}
      >
        {/* Main Media Video or Image */}
        {checkIsVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            src={src}
            className="w-full h-full object-cover transition-transform duration-100 filter brightness-110 contrast-105"
            style={{ transform: `scale(${currentZoom})` }}
          />
        ) : (
          <img
            src={src}
            alt={alt}
            style={{
              transform: `scale(${currentZoom})`,
              ...getAssetObjectPositionStyle(src),
            }}
            className="w-full h-full object-cover transition-transform duration-100"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        )}

        {/* Fallback Atmospheric Gradient Card */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0c0d12] via-[#1a1b26] to-[#0B0B0F] -z-10" />

        {/* Dynamic Overlay Scrim */}
        <div
          className="absolute inset-0 bg-black transition-opacity duration-100"
          style={{ opacity: currentScrim }}
        />

        {/* Overlay Content & Title */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-8 text-center gap-4">
          {title && (
            <h2 className="font-general text-3xl sm:text-6xl font-black text-[#f0f0f5] tracking-tight drop-shadow-[0_0_40px_rgba(229,193,88,0.5)]">
              {title}
            </h2>
          )}

          {children}

          {scrollHint && progress < 0.8 && (
            <div className="mt-4 flex items-center gap-2 px-5 py-2 rounded-full bg-[#0c0d12]/90 border border-[#e5c158]/40 backdrop-blur-md animate-pulse shadow-xl">
              <span className="font-general text-xs font-bold uppercase tracking-widest text-[#e5c158]">
                ↓ {scrollHint}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScrollExpand;
