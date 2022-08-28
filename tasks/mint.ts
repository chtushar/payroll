import { MINT } from "./task-names";
import { task, types } from "hardhat/config";

task(MINT, "Mint PYRLR tokens").setAction(
  async (taskArgs, hre): Promise<null> => {
    const contract = await hre.ethers.getContractFactory("BulkMultiChain");
    const minter = await contract.attach(
      "0x281ACae8cdb67F492040A0ac0Fa19cDEa14cd20A"
    );
    await minter.mint(
      "0xA8b66aCFdaC5b18828E90C33aAce62F34C25665D",
      "10000000000000000000000000"
    );

    // const greeter = await contract.attach(taskArgs.contractAdd);
    // await greeter.setFeesToken(taskArgs.feeToken, { gasLimit: 2000000 });
    console.log(`10,000,000 Tokens minted!`);
    return null;
  }
);
