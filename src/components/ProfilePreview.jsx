import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePreview = ({ next, messages, loggedInAddress }) => {
  const addresses = [
    '0x90F79bf6EB2c4f870365E785982E1f101E93b906',
    '0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65',
    '0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [reaction, setReaction] = useState(null);
  const [userData, setUserData] = useState({
    username: '',
    about: '',
    profileImageCID: '',
  });

  const targetAddress = addresses[currentIndex];

  // 1) 프로필 정보 로드
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/users/${targetAddress}`);
        setUserData(res.data);
      } catch (error) {
        console.error('유저 정보 가져오기 실패:', error);
        setUserData({ username: 'Unknown', about: 'N/A', profileImageCID: '' });
      }
    };
    fetchUserData();
  }, [targetAddress]);

  // 2) IPFS 이미지 URL
  const profileImageUrl = userData.profileImageCID
    ? `https://gateway.pinata.cloud/ipfs/${userData.profileImageCID}`
    : '/assets/Image.png';

  // 3) 좋아요 로직
  const handleLike = async () => {
    try {
      // 좋아요 전송 (토큰 transfer)
      await axios.post('http://localhost:3000/like/transfer', {
        to: targetAddress,
        amount: '1', 
      });
      alert(`좋아요 전송 성공! (to=${targetAddress})`);

      // **(A) 로컬 스토리지에 마지막 좋아요 대상 정보 저장**
      const lastLikedUser = {
        username: userData.username,
        // profileImageCID만 있으면, MessagesAndMatches에서 IPFS 경로로 바꿔야 하므로
        // 여기서 직접 url을 만들어 저장하거나, CID만 저장해도 됨
        profileImageUrl: profileImageUrl, 
      };
      localStorage.setItem('lastLikedUser', JSON.stringify(lastLikedUser));

      // 다음 프로필로 이동
      setCurrentIndex((prevIndex) => (prevIndex + 1) % addresses.length);
    } catch (error) {
      console.error('좋아요 전송 실패:', error);
      alert('좋아요 전송에 실패했습니다. 다시 시도해주세요.');
    }
  };

  // 4) Reaction 버튼
  const handleReactionClick = (reactionId) => {
    setReaction(reactionId);
    console.log(`Reaction ${reactionId} selected!`);

    if (reactionId === 1) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % addresses.length);
    } else if (reactionId === 2) {
      next(userData);
    } else if (reactionId === 3) {
      handleLike(); 
    }
  };

  const handleChatClick = () => {
    messages();
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
            className="w-[46px] h-[46px] rounded-lg"
          />
          <img
            src="/assets/Messages.png"
            alt="Messages Icon"
            className="w-[46px] h-[46px] rounded-lg"
            onClick={handleChatClick}
          />
          <img
            src="/assets/User.png"
            alt="User Icon"
            className="w-[46px] h-[46px] rounded-lg"
          />
        </div>
      </div>

      {/* Main Profile Card */}
      <div className="relative w-full h-[calc(100vh-100px)]">
        <div className="w-full h-full relative">
          <img
            src={profileImageUrl}
            alt="Profile Background"
            className="w-full h-full object-cover"
          />

          {/* Profile Info */}
          <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/50 to-transparent p-6 backdrop-blur-md">
            <div className="text-white">
              <h1 className="text-[28px] font-bold">
                {userData.username || 'Loading...'}
              </h1>
              <p className="text-lg">
                {userData.about || 'Fetching user details...'}
              </p>
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
                  className={`w-14 h-14 ${
                    reaction === btn.id ? 'bg-green-300' : 'bg-white'
                  } rounded-full flex items-center justify-center cursor-pointer`}
                  onClick={() => handleReactionClick(btn.id)}
                >
                  <img
                    src={btn.src}
                    alt={btn.alt}
                    className="w-8 h-8 object-contain"
                  />
                </div>
              ))}
            </div>

            {/* Reaction 결과 표시 */}
            {reaction && (
              <div className="text-white text-center mt-4">
                {reaction === 1 && 'Skip! (다음 프로필)'}
                {reaction === 2 && 'Thinking deeply... (확장 프로필)'}
                {reaction === 3 && 'You love this profile! (좋아요 전송)'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePreview;
