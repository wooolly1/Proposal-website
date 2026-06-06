'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type MotionKind =
  | 'kenburns'
  | 'swirl'
  | 'breathe'
  | 'float'
  | 'drift'
  | 'shimmer'
  | 'wave'
  | 'sail';

export interface Painting {
  /** Painting image URL (loaded at runtime in the visitor's browser). */
  src: string;
  title: string;
  artist?: string;
  motion: MotionKind;
  /** CSS object-position for framing. */
  position?: string;
  /** White veil opacity (0-1) over the painting for text readability. */
  veil?: number;
  /** Central spotlight intensity multiplier (0-1, default 1). Lower = painting shows more. */
  spotlight?: number;
}

/**
 * Public-domain paintings, self-hosted from this site's own /public/paintings
 * folder so they load same-origin (no external host needed). If a file ever
 * fails to load, that step gracefully falls back to the pink gradient.
 * To add your own artwork: drop an image in public/paintings and change `src`.
 */
export const PAINTINGS: Painting[] = [
  // 0 — Step1: "Hey there"
  {
    src: '/paintings/wheatfield.jpg',
    title: 'Wheatfield with Cypresses',
    artist: 'Vincent van Gogh',
    motion: 'breathe',
    veil: 0.26,
  },
  // 1 — Step2: "how much you mean to me"
  {
    src: '/paintings/starry-night.jpg',
    title: 'The Starry Night',
    artist: 'Vincent van Gogh',
    motion: 'swirl',
    veil: 0.3,
  },
  // 2 — Step3: reveal cards
  {
    src: '/paintings/great-wave.jpg',
    title: 'The Great Wave off Kanagawa',
    artist: 'Katsushika Hokusai',
    motion: 'wave',
    veil: 0.28,
  },
  // 3 — Step4: "Can I tell you a secret?"
  {
    src: '/paintings/shipwreck.jpg',
    title: 'The Shipwreck',
    artist: 'J. M. W. Turner',
    motion: 'drift',
    veil: 0.3,
  },
  // 4 — Step5: "Will you go out with me?"
  {
    src: '/paintings/udnie.jpg',
    title: 'Udnie (Young American Girl)',
    artist: 'Francis Picabia',
    motion: 'swirl',
    veil: 0.3,
  },
  // 5 — StepFinal: "YAYYYYY"
  {
    src: '/paintings/starry-night.jpg',
    title: 'The Starry Night',
    artist: 'Vincent van Gogh',
    motion: 'swirl',
    veil: 0.3,
  },
  // 6 — StepDate: "What kind of date?"
  {
    src: '/paintings/edtaonisl.jpg',
    title: 'Edtaonisl (Ecclesiastic)',
    artist: 'Francis Picabia',
    motion: 'drift',
    veil: 0.3,
  },
  // 7 — StepLocation: "Where should we go?"
  {
    src: '/paintings/the-scream.jpg',
    title: 'The Scream',
    artist: 'Edvard Munch',
    motion: 'breathe',
    veil: 0.3,
  },
  // 8 — StepWhen: "When works for you?"
  {
    src: '/paintings/great-wave.jpg',
    title: 'The Great Wave off Kanagawa',
    artist: 'Katsushika Hokusai',
    motion: 'wave',
    veil: 0.28,
  },
  // 9 — StepDateConfirm: "It's a date!"
  // (Temporarily a public painting — swap src back to '/paintings/Herpainting.jpg'
  //  with title 'His masterpiece 💕' and motion 'sail' to restore his artwork.)
  {
    src: '/paintings/starry-night.jpg',
    title: 'The Starry Night',
    artist: 'Vincent van Gogh',
    motion: 'swirl',
    veil: 0,
    spotlight: 0.1,
  },
];

const MOTION_VARIANTS: Record<MotionKind, Record<string, number[] | string[]>> = {
  kenburns: { scale: [1.08, 1.2, 1.08], x: [0, -22, 0], y: [0, -14, 0] },
  swirl: { scale: [1.12, 1.24, 1.12], rotate: [0, 2.4, -2.4, 0] },
  breathe: { scale: [1.07, 1.14, 1.07] },
  float: { scale: [1.07, 1.13, 1.07], y: [0, -18, 0] },
  drift: { scale: [1.12, 1.18, 1.12], x: [0, -32, 0] },
  shimmer: {
    scale: [1.07, 1.13, 1.07],
    filter: ['brightness(1) saturate(1)', 'brightness(1.12) saturate(1.15)', 'brightness(1) saturate(1)'],
  },
  wave: { scale: [1.12, 1.18, 1.12], x: [0, -18, 0], rotate: [0, 1.3, -1.3, 0] },
  sail: { scale: [1.08, 1.12, 1.08], y: [0, -16, 0], rotate: [0, 0.9, -0.9, 0] },
};

const MOTION_DURATION: Record<MotionKind, number> = {
  kenburns: 24,
  swirl: 28,
  breathe: 15,
  float: 17,
  drift: 26,
  shimmer: 13,
  wave: 19,
  sail: 9,
};

export default function PaintingBackground({ painting }: { painting: Painting }) {
  const [failedSrcs, setFailedSrcs] = useState<Set<string>>(new Set());
  const failed = failedSrcs.has(painting.src);
  const spot = painting.spotlight ?? 1;

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ zIndex: 2 }} aria-hidden="true">
      <AnimatePresence>
        {!failed && (
          <motion.img
            key={painting.src}
            src={painting.src}
            alt=""
            onError={() =>
              setFailedSrcs(prev => {
                const nextSet = new Set(prev);
                nextSet.add(painting.src);
                return nextSet;
              })
            }
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, ...MOTION_VARIANTS[painting.motion] }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.6, ease: 'easeInOut' },
              default: {
                duration: MOTION_DURATION[painting.motion],
                repeat: Infinity,
                repeatType: 'mirror',
                ease: 'easeInOut',
              },
            }}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: painting.position ?? 'center', willChange: 'transform' }}
          />
        )}
      </AnimatePresence>

      {/* White veil so glass cards & text stay readable over the painting */}
      <div
        className="absolute inset-0"
        style={{ background: `rgba(255,255,255,${painting.veil ?? 0.28})` }}
      />
      {/* Soft central spotlight — lighter behind the card, painting clearer at edges */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, rgba(255,255,255,${0.4 * spot}) 0%, rgba(255,255,255,${0.12 * spot}) 50%, rgba(255,255,255,0) 78%)`,
        }}
      />

      {/* Painting caption — a little gallery label */}
      <AnimatePresence mode="wait">
        {!failed && (
          <motion.div
            key={painting.title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute bottom-5 left-5 text-left select-none"
            style={{ zIndex: 3 }}
          >
            <p
              className="text-sm font-display font-semibold leading-tight text-white"
              style={{ textShadow: '0 1px 5px rgba(0,0,0,0.6)' }}
            >
              {painting.title}
            </p>
            {painting.artist && (
              <p
                className="text-xs italic text-white/85"
                style={{ textShadow: '0 1px 4px rgba(0,0,0,0.55)' }}
              >
                {painting.artist}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
