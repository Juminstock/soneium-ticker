import { useState } from "react";
import { useWallets } from "@privy-io/react-auth";

export function useMintNFT() {
    const { wallets } = useWallets();
    const [minting, setMinting] = useState(false);
    const [txHash, setTxHash] = useState<string | null>(null);
    
    const mintNFT = async () => {
        if (!wallets.length) {
            alert("❌ No se encontró una wallet conectada.");
            return;
        }
        
        setTxHash(null);
        
        try {
            setMinting(true);
            const userWallet = wallets[0];
            const userAddress = userWallet.address;
            
            console.log("👤 ¡Usuario conectado!:", userAddress);
            
            const response = await fetch("/api/mint", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userAddress })
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || "Error desconocido");
            }
            
            console.log("📨 Transacción enviada:", data.txHash);
            setTxHash(data.txHash);
            
            alert(`✅ ¡NFT minteado exitosamente! 🔗 Observa aquí la transacción → https://soneium-minato.blockscout.com/tx/${data.txHash}`);
            
            return data.txHash;
        } catch (error: any) {
            console.error("❌ Error al mintear el NFT:", error);
            alert(`Error al mintear el NFT: ${error.message || "Revisa la consola para más detalles."}`);
            return null;
        } finally {
            setMinting(false);
        }
    };
    
    return { 
        mintNFT, 
        minting, 
        txHash 
    };
}