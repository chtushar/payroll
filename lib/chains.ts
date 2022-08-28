import { Chain, chain } from "wagmi";

const fantom = {
  id: 250,
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
    default: {
      name: "FTMScan",
      url: "https://ftmscan.com/",
    },
  },
};

export const getChains = (): Array<Chain> => {
  return [chain.polygon];
};
