import { useContract, useContractWrite } from "@thirdweb-dev/react";
import { utils } from "ethers";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import ConfettiExplosion from "react-confetti-explosion";
function Contribute({
  open,
  onClose,
  campaignTitle,
  owner,
  campaignId,
  contractAddress,
  abi,
}) {
  const { contract } = useContract(contractAddress, abi);
  const {
    mutateAsync: contributeCall,
    isLoading,
    error,
  } = useContractWrite(contract, "contribute");
  const [amount, setAmount] = useState("");
  const [confettiCelebration, setConfettiCelebration] = useState(false);

  const handleInput = (e) => {
    const value = e.target.value;

    if (value <= 0) {
      toast.error("Amount must be greater than 0");
      return;
    }

    setAmount(value);
  };

  if (!open) return null;

  return (
    <>
      <Toaster />
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 max-w-sm">
          <h3 className="text-lg font-bold text-center mb-4 mt-0 pt-0">
            Contribute to {campaignTitle} campaign
          </h3>
          <p className="text-sm text-pink-500 text-center mb-4">
            Created by {owner}
          </p>
          <input
            type="number"
            value={amount}
            onChange={handleInput}
            className="border p-2 w-4/5"
          />
          <span className="text-xl text-gray-500 pl-5">ETH</span>
          <div className="flex justify-around pt-5">
            <button
              className="bg-red-500 text-white font-xl rounded-lg p-3 px-4"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="bg-purple-500 text-white font-xl rounded-lg p-3 px-4"
              onClick={async () => {
                toast.loading("Contributing to Campaign...", {
                  id: 2,
                });
                try {
                  await contributeCall({
                    args: [campaignId],
                    overrides: {
                      value: utils.parseEther(amount.toString()),
                      gasLimit: 1000000, // override default gas limit
                    },
                  });
                  toast.success("Contributed Succesfully", {
                    id: 2,
                  });
                  setConfettiCelebration(true);
                } catch (error) {
                  toast.error("Error contributing to campaign campaign.", {
                    id: 2,
                  });
                  console.error(error);
                }
              }}
            >
              Contribute
            </button>
            {confettiCelebration && <ConfettiExplosion />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Contribute;
