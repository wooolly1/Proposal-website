'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import { useSound } from '@/hooks/useSound';
import type { DateOption } from './StepDate';

interface Props {
  onConfirm: (day: DateOption, time: DateOption) => void;
}

function formatDate(value: string): string {
  const d = new Date(`${value}T00:00`);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatTime(value: string): string {
  const [h, m] = value.split(':').map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return value;
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
}

const inputStyle: React.CSSProperties = {
  fontFamily: 'inherit',
  fontSize: '1.3rem',
  width: '100%',
  padding: '14px 18px',
  borderRadius: 18,
  background: 'rgba(255,255,255,0.62)',
  border: '1.5px solid rgba(255,255,255,0.7)',
  boxShadow: '0 4px 16px rgba(251,113,133,0.12)',
  color: '#374151',
  outline: 'none',
};

export default function StepWhen({ onConfirm }: Props) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [today, setToday] = useState('');
  const { playClick, playSuccess } = useSound();

  useEffect(() => {
    setToday(new Date().toISOString().split('T')[0]);
  }, []);

  const ready = date !== '' && time !== '';

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
        <p className="text-gray-400 text-2xl mb-7 font-medium">
          Pick a date and a time 💕
        </p>

        {/* Date picker */}
        <div className="text-left mb-5">
          <label htmlFor="date-input" className="block text-base font-semibold text-gray-500 mb-2">
            Which day? 📅
          </label>
          <input
            id="date-input"
            type="date"
            min={today || undefined}
            value={date}
            onChange={(e) => { playClick(); setDate(e.target.value); }}
            style={inputStyle}
          />
        </div>

        {/* Time picker (hours & minutes) */}
        <div className="text-left">
          <label htmlFor="time-input" className="block text-base font-semibold text-gray-500 mb-2">
            What time? ⏰
          </label>
          <input
            id="time-input"
            type="time"
            value={time}
            onChange={(e) => { playClick(); setTime(e.target.value); }}
            style={inputStyle}
          />
        </div>

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
                onClick={() => {
                  playSuccess();
                  onConfirm(
                    { id: date, label: formatDate(date), emoji: '📅' },
                    { id: time, label: formatTime(time), emoji: '⏰' },
                  );
                }}
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
