'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import PulsingHeart from '@/components/animations/PulsingHeart';
import Confetti from '@/components/ui/Confetti';
import type { DateOption } from './StepDate';

interface Props {
  choice: DateOption;
  location: DateOption;
  day: DateOption;
  time: DateOption;
}

export default function StepDateConfirm({ choice, location, day, time }: Props) {
  const plan: { label: string; value: DateOption }[] = [
    { label: 'What', value: choice },
    { label: 'Where', value: location },
    { label: 'When', value: day },
    { label: 'Time', value: time },
  ];

  // Email the date plan as an invitation (fires once when the finale appears).
  const sentRef = useRef(false);
  const [debugInfo, setDebugInfo] = useState<string>('sending…');
  useEffect(() => {
    if (sentRef.current) return;
    sentRef.current = true;

    const message =
      `💕 She said YES! 💕\n\n` +
      `Here's the date she planned:\n\n` +
      `${choice.emoji}  What:  ${choice.label}\n` +
      `${location.emoji}  Where: ${location.label}\n` +
      `${day.emoji}  When:  ${day.label}\n` +
      `${time.emoji}  Time:  ${time.label}\n\n` +
      `"I can't wait to spend it with you." 💌\n\n` +
      `🗓️ Responded: ${new Date().toLocaleString()}`;

    // Send via our own server route so it works even on restrictive networks.
    fetch('/api/invite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
      body: JSON.stringify({
        subject: '💌 She said YES — your date invitation!',
        from_name: 'Your Proposal Website',
        what: `${choice.emoji} ${choice.label}`,
        where: `${location.emoji} ${location.label}`,
        when: `${day.emoji} ${day.label}`,
        time: `${time.emoji} ${time.label}`,
        message,
      }),
    })
      .then(async (r) => {
        const j = await r.json().catch(() => ({}));
        setDebugInfo(`HTTP ${r.status} — ${JSON.stringify(j)}`);
      })
      .catch((e) => setDebugInfo(`request failed: ${String(e)}`));
  }, [choice, location, day, time]);

  // Hidden diagnostics: open the site with ?debug=1 to see the email-send result.
  const showDebug =
    typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('debug');

  return (
    <>
      <Confetti count={120} />

      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.85, type: 'spring', bounce: 0.45, delay: 0.1 }}
        className="w-full max-w-md relative"
        style={{ zIndex: 20 }}
      >
        <GlassCard transparent className="text-center p-10">
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, duration: 0.7, type: 'spring', bounce: 0.6 }}
            className="text-7xl mb-5 block"
            role="img"
            aria-label="party popper"
          >
            🎉
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="text-4xl font-display font-bold mb-6 leading-tight"
            style={{
              background: 'linear-gradient(135deg, #fb7185, #ec4899, #a855f7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))',
            }}
          >
            It&apos;s a date! 🎉
          </motion.h1>

          {/* Date plan summary */}
          <div className="flex flex-col gap-2.5 mb-7 text-left">
            {plan.map((row, i) => (
              <motion.div
                key={row.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl"
                style={{
                  background: 'rgba(255,255,255,0.7)',
                  border: '1px solid rgba(255,255,255,0.75)',
                  backdropFilter: 'blur(6px)',
                  WebkitBackdropFilter: 'blur(6px)',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.12)',
                }}
              >
                <span className="text-2xl shrink-0" aria-hidden="true">{row.value.emoji}</span>
                <div className="leading-tight">
                  <p className="text-xs font-semibold uppercase tracking-wide text-rose-500">
                    {row.label}
                  </p>
                  <p className="text-base font-semibold text-gray-800">{row.value.label}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="text-2xl mb-8 leading-relaxed font-semibold text-white"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.55)' }}
          >
            I can&apos;t wait to spend it with you. 💕
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.8, duration: 0.6, type: 'spring', bounce: 0.55 }}
            className="flex justify-center"
          >
            <PulsingHeart size={80} delay={1.8} />
          </motion.div>
        </GlassCard>
      </motion.div>

      {showDebug && (
        <div
          style={{
            position: 'fixed',
            bottom: 8,
            left: 8,
            right: 8,
            zIndex: 50,
            background: 'rgba(0,0,0,0.8)',
            color: '#0f0',
            font: '12px/1.4 monospace',
            padding: '8px 10px',
            borderRadius: 8,
            wordBreak: 'break-word',
          }}
        >
          invite: {debugInfo}
        </div>
      )}
    </>
  );
}
