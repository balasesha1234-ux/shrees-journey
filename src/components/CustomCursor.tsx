import React, { useEffect, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Disable custom cursor on touch devices
    const isTouch = window.innerWidth < 768 || 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    let mouseX = -100;
    let mouseY = -100;
    let dotX = -100;
    let dotY = -100;
    let trailX = -100;
    let trailY = -100;
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Smooth Lerp Physics Loop - Zero React state re-renders!
    const render = () => {
      // Fast lerp for main dot
      dotX += (mouseX - dotX) * 0.45;
      dotY += (mouseY - dotY) * 0.45;

      // Smooth trailing lerp for outer glowing ring and spotlight lens
      trailX += (mouseX - trailX) * 0.15;
      trailY += (mouseY - trailY) * 0.15;

      const dotTransform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
      const trailTransform = `translate3d(${trailX}px, ${trailY}px, 0) translate(-50%, -50%)`;

      if (dotRef.current) {
        dotRef.current.style.transform = dotTransform;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = trailTransform;
      }
      if (spotlightRef.current) {
        spotlightRef.current.style.transform = trailTransform;
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
    <div className="hidden md:block pointer-events-none select-none">
      {/* 1. Large Ambient Spotlight Glow Lens (Warm Gold + Cherry Blossom Rose Aura) */}
      <div
        ref={spotlightRef}
        className="fixed top-0 left-0 pointer-events-none z-[9990] w-[360px] h-[360px] rounded-full bg-[radial-gradient(circle,rgba(229,193,88,0.18)_0%,rgba(244,63,94,0.12)_35%,rgba(229,193,88,0.03)_60%,transparent_75%)] will-change-transform opacity-90"
      />

      {/* 2. Trailing Glowing Golden Spotlight Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9995] w-14 h-14 rounded-full border-2 border-[#e5c158] bg-[radial-gradient(circle,rgba(229,193,88,0.35)_0%,rgba(244,63,94,0.15)_50%,transparent_75%)] shadow-[0_0_40px_rgba(229,193,88,0.85)] backdrop-blur-[1px] will-change-transform"
      />

      {/* 3. Main Liquid Glowing Pointer Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] w-4 h-4 rounded-full bg-gradient-to-r from-[#e5c158] to-[#fb7185] border-2 border-white shadow-[0_0_30px_#e5c158] will-change-transform"
      />
    </div>
  );
};

export default CustomCursor;
