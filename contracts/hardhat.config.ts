import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  networks: {
    hardhat: {},
    minato: {
      url: "https://soneium-minato.g.alchemy.com/v2/etZm12pLQ8B0KzV50lKmYKOsWbAW_hX5",
      chainId: 1946,
      from: "0x78b4fdd087eC725fb18c5fbdA4471FD1d766ba3F",
      accounts: ["6150c316687bf456dd7c868f7f2b65f48e618e2a1e745659cdcc916ddfc5ff53"]
    },
    soneium : {
      url: "https://soneium-mainnet.g.alchemy.com/v2/etZm12pLQ8B0KzV50lKmYKOsWbAW_hX5",
      chainId: 1868,
      from: "0x78b4fdd087eC725fb18c5fbdA4471FD1d766ba3F",
      accounts: ["6150c316687bf456dd7c868f7f2b65f48e618e2a1e745659cdcc916ddfc5ff53"]
    }
  },
  solidity: "0.8.28",
};

export default config;
