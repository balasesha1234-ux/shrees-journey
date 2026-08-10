import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface AudioToggleProps {
  isMuted: boolean;
  isPlaying: boolean;
  onToggle: () => void;
}

export const AudioToggle: React.FC<AudioToggleProps> = ({ isMuted, isPlaying, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      aria-label={isMuted ? 'Unmute ambient score' : 'Mute ambient score'}
      data-cursor-hover
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9995] group flex items-center gap-2 sm:gap-3 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full bg-[#0c0d12]/90 backdrop-blur-xl border border-[#e5c158]/30 hover:border-[#e5c158]/70 transition-all duration-300 shadow-2xl hover:shadow-[0_0_25px_rgba(229,193,88,0.3)]"
    >
      <div className="relative flex items-center justify-center w-5 h-5 text-[#e5c158]">
        {isMuted ? (
          <VolumeX className="w-4 h-4 opacity-80 group-hover:scale-110 transition-transform duration-300" />
        ) : (
          <Volume2 className="w-4 h-4 opacity-100 group-hover:scale-110 transition-transform duration-300" />
        )}
      </div>

      {/* Animated Equalizer Wave Bars when playing */}
      <div className="flex items-end gap-[3px] h-3.5 px-0.5">
        {[0.4, 0.8, 0.5, 0.9, 0.3].map((heightRatio, i) => (
          <span
            key={i}
            className={`w-[2px] rounded-full bg-[#e5c158] transition-all duration-300 ${
              !isMuted && isPlaying ? 'animate-pulse' : 'h-1 opacity-40'
            }`}
            style={{
              height: !isMuted && isPlaying ? `${heightRatio * 100}%` : '4px',
              animationDelay: `${i * 120}ms`,
            }}
          />
        ))}
      </div>

      <span className="hidden sm:inline-block font-sans text-[11px] font-medium tracking-widest uppercase text-[#f0f0f5]/70 group-hover:text-[#f0f0f5] transition-colors duration-300">
        {isMuted ? 'Sound Off' : 'Ambient Score'}
      </span>
    </button>
  );
};
