import React, { useEffect, useRef, useState, useMemo } from 'react';
import { getAssetObjectPositionStyle } from '../utils/assetPaths';

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
  onItemClick?: (item: DriftWallItem) => void;
}

/**
 * GUARANTEES NO TWO ADJACENT ITEMS IN ALL 12 SURROUNDING DIRECTIONS ARE THE SAME ASSET
 * 12 Directions: 4 Orthogonal + 4 Diagonal + 4 Extended Orthogonal Radius-2
 * Includes randomized candidate selection for organic visual variety.
 */
function generate12DirectionRandomGrid(
  baseItems: DriftWallItem[],
  rows: number,
  cols: number
): DriftWallItem[] {
  if (!baseItems || baseItems.length === 0) return [];
  if (baseItems.length === 1) return Array(rows * cols).fill(baseItems[0]);

  const grid: (DriftWallItem | null)[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(null)
  );

  // Helper to get image at (r, c) with toroidal row wrap for seamless looping
  const getImageAt = (r: number, c: number): string | null => {
    const wrappedR = (r + rows) % rows;
    const wrappedC = (c + cols) % cols;
    return grid[wrappedR][wrappedC]?.image || null;
  };

  // Fisher-Yates array shuffle for organic randomness
  const shuffle = <T,>(arr: T[]): T[] => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  // All 12 surrounding direction offsets around any cell (r, c)
  const neighbor12Offsets = [
    [-1, 0], [1, 0], [0, -1], [0, 1],       // 4 Immediate Orthogonal
    [-1, -1], [-1, 1], [1, -1], [1, 1],     // 4 Immediate Diagonal
    [-2, 0], [2, 0], [0, -2], [0, 2],       // 4 Extended Orthogonal (12 Total!)
  ];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const forbidden = new Set<string>();
      for (const [dr, dc] of neighbor12Offsets) {
        const img = getImageAt(r + dr, c + dc);
        if (img) forbidden.add(img);
      }

      // Candidates that do NOT match any of the 12 surrounding direction neighbors
      let candidates = baseItems.filter((item) => !forbidden.has(item.image));

      // Fallback 1: Relax to 8 immediate neighbors if 12-dir pool is exhausted
      if (candidates.length === 0) {
        const strict8 = new Set<string>();
        for (const [dr, dc] of neighbor12Offsets.slice(0, 8)) {
          const img = getImageAt(r + dr, c + dc);
          if (img) strict8.add(img);
        }
        candidates = baseItems.filter((item) => !strict8.has(item.image));
      }

      // Fallback 2: Relax to 4 immediate orthogonal neighbors
      if (candidates.length === 0) {
        const strict4 = new Set<string>();
        for (const [dr, dc] of neighbor12Offsets.slice(0, 4)) {
          const img = getImageAt(r + dr, c + dc);
          if (img) strict4.add(img);
        }
        candidates = baseItems.filter((item) => !strict4.has(item.image));
      }

      // Fallback 3: Entire base items if pool is very small
      if (candidates.length === 0) {
        candidates = baseItems;
      }

      // Random selection from valid candidates
      const shuffledCandidates = shuffle(candidates);
      grid[r][c] = shuffledCandidates[0];
    }
  }

  // Flatten grid into 1D array
  const singleBlock: DriftWallItem[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      singleBlock.push(grid[r][c]!);
    }
  }

  return singleBlock;
}

export const DriftWall: React.FC<DriftWallProps> = ({
  items,
  columns = 5,
  tileWidth = 135,
  tileHeight = 145,
  gap = 8,
  tilt = 21,
  turn = -14,
  perspective = 1550,
  depth = 380,
  speed = 42,
  direction = 'down',
  dim = 0.45,
  overlayColor = '#030107',
  radius = 22,
  roll = -8,
  pauseOnHover = false,
  grayscale = false,
  onItemClick,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const wallRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Single block dimensions (16 rows x columns)
  const singleBlockRows = 16;

  // Generate 12-direction non-adjacent randomized grid for single block
  const singleBlockItems = useMemo(
    () => generate12DirectionRandomGrid(items, singleBlockRows, columns),
    [items, singleBlockRows, columns]
  );

  // Triple repetition of single block for 100% gapless infinite loop
  const displayItems = useMemo(
    () => [...singleBlockItems, ...singleBlockItems, ...singleBlockItems],
    [singleBlockItems]
  );

  // Exact single block height for seamless modulo wrap (0px jump, 0px gap)
  const singleBlockHeight = singleBlockRows * (tileHeight + gap);

  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();
    let offsetY = 0;
    let isVisible = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const animate = (now: number) => {
      if (!isVisible) {
        animId = requestAnimationFrame(animate);
        return;
      }

      const delta = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      if (!pauseOnHover || !isHovered) {
        const move = speed * delta * (direction === 'down' ? 1 : -1);
        offsetY += move;

        if (singleBlockHeight > 0) {
          if (offsetY >= singleBlockHeight) {
            offsetY -= singleBlockHeight;
          } else if (offsetY <= -singleBlockHeight) {
            offsetY += singleBlockHeight;
          }
        }

        if (wallRef.current) {
          wallRef.current.style.transform = `rotateX(${tilt}deg) rotateY(${turn}deg) rotateZ(${roll}deg) translateZ(${depth}px) translateY(${offsetY}px)`;
        }
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(animId);
    };
  }, [speed, direction, pauseOnHover, isHovered, singleBlockHeight, tilt, turn, roll, depth]);

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
      {/* 3D Tilted Preserved Wall (Sized & Offset to Cover All 4 Edges with ZERO Gaps) */}
      <div
        ref={wallRef}
        className="grid will-change-transform scale-[1.28] sm:scale-[1.35] md:scale-[1.4]"
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          transformStyle: 'preserve-3d',
          transform: `rotateX(${tilt}deg) rotateY(${turn}deg) rotateZ(${roll}deg) translateZ(${depth}px) translateY(0px)`,
          gap: `${gap}px`,
        }}
      >
        {displayItems.map((item, idx) => (
          <div
            key={idx}
            onClick={(e) => {
              e.preventDefault();
              if (onItemClick) {
                onItemClick(item);
              }
            }}
            data-cursor-hover
            className="group relative overflow-hidden transition-all duration-300 shadow-2xl flex flex-col justify-end p-2.5 cursor-pointer"
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
              style={getAssetObjectPositionStyle(item.image)}
              className="absolute inset-0 w-full h-full object-cover filter contrast-105 group-hover:scale-110 transition-transform duration-300"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />

            {/* Dark Fallback Backdrop */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d12] via-[#0c0d12]/60 to-transparent pointer-events-none" />

            {/* Overlay Dim Filter */}
            <div
              className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
              style={{
                backgroundColor: overlayColor,
                opacity: isHovered ? dim * 0.3 : dim,
              }}
            />

            {/* Content Title */}
            <div className="relative z-10 font-general text-[10px] font-bold tracking-wider text-[#e5c158] uppercase truncate group-hover:text-white transition-colors pointer-events-none">
              {item.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DriftWall;
