"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Sparkles, Wallet } from "lucide-react"
import ParticleBackground from "./ParticleBackground"
import { usePrivy } from "@privy-io/react-auth"
import { useRouter } from "next/navigation"
import { Alchemy, Network } from "alchemy-sdk"

// Initialize Alchemy SDK
const alchemy = new Alchemy({
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  network: Network.ETH_GOERLI, // Use the appropriate network
})

export default function MinterPage() {
  const [mounted, setMounted] = useState(false)
  const { user, authenticated, logout } = usePrivy()
  const router = useRouter()
  const [minting, setMinting] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (!authenticated) {
      router.push("/")
    }
  }, [authenticated, router])

  if (!mounted || !authenticated) return null

  const mintNFT = async () => {
    setMinting(true)
    try {
      // This is a placeholder for the actual minting process
      // You would need to implement the actual NFT minting logic here
      // using OpenSea API or your own smart contract

      // For demonstration, we'll just wait for 2 seconds
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // After minting, redirect to congratulations page
      router.push("/congratulations")
    } catch (error) {
      console.error("Error minting NFT:", error)
      alert("Failed to mint NFT. Please try again.")
    } finally {
      setMinting(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white overflow-hidden">
      <ParticleBackground />

      <div className="container px-4 mx-auto z-10 flex flex-col items-center justify-center space-y-12 py-8">
        <div className="w-full flex justify-between items-center mb-8">
          <img
            src={user?.avatarUrl || "/placeholder-avatar.png"}
            alt="User Avatar"
            className="w-12 h-12 rounded-full"
          />
          <div className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-full">
            <Wallet size={20} />
            <span>
              {user?.wallet?.address
                ? `${user.wallet.address.slice(0, 6)}...${user.wallet.address.slice(-4)}`
                : "No wallet connected"}
            </span>
          </div>
        </div>

        <motion.h1
          className="text-3xl md:text-5xl font-bold text-center leading-tight"
          style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Mint Your NFT
        </motion.h1>

        <motion.div
          className="w-full max-w-md aspect-square rounded-2xl overflow-hidden relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-400 opacity-80 rounded-2xl"></div>
          <div className="absolute inset-0 flex items-center justify-center text-white text-lg font-medium">
            <div className="p-4 text-center">
              <Sparkles className="w-12 h-12 mx-auto mb-4 animate-pulse" />
              <p>NFT Preview</p>
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
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={mintNFT}
          disabled={minting}
        >
          {minting ? "Minting..." : "Mint NFT"}
        </motion.button>

        <button onClick={logout} className="mt-4 text-sm text-gray-400 hover:text-white">
          Logout
        </button>
      </div>
    </div>
  )
}

