import React from 'react';
import { motion } from 'motion/react';
import { MailOpen, Heart, ArrowRight } from 'lucide-react';
import { playSweetChime } from '../utils/audio';

interface ApologyMessageProps {
  onContinue: () => void;
  imageSrc: string;
  key?: React.Key;
}

export default function ApologyMessage({ onContinue, imageSrc }: ApologyMessageProps) {
  const handleContinue = () => {
    playSweetChime();
    onContinue();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="flex flex-col items-center justify-between min-h-[580px] p-6 text-center w-full"
    >
      {/* Header Badge */}
      <div className="flex items-center gap-1.5 text-cozy-brown/65 text-xs font-bold uppercase tracking-widest bg-cozy-pink px-4 py-1.5 rounded-full mb-1 select-none">
        <MailOpen className="w-3.5 h-3.5" />
        <span>For Billoti ♥</span>
      </div>

      {/* Sleepy Hugging Cat illustration */}
      <div className="relative my-4 animate-cozy-float max-w-sm">
        <div className="absolute -inset-1.5 bg-cozy-pink/40 rounded-full blur-md opacity-75"></div>
        <img
          src={imageSrc}
          alt="Sleepy hugging Cat"
          referrerPolicy="no-referrer"
          className="relative w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-white shadow-sm object-cover"
        />
        {/* Sleeping floating Zzz particles */}
        <span className="absolute top-4 right-1 text-xs font-bold text-cozy-brown/40 font-display animate-pulse select-none">Zzz..</span>
        <span className="absolute top-2 right-6 text-[10px] font-bold text-cozy-brown/30 font-display animate-pulse delay-75 select-none">z</span>
      </div>

      {/* Handwritten apology message card */}
      <div className="relative w-full max-w-md bg-white border border-cozy-pink/30 rounded-3xl shadow-sm px-6 py-7 text-left space-y-4 my-2">
        {/* Soft custom lining decoration to look like cute writing paper */}
        <div className="absolute top-4 right-4 text-cozy-accent/30">
          <Heart className="w-6 h-6 fill-current" />
        </div>

        <div className="space-y-3.5 font-sans text-cozy-brown text-[14px] md:text-[15px] leading-relaxed font-medium">
          <p className="font-display text-[15px] font-bold tracking-wide text-cozy-brown/95">
            Hey billoti <span className="text-cozy-accent">🐾</span>
          </p>

          <p>
            I just wanted to say something small.
          </p>

          <p>
            I think I understand things a little better now.
          </p>

          <p>
            Maybe I got too lost in my own feelings and confusion and didn’t fully understand how difficult things may have been for you too.
          </p>

          <p>
            I’m genuinely sorry if I ever made things feel heavy, overwhelming, or pressured. That was never my intention.
          </p>

          <p>
            I really appreciate the good memories, laughs, games, silly moments, and comfort we shared <span className="inline-block animate-pulse text-[15px]">🐱</span>
          </p>

          <p>
            I care about you and respect your feelings.
          </p>

          <p className="font-semibold text-cozy-brown/95 italic bg-cozy-beige/40 p-2.5 rounded-xl border border-cozy-pink/20">
            No pressure, no expectations — just a tiny honest sorry from someone who cares 🐾
          </p>
        </div>
      </div>

      {/* Transition to final screen */}
      <div className="w-full max-w-[280px] mt-6">
        <motion.button
          onClick={handleContinue}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full py-4 px-6 bg-cozy-accent hover:bg-cozy-accent/95 text-white font-bold rounded-2xl shadow hover:shadow-md transition-all duration-300 font-display flex items-center justify-center gap-2 cursor-pointer border-b-4 border-red-300/40"
        >
          <span>next 🥺🐾</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
        <span className="block mt-2 text-[10px] text-cozy-brown/30 font-semibold uppercase tracking-widest leading-none select-none">
          Step 3 of 4
        </span>
      </div>
    </motion.div>
  );
}
