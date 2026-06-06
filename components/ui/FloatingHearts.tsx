'use client';
import { motion } from 'framer-motion';
import { useMemo } from 'react';

const HEART_EMOJIS = ['❤️', '🩷', '💕', '💗', '💖', '💓', '✨'];

interface HeartItem {
  id: number;
  emoji: string;
  startX: number;
  endX: number;
  size: number;
  duration: number;
  delay: number;
  rotate: number;
}

export default function FloatingHearts({ count = 8, intensified = false }: { count?: number; intensified?: boolean }) {
  const hearts = useMemo<HeartItem[]>(() =>
    Array.from({ length: count }, (_, i) => {
      const startX = Math.random() * 100;
      return {
        id: i,
        emoji: HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)],
        startX,
        endX: startX + (Math.random() - 0.5) * 18,
        size: Math.random() * 18 + 14,
        duration: Math.random() * 4 + 5,
        delay: Math.random() * 4,
        rotate: (Math.random() - 0.5) * 30,
      };
    }),
  [count]);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 3 }}
      aria-hidden="true"
    >
      {hearts.map((heart) => (
        <motion.span
          key={heart.id}
          initial={{ y: '110vh', x: `${heart.startX}vw`, opacity: 0, rotate: 0 }}
          animate={{
            y: '-12vh',
            x: [`${heart.startX}vw`, `${heart.endX}vw`],
            opacity: [0, 0.9, 0.9, 0],
            rotate: heart.rotate,
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            repeatDelay: Math.random() * 2,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            fontSize: heart.size,
            filter: intensified ? 'drop-shadow(0 0 6px rgba(251,113,133,0.7))' : 'none',
          }}
        >
          {heart.emoji}
        </motion.span>
      ))}
    </div>
  );
}
