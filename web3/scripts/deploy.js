const hre = require("hardhat");

async function main() {
   const SimpleStorage = await hre.ethers.getContractFactory("SimpleStorage");
   const simpleStorage = await SimpleStorage.deploy();
   await simpleStorage.deployed();

  console.log(`Deployed to address ${simpleStorage.address}`);

  // add ETHERSCAN_API_KEY and deploy on network OTHER than hardhat
  if (hre.network.name !== "hardhat" && process.env.ETHERSCAN_API_KEY) {
    await simpleStorage.deployTransaction.wait(6);
    verify(simpleStorage.address, []);
  }
}
const verify = async (contractAddress, args) => {
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified!");
    } else {
      console.log(e);
    }
  }
};
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
