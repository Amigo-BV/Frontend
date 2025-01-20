import React from 'react';

const ExtendedProfile = ({ back, userData }) => {
  // userData가 없을 경우 기본값 처리
  if (!userData) {
    return (
      <div className="w-full max-w-md mx-auto min-h-screen bg-white p-4">
        <p>Loading...</p>
        <button
          onClick={back}
          className="w-full py-4 bg-gray-500 text-white rounded-xl font-bold text-lg"
        >
          Back
        </button>
      </div>
    );
  }

  // 이미지 URL
  const profileImageUrl = userData.profileImageCID
    ? `https://gateway.pinata.cloud/ipfs/${userData.profileImageCID}`
    : '/assets/Image.png'; // 기본 이미지

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-white font-['Inter'] p-4">
      <div className="w-[414px] h-auto flex-col items-center bg-white">
        {/* Header Section (프로필 메인 이미지) */}
        <div className="w-full h-[505px] shadow-md relative">
          <img
            src={profileImageUrl} 
            alt="User Background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Profile Info */}
        <div className="px-5 mt-5">
          <h1 className="text-2xl font-black text-gray-900">
            {userData.username || 'Loading...'}
            <span className="font-medium">, 20</span>
          </h1>
          <p className="text-sm font-medium text-gray-700 mt-2">
            {/* 사용자가 입력한 추가 정보가 없을 경우 기본 텍스트 */}
            {userData.about || 'This user has not provided any additional information.'}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-4 px-5">
          {[
            { label: "Aries", icon: "/assets/Star.png" },
            { label: "Non-Smoker", icon: "/assets/Smoking.png" },
            { label: "Occasional Drinker", icon: "/assets/Glass.png" },
            { label: "Vaccinated", icon: "/assets/Mask.png" },
          ].map((tag, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-3 py-1 bg-pink-100/50 border border-pink-200 rounded-full"
            >
              <img src={tag.icon} alt={tag.label} className="w-4 h-4 object-contain" />
              <span className="text-pink-700 text-sm font-medium">{tag.label}</span>
            </div>
          ))}
        </div>

        {/* Favorite Music */}
        <div className="mt-6 px-5">
          <h2 className="text-base font-bold text-gray-900">Favorite Music</h2>
          <div className="flex gap-4 mt-3">
            {[
              { genre: "Punk", img: "/assets/Container.png" },
              { genre: "Rock", img: "/assets/Checkbox.png" },
              { genre: "Pop", img: "/assets/Switch.png" },
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
            {[
              { img: "/assets/Tooltip.png", alt: "Instagram 1" },
              { img: "/assets/Tooltip2.png", alt: "Instagram 2" },
              { img: "/assets/Tooltip3.png", alt: "Instagram 3" },
              { img: "/assets/Tooltip4.png", alt: "Instagram 4" },
              { img: "/assets/Tooltip5.png", alt: "Instagram 5" },
            ].map((photo, index) => (
              <img
                key={index}
                src={photo.img}
                alt={photo.alt}
                className="w-full h-[100px] rounded-lg object-cover"
              />
            ))}
          </div>
        </div>

        {/* Add margin-top to separate Back button from Instagram photos */}
        <div className="mt-8">
          <button
            onClick={back}
            className="w-full py-4 bg-gray-500 text-white rounded-xl font-bold text-lg"
          >
            Back
          </button>
        </div>

        {/* Actions */}
        <div className="mt-6 px-5 text-center">
          <button className="text-red-500 text-sm font-medium">
            Share {userData.username}'s Profile
          </button>
          <div className="mt-2">
            <button className="text-gray-700 text-sm font-medium">
              Report {userData.username}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtendedProfile;
