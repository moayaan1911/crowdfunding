import React from "react";
import ReactDOM from "react-dom/client";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Details from "./components/Details.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/details/:id",
    element: <Details />,
  },
]);
const activeChain = {
  chainId: 1442,
  rpc: ["https://polygon-zkevm-testnet.rpc.thirdweb.com"],

  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH",
  },
  shortName: "zkEVM testnet",
  slug: "zkevmtest",
  testnet: true,
  chain: "Polygon",
  name: "Polygon zkEVM Testnet",
};
const clientId = process.env.REACT_APP_THIRDWEB_CLIENT_ID;
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThirdwebProvider
      activeChain={activeChain}
      clientId={clientId}
      chainId={1442}
      supportedChains={[activeChain]}
      autoConnect={false}
    >
      <RouterProvider router={router} />
    </ThirdwebProvider>
  </React.StrictMode>
);
