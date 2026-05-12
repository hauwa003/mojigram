"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const COLORS = ["#8B5CF6", "#F472B6", "#FBBF24", "#34D399", "#60A5FA", "#FB923C"];
const PARTICLE_COUNT = 40;

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

interface Particle {
  id: number;
  x: number;
  color: string;
  size: number;
  rotation: number;
}

function generateParticles(): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    x: randomBetween(-40, 40),
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    size: randomBetween(6, 12),
    rotation: randomBetween(-180, 180),
  }));
}

function ConfettiOverlayComponent({ particles }: { particles: Particle[] }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-sm"
            style={{
              width: p.size,
              height: p.size * 0.6,
              backgroundColor: p.color,
              left: "50%",
              top: "40%",
            }}
            initial={{
              x: 0,
              y: 0,
              rotate: 0,
              scale: 1,
              opacity: 1,
            }}
            animate={{
              x: [0, p.x * 4, p.x * 8],
              y: [0, randomBetween(-200, -100), randomBetween(300, 500)],
              rotate: [0, p.rotation, p.rotation * 2],
              scale: [1, 1.2, 0.5],
              opacity: [1, 1, 0],
            }}
            transition={{
              duration: 2,
              ease: "easeOut",
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

export function useConfetti() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [trigger, setTrigger] = useState(0);

  const fire = useCallback(() => {
    setParticles(generateParticles());
    setTrigger((t) => t + 1);
    // Auto-cleanup
    setTimeout(() => setParticles([]), 2200);
  }, []);

  const ConfettiOverlay = particles.length > 0
    ? () => <ConfettiOverlayComponent key={trigger} particles={particles} />
    : () => null;

  return { fire, ConfettiOverlay };
}
