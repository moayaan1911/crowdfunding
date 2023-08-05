# FULL3 setup (BACKEND)

This is the web3 setup for a FULL STACK WEB3 project created by FULL3 package

## HOW TO RUN
- Create .env file
- Fill with SAME DETAILS as mentioned in .env.example
- uncomment the network and etherscan for the network you are going to use
- run the hardhat project using simple `yarn` or `npm` command


### Deployment Scripts
- **npm run deploy**: Deploy the project using the Hardhat framework to the Hardhat network.
- **npm run deploy-mumbai**: Deploy the project to the Mumbai network.
- **npm run deploy-mainnet**: Deploy the project to the Mainnet network.
- **npm run deploy-sepolia**: Deploy the project to the Sepolia network.
- **npm run deploy-bsc**: Deploy the project to the Binance Smart Chain (BSC) network.
- **npm run deploy-bsctestnet**: Deploy the project to the BSC Testnet.
- **npm run deploy-zkevm**: Deploy the project to the ZK-EVM network.
- **npm run deploy-zkevmtestnet**: Deploy the project to the ZK-EVM Testnet.
- **npm run deploy-optimism**: Deploy the project to the Optimism network.
- **npm run deploy-eth**: Deploy the project to the Ethereum (ETH) network.
- **npm run deploy-arbitrum**: Deploy the project to the Arbitrum network.

### Other Useful Commands
- **npm run node**: Start a local Hardhat node for development and testing purposes.
- **npm run help**: Get help on Hardhat commands and usage.
- **npm run networks**: List all available networks for deployment verification.
- **npm run coverage**: Generate code coverage reports for the project.

### Using Yarn
To use Yarn for running the commands, replace `npm run` with `yarn` in the above command list. For example:

- **yarn deploy**: Deploy the project using the Hardhat framework to the Hardhat network.
- **yarn deploy-mumbai**: Deploy the project to the Mumbai network.
- **yarn deploy-mainnet**: Deploy the project to the Mainnet network.
- **yarn deploy-sepolia**: Deploy the project to the Sepolia network.
- **yarn deploy-bsc**: Deploy the project to the Binance Smart Chain (BSC) network.
- **yarn deploy-bsctestnet**: Deploy the project to the BSC Testnet.
- **yarn deploy-zkevm**: Deploy the project to the ZK-EVM network.
- **yarn deploy-zkevmtestnet**: Deploy the project to the ZK-EVM Testnet.
- **yarn deploy-optimism**: Deploy the project to the Optimism network.
- **yarn deploy-eth**: Deploy the project to the Ethereum (ETH) network.
- **yarn deploy-arbitrum**: Deploy the project to the Arbitrum network.

For other commands like `yarn node`, `yarn help`, `yarn networks`, and `yarn coverage`, simply replace `npm run` with `yarn` as well.

Remember to ensure that you have Yarn installed on your system before using Yarn commands.

Sure! Here's the updated dependency list for the `devDependencies` and `dependencies` in your project, including their official websites:

## Dev Dependencies

- **[@nomicfoundation/hardhat-toolbox](https://github.com/nomiclabs/hardhat-toolbox)** (Version: ^2.0.0)
  - Description: A collection of handy utility functions and tasks for Hardhat, a development environment for Ethereum.
  - Website: [https://github.com/nomiclabs/hardhat-toolbox](https://github.com/nomiclabs/hardhat-toolbox)

- **[hardhat](https://hardhat.org/)** (Version: ^2.13.0)
  - Description: A popular development framework for Ethereum projects that provides a set of powerful features for smart contract development and deployment.
  - Website: [https://hardhat.org/](https://hardhat.org/)

## Dependencies

- **[dotenv](https://www.npmjs.com/package/dotenv)** (Version: ^16.3.1)
  - Description: A zero-dependency module that loads environment variables from a `.env` file into `process.env`.
  - Website: [https://www.npmjs.com/package/dotenv](https://www.npmjs.com/package/dotenv)

These dependencies are essential for your project's development, testing, and deployment processes. For more detailed information about each package, you can visit their respective websites linked above.
