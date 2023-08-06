import React from "react";

const Card = ({ data }) => {
  return (
    <div className="max-w-xs mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <img
          src={data.imageUrl}
          alt={data.title}
          className="w-full h-56 object-cover border-pink-500 border-b-4"
        />
        <div className="absolute bottom-0 right-0 left-0 bg-black p-2 px-2 flex justify-between">
          <button
            className="bg-white text-pink-400 rounded-lg px-2 py-1 
                        hover:bg-gradient-to-r from-pink-100 to-pink-700 hover:text-black 
                        transition duration-500"
          >
            Details
          </button>

          <button
            className="bg-pink-500 text-white rounded-lg px-2 py-1
                        hover:bg-gradient-to-l from-purple-500 to-purple-700
                        transition duration-500"
          >
            Contribute
          </button>
        </div>
      </div>
      <div className="px-6 py-4">
        <h2 className="text-2xl font-semibold text-black">{data.title}</h2>
        <p className="text-gray-600 mt-2">{data.description}</p>
        <p className="text-gray-500 mt-2">Created at: {data.createdAt}</p>
      </div>
    </div>
  );
};

export default Card;
