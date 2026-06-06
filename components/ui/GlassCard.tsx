'use client';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export default function GlassCard({ children, className = '', noPadding }: GlassCardProps) {
  return (
    <div
      className={`glass-card ${noPadding ? '' : 'p-8'} ${className}`}
      style={{
        position: 'relative',
        background: 'rgba(255,255,255,0.28)',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        border: '1px solid rgba(255,255,255,0.5)',
        borderRadius: '28px',
        boxShadow:
          '0 8px 40px rgba(251,113,133,0.14), 0 2px 12px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.6)',
      }}
    >
      {children}
    </div>
  );
}

export function GlassCardAnimated({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={`glass-card p-8 ${className}`}
      style={{
        background: 'rgba(255,255,255,0.28)',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        border: '1px solid rgba(255,255,255,0.5)',
        borderRadius: '28px',
        boxShadow:
          '0 8px 40px rgba(251,113,133,0.14), 0 2px 12px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.6)',
      }}
      whileHover={{
        boxShadow:
          '0 12px 50px rgba(251,113,133,0.22), 0 4px 16px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.7)',
      }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
