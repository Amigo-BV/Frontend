import React from "react";

const MessagesAndMatches = ({ next }) => {

  const handleLogoClick = () => {
    next("profilePreview"); // ProfilePreview로 이동
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-white font-['Inter'] p-4">
      {/* Top Navigation */}
      <div className="h-[100px]">
        {/* Status Bar */}
        <div className="h-8 bg-white" />
        
        {/* Nav Icons */}
        <div className="h-[68px] px-4 flex justify-between items-center">
          {/* Logo */}
          <img
            src="/assets/AMIGO LOGO.png" // 로고 이미지 경로
            alt="AMIGO Logo" // 대체 텍스트
            className="w-[46px] h-[46px] rounded-lg cursor-pointer" // 크기 및 스타일
            onClick={handleLogoClick} // 클릭 시 ProfilePreview로 이동
          />
          {/* Chat icon */}
          <img
            src="/assets/Messages.png" // 메시지 아이콘 경로
            alt="Messages Icon" // 대체 텍스트
            className="w-[46px] h-[46px] rounded-lg" // 크기 및 스타일
          />
          {/* Profile icon */}
          <img
            src="/assets/User.png" // 사용자 아이콘 경로
            alt="User Icon" // 대체 텍스트
            className="w-[46px] h-[46px] rounded-lg" // 크기 및 스타일
          />
        </div>
      </div>

      {/* New Matches Section */}
      <div className="px-6 mt-6">
        <div className="flex justify-start items-center">
          <h2 className="text-lg font-bold text-gray-900">New Matches</h2>
          <div className="ml-2 px-2 py-1 bg-pink-500 text-white text-xs font-bold rounded-full">
            15
          </div>
        </div>
        <div className="flex gap-4 mt-4 overflow-x-auto">
          {[
            { name: "Ammer", img: "/assets/Profile1.png" },
            { name: "Graham", img: "/assets/Profile2.png" },
            { name: "Dave", img: "/assets/Profile3.png" },
            { name: "Harry", img: "/assets/Profile4.png" },
            { name: "Ansel", img: "/assets/Profile5.png" },
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
            { name: "Patrick", message: "Say hi!", img: "/assets/A.png" },
            { name: "Matt", message: "Say hi!", img: "/assets/B.png" },
            { name: "Harry", message: "Say hi!", img: "/assets/C.png" },
            { name: "Megan", message: "Say hi!", img: "/assets/D.png" },
            { name: "Ammer", message: "Say hi!", img: "/assets/E.png" },
            { name: "Dave", message: "Say hi!", img: "/assets/F.png" },
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
