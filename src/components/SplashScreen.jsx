import React, { useState } from 'react';
import { ethers } from 'ethers';

const SplashScreen = ({ next }) => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [isSigning, setIsSigning] = useState(false);

  /**
   * 1) 메타마스크 연결
   */
  const connectMetamask = async () => {
    try {
      if (!window.ethereum) {
        alert('메타마스크가 설치되어 있지 않습니다. 먼저 설치해주세요!');
        return;
      }

      // 메타마스크 연결(계정 요청)
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);

      if (accounts && accounts.length > 0) {
        setCurrentAccount(accounts[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * 2) 메시지 서명
   *    예: "Login: {address}" 형태
   */
  const signLoginMessage = async () => {
    if (!window.ethereum) {
      alert('메타마스크가 필요합니다.');
      return;
    }
    if (!currentAccount) {
      alert('메타마스크 연결을 먼저 해주세요.');
      return;
    }

    try {
      setIsSigning(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // 백엔드 예시: `Login: {address}`
      const message = `Login: ${currentAccount}`;

      // 서명 요청
      const signature = await signer.signMessage(message);
      console.log('User signature:', signature);

      next(); // 다음 화면으로 이동
    } catch (error) {
      console.error(error);
    } finally {
      setIsSigning(false);
    }
  };

  return (
    <div
      className="w-full max-w-md mx-auto min-h-screen bg-white flex flex-col items-center font-['Inter'] relative"
    >
      {/* 중앙 로고 */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
        <img
          src="/assets/AMIGO LOGO.png"
          alt="Amigo Logo"
          className="w-16 h-16 object-contain"
        />
        <div className="text-4xl font-black text-pink-500">AMIGO</div>
      </div>

      {/* 하단 버튼 */}
      <div className="w-full px-4 absolute bottom-8">
        {!currentAccount && (
          <button
            onClick={connectMetamask}
            className="w-full px-4 py-2 bg-pink-500 text-white rounded"
          >
            Connect to Wallet
          </button>
        )}

        {currentAccount && !isSigning && (
          <button
            onClick={signLoginMessage}
            className="w-full px-4 py-2 bg-green-500 text-white rounded"
          >
            로그인 서명하기
          </button>
        )}

        {isSigning && (
          <p className="text-center text-gray-500 mt-4">
            서명 중입니다. 메타마스크에서 승인해주세요...
          </p>
        )}
      </div>
    </div>
  );
};

export default SplashScreen;
