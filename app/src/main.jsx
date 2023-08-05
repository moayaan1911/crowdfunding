import React from "react";
import ReactDOM from "react-dom/client";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import App from "./App.jsx";
import "./index.css";
const activeChain = {
  // === Required information for connecting to the network === \\
  chainId: 1442, // Chain ID of the network
  // Array of RPC URLs to use
  rpc: ["https://polygon-zkevm-testnet.rpc.thirdweb.com"],

  // === Information for adding the network to your wallet (how it will appear for first time users) === \\
  // Information about the chain's native currency (i.e. the currency that is used to pay for gas)
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH",
  },
  shortName: "zkEVM testnet", // Display value shown in the wallet UI
  slug: "zkevmtest", // Display value shown in the wallet UI
  testnet: true, // Boolean indicating whether the chain is a testnet or mainnet
  chain: "Polygon", // Name of the network
  name: "Polygon zkEVM Testnet", // Name of the network
};
/*
ACTIVE CHAINS NAME for Thirdweb
Ethereum: "ethereum"
Goerli: "goerli"
Polygon: "polygon"
Mumbai: "mumbai"
Arbitrum One: "arbitrum"
Arbitrum Goerli: "arbitrum-goerli"
Optimism: "optimism"
Optimism Goerli Testnet: "optimism-goerli"
Binance SmartChain: "binance"
Binance SmartChain Testnet: "binance-testnet"
Fantom Opera: "fantom"
Fantom Testnet: "fantom-testnet"
Avalanche C Chain: "avalanche-fuji"
Avalanche Fuji Testnet: "avalanche-fuji-testnet"
Localhost: "localhost"
*/
const clientId = "09c4e70f62deeb54f83478b51e5839ac";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThirdwebProvider
      activeChain={activeChain}
      clientId={clientId}
      chainId={1442}
      supportedChains={[activeChain]}
      autoConnect={false}
    >
      <App />
    </ThirdwebProvider>
  </React.StrictMode>
);
