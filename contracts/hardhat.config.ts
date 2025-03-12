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
      from: "YOUR_WALLET_ADDRESS_HERE",
      accounts: ["YOUR_PRIVATE_KEY_HERE"] 
    }
  },
  solidity: "0.8.28",
};

export default config;