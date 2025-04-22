import { useState, useEffect } from 'react';

// Define phases as constants for better readability
const PHASES = {
  IDLE: 0,
  STAMPED: 1,
  REVEALED: 2,
};

const VoteAndreea = () => {
  const [phase, setPhase] = useState(PHASES.IDLE);

  // Simple transition logic
  const handlePaperClick = () => {
    if (phase === PHASES.IDLE) setPhase(PHASES.STAMPED);
    else if (phase === PHASES.STAMPED) setPhase(PHASES.REVEALED);
  };

  // Background style for sepia effect
  useEffect(() => {
    document.body.style.background = "#f8f6f2";
    document.body.style.color = "#111";
    
    return () => {
      document.body.style.background = "";
      document.body.style.color = "";
    };
  }, []);

  // Idle phase: showing the paper to tap
  if (phase === PHASES.IDLE) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 relative">
        
        {/* Paper */}
        <button 
          onClick={handlePaperClick}
          className="w-72 h-96 bg-white rounded-xl shadow-2xl flex items-center justify-center hover:scale-105 transition-transform"
          aria-label="Tap to vote"
        >
          <span className="text-neutral-400 text-lg select-none">Tap to Vote</span>
        </button>
      </div>
    );
  }
  
  // Stamped phase: showing the paper with stamp
  if (phase === PHASES.STAMPED) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 relative">
        
        {/* Paper with stamp */}
        <button 
          onClick={handlePaperClick}
          className="w-72 h-96 bg-white rounded-xl shadow-2xl flex items-center justify-center relative"
          aria-label="Tap to reveal content"
        >
          <span className="text-neutral-600 text-xl font-bold absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-50">
            I VOTED!
          </span>
          
          {/* Stamp */}
          <div className="w-28 h-28 bg-neutral-800 rounded-full flex items-center justify-center shadow-xl
                 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
            <span className="text-white font-semibold">STAMP</span>
          </div>
        </button>
      </div>
    );
  }
  
  // Revealed phase: showing the main content
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative">
      
      {/* Main content */}
      <div className="flex flex-col items-center px-4 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-10">
          Vote&nbsp;Andreea!
        </h1>

        {/* Portrait with placeholder image */}
        <div className="relative w-56 h-56 sm:w-64 sm:h-64 mb-12">
          <img
            src="/api/placeholder/400/400"
            alt="Andreea portrait"
            className="w-full h-full object-cover rounded-full border-4 border-white shadow-xl"
          />
          
          {/* Simple orbit text (non-animated) */}
          <div className="absolute -inset-4 border-2 border-dashed border-neutral-300 rounded-full flex items-center justify-center">
            <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs text-neutral-700">
              VOTE FOR ANDREEA
            </span>
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-white px-2 text-xs text-neutral-700">
              VOTE FOR ANDREEA
            </span>
          </div>
        </div>

        {/* Bio */}
        <p className="max-w-xl text-base sm:text-lg leading-relaxed mb-8">
          Andreea is a passionate EPOS student from Cluj‑Napoca committed to empowering every
          voice in the University of Bologna community. Her grassroots‑organising experience
          fuels a vision of inclusive, student‑driven policy.
        </p>

        {/* Video Placeholder */}
        <div className="w-full max-w-xl aspect-video bg-neutral-900 rounded-lg flex items-center justify-center
                 text-white shadow-lg mb-6">
          <span className="text-sm opacity-70">Video message coming soon…</span>
        </div>

        {/* Dual‑candidacy */}
        <div className="text-sm italic text-neutral-700">
          Running with UDU – Rete degli Universitari<br />
          • EPOS Course Representative<br />
          • Department Representative
        </div>
      </div>
    </div>
  );
};

export default VoteAndreea;