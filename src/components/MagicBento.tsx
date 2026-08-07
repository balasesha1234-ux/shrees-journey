import React, { useEffect, useRef, useState } from 'react';

export interface MagicBentoProps {
  textAutoHide?: boolean;
  enableStars?: boolean;
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  enableTilt?: boolean;
  enableMagnetism?: boolean;
  clickEffect?: boolean;
  spotlightRadius?: number;
  particleCount?: number;
  glowColor?: string; // e.g. "132, 0, 255" or "229, 193, 88"
  disableAnimations?: boolean;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const MagicBento: React.FC<MagicBentoProps> = ({
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  clickEffect = true,
  spotlightRadius = 400,
  particleCount = 12,
  glowColor = '229, 193, 88',
  children,
  className = '',
  style = {},
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !enableSpotlight) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!clickEffect || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { id: Date.now(), x, y };
    setRipples((prev) => [...prev, newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 800);
  };

  // Canvas Star Particles Animation
  useEffect(() => {
    if (!enableStars) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let w = (canvas.width = canvas.parentElement?.clientWidth || 400);
    let h = (canvas.height = canvas.parentElement?.clientHeight || 400);

    const stars = Array.from({ length: particleCount }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 2 + 1,
      alpha: Math.random(),
      vAlpha: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
    }));

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      stars.forEach((st) => {
        st.alpha += st.vAlpha;
        if (st.alpha <= 0.1 || st.alpha >= 0.9) st.vAlpha = -st.vAlpha;

        ctx.beginPath();
        ctx.fillStyle = `rgba(${glowColor}, ${Math.max(0, Math.min(1, st.alpha))})`;
        ctx.arc(st.x, st.y, st.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [enableStars, particleCount, glowColor]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      className={`relative overflow-hidden rounded-3xl bg-[#0c0d12]/80 border transition-all duration-300 ${
        enableBorderGlow && isHovered ? 'border-[#e5c158]/70 shadow-[0_0_40px_rgba(229,193,88,0.25)]' : 'border-white/10'
      } ${className}`}
      style={style}
    >
      {/* Star Particles Canvas */}
      {enableStars && (
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />
      )}

      {/* Cursor Following Spotlight Radial Glow */}
      {enableSpotlight && (
        <div
          className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0.2,
            background: `radial-gradient(${spotlightRadius}px circle at ${mousePos.x}px ${mousePos.y}px, rgba(${glowColor}, 0.18), transparent 70%)`,
          }}
        />
      )}

      {/* Click Ripples */}
      {ripples.map((rp) => (
        <span
          key={rp.id}
          className="absolute w-4 h-4 rounded-full pointer-events-none animate-ping z-0"
          style={{
            left: `${rp.x}px`,
            top: `${rp.y}px`,
            backgroundColor: `rgba(${glowColor}, 0.6)`,
            boxShadow: `0 0 30px rgba(${glowColor}, 0.8)`,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
};

export default MagicBento;
