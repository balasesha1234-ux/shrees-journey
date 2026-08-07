import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Heart, Compass, BookOpen, Feather, Flame, Trees, CheckCircle2, AlertCircle } from 'lucide-react';
import { ASSET_PATHS } from '../utils/assetPaths';

interface LevelData {
  level: number;
  title: string;
  guideSentence: string;
  question: string;
  videoSrc: string;
  clueObject: {
    name: string;
    icon: React.ReactNode;
    discoveryTitle: string;
    discoveryText: string;
  };
  options: {
    text: string;
    isCorrect: boolean;
  }[];
}

const WORLD_LEVELS: LevelData[] = [
  {
    level: 1,
    title: 'The Inception',
    guideSentence: 'Look closely at what held the first quiet thoughts before the world arrived.',
    question: 'When did this journey begin?',
    videoSrc: ASSET_PATHS.world.level1Video,
    clueObject: {
      name: 'An Old Leather Notebook',
      icon: <BookOpen className="w-6 h-6 text-[#e5c158]" />,
      discoveryTitle: 'Memory Discovered: The First Entry',
      discoveryText: '“August 2023: If even one person feels less alone today, then every hour spent editing is worth it. Consistency with pure faith will light the path.”',
    },
    options: [
      { text: 'August 2023 • Pure faith & daily consistency', isCorrect: true },
      { text: 'January 2022 • A viral accident', isCorrect: false },
      { text: 'Late 2024 • Impatient marketing', isCorrect: false },
    ],
  },
  {
    level: 2,
    title: 'The Breakthrough',
    guideSentence: 'The spark of momentum leaves a glowing mark where passion meets camera.',
    question: 'What milestone changed everything?',
    videoSrc: ASSET_PATHS.world.level2Video,
    clueObject: {
      name: 'Vintage Camera & Butterfly',
      icon: <Feather className="w-6 h-6 text-[#e5c158]" />,
      discoveryTitle: 'Memory Discovered: The Breakthrough Lens',
      discoveryText: '“2024: A massive breakthrough that united hundreds of thousands. Authenticity transformed followers into a global family.”',
    },
    options: [
      { text: '2024 • Reaching 1 Million & authentic breakthrough', isCorrect: true },
      { text: 'Winning an award in 2021', isCorrect: false },
      { text: 'Selling merchandise', isCorrect: false },
    ],
  },
  {
    level: 3,
    title: 'The Community',
    guideSentence: 'Listen to the warmth drifting softly on the night breeze.',
    question: 'What value stayed constant throughout every chapter?',
    videoSrc: ASSET_PATHS.world.level3Video,
    clueObject: {
      name: 'A Flickering Sky Lantern',
      icon: <Flame className="w-6 h-6 text-[#e5c158]" />,
      discoveryTitle: 'Memory Discovered: Letter of Gratitude',
      discoveryText: '“Through 2023, 2024, and 2025: Humility, gratitude, and genuine empathy stayed true across every milestone.”',
    },
    options: [
      { text: 'Humility, gratitude, and genuine empathy', isCorrect: true },
      { text: 'Pursuit of numerical targets', isCorrect: false },
      { text: 'Following internet trends', isCorrect: false },
    ],
  },
  {
    level: 4,
    title: 'The Summit & Legacy',
    guideSentence: 'The oldest tree holds the deepest carved truth.',
    question: 'What does consistency create?',
    videoSrc: ASSET_PATHS.world.level4Video,
    clueObject: {
      name: 'An Ancient Tree Carving',
      icon: <Trees className="w-6 h-6 text-[#e5c158]" />,
      discoveryTitle: 'Memory Discovered: The Summit',
      discoveryText: '“2026 Summit: 5 Million Reached. When dreams meet discipline, a quiet effort creates a permanent home for millions.”',
    },
    options: [
      { text: 'A permanent home & family for 5 Million people', isCorrect: true },
      { text: 'Fame that disappears quickly', isCorrect: false },
      { text: 'A temporary distraction', isCorrect: false },
    ],
  },
];

interface FallingPetal {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  text: string;
  author: string;
}

const DEFAULT_PETAL_MESSAGES = [
  { text: 'Thank you for inspiring me every single day.', author: 'A grateful supporter' },
  { text: 'Your videos changed my life when I needed it most.', author: 'Community member' },
  { text: 'You made difficult days so much easier.', author: 'Longtime follower' },
  { text: 'I will always remember this beautiful journey.', author: 'Global fan' },
  { text: 'Dreams grow when we keep showing up with passion.', author: 'Fellow creator' },
];

interface ShreesWorldSceneProps {
  onOpenSecretChapter?: () => void;
}

export const ShreesWorldScene: React.FC<ShreesWorldSceneProps> = ({ onOpenSecretChapter }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [activeLevel, setActiveLevel] = useState<number>(1);
  const [discoveredClue, setDiscoveredClue] = useState<boolean>(false);
  const [showClueModal, setShowClueModal] = useState<boolean>(false);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // Video Background Fallback State
  const [videoError, setVideoError] = useState(false);

  // Level 5 Natural Falling Petals
  const [petalsPool, setPetalsPool] = useState<FallingPetal[]>([]);
  const [activeUnfoldedPetal, setActiveUnfoldedPetal] = useState<FallingPetal | null>(null);

  // Leave a Message Form
  const [isAddingMessage, setIsAddingMessage] = useState(false);
  const [userText, setUserText] = useState('');
  const [userAuthor, setUserAuthor] = useState('');

  const currentLevelData = WORLD_LEVELS[activeLevel - 1];
  const activeVideoSrc = activeLevel === 5 
    ? ASSET_PATHS.world.level5Video 
    : currentLevelData?.videoSrc || ASSET_PATHS.world.masterVideo;

  // Reset interaction state on level change
  useEffect(() => {
    setDiscoveredClue(false);
    setShowClueModal(false);
    setSelectedOptionIdx(null);
    setIsCorrect(null);
    setVideoError(false);
  }, [activeLevel]);

  // Overlay Canvas Particles (Atmospheric ambient sparkles)
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

    // Initialize Falling Petals for Level 5
    if (activeLevel === 5 && petalsPool.length === 0) {
      const initial = DEFAULT_PETAL_MESSAGES.map((msg, i) => ({
        id: i + 1,
        x: Math.random() * (w - 200) + 100,
        y: Math.random() * (h * 0.6),
        vx: Math.random() * 0.7 + 0.3,
        vy: Math.random() * 0.6 + 0.4,
        rotation: Math.random() * Math.PI * 2,
        text: msg.text,
        author: msg.author,
      }));
      setPetalsPool(initial);
    }

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, w, h);

      // Render Falling Petals Engine (Level 5)
      if (activeLevel === 5) {
        petalsPool.forEach((p) => {
          if (activeUnfoldedPetal?.id !== p.id) {
            p.x += p.vx + Math.sin(time + p.x) * 0.3;
            p.y += p.vy;
            p.rotation += 0.01;

            if (p.y > h + 20) {
              p.y = -20;
              p.x = Math.random() * w;
            }
          }
        });
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [activeLevel, petalsPool, activeUnfoldedPetal]);

  const handleOptionSelect = (idx: number, isCorr: boolean) => {
    setSelectedOptionIdx(idx);
    setIsCorrect(isCorr);
  };

  const handlePetalClick = (p: FallingPetal) => {
    setActiveUnfoldedPetal(p);
  };

  const handleClosePetalModal = () => {
    if (activeUnfoldedPetal) {
      setPetalsPool((prev) =>
        prev.map((p) =>
          p.id === activeUnfoldedPetal.id ? { ...p, vx: 6, vy: -4 } : p
        )
      );
      setActiveUnfoldedPetal(null);
    }
  };

  const handleAddMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userText.trim()) return;
    const newPetal: FallingPetal = {
      id: Date.now(),
      x: window.innerWidth * 0.5,
      y: 60,
      vx: Math.random() * 0.6 + 0.3,
      vy: Math.random() * 0.5 + 0.4,
      rotation: 0,
      text: userText.trim(),
      author: userAuthor.trim() || 'Anonymous Friend',
    };

    setPetalsPool((prev) => [...prev, newPetal]);
    setUserText('');
    setUserAuthor('');
    setIsAddingMessage(false);
    setActiveUnfoldedPetal(newPetal);
  };

  return (
    <section
      id="shrees-world-container"
      className="relative w-full min-h-screen bg-[#050507] text-[#f0f0f5] font-general select-none py-12 px-6 overflow-hidden flex flex-col justify-between"
    >
      {/* FULL-BLEED LOOPING VIDEO BACKGROUND LAYER */}
      {!videoError ? (
        <video
          key={activeVideoSrc}
          autoPlay
          loop
          muted
          playsInline
          onError={() => setVideoError(true)}
          className="absolute inset-0 w-full h-full object-cover z-0 filter brightness-75 contrast-105 transition-opacity duration-1000"
        >
          <source src={activeVideoSrc} type="video/mp4" />
          <source src={ASSET_PATHS.world.masterVideo} type="video/mp4" />
        </video>
      ) : (
        /* Atmospheric Gradient Fallback if video placeholder is missing */
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0a1d37] via-[#1e4875] to-[#050507] opacity-80" />
      )}

      {/* Dark Scrim Overlay for Typography Contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050507]/70 via-[#050507]/40 to-[#050507]/90 z-0 pointer-events-none" />

      {/* Canvas Overlay for Petals & Dust */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none" />

      {/* Header Level Indicator */}
      <header className="relative z-20 max-w-5xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-6 rounded-2xl bg-[#0c0d12]/80 border border-[#e5c158]/30 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-[#e5c158] animate-spin-slow" />
          <span className="font-general text-xs font-bold uppercase tracking-[0.25em] text-[#e5c158]">
            Shree's World • Chapter {activeLevel} of 5
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto max-w-full py-1">
          {[1, 2, 3, 4, 5].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setActiveLevel(lvl)}
              data-cursor-hover
              className={`px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeLevel === lvl
                  ? 'bg-[#e5c158] text-[#050507] shadow-[0_0_15px_rgba(229,193,88,0.5)]'
                  : 'bg-white/5 text-[#f0f0f5]/60 hover:text-[#f0f0f5]'
              }`}
            >
              Chapter {lvl}
            </button>
          ))}
        </div>
      </header>

      {/* LEVELS 1 to 4: ZERO-UI ENVIRONMENTAL DISCOVERY OVER LOOPING VIDEO */}
      {activeLevel <= 4 && currentLevelData && (
        <div className="relative z-10 max-w-4xl mx-auto w-full my-6 flex flex-col items-center gap-8">
          
          {/* Guide Character Narrative */}
          <div className="w-full p-6 md:p-8 rounded-3xl bg-[#0c0d12]/90 border border-[#e5c158]/35 backdrop-blur-xl shadow-[0_0_40px_rgba(229,193,88,0.2)] flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 rounded-full border-2 border-[#e5c158] overflow-hidden shrink-0 shadow-[0_0_20px_rgba(229,193,88,0.5)] bg-[#050507]">
              <img
                src={ASSET_PATHS.guide.characterImage}
                alt="Guide Curator"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div className="flex flex-col gap-1 text-center md:text-left">
              <span className="font-general text-[10px] font-bold uppercase tracking-[0.3em] text-[#e5c158]">
                Memory Curator
              </span>
              <p className="font-general italic text-base md:text-lg text-[#f0f0f5] leading-relaxed">
                “{currentLevelData.guideSentence}”
              </p>
            </div>
          </div>

          {/* Natural Environmental Clue Interactive Node over Looping Video */}
          <div className="relative w-full h-56 md:h-72 rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-md overflow-hidden flex items-center justify-center">
            <button
              onClick={() => {
                setDiscoveredClue(true);
                setShowClueModal(true);
              }}
              data-cursor-hover
              className="group relative p-8 rounded-full bg-[#0c0d12]/85 border border-[#e5c158]/50 hover:border-[#e5c158] shadow-[0_0_30px_rgba(229,193,88,0.3)] hover:shadow-[0_0_50px_rgba(229,193,88,0.8)] hover:scale-110 transition-all duration-500 flex flex-col items-center gap-2 cursor-pointer"
            >
              <div className="text-[#e5c158] group-hover:rotate-12 transition-transform duration-300">
                {currentLevelData.clueObject.icon}
              </div>
              <span className="font-general text-xs font-bold text-[#f0f0f5] opacity-80 group-hover:opacity-100 transition-opacity">
                {currentLevelData.clueObject.name}
              </span>
            </button>
          </div>

          {/* Emotional Question Card */}
          {discoveredClue && (
            <div className="w-full p-6 md:p-8 rounded-3xl bg-[#0c0d12]/95 border border-[#e5c158]/40 backdrop-blur-xl shadow-2xl flex flex-col items-start gap-6 animate-fade-in">
              <span className="font-general text-[10px] font-bold uppercase tracking-[0.25em] text-[#e5c158]">
                Emotional Memory Question
              </span>
              <h4 className="font-general text-xl sm:text-2xl font-bold text-[#f0f0f5]">
                “{currentLevelData.question}”
              </h4>

              <div className="flex flex-col gap-3 w-full">
                {currentLevelData.options.map((opt, idx) => {
                  const isSelected = selectedOptionIdx === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleOptionSelect(idx, opt.isCorrect)}
                      data-cursor-hover
                      className={`flex items-center justify-between p-4 rounded-2xl text-left font-general text-sm font-semibold transition-all duration-300 ${
                        isSelected
                          ? opt.isCorrect
                            ? 'bg-emerald-500/20 border-2 border-emerald-400 text-emerald-300 shadow-[0_0_25px_rgba(52,211,153,0.3)]'
                            : 'bg-rose-500/20 border-2 border-rose-400 text-rose-300'
                          : 'bg-white/5 border border-white/10 text-[#f0f0f5]/80 hover:border-[#e5c158]/50 hover:text-[#f0f0f5]'
                      }`}
                    >
                      <span>{opt.text}</span>
                      {isSelected && opt.isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      )}
                      {isSelected && !opt.isCorrect && (
                        <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Positive Environment Reaction Banner */}
              {isCorrect === true && (
                <div className="w-full p-4 rounded-2xl bg-emerald-500/20 border border-emerald-400 text-emerald-300 font-general text-xs font-bold uppercase tracking-wider flex items-center justify-between animate-fade-in">
                  <span>✨ Correct! Flowers bloom, birds fly, gate opens, and the guide smiles.</span>
                  <button
                    onClick={() => setActiveLevel((prev) => Math.min(5, prev + 1))}
                    className="px-4 py-1.5 rounded-full bg-emerald-400 text-[#050507] hover:scale-105 transition-transform"
                  >
                    Proceed to Chapter {activeLevel + 1} →
                  </button>
                </div>
              )}

              {/* Gentle Encouragement */}
              {isCorrect === false && (
                <div className="w-full p-4 rounded-2xl bg-amber-500/20 border border-amber-400 text-amber-300 font-general text-xs font-medium flex items-center gap-2 animate-fade-in">
                  <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>The guide calmly says: “Some memories take a little longer to understand.” Try again!</span>
                </div>
              )}
            </div>
          )}

        </div>
      )}

      {/* LEVEL 5: REFLECTION LAKE & NATURAL FALLING PETALS OVER VIDEO */}
      {activeLevel === 5 && (
        <div className="relative z-10 max-w-4xl mx-auto w-full my-6 flex flex-col items-center text-center gap-6">
          <div className="p-8 rounded-3xl bg-[#0c0d12]/90 border border-[#e5c158]/40 backdrop-blur-xl shadow-2xl flex flex-col items-center gap-4">
            <span className="font-general text-xs font-bold uppercase tracking-[0.3em] text-[#e5c158]">
              Level 5 • The Great Blossom Tree
            </span>
            <h3 className="font-general text-3xl sm:text-4xl font-extrabold text-[#f0f0f5]">
              Falling Petals of Gratitude
            </h3>
            <p className="font-general italic text-sm sm:text-base text-[#f0f0f5]/80">
              “Catch a falling petal to hear the voices of gratitude.”
            </p>

            {/* Interactive Canvas Falling Petals Container */}
            <div className="relative w-full h-64 my-2 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-md overflow-hidden flex items-center justify-center">
              {petalsPool.map((petal) => (
                <button
                  key={petal.id}
                  onClick={() => handlePetalClick(petal)}
                  data-cursor-hover
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 p-2.5 rounded-full bg-rose-300/50 hover:bg-[#e5c158] text-[#050507] hover:scale-150 transition-all duration-300 cursor-pointer shadow-[0_0_15px_rgba(229,193,88,0.5)]"
                  style={{
                    left: `${petal.x}px`,
                    top: `${petal.y}px`,
                    transform: `rotate(${petal.rotation}rad)`,
                  }}
                  title="Click to unfold falling petal"
                >
                  <Heart className="w-4 h-4 fill-current text-[#050507]" />
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsAddingMessage(true)}
              data-cursor-hover
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#e5c158] text-[#050507] font-general text-xs font-extrabold uppercase tracking-widest shadow-[0_0_25px_rgba(229,193,88,0.4)] hover:scale-105 transition-transform"
            >
              <Heart className="w-4 h-4 fill-current" />
              <span>Leave Your Message for Future Versions</span>
            </button>

            {/* Secret Chapter Trigger */}
            {onOpenSecretChapter && (
              <button
                onClick={onOpenSecretChapter}
                data-cursor-hover
                className="mt-2 flex items-center gap-2 px-6 py-3 rounded-full bg-[#0c0d12] border border-[#e5c158]/60 text-xs font-bold uppercase tracking-widest text-[#f0f0f5] hover:text-[#e5c158] hover:border-[#e5c158] transition-all duration-300 shadow-xl"
              >
                <span>Unlock Secret Chapter (Private Letter)</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Memory Clue Discovery Popup */}
      {showClueModal && currentLevelData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl animate-fade-in">
          <div className="relative max-w-lg w-full p-8 rounded-3xl bg-[#0c0d12] border border-[#e5c158] text-center flex flex-col items-center gap-5 shadow-[0_0_60px_rgba(229,193,88,0.4)]">
            <div className="w-14 h-14 rounded-full bg-[#e5c158]/20 border border-[#e5c158] flex items-center justify-center text-[#e5c158] shadow-[0_0_20px_rgba(229,193,88,0.5)]">
              {currentLevelData.clueObject.icon}
            </div>

            <span className="font-general text-xs font-bold uppercase tracking-[0.3em] text-[#e5c158]">
              {currentLevelData.clueObject.discoveryTitle}
            </span>

            <p className="font-general italic text-base md:text-lg text-[#f0f0f5] leading-relaxed">
              {currentLevelData.clueObject.discoveryText}
            </p>

            <button
              onClick={() => setShowClueModal(false)}
              data-cursor-hover
              className="mt-2 px-8 py-3 rounded-full bg-[#e5c158] text-[#050507] font-general text-xs font-extrabold uppercase tracking-wider hover:scale-105 transition-transform"
            >
              Understand Clue & Answer Question
            </button>
          </div>
        </div>
      )}

      {/* Unfolded Petal Message Modal (Level 5) */}
      {activeUnfoldedPetal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl animate-fade-in">
          <div className="relative max-w-md w-full p-8 rounded-3xl bg-[#0c0d12] border border-[#e5c158] text-center flex flex-col items-center gap-4 shadow-[0_0_60px_rgba(229,193,88,0.4)]">
            <Heart className="w-10 h-10 text-[#e5c158] fill-[#e5c158] animate-pulse" />
            
            <span className="font-general text-xs font-bold uppercase tracking-widest text-[#e5c158]">
              Unfolded Petal Message
            </span>

            <p className="font-general italic text-lg text-[#f0f0f5]">
              “{activeUnfoldedPetal.text}”
            </p>

            <span className="font-general text-xs uppercase tracking-widest text-[#e5c158]/80 font-semibold">
              — {activeUnfoldedPetal.author}
            </span>

            <button
              onClick={handleClosePetalModal}
              data-cursor-hover
              className="mt-4 px-6 py-2.5 rounded-full bg-[#e5c158] text-[#050507] font-general text-xs font-extrabold uppercase tracking-wider hover:scale-105 transition-transform"
            >
              Let Petal Fly Away ✨
            </button>
          </div>
        </div>
      )}

      {/* Leave Your Message Form Modal */}
      {isAddingMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/85 backdrop-blur-xl animate-fade-in">
          <form
            onSubmit={handleAddMessageSubmit}
            className="relative max-w-md w-full p-8 rounded-3xl bg-[#0c0d12] border border-[#e5c158] text-center flex flex-col items-center gap-4 shadow-[0_0_60px_rgba(229,193,88,0.4)]"
          >
            <Sparkles className="w-8 h-8 text-[#e5c158]" />
            <h4 className="font-general text-xl font-extrabold text-[#f0f0f5]">
              Leave Your Message
            </h4>

            <textarea
              required
              rows={3}
              placeholder="Write your message for future versions..."
              value={userText}
              onChange={(e) => setUserText(e.target.value)}
              className="w-full p-4 rounded-2xl bg-white/5 border border-white/20 text-[#f0f0f5] font-general text-sm focus:outline-none focus:border-[#e5c158]"
            />

            <input
              type="text"
              placeholder="Your Name / Handle (Optional)"
              value={userAuthor}
              onChange={(e) => setUserAuthor(e.target.value)}
              className="w-full p-3 rounded-2xl bg-white/5 border border-white/20 text-[#f0f0f5] font-general text-xs focus:outline-none focus:border-[#e5c158]"
            />

            <div className="flex items-center gap-3 w-full mt-2">
              <button
                type="button"
                onClick={() => setIsAddingMessage(false)}
                className="flex-1 py-2.5 rounded-full border border-white/20 text-xs uppercase font-bold text-[#f0f0f5]/70 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-full bg-[#e5c158] text-[#050507] text-xs uppercase font-extrabold"
              >
                Spawn Golden Petal
              </button>
            </div>
          </form>
        </div>
      )}

    </section>
  );
};
