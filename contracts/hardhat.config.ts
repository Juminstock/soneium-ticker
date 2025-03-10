import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  networks: {
    hardhat: {},
    // minato: {
    //   url: "https://rpc.minato.soneium.org/",
    //   chainId: 1946,
    //   from: "YOUR_WALLET_ADDRESS_HERE",
    //   accounts: ["YOUR_PRIVATE_KEY_HERE"]
    // },
    soneium : {
      url: "https://rpc.soneium.org/",
      chainId: 1868,
      from: "0xf43163cAF5aB5C8c179D0753c02eC76C885c8498",
      accounts: ["0x6aff67fd80f5c975b00c03363895909db46a8fb3fd6f0298071821acd0ba3e28"]
    }
  },
  solidity: "0.8.28",
};

export default config;
