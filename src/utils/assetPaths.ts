/**
 * Centralized Asset Registry & Path Configuration
 * Never hardcode asset paths directly in UI components.
 * Everything can be overridden or configured dynamically.
 */

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
  audio: {
    ambientMusic: '/assets/audio/ambient.mp3',
    backgroundMusic: '/assets/audio/background.mp3',
  },
} as const;

export async function checkAssetExists(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, { method: 'HEAD' });
    return res.ok;
  } catch {
    return false;
  }
}
