import { useState, useEffect } from 'react';
import { PHASES } from '../constants/phases';

export const usePhase = () => {
  const [phase, setPhase] = useState(PHASES.IDLE);

  // Apply/remove sepia background class to body
  useEffect(() => {
    document.body.classList.add('sepia-bg');
    return () => document.body.classList.remove('sepia-bg');
  }, []);

  // Automatically transition through all phases after first click
  useEffect(() => {
    if (phase === PHASES.STAMPED) {
      const timer1 = setTimeout(() => {
        setPhase(PHASES.STAMP_REMOVED);
      }, 2000); // Show stamp for 2 seconds
      
      return () => clearTimeout(timer1);
    }
  }, [phase]);

  // Separate effect for STAMP_REMOVED to REVEALED transition
  useEffect(() => {
    if (phase === PHASES.STAMP_REMOVED) {
      const timer2 = setTimeout(() => {
        setPhase(PHASES.REVEALED);
      }, 2000); // Show "Andreea" text for 2 seconds
      
      return () => clearTimeout(timer2);
    }
  }, [phase]);

  const handlePaperClick = () => {
    if (phase === PHASES.IDLE) {
      setPhase(PHASES.STAMPED);
    }
  };

  return { phase, handlePaperClick };
}; 