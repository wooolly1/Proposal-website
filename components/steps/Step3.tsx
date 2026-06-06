'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import { useSound } from '@/hooks/useSound';

const CARDS = [
  { id: 1, text: 'You always make me smile.', emoji: '😊' },
  { id: 2, text: 'You make every day better.', emoji: '🌟' },
  { id: 3, text: 'You are truly special.', emoji: '💫' },
];

const REVEAL_DELAYS_MS = [500, 2000, 3500];
const BUTTON_DELAY_MS = 5400;

export default function Step3({ onNext }: { onNext: () => void }) {
  const [visible, setVisible] = useState(0);
  const [showBtn, setShowBtn] = useState(false);
  const { playClick } = useSound();

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    REVEAL_DELAYS_MS.forEach((delay, i) => {
      timers.push(setTimeout(() => setVisible(v => Math.max(v, i + 1)), delay));
    });
    timers.push(setTimeout(() => setShowBtn(true), BUTTON_DELAY_MS));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95, y: -20 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-sm flex flex-col gap-4"
    >
      {CARDS.map((card, i) =>
        visible > i ? (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, x: -55, scale: 0.87 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
          >
            <GlassCard noPadding>
              <div className="p-6">
                <div className="flex items-center gap-4">
                  <motion.span
                    animate={{
                      scale: [1, 1.22, 1],
                      rotate: [0, 10, -8, 0],
                    }}
                    transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.45 }}
                    className="text-4xl shrink-0"
                    role="img"
                    aria-label={card.text}
                  >
                    {card.emoji}
                  </motion.span>

                  <p className="text-xl font-semibold text-gray-700 leading-snug">
                    {card.text}
                  </p>
                </div>

                {/* Mini floating hearts */}
                <div className="flex gap-1.5 mt-3 justify-end" aria-hidden="true">
                  {Array.from({ length: 3 }, (_, j) => (
                    <motion.span
                      key={j}
                      animate={{ y: [0, -5, 0], opacity: [0.35, 1, 0.35] }}
                      transition={{ duration: 1.8, delay: j * 0.3, repeat: Infinity }}
                      className="text-xs text-rose-300"
                    >
                      ♥
                    </motion.span>
                  ))}
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ) : null
      )}

      <AnimatePresence>
        {showBtn && (
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="text-center pt-2"
          >
            <motion.button
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => { playClick(); onNext(); }}
              className="primary-btn"
            >
              Continue ✨
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
