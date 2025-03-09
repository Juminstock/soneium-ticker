import { useState } from "react";
import { useWallets } from "@privy-io/react-auth";

export function useMintNFT() {
    const { wallets } = useWallets();
    const [minting, setMinting] = useState(false);
    
    const mintNFT = async () => {
        if (!wallets.length) {
            alert("❌ No se encontró una wallet conectada.");
            return;
        }

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
            alert(`✅ ¡NFT minteado exitosamente! 🔗 Observa aquí la transacción → https://soneium-minato.blockscout.com/tx/${data.txHash}`);
        } catch (error) {
            console.error("❌ Error al mintear el NFT:", error);
            alert("Error al mintear el NFT. Revisa la consola para más detalles.");
        } finally {
            setMinting(false);
        }
    };

    return { mintNFT, minting };
}
