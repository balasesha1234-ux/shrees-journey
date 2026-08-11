import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { ASSET_PATHS } from '../utils/assetPaths';

export const AudioController: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(ASSET_PATHS.audio.ambientMusic);
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn('Audio play blocked:', err);
      });
    }
  };

  return (
    <div className="relative md:static flex items-center gap-3 select-none">
      <button
        onClick={toggleAudio}
        aria-label={isPlaying ? 'Pause Background Soundtrack' : 'Play Background Soundtrack'}
        className="group relative flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#0c0d12]/90 border border-[#e5c158]/50 shadow-[0_0_25px_rgba(229,193,88,0.25)] backdrop-blur-2xl text-[#e5c158] hover:border-[#e5c158] hover:shadow-[0_0_35px_rgba(229,193,88,0.5)] transition-all duration-300 active:scale-95"
      >
        <Music className={`w-3.5 h-3.5 ${isPlaying ? 'animate-bounce' : ''}`} />
        
        {/* Animated Equalizer Soundwave Bars */}
        <div className="flex items-end gap-0.5 h-3.5 w-4">
          <span className={`w-0.5 rounded-full bg-[#e5c158] transition-all duration-300 ${isPlaying ? 'animate-[pulse_0.6s_ease-in-out_infinite] h-3.5' : 'h-1.5 opacity-40'}`} />
          <span className={`w-0.5 rounded-full bg-[#e5c158] transition-all duration-300 ${isPlaying ? 'animate-[pulse_0.8s_ease-in-out_infinite_0.1s] h-2' : 'h-2.5 opacity-40'}`} />
          <span className={`w-0.5 rounded-full bg-[#e5c158] transition-all duration-300 ${isPlaying ? 'animate-[pulse_0.5s_ease-in-out_infinite_0.2s] h-3' : 'h-1 opacity-40'}`} />
          <span className={`w-0.5 rounded-full bg-[#e5c158] transition-all duration-300 ${isPlaying ? 'animate-[pulse_0.7s_ease-in-out_infinite_0.3s] h-2.5' : 'h-2 opacity-40'}`} />
        </div>

        <span className="font-general text-[10px] font-bold uppercase tracking-widest text-[#f0f0f5] group-hover:text-[#e5c158] transition-colors">
          {isPlaying ? 'Sound ON' : 'Sound OFF'}
        </span>

        {isPlaying ? (
          <Volume2 className="w-3.5 h-3.5 text-[#e5c158]" />
        ) : (
          <VolumeX className="w-3.5 h-3.5 text-[#f0f0f5]/50" />
        )}
      </button>
    </div>
  );
};

export default AudioController;
