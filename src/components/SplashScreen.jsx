import React, { useState } from 'react';
import { ethers } from 'ethers';

const SplashScreen = ({ next }) => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [isSigning, setIsSigning] = useState(false);

  const connectMetamask = async () => {
    try {
      if (!window.ethereum) {
        alert('메타마스크가 설치되어 있지 않습니다!');
        return;
      }
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      if (accounts && accounts.length > 0) {
        setCurrentAccount(accounts[0]);
      }
    } catch (error) {
      console.error('메타마스크 연결 실패:', error);
    }
  };

  const signLoginMessage = async () => {
    if (!currentAccount) {
      alert('먼저 메타마스크 연결을 해주세요');
      return;
    }
    try {
      setIsSigning(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const message = `Login: ${currentAccount}`;
      const signature = await signer.signMessage(message);
      console.log('User signature:', signature);

      // 지갑 주소와 서명 결과를 상위로 전달
      next({ address: currentAccount, signature });
    } catch (error) {
      console.error('서명 실패:', error);
    } finally {
      setIsSigning(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-white flex flex-col items-center font-['Inter'] relative">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
        <img
          src="/assets/AMIGO LOGO.png"
          alt="Amigo Logo"
          className="w-16 h-16 object-contain"
        />
        <div className="text-4xl font-black text-pink-500">AMIGO</div>
      </div>
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
