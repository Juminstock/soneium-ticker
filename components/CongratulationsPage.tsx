"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import ParticleBackground from "./ParticleBackground"
import { usePrivy } from "@privy-io/react-auth"
import { useRouter } from "next/navigation"

export default function CongratulationsPage() {
  const [mounted, setMounted] = useState(false)
  const { authenticated } = usePrivy()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    if (!authenticated) {
      router.push("/")
    }
  }, [authenticated, router])

  if (!mounted || !authenticated) return null

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white overflow-hidden">
      <ParticleBackground />

      <div className="container px-4 mx-auto z-10 flex flex-col items-center justify-center space-y-12 py-8">
        <motion.h1
          className="text-3xl md:text-5xl font-bold text-center leading-tight"
          style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Congratulations! You have minted your NFT!
        </motion.h1>

        {/* NFT Display - Replace with actual NFT image */}
        <div className="w-64 h-64 bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-400 rounded-lg shadow-lg"></div>

        <motion.a
          href="https://opensea.io" // Replace with actual OpenSea link
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-lg font-bold shadow-lg"
          style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View in OpenSea
        </motion.a>
      </div>
    </div>
  )
}

