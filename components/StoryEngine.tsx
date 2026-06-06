'use client';
import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Step1 from '@/components/steps/Step1';
import Step2 from '@/components/steps/Step2';
import Step3 from '@/components/steps/Step3';
import Step4 from '@/components/steps/Step4';
import Step5 from '@/components/steps/Step5';
import StepFinal from '@/components/steps/StepFinal';
import FloatingParticles from '@/components/ui/FloatingParticles';
import FloatingHearts from '@/components/ui/FloatingHearts';
import CustomCursor from '@/components/ui/CustomCursor';
import ProgressIndicator from '@/components/ui/ProgressIndicator';
import MusicToggle from '@/components/ui/MusicToggle';

const TOTAL_STEPS = 6;

export default function StoryEngine() {
  const [step, setStep] = useState(0);

  const next = useCallback(() => setStep(s => Math.min(s + 1, TOTAL_STEPS - 1)), []);
  const handleYes = useCallback(() => setStep(TOTAL_STEPS - 1), []);

  const heartsCount = step >= 4 ? 16 : step >= 2 ? 6 : 3;
  const isFinal = step === TOTAL_STEPS - 1;

  return (
    <div className="relative min-h-screen overflow-hidden" aria-label="Interactive story">
      {/* Base gradient background */}
      <div
        className="fixed inset-0"
        style={{
          background: 'linear-gradient(135deg, #fff1f2 0%, #fdf2f8 40%, #f5f3ff 100%)',
          zIndex: 0,
        }}
      />

      {/* Animated blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }} aria-hidden="true">
        <div className="bg-blob bg-blob-1" />
        <div className="bg-blob bg-blob-2" />
        <div className="bg-blob bg-blob-3" />
      </div>

      {/* Grain texture */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Floating particles (GSAP) */}
      <FloatingParticles count={32} />

      {/* Floating hearts */}
      <FloatingHearts
        count={heartsCount}
        intensified={isFinal}
      />

      {/* Custom cursor */}
      <CustomCursor />

      {/* Music toggle */}
      <MusicToggle />

      {/* Progress dots — hidden on final step */}
      {!isFinal && (
        <ProgressIndicator current={step} total={TOTAL_STEPS - 1} />
      )}

      {/* Main content area */}
      <main
        className="relative flex items-center justify-center min-h-screen px-4 py-16"
        style={{ zIndex: 10 }}
      >
        <AnimatePresence mode="wait">
          {step === 0 && <Step1 key="s1" onNext={next} />}
          {step === 1 && <Step2 key="s2" onNext={next} />}
          {step === 2 && <Step3 key="s3" onNext={next} />}
          {step === 3 && <Step4 key="s4" onNext={next} />}
          {step === 4 && <Step5 key="s5" onYes={handleYes} />}
          {step === 5 && <StepFinal key="final" />}
        </AnimatePresence>
      </main>

      {/* Skip link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 primary-btn text-sm"
      >
        Skip to main content
      </a>
    </div>
  );
}
