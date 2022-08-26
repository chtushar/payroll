import { Chain, chain } from "wagmi";

const ganache = {
  ...chain.localhost,
  rpcUrls: {
    default: "http://localhost:7545",
  },
};

export const getChains = (): Array<Chain> => {
  return [chain.hardhat, ganache];
};
