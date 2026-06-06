'use client';
import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import PulsingHeart from '@/components/animations/PulsingHeart';
import Confetti from '@/components/ui/Confetti';
import type { DateOption } from './StepDate';

export default function StepDateConfirm({
  choice,
  location,
}: {
  choice: DateOption;
  location: DateOption;
}) {
  return (
    <>
      <Confetti count={110} />

      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.85, type: 'spring', bounce: 0.45, delay: 0.1 }}
        className="w-full max-w-md relative"
        style={{ zIndex: 20 }}
      >
        <GlassCard className="text-center p-12">
          {/* Chosen date + location emojis */}
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, duration: 0.7, type: 'spring', bounce: 0.6 }}
            className="text-6xl mb-6 flex items-center justify-center gap-3"
            role="img"
            aria-label={`${choice.label} at ${location.label}`}
          >
            <span>{choice.emoji}</span>
            <span className="text-3xl text-rose-300">＋</span>
            <span>{location.emoji}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="text-4xl font-display font-bold mb-4 leading-tight"
            style={{
              background: 'linear-gradient(135deg, #fb7185, #ec4899, #a855f7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            It&apos;s a date! 🎉
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.6 }}
            className="text-xl text-gray-600 mb-8 leading-relaxed font-medium"
          >
            A {choice.label.toLowerCase()} at {location.label.toLowerCase()} — I can&apos;t wait to spend it with you. 💕
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.6, type: 'spring', bounce: 0.55 }}
            className="flex justify-center"
          >
            <PulsingHeart size={88} delay={1.2} />
          </motion.div>
        </GlassCard>
      </motion.div>
    </>
  );
}
