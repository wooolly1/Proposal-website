'use client';
import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import PulsingHeart from '@/components/animations/PulsingHeart';
import Confetti from '@/components/ui/Confetti';
import type { DateOption } from './StepDate';

interface Props {
  choice: DateOption;
  location: DateOption;
  day: DateOption;
  time: DateOption;
}

export default function StepDateConfirm({ choice, location, day, time }: Props) {
  const plan: { label: string; value: DateOption }[] = [
    { label: 'What', value: choice },
    { label: 'Where', value: location },
    { label: 'When', value: day },
    { label: 'Time', value: time },
  ];

  return (
    <>
      <Confetti count={120} />

      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.85, type: 'spring', bounce: 0.45, delay: 0.1 }}
        className="w-full max-w-md relative"
        style={{ zIndex: 20 }}
      >
        <GlassCard className="text-center p-10">
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, duration: 0.7, type: 'spring', bounce: 0.6 }}
            className="text-7xl mb-5 block"
            role="img"
            aria-label="party popper"
          >
            🎉
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="text-4xl font-display font-bold mb-6 leading-tight"
            style={{
              background: 'linear-gradient(135deg, #fb7185, #ec4899, #a855f7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            It&apos;s a date! 🎉
          </motion.h1>

          {/* Date plan summary */}
          <div className="flex flex-col gap-2.5 mb-7 text-left">
            {plan.map((row, i) => (
              <motion.div
                key={row.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl"
                style={{
                  background: 'rgba(255,255,255,0.45)',
                  border: '1px solid rgba(255,255,255,0.6)',
                }}
              >
                <span className="text-2xl shrink-0" aria-hidden="true">{row.value.emoji}</span>
                <div className="leading-tight">
                  <p className="text-xs font-semibold uppercase tracking-wide text-rose-400">
                    {row.label}
                  </p>
                  <p className="text-base font-semibold text-gray-700">{row.value.label}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="text-lg text-gray-600 mb-8 leading-relaxed font-medium"
          >
            I can&apos;t wait to spend it with you. 💕
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.8, duration: 0.6, type: 'spring', bounce: 0.55 }}
            className="flex justify-center"
          >
            <PulsingHeart size={80} delay={1.8} />
          </motion.div>
        </GlassCard>
      </motion.div>
    </>
  );
}
