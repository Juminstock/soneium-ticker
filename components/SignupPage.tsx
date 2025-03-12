"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import ParticleBackground from "./ParticleBackground"
import { usePrivy } from "@privy-io/react-auth"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  const [mounted, setMounted] = useState(false)
  const { login, authenticated, ready } = usePrivy()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (authenticated) {
      router.push("/minter")
    }
  }, [authenticated, router])

  if (!mounted || !ready) return null

  const handleLogin = async () => {
    setLoading(true)
    try {
      await login()
    } catch (error) {
      console.error("Error en la autenticación:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white overflow-hidden">
      <ParticleBackground />

      <div className="container px-4 mx-auto z-10 flex flex-col items-center justify-center space-y-12 py-8">
        <motion.h1
          className="text-3xl md:text-5xl font-bold text-center leading-tight"
          style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Astar Network & Soneium en Mind Caffe, Bogotá 🇨🇴
        </motion.h1>

        <motion.div
          className="w-full max-w-md aspect-square rounded-2xl overflow-hidden relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-400 opacity-80 rounded-2xl"></div>
          <div className="absolute inset-0 flex items-center justify-center text-white text-lg font-medium">
            <div className="p-4 text-center">
              <Sparkles className="w-12 h-12 mx-auto mb-4 animate-pulse" />
              <p>Tu NFT se verá aquí cuando te registres</p>
            </div>
          </div>
          <div className="absolute inset-0 shadow-[0_0_15px_5px_rgba(124,58,237,0.5)] rounded-2xl"></div>
        </motion.div>

        <motion.button
          className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-lg font-bold shadow-lg"
          style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogin}
          disabled={loading}
        >
          ¡Regístrate ahora!
        </motion.button>
      </div>
    </div>
  )
}
