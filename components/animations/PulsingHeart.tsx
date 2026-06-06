'use client';
import { motion } from 'framer-motion';

interface PulsingHeartProps {
  size?: number;
  delay?: number;
}

export default function PulsingHeart({ size = 80, delay = 0 }: PulsingHeartProps) {
  return (
    <motion.span
      role="img"
      aria-label="heart"
      animate={{
        scale: [1, 1.18, 0.96, 1.14, 1],
      }}
      transition={{
        duration: 1.3,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
      style={{ fontSize: size, display: 'inline-block', lineHeight: 1 }}
      className="select-none"
    >
      ❤️
    </motion.span>
  );
}
