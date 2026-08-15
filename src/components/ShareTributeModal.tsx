import React, { useState, useRef } from 'react';
import { X, Share2, Copy, Check, Sparkles, Send, Download, Camera } from 'lucide-react';
import SpecularButton from './SpecularButton';
import { ASSET_PATHS } from '../utils/assetPaths';

interface ShareTributeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareTributeModal: React.FC<ShareTributeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const storyCardRef = useRef<HTMLDivElement | null>(null);

  if (!isOpen) return null;

  const publicOrigin = typeof window !== 'undefined' ? window.location.origin + window.location.pathname : 'https://shreesjourney.com';
  const shareUrl = publicOrigin;
  const shareText = "Experience Shree's Journey 🌸 A 5 Million Cinematic Tribute (2023–2026)";

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "SHREE'S JOURNEY — 5 Million Tribute",
          text: shareText,
          url: shareUrl,
        });
      } catch {
        handleCopy();
      }
    } else {
      handleCopy();
    }
  };

  const handleWhatsAppShare = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`, '_blank');
  };

  const handleTwitterShare = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  // Download 9:16 Instagram Story Card Graphic
  const handleDownloadStoryCard = async () => {
    setDownloading(true);

    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1080;
      canvas.height = 1920;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setDownloading(false);
        return;
      }

      // 1. Draw luxury dark background & gradient
      ctx.fillStyle = '#0B0B0F';
      ctx.fillRect(0, 0, 1080, 1920);

      // Function to render text, borders, and trigger download/share
      const renderCardAndExport = async (imgElement?: HTMLImageElement) => {
        if (imgElement) {
          try {
            ctx.drawImage(imgElement, 0, 0, 1080, 1250);
          } catch {
            console.warn('Canvas drawImage error, using fallback background');
          }
        }

        // Dark gradient overlay
        const grad = ctx.createLinearGradient(0, 600, 0, 1920);
        grad.addColorStop(0, 'rgba(11, 11, 15, 0)');
        grad.addColorStop(0.35, 'rgba(11, 11, 15, 0.88)');
        grad.addColorStop(1, 'rgba(11, 11, 15, 1)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 600, 1080, 1320);

        // Gold border
        ctx.strokeStyle = '#e5c158';
        ctx.lineWidth = 14;
        ctx.strokeRect(36, 36, 1008, 1848);

        // Inner subtle border
        ctx.strokeStyle = 'rgba(229, 193, 88, 0.3)';
        ctx.lineWidth = 2;
        ctx.strokeRect(48, 48, 984, 1824);

        // Header badge pill
        ctx.fillStyle = 'rgba(229, 193, 88, 0.2)';
        ctx.strokeStyle = 'rgba(229, 193, 88, 0.7)';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.roundRect(290, 1220, 500, 75, 37.5);
        ctx.fill();
        ctx.stroke();

        ctx.font = 'bold 30px "Cinzel", "Playfair Display", serif';
        ctx.fillStyle = '#e5c158';
        ctx.textAlign = 'center';
        ctx.fillText('5 MILLION MILESTONE 🌸', 540, 1268);

        // Title
        ctx.font = '900 68px "General Sans", "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText("EXPERIENCE SHREE'S JOURNEY", 540, 1400);

        // Quote
        ctx.font = 'italic 36px "Playfair Display", serif';
        ctx.fillStyle = 'rgba(240, 240, 245, 0.9)';
        ctx.fillText('“Some journeys are not measured by time...', 540, 1490);
        ctx.fillText('but by the hearts they touch.”', 540, 1545);

        // Subtitle dedication
        ctx.font = '500 28px "General Sans", sans-serif';
        ctx.fillStyle = 'rgba(229, 193, 88, 0.85)';
        ctx.fillText('A 5 Million Retrospective • 2023 — 2026', 540, 1630);

        // URL display
        const displayHost = typeof window !== 'undefined' && window.location.host ? window.location.host : 'shreesjourney.com';
        ctx.font = 'bold 32px "General Sans", monospace';
        ctx.fillStyle = '#e5c158';
        ctx.fillText(displayHost, 540, 1740);

        // Convert canvas to Blob for universal iOS/Android compatibility
        canvas.toBlob(async (blob) => {
          if (!blob) {
            setDownloading(false);
            return;
          }

          const file = new File([blob], 'shrees-journey-story-card.png', { type: 'image/png' });

          // If mobile native file sharing is supported (iOS Safari / Android Chrome)
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            try {
              await navigator.share({
                files: [file],
                title: "Shree's Journey Story Card",
                text: "Celebrating 5 Million on Shree's Journey 🌸",
              });
              setDownloading(false);
              return;
            } catch (err: unknown) {
              if (err instanceof Error && err.name === 'AbortError') {
                setDownloading(false);
                return;
              }
            }
          }

          // Fallback: Create Object URL and trigger download link
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'shrees-journey-story-card.png';
          link.target = '_blank';
          document.body.appendChild(link);
          link.click();
          setTimeout(() => {
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            setDownloading(false);
          }, 1000);
        }, 'image/png');
      };

      // Load hero photo with timeout safety
      const img = new Image();
      let hasRendered = false;

      const triggerRender = () => {
        if (!hasRendered) {
          hasRendered = true;
          renderCardAndExport(img);
        }
      };

      img.onload = triggerRender;
      img.onerror = () => {
        console.warn('Hero image failed to load for story card, rendering fallback graphic');
        if (!hasRendered) {
          hasRendered = true;
          renderCardAndExport(undefined);
        }
      };

      // 2.5s safety timeout so it never hangs
      setTimeout(() => {
        if (!hasRendered) {
          hasRendered = true;
          renderCardAndExport(undefined);
        }
      }, 2500);

      img.src = ASSET_PATHS.timeline.y2026.heroImage;
      if (img.complete) {
        triggerRender();
      }
    } catch (err) {
      console.error('Error generating story card:', err);
      setDownloading(false);
    }
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-2xl animate-fade-in overflow-y-auto cursor-pointer"
    >
      <div className="relative max-w-lg w-full p-6 sm:p-8 rounded-[36px] bg-[#0c0d12] border-2 border-[#e5c158]/60 shadow-[0_0_90px_rgba(229,193,88,0.35)] flex flex-col items-center text-center gap-6 my-auto cursor-default">
        
        {/* Prominent Exit Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Share Modal"
          className="fixed top-4 right-4 sm:absolute sm:top-5 sm:right-5 p-3 rounded-full bg-[#0c0d12] border-2 border-[#e5c158] text-[#e5c158] hover:text-white hover:bg-[#e5c158]/20 hover:scale-110 active:scale-95 transition-all shadow-[0_0_25px_rgba(229,193,88,0.5)] z-50 flex items-center justify-center cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Badge Header */}
        <div className="flex flex-col items-center gap-1.5 pt-2">
          <div className="flex items-center gap-2 text-[#e5c158] text-xs font-extrabold uppercase tracking-[0.3em] bg-[#e5c158]/10 px-4 py-1.5 rounded-full border border-[#e5c158]/40 shadow-inner">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Share As Story & Message</span>
          </div>
          <h3 className="font-general text-2xl sm:text-3xl font-black text-[#f0f0f5]">
            Experience Shree's Journey 🌸
          </h3>
          <p className="font-general text-xs sm:text-sm text-[#f0f0f5]/70 max-w-xs leading-relaxed">
            Share this cinematic 5 Million tribute directly as an Instagram / WhatsApp Story or message.
          </p>
        </div>

        {/* 9:16 INSTAGRAM / WHATSAPP STORY CARD PREVIEW */}
        <div
          ref={storyCardRef}
          className="relative w-full max-w-[280px] aspect-[9/16] rounded-3xl overflow-hidden border-2 border-[#e5c158]/70 shadow-[0_0_50px_rgba(229,193,88,0.3)] flex flex-col justify-between p-5 bg-[#0b0b0f] select-none group"
        >
          {/* Background Story Image Asset */}
          <div className="absolute inset-0 z-0">
            <img
              src={ASSET_PATHS.timeline.y2026.heroImage}
              alt="Story Asset"
              className="w-full h-full object-cover filter brightness-105 contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0f] via-[#0b0b0f]/50 to-transparent" />
          </div>

          {/* Top Story Header Badge */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 border border-[#e5c158]/60 text-[9px] font-extrabold uppercase tracking-widest text-[#e5c158] backdrop-blur-md">
              <Camera className="w-3 h-3" />
              <span>Story Card</span>
            </div>
            <Sparkles className="w-4 h-4 text-[#e5c158] animate-pulse" />
          </div>

          {/* Bottom Story Text overlay */}
          <div className="relative z-10 flex flex-col items-center text-center gap-2">
            <div className="text-[9px] font-black uppercase tracking-[0.25em] text-[#e5c158] bg-[#e5c158]/20 px-3 py-1 rounded-full border border-[#e5c158]/50">
              5 MILLION CELEBRATION 🌸
            </div>
            <h4 className="font-general font-black text-lg text-white leading-tight drop-shadow-md">
              Experience Shree's Journey
            </h4>
            <p className="font-serif italic text-xs text-[#f0f0f5]/90 leading-snug">
              “Some journeys are not measured by time... but by the hearts they touch.”
            </p>
          </div>
        </div>

        {/* Story Card Download CTA */}
        <SpecularButton
          onClick={handleDownloadStoryCard}
          size="lg"
          radius={22}
          lineColor="#e5c158"
          baseColor="#0c0d12"
          className="w-full justify-center py-3.5 text-xs font-bold uppercase tracking-widest text-[#e5c158] shadow-[0_0_30px_rgba(229,193,88,0.3)]"
        >
          <Download className="w-4 h-4 text-[#e5c158]" />
          <span>{downloading ? 'Generating Story Graphic...' : 'Download Story Card (Instagram / WhatsApp)'}</span>
        </SpecularButton>

        {/* Copy Link Input Bar */}
        <div className="w-full flex items-center gap-2 p-2 rounded-2xl bg-[#050507] border border-[#e5c158]/30">
          <input
            type="text"
            readOnly
            value={shareUrl}
            className="w-full bg-transparent px-3 text-xs text-[#e5c158] outline-none select-all font-mono"
          />
          <button
            onClick={handleCopy}
            className="px-4 py-2 rounded-xl bg-[#e5c158] text-[#0c0d12] font-general text-xs font-bold flex items-center gap-1.5 hover:bg-[#f7e6a7] transition-all shrink-0 active:scale-95"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Quick Social Buttons */}
        <div className="w-full grid grid-cols-3 gap-2">
          <SpecularButton
            onClick={handleWhatsAppShare}
            size="sm"
            className="w-full justify-center text-[10px]"
          >
            <Send className="w-3.5 h-3.5 text-emerald-400" />
            <span>WhatsApp</span>
          </SpecularButton>

          <SpecularButton
            onClick={handleTwitterShare}
            size="sm"
            className="w-full justify-center text-[10px]"
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>X (Twitter)</span>
          </SpecularButton>

          <SpecularButton
            onClick={handleNativeShare}
            size="sm"
            className="w-full justify-center text-[10px]"
          >
            <Share2 className="w-3.5 h-3.5 text-[#e5c158]" />
            <span>Share</span>
          </SpecularButton>
        </div>

        {/* Bottom Close Button for effortless Mobile Dismissal */}
        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-2xl bg-[#14151c] border border-white/10 hover:border-[#e5c158]/50 text-[#f0f0f5]/80 hover:text-white font-general text-xs font-bold uppercase tracking-widest transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer mt-1"
        >
          <X className="w-3.5 h-3.5 text-[#e5c158]" />
          <span>Close Window</span>
        </button>

      </div>
    </div>
  );
};

export default ShareTributeModal;
