import React from 'react';

export const FilmGrain: React.FC = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[998] opacity-[0.03] mix-blend-overlay overflow-hidden"
      style={{
        backgroundImage: `radial-gradient(rgba(255,255,255,0.15) 1px, transparent 0)`,
        backgroundSize: '3px 3px',
      }}
    />
  );
};
