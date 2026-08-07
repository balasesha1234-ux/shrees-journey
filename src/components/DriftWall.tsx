import React, { useEffect, useRef, useState } from 'react';

export interface DriftWallItem {
  image: string;
  title: string;
  href?: string;
  objectPosition?: string;
}

export interface DriftWallProps {
  items: DriftWallItem[];
  columns?: number;
  tileWidth?: number;
  tileHeight?: number;
  gap?: number;
  tilt?: number;
  turn?: number;
  perspective?: number;
  depth?: number;
  speed?: number;
  direction?: 'down' | 'up' | 'left' | 'right';
  variance?: number;
  parallax?: number;
  lift?: number;
  fade?: number;
  dim?: number;
  overlayColor?: string;
  radius?: number;
  roll?: number;
  pauseOnHover?: boolean;
  grayscale?: boolean;
}

export const DriftWall: React.FC<DriftWallProps> = ({
  items,
  columns = 3,
  tileWidth = 120,
  tileHeight = 126,
  gap = 6,
  tilt = 21,
  turn = -14,
  perspective = 1550,
  depth = 380,
  speed = 42,
  direction = 'down',
  dim = 0.55,
  overlayColor = '#030107',
  radius = 25,
  roll = -8,
  pauseOnHover = false,
  grayscale = false,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const wallRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Triple display items for 100% seamless infinite looping stream
  const displayItems = Array.from({ length: 36 }, (_, i) => items[i % items.length]);

  // Calculate single set height for seamless modulo loop
  const totalRows = Math.ceil(items.length / columns);
  const cycleHeight = totalRows * (tileHeight + gap);

  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();
    let offsetY = 0;

    const animate = (now: number) => {
      const delta = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      if (!pauseOnHover || !isHovered) {
        const move = speed * delta * (direction === 'down' ? 1 : -1);
        offsetY += move;

        if (cycleHeight > 0) {
          if (offsetY >= cycleHeight) {
            offsetY -= cycleHeight;
          } else if (offsetY <= -cycleHeight) {
            offsetY += cycleHeight;
          }
        }

        if (wallRef.current) {
          wallRef.current.style.transform = `rotateX(${tilt}deg) rotateY(${turn}deg) rotateZ(${roll}deg) translateZ(${depth}px) translateY(${offsetY}px)`;
        }
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [speed, direction, pauseOnHover, isHovered, cycleHeight, tilt, turn, roll, depth]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full h-full overflow-hidden select-none flex items-center justify-center rounded-3xl"
      style={{
        perspective: `${perspective}px`,
        backgroundColor: overlayColor,
      }}
    >
      {/* 3D Tilted Preserved Wall (GPU Accelerated Direct Transform Updates) */}
      <div
        ref={wallRef}
        className="grid gap-3 will-change-transform"
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          transformStyle: 'preserve-3d',
          transform: `rotateX(${tilt}deg) rotateY(${turn}deg) rotateZ(${roll}deg) translateZ(${depth}px) translateY(0px)`,
          gap: `${gap}px`,
        }}
      >
        {displayItems.map((item, idx) => (
          <a
            key={idx}
            href={item.href || '#'}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className="group relative overflow-hidden transition-all duration-300 shadow-2xl flex flex-col justify-end p-3 cursor-pointer"
            style={{
              width: `${tileWidth}px`,
              height: `${tileHeight}px`,
              borderRadius: `${radius}px`,
              filter: grayscale ? 'grayscale(100%)' : 'none',
            }}
          >
            {/* Background Image / Placeholder */}
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover filter contrast-105 group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />

            {/* Dark Fallback Backdrop */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d12] via-[#0c0d12]/60 to-transparent" />

            {/* Overlay Dim Filter */}
            <div
              className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-20"
              style={{ backgroundColor: overlayColor, opacity: dim }}
            />

            {/* Glowing Accent Border */}
            <div
              className="absolute inset-0 border border-white/10 group-hover:border-[#e5c158]/80 transition-colors duration-300"
              style={{ borderRadius: `${radius}px` }}
            />

            {/* Item Title Badge */}
            <div className="relative z-10 font-general text-[10px] font-extrabold uppercase tracking-widest text-[#e5c158] truncate drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              {item.title}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default DriftWall;
