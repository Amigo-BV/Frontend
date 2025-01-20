import React, { useEffect, useState } from "react";

const MessagesAndMatches = ({ next }) => {
  // 기존 하드코딩된 프로필
  const defaultProfiles = [
    { name: "Ammer", img: "/assets/Profile1.png" },
    { name: "Graham", img: "/assets/Profile2.png" },
    { name: "Dave", img: "/assets/Profile3.png" },
    { name: "Harry", img: "/assets/Profile4.png" },
    { name: "Ansel", img: "/assets/Profile5.png" },
  ];

  const [profiles, setProfiles] = useState(defaultProfiles);

  useEffect(() => {
    const savedData = localStorage.getItem('lastLikedUser');
    if (savedData) {
      const { username, profileImageUrl } = JSON.parse(savedData);
      if (username && profileImageUrl) {
        const newProfile = {
          name: username,
          img: profileImageUrl,
        };

        // 중복 체크
        setProfiles((prev) => {
          const alreadyExists = prev.some((item) => item.name === username);
          if (!alreadyExists) {
            return [newProfile, ...prev];
          } else {
            return prev;
          }
        });
      }
    }
  }, []);

  const handleLogoClick = () => {
    next("preview");
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-white p-4">
      {/* Top Navigation */}
      <div className="h-[100px]">
        <div className="h-8 bg-white" />
        <div className="h-[68px] px-4 flex justify-between items-center">
          <img
            src="/assets/AMIGO LOGO.png"
            alt="AMIGO Logo"
            className="w-[46px] h-[46px] rounded-lg cursor-pointer"
            onClick={handleLogoClick}
          />
          <img
            src="/assets/Messages.png"
            alt="Messages Icon"
            className="w-[46px] h-[46px] rounded-lg"
          />
          <img
            src="/assets/User.png"
            alt="User Icon"
            className="w-[46px] h-[46px] rounded-lg"
          />
        </div>
      </div>

      {/* New Matches Section */}
      <div className="px-6 mt-6">
        <div className="flex justify-start items-center">
          <h2 className="text-lg font-bold text-gray-900">New Matches</h2>
          <div className="ml-2 px-2 py-1 bg-pink-500 text-white text-xs font-bold rounded-full">
            {profiles.length}
          </div>
        </div>
        
        {/* 가로 스크롤 영역 */}
        <div className="flex gap-4 mt-4 overflow-x-auto">
          {profiles.map((profile, index) => (
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

      {/* Messages Section (하드코딩) */}
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
              className="flex items-center bg-white shadow rounded-lg p-4"
            >
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
