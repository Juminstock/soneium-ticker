// // This setup uses Hardhat Ignition to manage smart contract deployments.
// // Learn more about it at https://hardhat.org/ignition

// import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

// const JAN_1ST_2030 = 1893456000;
// const ONE_GWEI: bigint = 1_000_000_000n;

// const LockModule = buildModule("LockModule", (m) => {
//   const unlockTime = m.getParameter("unlockTime", JAN_1ST_2030);
//   const lockedAmount = m.getParameter("lockedAmount", ONE_GWEI);

//   const lock = m.contract("Lock", [unlockTime], {
//     value: lockedAmount,
//   });

//   return { lock };
// });

// export default LockModule;




import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import hre from "hardhat";

export default buildModule("SoneiumTicker", (m) => {
  const ownerAddress = hre.network.config.from;

  if (!ownerAddress) {
    throw new Error("Error: No se encontró una dirección válida para el propietario en la configuración de Hardhat.");
  }

  const soneiumNFT = m.contract("SoneiumTickerLaunch", [ownerAddress]);

  return { soneiumNFT };
});
