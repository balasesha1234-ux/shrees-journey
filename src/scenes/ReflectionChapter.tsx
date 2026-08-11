import React, { useEffect, useRef, useState } from 'react';
import { Heart, Sparkles, X, AlertCircle, RefreshCw } from 'lucide-react';
import CommunityPetalSection from '../components/CommunityPetalSection';
import SpecularButton from '../components/SpecularButton';
import LivingGardenCounter from '../components/LivingGardenCounter';
import { useSupabasePetals } from '../hooks/useSupabasePetals';

import StarBlessingCounter from '../components/StarBlessingCounter';
import CelebrationBurst from '../components/CelebrationBurst';

interface FallingPetal {
  id: number | string;
  xPercent: number; // 6% to 90%
  yPercent: number; // 10% to 80%
  animClass: string;
  rotation: number;
  text: string;
  author: string;
  country?: string;
  isStatic?: boolean;
}

export const ReflectionChapter: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerBoxRef = useRef<HTMLDivElement | null>(null);
  const physicsRefs = useRef<{
    [id: string]: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      swaySpeed: number;
      swayRange: number;
      phase: number;
      rotation: number;
      rotationSpeed: number;
      isHovered?: boolean;
    }
  }>({});

  const { petals: dbPetals, error, addPetal: addSupabasePetal, deletePetal, refreshPetals } = useSupabasePetals();
  const [activeUnfoldedPetal, setActiveUnfoldedPetal] = useState<FallingPetal | null>(null);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [loveCount, setLoveCount] = useState<number>(5000000);
  const [heartBurst, setHeartBurst] = useState<boolean>(false);
  const [celebrationBurst, setCelebrationBurst] = useState<boolean>(false);
  const [fallingPetals, setFallingPetals] = useState<FallingPetal[]>([]);

  // Synchronize falling petals strictly 1-to-1 with genuine database petals containing real messages
  useEffect(() => {
    const validPetals = dbPetals.filter((msg) => msg.text && msg.text.trim().length > 0);

    const animClasses = [
      'animate-petal-float-1',
      'animate-petal-float-2',
      'animate-petal-float-3',
      'animate-petal-float-4',
    ];

    const initial: FallingPetal[] = validPetals.map((msg, i) => ({
      id: msg.id || i + 1,
      xPercent: (i * 29 + 10) % 78 + 8, // Distributed evenly across box width
      yPercent: (i * 37 + 12) % 65 + 12, // Distributed across box height
      animClass: animClasses[i % animClasses.length],
      rotation: (Math.random() - 0.5) * 20,
      text: msg.text,
      author: msg.author,
      country: msg.country,
      isStatic: false,
    }));

    setFallingPetals(initial);
  }, [dbPetals]);

  // Atmospheric Canvas: Fog, Light Beams, Floating Particles inside the Memory Box
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let w = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let h = (canvas.height = canvas.parentElement?.clientHeight || 480);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      w = canvas.width = canvas.parentElement.clientWidth;
      h = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    const dustParticles = Array.from({ length: 25 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 1,
      alpha: Math.random() * 0.5 + 0.2,
      vAlpha: (Math.random() * 0.008 + 0.002) * (Math.random() > 0.5 ? 1 : -1),
    }));

    const render = () => {
      ctx.clearRect(0, 0, w, h);

      // Soft Fog Gradient inside Memory Box
      const fogGrd = ctx.createLinearGradient(0, 0, 0, h);
      fogGrd.addColorStop(0, 'rgba(12, 13, 18, 0.4)');
      fogGrd.addColorStop(0.5, 'rgba(229, 193, 88, 0.04)');
      fogGrd.addColorStop(1, 'rgba(12, 13, 18, 0.8)');
      ctx.fillStyle = fogGrd;
      ctx.fillRect(0, 0, w, h);

      // Render Floating Dust Particles
      dustParticles.forEach((dp) => {
        dp.alpha += dp.vAlpha;
        if (dp.alpha <= 0.1 || dp.alpha >= 0.7) dp.vAlpha = -dp.vAlpha;

        ctx.beginPath();
        ctx.fillStyle = `rgba(229, 193, 88, ${Math.max(0, dp.alpha)})`;
        ctx.arc(dp.x, dp.y, dp.r, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  // HIGH-PERFORMANCE GPU ACCELERATED RANDOM FLOATING & BOUNCING PHYSICS ENGINE
  useEffect(() => {
    let animId: number;

    const updatePhysics = () => {
      const container = containerBoxRef.current;
      if (!container) return;

      const boxWidth = container.clientWidth || 800;
      const boxHeight = container.clientHeight || 500;

      const elements = container.querySelectorAll('.petal-node') as NodeListOf<HTMLButtonElement>;
      elements.forEach((el) => {
        const id = el.getAttribute('data-petal-id');
        if (!id) return;

        const isStatic = el.getAttribute('data-static') === 'true';
        if (isStatic) return;

        const initXPercent = parseFloat(el.getAttribute('data-init-x') || '50');
        const initYPercent = parseFloat(el.getAttribute('data-init-y') || '50');

        const initX = (initXPercent / 100) * boxWidth;
        const initY = (initYPercent / 100) * boxHeight;

        // Initialize state if not present
        if (!physicsRefs.current[id]) {
          physicsRefs.current[id] = {
            x: initX,
            y: initY,
            vx: (Math.random() - 0.5) * 0.9, // Pixels per frame drift speed
            vy: (Math.random() - 0.5) * 0.9,
            swaySpeed: 0.01 + Math.random() * 0.02,
            swayRange: 6 + Math.random() * 12,
            phase: Math.random() * Math.PI * 2,
            rotation: (Math.random() - 0.5) * 360,
            rotationSpeed: (Math.random() - 0.5) * 0.25,
            isHovered: false,
          };
        }

        const state = physicsRefs.current[id];
        const isHovered = Boolean(state.isHovered || el.matches(':hover'));

        // Advance position only when NOT static and NOT hovered
        if (!isStatic && !isHovered) {
          state.x += state.vx;
          state.y += state.vy;
          state.phase += state.swaySpeed;
          state.rotation += state.rotationSpeed;

          // Keep strictly inside the boundary of the sanctuary box in pixels
          const paddingX = 40;
          const paddingY = 40;
          const xMin = paddingX;
          const xMax = boxWidth - paddingX;
          const yMin = paddingY;
          const yMax = boxHeight - paddingY;

          if (state.x < xMin) {
            state.x = xMin;
            state.vx = Math.abs(state.vx);
          } else if (state.x > xMax) {
            state.x = xMax;
            state.vx = -Math.abs(state.vx);
          }

          if (state.y < yMin) {
            state.y = yMin;
            state.vy = Math.abs(state.vy);
          } else if (state.y > yMax) {
            state.y = yMax;
            state.vy = -Math.abs(state.vy);
          }
        }

        // Calculate offset from initial position
        const dx = state.x - initX;
        const dy = state.y - initY;

        // Sway coordinates organic
        const swayX = Math.sin(state.phase) * state.swayRange;
        const swayY = Math.cos(state.phase * 0.85) * (state.swayRange * 0.7);

        // Smooth scale & zIndex boost on hover/static
        const scale = isStatic ? 1.35 : isHovered ? 1.25 : 1;
        el.style.zIndex = isStatic ? '30' : isHovered ? '40' : '10';

        // Apply pure 3D transforms offloaded to GPU
        el.style.transform = `translate3d(${dx + swayX}px, ${dy + swayY}px, 0) rotate(${state.rotation}deg) scale(${scale})`;
      });

      animId = requestAnimationFrame(updatePhysics);
    };

    animId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animId);
  }, [fallingPetals]);

  const handlePetalHoverEnter = (id: number | string) => {
    if (physicsRefs.current[id]) {
      physicsRefs.current[id].isHovered = true;
    }
  };

  const handlePetalHoverLeave = (id: number | string) => {
    if (physicsRefs.current[id]) {
      physicsRefs.current[id].isHovered = false;
    }
  };

  const handlePetalTap = (p: FallingPetal) => {
    // Highlight & freeze selected petal static
    setFallingPetals((prev) =>
      prev.map((item) => (item.id === p.id ? { ...item, isStatic: true } : item))
    );
    setActiveUnfoldedPetal(p);
  };

  const handleCloseModal = () => {
    if (activeUnfoldedPetal) {
      setFallingPetals((prev) =>
        prev.map((item) => (item.id === activeUnfoldedPetal.id ? { ...item, isStatic: false } : item))
      );
    }
    setActiveUnfoldedPetal(null);
  };

  const handleSendLove = () => {
    setLoveCount((prev) => prev + 1);
    setHeartBurst(true);
    setCelebrationBurst(true);
    setTimeout(() => setHeartBurst(false), 1600);
  };

  const handleAddCommunityPetal = async (name: string, country: string, message: string) => {
    const newPetal = await addSupabasePetal(name, country, message);

    if (newPetal) {
      const newFalling: FallingPetal = {
        id: newPetal.id,
        xPercent: 50,
        yPercent: 30,
        animClass: 'animate-petal-float-1',
        rotation: 0,
        text: newPetal.text,
        author: newPetal.author,
        country: newPetal.country,
        isStatic: false,
      };

      setFallingPetals((prev) => [newFalling, ...prev]);
    }

    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2200);
  };

  return (
    <section
      id="reflection-chapter-container"
      className="relative w-full min-h-screen bg-[#0B0B0F] text-[#f0f0f5] font-general select-none py-24 sm:py-32 px-6 sm:px-12 overflow-hidden flex flex-col justify-between"
    >
      {/* ATMOSPHERIC BACKGROUND ILLUMINATION */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0F]/90 via-[#0B0B0F]/60 to-[#0B0B0F] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(229,193,88,0.18),transparent_70%)] pointer-events-none z-0" />

      {/* HEADER CONTENT */}
      <div className="relative z-20 max-w-4xl mx-auto text-center flex flex-col items-center gap-6 sm:gap-8">
        <div className="flex items-center gap-2.5 text-[#e5c158] bg-[#0c0d12]/90 px-5 py-2 rounded-full border border-[#e5c158]/40 backdrop-blur-xl shadow-2xl">
          <Sparkles className="w-4 h-4 animate-spin-slow" />
          <span className="font-general text-[11px] sm:text-xs font-bold uppercase tracking-[0.35em]">
            The Tree of Gratitude ({fallingPetals.length} Memory Petals)
          </span>
        </div>

        <h2 className="font-general text-4xl sm:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#e5c158] via-white to-[#e5c158] tracking-tight drop-shadow-[0_0_60px_rgba(229,193,88,0.45)] leading-tight">
          Reflection Chapter
        </h2>

        {/* ELEGANT SPACED REFLECTION ESSAY QUOTE */}
        <div className="my-4 sm:my-6 p-6 sm:p-10 rounded-3xl bg-[#0c0d12]/80 border border-[#e5c158]/35 backdrop-blur-2xl shadow-2xl max-w-3xl">
          <p className="font-serif italic text-base sm:text-2xl text-[#f0f0f5]/90 leading-relaxed sm:leading-loose tracking-wide">
            “Every petal falling inside this garden holds a real memory planted by someone whose life was touched by Shree.”
          </p>
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

      {/* DEDICATED INTERACTIVE FALLING PETALS SANCTUARY BOX */}
      <div className="relative z-20 w-full max-w-5xl mx-auto h-[480px] sm:h-[560px] rounded-3xl bg-[#0c0d12]/90 border-2 border-[#e5c158]/50 shadow-[0_0_90px_rgba(229,193,88,0.25)] overflow-hidden my-10 sm:my-16 p-6 flex flex-col items-center justify-between backdrop-blur-3xl select-none">
        
        {/* Ambient Canvas Background inside Box */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

        {/* Box Instruction Badge */}
        <div className="relative z-10 flex items-center gap-2 text-[#e5c158] bg-[#050507]/90 px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-full border border-[#e5c158]/40 text-[10px] sm:text-sm font-bold uppercase tracking-[0.12em] sm:tracking-[0.25em] shadow-2xl animate-pulse text-center max-w-[92%]">
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#e5c158] shrink-0" />
          <span>Tap any floating memory petal below to freeze & unfold 🌸</span>
        </div>

        {/* 1-TO-1 PURE LUXURY CHERRY BLOSSOM ORGANIC PETAL NODES */}
        <div ref={containerBoxRef} className="absolute inset-0 z-10 w-full h-full pointer-events-none">
          {fallingPetals.map((p) => (
            <button
              key={p.id}
              onClick={() => handlePetalTap(p)}
              onMouseEnter={() => handlePetalHoverEnter(p.id)}
              onMouseLeave={() => handlePetalHoverLeave(p.id)}
              data-cursor-hover
              data-petal-id={p.id}
              data-init-x={p.xPercent}
              data-init-y={p.yPercent}
              data-static={p.isStatic ? 'true' : 'false'}
              style={{
                left: `${p.xPercent}%`,
                top: `${p.yPercent}%`,
              }}
              className={`absolute pointer-events-auto group w-8 h-12 rounded-[50%_0_50%_50%] transition-transform duration-200 ease-out active:scale-95 cursor-pointer flex items-center justify-center ${
                p.isStatic
                  ? 'bg-gradient-to-br from-[#e5c158] via-[#ffd700] to-[#b89530] border-2 border-white shadow-[0_0_35px_#e5c158] z-30'
                  : 'bg-gradient-to-br from-rose-300/90 via-pink-400/95 to-rose-400/90 border-2 border-[#e5c158]/70 hover:border-white shadow-[0_0_20px_rgba(244,63,94,0.45)] hover:shadow-[0_0_35px_rgba(255,255,255,0.9)]'
              } petal-node`}
            >
              {/* Central Glowing Heart Essence inside Petal */}
              <Heart className={`w-3.5 h-3.5 ${p.isStatic ? 'text-[#0c0d12] fill-[#0c0d12]' : 'text-white/80 fill-white/80 group-hover:scale-130 group-hover:text-white'} transition-all duration-200`} />
            </button>
          ))}
        </div>

        {/* Bottom Box Counter Tag */}
        <div className="relative z-10 text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-[#e5c158]/70 bg-[#050507]/70 px-4 py-1 rounded-full border border-[#e5c158]/20">
          Floating {fallingPetals.length} Memory Petals
        </div>
      </div>

      {/* FULL-SCREEN CELEBRATION BURST ON LOVE CLICK */}
      <CelebrationBurst trigger={celebrationBurst} onComplete={() => setCelebrationBurst(false)} />

      {/* INTERACTIVE SEND LOVE TO SHREE FEATURE */}
      <div className="relative z-20 flex flex-col items-center gap-4 my-6 sm:my-10">
        <SpecularButton
          size="lg"
          radius={28}
          lineColor="#f43f5e"
          baseColor="#0c0d12"
          onClick={handleSendLove}
          className="px-8 py-4 text-[#f0f0f5]"
        >
          <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
          <span>Send Love to Shree ({loveCount.toLocaleString()}) 💖</span>
        </SpecularButton>

        {heartBurst && (
          <div className="animate-fade-in text-xs font-bold text-rose-300 uppercase tracking-widest">
            💖 Heart sent into the sky!
          </div>
        )}
      </div>

      {/* GLOBAL STAR BLESSING COUNTER */}
      <div className="relative z-20 max-w-xl w-full px-4 my-8">
        <StarBlessingCounter />
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
              Unfolded Memory Petal 🌸
            </span>

            <p className="font-serif italic text-lg sm:text-2xl text-[#f0f0f5] leading-relaxed sm:leading-loose tracking-wide">
              “{activeUnfoldedPetal.text}”
            </p>

            <div className="flex flex-col gap-1.5 text-xs sm:text-sm font-semibold text-[#e5c158]/90 uppercase tracking-widest">
              <span>— Written by {activeUnfoldedPetal.author}</span>
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
