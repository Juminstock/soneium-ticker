import { ethers } from "ethers";
import { NextRequest, NextResponse } from "next/server";

const { NEXT_PUBLIC_MINATO_RPC, NEXT_PUBLIC_WALLET_PRIVATE_KEY, NEXT_PUBLIC_SONEIUM_CONTRACT_ADDRESS } = process.env;

if (!NEXT_PUBLIC_MINATO_RPC || !NEXT_PUBLIC_WALLET_PRIVATE_KEY || !NEXT_PUBLIC_SONEIUM_CONTRACT_ADDRESS) {
    throw new Error("Faltan variables de entorno requeridas.");
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { userAddress } = body;
        
        if (!userAddress) {
            return NextResponse.json(
                { error: "Falta dirección de usuario" },
                { status: 400 }
            );
        }
        
        console.log("👤 Minteando NFT para:", userAddress);
        
        const provider = new ethers.JsonRpcProvider(NEXT_PUBLIC_MINATO_RPC);
        const wallet = new ethers.Wallet(NEXT_PUBLIC_WALLET_PRIVATE_KEY!, provider);
        
        const contractAbi = ["function safeMint(address to) public returns (uint256)"];
        
        const contract = new ethers.Contract(NEXT_PUBLIC_SONEIUM_CONTRACT_ADDRESS!, contractAbi, wallet);
        
        console.log("Enviando transacción...");
        const tx = await contract.safeMint(userAddress);
        console.log("📨 Transacción enviada:", tx.hash);
        
        const receipt = await tx.wait();
        console.log("✅ Transacción confirmada:", receipt);
        
        return NextResponse.json({ 
            success: true, 
            txHash: tx.hash 
        });
        
    } catch (error: any) {
        console.error("❌ Error en la transacción:", error);

        let errorMessage = "Error desconocido en la transacción";
        
        if (error.reason) {
            errorMessage = error.reason;
        } else if (error.message) {
            errorMessage = error.message;
        }
        
        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        );
    }
}