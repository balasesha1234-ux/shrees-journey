import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ASSET_PATHS } from '../utils/assetPaths';
import { RotateCcw, Heart } from 'lucide-react';
import SpecularButton from '../components/SpecularButton';

gsap.registerPlugin(ScrollTrigger);

interface EndingSceneProps {
  onReplayJourney: () => void;
}

export const EndingScene: React.FC<EndingSceneProps> = ({ onReplayJourney }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Dynamic Golden Embers & Petal Dust Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let w = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let h = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      w = canvas.width = canvas.parentElement.clientWidth;
      h = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Falling golden embers & leaves
    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 3.5 + 1.5,
      vy: Math.random() * 0.45 + 0.15,
      vx: (Math.random() - 0.5) * 0.3,
      rotation: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 0.03,
      alpha: Math.random() * 0.6 + 0.25,
    }));

    const render = () => {
      ctx.clearRect(0, 0, w, h);

      // Deep radial glow
      const radGrad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.min(w, h) * 0.55);
      radGrad.addColorStop(0, 'rgba(229, 193, 88, 0.12)');
      radGrad.addColorStop(0.5, 'rgba(114, 165, 207, 0.04)');
      radGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = radGrad;
      ctx.fillRect(0, 0, w, h);

      // Render floating golden embers
      particles.forEach((p) => {
        p.y += p.vy;
        p.x += p.vx + Math.sin(p.y * 0.01) * 0.2;
        p.rotation += p.vRot;

        if (p.y > h + 10) {
          p.y = -10;
          p.x = Math.random() * w;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = `rgba(229, 193, 88, ${p.alpha})`;
        ctx.shadowColor = 'rgba(229, 193, 88, 0.8)';
        ctx.shadowBlur = 8;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.5);
        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  // GSAP Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (textRef.current) {
        gsap.fromTo(
          textRef.current.children,
          {
            opacity: 0,
            y: 35,
            filter: 'blur(8px)',
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.6,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 65%',
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="ending-section"
      className="relative w-full min-h-[90vh] flex flex-col items-center justify-center text-center overflow-hidden py-24 sm:py-32 px-6 select-none bg-[#0B0B0F] border-t border-[#e5c158]/20"
    >
      {/* Background Visual Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <video
          ref={videoRef}
          src={ASSET_PATHS.ending.treeVideo}
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0F] via-transparent to-[#0B0B0F]" />
      </div>

      {/* Heart Icon Accent */}
      <div className="relative z-10 mb-6 flex flex-col items-center gap-3">
        <div className="relative flex items-center justify-center p-4 rounded-full bg-[#0c0d12]/90 border border-[#e5c158]/40 shadow-[0_0_50px_rgba(229,193,88,0.4)] backdrop-blur-xl">
          <Heart className="w-10 h-10 text-[#e5c158] fill-[#e5c158]/30 drop-shadow-[0_0_30px_rgba(229,193,88,0.8)] animate-pulse" />
        </div>
      </div>

      {/* Thank You Message */}
      <div ref={textRef} className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-4">
        <span className="font-general text-xs font-bold uppercase tracking-[0.35em] text-[#e5c158] bg-[#0c0d12]/80 px-4 py-1.5 rounded-full border border-[#e5c158]/30">
          The Journey Continues ✦
        </span>

        <h2 className="font-general text-3xl sm:text-5xl md:text-6xl font-black text-[#f0f0f5] leading-tight tracking-tight drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
          Thank you for experiencing <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e5c158] via-white to-[#e5c158]">
            Shree’s Journey.
          </span>
        </h2>

        <p className="font-serif italic text-base sm:text-2xl text-[#f0f0f5]/80 max-w-xl mt-2 leading-relaxed">
          “Every story shared is a light that continues to shine across time.”
        </p>

        <p className="font-general text-xs sm:text-base text-[#e5c158]/90 max-w-lg mt-2 leading-relaxed">
          Five million people didn’t just find a creator. They found a family and a reason to keep believing.
        </p>
      </div>

      {/* Replay Button */}
      <div className="relative z-10 mt-10 flex flex-col items-center gap-6">
        <SpecularButton
          size="lg"
          radius={24}
          lineColor="#e5c158"
          baseColor="#0c0d12"
          onClick={onReplayJourney}
          className="px-8 sm:px-12 py-3.5 sm:py-4 shadow-[0_0_40px_rgba(229,193,88,0.3)] hover:shadow-[0_0_50px_rgba(229,193,88,0.6)]"
        >
          <RotateCcw className="w-4 h-4 text-[#e5c158]" />
          <span>Replay Journey</span>
        </SpecularButton>

        {/* Narrative closing callback */}
        <p className="font-general text-[11px] sm:text-xs italic text-[#f0f0f5]/50 max-w-sm text-center leading-relaxed tracking-wide mt-2">
          This journey began with 0 followers and one quiet promise.<br />
          Today it stands at 5 million hearts — and counting.
        </p>
      </div>
    </section>
  );
};

export default EndingScene;
