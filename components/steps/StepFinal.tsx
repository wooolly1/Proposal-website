'use client';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import GlassCard from '@/components/ui/GlassCard';
import PulsingHeart from '@/components/animations/PulsingHeart';
import Confetti from '@/components/ui/Confetti';

const FIREWORK_COLORS = [
  '#FF6B8A', '#FF4D79', '#FFD700', '#DA70D6',
  '#87CEEB', '#98FB98', '#FFA07A', '#9370DB',
];

interface FireworkProps {
  xPct: number;
  yPct: number;
  delay: number;
}

function Firework({ xPct, yPct, delay }: FireworkProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const children = Array.from(el.children) as HTMLElement[];
    const count = children.length;

    const tl = gsap.timeline({ delay });
    tl.to(children, {
      x: (i: number) => Math.cos((i / count) * Math.PI * 2) * (70 + Math.random() * 55),
      y: (i: number) => Math.sin((i / count) * Math.PI * 2) * (70 + Math.random() * 55),
      opacity: 0,
      scale: 0,
      duration: 0.85,
      ease: 'power2.out',
    });

    return () => { tl.kill(); };
  }, [delay]);

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        left: `${xPct}%`,
        top: `${yPct}%`,
        pointerEvents: 'none',
        zIndex: 15,
      }}
      aria-hidden="true"
    >
      {Array.from({ length: 12 }, (_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: 9,
            height: 9,
            borderRadius: '50%',
            background: FIREWORK_COLORS[i % FIREWORK_COLORS.length],
            boxShadow: `0 0 6px ${FIREWORK_COLORS[i % FIREWORK_COLORS.length]}`,
          }}
        />
      ))}
    </div>
  );
}

const FIREWORK_POSITIONS = [
  { xPct: 18, yPct: 28, delay: 0.3 },
  { xPct: 75, yPct: 18, delay: 0.7 },
  { xPct: 50, yPct: 55, delay: 1.1 },
  { xPct: 12, yPct: 62, delay: 1.5 },
  { xPct: 82, yPct: 50, delay: 0.9 },
  { xPct: 38, yPct: 12, delay: 1.3 },
  { xPct: 65, yPct: 70, delay: 1.7 },
  { xPct: 28, yPct: 45, delay: 0.5 },
];

export default function StepFinal({ onNext }: { onNext: () => void }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <Confetti count={140} />

      {/* Fireworks — client-only */}
      {mounted && (
        <div
          className="fixed inset-0 pointer-events-none overflow-hidden"
          style={{ zIndex: 15 }}
          aria-hidden="true"
        >
          {FIREWORK_POSITIONS.map((fw, i) => (
            <Firework key={i} xPct={fw.xPct} yPct={fw.yPct} delay={fw.delay} />
          ))}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.4, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.85, type: 'spring', bounce: 0.45, delay: 0.1 }}
        className="w-full max-w-md relative"
        style={{ zIndex: 20 }}
      >
        <GlassCard className="text-center p-12">
          {/* Big celebration emoji */}
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, duration: 0.7, type: 'spring', bounce: 0.6 }}
            className="text-8xl mb-6 block"
            role="img"
            aria-label="Party popper"
          >
            🎉
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="text-5xl font-display font-bold mb-4 leading-tight"
            style={{
              background: 'linear-gradient(135deg, #fb7185, #ec4899, #a855f7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            YAYYYYY ❤️
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.6 }}
            className="text-2xl text-gray-600 mb-10 leading-relaxed font-medium"
          >
            You just made me the happiest person alive.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.6, type: 'spring', bounce: 0.55 }}
            className="flex justify-center"
          >
            <PulsingHeart size={96} delay={1.2} />
          </motion.div>

          {/* Floating sparkle row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7 }}
            className="flex justify-center gap-3 mt-8 text-2xl"
            aria-hidden="true"
          >
            {['✨', '🥰', '✨', '💕', '✨'].map((e, i) => (
              <motion.span
                key={i}
                animate={{ y: [0, -7, 0], scale: [1, 1.18, 1] }}
                transition={{ duration: 1.8, delay: i * 0.2, repeat: Infinity }}
              >
                {e}
              </motion.span>
            ))}
          </motion.div>

          {/* Continue to date planning */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.1, duration: 0.6 }}
            className="mt-10"
          >
            <motion.button
              whileHover={{ scale: 1.07, y: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={onNext}
              className="primary-btn text-lg px-10 py-4"
              aria-label="Continue to plan our date"
            >
              Continue 💌
            </motion.button>
          </motion.div>
        </GlassCard>
      </motion.div>
    </>
  );
}
