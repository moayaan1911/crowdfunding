const hre = require("hardhat");

async function main() {
  const Crowdfunding = await hre.ethers.getContractFactory("CrowdFunding");
  const crowdfunding = await Crowdfunding.deploy();
  await crowdfunding.deployed();

  console.log(`Deployed to address ${crowdfunding.address}`);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// Deployed on zkevm testnet on :-https://testnet-zkevm.polygonscan.com/address/0x0A87AEf652cb24350880de80c000d791071a7ee6
