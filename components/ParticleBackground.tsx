"use client"

import { motion } from "framer-motion"

export default function ParticleBackground() {
  const particles = Array.from({ length: 100 }).map((_, i) => (
    <motion.div
      key={i}
      className="absolute rounded-full bg-white opacity-20"
      style={{
        width: Math.random() * 10 + 2 + "px",
        height: Math.random() * 10 + 2 + "px",
        left: Math.random() * 100 + "%",
        top: Math.random() * 100 + "%",
      }}
      animate={{
        y: [0, -Math.random() * 100 - 50],
        x: [0, (Math.random() - 0.5) * 50],
        opacity: [0.5, 0.2],
      }}
      transition={{
        duration: Math.random() * 5 + 5,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      }}
    />
  ))

  return <div className="absolute inset-0 overflow-hidden">{particles}</div>
}