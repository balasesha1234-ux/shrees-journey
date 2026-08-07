import { useState, useEffect, useRef, useCallback } from 'react';
import { ASSET_PATHS } from '../utils/assetPaths';

export function useAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthCtxRef = useRef<AudioContext | null>(null);
  const synthGainRef = useRef<GainNode | null>(null);
  const synthOscsRef = useRef<OscillatorNode[]>([]);
  const isUsingSynthRef = useRef(false);

  // Initialize Web Audio Synth as fallback if MP3 fails
  const startSynthAmbient = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!synthCtxRef.current) {
        synthCtxRef.current = new AudioCtx();
      }
      const ctx = synthCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      if (isUsingSynthRef.current) return;
      isUsingSynthRef.current = true;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.08, ctx.currentTime);
      masterGain.connect(ctx.destination);
      synthGainRef.current = masterGain;

      // Soft ambient chord frequencies (A major 9 pad: A2, E3, C#4, G#4, B4)
      const freqs = [110.00, 164.81, 277.18, 415.30, 493.88];
      synthOscsRef.current = freqs.map((freq) => {
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(600, ctx.currentTime);

        osc.connect(filter);
        filter.connect(masterGain);
        osc.start();
        return osc;
      });
    } catch {
      // Audio context restricted or unavailable
    }
  }, []);

  const stopSynthAmbient = useCallback(() => {
    if (synthGainRef.current && synthCtxRef.current) {
      synthGainRef.current.gain.linearRampToValueAtTime(0.0001, synthCtxRef.current.currentTime + 1);
    }
    setTimeout(() => {
      synthOscsRef.current.forEach((osc) => {
        try { osc.stop(); } catch { /* ignore */ }
      });
      synthOscsRef.current = [];
      isUsingSynthRef.current = false;
    }, 1000);
  }, []);

  useEffect(() => {
    const audio = new Audio(ASSET_PATHS.audio.backgroundMusic);
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;

    audio.addEventListener('error', () => {
      // If audio file doesn't exist, we will use synth ambient pad fallback when user unmutes
      audioRef.current = null;
    });

    return () => {
      audio.pause();
      stopSynthAmbient();
    };
  }, [stopSynthAmbient]);

  const toggleMute = useCallback(() => {
    setHasUserInteracted(true);
    setIsMuted((prevMuted) => {
      const nextMuted = !prevMuted;

      if (!nextMuted) {
        // Unmuting
        setIsPlaying(true);
        if (audioRef.current) {
          audioRef.current.muted = false;
          audioRef.current.play().catch(() => {
            startSynthAmbient();
          });
        } else {
          startSynthAmbient();
        }
      } else {
        // Muting
        setIsPlaying(false);
        if (audioRef.current) {
          audioRef.current.muted = true;
        }
        stopSynthAmbient();
      }

      return nextMuted;
    });
  }, [startSynthAmbient, stopSynthAmbient]);

  return {
    isPlaying,
    isMuted,
    hasUserInteracted,
    toggleMute,
  };
}
