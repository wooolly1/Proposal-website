'use client';
import { useCallback, useRef } from 'react';

export function useSound() {
  const ctxRef = useRef<AudioContext | null>(null);

  const getCtx = useCallback((): AudioContext | null => {
    if (typeof window === 'undefined') return null;
    try {
      if (!ctxRef.current) {
        const AC = window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        ctxRef.current = new AC();
      }
      if (ctxRef.current.state === 'suspended') {
        ctxRef.current.resume();
      }
      return ctxRef.current;
    } catch {
      return null;
    }
  }, []);

  const playTone = useCallback((
    freq: number,
    duration: number,
    volume = 0.25,
    type: OscillatorType = 'sine',
    delay = 0,
  ) => {
    const ctx = getCtx();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = freq;
      osc.type = type;
      const start = ctx.currentTime + delay;
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(volume, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
      osc.start(start);
      osc.stop(start + duration + 0.05);
    } catch { /* ignore */ }
  }, [getCtx]);

  const playClick = useCallback(() => {
    playTone(880, 0.12, 0.18, 'sine');
    playTone(1320, 0.08, 0.12, 'sine', 0.06);
  }, [playTone]);

  const playHover = useCallback(() => {
    playTone(660, 0.08, 0.08, 'sine');
  }, [playTone]);

  const playSuccess = useCallback(() => {
    // Happy ascending arpeggio
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    notes.forEach((freq, i) => {
      playTone(freq, 0.5, 0.3, 'sine', i * 0.1);
    });
  }, [playTone]);

  const playNoEscape = useCallback(() => {
    playTone(440, 0.15, 0.15, 'triangle');
    playTone(350, 0.12, 0.12, 'triangle', 0.08);
  }, [playTone]);

  return { playClick, playHover, playSuccess, playNoEscape };
}
