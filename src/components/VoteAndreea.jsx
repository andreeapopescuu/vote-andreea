import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PHASES, PORTRAIT_IMAGE_URL } from '../constants/phases';
import { usePhase } from '../hooks/usePhase';
import '../styles/global.css';

const VoteAndreea = () => {
  const { phase, handlePaperClick } = usePhase();

  return (
    <>
      {/* Grain overlay positioned at the very beginning */}
      <div className="grain" />
      
      {/* Main content container - kept min-h-screen to fill viewport */}
      <div className="min-h-screen flex flex-col items-center justify-center font-sans relative overflow-hidden p-2 sm:p-4 relative z-[2]">
        {/* ─── PAPER + STAMP CONTAINER ─── */}
        <AnimatePresence mode="wait">
          {phase < PHASES.REVEALED && (
            <motion.div
              key="paper-wrapper"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.3, ease: 'easeIn' } }} 
              transition={{ duration: 1.0, ease: 'easeInOut' }}
              className="relative w-64 sm:w-72 h-80 sm:h-96 mb-4 sm:mb-8"
              style={{ perspective: '1000px' }}
            >
              {/* Paper Sheet - Changed div to button for accessibility */}
              <motion.button
                onClick={handlePaperClick}
                className="paper-button w-full h-full bg-white rounded-xl shadow-2xl flex items-center justify-center relative touch-manipulation"
                style={{ transformStyle: 'preserve-3d' }}
                whileHover={phase === PHASES.IDLE ? { rotateX: 6, rotateY: -6, scale: 1.015 } : {}}
                whileTap={phase === PHASES.IDLE ? { scale: 0.97 } : {}}
                aria-label={
                  phase === PHASES.IDLE ? "Tap to vote" :
                  phase === PHASES.STAMPED ? "Tap to remove stamp" :
                  "Tap to reveal content"
                }
              >
                {/* Use AnimatePresence for text transitions inside the button */}
                <AnimatePresence mode="wait">
                  {phase === PHASES.IDLE && (
                    <motion.span
                      key="idle-text"
                      exit={{ opacity: 0 }}
                      className="text-neutral-400 text-lg select-none"
                    >
                      Tap to Vote
                    </motion.span>
                  )}
                  {phase === PHASES.STAMPED && (
                    <motion.div
                      key="voted-text"
                      initial={{ opacity: 0, y: -50 }}
                      animate={{ opacity: 0.5, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: 0.5, duration: 0.3 }}
                      className="text-neutral-600 text-lg sm:text-xl font-bold absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    >
                      I VOTED!
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Stamp - Wrap in AnimatePresence to handle its exit */}
              <AnimatePresence>
                {phase === PHASES.STAMPED && (
                  <motion.div
                    key="stamp"
                    initial={{ y: -200, opacity: 0, scale: 1.5 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5, y: 50, transition: { duration: 0.3, ease: 'easeIn' } }}
                    transition={{ type: 'spring', stiffness: 120, damping: 18, mass: 0.6 }}
                    className="w-24 sm:w-28 h-24 sm:h-28 bg-neutral-800 rounded-full flex items-center justify-center shadow-xl
                               absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none"
                  >
                    <span className="text-white font-semibold">STAMP</span>
                  </motion.div>
                )}
                {phase === PHASES.STAMP_REMOVED && (
                  <motion.div
                    key="andreea-text"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.3 }}
                    className="text-red-800 text-xl sm:text-2xl font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none"
                  >
                    Andreea
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── MAIN CONTENT ─── */}
        <AnimatePresence mode="wait">
          {phase === PHASES.REVEALED && (
            <motion.div
              key="main"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0 }} 
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
              className="flex flex-col items-center px-2 sm:px-4 text-center"
            >
              <motion.h1
                initial={{ opacity: 0, y: -20 }} 
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }} 
                className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-10"
              >
                Vote&nbsp;Andreea!
              </motion.h1>

              {/* Portrait + Orbiting Text */}
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 mb-8 sm:mb-12">
                <motion.img
                  src={PORTRAIT_IMAGE_URL}
                  alt="Andreea portrait"
                  className="w-full h-full object-cover rounded-full border-4 border-white shadow-xl"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                />
                {/* Orbiting Text Container */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none" 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <div className="w-[115%] h-[115%] animate-spin-slow"> 
                    <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible"> 
                      <path id="circleText" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" fill="none" /> 
                      <text className="text-xs fill-current text-neutral-700" dy="-2"> 
                        <textPath href="#circleText" startOffset="50%" textAnchor="middle" spacing="auto">
                          • VOTE FOR ANDREEA • VOTE FOR ANDREEA •
                        </textPath>
                      </text>
                    </svg>
                  </div>
                </motion.div>
              </div>

              {/* Bio */}
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }} 
                className="max-w-xl text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8 px-2 sm:px-4"
              >
                Andreea is a passionate EPOS student from Cluj‑Napoca committed to empowering every
                voice in the University of Bologna community. Her grassroots‑organising experience
                fuels a vision of inclusive, student‑driven policy.
              </motion.p>

              {/* Video Placeholder */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.6 }} 
                className="w-full max-w-xl aspect-video bg-neutral-900 rounded-lg flex items-center justify-center
                           text-white shadow-lg mb-4 sm:mb-6 mx-2 sm:mx-0"
              >
                <span className="text-sm opacity-70">Video message coming soon…</span>
              </motion.div>

              {/* Dual‑candidacy */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.6 }} 
                className="text-sm italic text-neutral-700"
              >
                Running with UDU – Rete degli Universitari<br />
                • EPOS Course Representative<br />
                • Department Representative
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default VoteAndreea; 