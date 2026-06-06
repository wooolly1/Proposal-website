'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import TypewriterText from '@/components/animations/TypewriterText';
import { useSound } from '@/hooks/useSound';

export default function Step2({ onNext }: { onNext: () => void }) {
  const [showButton, setShowButton] = useState(false);
  const { playClick } = useSound();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-md"
    >
      <GlassCard className="text-center p-12">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <h2 className="text-3xl font-display font-bold text-gray-800 mb-8 leading-tight">
            Before I tell you...
          </h2>
        </motion.div>

        <div className="min-h-[5rem] flex items-center justify-center mb-10">
          <p className="text-xl text-gray-600 leading-relaxed font-medium">
            <TypewriterText
              text="I want you to know how much you mean to me."
              speed={48}
              startDelay={500}
              onComplete={() => setShowButton(true)}
            />
          </p>
        </div>

        <AnimatePresence>
          {showButton && (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.button
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => { playClick(); onNext(); }}
                className="primary-btn"
              >
                Continue 💕
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </GlassCard>
    </motion.div>
  );
}
