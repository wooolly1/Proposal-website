'use client';
import { motion } from 'framer-motion';

interface Props {
  current: number;
  total: number;
}

export default function ProgressIndicator({ current, total }: Props) {
  return (
    <div
      className="fixed bottom-7 left-1/2 flex gap-2 items-center"
      style={{ transform: 'translateX(-50%)', zIndex: 20 }}
      role="progressbar"
      aria-valuenow={current + 1}
      aria-valuemin={1}
      aria-valuemax={total}
    >
      {Array.from({ length: total }, (_, i) => (
        <motion.div
          key={i}
          animate={{
            width: i === current ? 24 : 10,
            opacity: i < current ? 0.9 : i === current ? 1 : 0.35,
            scale: i === current ? 1 : 0.85,
          }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          style={{
            height: 10,
            borderRadius: 9999,
            background:
              i === current
                ? 'linear-gradient(90deg, #fb7185, #ec4899)'
                : i < current
                ? 'rgba(251,113,133,0.7)'
                : 'rgba(251,113,133,0.3)',
          }}
        />
      ))}
    </div>
  );
}
