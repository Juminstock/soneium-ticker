import { ethers, BrowserProvider, parseUnits } from "ethers";
import { HDNodeWallet } from "ethers/wallet";
import { Alchemy, Network, Wallet, Utils } from "alchemy-sdk";
import { NextRequest, NextResponse } from "next/server";

const { NEXT_PUBLIC_MINATO_RPC, WALLET_PRIVATE_KEY, MINATO_CONTRACT_ADDRESS, NEXT_PUBLIC_ALCHEMY_API_KEY } = process.env;

if (!NEXT_PUBLIC_MINATO_RPC || !WALLET_PRIVATE_KEY || !MINATO_CONTRACT_ADDRESS || !NEXT_PUBLIC_ALCHEMY_API_KEY) {
    throw new Error("Faltan variables de entorno requeridas.");
}

const alchemy = new Alchemy({
    apiKey: NEXT_PUBLIC_ALCHEMY_API_KEY,
    network: Network.SONEIUM_MINATO
});

export async function POST(req: NextRequest) {
    const provider = new ethers.JsonRpcProvider(NEXT_PUBLIC_MINATO_RPC);
    const wallet = new ethers.Wallet(WALLET_PRIVATE_KEY!, provider);

    console.log(await provider.getBalance("ethers.eth"));
    
    try {
        const body = await req.json();
        const { userAddress } = body;
        
        if (!userAddress) {
            return NextResponse.json(
                { error: "Falta userAddress" },
                { status: 400 }
            );
        }
        
        console.log("👤 Minteando NFT para:", userAddress);
        
        const nonce = await alchemy.core.getTransactionCount(wallet.address, "latest");
        
        const contractInterface = new ethers.Interface([
            "function safeMint(address to) public returns (uint256)"
        ]);
        
        const txData = contractInterface.encodeFunctionData("safeMint", [userAddress]);
        
        const transaction = {
            to: MINATO_CONTRACT_ADDRESS,
            value: "0",
            gasLimit: "100000",
            maxPriorityFeePerGas: Utils.parseUnits("5", "gwei"),
            maxFeePerGas: Utils.parseUnits("20", "gwei"),
            nonce: nonce,
            type: 2,
            data: txData
        };
        
        const signedTx = await wallet.signTransaction(transaction);
        const txResponse = await alchemy.core.sendTransaction(signedTx);
        
        console.log("📨 Transacción enviada:", txResponse.hash);
        
        const receipt = await txResponse.wait();
        console.log("✅ Transacción confirmada:", receipt);
        
        return NextResponse.json({ 
            success: true, 
            txHash: txResponse.hash 
        });
        
    } catch (error) {
        console.error("❌ Error en la transacción:", error);
        
        return NextResponse.json(
            { error: "Error en la transacción" },
            { status: 500 }
        );
    }
}