import React from 'react';

export const FilmGrain: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[998] opacity-[0.05] mix-blend-overlay overflow-hidden">
      <svg className="w-full h-full">
        <filter id="filmGrainNoise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#filmGrainNoise)" />
      </svg>
    </div>
  );
};
