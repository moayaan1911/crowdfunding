import React from "react";
import ReactDOM from "react-dom/client";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import App from "./App.jsx";
import "./index.css";
const activeChain = "mumbai";
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
const clientId =
  "get your clientId at https://thirdweb.com/dashboard/settings/api-keys";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThirdwebProvider activeChain={activeChain} clientId={clientId}>
      <App />
    </ThirdwebProvider>
  </React.StrictMode>
);
