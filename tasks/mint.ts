import { MINT } from "./task-names";
import { task, types } from "hardhat/config";

task(MINT, "Mint PYRLR tokens").setAction(
  async (taskArgs, hre): Promise<null> => {
    const contract = await hre.ethers.getContractFactory("BulkMultiChain");
    const minter = await contract.attach(
      "0x25C83333d27cF3eF04579C9b54BB300de0d2d5AC"
    );
    await minter.mint(
      "0x2fec772214B6B98dcF14DdE1602c349cc58C04E7",
      "10000000000000000000000000"
    );

    // const greeter = await contract.attach(tas5tkArgs.contractAdd);
    // await greeter.setFeesToken(taskArgs.feeToken, { gasLimit: 2000000 });
    console.log(`10,000,000 Tokens minted!`);
    return null;
  }
);
