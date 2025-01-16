import React from 'react';

const LocationPermission = ({ next }) => {
  const handleAllow = () => {
    next(); // 다음 화면으로 이동
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-white font-['Inter'] flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center px-5">
        {/* Location Icon */}
        <div className="mt-[280px] mb-12">
          <div className="w-32 h-32 text-pink-500">
            {/* Placeholder for location icon */}
            <div className="w-20 h-20 bg-pink-500 mx-auto" 
                 style={{ clipPath: 'polygon(50% 0%, 100% 100%, 50% 85%, 0% 100%)' }} />
          </div>
        </div>

        {/* Text Content */}
        <div className="w-[374px] text-center space-y-2">
          <h1 className="text-[28px] font-bold text-[#070f26]">
            Turn on Location
          </h1>
          <p className="text-base font-light text-[#070f26] mx-auto w-[242px]">
            We need your location<br />
            to find matches near you.
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="p-5 space-y-6">
        {/* Divider Line */}
        <div className="h-px bg-[#f8f8f8]" />

        {/* Info Text */}
        <div className="flex items-center gap-2.5 mx-5">
          <div className="w-[21px] h-[21px] flex items-center justify-center">
            <div className="w-4 h-4 rounded-full border border-pink-500 flex items-center justify-center">
              <span className="text-pink-500 text-xs">i</span>
            </div>
          </div>
          <p className="text-base font-medium text-[#070f26]">
            Your location will help us show you potential matches nearby.
          </p>
        </div>

        {/* Turn on Location Button */}
        <button 
          onClick={handleAllow}
          className="w-full p-5 bg-pink-500 rounded-[20px] text-white text-xl font-bold"
        >
          Turn on Location
        </button>
      </div>
    </div>
  );
};

export default LocationPermission;