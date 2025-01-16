import React from 'react';

const ProfileForm = ({ next }) => {
  const handleSubmit = () => {
    const profileData = { name: "John Doe", age: 30 }; // 샘플 데이터
    next(profileData); // 다음 화면으로 이동
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white min-h-screen p-4 pb-20 font-['Inter']">
      {/* Title */}
      <h1 className="text-xl font-bold mb-6">Create your profile!</h1>
      
      {/* Photo Grid */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <div key={index} className="relative aspect-[3/4] rounded-xl overflow-hidden">
            {/* 첫 두 칸은 이미지가 들어갈 자리 */}
            {index <= 2 ? (
              <div className="w-full h-full bg-gray-100" />
            ) : (
              <div className="w-full h-full bg-gray-100" />
            )}
            {/* 플러스 버튼 */}
            <div className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-white shadow flex items-center justify-center">
              <div className="w-4 h-4 text-pink-500">+</div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Photo Button */}
      <button className="w-full py-3 mb-6 border-2 border-pink-500 text-pink-500 rounded-xl font-medium">
        Add a photo to stand out.
      </button>

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
            {[
              { label: 'Male', selected: false },
              { label: 'Female', selected: true },
              { label: 'Non-binary', selected: false }
            ].map(({ label, selected }) => (
              <button
                key={label}
                className={`py-2 px-4 rounded-full border-2 ${
                  selected 
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
            {[
              { label: 'Male', selected: false },
              { label: 'Female', selected: false },
              { label: 'Everyone', selected: true }
            ].map(({ label, selected }) => (
              <button
                key={label}
                className={`py-2 px-4 rounded-full border-2 ${
                  selected 
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

      {/* Delete Account */}
      <button className="w-full text-pink-500 text-sm font-medium mt-8 mb-4">
        Delete My Account
      </button>

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