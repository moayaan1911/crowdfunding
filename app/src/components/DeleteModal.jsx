import { useContract, useContractWrite } from "@thirdweb-dev/react";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export default function DeleteCampaign({
  open,
  onClose,
  campaignId,
  owner,
  contractAddress,
  abi,
}) {
  const navigate = useNavigate();
  const { contract } = useContract(contractAddress, abi);
  const {
    mutateAsync: deleteContractFunc,
    isLoading,
    error,
  } = useContractWrite(contract, "deleteCampaign");
  if (!open) return null;

  const handleYes = () => {
    // Delete logic
    console.log("delete");
  };

  return (
    <>
      <Toaster />
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 max-w-sm">
          <h3 className="text-lg font-bold text-center mb-4">
            Do you want to Delete this campaign?
          </h3>

          <div className="flex justify-end space-x-4">
            <button
              className="bg-red-500 text-white px-4 py-1 rounded-lg text-sm font-light "
              onClick={async () => {
                toast.loading("Deleting Campaign...", {
                  id: 2,
                });
                try {
                  await deleteContractFunc({
                    args: [campaignId],
                  });
                  toast.success("Deleted Succesfully", {
                    id: 2,
                  });
                  navigate("/");
                } catch (error) {
                  toast.error("Error Deleting campaign.", {
                    id: 2,
                  });
                  console.error(error);
                }
              }}
            >
              Yes
            </button>
            <button
              className="bg-purple-200 px-4 py-1 rounded-lg text-slate-700  text-sm font-light"
              onClick={onClose}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
