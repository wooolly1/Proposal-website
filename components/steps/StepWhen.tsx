'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import { useSound } from '@/hooks/useSound';
import type { DateOption } from './StepDate';

const DAY_OPTIONS: DateOption[] = [
  { id: 'today', label: 'Today', emoji: '⚡' },
  { id: 'tomorrow', label: 'Tomorrow', emoji: '🌅' },
  { id: 'weekend', label: 'This weekend', emoji: '🎈' },
  { id: 'nextweek', label: 'Next week', emoji: '📆' },
];

const TIME_OPTIONS: DateOption[] = [
  { id: 'morning', label: 'Morning', emoji: '☀️' },
  { id: 'afternoon', label: 'Afternoon', emoji: '🌤️' },
  { id: 'evening', label: 'Evening', emoji: '🌆' },
  { id: 'night', label: 'Night', emoji: '🌙' },
];

interface Props {
  onConfirm: (day: DateOption, time: DateOption) => void;
}

export default function StepWhen({ onConfirm }: Props) {
  const [day, setDay] = useState<DateOption | null>(null);
  const [time, setTime] = useState<DateOption | null>(null);
  const { playClick, playHover, playSuccess } = useSound();

  const ready = day !== null && time !== null;

  const renderOptions = (
    options: DateOption[],
    selected: DateOption | null,
    onPick: (o: DateOption) => void,
  ) => (
    <div className="grid grid-cols-2 gap-2.5">
      {options.map((opt, i) => {
        const isActive = selected?.id === opt.id;
        return (
          <motion.button
            key={opt.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={playHover}
            onClick={() => { playClick(); onPick(opt); }}
            className="flex items-center justify-center gap-2 px-3 py-3 rounded-2xl transition-colors"
            style={{
              background: isActive ? 'rgba(251,113,133,0.22)' : 'rgba(255,255,255,0.45)',
              border: isActive
                ? '1.5px solid rgba(244,63,94,0.6)'
                : '1px solid rgba(255,255,255,0.6)',
              boxShadow: isActive
                ? '0 6px 18px rgba(251,113,133,0.25)'
                : '0 4px 16px rgba(251,113,133,0.10)',
            }}
            aria-pressed={isActive}
            aria-label={opt.label}
          >
            <span className="text-xl" aria-hidden="true">{opt.emoji}</span>
            <span className="text-sm font-semibold text-gray-700 leading-tight">{opt.label}</span>
          </motion.button>
        );
      })}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-lg"
    >
      <GlassCard className="text-center p-10">
        {/* Clock icon */}
        <motion.div
          animate={{ rotate: [0, 12, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="text-5xl mb-4 block"
          role="img"
          aria-label="clock"
        >
          ⏰
        </motion.div>

        <h2 className="text-3xl font-display font-bold text-gray-800 mb-2 leading-tight">
          When works for you?
        </h2>
        <p className="text-gray-400 text-lg mb-7 font-medium">
          Pick a day and a time 💕
        </p>

        <p className="text-left text-base font-semibold text-gray-500 mb-2.5">Which day?</p>
        {renderOptions(DAY_OPTIONS, day, setDay)}

        <p className="text-left text-base font-semibold text-gray-500 mb-2.5 mt-6">What time?</p>
        {renderOptions(TIME_OPTIONS, time, setTime)}

        <AnimatePresence>
          {ready && (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8"
            >
              <motion.button
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { playSuccess(); onConfirm(day!, time!); }}
                className="primary-btn text-lg px-10 py-4"
                aria-label="Lock in the date"
              >
                Lock it in 🔒
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </GlassCard>
    </motion.div>
  );
}
