import { useState, useEffect, useCallback } from 'react';
import { ASSET_PATHS } from '../utils/assetPaths';

// Global Singleton Audio Instance to prevent multiple overlapping tracks
let globalAudioInstance: HTMLAudioElement | null = null;
let globalAudioContext: AudioContext | null = null;
let globalMasterGain: GainNode | null = null;
let globalOscillators: OscillatorNode[] = [];
let isSynthPlaying = false;

export function useAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.45);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Initialize Web Audio Ambient Synth (Warm A-major 9th pad chord)
  const startSynth = useCallback(() => {
    try {
      if (isSynthPlaying) return;
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!globalAudioContext) {
        globalAudioContext = new AudioCtx();
      }
      const ctx = globalAudioContext;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      isSynthPlaying = true;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.09, ctx.currentTime + 2.0);
      gain.connect(ctx.destination);
      globalMasterGain = gain;

      // Meditative warm frequencies: A2 (110Hz), E3 (164.8Hz), C#4 (277.2Hz), G#4 (415.3Hz), B4 (493.9Hz)
      const freqs = [110.0, 164.81, 277.18, 415.3, 493.88];
      globalOscillators = freqs.map((freq) => {
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(700, ctx.currentTime);

        osc.connect(filter);
        filter.connect(gain);
        osc.start();
        return osc;
      });
    } catch {
      // AudioContext unavailable
    }
  }, []);

  const stopSynth = useCallback(() => {
    if (globalMasterGain && globalAudioContext) {
      try {
        globalMasterGain.gain.linearRampToValueAtTime(0.0001, globalAudioContext.currentTime + 1.2);
      } catch {
        /* ignore */
      }
    }
    setTimeout(() => {
      globalOscillators.forEach((osc) => {
        try {
          osc.stop();
        } catch {
          /* ignore */
        }
      });
      globalOscillators = [];
      isSynthPlaying = false;
    }, 1200);
  }, []);

  // Initialize single global audio element
  useEffect(() => {
    if (!globalAudioInstance) {
      const audio = new Audio(ASSET_PATHS.audio.ambientMusic);
      audio.loop = true;
      audio.volume = 0.45;
      audio.preload = 'auto';
      globalAudioInstance = audio;

      audio.addEventListener('play', () => setIsPlaying(true));
      audio.addEventListener('pause', () => setIsPlaying(false));
      audio.addEventListener('error', () => {
        console.warn('Audio asset error, synth pad ready as fallback');
      });
    } else {
      setIsPlaying(!globalAudioInstance.paused);
      setVolumeState(globalAudioInstance.volume);
    }
  }, []);

  // Play with smooth 1.5s volume ramp
  const playAudio = useCallback(() => {
    setHasInteracted(true);

    if (globalAudioInstance) {
      globalAudioInstance.muted = false;
      const targetVol = volume || 0.45;
      globalAudioInstance.volume = 0.05;

      globalAudioInstance
        .play()
        .then(() => {
          setIsPlaying(true);
          // Smooth volume fade-in
          let current = 0.05;
          const step = (targetVol - 0.05) / 30;
          const interval = setInterval(() => {
            current = Math.min(current + step, targetVol);
            if (globalAudioInstance) globalAudioInstance.volume = current;
            if (current >= targetVol) clearInterval(interval);
          }, 50);
        })
        .catch(() => {
          // If browser policy blocks HTMLAudio, start Web Audio Synth
          startSynth();
          setIsPlaying(true);
        });
    } else {
      startSynth();
      setIsPlaying(true);
    }
  }, [volume, startSynth]);

  // Pause
  const pauseAudio = useCallback(() => {
    if (globalAudioInstance) {
      globalAudioInstance.pause();
    }
    stopSynth();
    setIsPlaying(false);
  }, [stopSynth]);

  // Toggle Mute / Play
  const toggleMute = useCallback(() => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  }, [isPlaying, pauseAudio, playAudio]);

  // Set explicit volume (0.0 to 1.0)
  const setVolume = useCallback((val: number) => {
    const clamped = Math.max(0, Math.min(1, val));
    setVolumeState(clamped);
    if (globalAudioInstance) {
      globalAudioInstance.volume = clamped;
    }
    if (globalMasterGain && globalAudioContext) {
      try {
        globalMasterGain.gain.setValueAtTime(clamped * 0.15, globalAudioContext.currentTime);
      } catch {
        /* ignore */
      }
    }
  }, []);

  return {
    isPlaying,
    isMuted: !isPlaying,
    volume,
    hasInteracted,
    playAudio,
    pauseAudio,
    toggleMute,
    setVolume,
  };
}

export default useAudio;
