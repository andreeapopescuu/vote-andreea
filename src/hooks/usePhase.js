import { useState, useEffect } from 'react';
import { PHASES } from '../constants/phases';

export const usePhase = () => {
  const [phase, setPhase] = useState(PHASES.IDLE);

  // Apply/remove sepia background class to body
  useEffect(() => {
    document.body.classList.add('sepia-bg');
    return () => document.body.classList.remove('sepia-bg');
  }, []);

  // Automatically transition from STAMP_REMOVED to REVEALED after delay
  useEffect(() => {
    if (phase === PHASES.STAMP_REMOVED) {
      const timer = setTimeout(() => {
        setPhase(PHASES.REVEALED);
      }, 1000); // 2 second delay to allow the "Andreea" text to be visible
      return () => clearTimeout(timer);
    }
  }, [phase]);

  const handlePaperClick = () => {
    if (phase === PHASES.IDLE) setPhase(PHASES.STAMPED);
    else if (phase === PHASES.STAMPED) setPhase(PHASES.STAMP_REMOVED);
  };

  return { phase, handlePaperClick };
}; 