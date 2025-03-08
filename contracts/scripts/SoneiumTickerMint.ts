import { ethers } from "hardhat";

async function main() {
  const CONTRACT_ADDRESS = "0x99C04309D9cec270d8D2f0A55efcf35b250ab0c0";
  const recipientAddress = "0xf43163cAF5aB5C8c179D0753c02eC76C885c8498";

  if (!recipientAddress || !ethers.isAddress(recipientAddress)) {
    console.error("❌ Debes proporcionar una dirección válida como argumento.");
    process.exit(1);
  }

  const [owner] = await ethers.getSigners();
  const contract = await ethers.getContractAt("SoneiumTickerLaunch", CONTRACT_ADDRESS, owner);

  console.log(`🚀 Minteando NFT a ${recipientAddress}.....`);

  const tx = await contract.safeMint(recipientAddress);
  await tx.wait();

  console.log(`✅ ¡NFT minteado exitosamente! 🔗 Visualiza aquí la transacción → https://soneium-minato.blockscout.com/tx/${tx.hash}`);
}

main().catch((error) => {
  console.error("❌ Error en el script:", error);
  process.exit(1);
});