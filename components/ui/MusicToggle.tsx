'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

export default function MusicToggle() {
  const [playing, setPlaying] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const oscsRef = useRef<(OscillatorNode | null)[]>([]);

  const stopAll = useCallback(() => {
    oscsRef.current.forEach(o => {
      try { o?.stop(); } catch { /* ignore */ }
    });
    oscsRef.current = [];
    gainRef.current?.disconnect();
    gainRef.current = null;
  }, []);

  const startAmbient = useCallback(() => {
    if (typeof window === 'undefined') return;
    try {
      const AC = window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AC();
      ctxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.value = 0;
      masterGain.connect(ctx.destination);
      gainRef.current = masterGain;

      masterGain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 2);

      // Dreamy chord: C maj 7 spread
      const freqs = [130.81, 164.81, 196.0, 261.63, 329.63];
      freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.connect(oscGain);
        oscGain.connect(masterGain);

        osc.type = 'sine';
        osc.frequency.value = freq;

        // Gentle LFO vibrato
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.frequency.value = 0.08 + i * 0.03;
        lfoGain.gain.value = 1.2;
        lfo.start();
        oscsRef.current.push(lfo);

        oscGain.gain.value = 0.6 - i * 0.08;
        osc.start(ctx.currentTime + i * 0.25);
        oscsRef.current.push(osc);
      });
    } catch { /* ignore */ }
  }, []);

  const toggle = () => {
    if (playing) {
      stopAll();
    } else {
      startAmbient();
    }
    setPlaying(p => !p);
  };

  useEffect(() => () => stopAll(), [stopAll]);

  return (
    <motion.button
      onClick={toggle}
      aria-label={playing ? 'Mute ambient music' : 'Play ambient music'}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.9 }}
      className="fixed top-4 right-4 z-30 w-11 h-11 rounded-full flex items-center justify-center text-base shadow-lg"
      style={{
        background: 'rgba(255,255,255,0.35)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        border: '1px solid rgba(255,255,255,0.5)',
        zIndex: 30,
      }}
      title={playing ? 'Mute music' : 'Play ambient music'}
    >
      <motion.span
        key={playing ? 'on' : 'off'}
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {playing ? '🎵' : '🔇'}
      </motion.span>

      {/* Pulse ring when playing */}
      {playing && (
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ border: '1.5px solid rgba(251,113,133,0.5)', pointerEvents: 'none' }}
        />
      )}
    </motion.button>
  );
}
