import ProgressBar from "@ramonak/react-progress-bar";
export default function InactiveCard({ data }) {
  const url = data.image;
  const gatewayUrl = `https://ipfs.io/ipfs/${url.split("//")[1]}`;
  const raisedPercent = data.raised / data.target;
  return (
    <div className="max-w-xs mx-auto w-72 bg-white rounded-lg shadow-md overflow-hidden h-full min-h-full opacity-50 cursor-not-allowed">
      <img
        src={gatewayUrl}
        className="w-full h-56 object-cover border-pink-500 border-b-4"
      />

      <div className="px-6 py-4">
        <h2 className="text-xl font-bold">{data.title}</h2>

        <p className="text-gray-600 mt-2">{data.description}</p>

        <div className="flex justify-between text-sm mt-4">
          <p>Target: {data.target} ETH</p>
          <p>Raised: {data.raised} ETH</p>
        </div>
      </div>

      <div className="w-4/5 m-auto mb-3">
        {raisedPercent * 100 > 1 ? (
          <ProgressBar completed={raisedPercent * 100} />
        ) : (
          <p className="text-center italic text-gray-300">
            **No Donations received**
          </p>
        )}
      </div>
    </div>
  );
}
