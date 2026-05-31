import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';
import { playCuteMeow, playPurr, playMuffledMew } from '../utils/audio';

interface LandingHeroProps {
  onStart: () => void;
  imageSrc: string;
  key?: React.Key;
}

interface PetParticle {
  id: number;
  x: number;
  y: number;
  text: string;
}

export default function LandingHero({ onStart, imageSrc }: LandingHeroProps) {
  const [isPurring, setIsPurring] = useState(false);
  const [particles, setParticles] = useState<PetParticle[]>([]);
  const [purrCount, setPurrCount] = useState(0);

  const handleStartClick = () => {
    playCuteMeow();
    onStart();
  };

  const handlePetCat = (e: React.MouseEvent<HTMLDivElement>) => {
    playPurr();
    setIsPurring(true);
    setPurrCount((c) => c + 1);

    // Spawn a cute heart, paw, or sparkle particle relative to click or above the image
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const emojiSelections = ['❤️', '💖', '🐾', '✨', '🌸', '🎶', '🎀'];
    const randomEmoji = emojiSelections[Math.floor(Math.random() * emojiSelections.length)];

    const newParticle: PetParticle = {
      id: Date.now() + Math.random(),
      // Use the clicked location or fall back to center-top
      x: clickX,
      y: clickY - 20,
      text: randomEmoji,
    };

    setParticles((prev) => [...prev, newParticle].slice(-15));

    // Reset status back to idle breathing after animation selesai
    setTimeout(() => {
      setIsPurring(false);
    }, 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="flex flex-col items-center justify-between min-h-[580px] p-6 text-center"
    >
      {/* Decorative Top Sparkles */}
      <div className="flex items-center gap-1.5 text-cozy-accent font-semibold px-4 py-1.5 bg-cozy-pink/80 rounded-full border border-cozy-accent/20 animate-pulse text-xs tracking-wider uppercase font-display select-none">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Meow Message incoming</span>
        <Sparkles className="w-3.5 h-3.5" />
      </div>

      {/* Hero Image Container (Now Interactive) */}
      <div className="relative my-6 flex flex-col items-center">
        {/* Particle Container overlay */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-25">
          <AnimatePresence>
            {particles.map((p) => (
              <motion.span
                key={p.id}
                initial={{ opacity: 1, y: p.y, x: p.x, scale: 0.8 }}
                animate={{
                  opacity: 0,
                  y: p.y - 80 - Math.random() * 50,
                  x: p.x + (Math.random() - 0.5) * 60,
                  scale: [1, 1.4, 0.9],
                  rotate: (Math.random() - 0.5) * 60,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="absolute text-2xl select-none"
              >
                {p.text}
              </motion.span>
            ))}
          </AnimatePresence>
        </div>

        {/* Outer glowing backdrops */}
        <div className={`absolute -inset-2 bg-gradient-to-tr from-cozy-accent-soft to-cozy-pink/40 rounded-full blur-xl transition-all duration-700 ${isPurring ? 'opacity-100 scale-110' : 'opacity-75 group-hover:opacity-90'}`}></div>
        
        {/* Tap/Click area covering the whole cat */}
        <motion.div
          onClick={handlePetCat}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          animate={
            isPurring
              ? {
                  scale: [1, 1.06, 0.96, 1.03, 1],
                  rotate: [0, -2, 2, -2, 0],
                }
              : {
                  scale: 1,
                  y: [0, -6, 0],
                }
          }
          transition={
            isPurring
              ? { duration: 0.8, ease: 'easeInOut' }
              : { repeat: Infinity, duration: 4, ease: 'easeInOut' }
          }
          className="relative cursor-pointer group"
          title="Click to pet me! ♥"
        >
          <img
            src={imageSrc}
            alt="Tiny Meow Hero Cat"
            referrerPolicy="no-referrer"
            className={`relative w-56 h-56 md:w-64 md:h-64 rounded-full border-4 ${isPurring ? 'border-cozy-accent' : 'border-white'} shadow-lg object-cover transition-colors duration-300`}
          />
          {/* Floating Heart Icon badge */}
          <div className="absolute -bottom-1 -right-1 bg-white p-2.5 rounded-full shadow-md text-cozy-accent border border-cozy-pink group-hover:bg-cozy-pink transition-colors">
            <Heart className={`w-5 h-5 ${isPurring ? 'fill-current scale-125' : ''} transition-transform`} />
          </div>

          {/* Interactive instruction bubble popping in */}
          <div className="absolute -top-3 -left-3 bg-white/90 border border-cozy-pink px-2.5 py-1 rounded-full shadow-xs text-[10px] font-bold text-cozy-brown select-none font-display">
            {isPurring ? 'purrrrr~ 💕' : 'pet me! 👇🐱'}
          </div>
        </motion.div>

        {/* PURRING STATUS TEXT DESCRIPTOR */}
        <AnimatePresence>
          {isPurring ? (
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-3 text-xs font-bold text-cozy-accent font-display select-none"
            >
              *Happy cozy purring noises* 🐾
            </motion.p>
          ) : purrCount > 0 ? (
            <p className="mt-3 text-[11px] text-cozy-brown/50 font-bold select-none">
              Petted {purrCount} {purrCount === 1 ? 'time' : 'times'} ♥
            </p>
          ) : (
            <p className="mt-3 text-[11px] text-cozy-brown/40 font-semibold select-none">
              hover/tap kitty to say hello
            </p>
          )}
        </AnimatePresence>
      </div>

      {/* Title & Subtitle */}
      <div className="space-y-3.5 max-w-sm">
        <h1 className="text-3xl md:text-4xl font-black text-cozy-brown font-display tracking-tight leading-tight">
          Tiny Meow Sorry <span className="inline-block animate-bounce">🐾</span>
        </h1>
        <p className="text-[15px] text-cozy-brown/85 font-medium leading-relaxed px-4">
          A tiny soft message from someone who cares
        </p>
      </div>

      {/* Interactive CTA buttons & Soft Baby Mew helper */}
      <div className="w-full max-w-[280px] mt-6 flex flex-col gap-2">
        <motion.button
          onClick={handleStartClick}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="w-full py-4 px-6 bg-cozy-accent hover:bg-cozy-accent/95 text-white font-bold rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 font-display flex items-center justify-center gap-2 cursor-pointer border-b-4 border-red-300/40"
        >
          <span>start tiny meow 🐱</span>
        </motion.button>
        
        {/* Soft, muffled 'mew' sound effect helper requested by user */}
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            playMuffledMew();
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-xs text-cozy-brown/75 hover:text-cozy-accent bg-white/70 border border-cozy-accent/10 px-3 py-1.5 rounded-full flex items-center justify-center gap-1.5 shadow-xs mx-auto font-medium transition-all cursor-pointer hover:shadow-sm"
          title="Play a soft, muffled sound effect"
        >
          <span>🥺🔊</span>
          <span>soft baby mew</span>
        </motion.button>
        
        <span className="block mt-1 text-[10px] text-cozy-brown/30 font-semibold uppercase tracking-widest leading-none font-sans select-none">
          tap screen assets for sounds
        </span>
      </div>
    </motion.div>
  );
}
