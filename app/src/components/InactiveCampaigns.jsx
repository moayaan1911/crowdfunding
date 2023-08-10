// InactiveCampaigns.jsx

import { useContract, useContractRead } from "@thirdweb-dev/react";
import InactiveCard from "./InactiveCard";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
export default function InactiveCampaigns({ contractAddress, abi }) {
  const { contract } = useContract(contractAddress, abi);
  const { data } = useContractRead(contract, "getCampaigns");
  const [campaignsData, setCampaignsData] = useState([]);

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
    const inactiveCampaigns = campaigns.filter(
      (campaign) => campaign.status === false || campaign.endAt < today
    );
    setCampaignsData(inactiveCampaigns);
  }
  useEffect(() => {
    getAllCampaigns();
  }, [data]);
  useEffect(() => {
    getAllCampaigns();
  }, []);

  return (
    <div>
      <h1 className="md:text-4xl md:font-semibold text-gray-600  md:mx-20 text-xl md:p-0 py-5 mt-20">
        Past Campaigns:
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 p-4">
        {campaignsData.map((campaign) => (
          <InactiveCard key={campaign.id} data={campaign} />
        ))}
      </div>
    </div>
  );
}
