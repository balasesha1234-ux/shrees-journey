import React from 'react';

interface SectionBackgroundProps {
  src: string;
  opacity?: number;
  year?: '2023' | '2024' | '2025' | '2026' | 'tree';
}

export const SectionBackground: React.FC<SectionBackgroundProps> = ({
  src,
  opacity = 0.25,
  year,
}) => {
  const lightingGradients = {
    '2023': 'from-amber-500/15 via-amber-900/5 to-[#0B0B0F]', // Warm sunrise
    '2024': 'from-yellow-500/15 via-yellow-900/5 to-[#0B0B0F]', // Golden daylight
    '2025': 'from-orange-500/15 via-amber-900/5 to-[#0B0B0F]', // Golden-orange sunset
    '2026': 'from-indigo-600/15 via-blue-950/10 to-[#0B0B0F]', // Deep blue twilight
    'tree': 'from-pink-500/15 via-indigo-950/15 to-[#0B0B0F]', // Soft moonlight & cherry blossom
  };

  const gradientClass = year ? lightingGradients[year] : 'from-[#0e0f17]/30 to-[#0B0B0F]';

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
      {/* Background Image Layer */}
      <img
        src={src}
        alt=""
        className="w-full h-full object-cover filter blur-[2px] scale-105 transition-opacity duration-1000"
        style={{ opacity }}
        onError={(e) => {
          (e.target as HTMLElement).style.display = 'none';
        }}
      />

      {/* Dynamic Year Atmospheric Lighting Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-b ${gradientClass} pointer-events-none z-10`} />

      {/* Top & Bottom Soft Vignette Blends */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0F] via-transparent to-[#0B0B0F] pointer-events-none z-10" />
    </div>
  );
};

export default SectionBackground;
