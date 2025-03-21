import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import hre from "hardhat";

export default buildModule("SoneiumTicker", (m) => {
  const ownerAddress = hre.network.config.from;

  if (!ownerAddress) {
    throw new Error("Error: No se encontró una dirección válida para el propietario en la configuración de Hardhat.");
  }

  const soneiumNFT = m.contract("astarSoneiumMedellin", [ownerAddress]);

  return { soneiumNFT };
});
