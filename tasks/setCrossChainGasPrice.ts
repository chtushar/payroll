import { task, types } from "hardhat/config";

task("set-ccgas", "Set crosschain gas price")
  .addParam(
    "contractAdd",
    "address of the cross-chain contract",
    "",
    types.string
  )
  .addParam("crossgas", "address of the fee token", "", types.string)
  .setAction(async (taskArgs, hre): Promise<null> => {
    const contract = await hre.ethers.getContractFactory("BulkMultiChain");
    const greeter = await contract.attach(taskArgs.contractAdd);
    await greeter.setCrossChainGas(taskArgs.crossgas, {
      gasLimit: 2000000,
    });
    console.log(`gas set`);
    return null;
  });
