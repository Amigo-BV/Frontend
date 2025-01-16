import React, { useState } from 'react';

const ProfileForm = ({ next }) => {
  const [gender, setGender] = useState("Female"); // 기본값을 "Female"로 설정
  const [showMe, setShowMe] = useState("Everyone"); // 기본값을 "Everyone"으로 설정
  const [photos, setPhotos] = useState([null, null, null, null, null, null]); // 사진 상태

  const handleSubmit = () => {
    const profileData = { name: "John Doe", age: 30, gender, showMe, photos }; // 프로필 데이터에 성별, ShowMe, 사진 추가
    next(profileData); // 다음 화면으로 이동
  };

  const handlePhotoUpload = (index, event) => {
    const updatedPhotos = [...photos];
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatedPhotos[index] = reader.result; // 선택된 사진을 해당 슬롯에 저장
        setPhotos(updatedPhotos);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white min-h-screen p-4 pb-20 font-['Inter']">
      {/* Title */}
      <h1 className="text-xl font-bold mb-6">Create your profile!</h1>

      {/* Photo Grid */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        {photos.map((photo, index) => (
          <div key={index} className="relative aspect-[3/4] rounded-xl overflow-hidden">
            {/* Display selected photo or default placeholder */}
            <div className={`w-full h-full ${photo ? 'bg-transparent' : 'bg-gray-100'}`}>
              {photo ? (
                <img src={photo} alt={`Uploaded ${index}`} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-100 flex justify-center items-center">
                  <span className="text-pink-500 text-3xl">+</span>
                </div>
              )}
            </div>

            {/* File input for uploading photo */}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handlePhotoUpload(index, e)}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        ))}
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-2">My Name</label>
          <input
            type="text"
            placeholder="How would you like us to introduce you?"
            className="w-full p-3 bg-gray-100 rounded-xl"
          />
        </div>

        {/* About */}
        <div>
          <label className="block text-sm font-medium mb-2">About Me</label>
          <textarea
            placeholder="Share something interesting about yourself!"
            className="w-full p-3 bg-gray-100 rounded-xl resize-none h-24"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium mb-2">Gender</label>
          <div className="grid grid-cols-3 gap-2">
            {["Male", "Female", "Non-binary"].map((label) => (
              <button
                key={label}
                onClick={() => setGender(label)} // 버튼 클릭 시 상태 변경
                className={`py-2 px-4 rounded-full border-2 ${
                  gender === label // 선택된 값에 따라 스타일 적용
                    ? 'bg-pink-500 border-pink-500 text-white' 
                    : 'border-pink-500 text-pink-500'
                } text-sm font-medium`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Show Me */}
        <div>
          <label className="block text-sm font-medium mb-2">Show Me</label>
          <div className="grid grid-cols-3 gap-2">
            {["Male", "Female", "Everyone"].map((label) => (
              <button
                key={label}
                onClick={() => setShowMe(label)} // 버튼 클릭 시 상태 변경
                className={`py-2 px-4 rounded-full border-2 ${
                  showMe === label // 선택된 값에 따라 스타일 적용
                    ? 'bg-pink-500 border-pink-500 text-white' 
                    : 'border-pink-500 text-pink-500'
                } text-sm font-medium`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Maximum Distance */}
        <div>
          <div className="flex justify-between text-sm font-medium mb-2">
            <span>Maximum Distance</span>
            <span>24km</span>
          </div>
          <input 
            type="range" 
            className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
            min="0"
            max="100"
            defaultValue={50}
          />
        </div>

        {/* Age Range */}
        <div>
          <div className="flex justify-between text-sm font-medium mb-2">
            <span>Age Range</span>
            <span>18-100+</span>
          </div>
          <input 
            type="range" 
            className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
            min="0"
            max="100"
            defaultValue={50}
          />
        </div>
      </div>

      {/* Save Button - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white">
        <div className="max-w-md mx-auto">
          <button 
            onClick={handleSubmit}
            className="w-full py-3 bg-pink-500 text-white rounded-xl font-medium">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
