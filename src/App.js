import React, { useState } from "react";
import SplashScreen from "./components/SplashScreen";
import LoginScreen from "./components/LoginScreen";
import VerificationCode from "./components/VerificationCode";
import ProfileForm from "./components/ProfileForm";
import LocationPermission from "./components/LocationPermission";
import DiscoveryLoading from "./components/DiscoveryLoading";
import ProfilePreview from "./components/ProfilePreview";
import ExtendedProfile from "./components/ExtendedProfile";
import MessagesAndMatches from "./components/MessagesAndMatches";

function App() {
  const [screen, setScreen] = useState("splash"); // 현재 화면 상태
  const [userData, setUserData] = useState({}); // 사용자 데이터를 저장
  const [previousScreen, setPreviousScreen] = useState(null); // 이전 화면 상태

  // 화면 변경 시 이전 화면을 저장
  const goToNextScreen = (nextScreen, data = {}) => {
    setPreviousScreen(screen); // 현재 화면을 이전 화면으로 저장
    setUserData((prev) => ({ ...prev, ...data })); // 사용자 입력 저장
    setScreen(nextScreen); // 다음 화면으로 이동
  };

  // 이전 화면으로 돌아가기
  const goToPreviousScreen = () => {
    if (previousScreen) {
      setScreen(previousScreen); // 이전 화면으로 이동
    }
  };

  const renderScreen = () => {
    switch (screen) {
      case "splash":
        return <SplashScreen next={() => goToNextScreen("login")} />;
      case "login":
        return <LoginScreen next={(phone) => goToNextScreen("verify", { phone })} />;
      case "verify":
        return <VerificationCode next={() => goToNextScreen("profile")} back={goToPreviousScreen} />;
      case "profile":
        return <ProfileForm next={(profileData) => goToNextScreen("location", profileData)} />;
      case "location":
        return <LocationPermission next={() => goToNextScreen("loading")} />;
      case "loading":
        return <DiscoveryLoading next={() => goToNextScreen("preview")} />;
      case "preview":
        return (
          <ProfilePreview
            next={() => goToNextScreen("extended")}
            messages={() => goToNextScreen("messages")}
          />
        );
      case "extended":
        return <ExtendedProfile back={() => goToNextScreen("preview")} />;
      case "messages":
        return <MessagesAndMatches />;
      default:
        return <SplashScreen next={() => goToNextScreen("login")} />;
    }
  };

  return <div className="App">{renderScreen()}</div>;
}

export default App;
