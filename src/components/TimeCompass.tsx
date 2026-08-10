import React from 'react';
import OptionWheel from './OptionWheel';

interface TimeCompassProps {
  years?: string[];
}

export const TimeCompass: React.FC<TimeCompassProps> = ({
  years = ['2023', '2024', '2025', '2026'],
}) => {
  const handleYearChange = (_index: number, year: string) => {
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
    <div className="fixed top-1/2 -translate-y-1/2 left-4 sm:left-8 z-40 w-44 h-80 pointer-events-auto hidden lg:block">
      <OptionWheel
        items={years}
        defaultSelected={0}
        textColor="#a6a6a6"
        activeColor="#e5c158"
        side="left"
        fontSize={3}
        spacing={1.4}
        curve={1}
        tilt={6}
        blur={2}
        fade={0.25}
        smoothing={200}
        inset={40}
        loop={false}
        draggable
        onChange={handleYearChange}
      />
    </div>
  );
};

export default TimeCompass;
