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
      if (!ctx) return;

      // Dark background
      ctx.fillStyle = '#0B0B0F';
      ctx.fillRect(0, 0, 1080, 1920);

      // Draw photo asset
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = ASSET_PATHS.timeline.y2026.heroImage;

      img.onload = () => {
        // Draw photo with cover crop in top 60%
        ctx.drawImage(img, 0, 0, 1080, 1300);

        // Dark gradient overlay
        const grad = ctx.createLinearGradient(0, 800, 0, 1920);
        grad.addColorStop(0, 'rgba(11, 11, 15, 0)');
        grad.addColorStop(0.3, 'rgba(11, 11, 15, 0.85)');
        grad.addColorStop(1, 'rgba(11, 11, 15, 1)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 800, 1080, 1120);

        // Gold border
        ctx.strokeStyle = '#e5c158';
        ctx.lineWidth = 12;
        ctx.strokeRect(30, 30, 1020, 1860);

        // Header badge
        ctx.fillStyle = 'rgba(229, 193, 88, 0.2)';
        ctx.strokeStyle = 'rgba(229, 193, 88, 0.6)';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.roundRect(290, 1260, 500, 70, 35);
        ctx.fill();
        ctx.stroke();

        ctx.font = 'bold 28px "Cinzel", sans-serif';
        ctx.fillStyle = '#e5c158';
        ctx.textAlign = 'center';
        ctx.fillText('5 MILLION MILESTONE 🌸', 540, 1305);

        // Title
        ctx.font = '900 68px "General Sans", sans-serif';
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText("EXPERIENCE SHREE'S JOURNEY", 540, 1440);

        // Quote
        ctx.font = 'italic 34px "General Sans", serif';
        ctx.fillStyle = 'rgba(240, 240, 245, 0.85)';
        ctx.fillText('“Some journeys are not measured by time...', 540, 1520);
        ctx.fillText('but by the hearts they touch.”', 540, 1570);

        // Call to action url badge
        const displayHost = typeof window !== 'undefined' ? window.location.host : 'shreesjourney.com';
        ctx.font = 'bold 30px "General Sans", sans-serif';
        ctx.fillStyle = '#e5c158';
        ctx.fillText(displayHost, 540, 1720);

        // Download trigger
        const link = document.createElement('a');
        link.download = 'shrees-journey-story-card.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
        setDownloading(false);
      };

      img.onerror = () => {
        setDownloading(false);
      };
    } catch {
      setDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl animate-fade-in overflow-y-auto">
      <div className="relative max-w-lg w-full p-6 sm:p-8 rounded-[36px] bg-[#0c0d12] border-2 border-[#e5c158]/60 shadow-[0_0_90px_rgba(229,193,88,0.35)] flex flex-col items-center text-center gap-6 my-auto">
        
        {/* Prominent Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Share Modal"
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2.5 rounded-full bg-[#0c0d12]/90 border border-[#e5c158]/60 text-[#e5c158] hover:text-white hover:bg-[#e5c158]/20 hover:scale-110 transition-all shadow-[0_0_20px_rgba(229,193,88,0.4)] z-30 flex items-center justify-center cursor-pointer"
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

      </div>
    </div>
  );
};

export default ShareTributeModal;
