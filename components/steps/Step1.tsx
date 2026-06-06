'use client';
import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import { useSound } from '@/hooks/useSound';

export default function Step1({ onNext }: { onNext: () => void }) {
  const { playClick } = useSound();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.75, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: -30 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-md"
    >
      <GlassCard className="text-center p-12">
        {/* Sparkle icon */}
        <motion.div
          animate={{
            rotate: [0, 12, -10, 12, 0],
            scale: [1, 1.22, 1.08, 1.22, 1],
          }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }}
          className="text-7xl mb-7 block"
          role="img"
          aria-label="sparkles"
        >
          ✨
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="text-4xl font-display font-bold text-gray-800 mb-4 leading-tight"
        >
          Hey There!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-2xl text-gray-500 mb-10 leading-relaxed"
        >
          I&apos;ve been wanting to tell you something for a while...
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <motion.button
            whileHover={{ scale: 1.06, y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => { playClick(); onNext(); }}
            className="primary-btn text-base"
            aria-label="What is the message?"
          >
            What is it? 💭
          </motion.button>
        </motion.div>

        {/* Decorative corner sparkles */}
        <div className="absolute -top-3 -right-3 text-2xl opacity-60 animate-spin-slow pointer-events-none select-none">
          ✦
        </div>
        <div className="absolute -bottom-3 -left-3 text-xl opacity-50 animate-float pointer-events-none select-none">
          ✦
        </div>
      </GlassCard>
    </motion.div>
  );
}
