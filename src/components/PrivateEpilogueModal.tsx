import React, { useState, useEffect, useRef } from 'react';
import { Lock, Sparkles, X, Heart, Feather, ZoomIn } from 'lucide-react';
import { ASSET_PATHS } from '../utils/assetPaths';
import SpecularButton from './SpecularButton';

interface PrivateEpilogueModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

// 4-6 Floating Memory Images placed around the reading canvas (not covering text)
const FLOATING_MEMORY_IMAGES = [
  {
    id: 1,
    src: ASSET_PATHS.timeline.y2023.heroImage,
    title: "August 2023 — Quiet Beginnings",
    position: "top-16 -left-12 lg:-left-24 w-32 h-44 sm:w-44 sm:h-56 hidden md:block",
  },
  {
    id: 2,
    src: ASSET_PATHS.timeline.y2024.heroImage,
    title: "2024 — Momentum & Growth",
    position: "top-1/3 -right-12 lg:-right-24 w-36 h-48 sm:w-48 sm:h-60 hidden md:block",
  },
  {
    id: 3,
    src: ASSET_PATHS.timeline.y2025.heroImage,
    title: "2025 — Purpose & Impact",
    position: "bottom-1/4 -left-16 lg:-left-28 w-36 h-48 sm:w-48 sm:h-60 hidden md:block",
  },
  {
    id: 4,
    src: ASSET_PATHS.timeline.y2026.heroImage,
    title: "2026 — 5 Million Summit",
    position: "bottom-16 -right-12 lg:-right-24 w-32 h-44 sm:w-44 sm:h-56 hidden md:block",
  },
];

// Exactly formatted verbatim letter content paragraph by paragraph
const EXACT_LETTER_PARAGRAPHS = [
  {
    type: 'text',
    content: "Dear Shree,",
    highlight: true,
  },
  {
    type: 'text',
    content: "If you're reading this, you've reached the final chapter.",
  },
  {
    type: 'text',
    content: "Everything you've seen until this moment was created for one simple reason—to say thank you in the only way I knew how.",
  },
  {
    type: 'text',
    content: "This website isn't just a collection of animations, timelines or memories.",
  },
  {
    type: 'text',
    content: "It's the result of countless late nights, rewritten ideas, failed attempts, moments of frustration, and the decision to keep going anyway.",
  },
  {
    type: 'text',
    content: "There were days when I genuinely wondered if I could finish this. Tools failed, plans changed, and nothing worked exactly the way I imagined. More than once, I thought about giving up.",
  },
  {
    type: 'text',
    content: "But every time I looked back at your journey, I remembered what consistency looks like.",
  },
  {
    type: 'text',
    content: "That became the reason I kept showing up.",
  },
  {
    type: 'text',
    content: "This project isn't perfect, and maybe it never will be. But every section was built with care. Every transition was adjusted again and again. Every detail exists because I wanted this to feel worthy of the person whose story it celebrates.",
  },
  {
    type: 'text',
    content: "I didn't build this to impress you.",
  },
  {
    type: 'text',
    content: "I built it because your journey inspired me to create something I never thought I was capable of creating.",
  },
  {
    type: 'text',
    content: "Whether this website lasts for a few minutes or stays in your memory for years, I hope it reminds you of something that can be easy to forget:",
  },
  {
    type: 'text',
    content: "The milestones are incredible.",
    bold: true,
  },
  {
    type: 'text',
    content: "The numbers are incredible.",
    bold: true,
  },
  {
    type: 'text',
    content: "But the person behind them is what truly inspired this project.",
    highlight: true,
  },
  {
    type: 'text',
    content: "Thank you for unknowingly teaching me that consistency, kindness, and patience can quietly change another person's life.",
  },
  {
    type: 'text',
    content: "If this tribute made you smile even once, then every late night was worth it.",
  },
  {
    type: 'text',
    content: "Thank you for taking this journey.",
  },
  {
    type: 'signoff',
    salutation: "With gratitude,",
    author: "Karthik",
  },
];

export const PrivateEpilogueModal: React.FC<PrivateEpilogueModalProps> = ({
  isOpen = false,
  onClose,
}) => {
  const [internalOpen, setInternalOpen] = useState(isOpen);
  const [step, setStep] = useState<'prompt' | 'auth' | 'letter'>('prompt');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [revealedCount, setRevealedCount] = useState(0);
  const [activeLightboxImage, setActiveLightboxImage] = useState<{ src: string; title: string } | null>(null);

  const letterContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setInternalOpen(isOpen);
    if (isOpen) setStep('auth');
  }, [isOpen]);

  // Lock background page scroll when modal is open
  useEffect(() => {
    if (internalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [internalOpen]);

  // Handle ESC key to close lightbox or modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activeLightboxImage) {
          setActiveLightboxImage(null);
        } else if (internalOpen) {
          handleClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxImage, internalOpen]);

  // Focus letter container when unlocked so keyboard navigation works immediately
  useEffect(() => {
    if (step === 'letter' && letterContainerRef.current) {
      letterContainerRef.current.focus();
    }
  }, [step]);

  // Paragraph-by-paragraph reveal animation (smooth fade + 10px translate, no word/char splits)
  useEffect(() => {
    if (step === 'letter' && revealedCount < EXACT_LETTER_PARAGRAPHS.length) {
      const timer = setTimeout(() => {
        setRevealedCount((prev) => prev + 1);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [step, revealedCount]);

  const handleAuthenticate = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = password.trim().toLowerCase();
    if (clean === 'venkatesha') {
      setError(false);
      setStep('letter');
      setRevealedCount(1);
    } else {
      setError(true);
    }
  };

  const handleClose = () => {
    setInternalOpen(false);
    setStep('prompt');
    setPassword('');
    setError(false);
    setRevealedCount(0);
    setActiveLightboxImage(null);
    if (onClose) onClose();
  };

  return (
    <div className="w-full flex flex-col items-center justify-center my-36 md:my-52 select-none px-6">
      {/* Subtle Prompt Banner */}
      <div className="max-w-md w-full p-8 rounded-3xl bg-[#0c0d12]/80 border border-[#e5c158]/20 backdrop-blur-xl text-center flex flex-col items-center gap-4 shadow-xl">
        <Feather className="w-5 h-5 text-[#e5c158]" />
        <p className="font-general italic text-base text-[#f0f0f5]/80">
          “One final memory remains.”
        </p>

        <SpecularButton
          size="md"
          radius={18}
          lineColor="#e5c158"
          baseColor="#0c0d12"
          onClick={() => {
            setInternalOpen(true);
            setStep('auth');
          }}
        >
          <Lock className="w-3.5 h-3.5 text-[#e5c158]" />
          <span>Unlock Epilogue</span>
        </SpecularButton>
      </div>

      {/* FULLSCREEN DOCUMENTARY-ENDING PRIVATE LETTER EXPERIENCE */}
      {internalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-[#0B0B0F]/95 backdrop-blur-3xl animate-fade-in overflow-hidden">
          
          {/* BLURRED BACKGROUND PLACEHOLDER CANVAS */}
          <img
            src={ASSET_PATHS.ending.treeImage}
            alt="Letter Background"
            className="absolute inset-0 w-full h-full object-cover filter blur-3xl scale-110 opacity-25 pointer-events-none z-0"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />

          {/* OBSIDIAN OVERLAY & WARM SPOTLIGHT */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0F]/95 via-[#0B0B0F]/85 to-[#0B0B0F] pointer-events-none z-0" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(229,193,88,0.22),transparent_70%)] pointer-events-none z-0" />

          {/* Close Button top-right */}
          <button
            onClick={handleClose}
            className="fixed top-8 right-8 z-50 p-3 rounded-full bg-white/5 border border-white/10 text-[#f0f0f5]/60 hover:text-[#e5c158] hover:border-[#e5c158] transition-all duration-300 shadow-2xl"
          >
            <X className="w-5 h-5" />
          </button>

          {/* PASSCODE MODAL STEP */}
          {step === 'auth' && (
            <div className="relative z-10 max-w-md w-full p-8 sm:p-12 rounded-[36px] bg-[#0c0d12]/90 border border-[#e5c158]/40 text-center flex flex-col items-center gap-6 shadow-[0_0_90px_rgba(229,193,88,0.25)] backdrop-blur-2xl">
              <div className="w-14 h-14 rounded-full bg-[#e5c158]/10 border border-[#e5c158] flex items-center justify-center text-[#e5c158] shadow-[0_0_25px_rgba(229,193,88,0.3)]">
                <Lock className="w-6 h-6" />
              </div>

              <div className="flex flex-col gap-1">
                <span className="font-general text-xs font-bold uppercase tracking-[0.3em] text-[#e5c158]">
                  Private Epilogue
                </span>
                <h4 className="font-general text-2xl font-bold text-[#f0f0f5]">
                  Enter Secret Key
                </h4>
                <p className="font-general text-xs text-[#f0f0f5]/60 mt-1">
                  (Enter the secret key to unlock)
                </p>
              </div>

              <form onSubmit={handleAuthenticate} className="w-full flex flex-col items-center gap-6">
                <input
                  type="password"
                  placeholder="Enter secret key..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-4 rounded-2xl bg-white/5 border border-white/20 text-[#f0f0f5] text-center font-general text-sm focus:outline-none focus:border-[#e5c158] tracking-widest"
                />

                {error && (
                  <span className="text-xs font-semibold text-rose-400">
                    Incorrect secret key. Please try again.
                  </span>
                )}

                <SpecularButton
                  size="lg"
                  radius={20}
                  lineColor="#e5c158"
                  baseColor="#0c0d12"
                  type="submit"
                  className="w-full"
                >
                  <span>Open Letter</span>
                </SpecularButton>
              </form>
            </div>
          )}

          {/* CINEMATIC INTIMATE READING EXPERIENCE */}
          {step === 'letter' && (
            <div className="relative z-10 w-full max-w-[760px] flex items-center justify-center">
              
              {/* FLOATING MEMORY IMAGES AROUND THE LETTER */}
              {FLOATING_MEMORY_IMAGES.map((img, idx) => (
                <div
                  key={img.id}
                  onClick={() => setActiveLightboxImage({ src: img.src, title: img.title })}
                  className={`absolute ${img.position} z-0 rounded-2xl overflow-hidden border border-white/10 hover:border-[#e5c158]/80 cursor-pointer shadow-2xl transition-all duration-700 ease-out transform hover:scale-[1.03] hover:brightness-125 hover:shadow-[0_0_30px_rgba(229,193,88,0.4)] group ${
                    revealedCount > idx * 2 ? 'opacity-70 translate-y-0' : 'opacity-0 translate-y-6'
                  }`}
                  style={{ transitionDelay: `${idx * 250}ms` }}
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    className="w-full h-full object-cover filter contrast-105 group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d12] via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] font-bold text-[#e5c158] uppercase tracking-wider truncate">
                    <span>{img.title.split('—')[0]}</span>
                    <ZoomIn className="w-3 h-3 text-[#e5c158] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))}

              {/* CENTERED LETTER CONTAINER (MAX-WIDTH 760PX, PARAGRAPH FADE-IN ONLY) */}
              <div
                ref={letterContainerRef}
                tabIndex={0}
                data-lenis-prevent="true"
                className="relative z-10 w-full max-w-[760px] my-6 p-8 sm:p-16 rounded-[44px] bg-[#0c0d12]/90 border border-[#e5c158]/35 text-left flex flex-col gap-8 shadow-[0_0_120px_rgba(0,0,0,0.95)] backdrop-blur-3xl max-h-[82vh] overflow-y-auto custom-scrollbar focus:outline-none overscroll-contain touch-pan-y"
              >
                <header className="w-full flex items-center justify-between border-b border-[#e5c158]/20 pb-6 mb-2">
                  <div className="flex items-center gap-2 text-[#e5c158]">
                    <Sparkles className="w-4 h-4" />
                    <span className="font-general text-xs font-bold uppercase tracking-[0.3em]">
                      Private Letter
                    </span>
                  </div>
                  <Heart className="w-4 h-4 text-rose-400 fill-rose-400 animate-pulse" />
                </header>

                <div className="flex flex-col gap-7 font-serif italic text-lg sm:text-2xl text-[#f5ebd6] leading-relaxed">
                  {EXACT_LETTER_PARAGRAPHS.slice(0, revealedCount).map((item, idx) => {
                    if (item.type === 'signoff') {
                      return (
                        <div key={idx} className="mt-8 pt-6 border-t border-white/10 flex flex-col gap-2 font-serif not-italic animate-fade-in transition-all duration-700 ease-out">
                          <p className="text-[#e5c158] italic text-xl">{item.salutation}</p>
                          <p className="text-3xl font-bold text-[#f0f0f5] tracking-wide">{item.author}</p>
                        </div>
                      );
                    }

                    return (
                      <p
                        key={idx}
                        className={`animate-fade-in transition-all duration-700 ease-out will-change-transform ${
                          item.highlight
                            ? 'font-bold text-2xl sm:text-3xl text-[#e5c158] not-italic font-general tracking-tight my-2'
                            : item.bold
                            ? 'font-bold text-xl sm:text-2xl text-[#f0f0f5] not-italic'
                            : 'font-serif text-lg sm:text-2xl text-[#f5ebd6]'
                        }`}
                      >
                        {item.content}
                      </p>
                    );
                  })}
                </div>

                {revealedCount >= EXACT_LETTER_PARAGRAPHS.length && (
                  <footer className="w-full pt-10 flex justify-center border-t border-white/10 mt-6 animate-fade-in">
                    <SpecularButton
                      size="md"
                      radius={22}
                      lineColor="#e5c158"
                      baseColor="#0c0d12"
                      onClick={handleClose}
                      className="px-10"
                    >
                      <span>Close Letter</span>
                    </SpecularButton>
                  </footer>
                )}

              </div>
            </div>
          )}

          {/* HIGH-RESOLUTION LIGHTBOX MODAL FOR FLOATING MEMORY IMAGES */}
          {activeLightboxImage && (
            <div
              onClick={() => setActiveLightboxImage(null)}
              className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/92 backdrop-blur-2xl animate-fade-in cursor-pointer"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-4xl w-full flex flex-col items-center gap-4 cursor-default"
              >
                <button
                  onClick={() => setActiveLightboxImage(null)}
                  className="absolute -top-12 right-0 p-2 rounded-full bg-white/10 border border-white/20 text-[#f0f0f5] hover:text-[#e5c158] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <img
                  src={activeLightboxImage.src}
                  alt={activeLightboxImage.title}
                  className="w-full max-h-[80vh] object-contain rounded-3xl border border-[#e5c158]/40 shadow-[0_0_80px_rgba(229,193,88,0.3)] transition-transform duration-500 scale-100"
                />
                <span className="font-general text-sm font-bold uppercase tracking-widest text-[#e5c158]">
                  {activeLightboxImage.title}
                </span>
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
};

export default PrivateEpilogueModal;
