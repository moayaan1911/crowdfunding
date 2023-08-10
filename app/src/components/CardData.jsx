import React, { useState } from "react";
import Details from "./Details";
import { useNavigate } from "react-router-dom";
import ProgressBar from "@ramonak/react-progress-bar";
import { ethers } from "ethers";
import { Toaster, toast } from "react-hot-toast";
import { useAddress } from "@thirdweb-dev/react";
const Card = ({ data }) => {
  const address = useAddress();
  const [contributeModal, setContributeModal] = useState(false);
  async function handleContribute() {
    if (address) {
      setContributeModal(true);
    } else {
      toast.error("Connect Wallet to Contribute");
    }
  }
  const navigate = useNavigate();
  const url = data.image;
  const raisedPercent = data.raised / data.target;
  const detailsParams = data.id + data.title + data.owner;
  const hash = ethers.utils
    .keccak256(ethers.utils.toUtf8Bytes(detailsParams))
    .split("0x")[1]
    .slice(0, 8);

  const gatewayUrl = `https://ipfs.io/ipfs/${url.split("//")[1]}`;
  return (
    <>
      <Toaster />
      <div
        className="max-w-xs mx-auto w-72 bg-white rounded-lg shadow-md overflow-hidden h-full min-h-full"
        key={data.id}
      >
        <div className="relative">
          <img
            src={gatewayUrl}
            className="w-full h-56 object-cover border-pink-500 border-b-4"
          />
          <div className="absolute bottom-0 right-0 left-0 bg-black p-2 px-2 flex justify-between">
            <button
              className="bg-white text-pink-400 rounded-lg px-2 py-1 
                        hover:bg-gradient-to-r from-pink-100 to-pink-700 hover:text-black 
                        transition duration-500"
              onClick={() =>
                navigate(`/details/${hash}`, {
                  state: {
                    campaignId: data.id,
                  },
                })
              }
            >
              Details
            </button>

            <button
              className="bg-pink-500 text-white rounded-lg px-2 py-1
                        hover:bg-gradient-to-l from-purple-500 to-purple-700
                        transition duration-500"
              onClick={handleContribute}
            >
              Contribute
            </button>
          </div>
        </div>
        <div className="px-6 py-4">
          <h2 className="text-2xl font-semibold text-black">
            {data.title.length > 17
              ? data.title.slice(0, 17) + "..."
              : data.title}
          </h2>
          <p className="text-gray-600 mt-2">
            {data.description.length > 50
              ? data.description.slice(0, 50) + "..."
              : data.description}
          </p>
          <div className="flex justify-between items-center mt-4">
            <p className="text-gray-500 mt-2">Target: {data.target} ETH</p>
            <p className="text-gray-500 mt-2">Raised: {data.raised} ETH</p>
          </div>
        </div>
        <div className="w-4/5 m-auto mb-3">
          {raisedPercent * 100 > 1 ? (
            <ProgressBar completed={raisedPercent * 100} />
          ) : (
            <p className="text-center italic text-gray-300">
              **No Donations yet**
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Card;
