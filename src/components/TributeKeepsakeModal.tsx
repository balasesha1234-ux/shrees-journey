import React, { useState } from 'react';
import { X, Award, Download, Check, Copy, Heart, User, Globe } from 'lucide-react';
import SpecularButton from './SpecularButton';

interface TributeKeepsakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultName?: string;
  defaultCountry?: string;
  defaultMessage?: string;
  defaultId?: string;
}

export const TributeKeepsakeModal: React.FC<TributeKeepsakeModalProps> = ({
  isOpen,
  onClose,
  defaultName = '',
  defaultCountry = '',
  defaultMessage = '',
  defaultId = '',
}) => {
  const [name, setName] = useState(defaultName || 'Grateful Companion');
  const [country, setCountry] = useState(defaultCountry || 'Global Family 🌍');
  const [message, setMessage] = useState(defaultMessage || 'Part of the 5 Million Family. Thank you for touching our hearts.');
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const serialId = defaultId || `#PETAL-${Math.floor(1000 + Math.random() * 9000)}`;
  const issueDate = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const shareUrl = typeof window !== 'undefined' ? window.location.origin + window.location.pathname : 'https://shreesjourney.com';

  const handleDownloadCertificate = () => {
    setDownloading(true);

    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1080;
      canvas.height = 1920;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Dark Obsidian Background
      ctx.fillStyle = '#0B0B0F';
      ctx.fillRect(0, 0, 1080, 1920);

      // Gold Radial Vignette Glow
      const grad = ctx.createRadialGradient(540, 960, 100, 540, 960, 900);
      grad.addColorStop(0, 'rgba(229, 193, 88, 0.15)');
      grad.addColorStop(0.6, 'rgba(12, 13, 18, 0.9)');
      grad.addColorStop(1, '#0B0B0F');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1080, 1920);

      // Outer Gold Double Border Frame
      ctx.strokeStyle = '#e5c158';
      ctx.lineWidth = 14;
      ctx.strokeRect(40, 40, 1000, 1840);

      ctx.strokeStyle = 'rgba(229, 193, 88, 0.4)';
      ctx.lineWidth = 4;
      ctx.strokeRect(60, 60, 960, 1800);

      // Top Crest Header
      ctx.fillStyle = 'rgba(229, 193, 88, 0.15)';
      ctx.strokeStyle = 'rgba(229, 193, 88, 0.6)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(240, 160, 600, 70, 35);
      ctx.fill();
      ctx.stroke();

      ctx.font = 'bold 26px "Cinzel", serif';
      ctx.fillStyle = '#e5c158';
      ctx.textAlign = 'center';
      ctx.fillText('OFFICIAL TRIBUTE KEEPSAKE 🌸', 540, 204);

      // Main Title
      ctx.font = '900 64px "General Sans", sans-serif';
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText("SHREE'S JOURNEY", 540, 340);

      ctx.font = 'italic 30px "General Sans", serif';
      ctx.fillStyle = 'rgba(240, 240, 245, 0.8)';
      ctx.fillText('5 Million Milestone Family Member', 540, 400);

      // Horizontal Gold Divider Line
      ctx.strokeStyle = 'rgba(229, 193, 88, 0.5)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(340, 460);
      ctx.lineTo(740, 460);
      ctx.stroke();

      // Certificate Body Card Box
      ctx.fillStyle = 'rgba(12, 13, 18, 0.85)';
      ctx.strokeStyle = 'rgba(229, 193, 88, 0.5)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(120, 520, 840, 960, 40);
      ctx.fill();
      ctx.stroke();

      // Recipient Name
      ctx.font = 'bold 24px "General Sans", sans-serif';
      ctx.fillStyle = 'rgba(229, 193, 88, 0.9)';
      ctx.fillText('THIS CERTIFIES THAT', 540, 610);

      ctx.font = '900 56px "General Sans", sans-serif';
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(name.toUpperCase(), 540, 700);

      // Country Tag
      ctx.font = 'bold 26px "General Sans", sans-serif';
      ctx.fillStyle = '#e5c158';
      ctx.fillText(`📍 ${country}`, 540, 765);

      // Message Quote Box
      ctx.font = 'italic 32px "General Sans", serif';
      ctx.fillStyle = 'rgba(240, 240, 245, 0.9)';

      // Wrap text inside message box
      const words = message.split(' ');
      let line = '';
      let y = 880;
      for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > 700 && i > 0) {
          ctx.fillText(`“${line.trim()}”`, 540, y);
          line = words[i] + ' ';
          y += 50;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(`“${line.trim()}”`, 540, y);

      // Bottom Serial Details
      ctx.font = 'bold 26px "General Sans", sans-serif';
      ctx.fillStyle = '#e5c158';
      ctx.fillText(`SERIAL NO: ${serialId}`, 540, 1340);

      ctx.font = '22px "General Sans", sans-serif';
      ctx.fillStyle = 'rgba(240, 240, 245, 0.6)';
      ctx.fillText(`ISSUED: ${issueDate.toUpperCase()}`, 540, 1390);

      // Footer Live Site Link
      const displayHost = typeof window !== 'undefined' ? window.location.host : 'shreesjourney.com';
      ctx.font = 'bold 28px "General Sans", sans-serif';
      ctx.fillStyle = '#e5c158';
      ctx.fillText(displayHost, 540, 1720);

      // Trigger Instant PNG Download
      const link = document.createElement('a');
      link.download = `shree-5m-keepsake-${serialId.replace('#', '')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      setDownloading(false);
    } catch {
      setDownloading(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl animate-fade-in overflow-y-auto">
      <div className="relative max-w-lg w-full p-6 sm:p-8 rounded-[36px] bg-[#0c0d12] border-2 border-[#e5c158]/60 shadow-[0_0_90px_rgba(229,193,88,0.35)] flex flex-col items-center text-center gap-6 my-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-[#e5c158] hover:border-[#e5c158]/50 transition-all z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badge */}
        <div className="flex flex-col items-center gap-1.5 pt-2">
          <div className="flex items-center gap-2 text-[#e5c158] text-xs font-extrabold uppercase tracking-[0.3em] bg-[#e5c158]/10 px-4 py-1.5 rounded-full border border-[#e5c158]/40 shadow-inner">
            <Award className="w-3.5 h-3.5" />
            <span>Official Family Keepsake</span>
          </div>
          <h3 className="font-general text-2xl sm:text-3xl font-black text-[#f0f0f5]">
            Your 5M Tribute Card 📜
          </h3>
          <p className="font-general text-xs sm:text-sm text-[#f0f0f5]/70 max-w-xs leading-relaxed">
            Customize your personalized keepsake card and share your place in Shree's 5 Million Journey.
          </p>
        </div>

        {/* Customization Inputs */}
        <div className="w-full flex flex-col gap-3 text-left">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#e5c158] mb-1 flex items-center gap-1">
              <User className="w-3 h-3" />
              <span>Your Name / Handle</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Balasesha"
              className="w-full bg-[#050507] border border-[#e5c158]/30 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#e5c158] transition-all"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#e5c158] mb-1 flex items-center gap-1">
              <Globe className="w-3 h-3" />
              <span>Your Location / Country</span>
            </label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="e.g. India 🇮🇳"
              className="w-full bg-[#050507] border border-[#e5c158]/30 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#e5c158] transition-all"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#e5c158] mb-1 flex items-center gap-1">
              <Heart className="w-3 h-3" />
              <span>Your Tribute Note</span>
            </label>
            <textarea
              rows={2}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your note..."
              className="w-full bg-[#050507] border border-[#e5c158]/30 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#e5c158] transition-all resize-none"
            />
          </div>
        </div>

        {/* Certificate Card Preview Box */}
        <div className="w-full p-4 rounded-2xl bg-[#050507] border border-[#e5c158]/50 flex flex-col items-center gap-2 text-center select-none shadow-inner">
          <div className="text-[9px] font-extrabold uppercase tracking-widest text-[#e5c158] bg-[#e5c158]/15 px-3 py-0.5 rounded-full border border-[#e5c158]/30">
            {serialId} • {issueDate}
          </div>
          <div className="font-general font-black text-lg text-white">
            {name || 'Grateful Companion'}
          </div>
          <div className="text-xs text-[#e5c158] font-semibold">
            📍 {country || 'Global Family'}
          </div>
          <p className="font-serif italic text-xs text-[#f0f0f5]/80 line-clamp-2 max-w-xs mt-1">
            “{message || 'Part of the 5 Million Family'}”
          </p>
        </div>

        {/* Action CTAs */}
        <div className="w-full flex flex-col gap-3">
          <SpecularButton
            onClick={handleDownloadCertificate}
            size="lg"
            radius={22}
            lineColor="#e5c158"
            baseColor="#0c0d12"
            className="w-full justify-center py-3.5 text-xs font-bold uppercase tracking-widest text-[#e5c158] shadow-[0_0_30px_rgba(229,193,88,0.35)]"
          >
            <Download className="w-4 h-4 text-[#e5c158]" />
            <span>{downloading ? 'Generating Certificate...' : 'Download Official 5M Keepsake Card 📜'}</span>
          </SpecularButton>

          <button
            onClick={handleCopyLink}
            className="w-full py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white/80 font-bold flex items-center justify-center gap-2 hover:border-[#e5c158]/40 hover:text-[#e5c158] transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Link Copied!' : 'Copy Shareable Link'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default TributeKeepsakeModal;
