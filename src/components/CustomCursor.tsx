import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [targetPos, setTargetPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      setTargetPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.closest('button') ||
          target.closest('a') ||
          target.hasAttribute('data-cursor-hover'))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    // Smooth Lerp Physics Loop
    const render = () => {
      setPos((prev) => ({
        x: prev.x + (targetPos.x - prev.x) * 0.18,
        y: prev.y + (targetPos.y - prev.y) * 0.18,
      }));
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, [targetPos]);

  return (
    <div className="hidden md:block">
      {/* Ambient Spotlight Glow */}
      <div
        className="fixed pointer-events-none z-[9990] rounded-full transition-transform duration-300 ease-out"
        style={{
          width: isHovered ? '340px' : '220px',
          height: isHovered ? '340px' : '220px',
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.85 : 1})`,
          background: isHovered
            ? 'radial-gradient(circle, rgba(229,193,88,0.2) 0%, rgba(229,193,88,0.05) 50%, transparent 70%)'
            : 'radial-gradient(circle, rgba(255,255,255,0.09) 0%, rgba(229,193,88,0.02) 40%, transparent 70%)',
        }}
      />

      {/* Main Liquid Pointer Dot */}
      <div
        className="fixed pointer-events-none z-[9999] rounded-full transition-transform duration-150 ease-out"
        style={{
          width: isHovered ? '46px' : '10px',
          height: isHovered ? '46px' : '10px',
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.75 : 1})`,
          backgroundColor: isHovered ? 'rgba(229, 193, 88, 0.15)' : '#e5c158',
          border: '1px solid rgba(229, 193, 88, 0.6)',
          backdropFilter: isHovered ? 'blur(4px)' : 'none',
          boxShadow: isHovered ? '0 0 20px rgba(229, 193, 88, 0.4)' : 'none',
        }}
      />
    </div>
  );
};
