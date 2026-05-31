import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';
import { playCuteMeow, playPurr } from '../utils/audio';

interface WaveSparkle {
  id: number;
  x: number; // percentage from left
  y: number; // starting position
  emoji: string;
  angle: number;
  scale: number;
}

interface FinalScreenProps {
  imageSrc: string;
  key?: React.Key;
}

export default function FinalScreen({ imageSrc }: FinalScreenProps) {
  const [isWaving, setIsWaving] = useState(false);
  const [sparkles, setSparkles] = useState<WaveSparkle[]>([]);
  const [hasWaved, setHasWaved] = useState(false);

  const handleWave = () => {
    setIsWaving(true);
    setHasWaved(true);
    playCuteMeow();
    playPurr();

    // Spawn a flurry of 18 floating emoji paw/heart particles
    const emojis = ['🐾', '🐱', '💖', '✨', '🐾', '🌸', '🧸'];
    const newSparkles = Array.from({ length: 18 }).map((_, i) => ({
      id: Date.now() + i,
      x: 10 + Math.random() * 80, // spread across width
      y: 100, // floor
      emoji: emojis[i % emojis.length],
      angle: (Math.random() - 0.5) * 40,
      scale: 0.8 + Math.random() * 1.0,
    }));

    setSparkles((prev) => [...prev, ...newSparkles]);

    // Reset wave animation motion state after custom time
    setTimeout(() => {
      setIsWaving(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-[580px] p-6 text-center w-full relative">
      {/* Container for emoji flurry */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        <AnimatePresence>
          {sparkles.map((s) => (
            <motion.div
              key={s.id}
              initial={{ y: '100%', x: `${s.x}%`, opacity: 1, scale: s.scale }}
              animate={{
                y: '-20%',
                x: `${s.x + s.angle}%`,
                rotate: s.angle * 4,
                opacity: [1, 1, 0.8, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.2 + Math.random() * 1.5, ease: 'easeOut' }}
              className="absolute text-3xl select-none"
            >
              {s.emoji}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Header Banner */}
      <div className="flex items-center gap-1.5 text-cozy-brown/65 text-xs font-bold uppercase tracking-widest bg-cozy-pink px-4 py-1.5 rounded-full mb-1 select-none">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Farewell 🐾</span>
      </div>

      {/* Sleepy / Waving Cat illustration with animation triggers */}
      <div className="relative my-6 max-w-sm">
        <div className="absolute -inset-2 bg-gradient-to-br from-cozy-pink/40 to-cozy-lavender rounded-full blur-xl opacity-75"></div>
        <motion.img
          src={imageSrc}
          alt="Tiny Waving Cat"
          referrerPolicy="no-referrer"
          animate={
            isWaving
              ? {
                  rotate: [0, -12, 12, -12, 12, 0],
                  scale: [1, 1.05, 1, 1.05, 1],
                  y: [0, -10, 0, -10, 0],
                }
              : { rotate: 0 }
          }
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="relative w-56 h-56 md:w-64 md:h-64 rounded-full border-4 border-white shadow-lg object-cover"
        />

        {/* Dynamic Bubble text */}
        <AnimatePresence>
          {isWaving && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute -top-4 -right-1 bg-white px-3.5 py-1.5 rounded-2xl shadow-md text-xs font-bold text-cozy-brown border border-cozy-pink/50 font-display select-none"
            >
              meow wave! 👋🐾
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Title & Subtext */}
      <div className="space-y-3.5 max-w-sm px-4">
        <h3 className="text-xl md:text-2xl font-bold font-display text-cozy-brown leading-snug">
          Sending one tiny respectful apology meow 🐱
        </h3>
        <p className="text-sm text-cozy-brown/80 font-semibold italic">
          Wishing softer days ahead 🐾
        </p>
      </div>

      {/* Wave goodbye button */}
      <div className="w-full max-w-[280px] mt-8 mb-4">
        <motion.button
          onClick={handleWave}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-4 px-6 bg-cozy-accent hover:bg-cozy-accent/95 text-white font-bold rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 font-display flex items-center justify-center gap-2 cursor-pointer border-b-4 border-red-300/40 relative overflow-hidden"
        >
          {isWaving && (
            <span className="absolute inset-0 bg-white/20 animate-ping rounded-2xl pointer-events-none" />
          )}
          <span>tiny cat wave goodbye 👋🐱</span>
        </motion.button>
        <p className="block mt-2.5 text-[10px] text-cozy-brown/35 font-semibold tracking-widest uppercase leading-none font-sans select-none">
          {hasWaved ? 'Thank you so much ♥' : 'tap to wave back!'}
        </p>
      </div>

      <span className="block text-[10px] text-cozy-brown/30 font-semibold uppercase tracking-widest leading-none">
        Step 4 of 4
      </span>
    </div>
  );
}
