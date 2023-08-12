import { useContract, useContractWrite } from "@thirdweb-dev/react";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function EditCampaign({
  open,
  onClose,
  contractAddress,
  abi,
  campaignId,
  title,
  description,
  image,
}) {
  const [newTitle, setNewTitle] = useState(title);
  const [newDesc, setNewDesc] = useState(description);
  const { contract } = useContract(contractAddress, abi);
  const navigate = useNavigate();
  const {
    mutateAsync: editCall,
    isLoading,
    error,
  } = useContractWrite(contract, "editCampaign");

  if (!open) return null;

  return (
    <>
      <Toaster />
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 max-w-sm">
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full rounded border border-gray-300 p-2 text-sm mb-4 pl-3"
          />

          <textarea
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            className="w-full rounded border border-gray-300 p-2 text-sm mb-4 pl-3"
          />

          <div className="flex justify-end space-x-4">
            <button
              className="rounded bg-red-500 px-3 py-1 text-sm text-white"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              className="rounded bg-white px-3 py-1 text-sm text-pink-600 font-medium"
              onClick={async () => {
                onClose();
                toast.loading("Editing Campaign...", {
                  id: 2,
                });
                try {
                  await editCall({
                    args: [campaignId, newTitle, newDesc, image],
                  });
                  toast.success("Edited Succesfully", {
                    id: 2,
                  });

                  setTimeout(() => {
                    // Code to run
                    navigate("/");
                  }, 5000);
                } catch (error) {
                  toast.error("Error Editing campaign.", {
                    id: 2,
                  });
                  console.error(error);
                }
              }}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditCampaign;
