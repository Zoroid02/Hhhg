import React from 'react';
import { motion } from 'motion/react';
import { Info, Sparkles } from 'lucide-react';
import { playPurr } from '../utils/audio';

interface IntroSectionProps {
  onNext: () => void;
  imageSrc: string;
  key?: React.Key;
}

export default function IntroSection({ onNext, imageSrc }: IntroSectionProps) {
  const handleNextClick = () => {
    playPurr();
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="flex flex-col items-center justify-between min-h-[580px] p-6 text-center"
    >
      {/* Mini Title bar */}
      <div className="flex items-center gap-1.5 text-cozy-brown/60 text-xs font-bold uppercase tracking-widest bg-cozy-beige px-3.5 py-1.5 rounded-full select-none">
        <Info className="w-3.5 h-3.5" />
        <span>Intro</span>
      </div>

      {/* Confused/Sad Cat Image */}
      <div className="relative my-6 animate-cozy-float-reverse group max-w-sm">
        <div className="absolute -inset-1.5 bg-cozy-lavender rounded-full blur-lg opacity-80 group-hover:opacity-100 transition-opacity"></div>
        <img
          src={imageSrc}
          alt="Cute Confused Sad Cat"
          referrerPolicy="no-referrer"
          className="relative w-52 h-52 md:w-60 md:h-60 rounded-full border-4 border-white shadow-md object-cover"
        />
        {/* Confused Thought Cloud */}
        <div className="absolute -top-3 -right-3 bg-white px-3 py-1.5 rounded-2xl shadow-sm text-xs font-bold text-cozy-brown border border-cozy-pink/40 font-display select-none">
          meow? 🥺
        </div>
      </div>

      {/* Main Text Content */}
      <div className="space-y-4 max-w-sm my-4">
        <h2 className="text-xl md:text-2xl font-bold text-cozy-brown font-display leading-snug px-2">
          Tiny question before the meow message <span className="inline-block animate-pulse text-cozy-accent">🐾</span>
        </h2>
        <p className="text-sm md:text-base text-cozy-brown/80 font-medium px-4 leading-relaxed">
          The tiny helper cat has a very small, honest request for you first...
        </p>
      </div>

      {/* Step Transition button */}
      <div className="w-full max-w-[280px] mt-6">
        <motion.button
          onClick={handleNextClick}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full py-3.5 px-6 bg-cozy-brown hover:bg-cozy-brown/95 text-white font-bold rounded-2xl shadow hover:shadow-md transition-all duration-300 font-display flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>ok, let me see 🐱</span>
        </motion.button>
        <span className="block mt-2 text-[10px] text-cozy-brown/30 font-semibold uppercase tracking-widest leading-none select-none">
          Step 1 of 4
        </span>
      </div>
    </motion.div>
  );
}
