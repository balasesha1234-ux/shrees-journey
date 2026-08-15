/**
 * Centralized Asset Registry & Path Configuration
 * Never hardcode asset paths directly in UI components.
 * Everything can be overridden or configured dynamically.
 */
import React from 'react';

export interface FocalPoint {
  x: number; // 0 to 100 percentage
  y: number; // 0 to 100 percentage
}

export interface AssetMeta {
  src: string;
  focalPoint?: FocalPoint;
  alt?: string;
}

export const ASSET_PATHS = {
  guide: {
    characterImage: '/assets/guide/guide.png',
  },
  backgrounds: {
    intro: '/assets/backgrounds/intro.jpg',
    y2023: '/assets/backgrounds/2023.jpg',
    y2024: '/assets/backgrounds/2024.jpg',
    y2025: '/assets/backgrounds/2025.jpg',
    y2026: '/assets/backgrounds/2026.jpg',
  },
  world: {
    masterVideo: '/assets/world/background.mp4',
    level1Video: '/assets/world/level-1.mp4',
    level2Video: '/assets/world/level-2.mp4',
    level3Video: '/assets/world/level-3.mp4',
    level4Video: '/assets/world/level-4.mp4',
    level5Video: '/assets/world/level-5.mp4',
  },
  intro: {
    montageVideo: '/assets/intro/montage.mp4',
    skyLoopVideo: '/assets/intro/sky-loop.mp4',
    cloudsVideo: '/assets/intro/clouds.mp4',
    referenceVideo: '/reference.mp4',
  },
  timeline: {
    y2023: {
      heroImage: '/assets/timeline/2023/hero.jpg',
      gallery1: '/assets/timeline/2023/gallery-1.jpg',
      gallery2: '/assets/timeline/2023/gallery-2.jpg',
      landscape: '/assets/timeline/2023/landscape.jpg',
      video: '/assets/timeline/2023/video.mp4',
    },
    y2024: {
      heroImage: '/assets/timeline/2024/hero.jpg',
      gallery1: '/assets/timeline/2024/gallery-1.jpg',
      gallery2: '/assets/timeline/2024/gallery-2.jpg',
      landscape: '/assets/timeline/2024/landscape.jpg',
      video: '/assets/timeline/2024/video.mp4',
    },
    y2025: {
      heroImage: '/assets/timeline/2025/hero.jpg',
      gallery1: '/assets/timeline/2025/gallery-1.jpg',
      gallery2: '/assets/timeline/2025/gallery-2.jpg',
      gallery3: '/assets/timeline/2025/gallery-3.jpg',
      gallery4: '/assets/timeline/2025/gallery-4.jpg',
      gallery5: '/assets/timeline/2025/gallery-5.jpg',
      landscape: '/assets/timeline/2025/landscape.jpg',
      video: '/assets/timeline/2025/video.mp4',
    },
    y2026: {
      heroImage: '/assets/timeline/2026/hero.jpg',
      gallery1: '/assets/timeline/2026/gallery-1.jpg',
      gallery2: '/assets/timeline/2026/gallery-2.jpg',
      gallery3: '/assets/timeline/2026/gallery-3.jpg',
      gallery4: '/assets/timeline/2026/gallery-4.jpg',
      gallery5: '/assets/timeline/2026/gallery-5.jpg',
      gallery6: '/assets/timeline/2026/gallery-6.jpg',
      landscape: '/assets/timeline/2026/landscape.jpg',
      video: '/assets/timeline/2026/video.mp4',
    },
  },
  ending: {
    treeImage: '/assets/ending/tree.jpg',
    treeVideo: '/assets/ending/tree.mp4',
  },
  cinematicMoments: {
    moment1: '/assets/moments/moment1.jpg',
    moment2: '/assets/moments/moment2.jpg',
    moment3: '/assets/moments/moment3.jpg',
    moment4: '/assets/moments/moment4.jpg',
    moment5: '/assets/moments/moment5.jpg',
    moment6: '/assets/moments/moment6.jpg',
  },
  serial: [
    '/assets/serial/1s.jpg',
    '/assets/serial/2s.jpg',
    '/assets/serial/3s.jpg',
    '/assets/serial/4s.jpg',
    '/assets/serial/5s.jpg',
    '/assets/serial/6s.jpg',
    '/assets/serial/7s.jpg',
    '/assets/serial/8s.jpg',
    '/assets/serial/9s.jpg',
    '/assets/serial/10s.jpg',
    '/assets/serial/11s.jpg',
    '/assets/serial/12s old.jpg',
    '/assets/serial/13s old.jpg',
    '/assets/serial/14s old.jpg',
    '/assets/serial/15s old.jpg',
    '/assets/serial/16s old.jpg',
    '/assets/serial/17s mid.jpg',
    '/assets/serial/18s mid.jpg',
    '/assets/serial/19s mid.jpg',
    '/assets/serial/20s mid.jpg',
    '/assets/serial/21s.jpg',
    '/assets/serial/22s.jpg',
    '/assets/serial/23s.jpg',
    '/assets/serial/24s.jpg',
    '/assets/serial/25s.jpg',
    '/assets/serial/26s.jpg',
    '/assets/serial/27s.jpg',
    '/assets/serial/28s.jpg',
    '/assets/serial/29s.jpg',
    '/assets/serial/30s.jpg',
    '/assets/serial/31s.jpg',
    '/assets/serial/32s.jpg',
    '/assets/serial/33s.jpg',
  ],
  audio: {
    ambientMusic: '/assets/audio/ambient.mp3',
    backgroundMusic: '/assets/audio/background.mp3',
  },
} as const;

export interface AssetFraming {
  objectPosition: string;
  scale?: number;
  objectFit?: 'cover' | 'contain';
  focalPoint?: FocalPoint;
  aspectRatio?: string;
}

/**
 * Central Focal Point Registry for Assets.
 * Maps exact image paths to custom focal positions (X% Y%).
 * Tuned specifically for 9:16 portrait and landscape compositions.
 */
export const ASSET_FOCAL_POINTS: Record<string, FocalPoint> = {
  // Timeline 2026 (5 Million Era - Summit)
  '/assets/timeline/2026/hero.jpg': { x: 50, y: 16 },
  '/assets/timeline/2026/gallery-1.jpg': { x: 50, y: 18 },
  '/assets/timeline/2026/gallery-2.jpg': { x: 50, y: 16 },
  '/assets/timeline/2026/gallery-3.jpg': { x: 50, y: 22 },
  '/assets/timeline/2026/gallery-4.jpg': { x: 50, y: 20 },
  '/assets/timeline/2026/gallery-5.jpg': { x: 50, y: 18 },
  '/assets/timeline/2026/gallery-6.jpg': { x: 50, y: 20 },
  '/assets/timeline/2026/landscape.jpg': { x: 50, y: 50 },

  // Timeline 2025 (Global Impact Era)
  '/assets/timeline/2025/hero.jpg': { x: 50, y: 18 },
  '/assets/timeline/2025/gallery-1.jpg': { x: 50, y: 20 },
  '/assets/timeline/2025/gallery-2.jpg': { x: 50, y: 22 },
  '/assets/timeline/2025/gallery-3.jpg': { x: 50, y: 18 },
  '/assets/timeline/2025/gallery-4.jpg': { x: 50, y: 20 },
  '/assets/timeline/2025/gallery-5.jpg': { x: 45, y: 22 },
  '/assets/timeline/2025/landscape.jpg': { x: 50, y: 50 },

  // Timeline 2024 (1M Breakthrough Era)
  '/assets/timeline/2024/hero.jpg': { x: 50, y: 18 },
  '/assets/timeline/2024/gallery-1.jpg': { x: 50, y: 18 },
  '/assets/timeline/2024/gallery-2.jpg': { x: 50, y: 22 },
  '/assets/timeline/2024/landscape.jpg': { x: 50, y: 50 },

  // Timeline 2023 (Inception Era)
  '/assets/timeline/2023/hero.jpg': { x: 50, y: 16 },
  '/assets/timeline/2023/gallery-1.jpg': { x: 50, y: 18 },
  '/assets/timeline/2023/gallery-2.jpg': { x: 50, y: 20 },
  '/assets/timeline/2023/landscape.jpg': { x: 50, y: 50 },

  // Cinematic Moments
  '/assets/moments/moment1.jpg': { x: 50, y: 18 },
  '/assets/moments/moment2.jpg': { x: 50, y: 16 },
  '/assets/moments/moment3.jpg': { x: 50, y: 22 },
  '/assets/moments/moment4.jpg': { x: 50, y: 18 },
  '/assets/moments/moment5.jpg': { x: 50, y: 16 },
  '/assets/moments/moment6.jpg': { x: 50, y: 20 },

  // Guide & Ending
  '/assets/guide/guide.png': { x: 50, y: 25 },
  '/assets/ending/tree.jpg': { x: 50, y: 50 },

  // Backgrounds
  '/assets/backgrounds/intro.jpg': { x: 50, y: 20 },
  '/assets/backgrounds/2023.jpg': { x: 50, y: 22 },
  '/assets/backgrounds/2024.jpg': { x: 50, y: 22 },
  '/assets/backgrounds/2025.jpg': { x: 50, y: 20 },
  '/assets/backgrounds/2026.jpg': { x: 50, y: 18 },

  // Grid Motion & Serial Images (/assets/serial/)
  '/assets/serial/1s.jpg': { x: 50, y: 16 },
  '/assets/serial/2s.jpg': { x: 50, y: 18 },
  '/assets/serial/3s.jpg': { x: 50, y: 22 },
  '/assets/serial/4s.jpg': { x: 50, y: 22 },
  '/assets/serial/5s.jpg': { x: 50, y: 16 },
  '/assets/serial/6s.jpg': { x: 50, y: 18 },
  '/assets/serial/7s.jpg': { x: 50, y: 16 },
  '/assets/serial/8s.jpg': { x: 50, y: 22 },
  '/assets/serial/9s.jpg': { x: 50, y: 16 },
  '/assets/serial/10s.jpg': { x: 50, y: 18 },
  '/assets/serial/11s.jpg': { x: 50, y: 16 },
  '/assets/serial/12s old.jpg': { x: 50, y: 20 },
  '/assets/serial/13s old.jpg': { x: 50, y: 18 },
  '/assets/serial/14s old.jpg': { x: 50, y: 18 },
  '/assets/serial/15s old.jpg': { x: 50, y: 22 },
  '/assets/serial/16 s old.jpg': { x: 50, y: 20 },
  '/assets/serial/16s old.jpg': { x: 50, y: 20 },
  '/assets/serial/17s mid.jpg': { x: 50, y: 18 },
  '/assets/serial/18s mid.jpg': { x: 50, y: 18 },
  '/assets/serial/19s mid.jpg': { x: 50, y: 18 },
  '/assets/serial/20s mid.jpg': { x: 50, y: 20 },
  '/assets/serial/21s.jpg': { x: 50, y: 16 },
  '/assets/serial/22s.jpg': { x: 50, y: 22 },
  '/assets/serial/23s.jpg': { x: 50, y: 16 },
  '/assets/serial/24s.jpg': { x: 50, y: 20 },
  '/assets/serial/25s.jpg': { x: 50, y: 18 },
  '/assets/serial/26s.jpg': { x: 50, y: 16 },
  '/assets/serial/27s.jpg': { x: 50, y: 18 },
  '/assets/serial/28s.jpg': { x: 50, y: 18 },
  '/assets/serial/29s.jpg': { x: 50, y: 16 },
  '/assets/serial/30s.jpg': { x: 50, y: 20 },
  '/assets/serial/31s.jpg': { x: 50, y: 16 },
  '/assets/serial/32s.jpg': { x: 50, y: 18 },
  '/assets/serial/33s.jpg': { x: 50, y: 18 },

  // Root path fallbacks
  '/1s.jpg': { x: 50, y: 16 },
  '/2s.jpg': { x: 50, y: 18 },
  '/3s.jpg': { x: 50, y: 22 },
  '/4s.jpg': { x: 50, y: 22 },
  '/5s.jpg': { x: 50, y: 16 },
  '/6s.jpg': { x: 50, y: 18 },
  '/7s.jpg': { x: 50, y: 16 },
  '/8s.jpg': { x: 50, y: 22 },
  '/9s.jpg': { x: 50, y: 16 },
  '/10s.jpg': { x: 50, y: 18 },
  '/11s.jpg': { x: 50, y: 16 },
  '/12s old.jpg': { x: 50, y: 20 },
  '/13s old.jpg': { x: 50, y: 18 },
  '/14s old.jpg': { x: 50, y: 18 },
  '/15s old.jpg': { x: 50, y: 22 },
  '/16s old.jpg': { x: 50, y: 20 },
  '/17s mid.jpg': { x: 50, y: 18 },
  '/18s mid.jpg': { x: 50, y: 18 },
  '/19s mid.jpg': { x: 50, y: 18 },
  '/20s mid.jpg': { x: 50, y: 20 },
  '/21s.jpg': { x: 50, y: 16 },
  '/22s.jpg': { x: 50, y: 22 },
  '/23s.jpg': { x: 50, y: 16 },
  '/24s.jpg': { x: 50, y: 20 },
  '/25s.jpg': { x: 50, y: 18 },
  '/26s.jpg': { x: 50, y: 16 },
  '/27s.jpg': { x: 50, y: 18 },
};

/**
 * Gets focal point for any asset URL with intelligent fallbacks.
 */
export const getAssetFocalPoint = (src?: string | null, customFocalPoint?: FocalPoint): FocalPoint => {
  if (customFocalPoint) {
    return customFocalPoint;
  }
  if (!src) {
    return { x: 50, y: 18 };
  }

  // Exact match lookup
  if (ASSET_FOCAL_POINTS[src]) {
    return ASSET_FOCAL_POINTS[src];
  }

  const decodedPath = decodeURIComponent(src).split('?')[0];
  if (ASSET_FOCAL_POINTS[decodedPath]) {
    return ASSET_FOCAL_POINTS[decodedPath];
  }

  // Normalized path match lookup
  const cleanPath = src.split('?')[0];
  if (ASSET_FOCAL_POINTS[cleanPath]) {
    return ASSET_FOCAL_POINTS[cleanPath];
  }

  // If path is missing /assets/serial/, try adding it
  const serialPath = cleanPath.startsWith('/assets/serial/')
    ? cleanPath
    : `/assets/serial${cleanPath.startsWith('/') ? cleanPath : '/' + cleanPath}`;
  if (ASSET_FOCAL_POINTS[serialPath]) {
    return ASSET_FOCAL_POINTS[serialPath];
  }

  const decodedSerialPath = decodeURIComponent(serialPath);
  if (ASSET_FOCAL_POINTS[decodedSerialPath]) {
    return ASSET_FOCAL_POINTS[decodedSerialPath];
  }

  const lower = src.toLowerCase();

  // Landscape photos fallback
  if (lower.includes('landscape') || lower.includes('tree') || lower.includes('horizon')) {
    return { x: 50, y: 50 };
  }

  // Default face-focus fallback for person/portrait photos (tuned to 18% to preserve head/crown)
  return { x: 50, y: 18 };
};

/**
 * Formats CSS object-position for <img> tags
 */
export const getAssetObjectPosition = (src?: string | null, customFocalPoint?: FocalPoint): string => {
  const fp = getAssetFocalPoint(src, customFocalPoint);
  return `${fp.x}% ${fp.y}%`;
};

/**
 * Formats inline style object with objectPosition for <img> tags
 */
export const getAssetObjectPositionStyle = (
  src?: string | null,
  customFocalPoint?: FocalPoint
): React.CSSProperties => {
  return {
    objectPosition: getAssetObjectPosition(src, customFocalPoint),
  };
};

/**
 * Formats inline style object with backgroundPosition for div elements
 */
export const getAssetBackgroundPositionStyle = (
  src?: string | null,
  customFocalPoint?: FocalPoint
): React.CSSProperties => {
  return {
    backgroundPosition: getAssetObjectPosition(src, customFocalPoint),
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };
};

export async function checkAssetExists(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, { method: 'HEAD' });
    return res.ok;
  } catch {
    return false;
  }
}
