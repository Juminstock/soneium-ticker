// import { useState } from "react";
// import { useWallets } from "@privy-io/react-auth";
// import { ethers } from "ethers";
// import * as dotenv from "dotenv";
// import { Alchemy, Network, Wallet, Utils } from "alchemy-sdk";

// dotenv.config();
// const { NEXT_PUBLIC_ALCHEMY_API_KEY, WALLET_PRIVATE_KEY, MINATO_CONTRACT_ADDRESS } = process.env;

// // if (!NEXT_PUBLIC_ALCHEMY_API_KEY || !WALLET_PRIVATE_KEY || !MINATO_CONTRACT_ADDRESS) {
// //     throw new Error("Faltan variables de entorno requeridas.");
// // }

// // export { NEXT_PUBLIC_ALCHEMY_API_KEY, WALLET_PRIVATE_KEY, MINATO_CONTRACT_ADDRESS };

// const settings = {
//     apiKey: NEXT_PUBLIC_ALCHEMY_API_KEY,
//     network: Network.SONEIUM_MINATO
// };

// const alchemy = new Alchemy(settings);
// let wallet = new Wallet("6150c316687bf456dd7c868f7f2b65f48e618e2a1e745659cdcc916ddfc5ff53");

// export function useMintNFT() {
//     const { wallets } = useWallets();
//     const [minting, setMinting] = useState(false);
    
//     const mintNFT = async () => {
//         if (!wallets.length) {
//             alert("❌ No se encontró una wallet conectada.");
//             return;
//         }

//         try {
//             setMinting(true);
//             const userWallet = wallets[0];
      
//             const userAddress = userWallet.address
//             console.log("👤 ¡Usuario conectado!:", userAddress);
      
//             const nonce = await (async () => alchemy.core.getTransactionCount(wallet.address, "latest"))();
//             const contractInterface = new ethers.Interface([
//                 "function safeMint(address to) public returns (uint256)",
//             ]);
      
//             const txData = contractInterface.encodeFunctionData("safeMint", [
//                 userAddress,
//             ]);

//             let transaction = {
//                 to: userAddress,
//                 value: Utils.parseEther("0.001"),
//                 gasLimit: "100000",
//                 maxPriorityFeePerGas: Utils.parseUnits("5", "gwei"),
//                 maxFeePerGas: Utils.parseUnits("20", "gwei"),
//                 nonce: nonce,
//                 type: 2,
//                 data: txData
//             };

//             let rawTransaction = await wallet.signTransaction(transaction);
//             let txResponse = await alchemy.core.sendTransaction(rawTransaction);

//             console.log("📨 Transacción enviada:", txResponse);
      
//             const receipt = await txResponse.wait();
//             console.log("✅ Transacción confirmada:", receipt);
      
//             alert(`✅ ¡NFT minteado exitosamente! 🔗 https://soneium-minato.blockscout.com/tx/${txResponse.hash}`);
//         } catch (error) {
//                 console.error("❌ Error al mintear el NFT:", error);
//                 alert("Error al mintear el NFT. Revisa la consola para más detalles.");
//             } finally {
//                 setMinting(false);
//             }
//     }

//     return { mintNFT, minting };
// };
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
