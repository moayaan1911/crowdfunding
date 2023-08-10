import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { MdDeleteForever } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { Toaster, toast } from "react-hot-toast";
const contractAddress = "0xAfA9c8376d384acE223828730b4594eC1Ef7Ab0F";
const abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "campaignId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "createdAt",
        type: "uint256",
      },
    ],
    name: "CampaignCreated",
    type: "event",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "campaigns",
    outputs: [
      { internalType: "uint256", name: "campaignId", type: "uint256" },
      { internalType: "string", name: "campaignTitle", type: "string" },
      { internalType: "string", name: "campaignDescription", type: "string" },
      { internalType: "string", name: "campaignImageCID", type: "string" },
      { internalType: "uint256", name: "targetAmount", type: "uint256" },
      { internalType: "uint256", name: "raisedAmount", type: "uint256" },
      { internalType: "uint256", name: "startAt", type: "uint256" },
      { internalType: "uint256", name: "endAt", type: "uint256" },
      { internalType: "bool", name: "status", type: "bool" },
      {
        internalType: "address payable",
        name: "campaignOwner",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_campaignId", type: "uint256" }],
    name: "claimContribution",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_campaignID", type: "uint256" }],
    name: "contribute",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "contributions",
    outputs: [
      { internalType: "uint256", name: "campaignId", type: "uint256" },
      { internalType: "uint256", name: "contributionId", type: "uint256" },
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "uint256", name: "date", type: "uint256" },
      { internalType: "address payable", name: "contributor", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "_campaignTitle", type: "string" },
      { internalType: "string", name: "_campaignDescription", type: "string" },
      { internalType: "string", name: "_campaignImageCID", type: "string" },
      { internalType: "uint256", name: "_targetAmount", type: "uint256" },
      { internalType: "uint256", name: "_duration", type: "uint256" },
    ],
    name: "createCampaign",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_campaignId", type: "uint256" }],
    name: "deleteCampaign",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_campaignId", type: "uint256" },
      { internalType: "string", name: "_campaignTitle", type: "string" },
      { internalType: "string", name: "_campaignDescription", type: "string" },
      { internalType: "string", name: "_campaignImageCID", type: "string" },
    ],
    name: "editCampaign",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getActiveCampaigns",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "campaignId", type: "uint256" },
          { internalType: "string", name: "campaignTitle", type: "string" },
          {
            internalType: "string",
            name: "campaignDescription",
            type: "string",
          },
          { internalType: "string", name: "campaignImageCID", type: "string" },
          { internalType: "uint256", name: "targetAmount", type: "uint256" },
          { internalType: "uint256", name: "raisedAmount", type: "uint256" },
          { internalType: "uint256", name: "startAt", type: "uint256" },
          { internalType: "uint256", name: "endAt", type: "uint256" },
          { internalType: "bool", name: "status", type: "bool" },
          {
            internalType: "address payable",
            name: "campaignOwner",
            type: "address",
          },
        ],
        internalType: "struct CrowdFunding.Campaign[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllContributions",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "campaignId", type: "uint256" },
          { internalType: "uint256", name: "contributionId", type: "uint256" },
          { internalType: "uint256", name: "amount", type: "uint256" },
          { internalType: "uint256", name: "date", type: "uint256" },
          {
            internalType: "address payable",
            name: "contributor",
            type: "address",
          },
        ],
        internalType: "struct CrowdFunding.Contribution[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_campaignId", type: "uint256" }],
    name: "getAllContributionsForParticularCampaign",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "campaignId", type: "uint256" },
          { internalType: "uint256", name: "contributionId", type: "uint256" },
          { internalType: "uint256", name: "amount", type: "uint256" },
          { internalType: "uint256", name: "date", type: "uint256" },
          {
            internalType: "address payable",
            name: "contributor",
            type: "address",
          },
        ],
        internalType: "struct CrowdFunding.Contribution[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCampaigns",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "campaignId", type: "uint256" },
          { internalType: "string", name: "campaignTitle", type: "string" },
          {
            internalType: "string",
            name: "campaignDescription",
            type: "string",
          },
          { internalType: "string", name: "campaignImageCID", type: "string" },
          { internalType: "uint256", name: "targetAmount", type: "uint256" },
          { internalType: "uint256", name: "raisedAmount", type: "uint256" },
          { internalType: "uint256", name: "startAt", type: "uint256" },
          { internalType: "uint256", name: "endAt", type: "uint256" },
          { internalType: "bool", name: "status", type: "bool" },
          {
            internalType: "address payable",
            name: "campaignOwner",
            type: "address",
          },
        ],
        internalType: "struct CrowdFunding.Campaign[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getInactiveCampaigns",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "campaignId", type: "uint256" },
          { internalType: "string", name: "campaignTitle", type: "string" },
          {
            internalType: "string",
            name: "campaignDescription",
            type: "string",
          },
          { internalType: "string", name: "campaignImageCID", type: "string" },
          { internalType: "uint256", name: "targetAmount", type: "uint256" },
          { internalType: "uint256", name: "raisedAmount", type: "uint256" },
          { internalType: "uint256", name: "startAt", type: "uint256" },
          { internalType: "uint256", name: "endAt", type: "uint256" },
          { internalType: "bool", name: "status", type: "bool" },
          {
            internalType: "address payable",
            name: "campaignOwner",
            type: "address",
          },
        ],
        internalType: "struct CrowdFunding.Campaign[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_campaignId", type: "uint256" }],
    name: "getParticularCampaign",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "campaignId", type: "uint256" },
          { internalType: "string", name: "campaignTitle", type: "string" },
          {
            internalType: "string",
            name: "campaignDescription",
            type: "string",
          },
          { internalType: "string", name: "campaignImageCID", type: "string" },
          { internalType: "uint256", name: "targetAmount", type: "uint256" },
          { internalType: "uint256", name: "raisedAmount", type: "uint256" },
          { internalType: "uint256", name: "startAt", type: "uint256" },
          { internalType: "uint256", name: "endAt", type: "uint256" },
          { internalType: "bool", name: "status", type: "bool" },
          {
            internalType: "address payable",
            name: "campaignOwner",
            type: "address",
          },
        ],
        internalType: "struct CrowdFunding.Campaign",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalCampaigns",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalContributions",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];
export default function Details() {
  const { contract } = useContract(contractAddress, abi);
  const location = useLocation();
  const {
    campaignId,
    owner,
    title,
    description,
    image,
    target,
    raised,
    status,
    endAt,
  } = location.state;
  const date = new Date(endAt * 1000).toLocaleDateString();
  const gatewayUrl = `https://ipfs.io/ipfs/${image.split("//")[1]}`;
  const address = useAddress();
  async function deleteFuncion() {}
  const connectToZkEVMTestnet = async () => {
    const desiredChainId = "0x5A2"; // Chain ID 1442 in hexadecimal
    if (address) {
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
    <>
      <Toaster />
      <Navbar />
      <div className="my-10 text-3xl font-bold text-center mb-12">
        Details Page
      </div>
      <div className="flex flex-wrap w-5/6  mx-auto p-0 md:pl-20">
        <div className="">
          <img src={gatewayUrl} className="md:w-4/5 rounded-2xl" />
        </div>

        <div className="flex flex-col md:w-80 w-full justify-between text-center md:text-left mt-10 md:m-0">
          <div className="md:h-1/2 h-2/3 border-b-2 border-pink-400 flex flex-col justify-around">
            <h2 className="text-3xl font-bold mb-5">
              {title}
              {address == owner && (
                <>
                  <button className="px-1">
                    <AiOutlineEdit className="text-4xl text-gray-600" />
                  </button>
                  <button onClick={deleteFuncion}>
                    <MdDeleteForever className="text-4xl text-red-600" />
                  </button>
                </>
              )}
            </h2>

            <p className="mb-4 text-xl pb-5">{description}</p>
          </div>
          <div className="flex flex-col justify-around md:h-1/2 text-xl font-semibold mt-8">
            <div>
              Created By :{" "}
              <a
                className="underline italic font-semibold"
                href={`https://testnet-zkevm.polygonscan.com/address/${owner}`}
                target="_blank"
                rel="noreferrer"
              >
                {owner.slice(0, 15)}...{owner.slice(32)}
              </a>
            </div>
            <div>Target : {target} ETH</div>
            <div>Raised {raised} ETH</div>
            <div>Ends on : {date}</div>
          </div>
        </div>
      </div>
    </>
  );
}
