import React, { useState } from 'react'; 

const ProfilePreview = ({ next, messages }) => {
  const [reaction, setReaction] = useState(null);

  // Reaction 버튼 클릭 시 실행되는 함수
  const handleReactionClick = (reactionId) => {
    setReaction(reactionId); // 클릭한 반응 저장
    if (reactionId === 2) {  // 2번 버튼이 클릭되었을 때
      next(); // ExtendedProfile로 이동
    }
  };

  // Chat 아이콘 클릭 시 MessagesAndMatches로 이동하는 함수
  const handleChatClick = () => {
    messages(); // MessagesAndMatches로 이동
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
            className="w-[46px] h-[46px] rounded-lg" // 크기 및 스타일
          />
          {/* Chat icon */}
          <img
            src="/assets/Messages.png" // 메시지 아이콘 경로
            alt="Messages Icon" // 대체 텍스트
            className="w-[46px] h-[46px] rounded-lg" // 크기 및 스타일
            onClick={handleChatClick} // Chat 아이콘 클릭 시 함수 실행
          />
          {/* Profile icon */}
          <img
            src="/assets/User.png" // 사용자 아이콘 경로
            alt="User Icon" // 대체 텍스트
            className="w-[46px] h-[46px] rounded-lg" // 크기 및 스타일
          />
        </div>
      </div>

      {/* Main Profile Card */}
      <div className="relative w-full h-[calc(100vh-100px)]">
        {/* Profile Image Container */}
        <div className="w-full h-full relative">
          {/* Background Image */}
          <img
            src="/assets/Image.png" // 배경 이미지 경로
            alt="Background"
            className="w-full h-full object-cover" // 이미지 스타일: 전체 화면 채우기
          />

          {/* Location Badge */}
          <div className="absolute top-4 left-4 bg-white rounded-full py-2 px-4 flex items-center gap-2">
            <img
              src="/assets/Vector.png" // 위치 아이콘 경로
              alt="Location Icon"
              className="w-4 h-4 object-contain"
            />
            <span className="text-[#070f26] font-medium">19km</span>
          </div>

          {/* Skip Button */}
          <div className="absolute top-4 right-4 bg-white rounded-lg p-2 flex items-center justify-center">
            <img
              src="/assets/Return.png" // 반환 버튼 아이콘 경로
              alt="Return Icon"
              className="w-8 h-8 object-contain"
            />
          </div>

          {/* Profile Info */}
          <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/50 to-transparent p-6 backdrop-blur-md">
            <div className="text-white">
              <h1 className="text-[28px] font-bold">Gabriel Taveira, 21</h1>
              <p className="text-lg">Let's turn good vibes into great moments!</p>
            </div>

            {/* Reaction Buttons */}
            <div className="flex justify-between mt-6 px-8">
              {[
                { id: 1, src: "/assets/Confused.png", alt: "Confused Reaction" },
                { id: 2, src: "/assets/Thinking.png", alt: "Thinking Reaction" },
                { id: 3, src: "/assets/Heart.png", alt: "Heart Reaction" },
              ].map((btn) => (
                <div
                  key={btn.id}
                  className="w-14 h-14 bg-white rounded-full flex items-center justify-center"
                  onClick={() => handleReactionClick(btn.id)} // 반응 클릭 시 함수 실행
                >
                  {/* Reaction Icon */}
                  <img
                    src={btn.src}
                    alt={btn.alt}
                    className="w-8 h-8 object-contain"
                  />
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
