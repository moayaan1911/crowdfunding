const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("SimpleStorage", async function () {
  let simpleStorage;
  let simpleStorageAddress;
  beforeEach(async function () {
    const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await SimpleStorage.deploy();
    simpleStorageAddress = simpleStorage.address;
  });
  it("Should return the value of data variable", async function () {
    expect(await simpleStorage.get()).to.equal(0);
  });
  it("Should set the value of data variable to 42", async function () {
    await simpleStorage.set(42);
    expect(await simpleStorage.get()).to.equal(42);
  });
});
