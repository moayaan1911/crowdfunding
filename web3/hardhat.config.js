require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("solidity-coverage");
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    /* @dev Uncomment the network you want to use */
    hardhat: {
      chainId: 1337,
    },
    // mumbai: {
    //   url: process.env.RPC_URL,
    //   accounts: [process.env.PRIVATE_KEY],
    // },
    // sepolia: {
    //   url: process.env.RPC_URL,
    //   accounts: [process.env.PRIVATE_KEY],
    // },
    // arbitrum: {
    //   url: process.env.RPC_URL,
    //   accounts: [process.env.PRIVATE_KEY],
    // },
    // optimism: {
    //   url: process.env.RPC_URL,
    //   accounts: [process.env.PRIVATE_KEY],
    // },
    // polygon: {
    //   url: process.env.RPC_URL,
    //   accounts: [process.env.PRIVATE_KEY],
    // },
    // eth: {
    //   url: process.env.RPC_URL,
    //   accounts: [process.env.PRIVATE_KEY],
    // },
    // bsc: {
    //   url: process.env.RPC_URL,
    //   accounts: [process.env.PRIVATE_KEY],
    // },
    // bsctestnet: {
    //   url: process.env.RPC_URL,
    //   accounts: [process.env.PRIVATE_KEY],
    // },
    // zkevm: {
    //   url: process.env.RPC_URL,
    //   accounts: [process.env.PRIVATE_KEY],
    // },
    zkevmtestnet: {
      url: process.env.RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    outputFile: "gas-report.txt",
    noColors: true,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
  },
};
