import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Define phases as constants for better readability
const PHASES = {
  IDLE: 0,
  STAMPED: 1,
  REVEALED: 2,
};

// Placeholder image URL constant
const PORTRAIT_IMAGE_URL = "/api/placeholder/256/256";

const VoteAndreea = () => {
  const [phase, setPhase] = useState(PHASES.IDLE);

  // Apply/remove sepia background class to body
  useEffect(() => {
    document.body.classList.add('sepia-bg');
    return () => document.body.classList.remove('sepia-bg');
  }, []);

  /* ─────────────────────────  Shared CSS (Consider moving to a CSS file/module) ───────────────────────── */
  // Keep CSS here for simplicity in this example, but recommend moving it
  const css = `
    .sepia-bg { background:#f8f6f2;color:#111; }
    .grain{pointer-events:none;position:fixed;inset:0;
      background-image:url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmZmYiLz48L3N2Zz4=");
      opacity:.15;animation:grain 2s steps(10) infinite;}
    @keyframes grain{to{transform:translate(-100%,100%)}}
    @keyframes spin-slow{to{transform:rotate(360deg)}}
    .animate-spin-slow{animation:spin-slow 20s linear infinite;}
    /* Reset button styles for the paper */
    .paper-button {
      background: none;
      color: inherit;
      border: none;
      padding: 0;
      font: inherit;
      cursor: pointer;
      outline: inherit;
      appearance: none; /* Add this for broader compatibility */
    }
  `;

  /* ─────────────────────────  Handlers  ───────────────────────── */
  const handlePaperClick = () => {
    if (phase === PHASES.IDLE) setPhase(PHASES.STAMPED);
    else if (phase === PHASES.STAMPED) setPhase(PHASES.REVEALED);
  };

  /* ─────────────────────────  JSX  ───────────────────────── */
  return (
    <>
      <style>{css}</style>
      <div className="grain" />

      <div className="min-h-screen flex flex-col items-center justify-center font-sans relative overflow-hidden p-4"> {/* Added padding */}
        {/* ─── PAPER + STAMP CONTAINER ─── */}
        <AnimatePresence mode="wait">
          {phase < PHASES.REVEALED && ( /* Show until reveal phase starts */
            <motion.div
              key="paper-wrapper"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              className="relative w-72 h-96 mb-8" // Removed cursor-pointer here
              style={{ perspective: '1000px' }}
              // onClick moved to the button below
            >
              {/* Paper Sheet - Changed div to button for accessibility */}
              <motion.button
                onClick={handlePaperClick}
                className="paper-button w-full h-full bg-white rounded-xl shadow-2xl flex items-center justify-center relative" // Added relative positioning
                style={{ transformStyle: 'preserve-3d' }}
                whileHover={phase === PHASES.IDLE ? { rotateX: 8, rotateY: -8, scale: 1.02 } : {}} // Added subtle scale on hover
                whileTap={phase === PHASES.IDLE ? { scale: 0.98 } : {}} // Added tap effect
                aria-label={phase === PHASES.IDLE ? "Tap to vote" : "Tap to reveal content"} // ARIA label for screen readers
              >
                {phase === PHASES.IDLE && (
                  <span className="text-neutral-400 text-lg select-none">Tap to Vote</span>
                )}
                {phase === PHASES.STAMPED && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ delay: 0.6, duration: 0.3 }}
                    className="text-neutral-600 text-xl font-bold"
                  >
                    APPROVED
                  </motion.div>
                )}
              </motion.button>

              {/* Stamp - Appears above the button */}
              {phase >= PHASES.STAMPED && (
                <motion.div
                  key="stamp"
                  initial={{ y: -200, opacity: 1, scale: 1.5 }} // Start slightly larger and higher
                  animate={{ y: 0, opacity: phase === PHASES.STAMPED ? 1 : 0, scale: 1 }} // Animate to final position and scale
                  exit={{ opacity: 0, scale: 0.5 }} // Exit animation
                  transition={{ type: 'spring', stiffness: 100, damping: 15, mass: 0.5 }} // Spring animation for stamp
                  className="w-28 h-28 bg-neutral-800 rounded-full flex items-center justify-center shadow-xl
                             absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none" // Added pointer-events-none
                >
                  <span className="text-white font-semibold">STAMP</span>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── MAIN CONTENT ─── */}
        <AnimatePresence mode="wait">
          {phase === PHASES.REVEALED && (
            <motion.div
              key="main"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }} // Keep exit simple
              transition={{ duration: 1.0, ease: 'easeOut' }}
              className="flex flex-col items-center px-4 text-center"
            >
              <motion.h1
                initial={{ opacity: 0, y: -20 }} // Animate from slightly above
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }} // Slightly faster entry
                className="text-3xl sm:text-4xl font-bold mb-10" // Responsive text size
              >
                Vote&nbsp;Andreea!
              </motion.h1>

              {/* Portrait + Orbiting Text */}
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 mb-12"> {/* Responsive size */}
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
                  className="absolute inset-0 flex items-center justify-center pointer-events-none" // Added pointer-events-none
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <div className="w-[115%] h-[115%] animate-spin-slow"> {/* Adjusted size for better spacing */}
                    <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible"> {/* Allow text overflow */}
                      <path id="circleText" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" fill="none" /> {/* Adjusted radius */}
                      <text className="text-xs fill-current text-neutral-700" dy="-2"> {/* Adjusted dy for offset, added color */}
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
                transition={{ delay: 0.7, duration: 0.6 }} // Staggered animation
                className="max-w-xl text-base sm:text-lg leading-relaxed mb-8" // Responsive text size
              >
                Andreea is a passionate EPOS student from Cluj‑Napoca committed to empowering every
                voice in the University of Bologna community. Her grassroots‑organising experience
                fuels a vision of inclusive, student‑driven policy.
              </motion.p>

              {/* Video Placeholder */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.6 }} // Staggered animation
                className="w-full max-w-xl aspect-video bg-neutral-900 rounded-lg flex items-center justify-center
                           text-white shadow-lg mb-6"
              >
                <span className="text-sm opacity-70">Video message coming soon…</span>
              </motion.div>

              {/* Dual‑candidacy */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.6 }} // Staggered animation
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

// --- Next.js specific exports ---

// It's generally recommended to define metadata and config
// in layout.js or page.js in the App Router,
// or keep getStaticProps if using the Pages Router.
// Assuming App Router structure is preferred for modern Next.js:

// Remove getStaticProps if using App Router metadata API
/*
export const getStaticProps = async () => {
  return {
    props: {
      title: 'Vote Andreea!',
      description: 'Vote for Andreea, a passionate EPOS student from Cluj-Napoca committed to empowering every voice in the University of Bologna community.',
      image: PORTRAIT_IMAGE_URL,
    },
  };
};
*/

// Remove config if runtime is defined at the page/layout level
/*
export const config = {
  runtime: 'edge',
};
*/

// Metadata (preferred way in App Router)
// Place this in the page.js or layout.js that renders <VoteAndreea />
/*
export const metadata = {
  title: 'Vote Andreea!',
  description: 'Vote for Andreea, a passionate EPOS student from Cluj-Napoca committed to empowering every voice in the University of Bologna community.',
  openGraph: {
    title: 'Vote Andreea!',
    description: 'Vote for Andreea, a passionate EPOS student from Cluj-Napoca committed to empowering every voice in the University of Bologna community.',
    images: [
      {
        url: PORTRAIT_IMAGE_URL, // Use the constant
        width: 256,
        height: 256,
      },
    ],
  },
};
*/

// Revalidation and Runtime (configure in page.js/layout.js or fetch options)
// export const revalidate = 60; // Revalidate every 60 seconds
// export const runtime = 'edge'; // Use Edge Runtime for better performance

// If still using Pages Router, the original exports are fine,
// but consider using the PORTRAIT_IMAGE_URL constant.  ""