import React, { useEffect, useState } from 'react';

interface PawParticle {
  id: number;
  x: number;
  y: number;
  scale: number;
  angle: number;
  speedY: number;
  opacity: number;
}

export default function FloatingPaws() {
  const [particles, setParticles] = useState<PawParticle[]>([]);

  // Periodically add standard floating paws
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) => {
        const newParticle: PawParticle = {
          id: Date.now() + Math.random(),
          x: Math.random() * 100, // percentage from left
          y: 110, // starts below screen
          scale: 0.5 + Math.random() * 0.8,
          angle: (Math.random() - 0.5) * 45,
          speedY: 0.5 + Math.random() * 1.5,
          opacity: 0.15 + Math.random() * 0.25,
        };
        // Cap the count to prevent performance issues
        return [...prev.slice(-30), newParticle];
      });
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  // Update particles on animation frame
  useEffect(() => {
    let animationId: number;
    const update = () => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            y: p.y - p.speedY * 0.2,
            angle: p.angle + 0.1 * (p.id % 2 === 0 ? 1 : -1),
          }))
          .filter((p) => p.y > -20)
      );
      animationId = requestAnimationFrame(update);
    };
    animationId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Simple clean local SVG for cute Paw Print
  const PawSvg = ({ className, size = 24 }: { className?: string; size?: number }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      {/* Pad */}
      <ellipse cx="12" cy="14" rx="4.5" ry="3.5" />
      {/* 4 small toes */}
      <circle cx="6.5" cy="8.5" r="1.8" />
      <circle cx="10" cy="6.5" r="2" />
      <circle cx="14" cy="6.5" r="2" />
      <circle cx="17.5" cy="8.5" r="1.8" />
    </svg>
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute text-cozy-accent/30 transition-transform duration-75"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            transform: `translate(-50%, -50%) scale(${p.scale}) rotate(${p.angle}deg)`,
            opacity: p.opacity,
          }}
        >
          <PawSvg size={28} />
        </div>
      ))}
    </div>
  );
}
