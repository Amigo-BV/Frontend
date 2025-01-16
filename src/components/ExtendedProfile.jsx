import React from 'react';

const ExtendedProfile = ({ back }) => {
  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-white font-['Inter'] p-4">
      <h1 className="text-2xl font-bold text-[#070f26] mb-4">Extended Profile</h1>
      <button
        onClick={back}
        className="w-full py-4 bg-gray-500 text-white rounded-xl font-bold text-lg"
      >
        Back
      </button>
      <div className="w-[414px] h-auto flex-col items-center bg-white">
        {/* Header Section */}
        <div className="w-full h-[505px] shadow-md relative">
          <div className="absolute top-4 left-4 p-2 bg-white/50 backdrop-blur rounded-lg">
            <span className="text-sm font-semibold text-gray-800">19km</span>
          </div>
          <img
            src="https://via.placeholder.com/414x505"
            alt="Profile background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Profile Info */}
        <div className="px-5 mt-5">
          <h1 className="text-2xl font-black text-gray-900">
            Gabriel Taveira<span className="font-medium">, 20</span>
          </h1>
          <p className="text-sm font-medium text-gray-700 mt-2">
            Studying Business at UCLA
          </p>
          <p className="text-sm text-gray-700 mt-2">
            Just a traveler from California, falling in love with Korea. 🇰🇷 Exploring
            Seoul, enjoying the food, and hoping to meet great people along the way!
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-4 px-5">
          {[
            { label: "Aries", icon: "" },
            { label: "Non-Smoker", icon: "" },
            { label: "Occasional Drinker", icon: "" },
            { label: "Vaccinated", icon: "" },
          ].map((tag, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-3 py-1 bg-pink-100/50 border border-pink-200 rounded-full"
            >
              <span>{tag.icon}</span>
              <span className="text-pink-700 text-sm font-medium">{tag.label}</span>
            </div>
          ))}
        </div>

        {/* Favorite Music */}
        <div className="mt-6 px-5">
          <h2 className="text-base font-bold text-gray-900">Favorite Music</h2>
          <div className="flex gap-4 mt-3">
            {[
              { genre: "Punk", img: "https://via.placeholder.com/150" },
              { genre: "Rock", img: "https://via.placeholder.com/150" },
              { genre: "Pop", img: "https://via.placeholder.com/150" },
            ].map((music, index) => (
              <div key={index} className="relative w-[150px] h-[150px]">
                <img
                  src={music.img}
                  alt={music.genre}
                  className="w-full h-full rounded-lg object-cover"
                />
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white text-sm font-medium">
                  {music.genre}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Instagram Photos */}
        <div className="mt-6 px-5">
          <h2 className="text-base font-bold text-gray-900">5 Instagram Photos</h2>
          <div className="grid grid-cols-3 gap-2 mt-3">
            {Array(5)
              .fill("https://via.placeholder.com/100")
              .map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Instagram ${index + 1}`}
                  className="w-full h-[100px] rounded-lg object-cover"
                />
              ))}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 px-5 text-center">
          <button className="text-red-500 text-sm font-medium">Share Gabriel’s Profile</button>
          <div className="mt-2">
            <button className="text-gray-700 text-sm font-medium">Report Gabriel</button>
          </div>
        </div>

        {/* Reaction Buttons */}
        <div className="mt-6 flex justify-around items-center">
          {[
            { emoji: "", label: "Dislike" },
            { emoji: "", label: "Think" },
            { emoji: "", label: "Like" },
          ].map((reaction, index) => (
            <button
              key={index}
              className="flex flex-col items-center text-gray-700 text-sm font-medium"
            >
              <span className="text-2xl">{reaction.emoji}</span>
              <span>{reaction.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExtendedProfile;
