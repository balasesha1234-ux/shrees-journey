import React, { useEffect, useRef, useState } from 'react';
import { Heart, Sparkles, X } from 'lucide-react';
import { ASSET_PATHS } from '../utils/assetPaths';
import CommunityPetalSection from '../components/CommunityPetalSection';
import SpecularButton from '../components/SpecularButton';

interface FallingPetal {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  vRot: number;
  text: string;
  author: string;
  country?: string;
}

const HEARTFELT_PETAL_MESSAGES = [
  { text: 'Thank you for inspiring me to show up with faith every day.', author: 'A Grateful Supporter', country: 'India' },
  { text: 'Your authenticity made difficult days so much easier.', author: 'Community Member', country: 'Canada' },
  { text: 'You proved that small, quiet beginnings can touch millions of hearts.', author: 'Fellow Creator', country: 'United Kingdom' },
  { text: 'I will always cherish memories of this beautiful journey.', author: 'Longtime Fan', country: 'Australia' },
  { text: 'Where passion meets purpose, lives are transformed.', author: 'Anonymous Friend', country: 'United States' },
];

export const ReflectionChapter: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [petals, setPetals] = useState<FallingPetal[]>([]);
  const [activeUnfoldedPetal, setActiveUnfoldedPetal] = useState<FallingPetal | null>(null);

  // Initialize Falling Petals
  useEffect(() => {
    const initial: FallingPetal[] = HEARTFELT_PETAL_MESSAGES.map((msg, i) => ({
      id: i + 1,
      x: Math.random() * (window.innerWidth - 200) + 100,
      y: Math.random() * (window.innerHeight * 0.7),
      vx: Math.random() * 0.6 + 0.3,
      vy: Math.random() * 0.5 + 0.4,
      size: Math.random() * 8 + 12,
      rotation: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 0.02,
      text: msg.text,
      author: msg.author,
      country: msg.country,
    }));
    setPetals(initial);
  }, []);

  // Atmospheric Canvas: Fog, Light Beams, Floating Particles, Falling Cherry Petals
  useEffect(() => {
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

    // Floating Dust Particles
    const dustParticles = Array.from({ length: 40 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.2,
      vAlpha: (Math.random() * 0.01 + 0.002) * (Math.random() > 0.5 ? 1 : -1),
    }));

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, w, h);

      // 1. Soft Cinematic Fog Layer
      const fogGrd = ctx.createLinearGradient(0, h * 0.3, 0, h);
      fogGrd.addColorStop(0, 'rgba(11, 11, 15, 0)');
      fogGrd.addColorStop(0.5, 'rgba(229, 193, 88, 0.03)');
      fogGrd.addColorStop(1, 'rgba(11, 11, 15, 0.9)');
      ctx.fillStyle = fogGrd;
      ctx.fillRect(0, 0, w, h);

      // 2. Subtle Moving Light Beams
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const beamX = w * 0.5 + Math.sin(time * 0.5) * 80;
      const beamGrd = ctx.createRadialGradient(beamX, 0, 10, beamX, h * 0.8, w * 0.6);
      beamGrd.addColorStop(0, 'rgba(229, 193, 88, 0.08)');
      beamGrd.addColorStop(0.6, 'rgba(229, 193, 88, 0.01)');
      beamGrd.addColorStop(1, 'transparent');
      ctx.fillStyle = beamGrd;
      ctx.fillRect(0, 0, w, h);
      ctx.restore();

      // 3. Render Floating Dust Particles
      dustParticles.forEach((dp) => {
        dp.alpha += dp.vAlpha;
        if (dp.alpha <= 0.1 || dp.alpha >= 0.7) dp.vAlpha = -dp.vAlpha;

        ctx.beginPath();
        ctx.fillStyle = `rgba(229, 193, 88, ${Math.max(0, dp.alpha)})`;
        ctx.arc(dp.x, dp.y, dp.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // 4. Update Natural Falling Petals
      setPetals((prevPetals) =>
        prevPetals.map((p) => {
          if (activeUnfoldedPetal?.id === p.id) return p;

          let newX = p.x + p.vx + Math.sin(time + p.y * 0.01) * 0.4;
          let newY = p.y + p.vy;
          let newRot = p.rotation + p.vRot;

          if (newY > h + 30) {
            newY = -30;
            newX = Math.random() * (w - 100) + 50;
          }

          return { ...p, x: newX, y: newY, rotation: newRot };
        })
      );

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [activeUnfoldedPetal]);

  const handlePetalClick = (p: FallingPetal) => {
    setActiveUnfoldedPetal(p);
  };

  const handleCloseModal = () => {
    if (activeUnfoldedPetal) {
      setPetals((prev) =>
        prev.map((p) =>
          p.id === activeUnfoldedPetal.id ? { ...p, vx: 4, vy: -3 } : p
        )
      );
      setActiveUnfoldedPetal(null);
    }
  };

  const handleAddCommunityPetal = (name: string, country: string, message: string) => {
    const newPetal: FallingPetal = {
      id: Date.now(),
      x: window.innerWidth * 0.5,
      y: 80,
      vx: Math.random() * 0.6 + 0.3,
      vy: Math.random() * 0.5 + 0.4,
      size: 16,
      rotation: 0,
      vRot: 0.01,
      text: message,
      author: name || 'A Grateful Friend',
      country: country || 'Global',
    };

    setPetals((prev) => [...prev, newPetal]);
  };

  return (
    <section
      id="reflection-chapter-container"
      className="relative w-full min-h-screen bg-[#0B0B0F] text-[#f0f0f5] font-general select-none py-20 px-6 overflow-hidden flex flex-col justify-between"
    >
      {/* Background Canvas Layer */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      {/* Chapter Title Header */}
      <header className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-3">
        <div className="flex items-center gap-2 text-[#e5c158] bg-[#0c0d12]/80 px-4 py-1.5 rounded-full border border-[#e5c158]/30 backdrop-blur-md">
          <Sparkles className="w-4 h-4 animate-spin-slow" />
          <span className="font-general text-xs font-bold uppercase tracking-[0.3em]">
            Reflection Chapter
          </span>
        </div>

        <h2 className="font-general text-4xl sm:text-6xl font-black text-[#f0f0f5] tracking-tight">
          The Memory Tree
        </h2>

        <p className="font-general italic text-base sm:text-xl text-[#e5c158]/90 max-w-xl leading-relaxed">
          “Every falling petal holds a silent voice of gratitude.”
        </p>
      </header>

      {/* Memory Tree Visual Center & Interactive Falling Petals */}
      <div className="relative z-10 max-w-5xl mx-auto w-full my-12 h-[500px] rounded-3xl border border-[#e5c158]/20 bg-gradient-to-b from-[#0c0d12]/90 via-[#0B0B0F]/95 to-[#0B0B0F] backdrop-blur-2xl shadow-[0_0_80px_rgba(229,193,88,0.1)] flex flex-col items-center justify-center overflow-hidden">
        
        {/* Softly Illuminated Tree Image Illustration */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40 mix-blend-screen">
          <img
            src={ASSET_PATHS.ending.treeImage}
            alt="Memory Tree"
            className="w-full h-full object-cover filter brightness-125 contrast-110"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        </div>

        {/* Ambient Radial Spotlight over Tree */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(229,193,88,0.15),transparent_65%)] pointer-events-none" />

        {/* Natural Falling Cherry Blossom Petals (Clickable Nodes) */}
        {petals.map((petal) => (
          <button
            key={petal.id}
            onClick={() => handlePetalClick(petal)}
            data-cursor-hover
            className="absolute transform -translate-x-1/2 -translate-y-1/2 p-3 rounded-full bg-rose-400/40 hover:bg-[#e5c158] text-[#0B0B0F] hover:scale-150 transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(229,193,88,0.6)] flex items-center justify-center group"
            style={{
              left: `${petal.x}px`,
              top: `${petal.y}px`,
              transform: `rotate(${petal.rotation}rad)`,
            }}
            title="Click to unfold petal message"
          >
            <Heart className="w-4 h-4 fill-current text-[#0B0B0F] group-hover:scale-110 transition-transform" />
          </button>
        ))}

        <div className="relative z-20 pointer-events-none text-center px-6 mt-auto mb-8">
          <span className="font-general text-[11px] font-bold uppercase tracking-[0.3em] text-[#e5c158] bg-[#0c0d12]/90 px-4 py-2 rounded-full border border-[#e5c158]/30 shadow-lg">
            Click a falling petal to unfold a memory
          </span>
        </div>

      </div>

      {/* Unfolded Petal Message Modal */}
      {activeUnfoldedPetal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/85 backdrop-blur-2xl animate-fade-in">
          <div className="relative max-w-lg w-full p-8 sm:p-12 rounded-3xl bg-[#0c0d12] border border-[#e5c158]/50 text-center flex flex-col items-center gap-6 shadow-[0_0_80px_rgba(229,193,88,0.3)]">
            
            <button
              onClick={handleCloseModal}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 text-[#f0f0f5]/60 hover:text-white hover:border-[#e5c158] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-14 h-14 rounded-full bg-[#e5c158]/20 border border-[#e5c158] flex items-center justify-center text-[#e5c158] shadow-[0_0_25px_rgba(229,193,88,0.4)]">
              <Heart className="w-6 h-6 fill-current animate-pulse" />
            </div>

            <span className="font-general text-xs font-bold uppercase tracking-[0.3em] text-[#e5c158]">
              Unfolded Petal Memory
            </span>

            <p className="font-general italic text-lg sm:text-2xl text-[#f0f0f5] leading-relaxed">
              “{activeUnfoldedPetal.text}”
            </p>

            <div className="flex flex-col gap-1 text-xs font-semibold text-[#e5c158]/90 uppercase tracking-widest">
              <span>— {activeUnfoldedPetal.author}</span>
              {activeUnfoldedPetal.country && (
                <span className="text-[10px] text-[#f0f0f5]/50">{activeUnfoldedPetal.country}</span>
              )}
            </div>

            <SpecularButton
              size="md"
              radius={20}
              lineColor="#e5c158"
              baseColor="#0c0d12"
              onClick={handleCloseModal}
              className="mt-2"
            >
              <span>Let Petal Fly Away ✨</span>
            </SpecularButton>
          </div>
        </div>
      )}

      {/* Community Message Component ("Leave Your Petal") */}
      <CommunityPetalSection onAddPetal={handleAddCommunityPetal} />
    </section>
  );
};

export default ReflectionChapter;
