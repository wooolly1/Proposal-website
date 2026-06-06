'use client';
import { motion } from 'framer-motion';

interface PulsingHeartProps {
  size?: number;
  delay?: number;
}

/**
 * Crisp vector heart (SVG) — stays sharp at any size, unlike emoji which
 * pixelate when scaled up on high-DPI screens.
 */
export default function PulsingHeart({ size = 80, delay = 0 }: PulsingHeartProps) {
  return (
    <motion.svg
      role="img"
      aria-label="heart"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      animate={{ scale: [1, 1.18, 0.96, 1.14, 1] }}
      transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut', delay }}
      style={{ display: 'inline-block', filter: 'drop-shadow(0 5px 12px rgba(244,63,94,0.45))' }}
      className="select-none"
    >
      <defs>
        <linearGradient id="pulsingHeartGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ff7a98" />
          <stop offset="55%" stopColor="#fb3a63" />
          <stop offset="100%" stopColor="#e11d48" />
        </linearGradient>
      </defs>
      <path
        fill="url(#pulsingHeartGradient)"
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      />
    </motion.svg>
  );
}
