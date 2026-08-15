/**
 * Intelligent Image Preloader & Critical Asset Warm-up System
 * Preloads immediately visible viewport assets to eliminate layout shifts,
 * blank frames, and image pop-in flickering.
 */
import { ASSET_PATHS } from './assetPaths';

export const CRITICAL_PRELOAD_ASSETS: string[] = [
  // Primary hero photo and opening background
  ASSET_PATHS.timeline.y2026.heroImage,
  ASSET_PATHS.timeline.y2023.heroImage,
  ASSET_PATHS.backgrounds.intro,
  
  // Initial 9 serial photos visible on the OpeningScene moving grid
  '/assets/serial/1s.jpg',
  '/assets/serial/2s.jpg',
  '/assets/serial/3s.jpg',
  '/assets/serial/4s.jpg',
  '/assets/serial/5s.jpg',
  '/assets/serial/6s.jpg',
  '/assets/serial/7s.jpg',
  '/assets/serial/8s.jpg',
  '/assets/serial/9s.jpg',
];

/**
 * Preloads an individual image asset and returns a Promise.
 */
export function preloadImage(src: string): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(true);
      return;
    }

    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;

    // If browser already has image in cache
    if (img.complete) {
      resolve(true);
    }
  });
}

/**
 * Warms up critical above-the-fold assets in parallel.
 * Includes a safety timeout so it never blocks app initialization.
 */
export async function preloadCriticalAssets(timeoutMs: number = 2200): Promise<void> {
  if (typeof window === 'undefined') return;

  const preloadPromises = CRITICAL_PRELOAD_ASSETS.map((src) => preloadImage(src));

  const timeoutPromise = new Promise<void>((resolve) => {
    setTimeout(resolve, timeoutMs);
  });

  await Promise.race([Promise.all(preloadPromises), timeoutPromise]);
}
