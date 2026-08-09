import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Compass, Feather, CheckCircle2 } from 'lucide-react';
import SpecularButton from './SpecularButton';

gsap.registerPlugin(ScrollTrigger);

export const DeveloperMotiveSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (sectionRef.current) {
        gsap.fromTo(
          sectionRef.current.querySelectorAll('.animate-reveal'),
          {
            opacity: 0,
            y: 35,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.3,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="developer-motive-section"
      className="relative w-full py-20 sm:py-32 md:py-44 px-4 sm:px-6 bg-[#0B0B0F] text-[#f0f0f5] font-general select-none overflow-hidden border-t border-[#e5c158]/20 max-w-full flex flex-col items-center justify-center"
    >
      {/* Warm Candlelight Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(229,193,88,0.14),transparent_70%)] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(229,193,88,0.08),transparent_60%)] pointer-events-none z-0" />

      <div className="max-w-4xl w-full mx-auto relative z-10 flex flex-col items-center text-center gap-8 sm:gap-12">
        
        {/* Header Tag (Matching Timeline Aesthetics) */}
        <div className="animate-reveal flex flex-col items-center gap-3">
          <div className="flex items-center gap-2.5 text-[#e5c158] bg-[#0c0d12]/90 px-4 py-1.5 sm:px-6 sm:py-2 rounded-full border border-[#e5c158]/40 backdrop-blur-xl shadow-2xl">
            <Sparkles className="w-4 h-4 text-[#e5c158]" />
            <span className="font-general text-[10px] sm:text-xs font-bold uppercase tracking-[0.35em]">
              Behind The Journey
            </span>
          </div>

          <h2 className="font-general text-3xl sm:text-5xl lg:text-6xl font-black text-[#f0f0f5] tracking-tight">
            A Developer’s Motive
          </h2>

          <p className="font-general italic text-sm sm:text-lg text-[#e5c158]/90 max-w-lg leading-relaxed px-2">
            “A reflection on consistency, determination, and the path that inspired this tribute.”
          </p>
        </div>

        {/* ELEGANT ESSAY / REFLECTION CONTAINER */}
        <div className="animate-reveal w-full max-w-3xl relative">
          {!isOpen ? (
            /* COVER CARD STATE */
            <div className="w-full p-8 sm:p-14 rounded-[36px] bg-[#0c0d12]/95 border-2 border-[#e5c158]/50 shadow-[0_0_90px_rgba(229,193,88,0.25)] flex flex-col items-center text-center gap-6 sm:gap-8 backdrop-blur-2xl relative overflow-hidden transition-all duration-500 hover:border-[#e5c158]/80">
              
              <div className="relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#e5c158] via-[#b89530] to-[#8a6e1d] shadow-[0_0_50px_rgba(229,193,88,0.6)] border-2 border-white/30 my-2">
                <Compass className="w-9 h-9 sm:w-11 sm:h-11 text-[#0c0d12]" />
              </div>

              <div className="flex flex-col items-center gap-2 max-w-md">
                <span className="font-general text-xs font-bold uppercase tracking-[0.4em] text-[#e5c158]">
                  Creator's Reflection
                </span>
                <p className="font-serif italic text-base sm:text-xl text-[#f0f0f5]/90 leading-relaxed">
                  “I created this website to honor a journey of consistency, passion, and spiritual light.”
                </p>
              </div>

              <SpecularButton
                size="lg"
                radius={24}
                lineColor="#e5c158"
                baseColor="#0c0d12"
                onClick={() => setIsOpen(true)}
                className="px-8 sm:px-12 py-3.5 sm:py-4 mt-2"
              >
                <Feather className="w-4 h-4 text-[#e5c158]" />
                <span>Read Developer Motive ✦</span>
              </SpecularButton>

            </div>
          ) : (
            /* UNSEALED ESSAY PRESENTATION */
            <div className="w-full p-8 sm:p-14 md:p-16 rounded-[40px] bg-[#050507] border-2 border-[#e5c158]/70 shadow-[0_0_120px_rgba(229,193,88,0.35)] flex flex-col items-center text-left gap-8 animate-fade-in relative backdrop-blur-3xl">
              
              {/* Header Stamp */}
              <div className="w-full flex items-center justify-between border-b border-[#e5c158]/30 pb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#e5c158]">
                <div className="flex items-center gap-2">
                  <Feather className="w-4 h-4" />
                  <span>A Developer's Reflection</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#e5c158] text-[10px]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Entry</span>
                </div>
              </div>

              {/* Essay Body Content */}
              <div className="w-full flex flex-col gap-6 text-[#f0f0f5] font-serif italic text-base sm:text-xl leading-relaxed sm:leading-loose">
                <h3 className="font-general not-italic text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#e5c158] via-white to-[#e5c158] tracking-tight">
                  Reflections on the Path,
                </h3>

                <p>
                  Building this platform was born out of profound appreciation. Watching Shree show up day after day—with pure intention, quiet determination, and genuine goodness—demonstrates what true purpose looks like.
                </p>

                <p>
                  Her journey wasn't just inspiring content; it became a quiet spiritual compass. Her consistency, humility, and positive energy guided me toward inner peace, faith, and a deeper connection to the spiritual world.
                </p>

                <p className="border-l-2 border-[#e5c158]/50 pl-4 py-1 text-[#e5c158]/95 font-serif">
                  Along this path, life brought unexpected blessings—accidentally meeting Shree herself and being able to talk with her and her brothers, Garv Ji and Moksh Ji, as well as meeting Vardhan Prabhu Ji, Dhrubayan Ji, Yogesh Ji, Vicky Ji, and Ram Ji (onlogic). Beyond memories, this journey gave me a true purpose to achieve in life, a spiritual awakening, and lifelong companions.
                </p>

                <p>
                  A special heartfelt gratitude to her brothers—Garv Ji and Moksh Ji—for their genuine kindness and respect. You supported me through my lows and highs, sent thoughtful gifts to make me feel special, valued my advice, and showed me true warmth. Your respect and support mean the world to me.
                </p>

                <p>
                  Every line of code, every floating memory card, and every golden light on this website was crafted with care to celebrate her 5 Million milestone and share that light with everyone who walks through this journey.
                </p>

                <div className="w-24 h-0.5 bg-[#e5c158]/50 my-2" />

                <div className="flex flex-col gap-1 font-general not-italic text-sm sm:text-base font-semibold text-[#e5c158]">
                  <span>Crafted with Devotion,</span>
                  <span className="text-[#f0f0f5]/80 text-xs sm:text-sm font-normal">The Developer</span>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="mt-4 px-6 py-2.5 rounded-full bg-white/5 border border-white/15 text-xs text-[#f0f0f5]/70 hover:text-[#e5c158] hover:border-[#e5c158]/50 transition-all font-semibold uppercase tracking-wider flex items-center gap-2"
              >
                <span>Close Reflection ✦</span>
              </button>

            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default DeveloperMotiveSection;
