import React, { useEffect, useState } from "react";
import Card from "./CardData";
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { Toaster, toast } from "react-hot-toast";
import CreateCampaign from "./CreateCampaign";
import { ethers } from "ethers";
export default function ActiveCampaigns({ contractAddress, abi }) {
  const { contract } = useContract(contractAddress, abi);
  const address = useAddress();
  const [createCampaignModal, setCreateCampaignModal] = useState(false);
  const [campaignsData, setCampaignsData] = useState([]);
  const { data, isLoading, error } = useContractRead(contract, "getCampaigns");

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
        endAt: new Date(campaign.endAt.toNumber() * 1000),
        status: campaign.status,
        owner: campaign.campaignOwner,
      };
    });
    const today = new Date();
    const activeCampaigns = campaigns.filter(
      (campaign) => campaign.status === true && campaign.endAt > today
    );
    setCampaignsData(activeCampaigns);
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
