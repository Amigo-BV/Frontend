import React from 'react';

const ProfilePreview = ({ next, messages }) => {
  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-white font-['Inter'] p-4">
      <h1 className="text-2xl font-bold text-[#070f26] mb-4">Profile Preview</h1>
      <button
        onClick={next}
        className="w-full py-4 bg-pink-500 text-white rounded-xl font-bold text-lg mb-4"
      >
        Next
      </button>
      <button
        onClick={messages}
        className="w-full py-4 bg-gray-500 text-white rounded-xl font-bold text-lg"
      >
        Messages
      </button>
      {/* Top Navigation */}
      <div className="h-[100px]">
        {/* Status Bar */}
        <div className="h-8 bg-white" />
        
        {/* Nav Icons */}
        <div className="h-[68px] px-4 flex justify-between items-center">
          {/* Logo placeholder */}
          <div className="w-[46px] h-[46px] bg-gray-100 rounded-lg" />
          {/* Chat icon placeholder */}
          <div className="w-[46px] h-[46px] bg-gray-100 rounded-lg" />
          {/* Profile icon placeholder */}
          <div className="w-[46px] h-[46px] bg-gray-100 rounded-lg" />
        </div>
      </div>

      {/* Main Profile Card */}
      <div className="relative w-full h-[calc(100vh-100px)]">
        {/* Profile Image Container */}
        <div className="w-full h-full relative">
          {/* Background Image Placeholder */}
          <div className="w-full h-full bg-gray-100" />

          {/* Location Badge */}
          <div className="absolute top-4 left-4 bg-white rounded-full py-2 px-4 flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-400 rounded-full" /> {/* Location icon placeholder */}
            <span className="text-[#070f26] font-medium">19km</span>
          </div>

          {/* Skip Button */}
          <div className="absolute top-4 right-4 bg-white rounded-full p-2">
            <div className="w-6 h-6 bg-gray-400" /> {/* Skip icon placeholder */}
          </div>

          {/* Dots Navigation */}
          <div className="absolute right-4 bottom-32 bg-white rounded-full p-2">
            <div className="space-y-1">
              {[1, 2, 3, 4].map((dot) => (
                <div key={dot} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
              ))}
            </div>
          </div>

          {/* Profile Info */}
          <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/50 to-transparent p-6">
            <div className="text-white">
              <h1 className="text-[28px] font-bold">Gabriel Taveira, 21</h1>
              <p className="text-lg">Let's turn good vibes into great moments!</p>
            </div>

            {/* Reaction Buttons */}
            <div className="flex justify-between mt-6 px-8">
              {[1, 2, 3].map((btn) => (
                <div key={btn} className="w-14 h-14 bg-white rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-gray-200 rounded-full" /> {/* Emoji placeholder */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePreview;