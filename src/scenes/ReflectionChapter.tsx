import React, { useEffect, useRef, useState } from 'react';
import { Heart, Sparkles, X, AlertCircle, RefreshCw } from 'lucide-react';
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
  isStatic?: boolean;
}

export const ReflectionChapter: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const { petals: dbPetals, error, addPetal: addSupabasePetal, deletePetal, refreshPetals } = useSupabasePetals();
  const [activeUnfoldedPetal, setActiveUnfoldedPetal] = useState<FallingPetal | null>(null);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [loveCount, setLoveCount] = useState<number>(5000000);
  const [heartBurst, setHeartBurst] = useState<boolean>(false);
  const fallingPetalsRef = useRef<FallingPetal[]>([]);

  // Synchronize falling petals ref with database petals
  useEffect(() => {
    const initial: FallingPetal[] = dbPetals.map((msg, i) => ({
      id: msg.id || i + 1,
      x: Math.random() * (window.innerWidth - 240) + 120,
      y: Math.random() * (window.innerHeight * 0.5) + 60,
      vx: Math.random() * 0.4 + 0.2,
      vy: Math.random() * 0.4 + 0.3,
      size: Math.random() * 8 + 14,
      rotation: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 0.02,
      text: msg.text,
      author: msg.author,
      country: msg.country,
      isStatic: false,
    }));
    fallingPetalsRef.current = initial;
  }, [dbPetals]);

  // Atmospheric Canvas: Fog, Light Beams, Floating Particles, Falling Cherry Petals
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let isVisible = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );

    if (canvas) observer.observe(canvas);

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Floating Dust Particles
    const dustParticles = Array.from({ length: 30 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 1,
      alpha: Math.random() * 0.5 + 0.2,
      vAlpha: (Math.random() * 0.008 + 0.002) * (Math.random() > 0.5 ? 1 : -1),
    }));

    let time = 0;
    let lastFrame = performance.now();

    const render = (now: number) => {
      if (!isVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      // Throttle render ticks to ~60fps maximum
      if (now - lastFrame < 15) {
        animId = requestAnimationFrame(render);
        return;
      }
      lastFrame = now;

      time += 0.015;
      ctx.clearRect(0, 0, w, h);

      // 1. Soft Cinematic Fog Layer
      const fogGrd = ctx.createLinearGradient(0, h * 0.3, 0, h);
      fogGrd.addColorStop(0, 'rgba(11, 11, 15, 0)');
      fogGrd.addColorStop(0.5, 'rgba(229, 193, 88, 0.03)');
      fogGrd.addColorStop(1, 'rgba(11, 11, 15, 0.9)');
      ctx.fillStyle = fogGrd;
      ctx.fillRect(0, 0, w, h);

      // 2. Render Floating Dust Particles
      dustParticles.forEach((dp) => {
        dp.alpha += dp.vAlpha;
        if (dp.alpha <= 0.1 || dp.alpha >= 0.7) dp.vAlpha = -dp.vAlpha;

        ctx.beginPath();
        ctx.fillStyle = `rgba(229, 193, 88, ${Math.max(0, dp.alpha)})`;
        ctx.arc(dp.x, dp.y, dp.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Draw & Update Natural Falling Petals inside ref array (ZERO React state re-renders!)
      fallingPetalsRef.current.forEach((p) => {
        if (!p.isStatic) {
          p.x += p.vx + Math.sin(time + p.y * 0.01) * 0.4;
          p.y += p.vy;
          p.rotation += p.vRot;

          if (p.y > h + 30) {
            p.y = -30;
            p.x = Math.random() * (w - 100) + 50;
          }
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (p.isStatic) {
          ctx.shadowColor = '#e5c158';
          ctx.shadowBlur = 22;
          ctx.fillStyle = 'rgba(244, 63, 94, 0.98)';
        } else {
          ctx.fillStyle = 'rgba(244, 114, 182, 0.8)';
        }

        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 0.65, p.size, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Universal Click & Touch Hit-Testing (Works ANYWHERE including over headings!)
  const checkPetalHit = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return false;
    const rect = canvas.getBoundingClientRect();
    const clickX = clientX - rect.left;
    const clickY = clientY - rect.top;

    // Generous touch hit radius (35px) so users can tap falling petals even behind text!
    const found = fallingPetalsRef.current.find(
      (p) => Math.hypot(p.x - clickX, p.y - clickY) < p.size + 35
    );

    if (found) {
      found.isStatic = true;
      found.vx = 0;
      found.vy = 0;
      setActiveUnfoldedPetal(found);
      return true;
    }
    return false;
  };

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Check if user clicked a petal anywhere in the section
    checkPetalHit(e.clientX, e.clientY);
  };

  const handleContainerTouch = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches[0]) {
      checkPetalHit(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handlePetalClick = (p: FallingPetal) => {
    p.isStatic = true;
    p.vx = 0;
    p.vy = 0;
    setActiveUnfoldedPetal(p);
  };

  const handleCloseModal = () => {
    if (activeUnfoldedPetal) {
      activeUnfoldedPetal.isStatic = false;
      activeUnfoldedPetal.vx = Math.random() * 0.4 + 0.2;
      activeUnfoldedPetal.vy = Math.random() * 0.4 + 0.3;
    }
    setActiveUnfoldedPetal(null);
  };

  const handleSendLove = () => {
    setLoveCount((prev) => prev + 1);
    setHeartBurst(true);
    setTimeout(() => setHeartBurst(false), 1600);
  };

  const handleAddCommunityPetal = async (name: string, country: string, message: string) => {
    const newPetal = await addSupabasePetal(name, country, message);

    if (newPetal) {
      const newFalling: FallingPetal = {
        id: newPetal.id,
        x: window.innerWidth / 2,
        y: 100,
        vx: (Math.random() - 0.5) * 1.5,
        vy: Math.random() * 0.5 + 0.4,
        size: 16,
        rotation: 0,
        vRot: 0.03,
        text: newPetal.text,
        author: newPetal.author,
        country: newPetal.country,
        isNew: true,
        isStatic: false,
      };

      fallingPetalsRef.current = [newFalling, ...fallingPetalsRef.current];
    }

    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2200);
  };

  return (
    <section
      ref={containerRef}
      id="reflection-chapter-container"
      onClick={handleContainerClick}
      onTouchStart={handleContainerTouch}
      className="relative w-full min-h-screen bg-[#0B0B0F] text-[#f0f0f5] font-general select-none py-24 sm:py-32 px-6 sm:px-12 overflow-hidden flex flex-col justify-between"
    >
      {/* ATMOSPHERIC BACKGROUND ILLUMINATION */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0F]/90 via-[#0B0B0F]/60 to-[#0B0B0F] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(229,193,88,0.18),transparent_70%)] pointer-events-none z-0" />

      {/* INTERACTIVE FULL-SCREEN 2D CANVAS FOR FALLING PETALS */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-pointer z-10"
      />

      {/* HEADER CONTENT WITH ELEGANT SPACED INTERFACE */}
      <div className="relative z-20 max-w-4xl mx-auto text-center flex flex-col items-center gap-6 sm:gap-8">
        <div className="flex items-center gap-2.5 text-[#e5c158] bg-[#0c0d12]/90 px-5 py-2 rounded-full border border-[#e5c158]/40 backdrop-blur-xl shadow-2xl">
          <Sparkles className="w-4 h-4 animate-spin-slow" />
          <span className="font-general text-[11px] sm:text-xs font-bold uppercase tracking-[0.35em]">
            The Tree of Gratitude
          </span>
        </div>

        <h2 className="font-general text-4xl sm:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#e5c158] via-white to-[#e5c158] tracking-tight drop-shadow-[0_0_60px_rgba(229,193,88,0.45)] leading-tight">
          Reflection Chapter
        </h2>

        {/* ELEGANT SPACED REFLECTION ESSAY QUOTE */}
        <div className="my-4 sm:my-6 p-6 sm:p-10 rounded-3xl bg-[#0c0d12]/80 border border-[#e5c158]/35 backdrop-blur-2xl shadow-2xl max-w-3xl">
          <p className="font-serif italic text-base sm:text-2xl text-[#f0f0f5]/90 leading-relaxed sm:leading-loose tracking-wide">
            “Every petal falling from this tree holds a memory planted by someone whose life was touched by Shree.”
          </p>
        </div>

        {/* TAP PETAL INACTION INSTRUCTION BADGE */}
        <div className="flex items-center gap-2.5 text-[#e5c158] bg-[#0c0d12]/90 px-5 py-2 rounded-full border border-[#e5c158]/40 backdrop-blur-xl text-xs sm:text-sm font-bold uppercase tracking-[0.25em] my-2 animate-pulse shadow-xl">
          <Sparkles className="w-4 h-4 text-[#e5c158]" />
          <span>Tap any falling petal anywhere on screen to make it static & read the memory 🌸</span>
        </div>

        {/* Supabase Error State Notice */}
        {error && (
          <div className="mt-3 px-4 py-2 rounded-2xl bg-rose-500/10 border border-rose-400/30 text-rose-200 text-xs flex items-center gap-2 shadow-lg animate-fade-in">
            <AlertCircle className="w-4 h-4 text-rose-300 shrink-0" />
            <span>{error}</span>
            <button
              onClick={refreshPetals}
              className="ml-2 underline hover:text-white transition-colors flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Retry</span>
            </button>
          </div>
        )}
      </div>

      {/* FALLING PETAL INTERACTION LIST / TREE NODES WITH SPACED GAP */}
      <div className="relative z-20 max-w-5xl mx-auto w-full my-12 sm:my-16 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
        {fallingPetalsRef.current.slice(0, 12).map((p) => (
          <button
            key={p.id}
            onClick={(e) => {
              e.stopPropagation();
              handlePetalClick(p);
            }}
            data-cursor-hover
            className="group px-4 py-2.5 rounded-full bg-[#0c0d12]/90 border border-[#e5c158]/40 hover:border-[#e5c158] backdrop-blur-xl shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#e5c158]"
          >
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400/70 group-hover:scale-110 transition-transform" />
            <span className="truncate max-w-[120px] sm:max-w-[170px] text-[#f0f0f5]">{p.author}</span>
            <span className="text-[10px] sm:text-xs text-[#e5c158]/70 font-bold uppercase tracking-wider">🌸 Unfold</span>
          </button>
        ))}
      </div>

      {/* INTERACTIVE SEND LOVE TO SHREE FEATURE */}
      <div className="relative z-20 flex flex-col items-center gap-4 my-8 sm:my-12">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleSendLove();
          }}
          className="group px-8 py-4 rounded-full bg-gradient-to-r from-rose-500/20 via-rose-400/10 to-rose-500/20 border-2 border-rose-400/50 hover:border-rose-300 text-rose-200 text-xs sm:text-base font-bold uppercase tracking-widest backdrop-blur-2xl shadow-[0_0_40px_rgba(244,63,94,0.3)] hover:shadow-[0_0_60px_rgba(244,63,94,0.6)] transition-all duration-300 active:scale-95 flex items-center gap-3"
        >
          <Heart className="w-5 h-5 text-rose-400 fill-rose-400 group-hover:scale-125 transition-transform" />
          <span>Send Love to Shree ({loveCount.toLocaleString()}) 💖</span>
        </button>

        {heartBurst && (
          <div className="animate-fade-in text-xs font-bold text-rose-300 uppercase tracking-widest">
            💖 Heart sent into the sky!
          </div>
        )}
      </div>

      {/* TOAST NOTIFICATION ON ADDING A PETAL */}
      {showToast && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-full bg-[#0c0d12]/95 border border-[#e5c158] text-[#e5c158] text-xs font-bold uppercase tracking-widest shadow-[0_0_40px_rgba(229,193,88,0.5)] backdrop-blur-2xl animate-fade-in flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#e5c158] animate-pulse" />
          <span>A new memory has found its place on the Tree 🌸</span>
        </div>
      )}

      {/* UNFOLDED PETAL MODAL */}
      {activeUnfoldedPetal && (
        <div
          onClick={handleCloseModal}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-2xl animate-fade-in cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-lg w-full p-8 sm:p-12 rounded-3xl bg-[#0c0d12] border-2 border-[#e5c158]/60 shadow-[0_0_90px_rgba(229,193,88,0.35)] flex flex-col items-center text-center gap-6 cursor-default backdrop-blur-3xl animate-fade-in"
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 border border-white/15 text-[#f0f0f5]/70 hover:text-[#e5c158] hover:border-[#e5c158] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-400/40 flex items-center justify-center text-rose-300 shadow-[0_0_30px_rgba(244,63,94,0.4)]">
              <Heart className="w-8 h-8 fill-rose-300 animate-pulse" />
            </div>

            <span className="font-general text-xs font-bold uppercase tracking-[0.3em] text-[#e5c158]">
              Unfolded Petal Memory 🌸
            </span>

            <p className="font-serif italic text-lg sm:text-2xl text-[#f0f0f5] leading-relaxed sm:leading-loose tracking-wide">
              “{activeUnfoldedPetal.text}”
            </p>

            <div className="flex flex-col gap-1.5 text-xs sm:text-sm font-semibold text-[#e5c158]/90 uppercase tracking-widest">
              <span>— {activeUnfoldedPetal.author}</span>
              {activeUnfoldedPetal.country && (
                <span className="text-[11px] text-[#f0f0f5]/50">{activeUnfoldedPetal.country}</span>
              )}
            </div>

            <SpecularButton
              size="md"
              radius={20}
              lineColor="#e5c158"
              baseColor="#0c0d12"
              onClick={handleCloseModal}
              className="mt-4"
            >
              <span>Release Petal to Wind ✨</span>
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
