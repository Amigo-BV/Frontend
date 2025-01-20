import React, { useState } from 'react';
import axios from 'axios';
import {
  keccak256,
  toUtf8Bytes,
  BrowserProvider,
  getBytes,
} from 'ethers';

const ProfileForm = ({ next, phone, userAddress }) => {
  const [photos, setPhotos] = useState([null, null, null, null, null, null]);
  const [username, setUsername] = useState('');
  const [about, setAbout] = useState('');
  const [gender, setGender] = useState('Female'); 
  const [showMe, setShowMe] = useState('Everyone'); 

  const handlePhotoUpload = (index, event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const updated = [...photos];
      updated[index] = { file, preview: reader.result };
      setPhotos(updated);
    };
    reader.readAsDataURL(file);
  };

  const uploadImage = async () => {
    const mainPhoto = photos.find((p) => p !== null);
    if (!mainPhoto) {
      throw new Error('Please upload at least one image');
    }

    const formData = new FormData();
    formData.append('file', mainPhoto.file);

    const res = await axios.post(
      'http://localhost:3000/users/upload-image',
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );

    return res.data.cid;
  };

  const signRegisterMessage = async (cid) => {
    if (!window.ethereum) {
      throw new Error('MetaMask is required');
    }
    if (!userAddress) {
      throw new Error('User address is missing');
    }

    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    // 주소를 소문자로 변환
    const lowercasedAddress = userAddress.toLowerCase();

    // 서명 메시지 구성
    const domainString = `Register:${lowercasedAddress}:${username}:${phone || ''}:${about}:${cid}`;
    console.log('Original message:', domainString);

    const messageHash = keccak256(toUtf8Bytes(domainString));
    console.log('Message hash:', messageHash);

    // 메시지 해시의 바이트 형태로 서명
    const signature = await signer.signMessage(getBytes(messageHash));
    console.log('Signature:', signature);

    return signature;
  };

  const registerWithSig = async (signature, cid) => {
    const body = {
      user: userAddress,
      username,
      phone: phone || '',
      about,
      gender,
      showMe,
      cid,
      signature,
    };

    const res = await axios.post('http://localhost:3000/users/register-with-sig', body);
    return res.data;
  };

  const handleSubmit = async () => {
    try {
      const cid = await uploadImage();
      const signature = await signRegisterMessage(cid);
      const { success, txHash } = await registerWithSig(signature, cid);

      if (success) {
        alert(`Registration successful! Transaction: ${txHash}`);
        next && next({ txHash });
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white min-h-screen p-4 pb-20 font-['Inter']">
      <h1 className="text-xl font-bold mb-6">Create your profile!</h1>

      {/* Photo Grid */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        {photos.map((photo, index) => (
          <div key={index} className="relative aspect-[3/4] rounded-xl overflow-hidden">
            <div className={`w-full h-full ${photo ? 'bg-transparent' : 'bg-gray-100'}`}>
              {photo ? (
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
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handlePhotoUpload(index, e)}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        ))}
      </div>

      {/* Username */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">My Name</label>
        <input
          type="text"
          className="w-full p-3 bg-gray-100 rounded-xl"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Name"
        />
      </div>

      {/* About */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">About Me</label>
        <textarea
          className="w-full p-3 bg-gray-100 rounded-xl resize-none h-24"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          placeholder="Tell us about yourself"
        />
      </div>

      {/* Gender */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Gender</label>
        <div className="grid grid-cols-3 gap-2">
          {['Male', 'Female', 'Non-binary'].map((label) => (
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
      <div className="mb-20">
        <label className="block text-sm font-medium mb-2">Show Me</label>
        <div className="grid grid-cols-3 gap-2">
          {['Male', 'Female', 'Everyone'].map((label) => (
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

      {/* Submit */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white">
        <div className="max-w-md mx-auto">
          <button
            onClick={handleSubmit}
            className="w-full py-3 bg-pink-500 text-white rounded-xl font-medium"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
