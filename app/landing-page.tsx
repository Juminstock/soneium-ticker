"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

export default function LandingPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <ParticleBackground />
      </div>

      <div className="container px-4 mx-auto z-10 flex flex-col items-center justify-center space-y-12 py-8">
        {/* Title with animation */}
        <motion.h1
          className="text-3xl md:text-5xl font-bold text-center leading-tight"
          style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Astar Network and Soneium in Latin America
        </motion.h1>

        {/* Image container with 3D effect */}
        <motion.div
          className="w-full max-w-md aspect-square rounded-2xl overflow-hidden relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-400 opacity-80 rounded-2xl"></div>
          <div className="absolute inset-0 flex items-center justify-center text-white text-lg font-medium">
            {/* Placeholder for image */}
            <div className="p-4 text-center">
              <Sparkles className="w-12 h-12 mx-auto mb-4 animate-pulse" />
              <p>Image will be placed here</p>
            </div>
          </div>
          <div className="absolute inset-0 shadow-[0_0_15px_5px_rgba(124,58,237,0.5)] rounded-2xl"></div>
        </motion.div>

        {/* Button with animation */}
        <motion.button
          className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-lg font-bold shadow-lg"
          style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get your NFT soon!
        </motion.button>
      </div>
    </div>
  )
}

// Animated particle background component
function ParticleBackground() {
  const particles = Array.from({ length: 20 }).map((_, i) => (
    <motion.div
      key={i}
      className="absolute rounded-full bg-white opacity-20"
      style={{
        width: Math.random() * 6 + 2 + "px",
        height: Math.random() * 6 + 2 + "px",
        left: Math.random() * 100 + "%",
        top: Math.random() * 100 + "%",
      }}
      animate={{
        y: [0, -Math.random() * 100 - 50],
        x: [0, (Math.random() - 0.5) * 50],
        opacity: [0.2, 0],
      }}
      transition={{
        duration: Math.random() * 5 + 5,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      }}
    />
  ))

  return <>{particles}</>
}

