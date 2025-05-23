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
                aria-label={phase === PHASES.IDLE ? "Tap to vote" : "Voting in progress"}
              >
                {/* Use AnimatePresence for text transitions inside the button */}
                <AnimatePresence mode="wait">
                  {phase === PHASES.IDLE && (
                    <motion.span
                      key="idle-text"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
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
                      I VOTED FOR:
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
                    className="w-24 sm:w-28 h-24 sm:h-28 bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-full flex items-center justify-center shadow-xl
                               absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none"
                  >
                    <span className="text-white font-semibold">STAMP</span>
                  </motion.div>
                )}
                {phase === PHASES.STAMP_REMOVED && (
                  <motion.div
                    key="andreea-text"
                    initial={{ opacity: 0, scale: 0.5, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: -50 }}
                    transition={{ 
                      duration: 0.6,
                      ease: [0.25, 1, 0.5, 1],
                      scale: { duration: 0.4 }
                    }}
                    className="text-red-800 text-2xl sm:text-3xl font-bold absolute top-1/3 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
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
                &nbsp;
              </motion.h1>

              {/* Portrait + Orbiting Text */}
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 mb-8 sm:mb-12">
                {/* Enhanced glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-neutral-900 to-neutral-800 opacity-5 blur-md"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                />
                {/* Portrait container with enhanced shadow */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    boxShadow: '0 0 15px rgba(0, 0, 0, 0.1), 0 0 30px rgba(0, 0, 0, 0.05)',
                  }}
                >
                  <motion.img
                    src={PORTRAIT_IMAGE_URL}
                    alt="Andreea portrait"
                    className="w-full h-full object-cover rounded-full border-[3px] border-white/90 shadow-[inset_0_0_10px_rgba(0,0,0,0.05)] relative z-10"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  />
                </motion.div>
                {/* Orbiting Text Container */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none" 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <div className="w-[170%] h-[170%] animate-spin-slow"> 
                    <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                      {/* renamed id to avoid collisions */}
                      <path
                        id="orbitTextPath"
                        d="M 50, 50 m -50, 0 a 50,50 0 1,1 100,0 a 50,50 0 1,1 -100,0"
                        fill="none"
                      />
                      <text
                        className="text-sm fill-current text-neutral-700 font-medium"
                        dy="-2"
                      >
                        <textPath
                          href="#orbitTextPath"
                          startOffset="50%"
                          textAnchor="middle"
                          method="align"
                          spacing="exact"
                          textLength="320"
                          lengthAdjust="spacingAndGlyphs"
                        >
                          • VOTE FOR ANDREEA • VOTE FOR ANDREEA •
                        </textPath>
                      </text>
                    </svg>
                  </div>
                </motion.div>
              </div>

              {/* Bio */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }} 
                className="max-w-xl text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8 px-2 sm:px-4 space-y-4"
              >
                <p>
                  <span className="font-semibold">Hi! I'm Andreea Popescu,</span> a first-year EPOS student from Bucharest, Romania. I have extensive experience in student representation and leadership: during high school, I served as Director of Extracurricular Activities, was elected Student Council President, and founded Bucharest's first youth NGO dedicated to environmental issues.
                </p>

                <p>
                  I understand the challenges we face as international students at UniBo. With over 8,000 of us here—and most economics courses taught in English—we still encounter accessibility barriers. I've gathered your insights and concerns via feedback forms, and I'm committed to amplifying our collective voice.
                </p>

                <p>
                  The feedback form is still active, and I welcome any further thoughts or suggestions you may wish to share at{' '}
                  <a 
                    href="https://forms.gle/9HrwvkZC7zDzt3op8" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="italic text-blue-500 hover:text-blue-600"
                  >
                    https://forms.gle/9HrwvkZC7zDzt3op8
                  </a>.
                </p>

                <p>
                  <span className="font-semibold">Vote on May 14th-15th</span> to help bring these changes to life. Find me on the UDU – RETE DEGLI UNIVERSITARI list as POPESCU ANDREEA-MADALINA.
                </p>
              </motion.div>

              {/* Video Placeholder */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.6 }} 
                className="w-full max-w-xl aspect-video rounded-lg shadow-lg mb-4 sm:mb-6 mx-2 sm:mx-0"
              >
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/-TmiIS6hcPY?si=jvgzkE7gVxgMZ35Z" 
                  title="YouTube video player" 
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen 
                  className="rounded-lg"
                ></iframe>
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