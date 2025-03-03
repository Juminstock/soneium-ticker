"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Sparkles, Wallet } from "lucide-react"
import ParticleBackground from "./ParticleBackground"
import { usePrivy } from "@privy-io/react-auth"
import { useRouter } from "next/navigation"

export default function MinterPage() {
  const [mounted, setMounted] = useState(false)
  const { user, authenticated, logout } = usePrivy()
  const router = useRouter()
  const [minting, setMinting] = useState(false)
  const [nftImage, setNftImage] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
    if (!authenticated) {
      router.push("/")
    }
  }, [authenticated, router])

  useEffect(() => {
    const fetchNFT = async () => {
      try {
        const options = {
          method: "GET",
          headers: { accept: "application/json", "x-api-key": "e05c9e3b321b4102b059229efa050bc5" },
        }

        const response = await fetch(
          "https://testnets-api.opensea.io/api/v2/chain/amoy/contract/0x37c0d841e4559ee0408b7decdf928c2f797af48b/nfts/164",
          options
        )
        const data = await response.json()
        setNftImage(data.nft.display_image_url || data.nft.image_url) // Usa la imagen disponible
      } catch (error) {
        console.error("Error fetching NFT:", error)
      }
    }

    fetchNFT()
  }, [])

  if (!mounted || !authenticated) return null

  const mintNFT = async () => {
    setMinting(true)
    try {
      router.push("/congratulations")
    } catch (error) {
      console.error("Error minting NFT:", error)
      alert("Error al mintear el NFT, intenta de nuevo.")
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
          ¡Obtén tu NFT aquí!
        </motion.h1>

        {/* Contenedor de la imagen del NFT */}
        <motion.div
          className="w-full max-w-md aspect-square rounded-2xl overflow-hidden relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          whileHover={{ scale: 1.02 }}
        >
          {nftImage ? (
            <img src={nftImage} alt="NFT" className="w-full h-full object-cover rounded-2xl" />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-400 opacity-80 rounded-2xl"></div>
          )}
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
