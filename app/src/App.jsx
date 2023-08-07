import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import { useAddress } from "@thirdweb-dev/react";
import ActiveCampaigns from "./components/ActiveCampaigns";
const contractAddress = "0x0A87AEf652cb24350880de80c000d791071a7ee6";
export default function App() {
  const address = useAddress();
  const desiredChainId = "0x5A2"; // Chain ID 1442 in hexadecimal
  const connectToZkEVMTestnet = async () => {
    if (address) {
      console.log("if address called");
      if (window.ethereum) {
        const chainId = await window.ethereum.request({
          method: "eth_chainId",
        });

        // Check if connected to a different network (not zkEVM testnet)
        if (chainId !== desiredChainId) {
          // ChainId of zkEVM testnet is '0x03EF'
          try {
            await window.ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: desiredChainId }],
            });
          } catch (error) {
            // Handle error
            console.log("Error while switching to zkEVM testnet:", error);
          }
        }
      } else {
        // Handle case where window.ethereum is not available
        console.log("Metamask not available");
      }
    }
  };
  useEffect(() => {
    connectToZkEVMTestnet();
  }, [address]);

  return (
    <div>
      <Navbar />
      <Banner />
      <ActiveCampaigns />
    </div>
  );
}
