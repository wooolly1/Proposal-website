'use client';
import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import PulsingHeart from '@/components/animations/PulsingHeart';
import { useSound } from '@/hooks/useSound';

export default function Step4({ onNext }: { onNext: () => void }) {
  const { playClick } = useSound();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.78, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-md"
    >
      <GlassCard className="text-center p-12">
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, duration: 0.7, type: 'spring', bounce: 0.55 }}
          className="flex justify-center mb-9"
        >
          <PulsingHeart size={110} />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="text-3xl font-display font-bold text-gray-800 mb-3 leading-tight"
        >
          Can I tell you a secret?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
          className="text-2xl mb-10"
          role="img"
          aria-label="red heart"
        >
          ❤️
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95 }}
        >
          <motion.button
            whileHover={{ scale: 1.07, y: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { playClick(); onNext(); }}
            className="primary-btn text-lg px-10 py-4"
          >
            Tell me 🤫
          </motion.button>
        </motion.div>
      </GlassCard>
    </motion.div>
  );
}
