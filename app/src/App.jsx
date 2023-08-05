import { useEffect, useState } from "react";
import { ConnectWallet } from "@thirdweb-dev/react";
import { useContractRead, useContract, Web3Button } from "@thirdweb-dev/react";
import { useContractWrite } from "@thirdweb-dev/react";

const contractAddress = "0x964777d1CAB2f139D826ac51E416A25063B86612";
const abi = [
  {
    inputs: [],
    name: "get",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_num", type: "uint256" }],
    name: "set",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
export default function App() {
  const { contract } = useContract(contractAddress, abi);
  const { data, isLoading, error } = useContractRead(contract, "get");
  const { mutateAsync } = useContractWrite(contract, "set");
  const [number, setNumber] = useState();
  const [inputNum, setInputNum] = useState();
  const [transactionLoading, setTransactionLoading] = useState(false);
  async function readData() {
    setNumber(data);
    console.log(Number(number));
  }
  const handleInputChange = (e) => {
    const input = e.target.value;
    if (!isNaN(input)) {
      setInputNum(input);
    } else {
      setInputNum(0);
      alert("Enter only numbers");
    }
  };
  useEffect(() => {
    readData();
  }, [data]);
  return (
    <div className="bg-gradient-to-r from-purple-400 to-pink-500 h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold text-white">Full3</h1>
      <div className="flex justify-center mt-2">
        <p className="text-gray-900">Powered By</p>

        <a
          href="https://reactjs.org"
          target="_blank"
          className="text-gray-300 hover:text-gray-100 mx-2"
        >
          React.js
        </a>

        <a
          href="https://vitejs.dev"
          target="_blank"
          className="text-gray-300 hover:text-gray-100 mx-2"
        >
          VITE
        </a>

        <a
          href="https://hardhat.org"
          target="_blank"
          className="text-gray-300 hover:text-gray-100 mx-2"
        >
          Hardhat
        </a>

        <a
          href="https://thirdweb.com"
          target="_blank"
          className="text-gray-300 hover:text-gray-100 mx-2"
        >
          Thirdweb
        </a>
      </div>
      <p className="text-white font-bold text-lg mt-4 text-center">
        WEB3 Boilerplate setup in minutes
      </p>
      <div className="mt-10">
        <ConnectWallet theme="light" />
      </div>

      <h1 className="text-2xl font-bold text-white mt-12">
        Built by Mohammad Ayaan Siddiqui{" "}
        <a
          href="https://linktr.ee/ayaaneth"
          target="_blank"
          className="underline"
        >
          moayaan.eth
        </a>
      </h1>

      <div className="flex items-center mt-12">
        <input
          type="number"
          className="bg-white mr-4 px-3 py-2 rounded-lg"
          value={inputNum}
          onChange={handleInputChange}
        />
        {transactionLoading ? (
          <div className="flex items-center justify-center">
            <p className="text-black font-bold text-xl mr-4">
              Writing data on blockchain...
            </p>
            <div className="w-12 h-12 border-t-4 border-purple-600 border-solid rounded-full animate-spin"></div>
          </div>
        ) : (
          <button
            className="relative text-white px-6 py-3 font-semibold bg-purple-600 rounded-lg overflow-hidden group"
            onClick={async () => {
              setTransactionLoading(true);
              await mutateAsync({ args: [inputNum] }).then((res) => {
                setInputNum(0);
                setTransactionLoading(false);
              });
            }}
          >
            <div className="absolute w-full h-full bg-pink-500 left-0 top-0 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
            <div className="absolute w-full h-full bg-pink-500 left-0 top-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
            <div className="absolute w-full h-full bg-pink-500 left-0 top-0 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            <div className="absolute w-full h-full bg-pink-500 left-0 top-0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            <span className="relative z-10">Set Number</span>
          </button>
        )}
      </div>
      <div className="text-center mt-12">
        {isLoading ? (
          <p className="text-black font-bold text-xl">
            Fetching Number from Blockchain, please wait...
          </p>
        ) : (
          <p className="text-black font-bold text-xl">
            Number is {Number(number)}
          </p>
        )}

        {isLoading && (
          <div className="mt-4">
            <div className="w-12 h-12 border-t-4 border-purple-600 border-solid rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
}
