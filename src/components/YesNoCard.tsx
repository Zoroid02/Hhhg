import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, Sparkles, AlertCircle } from 'lucide-react';
import { playCuteMeow, playPurr, playSweetChime } from '../utils/audio';

interface YesNoCardProps {
  onYes: () => void;
  imageSrc: string;
  key?: React.Key;
}

export default function YesNoCard({ onYes, imageSrc }: YesNoCardProps) {
  const [showNoResponse, setShowNoResponse] = useState(false);

  const handleYes = () => {
    playSweetChime();
    onYes();
  };

  const handleNo = () => {
    playCuteMeow();
    setShowNoResponse(true);
  };

  return (
    <div className="min-h-[580px] p-6 flex flex-col items-center justify-between text-center w-full">
      <AnimatePresence mode="wait">
        {!showNoResponse ? (
          <motion.div
            key="ask-question"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-between h-full w-full flex-1"
          >
            {/* Header banner */}
            <div className="flex items-center gap-1.5 text-cozy-brown/65 text-xs font-bold uppercase tracking-widest bg-cozy-pink px-4 py-1.5 rounded-full select-none">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Permission 🐾</span>
            </div>

            {/* Playful Cat Image */}
            <div className="relative my-6 animate-cozy-float max-w-sm">
              <div className="absolute -inset-1.5 bg-gradient-to-br from-cozy-accent-soft to-cozy-pink/50 rounded-full blur-md opacity-80"></div>
              <img
                src={imageSrc}
                alt="Playful asking Cat"
                referrerPolicy="no-referrer"
                className="relative w-52 h-52 md:w-60 md:h-60 rounded-full border-4 border-white shadow-md object-cover"
              />
            </div>

            {/* Question */}
            <div className="space-y-3.5 max-w-sm my-2">
              <h3 className="text-2xl font-bold font-display text-cozy-brown leading-tight px-4">
                Can this tiny cat say sorry? 🥺🐱
              </h3>
              <p className="text-xs md:text-sm text-cozy-brown/70 font-semibold px-4 tracking-wide font-sans">
                (There is no wrong answer, just choose whatever feels comfortable)
              </p>
            </div>

            {/* Yes / No buttons */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-[290px] mt-8 mb-4">
              {/* YES BUTTON */}
              <motion.button
                onClick={handleYes}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="py-4 bg-cozy-accent text-white font-bold rounded-2xl shadow hover:shadow-md border-b-4 border-red-300 text-[15px] font-display flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Yes 🐾</span>
              </motion.button>

              {/* NO BUTTON */}
              <motion.button
                onClick={handleNo}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="py-4 bg-cozy-lavender hover:bg-cozy-lavender/90 text-cozy-brown font-bold rounded-2xl shadow border-b-4 border-slate-300/60 text-[15px] font-display flex items-center justify-center gap-1.5 cursor-pointer border border-cozy-brown/10"
              >
                <span>No 🙈</span>
              </motion.button>
            </div>
            <span className="block text-[10px] text-cozy-brown/30 font-semibold uppercase tracking-widest leading-none mt-2">
              Step 2 of 4
            </span>
          </motion.div>
        ) : (
          <motion.div
            key="no-response"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-between h-full w-full flex-1"
          >
            {/* Header banner */}
            <div className="flex items-center gap-1.5 text-cozy-brown/55 text-xs font-bold uppercase tracking-widest bg-cozy-lavender px-4 py-1.5 rounded-full select-none">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>We understand</span>
            </div>

            {/* Centered Gentle Animation Decoration */}
            <div className="my-8 relative">
              <div className="absolute -inset-4 bg-cozy-pink/30 rounded-full blur-xl animate-pulse"></div>
              {/* Cute heart-shaped or layout elements */}
              <div className="relative text-7xl select-none animate-bounce">
                💝
              </div>
            </div>

            {/* Soft respectful text */}
            <div className="space-y-4 max-w-sm px-4">
              <h3 className="text-xl md:text-2xl font-bold font-display text-cozy-brown leading-relaxed">
                Awww okay 🐱
              </h3>
              <p className="text-base text-cozy-brown/85 font-medium leading-relaxed font-sans">
                Tiny cat still wanted to leave a tiny honest message anyway 🐾
              </p>
            </div>

            {/* Respectful follow up transition button */}
            <div className="w-full max-w-[280px] mt-8 mb-4">
              <motion.button
                onClick={handleYes}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-4 px-6 bg-cozy-brown hover:bg-cozy-brown/95 text-white font-bold rounded-2xl shadow hover:shadow-md transition-all duration-300 font-display flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>read the message ♥</span>
              </motion.button>
              <p className="block mt-2.5 text-[10px] text-cozy-brown/40 font-semibold tracking-wider leading-none font-sans">
                no pressure, no expectations
              </p>
            </div>
            <span className="block text-[10px] text-cozy-brown/30 font-semibold uppercase tracking-widest leading-none">
              Step 2 of 4 (Graceful path)
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
