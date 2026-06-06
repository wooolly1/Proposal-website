'use client';
import { motion } from 'framer-motion';
import { useMemo } from 'react';

const COLORS = [
  '#FF6B8A', '#FF4D79', '#FFB347', '#FFD700',
  '#87CEEB', '#DA70D6', '#98FB98', '#FFA07A',
  '#FF69B4', '#00CED1', '#9370DB', '#3CB371',
];

interface Piece {
  id: number;
  x: number;
  color: string;
  size: number;
  initRotate: number;
  shape: 'circle' | 'rect' | 'triangle';
  driftX: number;
  duration: number;
  delay: number;
}

export default function Confetti({ count = 120 }: { count?: number }) {
  const pieces = useMemo<Piece[]>(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: Math.random() * 12 + 5,
      initRotate: Math.random() * 360,
      shape: (['circle', 'rect', 'triangle'] as const)[Math.floor(Math.random() * 3)],
      driftX: (Math.random() - 0.5) * 40,
      duration: Math.random() * 2.5 + 2,
      delay: Math.random() * 0.8,
    })),
  [count]);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 50 }}
      aria-hidden="true"
    >
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            left: `${p.x}vw`,
            top: '-3vh',
            rotate: p.initRotate,
            opacity: 1,
            scale: 1,
          }}
          animate={{
            top: '105vh',
            left: `${p.x + p.driftX}vw`,
            rotate: p.initRotate + (Math.random() > 0.5 ? 540 : -540),
            opacity: [1, 1, 1, 0.8, 0],
            scale: [1, 1, 0.9, 0.7],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: 'easeIn',
          }}
          style={{
            position: 'absolute',
            width: p.size,
            height: p.shape === 'rect' ? p.size * 0.5 : p.size,
            backgroundColor: p.shape === 'triangle' ? 'transparent' : p.color,
            borderRadius: p.shape === 'circle' ? '50%' : p.shape === 'rect' ? '2px' : 0,
            borderLeft: p.shape === 'triangle' ? `${p.size / 2}px solid transparent` : 'none',
            borderRight: p.shape === 'triangle' ? `${p.size / 2}px solid transparent` : 'none',
            borderBottom: p.shape === 'triangle' ? `${p.size}px solid ${p.color}` : 'none',
          }}
        />
      ))}
    </div>
  );
}
