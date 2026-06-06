'use client';
import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import { useSound } from '@/hooks/useSound';

export interface DateOption {
  id: string;
  label: string;
  emoji: string;
}

const DATE_OPTIONS: DateOption[] = [
  { id: 'coffee', label: 'Coffee Date', emoji: '☕' },
  { id: 'dinner', label: 'Dinner Date', emoji: '🍽️' },
  { id: 'movie', label: 'Movie Night', emoji: '🎬' },
  { id: 'museum', label: 'Museum/Gallery', emoji: '🎨' },
  { id: 'nature', label: 'Nature Walk', emoji: '🏞️' },
  { id: 'gaming', label: 'Gaming Session', emoji: '🎮' },
];

export default function StepDate({ onSelect }: { onSelect: (option: DateOption) => void }) {
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
        {/* Calendar icon */}
        <motion.div
          animate={{ y: [0, -6, 0], rotate: [0, -6, 6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="text-5xl mb-4 block"
          role="img"
          aria-label="calendar"
        >
          📅
        </motion.div>

        <h2 className="text-3xl font-display font-bold text-gray-800 mb-2 leading-tight">
          Let&apos;s go on a date!
        </h2>
        <p className="text-gray-400 text-2xl mb-8 font-medium">
          What kind of date would you like? 💕
        </p>

        {/* Options grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {DATE_OPTIONS.map((opt, i) => (
            <motion.button
              key={opt.id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.07, y: -4 }}
              whileTap={{ scale: 0.94 }}
              onMouseEnter={playHover}
              onClick={() => { playClick(); onSelect(opt); }}
              className="flex flex-col items-center justify-center gap-2 px-3 py-5 rounded-2xl transition-colors"
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
