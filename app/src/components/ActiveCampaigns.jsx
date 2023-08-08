import React, { useEffect, useState } from "react";
import Card from "./CardData";
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { Toaster, toast } from "react-hot-toast";
import CreateCampaign from "./CreateCampaign";
import { useUser } from "@thirdweb-dev/react";
import { ethers } from "ethers";
export default function ActiveCampaigns({ contractAddress, abi }) {
  async function getCurrentDateInSeconds() {
    // return current date in seconds
    return Math.floor(Date.now() / 1000);
  }

  const { contract } = useContract(contractAddress, abi);
  const address = useAddress();
  const [createCampaignModal, setCreateCampaignModal] = useState(false);
  const [campaignsData, setCampaignsData] = useState([]);
  const { data, isLoading, error } = useContractRead(contract, "getCampaigns");
  const dataSets = [
    {
      id: 1,
      imageUrl: "https://source.unsplash.com/150x300/?animals",
      title: "Fundraiser for Animal Shelter",
      description:
        "Help raise money to build a new shelter for rescued animals",
      createdAt: "August 5, 2022 3:45pm",
    },
    {
      id: 2,
      imageUrl: "https://source.unsplash.com/150x300/?school",
      title: "School Supplies for Children",
      description: "Donate to provide school supplies for kids in need",
      createdAt: "August 1, 2022 12:30pm",
    },
    {
      id: 3,
      imageUrl: "https://source.unsplash.com/150x300/?home",
      title: "Build Homes for Families",
      description: "Help build affordable housing for low-income families",
      createdAt: "July 30, 2022 9:15am",
    },
    {
      id: 4,
      imageUrl: "https://source.unsplash.com/150x300/?nature",
      title: "Protect the Environment",
      description: "Support initiatives to protect and preserve nature",
      createdAt: "June 25, 2022 6:00pm",
    },
    {
      id: 5,
      imageUrl: "https://source.unsplash.com/150x300/?food",
      title: "Feed the Hungry",
      description: "Contribute to feeding programs for the less fortunate",
      createdAt: "May 15, 2022 10:45am",
    },
    {
      id: 6,
      imageUrl: "https://source.unsplash.com/150x300/?education",
      title: "Educate Underprivileged Children",
      description:
        "Support education for children from disadvantaged backgrounds",
      createdAt: "April 2, 2022 2:20pm",
    },
    {
      id: 7,
      imageUrl: "https://source.unsplash.com/150x300/?water",
      title: "Clean Water for All",
      description: "Help provide clean and safe water to communities in need",
      createdAt: "March 10, 2022 8:30am",
    },
  ];

  async function showModal() {
    if (address) {
      setCreateCampaignModal(true);
    } else {
      toast.error("Wallet not connected");
    }
  }

  async function closeModal() {
    setCreateCampaignModal(false);
  }

  async function getAllCampaigns() {
    // Filter for only active and ended
    const campaigns = data.map((campaign) => {
      return {
        id: campaign.campaignId.toNumber(),
        title: campaign.campaignTitle,
        description: campaign.campaignDescription,
        image: campaign.campaignImageCID,
        target: ethers.utils.formatEther(campaign.targetAmount),
        raised: ethers.utils.formatEther(campaign.raisedAmount),
        startAt: campaign.startAt.toNumber(),
        endAt: campaign.endAt.toNumber(),
        status: campaign.status,
        owner: campaign.campaignOwner,
      };
    });
    setCampaignsData(campaigns);
  }
  useEffect(() => {
    getAllCampaigns();
  }, [data]);
  useEffect(() => {
    getAllCampaigns();
  }, []);
  return (
    <>
      <Toaster />
      <div className="mt-20 md:text-left text-center">
        <div className="flex md:w-full md:justify-between justify-center mx-auto flex-wrap-reverse w-1/2">
          <h1 className="md:text-4xl md:font-semibold  md:mx-20 text-xl md:p-0 py-5">
            Active Campaigns:
          </h1>
          <button className="relative md:mx-20 rounded-xl border-4 overflow-hidden group p-2 text-pink-500 font-semibold hover:text-white">
            <div className="absolute w-full h-full  bg-pink-500 left-0 top-0 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
            <div className="absolute w-full h-full  bg-pink-500 left-0 top-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
            <div className="absolute w-full h-full  bg-pink-500 left-0 top-0 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            <div className="absolute w-full h-full   bg-pink-500 left-0 top-0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            <span className="relative z-10" onClick={showModal}>
              Create Campaign
            </span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 p-4">
          {campaignsData.map((data) => (
            <Card key={data.campaignId} data={data} />
          ))}
        </div>
      </div>
      {createCampaignModal && (
        <CreateCampaign
          showModal={showModal}
          closeModal={closeModal}
          contractAddress={contractAddress}
          abi={abi}
        />
      )}
    </>
  );
}
