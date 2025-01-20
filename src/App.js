import React, { useState } from 'react';
import SplashScreen from './components/SplashScreen';
import LoginScreen from './components/LoginScreen';
import VerificationCode from './components/VerificationCode';
import ProfileForm from './components/ProfileForm';
import LocationPermission from './components/LocationPermission';
import DiscoveryLoading from './components/DiscoveryLoading';
import ProfilePreview from './components/ProfilePreview';
import ExtendedProfile from './components/ExtendedProfile';
import MessagesAndMatches from './components/MessagesAndMatches';

function App() {
  const [screen, setScreen] = useState('splash'); // 현재 화면 상태
  const [userData, setUserData] = useState({});   // 유저 데이터 상태
  const [previousScreen, setPreviousScreen] = useState(null); // 이전 화면 상태

  // 다음 화면으로 이동
  const goToNextScreen = (nextScreen, data = {}) => {
    setPreviousScreen(screen);
    setUserData((prev) => ({ ...prev, ...data }));
    setScreen(nextScreen);
  };

  // 이전 화면으로 이동
  const goToPreviousScreen = () => {
    if (previousScreen) {
      setScreen(previousScreen);
    }
  };

  // 화면 렌더링
  const renderScreen = () => {
    switch (screen) {
      case 'splash':
        return (
          <SplashScreen
            next={(data) => goToNextScreen('login', data)} // 지갑 주소와 서명 저장
          />
        );
      case 'login':
        return (
          <LoginScreen
            next={(phone) => goToNextScreen('verify', { phone })}
          />
        );
      case 'verify':
        return (
          <VerificationCode
            next={() => goToNextScreen('profile')}
            back={goToPreviousScreen}
          />
        );
      case 'profile':
        return (
          <ProfileForm
            phone={userData.phone || ''}
            userAddress={userData.address || ''}
            signature={userData.signature || ''}
            next={(profileData) => goToNextScreen('location', profileData)}
          />
        );
      case 'location':
        return <LocationPermission next={() => goToNextScreen('loading')} />;
      case 'loading':
        return <DiscoveryLoading next={() => goToNextScreen('preview')} />;

      // ------------ 여기서부터 Preview / Extended / Messages ------------
      case 'preview':
        return (
          <ProfilePreview
            // ExtendedProfile로 갈 때 userData를 넘기려면
            next={(selectedUserData) => goToNextScreen('extended', { selectedUserData })}
            // MessagesAndMatches 화면으로 이동
            messages={() => goToNextScreen('messages')}
          />
        );
      case 'extended':
        return (
          <ExtendedProfile
            // 뒤로가기 시 preview로 돌아감
            back={() => goToNextScreen('preview')}
            // userData 안에 selectedUserData가 담겨 있음
            userData={userData.selectedUserData}
          />
        );
      case 'messages':
        return (
          <MessagesAndMatches 
            // 여기서 로고 클릭 시 preview로 돌아가고 싶다면,
            next={(scr) => goToNextScreen(scr)} 
          />
        );
      default:
        // 예외 상황 - splash로 돌려보냄
        return <SplashScreen next={(data) => goToNextScreen('login', data)} />;
    }
  };

  return <div className="App">{renderScreen()}</div>;
}

export default App;
