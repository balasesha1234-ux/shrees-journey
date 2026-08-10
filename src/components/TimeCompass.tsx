import React, { useState, useEffect } from 'react';
import OptionWheel from './OptionWheel';

interface TimeCompassProps {
  years?: string[];
}

export const TimeCompass: React.FC<TimeCompassProps> = ({
  years = ['2023', '2024', '2025', '2026'],
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  // Two-way scroll sync: Update active year on OptionWheel as user scrolls through sections
  useEffect(() => {
    const handleScroll = () => {
      const viewportMid = window.innerHeight * 0.5;

      let activeIdx = -1;
      years.forEach((year, index) => {
        const el = document.getElementById(`year-section-${year}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If section top has entered middle area of viewport and section bottom is still visible
          if (rect.top <= viewportMid && rect.bottom >= 120) {
            activeIdx = index;
          }
        }
      });

      if (activeIdx !== -1) {
        setSelectedIndex(activeIdx);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [years]);

  const handleYearChange = (index: number, year: string) => {
    setSelectedIndex(index);
    const el = document.getElementById(`year-section-${year}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      const timelineEl = document.getElementById('timeline-section');
      if (timelineEl) {
        timelineEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <aside
      aria-label="Timeline Year Compass Navigation"
      className="fixed top-1/2 -translate-y-1/2 right-3 sm:right-6 md:right-8 z-40 w-36 sm:w-44 h-72 sm:h-80 pointer-events-auto hidden md:block filter drop-shadow-[0_0_35px_rgba(0,0,0,0.85)]"
    >
      <OptionWheel
        items={years}
        selected={selectedIndex}
        textColor="#a6a6a6"
        activeColor="#e5c158"
        side="right"
        fontSize={2.8}
        spacing={1.4}
        curve={1}
        tilt={6}
        blur={1.5}
        fade={0.25}
        smoothing={200}
        inset={32}
        loop={false}
        draggable
        onChange={handleYearChange}
      />
    </aside>
  );
};

export default TimeCompass;
