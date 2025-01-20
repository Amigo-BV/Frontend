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
  const [screen, setScreen] = useState("splash"); 
  const [userData, setUserData] = useState({}); 
  const [previousScreen, setPreviousScreen] = useState(null);

  // 화면 변경 시 이전 화면 저장 + userData 업데이트
  const goToNextScreen = (nextScreen, data = {}) => {
    setPreviousScreen(screen);
    setUserData((prev) => ({ ...prev, ...data }));
    setScreen(nextScreen);
  };

  // 이전 화면으로 돌아가기
  const goToPreviousScreen = () => {
    if (previousScreen) {
      setScreen(previousScreen);
    }
  };

  const renderScreen = () => {
    switch (screen) {
      case "splash":
        return (
          <SplashScreen
            next={() => goToNextScreen("login")}
          />
        );
      case "login":
        return (
          <LoginScreen
            // phoneNumber 입력 후
            next={(phone) => goToNextScreen("verify", { phone })}
          />
        );
      case "verify":
        return (
          <VerificationCode
            // 인증코드 완료 후
            next={() => goToNextScreen("profile")}
            back={goToPreviousScreen}
          />
        );
      case "profile":
        // userData.phone을 넘겨줌 (ProfileForm에서 전화번호도 전송 가능)
        return (
          <ProfileForm
            phone={userData.phone || ""}
            next={(profileData) => goToNextScreen("location", profileData)}
          />
        );
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
        return <MessagesAndMatches next={() => goToNextScreen("profilePreview")} />;
      case "profilePreview":
        return <ProfilePreview next={() => goToNextScreen("extended")} />;
      default:
        return <SplashScreen next={() => goToNextScreen("login")} />;
    }
  };

  return <div className="App">{renderScreen()}</div>;
}

export default App;
