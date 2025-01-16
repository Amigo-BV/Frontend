import React, { useEffect } from 'react';

const SplashScreen = ({ next }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      next(); // 다음 화면으로 이동
    }, 3000);

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, [next]);

  return (
    <div
      className="w-full max-w-md mx-auto min-h-screen bg-white flex flex-col items-center justify-center font-['Inter']"
      onClick={next}
    >
      <div className="flex flex-col items-center gap-2">
        {/* public/assets 폴더에 있는 로고 이미지 */}
        <img
          src="/assets/AMIGO LOGO.png" // public/assets 폴더에서 이미지 가져오기
          alt="Amigo Logo"
          className="w-16 h-16 object-contain" // 원하는 크기로 이미지 조정
        />
        <div className="text-4xl font-black text-pink-500">AMIGO</div>
      </div>
    </div>
  );
};

export default SplashScreen;
