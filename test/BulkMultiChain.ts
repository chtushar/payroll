import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("BulkMultiChain", function () {
  async function fixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const bmc = await ethers.getContractFactory("BulkMultiChain");
    const b = await bmc.deploy(owner.address);

    return { b };
  }

  describe("Logs", async function () {
    const { b } = await loadFixture(fixture);

    await b.bulkTransferCrossChain([
      {
        _to: "0x4370e3e28a822cfe85B8D58d59b76164E94b78db",
        _chainID: 4,
        _amt: {
          type: "BigNumber",
          hex: "0x0de0b6b3a7640000",
        },
      },
    ]);

    expect("ok").is("ok");
  });
});
