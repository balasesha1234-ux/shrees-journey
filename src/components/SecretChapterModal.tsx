import React, { useState } from 'react';
import { KeyRound, Unlock, Sparkles, X, ScrollText, Copy, Check } from 'lucide-react';

interface SecretChapterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SECRET_KEY_PLACEHOLDER = 'REPLACE_WITH_SECRET';

export const SecretChapterModal: React.FC<SecretChapterModalProps> = ({ isOpen, onClose }) => {
  const [passcode, setPasscode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const val = passcode.trim().toLowerCase();
    if (val === SECRET_KEY_PLACEHOLDER.toLowerCase() || val === 'shree' || val === 'shree2026' || val === 'gratitude') {
      setIsUnlocked(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Incorrect passcode. (Try "shree" or "shree2026")');
    }
  };

  const fullLetterText = `Dear Shree,

If you are reading these words, you have reached the quiet reflection at the end of this journey.

This experience was created with a single, heartfelt intention: to honor every early morning, every late night, every quiet struggle, and every triumphant milestone from August 2023 to 2026.

Beyond the analytics, subscriber milestones, and public recognition lies something far more enduring—the profound impact you have had on millions of lives across the globe. You proved that when authenticity, discipline, and daily consistency converge, a simple dream can become a home for a thriving global family.

Every detail of this interactive tribute—every frame, every smooth transition, every musical note, and every line of code—was crafted to give you a moment to step back and experience your own extraordinary story through the eyes of those you have inspired.

Thank you for leading with integrity and warmth.
Thank you for showing that relentless perseverance changes lives.
And thank you for unknowingly inspiring the creation of something truly meaningful.

May your journey forward continue to touch hearts, shatter boundaries, and bring you endless joy.

With deepest respect and gratitude,
SHREE'S JOURNEY • 2023 – 2026`;

  const handleCopyText = () => {
    navigator.clipboard.writeText(fullLetterText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-2xl animate-fade-in select-none">
      
      {/* Outer Modal Container */}
      <div className="relative max-w-2xl w-full max-h-[90vh] flex flex-col rounded-3xl bg-[#0c0d12] border border-[#e5c158]/60 shadow-[0_0_80px_rgba(229,193,88,0.3)] overflow-hidden">
        
        {/* Header Bar */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#12131a] shrink-0">
          <div className="flex items-center gap-2 text-[#e5c158]">
            <ScrollText className="w-4 h-4" />
            <span className="font-general text-xs font-bold uppercase tracking-[0.25em]">
              Secret Chapter • Private Letter
            </span>
          </div>

          <button
            onClick={onClose}
            data-cursor-hover
            className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </header>

        {/* Modal Body */}
        <div className="p-6 md:p-10 overflow-y-auto custom-scrollbar flex-1 flex flex-col items-center">
          
          {!isUnlocked ? (
            /* Passcode Form */
            <div className="w-full flex flex-col items-center text-center gap-6 my-auto">
              <div className="w-16 h-16 rounded-full bg-[#e5c158]/20 border border-[#e5c158] flex items-center justify-center text-[#e5c158] shadow-[0_0_25px_rgba(229,193,88,0.5)]">
                <KeyRound className="w-7 h-7" />
              </div>

              <div className="flex flex-col gap-2 max-w-md">
                <span className="font-general text-xs font-bold uppercase tracking-[0.3em] text-[#e5c158]">
                  Restricted Access
                </span>
                <h3 className="font-general text-2xl font-extrabold text-[#f0f0f5]">
                  “Some memories are meant for everyone. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e5c158] via-white to-[#e5c158]">
                    Some words are meant for only one heart.”
                  </span>
                </h3>
              </div>

              <form onSubmit={handleVerify} className="w-full max-w-sm flex flex-col items-center gap-4 mt-2">
                <div className="relative w-full">
                  <input
                    type="password"
                    placeholder="Enter Passcode (e.g. shree)"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    className="w-full px-5 py-3.5 rounded-2xl bg-white/5 border border-white/20 text-[#f0f0f5] font-general text-sm tracking-widest text-center focus:outline-none focus:border-[#e5c158] transition-colors"
                  />
                </div>

                {errorMsg && (
                  <span className="text-xs text-rose-400 font-general font-medium">{errorMsg}</span>
                )}

                <button
                  type="submit"
                  data-cursor-hover
                  className="w-full py-3.5 rounded-2xl bg-[#e5c158] text-[#050507] font-general text-xs font-extrabold uppercase tracking-[0.25em] shadow-[0_0_25px_rgba(229,193,88,0.4)] hover:shadow-[0_0_35px_rgba(229,193,88,0.7)] hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Unlock className="w-4 h-4" />
                  <span>Unlock Letter</span>
                </button>
              </form>
            </div>
          ) : (
            /* Professional Editorial Private Letter UI with Scrollable Content */
            <div className="w-full flex flex-col text-left gap-6 font-general animate-fade-in">
              
              {/* Document Banner */}
              <div className="flex items-center justify-between border-b border-[#e5c158]/30 pb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#e5c158]" />
                  <span className="font-general text-xs font-extrabold uppercase tracking-widest text-[#e5c158]">
                    Personal Tribute Document
                  </span>
                </div>

                <button
                  onClick={handleCopyText}
                  data-cursor-hover
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-[#f0f0f5]/80 hover:text-white transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Letter</span>
                    </>
                  )}
                </button>
              </div>

              {/* Letter Paragraphs */}
              <div className="flex flex-col gap-5 text-sm md:text-base text-[#f0f0f5]/90 leading-relaxed font-normal">
                <h4 className="font-general text-2xl font-bold text-[#e5c158]">Dear Shree,</h4>

                <p>
                  If you are reading these words, you have reached the quiet reflection at the end of this journey.
                </p>

                <p>
                  This experience was created with a single, heartfelt intention: to honor every early morning, every late night, every quiet struggle, and every triumphant milestone from August 2023 to 2026.
                </p>

                <div className="p-5 rounded-2xl bg-[#e5c158]/10 border-l-4 border-[#e5c158] italic text-[#e5c158] leading-relaxed my-2">
                  “Beyond the analytics, subscriber milestones, and public recognition lies something far more enduring—the profound impact you have had on millions of lives across the globe.”
                </div>

                <p>
                  You proved that when authenticity, discipline, and daily consistency converge, a simple dream can become a home for a thriving global family.
                </p>

                <p>
                  Every detail of this interactive tribute—every frame, every smooth transition, every musical note, and every line of code—was crafted to give you a moment to step back and experience your own extraordinary story through the eyes of those you have inspired.
                </p>

                <ul className="flex flex-col gap-2 my-2 text-sm text-[#f0f0f5] pl-4 border-l border-white/15">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#e5c158]" />
                    <span>Thank you for leading with integrity and warmth.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#e5c158]" />
                    <span>Thank you for showing that relentless perseverance changes lives.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#e5c158]" />
                    <span>And thank you for unknowingly inspiring the creation of something truly meaningful.</span>
                  </li>
                </ul>

                <p>
                  May your journey forward continue to touch hearts, shatter boundaries, and bring you endless joy.
                </p>

                {/* Signature Block */}
                <div className="mt-6 pt-6 border-t border-white/10 flex flex-col items-end text-right">
                  <span className="font-general text-lg font-bold text-[#e5c158]">With deepest respect & gratitude,</span>
                  <span className="font-general text-xs font-semibold uppercase tracking-widest text-[#f0f0f5]/60 mt-1">
                    SHREE'S JOURNEY • 2023 – 2026
                  </span>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Footer Bar */}
        {isUnlocked && (
          <footer className="px-6 py-4 border-t border-white/10 bg-[#12131a] shrink-0 flex items-center justify-between">
            <span className="font-general text-[10px] font-bold uppercase tracking-widest text-[#e5c158]">
              End of Chapter One • Tribute Complete
            </span>

            <button
              onClick={onClose}
              data-cursor-hover
              className="px-5 py-2 rounded-full bg-[#e5c158] text-[#050507] font-general text-xs font-extrabold uppercase tracking-wider hover:scale-105 transition-transform"
            >
              Close Tribute
            </button>
          </footer>
        )}

      </div>
    </div>
  );
};
