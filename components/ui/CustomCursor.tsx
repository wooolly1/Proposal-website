'use client';
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);

  // Core dot — very responsive
  const x = useSpring(rawX, { stiffness: 600, damping: 35, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 600, damping: 35, mass: 0.4 });

  // Trail ring — lags behind
  const trailX = useSpring(rawX, { stiffness: 160, damping: 24, mass: 0.7 });
  const trailY = useSpring(rawY, { stiffness: 160, damping: 24, mass: 0.7 });

  useEffect(() => {
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    setIsTouchDevice(isTouch);
    if (isTouch) return;

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      setVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      setIsHovering(
        el.matches('button, a, [role="button"], input, textarea, select, label, [data-hover]')
      );
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('mouseleave', () => setVisible(false));
    document.addEventListener('mouseenter', () => setVisible(true));

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
    };
  }, [rawX, rawY]);

  if (isTouchDevice) return null;

  const DOT_SIZE = 8;
  const RING_SIZE = 34;

  return (
    <>
      {/* Lagging ring */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          marginLeft: -RING_SIZE / 2,
          marginTop: -RING_SIZE / 2,
          x: trailX,
          y: trailY,
          width: RING_SIZE,
          height: RING_SIZE,
          borderRadius: '50%',
          border: '1.5px solid rgba(251,113,133,0.55)',
          pointerEvents: 'none',
          zIndex: 9997,
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.2s',
        }}
        animate={{ scale: isHovering ? 1.6 : 1 }}
        transition={{ duration: 0.2 }}
      />

      {/* Core dot */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          marginLeft: -DOT_SIZE / 2,
          marginTop: -DOT_SIZE / 2,
          x,
          y,
          width: DOT_SIZE,
          height: DOT_SIZE,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #fb7185, #ec4899)',
          boxShadow: '0 0 10px rgba(251,113,133,0.7)',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.2s',
        }}
        animate={{ scale: isHovering ? 1.5 : 1 }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}
