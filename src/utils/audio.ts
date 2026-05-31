/**
 * Synthesizer for cozy sound effects using Web Audio API
 */

let audioCtx: AudioContext | null = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  // Resume context if suspended
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playCuteMeow() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // A meow consists of two oscillators or a pitch sweeping oscillator
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'triangle';
    
    // Meow start pitch is high, sweeps down then up slightly or stays gentle
    osc.frequency.setValueAtTime(380, now);
    osc.frequency.exponentialRampToValueAtTime(460, now + 0.08);
    osc.frequency.exponentialRampToValueAtTime(410, now + 0.35);

    // Filter to make it sound fuzzy and soft
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, now);
    filter.frequency.exponentialRampToValueAtTime(100, now + 0.35);

    // Envelope for meow volume
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.2, now + 0.05); // quick fade in
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.35); // fade out

    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.4);
  } catch (e) {
    console.debug('Web Audio meow bypassed:', e);
  }
}

export function playMuffledMew() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    // Soft sine wave for a clean, pure, gentle sound
    osc.type = 'sine';
    
    // Slightly lower pitch sweep for a baby/muffled feel
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(390, now + 0.12);
    osc.frequency.exponentialRampToValueAtTime(340, now + 0.38);

    // Lower cutoff lowpass filter to make it sound muffled/cozy
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(500, now);
    filter.frequency.exponentialRampToValueAtTime(80, now + 0.38);

    // Very gentle and low volume envelope
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.08, now + 0.06); // very soft lift
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.4);
  } catch (e) {
    console.debug('Web Audio muffled mew bypassed:', e);
  }
}

export function playSweetChime() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Cozy sparkling triple chime
    const playTone = (freq: number, delay: number, dur: number) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + delay);

      gainNode.gain.setValueAtTime(0, now + delay);
      gainNode.gain.linearRampToValueAtTime(0.12, now + delay + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + delay + dur);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(now + delay);
      osc.stop(now + delay + dur);
    };

    playTone(523.25, 0, 0.4);    // C5
    playTone(659.25, 0.08, 0.4); // E5
    playTone(783.99, 0.16, 0.5); // G5
  } catch (e) {
    console.debug('Web Audio chime bypassed:', e);
  }
}

export function playPurr() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Purring is a low frequency amplitude-modulated signal
    const osc = ctx.createOscillator();
    const lfo = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const lfoGain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(45, now);

    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(25, now); // modulation rate

    // Use LFO to modulate amplitude
    lfoGain.gain.setValueAtTime(0.05, now);

    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.1, now + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

    // Lowpass filter to make it soft and rumble-like
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(140, now);

    osc.connect(filter);
    filter.connect(gainNode);
    
    // Connect LFO modulation
    lfo.connect(lfoGain);
    lfoGain.connect(gainNode.gain);

    gainNode.connect(ctx.destination);

    osc.start(now);
    lfo.start(now);
    osc.stop(now + 0.8);
    lfo.stop(now + 0.8);
  } catch (e) {
    console.debug('Web Audio purr bypassed:', e);
  }
}
