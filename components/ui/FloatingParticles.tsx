'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const PARTICLE_COLORS = [
  'rgba(251,113,133,0.55)',
  'rgba(236,72,153,0.45)',
  'rgba(167,139,250,0.5)',
  'rgba(249,168,212,0.6)',
  'rgba(253,186,116,0.45)',
  'rgba(134,239,172,0.4)',
  'rgba(147,197,253,0.45)',
];

export default function FloatingParticles({ count = 35 }: { count?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particles: HTMLDivElement[] = [];
    const tweens: gsap.core.Tween[] = [];

    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      el.className = 'particle';

      const size = Math.random() * 9 + 3;
      const isHeart = Math.random() > 0.8;
      const isStar = !isHeart && Math.random() > 0.75;

      if (isHeart) {
        el.textContent = '✦';
        el.style.fontSize = `${size + 4}px`;
        el.style.color = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
        el.style.lineHeight = '1';
      } else if (isStar) {
        el.textContent = '⋆';
        el.style.fontSize = `${size + 6}px`;
        el.style.color = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
      } else {
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        el.style.borderRadius = Math.random() > 0.5 ? '50%' : '3px';
        el.style.background = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
      }

      el.style.left = `${Math.random() * 100}%`;
      el.style.top = `${Math.random() * 100}%`;
      gsap.set(el, { opacity: Math.random() * 0.6 + 0.15 });

      container.appendChild(el);
      particles.push(el);

      const tween = gsap.to(el, {
        x: `${(Math.random() - 0.5) * 160}px`,
        y: `${(Math.random() - 0.5) * 160}px`,
        rotation: Math.random() * 360,
        opacity: Math.random() * 0.7 + 0.1,
        duration: Math.random() * 5 + 4,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: Math.random() * 3,
      });
      tweens.push(tween);
    }

    return () => {
      tweens.forEach(t => t.kill());
      particles.forEach(p => p.remove());
    };
  }, [count]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 2 }}
      aria-hidden="true"
    />
  );
}
