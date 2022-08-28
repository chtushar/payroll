import * as dotenv from "dotenv";
import { ethers } from "hardhat";

import hre from "hardhat";

dotenv.config({ path: __dirname + "../.env" });

async function main() {
  const [deployer] = await ethers.getSigners();
  //  Deploy to hardhat
  const contract = await hre.ethers.getContractFactory("BulkMultiChain");
  const deploy = await contract.deploy(
    "0x10BA4774cDBF19f3a4ed652005E0078e021bDF3E"
  );
  await deploy.deployed();

  console.log("contract deployed to:", deploy.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// ganache: 0xB84FdB128fdE2aB6DE011b77a3Ce989996994547
// hardhat: 0x5FbDB2315678afecb367f032d93F642f64180aa3

// 0x5FbDB2315678afecb367f032d93F642f64180aa3

// polygon: 0x00E079b6182a77Fc157f4A327E3840c57880b419
// ftm: 0xAD036AF57eC7533b94DE7d01EF0118B4Bf4F9274
