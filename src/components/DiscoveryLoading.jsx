import React, { useEffect } from 'react';

const DiscoveryLoading = ({ next }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      next(); // 다음 화면으로 이동
    }, 3000);

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, [next]);

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-white flex flex-col items-center justify-between font-['Inter']">
      {/* Navbar */}
      <div className="h-[100px] flex flex-col w-full">
        {/* Status Bar */}
        <div className="h-8 bg-white" />
        
        {/* Navigation */}
        <div className="h-[68px] bg-white flex justify-between items-center px-2.5">
          {/* Left - Logo */}
          <div className="flex-1 flex justify-center">
            <img
              src="/assets/AMIGO LOGO.png"
              alt="Logo"
              className="w-[46px] h-[46px] rounded-lg"
            />
          </div>
          
          {/* Center */}
          <div className="flex-1 flex justify-center">
            <img
              src="/assets/Messages.png"
              alt="Message"
              className="w-[46px] h-[46px]"
            />
          </div>
          
          {/* Right */}
          <div className="flex-1 flex justify-center">
            <img
              src="/assets/User.png"
              alt="User"
              className="w-[46px] h-[46px]"
            />
          </div>
        </div>
      </div>

      {/* Loading Animation Container */}
      <div className="flex-1 flex items-center justify-center w-full">
        <div className="relative">
          {/* Outer Circle */}
          <div className="w-[125px] h-[125px] rounded-full bg-pink-500 opacity-50" />
          
          {/* Inner Circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <img
              src="/assets/AMIGO LOGO.png"
              alt="Inner Logo"
              className="w-[75px] h-[75px] rounded-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscoveryLoading;
