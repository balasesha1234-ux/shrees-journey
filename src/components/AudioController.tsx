import React from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { useAudio } from '../hooks/useAudio';

interface AudioControllerProps {
  className?: string;
}

export const AudioController: React.FC<AudioControllerProps> = ({ className = '' }) => {
  const { isPlaying, toggleMute } = useAudio();

  return (
    <div className={`relative flex items-center select-none ${className}`}>
      <button
        onClick={toggleMute}
        aria-label={isPlaying ? 'Pause Ambient Soundtrack' : 'Play Ambient Soundtrack'}
        className="group relative flex items-center gap-2.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#0c0d12]/90 border border-[#e5c158]/50 shadow-[0_0_25px_rgba(229,193,88,0.25)] backdrop-blur-2xl text-[#e5c158] hover:border-[#e5c158] hover:shadow-[0_0_35px_rgba(229,193,88,0.5)] transition-all duration-300 active:scale-95"
      >
        <Music className={`w-3.5 h-3.5 transition-transform duration-300 ${isPlaying ? 'rotate-12 scale-110 text-[#e5c158]' : 'text-[#f0f0f5]/50'}`} />

        {/* Animated Equalizer Soundwave Bars */}
        <div className="flex items-end gap-0.5 h-3.5 w-3.5">
          <span
            className={`w-0.5 rounded-full bg-[#e5c158] transition-all duration-300 ${
              isPlaying ? 'animate-[pulse_0.6s_ease-in-out_infinite] h-3.5' : 'h-1.5 opacity-40'
            }`}
          />
          <span
            className={`w-0.5 rounded-full bg-[#e5c158] transition-all duration-300 ${
              isPlaying ? 'animate-[pulse_0.8s_ease-in-out_infinite_0.1s] h-2' : 'h-2.5 opacity-40'
            }`}
          />
          <span
            className={`w-0.5 rounded-full bg-[#e5c158] transition-all duration-300 ${
              isPlaying ? 'animate-[pulse_0.5s_ease-in-out_infinite_0.2s] h-3' : 'h-1 opacity-40'
            }`}
          />
          <span
            className={`w-0.5 rounded-full bg-[#e5c158] transition-all duration-300 ${
              isPlaying ? 'animate-[pulse_0.7s_ease-in-out_infinite_0.3s] h-2.5' : 'h-2 opacity-40'
            }`}
          />
        </div>

        <span className="font-general text-[10px] font-bold uppercase tracking-widest text-[#f0f0f5] group-hover:text-[#e5c158] transition-colors hidden sm:inline">
          {isPlaying ? 'Sound ON' : 'Sound OFF'}
        </span>

        {isPlaying ? (
          <Volume2 className="w-3.5 h-3.5 text-[#e5c158] transition-transform duration-300 group-hover:scale-110" />
        ) : (
          <VolumeX className="w-3.5 h-3.5 text-[#f0f0f5]/50" />
        )}
      </button>
    </div>
  );
};

export default AudioController;
