import React, { useEffect, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Completely disable custom cursor on touch devices to save 100% of mouse listener CPU
    const isTouch = window.innerWidth < 768 || 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    let mouseX = -100;
    let mouseY = -100;
    let currentX = -100;
    let currentY = -100;
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Direct DOM ref transform loop - ZERO React state re-renders!
    const render = () => {
      currentX += (mouseX - currentX) * 0.22;
      currentY += (mouseY - currentY) * 0.22;

      const transformStr = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;

      if (spotlightRef.current) {
        spotlightRef.current.style.transform = transformStr;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = transformStr;
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="hidden md:block pointer-events-none">
      {/* Ambient Spotlight Glow */}
      <div
        ref={spotlightRef}
        className="fixed top-0 left-0 pointer-events-none z-[9990] w-[220px] h-[220px] rounded-full opacity-60 bg-[radial-gradient(circle,rgba(229,193,88,0.18)_0%,rgba(229,193,88,0.02)_40%,transparent_70%)] will-change-transform"
      />

      {/* Main Liquid Pointer Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] w-[10px] h-[10px] rounded-full bg-[#e5c158] border border-rgba(229,193,88,0.6) shadow-[0_0_12px_rgba(229,193,88,0.5)] will-change-transform"
      />
    </div>
  );
};
