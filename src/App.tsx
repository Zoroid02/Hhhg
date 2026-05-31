import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Heart, Sparkles, AlertCircle, RefreshCw, Volume2 } from 'lucide-react';
import FloatingPaws from './components/FloatingPaws';
import LandingHero from './components/LandingHero';
import IntroSection from './components/IntroSection';
import YesNoCard from './components/YesNoCard';
import ApologyMessage from './components/ApologyMessage';
import FinalScreen from './components/FinalScreen';
import { playPurr, playSweetChime } from './utils/audio';

// Import images as assets so Vite processes them for production build
import landingImg from './assets/images/meow_landing_hero_1780238730219.png';
import introImg from './assets/images/meow_sad_intro_1780238750647.png';
import askImg from './assets/images/meow_playful_ask_1780238772167.png';
import apologyImg from './assets/images/meow_sleepy_hug_1780238795081.png';
import finalImg from './assets/images/meow_wave_goodbye_1780238815248.png';

type Step = 'landing' | 'intro' | 'ask' | 'apology' | 'final';

export default function App() {
  const [step, setStep] = useState<Step>('landing');
  const [visitedSteps, setVisitedSteps] = useState<Step[]>(['landing']);

  // Pre-configured generated illustration asset links
  const images = {
    landing: landingImg,
    intro: introImg,
    ask: askImg,
    apology: apologyImg,
    final: finalImg,
  };

  const changeStep = (nextStep: Step) => {
    setStep(nextStep);
    if (!visitedSteps.includes(nextStep)) {
      setVisitedSteps((prev) => [...prev, nextStep]);
    }
  };

  const handleRestart = () => {
    playSweetChime();
    setStep('landing');
    setVisitedSteps(['landing']);
  };

  // Helper for progress dots
  const stepList: Step[] = ['landing', 'intro', 'ask', 'apology', 'final'];
  const activeIndex = stepList.indexOf(step);

  return (
    <div className="min-h-screen bg-[#FAF3E0] flex items-center justify-center p-4 lg:p-8 relative overflow-hidden font-sans text-cozy-brown">
      {/* Decorative ambient gradients/blobs from the Sleek Theme */}
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-cozy-accent-soft rounded-full blur-[100px] opacity-40 pointer-events-none" />
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-[#D4A373]/20 rounded-full blur-[100px] opacity-30 pointer-events-none" />
      
      {/* Large decorative floating emoticons in background spacing */}
      <div className="absolute top-1/4 left-10 opacity-15 rotate-12 text-8xl hidden xl:block pointer-events-none select-none">🐾</div>
      <div className="absolute bottom-1/4 right-20 opacity-15 -rotate-12 text-8xl hidden xl:block pointer-events-none select-none">🐾</div>
      <div className="absolute top-20 right-40 opacity-10 text-6xl hidden xl:block pointer-events-none select-none">🐱</div>

      {/* Floating paws background effect */}
      <FloatingPaws />

      {/* Main responsive presentation page layout container */}
      <div className="w-full max-w-5xl flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-12 relative z-10 py-6 lg:py-0">
        
        {/* LEFT COLUMN: Presentation branding (Only visible on large screens) */}
        <div className="hidden lg:flex flex-col max-w-md gap-6 text-left">
          <div className="bg-white/40 backdrop-blur-sm p-4 rounded-3xl inline-block w-fit shadow-xs border border-white/40 select-none">
            <span className="text-2xl font-bold tracking-tight text-cozy-brown font-display">Tiny Meow Sorry 🐾</span>
          </div>
          <h1 className="text-5xl font-extrabold leading-[1.15] tracking-tight text-cozy-brown font-display select-none">
            A tiny soft message from someone who <span className="text-cozy-accent font-bold">cares</span>.
          </h1>
          <p className="text-lg opacity-85 leading-relaxed font-semibold font-sans">
            We've navigated through some tiny clouds, but there's always a warm sun waiting behind them.
          </p>
          <div className="flex gap-4 mt-2 select-none">
            <div className="w-12 h-12 rounded-full bg-white border-4 border-cozy-accent-soft/80 flex items-center justify-center text-xl shadow-xs animate-bounce">🐱</div>
            <div className="w-12 h-12 rounded-full bg-white border-4 border-[#D4A373] flex items-center justify-center text-xl shadow-xs mt-4">🐾</div>
            <div className="w-12 h-12 rounded-full bg-white border-4 border-[#E8D5C4] flex items-center justify-center text-xl shadow-xs mt-2">💕</div>
          </div>
        </div>

        {/* RIGHT COLUMN: The Sleek Device Simulator */}
        <div className="relative w-full max-w-sm lg:w-[360px] lg:h-[680px] lg:bg-[#1a1a1a] lg:rounded-[55px] lg:p-4 lg:shadow-2xl lg:border-[8px] lg:border-[#333] transition-all duration-500">
          
          {/* Smartphone Camera Notch */}
          <div className="hidden lg:block absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#1a1a1a] rounded-b-2xl z-20" />
          
          {/* The Phone Inner UI */}
          <main className="w-full h-full min-h-[640px] bg-cozy-beige rounded-[32px] lg:rounded-[40px] overflow-hidden flex flex-col relative shadow-xl lg:shadow-none border-4 border-white lg:border-0 justify-between">
            {/* Dynamic header row with sound indicator */}
            <header className="p-4 flex items-center justify-between border-b border-cozy-pink/40 select-none pb-2">
              {/* Brand logo */}
              <div className="flex items-center gap-1.5">
                <span className="text-lg">🐾</span>
                <span className="font-display font-medium text-xs text-cozy-brown/80 tracking-wide uppercase">
                  Tiny Meow Sorry
                </span>
              </div>

              {/* Sparkly interactive indicators */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    playPurr();
                  }}
                  title="Click for purr"
                  className="p-1.5 hover:bg-cozy-pink/50 rounded-full transition-colors text-cozy-brown/60 duration-300 flex items-center gap-1 cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold">Sound ON</span>
                </button>
                <div className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-cozy-accent animate-pulse" />
                  <Heart className="w-3 h-3 text-red-400 fill-current" />
                </div>
              </div>
            </header>

            {/* Dynamic content node with exit/enter transitions */}
            <div className="flex-1 flex flex-col justify-center relative bg-white/30">
              <AnimatePresence mode="wait">
                {step === 'landing' && (
                  <LandingHero
                    key="landing"
                    imageSrc={images.landing}
                    onStart={() => changeStep('intro')}
                  />
                )}
                {step === 'intro' && (
                  <IntroSection
                    key="intro"
                    imageSrc={images.intro}
                    onNext={() => changeStep('ask')}
                  />
                )}
                {step === 'ask' && (
                  <YesNoCard
                    key="ask"
                    imageSrc={images.ask}
                    onYes={() => changeStep('apology')}
                  />
                )}
                {step === 'apology' && (
                  <ApologyMessage
                    key="apology"
                    imageSrc={images.apology}
                    onContinue={() => changeStep('final')}
                  />
                )}
                {step === 'final' && (
                  <FinalScreen
                    key="final"
                    imageSrc={images.final}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Global sticky footer with elegant layout indicators */}
            <footer className="p-4 flex flex-col items-center gap-3 bg-white/40 border-t border-cozy-pink/10 pb-5 select-none">
              {/* Steps tracker indicator */}
              <div className="flex items-center gap-2">
                {stepList.map((s, index) => {
                  const isPast = visitedSteps.includes(s);
                  const isActive = step === s;
                  return (
                    <button
                      key={s}
                      onClick={() => {
                        // Only let them backtrack to steps they've already visited to preserve story progression
                        if (isPast) {
                          playSweetChime();
                          setStep(s);
                        }
                      }}
                      disabled={!isPast}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        isActive
                          ? 'w-6 bg-cozy-accent'
                          : isPast
                            ? 'w-2 bg-cozy-brown/50 hover:bg-cozy-accent/60'
                            : 'w-2 bg-cozy-brown/10'
                      }`}
                      aria-label={`Go to step ${index + 1}`}
                    />
                  );
                })}
              </div>

              {/* Reset button to reread / start over carefully */}
              {activeIndex > 0 && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  whileHover={{ opacity: 1, scale: 1.05 }}
                  onClick={handleRestart}
                  className="text-[11px] font-bold text-cozy-brown hover:text-cozy-accent transition-all flex items-center gap-1 font-display cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>read meow message again</span>
                </motion.button>
              )}
            </footer>
          </main>
        </div>
      </div>

      {/* Aesthetic pairing instructions for desktop users */}
      <div className="absolute bottom-4 text-center text-cozy-brown/40 text-[11px] font-semibold uppercase tracking-widest leading-none pointer-events-none select-none">
        designed for mobile view • optimized with 🐾
      </div>
    </div>
  );
}
