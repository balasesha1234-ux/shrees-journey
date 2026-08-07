import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ASSET_PATHS } from '../utils/assetPaths';
import { RotateCcw, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface EndingSceneProps {
  onReplayJourney: () => void;
}

export const EndingScene: React.FC<EndingSceneProps> = ({ onReplayJourney }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [useFallbackCanvas, setUseFallbackCanvas] = useState(false);

  // Dynamic Tree / Golden Leaf Floating Particles Canvas
  useEffect(() => {
    if (!useFallbackCanvas) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Falling golden leaves / embers
    const leaves = Array.from({ length: 45 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 4 + 2,
      vy: Math.random() * 0.4 + 0.1,
      vx: Math.sin(Math.random() * Math.PI) * 0.2,
      rotation: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 0.02,
      alpha: Math.random() * 0.6 + 0.2,
    }));

    const render = () => {
      ctx.fillStyle = '#050507';
      ctx.fillRect(0, 0, w, h);

      // Deep radial glow in the center representing the Tree of Life
      const radGrad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.min(w, h) * 0.5);
      radGrad.addColorStop(0, 'rgba(229, 193, 88, 0.15)');
      radGrad.addColorStop(0.5, 'rgba(114, 165, 207, 0.05)');
      radGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = radGrad;
      ctx.fillRect(0, 0, w, h);

      // Render falling leaves
      leaves.forEach((l) => {
        l.y += l.vy;
        l.x += l.vx;
        l.rotation += l.vRot;

        if (l.y > h + 10) {
          l.y = -10;
          l.x = Math.random() * w;
        }

        ctx.save();
        ctx.translate(l.x, l.y);
        ctx.rotate(l.rotation);
        ctx.fillStyle = `rgba(229, 193, 88, ${l.alpha})`;
        ctx.fillRect(-l.size / 2, -l.size / 2, l.size, l.size * 1.6);
        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [useFallbackCanvas]);

  // GSAP Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        {
          opacity: 0,
          y: 40,
          filter: 'blur(10px)',
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 2.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 60%',
          },
        }
      );

      gsap.fromTo(
        buttonRef.current,
        {
          opacity: 0,
          scale: 0.9,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          delay: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 60%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleVideoError = () => {
    setUseFallbackCanvas(true);
  };

  return (
    <section
      ref={containerRef}
      id="ending-section"
      className="relative w-full h-screen flex flex-col items-center justify-center text-center overflow-hidden py-24 px-6 select-none bg-[#050507]"
    >
      {/* Background Visual Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
        {!useFallbackCanvas ? (
          <video
            ref={videoRef}
            src={ASSET_PATHS.ending.treeVideo}
            autoPlay
            muted
            loop
            playsInline
            onError={handleVideoError}
            className="w-full h-full object-cover"
          />
        ) : (
          <canvas ref={canvasRef} className="w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050507] via-transparent to-[#050507]" />
      </div>

      {/* Heart Icon Accent */}
      <div className="relative z-10 mb-6 opacity-80 animate-pulse">
        <Heart className="w-8 h-8 text-[#e5c158] fill-[#e5c158]/30 drop-shadow-[0_0_15px_rgba(229,193,88,0.6)]" />
      </div>

      {/* Thank You Message */}
      <div ref={textRef} className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-4">
        <h2 className="font-cinzel text-4xl sm:text-6xl md:text-7xl font-black text-[#f0f0f5] leading-tight tracking-tight drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
          Thank you for experiencing <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e5c158] via-[#ffffff] to-[#e5c158]">
            Shree's Journey.
          </span>
        </h2>
        
        <p className="font-cormorant italic text-lg sm:text-2xl text-[#f0f0f5]/70 max-w-xl mt-2">
          Every story shared is a light that continues to shine across time.
        </p>
      </div>

      {/* Replay Button */}
      <div className="relative z-10 mt-12">
        <button
          ref={buttonRef}
          onClick={onReplayJourney}
          data-cursor-hover
          className="group relative flex items-center gap-3 px-8 py-4 rounded-full bg-[#0c0d12]/90 border border-[#e5c158]/40 hover:border-[#e5c158] backdrop-blur-xl text-xs font-semibold uppercase tracking-[0.25em] text-[#f0f0f5] transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.8)] hover:shadow-[0_0_35px_rgba(229,193,88,0.4)] hover:scale-105"
        >
          <RotateCcw className="w-4 h-4 text-[#e5c158] group-hover:-rotate-180 transition-transform duration-700" />
          <span className="group-hover:text-[#e5c158] transition-colors duration-300">
            Replay Journey
          </span>
        </button>
      </div>
    </section>
  );
};
