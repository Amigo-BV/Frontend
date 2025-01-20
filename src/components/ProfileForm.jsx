import React, { useState } from 'react';
import axios from 'axios';

const ProfileForm = ({ next, phone }) => {
  const [gender, setGender] = useState("Female");
  const [showMe, setShowMe] = useState("Everyone");

  const [photos, setPhotos] = useState([null, null, null, null, null, null]);
  const [username, setUsername] = useState('');
  const [about, setAbout] = useState('');

  // 사진 업로드 핸들러
  const handlePhotoUpload = (index, event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      // photos[index] = { file, preview(base64) }
      const updatedPhotos = [...photos];
      updatedPhotos[index] = {
        file: file,
        preview: reader.result, // UI로 보여줄 base64
      };
      setPhotos(updatedPhotos);
    };
    reader.readAsDataURL(file); // base64 변환
  };

  // 제출 핸들러
  // 제출 핸들러
const handleSubmit = async () => {
  try {
    // 1) 대표 이미지(첫 번째 등록된 사진)
    const mainPhoto = photos.find((p) => p !== null);

    // 2) formData 생성
    const formData = new FormData();
    formData.append('username', username);
    formData.append('about', about);
    if (phone) {
      formData.append('phone', phone);
    }

    if (mainPhoto && mainPhoto.file) {
      formData.append('file', mainPhoto.file);
    }

    // 3) 백엔드 전송 (POST /users/register)
    const response = await axios.post(
      'http://localhost:3000/users/register',
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );

    // 간단한 성공 메시지 출력
    console.log('등록 성공!');
    alert('등록 성공!');

    // 4) 다음 화면으로 이동
    next && next(response.data);

  } catch (error) {
    console.error('회원가입 에러:', error);
    alert('회원가입 실패!');
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
                // base64 미리보기
                <img
                  src={photo.preview}
                  alt={`Uploaded ${index}`}
                  className="w-full h-full object-cover"
                />
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
        {/* Name -> username */}
        <div>
          <label className="block text-sm font-medium mb-2">My Name</label>
          <input
            type="text"
            placeholder="How would you like us to introduce you?"
            className="w-full p-3 bg-gray-100 rounded-xl"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* About -> about */}
        <div>
          <label className="block text-sm font-medium mb-2">About Me</label>
          <textarea
            placeholder="Share something interesting about yourself!"
            className="w-full p-3 bg-gray-100 rounded-xl resize-none h-24"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium mb-2">Gender</label>
          <div className="grid grid-cols-3 gap-2">
            {["Male", "Female", "Non-binary"].map((label) => (
              <button
                key={label}
                onClick={() => setGender(label)}
                className={`py-2 px-4 rounded-full border-2 ${
                  gender === label
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
                onClick={() => setShowMe(label)}
                className={`py-2 px-4 rounded-full border-2 ${
                  showMe === label
                    ? 'bg-pink-500 border-pink-500 text-white'
                    : 'border-pink-500 text-pink-500'
                } text-sm font-medium`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

      
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
