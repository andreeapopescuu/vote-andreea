import { useState, useEffect } from 'react';
import { PHASES } from '../constants/phases';

export const usePhase = () => {
  const [phase, setPhase] = useState(PHASES.IDLE);

  // Apply/remove sepia background class to body
  useEffect(() => {
    document.body.classList.add('sepia-bg');
    return () => document.body.classList.remove('sepia-bg');
  }, []);

  const handlePaperClick = () => {
    if (phase === PHASES.IDLE) setPhase(PHASES.STAMPED);
    else if (phase === PHASES.STAMPED) setPhase(PHASES.STAMP_REMOVED);
    else if (phase === PHASES.STAMP_REMOVED) setPhase(PHASES.REVEALED);
  };

  return { phase, handlePaperClick };
}; 