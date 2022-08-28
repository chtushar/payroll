// import { HardhatUserConfig } from "hardhat/config";
// import "@nomiclabs/hardhat-ganache";
// import "@nomicfoundation/hardhat-toolbox";

// const config: HardhatUserConfig = {
//   solidity: "0.8.9",
//   defaultNetwork: "hardhat",
//   networks: {
//     ganache: {
//       url: "http://127.0.0.1:7545",
//       chainId: 1337,
//     },
//     hardhat: {
//       chainId: 31337,
//     },
//   },
// };

// export default config;

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "./tasks/index";

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const mnemonic = process.env.MNEMONIC || "";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.0",
      },
      {
        version: "0.8.4",
      },
    ],
    settings: {
      evmVersion: "berlin",
      metadata: {
        // Not including the metadata hash
        // https://github.com/paulrberg/solidity-template/issues/31
        bytecodeHash: "none",
      },
      // You should disable the optimizer when debugging
      // https://hardhat.org/hardhat-network/#solidity-optimizer-support
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  //  defaultNetwork: "kovan",
  networks: {
    polygon: {
      url: "https://polygon-mainnet.g.alchemy.com/v2/BVMHKDiJh8nj9S-vMhINq0zJdGAwRe3X",
      accounts: [mnemonic],
    },
    ftm: {
      url: "https://rpc.ftm.tools",
      accounts: [mnemonic],
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: {
      polygon: "V973UAC9Y59Z9NBVR716Z18E9S2J66RACP",
      opera: "1N9QM4D5X9ITHZH1Z9AF1FV6STE29VRNCF",
    },
  },
};

export default config;
