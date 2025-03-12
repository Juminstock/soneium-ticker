import { ethers } from "hardhat";

async function main() {
  const CONTRACT_ADDRESS = "YOUR_CONTRACT_ADDRESS_HERE";
  const recipientAddress = "THE_ADDRESS_FOR_MINT_A_NFT";

  if (!recipientAddress || !ethers.isAddress(recipientAddress)) {
    console.error("❌ Debes proporcionar una dirección válida como argumento.");
    process.exit(1);
  }

  const [owner] = await ethers.getSigners();
  const contract = await ethers.getContractAt("astarSoneiumVenezuela", CONTRACT_ADDRESS, owner);

  console.log(`🚀 Minteando NFT a ${recipientAddress}.....`);

  const tx = await contract.safeMint(recipientAddress);
  await tx.wait();

  console.log(`✅ ¡NFT minteado exitosamente! 🔗 Visualiza aquí la transacción → https://soneium.blockscout.com/tx/${tx.hash}`);
}

main().catch((error) => {
  console.error("❌ Error en el script:", error);
  process.exit(1);
});