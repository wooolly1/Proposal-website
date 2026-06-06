'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import { useSound } from '@/hooks/useSound';

const NO_MESSAGES = [
  'Are you sure? 🥺',
  'Think again 😭',
  'Try YES instead 😏',
  'Wrong button 😂',
  'Oops, not that one! 🙈',
  'Nope, try again! 😜',
  'The NO button is broken 🤷',
  'Did you mean YES? 😇',
];

const MINI_HEARTS = ['💕', '💗', '💓', '💖', '❤️', '🩷'];

export default function Step5({ onYes }: { onYes: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [noAttempts, setNoAttempts] = useState(0);
  const [noPos, setNoPos] = useState({ x: 220, y: 60 });
  const [msg, setMsg] = useState('');
  const [showMsg, setShowMsg] = useState(false);
  const [extraHearts, setExtraHearts] = useState<{ id: number; x: number; y: number; emoji: string }[]>([]);
  const msgTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { playSuccess, playNoEscape } = useSound();

  const yesScale = Math.min(1 + noAttempts * 0.13, 2.4);
  const noScale = Math.max(1 - noAttempts * 0.1, 0.5);
  const noRotation = (noAttempts % 24) * 18;

  const getRandomNoPos = useCallback(() => {
    const container = containerRef.current;
    if (!container) return { x: 200, y: 60 };
    const { width, height } = container.getBoundingClientRect();
    const btnW = 110;
    const btnH = 52;
    const padding = 16;
    // Avoid the YES button center zone
    let x: number, y: number;
    do {
      x = padding + Math.random() * (width - btnW - padding * 2);
      y = padding + Math.random() * (height - btnH - padding * 2);
    } while (
      x > (width / 2 - 80) && x < (width / 2 + 30) &&
      y > (height / 2 - 40) && y < (height / 2 + 40)
    );
    return { x, y };
  }, []);

  useEffect(() => {
    // Place NO clearly below the YES button so it's visible from the start
    const t = setTimeout(() => {
      const container = containerRef.current;
      if (!container) return;
      const { width, height } = container.getBoundingClientRect();
      setNoPos({ x: width / 2 - 55, y: height - 52 });
    }, 100);
    return () => clearTimeout(t);
  }, []);

  const handleNoHover = useCallback(() => {
    const newPos = getRandomNoPos();
    setNoPos(newPos);
    setNoAttempts(prev => prev + 1);
    playNoEscape();

    const nextMsg = NO_MESSAGES[noAttempts % NO_MESSAGES.length];
    setMsg(nextMsg);
    setShowMsg(true);
    if (msgTimerRef.current) clearTimeout(msgTimerRef.current);
    msgTimerRef.current = setTimeout(() => setShowMsg(false), 2200);

    // Spawn extra heart near YES button
    const heartId = Date.now();
    const container = containerRef.current;
    if (container) {
      const { width, height } = container.getBoundingClientRect();
      setExtraHearts(prev => [
        ...prev.slice(-10),
        {
          id: heartId,
          x: width * 0.3 + Math.random() * 80,
          y: height * 0.3 + Math.random() * 40,
          emoji: MINI_HEARTS[Math.floor(Math.random() * MINI_HEARTS.length)],
        },
      ]);
      setTimeout(() => {
        setExtraHearts(prev => prev.filter(h => h.id !== heartId));
      }, 1500);
    }
  }, [getRandomNoPos, noAttempts, playNoEscape]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.78, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85, y: -20 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-lg"
    >
      <GlassCard className="text-center p-10">
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-6xl mb-5 block"
          role="img"
          aria-label="heart with ribbon"
        >
          💝
        </motion.div>

        <h2 className="text-3xl font-display font-bold text-gray-800 mb-2 leading-tight">
          Will you go out with me?
        </h2>
        <p className="text-gray-400 text-sm mb-8 font-medium tracking-wide">
          Choose carefully... 😉
        </p>

        {/* Buttons arena */}
        <div
          ref={containerRef}
          className="relative w-full"
          style={{ height: 260 }}
          role="group"
          aria-label="Yes or No buttons"
        >
          {/* YES — stays centered, grows with each NO attempt */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.button
              animate={{ scale: yesScale }}
              whileHover={{ scale: yesScale * 1.06, y: -3 }}
              whileTap={{ scale: yesScale * 0.94 }}
              transition={{ type: 'spring', stiffness: 280, damping: 22 }}
              onClick={() => { playSuccess(); onYes(); }}
              className="primary-btn text-lg px-9 py-4 relative z-10"
              aria-label="Yes, I will go out with you"
            >
              YES ❤️
            </motion.button>
          </div>

          {/* Extra hearts spawned near YES */}
          <AnimatePresence>
            {extraHearts.map(h => (
              <motion.span
                key={h.id}
                initial={{ opacity: 1, scale: 0.5, x: h.x, y: h.y }}
                animate={{ opacity: 0, scale: 1.4, y: h.y - 40 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2 }}
                style={{ position: 'absolute', pointerEvents: 'none', fontSize: 18 }}
              >
                {h.emoji}
              </motion.span>
            ))}
          </AnimatePresence>

          {/* NO — runs away */}
          <motion.button
            animate={{
              x: noPos.x,
              y: noPos.y,
              scale: noScale,
              rotate: noRotation,
            }}
            transition={{ type: 'spring', stiffness: 700, damping: 16, mass: 0.6 }}
            onMouseEnter={handleNoHover}
            onTouchStart={(e) => { e.preventDefault(); handleNoHover(); }}
            aria-label="No button (try clicking Yes instead!)"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              padding: '11px 24px',
              borderRadius: 9999,
              background: 'rgba(255,255,255,0.8)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border: '1.5px solid rgba(150,150,160,0.55)',
              color: '#6b7280',
              fontWeight: 700,
              fontSize: 15,
              whiteSpace: 'nowrap',
              zIndex: 5,
            }}
          >
            NO 😅
          </motion.button>
        </div>

        {/* Funny message */}
        <div className="h-8 flex items-center justify-center mt-2">
          <AnimatePresence mode="wait">
            {showMsg && (
              <motion.p
                key={msg}
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="text-rose-400 font-semibold text-sm"
              >
                {msg}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {noAttempts >= 3 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-gray-400 mt-2"
          >
            Hint: the correct button is pink 😏
          </motion.p>
        )}
      </GlassCard>
    </motion.div>
  );
}
