import React, { useState } from 'react';
import { X, Share2, Copy, Check, Sparkles, Send } from 'lucide-react';
import SpecularButton from './SpecularButton';

interface ShareTributeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareTributeModal: React.FC<ShareTributeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shareUrl = window.location.href;
  const shareText = "Celebrate Shree's 5 Million Milestone — A Cinematic Interactive Tribute (2023–2026) 🌸✨";

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppShare = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`, '_blank');
  };

  const handleTwitterShare = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fade-in">
      <div className="relative max-w-md w-full p-6 sm:p-8 rounded-[36px] bg-[#0c0d12] border-2 border-[#e5c158]/60 shadow-[0_0_80px_rgba(229,193,88,0.3)] flex flex-col items-center text-center gap-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-[#e5c158] hover:border-[#e5c158]/50 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Badge Icon */}
        <div className="w-16 h-16 rounded-full bg-[#e5c158]/20 border border-[#e5c158] flex items-center justify-center text-[#e5c158] shadow-[0_0_30px_rgba(229,193,88,0.4)]">
          <Share2 className="w-8 h-8" />
        </div>

        {/* Header */}
        <div className="flex flex-col items-center gap-1.5">
          <div className="flex items-center gap-2 text-[#e5c158] text-xs font-bold uppercase tracking-[0.3em]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Share The Tribute</span>
          </div>
          <h3 className="font-general text-2xl sm:text-3xl font-black text-[#f0f0f5]">
            Spread The Light 🌸
          </h3>
          <p className="font-general text-xs sm:text-sm text-[#f0f0f5]/70 max-w-xs leading-relaxed">
            Invite friends and companions to celebrate Shree's 5 Million milestone in the Living Garden.
          </p>
        </div>

        {/* Copy Link Field */}
        <div className="w-full flex items-center gap-2 p-2 rounded-2xl bg-[#050507] border border-[#e5c158]/30">
          <input
            type="text"
            readOnly
            value={shareUrl}
            className="w-full bg-transparent px-3 text-xs text-[#e5c158] outline-none select-all"
          />
          <button
            onClick={handleCopy}
            className="px-4 py-2 rounded-xl bg-[#e5c158] text-[#0c0d12] font-general text-xs font-bold flex items-center gap-1.5 hover:bg-[#f7e6a7] transition-all shrink-0"
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

        {/* Social Share Buttons with Specular Shimmer */}
        <div className="w-full flex flex-col sm:flex-row items-center gap-3 mt-2">
          <SpecularButton
            onClick={handleWhatsAppShare}
            size="md"
            className="w-full justify-center"
          >
            <Send className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp</span>
          </SpecularButton>

          <SpecularButton
            onClick={handleTwitterShare}
            size="md"
            className="w-full justify-center"
          >
            <Sparkles className="w-4 h-4 text-sky-400" />
            <span>X (Twitter)</span>
          </SpecularButton>
        </div>

      </div>
    </div>
  );
};

export default ShareTributeModal;
