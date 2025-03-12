"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Wallet, Copy } from "lucide-react"
import ParticleBackground from "./ParticleBackground"
import { usePrivy, useUser } from "@privy-io/react-auth"
import { useRouter } from "next/navigation"
import { useMintNFT } from "@/hooks/useMintNFT";

export default function MinterPage() {
  const [mounted, setMounted] = useState(false)
  const { authenticated, logout } = usePrivy()
  const router = useRouter()
  const [nftImage, setNftImage] = useState<string | null>(null)
  const {user} = useUser();
  const [copied, setCopied] = useState(false)
  const { mintNFT, minting } = useMintNFT();

  useEffect(() => {
    setMounted(true)
    if (!authenticated) {
      router.push("/")
    }
  }, [authenticated, router])

  useEffect(() => {
    const contractAddress = process.env.NEXT_PUBLIC_SONEIUM_CONTRACT_ADDRESS || "";
    const fetchNFT = async () => {
      try {
        const options = {
          method: "GET",
          headers: { accept: "application/json", "x-api-key": process.env.NEXT_PUBLIC_OPENSEA_API_KEY || ""},
        }

        const response = await fetch(
          `https://testnets-api.opensea.io/api/v2/chain/soneium_minato/contract/${contractAddress}/nfts/1`,
          options
        )
        const data = await response.json()
        setNftImage(data.nft.display_image_url || data.nft.image_url)
      } catch (error) {
        console.error("Error fetching NFT:", error)
      }
    }

    fetchNFT()
  }, [])

  if (!mounted || !authenticated) return null

  const copyToClipboard = () => {
    if (user?.wallet?.address) {
      navigator.clipboard.writeText(user.wallet.address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }
  
  const handleMint = async () => {
    try {
      const success = await mintNFT();
      if (success) {
        router.push("/congratulations");
      }
    } catch (error) {
      console.error("Error al mintear NFT:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white overflow-hidden">
      <ParticleBackground />

      <div className="container px-4 mx-auto z-10 flex flex-col items-center justify-center space-y-12 py-8">
        <div className="w-full flex justify-between items-center mb-8">
          <img
            src={"https://i.pravatar.cc/150"}
            alt="User Avatar"
            className="w-12 h-12 rounded-full"
          />
          <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 rounded-full">
            <Wallet size={20} />
            <span>
              {user?.wallet?.address
                ? `${user.wallet.address.slice(0, 6)}...${user.wallet.address.slice(-4)}`
                : "No wallet connected"}
            </span>
            {user?.wallet?.address && (
              <button onClick={copyToClipboard} className="text-white hover:text-gray-300">
                <Copy size={18} />
              </button>
            )}
            {copied && <span className="text-green-400 text-sm">¡Copiado!</span>}
          </div>
        </div>

        <motion.h1
          className="text-3xl md:text-5xl font-bold text-center leading-tight"
          style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          ¡Te ganaste un NFT por participar en el meetup!
        </motion.h1>
        <motion.p
          className="text-1xl md:text-2xl font-extralight text-center leading-tight"
          style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Gracias por haber participado en el meetup de Astar Network & Soneium en Bogotá 🇨🇴. ¡Reclama tu NFT aquí! 👇🏼
        </motion.p>

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
          onClick={handleMint}
          disabled={minting}
        >
          {minting ? "Minteando..." : "¡Obtén tu NFT aquí!"}
        </motion.button>

        <button onClick={logout} className="mt-4 text-lg font-bold text-gray-400 hover:text-white">
          Cerrar sesión
        </button>
      </div>
    </div>
  )
}