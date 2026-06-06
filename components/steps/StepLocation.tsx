'use client';
import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import { useSound } from '@/hooks/useSound';
import type { DateOption } from './StepDate';

const LOCATION_OPTIONS: DateOption[] = [
  { id: 'yours', label: 'Your favorite spot', emoji: '📍' },
  { id: 'mine', label: 'My favorite spot', emoji: '✨' },
  { id: 'surprise', label: 'Surprise me!', emoji: '🎲' },
  { id: 'together', label: "We'll decide together", emoji: '🤝' },
];

export default function StepLocation({ onSelect }: { onSelect: (option: DateOption) => void }) {
  const { playClick, playHover } = useSound();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-lg"
    >
      <GlassCard className="text-center p-10">
        {/* Location pin icon */}
        <motion.div
          animate={{ y: [0, -6, 0], scale: [1, 1.12, 1] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          className="text-5xl mb-4 block"
          role="img"
          aria-label="location pin"
        >
          📍
        </motion.div>

        <h2 className="text-3xl font-display font-bold text-gray-800 mb-2 leading-tight">
          Where should we go?
        </h2>
        <p className="text-gray-400 text-lg mb-8 font-medium">
          Let&apos;s pick the perfect spot! 💕
        </p>

        {/* Options grid */}
        <div className="grid grid-cols-2 gap-3">
          {LOCATION_OPTIONS.map((opt, i) => (
            <motion.button
              key={opt.id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.06, y: -4 }}
              whileTap={{ scale: 0.94 }}
              onMouseEnter={playHover}
              onClick={() => { playClick(); onSelect(opt); }}
              className="flex flex-col items-center justify-center gap-2 px-3 py-6 rounded-2xl transition-colors"
              style={{
                background: 'rgba(255,255,255,0.45)',
                border: '1px solid rgba(255,255,255,0.6)',
                boxShadow: '0 4px 16px rgba(251,113,133,0.10)',
              }}
              aria-label={opt.label}
            >
              <span className="text-3xl" aria-hidden="true">{opt.emoji}</span>
              <span className="text-sm font-semibold text-gray-700 leading-tight text-center">
                {opt.label}
              </span>
            </motion.button>
          ))}
        </div>
      </GlassCard>
    </motion.div>
  );
}
