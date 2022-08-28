import { BULK_TRANSFER } from "./task-names";
import { task, types } from "hardhat/config";
import { BigNumber } from "ethers";

task(BULK_TRANSFER, "Bulk transfer PYRLR tokens").setAction(
  async (taskArgs, hre): Promise<null> => {
    const contract = await hre.ethers.getContractFactory("BulkMultiChain");
    const sender = await contract.attach(
      "0xC129083865dB232e14C11c22c706EBB927c11b40"
    );

    await sender.setCrossChainGas(5000000000);
    await sender.bulkTransferCrossChain([
      {
        _amt: BigNumber.from((2 * 10 ** 18).toString()),
        _chainID: 4,
        _to: "0x4370e3e28a822cfe85B8D58d59b76164E94b78db",
      },
    ]);

    // const greeter = await contract.attach(taskArgs.contractAdd);
    // await greeter.setFeesToken(taskArgs.feeToken, { gasLimit: 2000000 });

    return null;
  }
);
