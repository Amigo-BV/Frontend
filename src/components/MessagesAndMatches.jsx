import React from "react";

const MessagesAndMatches = () => {
  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-white font-['Inter'] p-4">
      <h1 className="text-2xl font-bold text-[#070f26] mb-4">Messages and Matches</h1>
      {/* Header Section */}
      <div className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
        <div className="w-8 h-8 bg-gray-200 rounded-full flex justify-center items-center">
          {/* Logo Placeholder */}
        </div>
        <div className="flex gap-4">
          <div className="w-8 h-8 bg-pink-200 rounded-full flex justify-center items-center">
            {/* Chat Icon Placeholder */}
          </div>
          <div className="w-8 h-8 bg-gray-300 rounded-full flex justify-center items-center">
            {/* User Icon Placeholder */}
          </div>
        </div>
      </div>

      {/* New Matches Section */}
      <div className="px-6 mt-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-900">New Matches</h2>
          <div className="px-2 py-1 bg-pink-500 text-white text-xs font-bold rounded-full">
            15
          </div>
        </div>
        <div className="flex gap-4 mt-4 overflow-x-auto">
          {[
            { name: "Ammer", img: "https://via.placeholder.com/75x90" },
            { name: "Graham", img: "https://via.placeholder.com/75x90" },
            { name: "Dave", img: "https://via.placeholder.com/75x90" },
            { name: "Harry", img: "https://via.placeholder.com/75x90" },
            { name: "Ansel", img: "https://via.placeholder.com/75x90" },
          ].map((profile, index) => (
            <div key={index} className="flex flex-col items-center">
              <img
                src={profile.img}
                alt={profile.name}
                className="w-[75px] h-[90px] rounded-lg object-cover"
              />
              <span className="mt-2 text-sm font-medium text-gray-800">
                {profile.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Messages Section */}
      <div className="px-6 mt-8">
        <h2 className="text-lg font-bold text-gray-900">Messages</h2>
        <div className="mt-4 space-y-4">
          {[
            { name: "Patrick", message: "Say hi!", img: "https://via.placeholder.com/50x50" },
            { name: "Matt", message: "Say hi!", img: "https://via.placeholder.com/50x50" },
            { name: "Harry", message: "Say hi!", img: "https://via.placeholder.com/50x50" },
            { name: "Megan", message: "Say hi!", img: "https://via.placeholder.com/50x50" },
            { name: "Ammer", message: "Say hi!", img: "https://via.placeholder.com/50x50" },
            { name: "Dave", message: "Say hi!", img: "https://via.placeholder.com/50x50" },
          ].map((chat, index) => (
            <div
              key={index}
              className="flex items-center bg-white shadow rounded-lg p-4">
              <img
                src={chat.img}
                alt={chat.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="ml-4 flex-grow">
                <h3 className="text-sm font-medium text-gray-900">{chat.name}</h3>
                <p className="text-xs text-gray-600">{chat.message}</p>
              </div>
              <div className="text-gray-400">&gt;</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessagesAndMatches;
