# FULL3 Setup (Frontend & Backend) - Powered by React, Hardhat, Tailwind, and Thirdweb

## INSTALLATION
- First Install as global dependency: **`npm install -g full3`**
- Initialize new project: **`npx full3`**


## About the Starter
This is the app setup for a FULL STACK WEB3 project created by the FULL3 package. The FULL3 package is powered by the following technologies:

- [React](https://reactjs.org/): A JavaScript library for building user interfaces. It provides the foundation for creating interactive and dynamic UI components in the frontend of the web3 project.

- [Hardhat](https://hardhat.org/): A popular development framework for Ethereum projects. Hardhat offers a set of powerful features for smart contract development and deployment, making it an essential tool for handling Ethereum interactions in the backend.

- [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework that provides a customizable set of CSS classes. Tailwind CSS enables efficient and rapid styling of components and user interfaces in the project's frontend.

- [Thirdweb](https://thirdweb.com/): A platform that offers services and tools for developing web3 applications. Thirdweb provides a Software Development Kit (SDK) and related packages, such as `@thirdweb-dev/react`, for specific functionalities, making it a valuable component in building web3 applications.

The FULL3 package simplifies the setup process for a full-stack web3 project. Users can easily initialize this project in their desired directory by running `npx full3` in the command line. The package provides both frontend and backend configurations, enabling users to seamlessly interact with Ethereum and Ethereum-like networks. It comes with essential dependencies and devDependencies for a smooth development experience and provides deployment scripts for various networks, making it a powerful tool for building decentralized applications.

## How to Run (Frontend)

- Sign up on the Thirdweb dashboard to achieve an API key (https://thirdweb.com/dashboard/settings/api-keys).
- Fill in the API KEY in the `main.jsx` clientId.
- Run using `yarn dev` or `npm run dev`.
- Read and write the contract methods.
- Don't forget to add your URL in allowance in the Thirdweb dashboard.

## Scripts (Frontend)

- **`npm run dev`**: Start the Vite development server.
- **`npm run build`**: Build the project using Vite.
- **`npm run lint`**: Run ESLint to check for code quality and enforce coding standards.
- **`npm run preview`**: Start a Vite server to preview the built project.

## How to Run (Backend)

- Create a `.env` file.
- Fill it with the same details as mentioned in `.env.example`.
- Uncomment the network and etherscan for the network you are going to use.
- Run the Hardhat project using `yarn` or `npm` command.

## Deployment Scripts

- **`npm run deploy`**: Deploy the project using the Hardhat framework to the Hardhat network.
- **`npm run deploy-mumbai`**: Deploy the project to the Mumbai network.
- **`npm run deploy-mainnet`**: Deploy the project to the Mainnet network.
- **`npm run deploy-sepolia`**: Deploy the project to the Sepolia network.
- **`npm run deploy-bsc`**: Deploy the project to the Binance Smart Chain (BSC) network.
- **`npm run deploy-bsctestnet`**: Deploy the project to the BSC Testnet.
- **`npm run deploy-zkevm`**: Deploy the project to the ZK-EVM network.
- **`npm run deploy-zkevmtestnet`**: Deploy the project to the ZK-EVM Testnet.
- **`npm run deploy-optimism`**: Deploy the project to the Optimism network.
- **`npm run deploy-eth`**: Deploy the project to the Ethereum (ETH) network.
- **`npm run deploy-arbitrum`**: Deploy the project to the Arbitrum network.

## Other Useful Commands

- **npm run node**: Start a local Hardhat node for development and testing purposes.
- **`npm run help`**: Get help on Hardhat commands and usage.
- **`npm run networks`**: List all available networks for deployment verification.
- **`npm run coverage`**: Generate code coverage reports for the project.

## Using Yarn

To use Yarn for running the commands, replace `npm run` with `yarn` in the above command list. For example:

- **`yarn dev`**: Start the Vite development server.
- **`yarn deploy`**: Deploy the project using the Hardhat framework to the Hardhat network.

For other commands like `yarn build`, `yarn lint`, `yarn preview`, `yarn node`, `yarn help`, `yarn networks`, and `yarn coverage`, simply replace `npm run` with `yarn` as well.

Remember to ensure that you have Yarn installed on your system before using Yarn commands.

## Dependencies

- **[@nomicfoundation/hardhat-toolbox](https://github.com/nomiclabs/hardhat-toolbox)** (Version: ^2.0.0)
  - Description: A collection of handy utility functions and tasks for Hardhat, a development environment for Ethereum.
  - Website: [https://github.com/nomiclabs/hardhat-toolbox](https://github.com/nomiclabs/hardhat-toolbox)

- **[hardhat](https://hardhat.org/)** (Version: ^2.13.0)
  - Description: A popular development framework for Ethereum projects that provides a set of powerful features for smart contract development and deployment.
  - Website: [https://hardhat.org/](https://hardhat.org/)

- **[dotenv](https://www.npmjs.com/package/dotenv)** (Version: ^16.3.1)
  - Description: A zero-dependency module that loads environment variables from a `.env` file into `process.env`.
  - Website: [https://www.npmjs.com/package/dotenv](https://www.npmjs.com/package/dotenv)

- **[@thirdweb-dev/react](https://www.npmjs.com/package/@thirdweb-dev/react)** (Version: ^3.14.25)
  - Description: A package related to the React framework by Thirdweb for specific purposes.
  - Website: [https://www.npmjs.com/package/@thirdweb-dev/react](https://www.npmjs.com/package/@thirdweb-dev/react)

- **[@thirdweb-dev/sdk](https://www.npmjs.com/package/@thirdweb-dev/sdk)** (Version: ^3.10.44)
  - Description: The Thirdweb Software Development Kit (SDK) for specific functionality.
  - Website: [https://www.npmjs.com/package/@thirdweb-dev/sdk](https://www.npmjs.com/package/@thirdweb-dev/sdk)

- **[ethers](https://www.npmjs.com/package/ethers)** (Version: ^5)
  - Description: A library for interacting with Ethereum and Ethereum-like networks.
  - Website: [https://www.npmjs.com/package/ethers](https://www.npmjs.com/package/ethers)

- **[react](https://reactjs.org/)** (Version: ^18.2.0)
  - Description: A JavaScript library for building user interfaces.
  - Website: [https://reactjs.org/](https://reactjs.org/)

- **[react-dom](https://reactjs.org/docs/react-dom.html)** (Version: ^18.2.0)
  - Description: The entry point to the DOM and server renderers for React.
  - Website: [https://reactjs.org/docs/react-dom.html](https://reactjs.org/docs/react-dom.html)

## Dev Dependencies

- **[@types/react](https://www.npmjs.com/package/@types/react)** (Version: ^18.2.15)
  - Description: TypeScript type definitions for React.
  - Website: [https://www.npmjs.com/package/@types/react](https://www.npmjs.com/package/@types/react)

- **[@types/react-dom](https://www.npmjs.com/package/@types/react-dom)** (Version: ^18.2.7)
  - Description: TypeScript type definitions for React DOM.
  - Website: [https://www.npmjs.com/package/@types/react-dom](https://www.npmjs.com/package/@types/react-dom)

- **[@vitejs/plugin-react](https://www.npmjs.com/package/@vitejs/plugin-react)** (Version: ^4.0.4)
  - Description: Vite plugin to enable React support in your Vite projects.
  - Website: [https://www.npmjs.com/package/@vitejs/plugin-react](https://www.npmjs.com/package/@vitejs/plugin-react)

- **[autoprefixer](https://www.npmjs.com/package/autoprefixer)** (Version: ^10.4.14)
  - Description: A PostCSS plugin to parse CSS and add vendor prefixes automatically.
  - Website: [https://www.npmjs.com/package/autoprefixer](https://www.npmjs.com/package/autoprefixer)

- **[postcss](https://www.npmjs.com/package/postcss)** (Version: ^8.4.27)
  - Description: A tool for transforming CSS with JavaScript plugins.
  - Website: [https://www.npmjs.com/package/postcss](https://www.npmjs.com/package/postcss)

- **[tailwindcss](https://www.npmjs.com/package/tailwindcss)** (Version: ^3.3.3)
  - Description: A utility-first CSS framework for building custom designs.
  - Website: [https://www.npmjs.com/package/tailwindcss](https://www.npmjs.com/package/tailwindcss)

- **[vite](https://vitejs.dev/)** (Version: ^4.4.5)
  - Description: A build tool and development server for modern web projects.
  - Website: [https://vitejs.dev/](https://vitejs.dev/)

- **[vite-plugin-node-polyfills](https://www.npmjs.com/package/vite-plugin-node-polyfills)** (Version: ^0.9.0)
  - Description: A Vite plugin to automatically add Node.js polyfills for browser compatibility.
  - Website: [https://www.npmjs.com/package/vite-plugin-node-polyfills](https://www.npmjs.com/package/vite-plugin-node-polyfills)

Please note that the descriptions provided are just brief summaries of each package's functionality. For more detailed information about each package, you can visit their respective websites linked above.

