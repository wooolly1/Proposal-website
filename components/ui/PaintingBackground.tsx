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
  | 'wave';

export interface Painting {
  /** Painting image URL (loaded at runtime in the visitor's browser). */
  src: string;
  title: string;
  artist: string;
  motion: MotionKind;
  /** CSS object-position for framing. */
  position?: string;
  /** White veil opacity (0-1) over the painting for text readability. */
  veil?: number;
}

/**
 * Build a stable Wikimedia Commons image URL.
 * Special:FilePath redirects to the current file, so we don't need the hashed path.
 * These are fetched by the visitor's browser at runtime (not at build time).
 */
const wm = (file: string, width = 1600) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`;

/**
 * One public-domain painting per step (indexed by step number).
 * If a URL ever fails to load, that step gracefully falls back to the
 * pink gradient background. To swap a painting, just change `src` below.
 */
export const PAINTINGS: Painting[] = [
  // 0 — Step1: "Hey there"
  {
    src: wm('Sandro Botticelli - La nascita di Venere - Google Art Project - edited.jpg'),
    title: 'The Birth of Venus',
    artist: 'Sandro Botticelli',
    motion: 'float',
    veil: 0.28,
  },
  // 1 — Step2: "how much you mean to me"
  {
    src: wm('Vincent van Gogh - Almond blossom - Google Art Project.jpg'),
    title: 'Almond Blossoms',
    artist: 'Vincent van Gogh',
    motion: 'breathe',
    veil: 0.24,
  },
  // 2 — Step3: reveal cards
  {
    src: wm('Mona Lisa, by Leonardo da Vinci, from C2RMF retouched.jpg'),
    title: 'Mona Lisa',
    artist: 'Leonardo da Vinci',
    motion: 'breathe',
    position: 'center 25%',
    veil: 0.3,
  },
  // 3 — Step4: "Can I tell you a secret?"
  {
    src: wm('1665 Girl with a Pearl Earring.jpg'),
    title: 'Girl with a Pearl Earring',
    artist: 'Johannes Vermeer',
    motion: 'breathe',
    position: 'center 30%',
    veil: 0.3,
  },
  // 4 — Step5: "Will you go out with me?"
  {
    src: wm('Van Gogh - Starry Night - Google Art Project.jpg'),
    title: 'The Starry Night',
    artist: 'Vincent van Gogh',
    motion: 'swirl',
    veil: 0.32,
  },
  // 5 — StepFinal: "YAYYYYY"
  {
    src: wm('Gustav Klimt 016.jpg'),
    title: 'The Kiss',
    artist: 'Gustav Klimt',
    motion: 'shimmer',
    position: 'center 25%',
    veil: 0.3,
  },
  // 6 — StepDate: "What kind of date?"
  {
    src: wm('Van Gogh - Terrasse des Cafés an der Place du Forum in Arles am Abend1.jpeg'),
    title: 'Café Terrace at Night',
    artist: 'Vincent van Gogh',
    motion: 'drift',
    veil: 0.32,
  },
  // 7 — StepLocation: "Where should we go?"
  {
    src: wm('A Sunday on La Grande Jatte, Georges Seurat, 1884.jpg'),
    title: 'A Sunday on La Grande Jatte',
    artist: 'Georges Seurat',
    motion: 'drift',
    veil: 0.3,
  },
  // 8 — StepWhen: "When works for you?"
  {
    src: wm('Tsunami by hokusai 19th century.jpg'),
    title: 'The Great Wave off Kanagawa',
    artist: 'Katsushika Hokusai',
    motion: 'wave',
    veil: 0.3,
  },
  // 9 — StepDateConfirm: "It's a date!"
  {
    src: wm('Claude Monet - Water Lilies - 1906, Ryerson.jpg'),
    title: 'Water Lilies',
    artist: 'Claude Monet',
    motion: 'float',
    veil: 0.28,
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
};

const MOTION_DURATION: Record<MotionKind, number> = {
  kenburns: 24,
  swirl: 28,
  breathe: 15,
  float: 17,
  drift: 26,
  shimmer: 13,
  wave: 19,
};

export default function PaintingBackground({ painting }: { painting: Painting }) {
  const [failedSrcs, setFailedSrcs] = useState<Set<string>>(new Set());
  const failed = failedSrcs.has(painting.src);

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
          background:
            'radial-gradient(ellipse at center, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0) 78%)',
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
            <p className="text-sm font-display font-semibold text-gray-700/90 leading-tight drop-shadow-sm">
              {painting.title}
            </p>
            <p className="text-xs text-gray-500/90 italic">{painting.artist}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
