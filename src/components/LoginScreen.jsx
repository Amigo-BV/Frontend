import React, { useState } from 'react';

const LoginScreen = ({ next }) => {
  const [phoneNumber, setPhoneNumber] = useState(''); // phoneNumber 상태 추가

  const handleContinue = () => {
    next(phoneNumber); // 입력된 전화번호를 next로 전달
  };

  const handleChange = (event) => {
    setPhoneNumber(event.target.value); // 전화번호 상태 업데이트
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white min-h-screen font-['Inter']">
      {/* Top Section with Logo */}
      <div
        className="relative pt-16 pb-8"
        style={{
          backgroundImage: 'url(/assets/Login.png)', // 배경 이미지 수정
          backgroundSize: 'cover', // 배경 이미지가 화면 크기에 맞게 커짐
          backgroundPosition: 'center', // 배경 이미지 중앙 배치
          backgroundRepeat: 'no-repeat', // 배경 이미지 반복 방지
        }}
      >
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* 버튼 이미지들을 배경에 맞춰 배치 */}
          <img
            src="/assets/button1.png"
            alt="Button 1"
            className="absolute top-20 right-12 w-20 h-20 z-10"
          />
          <img
            src="/assets/button2.png"
            alt="Button 2"
            className="absolute left-12 top-40 w-28 h-28 z-10"
          />
          <img
            src="/assets/button3.png"
            alt="Button 3"
            className="absolute right-8 top-64 w-24 h-24 z-10"
          />
        </div>

        {/* Center Logo */}
        <div className="relative z-10 flex justify-center mb-32">
          <img
            src="/assets/AMIGO LOGO.png"
            alt="AMIGO Logo"
            className="w-[130px] h-[130px] rounded-xl"
          />
        </div>

        {/* Find People Text */}
        <div className="relative text-center z-10">
          <h1 className="text-[32px] font-bold text-[#070f26] leading-tight">
            <span className="relative inline-block">
              Find people
              <div className="absolute h-8 bg-pink-500 w-32 -right-2 -z-10 top-1 rounded-md -rotate-2" />
            </span>
            <br />
            <span className="relative inline-block">
              near you
              <div className="absolute h-8 bg-pink-500 w-20 -right-2 -z-10 top-1 rounded-md -rotate-2" />
            </span>
          </h1>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="px-6 pt-8 pb-4">
        <h2 className="text-2xl font-bold text-[#070f26] mb-2">
          Enter your phone number
        </h2>
        <p className="text-base text-[#070f26] mb-4">
          We will send a 4-digit code to verify your account.
        </p>

        {/* Phone Input */}
        <div className="mb-6">
          <div className="w-full p-4 border-2 border-[#070f26] rounded-xl flex items-center">
            <div className="flex items-center gap-2">
              <span className="font-bold">kor +82</span>
              <span className="text-xs">▼</span>
            </div>
            <div className="mx-4 w-px h-6 bg-gray-200" />
            <input
              type="text"
              value={phoneNumber} // 상태로 관리되는 phoneNumber 값 바인딩
              onChange={handleChange} // 전화번호 입력 시 상태 업데이트
              className="w-full border-none outline-none font-bold text-[#070f26]"
              placeholder="Enter phone number"
            />
          </div>
        </div>

        <button
          onClick={handleContinue}
          className="w-full py-4 bg-pink-500 text-white rounded-xl font-bold text-lg"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default LoginScreen; // Default export 추가
