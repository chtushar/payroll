import { Chain, chain } from "wagmi";

const fantom = {
  id: 250,
  nchainId: 4,
  name: "Fantom Opera",
  network: "fantom",
  nativeCurrency: {
    name: "FTM",
    symbol: "FTM",
    decimals: 18,
  },
  rpcUrls: {
    default: "https://rpc.ankr.com/fantom/",
    public: "https://rpc.ankr.com/fantom/",
  },
  blockExplorers: {
    etherscan: {
      name: "FTMScan",
      url: "https://ftmscan.com/",
    },
    default: {
      name: "FTMScan",
      url: "https://ftmscan.com/",
    },
  },
};

const polygon = {
  nchainId: 1,
  ...chain.polygon,
};

export const getChains = (): Array<Chain> => {
  return [polygon, fantom];
};
