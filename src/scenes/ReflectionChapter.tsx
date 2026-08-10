import React, { useEffect, useRef, useState } from 'react';
import { Heart, Sparkles, X, AlertCircle, RefreshCw } from 'lucide-react';
import { ASSET_PATHS } from '../utils/assetPaths';
import CommunityPetalSection from '../components/CommunityPetalSection';
import SpecularButton from '../components/SpecularButton';
import LivingGardenCounter from '../components/LivingGardenCounter';
import { useSupabasePetals } from '../hooks/useSupabasePetals';

interface FallingPetal {
  id: number | string;
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
  isNew?: boolean;
}

export const ReflectionChapter: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const { petals: dbPetals, loading, error, addPetal: addSupabasePetal, deletePetal, refreshPetals } = useSupabasePetals();
  const [petals, setPetals] = useState<FallingPetal[]>([]);
  const [activeUnfoldedPetal, setActiveUnfoldedPetal] = useState<FallingPetal | null>(null);
  const [showToast, setShowToast] = useState<boolean>(false);

  // Synchronize falling petals ONLY with genuine database petals
  useEffect(() => {
    const initial: FallingPetal[] = dbPetals.map((msg, i) => ({
      id: msg.id || i + 1,
      x: Math.random() * (window.innerWidth - 240) + 120,
      y: Math.random() * (window.innerHeight * 0.5) + 60,
      vx: Math.random() * 0.5 + 0.3,
      vy: Math.random() * 0.5 + 0.4,
      size: Math.random() * 8 + 12,
      rotation: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 0.02,
      text: msg.text,
      author: msg.author,
      country: msg.country,
    }));
    setPetals(initial);
  }, [dbPetals]);

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

      // 4. Update Natural Falling Petals if present
      if (petals.length > 0) {
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
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [activeUnfoldedPetal, petals.length]);

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

  const handleAddCommunityPetal = async (name: string, country: string, message: string) => {
    await addSupabasePetal(name, country, message);

    // Show temporary tiny toast notification: 🌸 "A new memory has found its place."
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2200);
  };

  const handleScrollToForm = () => {
    const el = document.getElementById('community-petal-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
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

      {/* TINY TOAST NOTIFICATION: 🌸 "A new memory has found its place." */}
      {showToast && (
        <div className="fixed top-12 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full bg-[#0c0d12]/95 border border-[#e5c158]/60 backdrop-blur-2xl shadow-[0_0_35px_rgba(229,193,88,0.5)] text-[#e5c158] font-general text-xs font-bold uppercase tracking-widest flex items-center gap-2.5 animate-bounce">
          <span className="text-base">🌸</span>
          <span>A new memory has found its place.</span>
        </div>
      )}

      {/* Memory Tree Visual Center & Interactive Falling Petals */}
      <div className="relative z-10 max-w-5xl mx-auto w-full my-12 h-[520px] rounded-3xl border border-[#e5c158]/20 bg-gradient-to-b from-[#0c0d12]/90 via-[#0B0B0F]/95 to-[#0B0B0F] backdrop-blur-2xl shadow-[0_0_80px_rgba(229,193,88,0.1)] flex flex-col items-center justify-center overflow-hidden">
        
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

        {/* SUPABASE FAILURE STATE WITH RETRY BUTTON */}
        {error ? (
          <div className="relative z-20 max-w-md mx-auto text-center px-8 py-10 rounded-3xl bg-[#0c0d12]/90 border border-rose-400/40 backdrop-blur-xl shadow-2xl flex flex-col items-center gap-5 animate-fade-in">
            <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-400/40 flex items-center justify-center text-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.3)]">
              <AlertCircle className="w-6 h-6" />
            </div>

            <p className="font-serif italic text-lg text-rose-200 leading-relaxed">
              “We couldn't load the Memory Garden right now.<br />Please try again in a moment.”
            </p>

            <SpecularButton
              size="sm"
              radius={18}
              lineColor="#e5c158"
              baseColor="#0c0d12"
              onClick={refreshPetals}
              className="mt-2"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#e5c158]" />
              <span>Retry</span>
            </SpecularButton>
          </div>
        ) : loading ? (
          /* LOADING STATE */
          <div className="relative z-20 flex flex-col items-center gap-3 text-[#e5c158] animate-pulse">
            <Sparkles className="w-6 h-6 animate-spin" />
            <span className="font-general text-xs font-bold uppercase tracking-widest">
              Gathering memories...
            </span>
          </div>
        ) : petals.length === 0 ? (
          /* ELEGANT AUTHENTIC EMPTY STATE ("The Memory Garden Awaits") */
          <div className="relative z-20 max-w-xl mx-auto text-center px-8 py-10 rounded-3xl bg-[#0c0d12]/80 border border-[#e5c158]/30 backdrop-blur-2xl shadow-[0_0_60px_rgba(229,193,88,0.2)] flex flex-col items-center gap-5 animate-fade-in">
            
            {/* LARGE FLOATING TRANSLUCENT FLOWER / HEART ICON */}
            <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-[#e5c158]/10 border border-[#e5c158]/40 shadow-[0_0_30px_rgba(229,193,88,0.4)] animate-pulse">
              <Heart className="w-8 h-8 text-rose-300 fill-rose-300/80" />
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-general text-xs font-bold uppercase tracking-[0.35em] text-[#e5c158]">
                The Memory Garden Awaits
              </span>
              <p className="font-serif italic text-lg sm:text-xl text-[#f0f0f5] leading-relaxed max-w-md">
                Every journey becomes meaningful because of the people whose lives it touches.
              </p>
            </div>

            <p className="font-general text-xs text-[#f0f0f5]/70 leading-relaxed max-w-md">
              Be the very first person to leave a memory, blessing or heartfelt message for Shree.<br />
              Your words will become a permanent part of this growing Memory Garden.
            </p>

            <SpecularButton
              size="md"
              radius={20}
              lineColor="#e5c158"
              baseColor="#0c0d12"
              onClick={handleScrollToForm}
              className="mt-2 px-8"
            >
              <span>Leave the First Petal 🌸</span>
            </SpecularButton>
          </div>
        ) : (
          /* REAL COMMUNITY PETALS (Displayed when database has rows) */
          <>
            {petals.map((petal) => (
              <button
                key={petal.id}
                onClick={() => handlePetalClick(petal)}
                data-cursor-hover
                className="absolute transform -translate-x-1/2 -translate-y-1/2 p-3 rounded-full bg-rose-400/40 hover:bg-[#e5c158] text-[#0B0B0F] hover:scale-150 transition-all duration-500 cursor-pointer shadow-[0_0_20px_rgba(229,193,88,0.6)] flex items-center justify-center group animate-fade-in"
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
          </>
        )}

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
      <CommunityPetalSection
        onAddPetal={handleAddCommunityPetal}
        onDeletePetal={deletePetal}
      />

      {/* FEATURE 1: LIVING GARDEN COUNTER */}
      <LivingGardenCounter petals={dbPetals} />
    </section>
  );
};

export default ReflectionChapter;
