'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

// YouTube Music track to play in the background (looped).
// From https://music.youtube.com/watch?v=RDhsz9N9crY
const VIDEO_ID = 'RDhsz9N9crY';

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

export default function MusicToggle() {
  const [playing, setPlaying] = useState(false);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    const init = () => {
      if (!window.YT || !window.YT.Player || playerRef.current) return;
      playerRef.current = new window.YT.Player('yt-music-player', {
        videoId: VIDEO_ID,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          loop: 1,
          playlist: VIDEO_ID, // required for single-video loop
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
        },
        events: {
          onStateChange: (e: any) => {
            if (e.data === 1) setPlaying(true);
            else if (e.data === 2 || e.data === 0) setPlaying(false);
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      init();
    } else {
      if (!document.getElementById('yt-iframe-api')) {
        const tag = document.createElement('script');
        tag.id = 'yt-iframe-api';
        tag.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(tag);
      }
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        prev?.();
        init();
      };
    }
  }, []);

  const toggle = useCallback(() => {
    const p = playerRef.current;
    if (!p) return;
    if (playing) {
      p.pauseVideo?.();
      setPlaying(false);
    } else {
      try {
        p.unMute?.();
        p.setVolume?.(55);
        p.playVideo?.();
      } catch { /* ignore */ }
      setPlaying(true);
    }
  }, [playing]);

  return (
    <>
      {/* Hidden YouTube audio player */}
      <div
        aria-hidden="true"
        style={{ position: 'fixed', left: -9999, top: -9999, width: 200, height: 120, opacity: 0, pointerEvents: 'none' }}
      >
        <div id="yt-music-player" />
      </div>

      <motion.button
        onClick={toggle}
        aria-label={playing ? 'Pause music' : 'Play music'}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.9 }}
        className="fixed top-4 right-4 z-30 w-11 h-11 rounded-full flex items-center justify-center text-base shadow-lg"
        style={{
          background: 'rgba(255,255,255,0.35)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          border: '1px solid rgba(255,255,255,0.5)',
          zIndex: 30,
        }}
        title={playing ? 'Pause music' : 'Play music'}
      >
        <motion.span
          key={playing ? 'on' : 'off'}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {playing ? '🎵' : '🔇'}
        </motion.span>

        {/* Pulse ring when playing */}
        {playing && (
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ border: '1.5px solid rgba(251,113,133,0.5)', pointerEvents: 'none' }}
          />
        )}
      </motion.button>
    </>
  );
}
