import React, { useState, useEffect } from 'react';

const VerificationCode = ({ next, back }) => {
  const [timeLeft, setTimeLeft] = useState(180); // 타이머 시간 (3분 = 180초)
  const [code, setCode] = useState(['', '', '', '']); // 코드 입력값 상태 (4자리 코드)

  // 타이머 업데이트 함수
  useEffect(() => {
    if (timeLeft === 0) return; // 타이머가 0일 때 멈추도록 설정

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1); // 1초씩 감소
    }, 1000);

    return () => clearInterval(timerId); // 컴포넌트 언마운트 시 타이머 정리
  }, [timeLeft]); // timeLeft가 변경될 때마다 useEffect가 실행

  // 타이머 표시 형식: 00:00
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // 숫자 입력 처리
  const handleInput = (digit) => {
    const updatedCode = [...code];
    const firstEmptyIndex = updatedCode.findIndex((digit) => digit === ''); // 첫 번째 빈 자리를 찾아서
    if (firstEmptyIndex !== -1) {
      updatedCode[firstEmptyIndex] = digit; // 빈 자리에 숫자 입력
      setCode(updatedCode);
    }
  };

  // 숫자 제거 처리 (삭제 버튼 클릭)
  const handleDelete = () => {
    const updatedCode = [...code];
    const lastFilledIndex = updatedCode.lastIndexOf(''); // 마지막으로 입력된 자리 찾기
    if (lastFilledIndex === -1) {
      // 마지막 자리가 비어 있지 않으면 마지막 숫자 지우기
      updatedCode[updatedCode.length - 1] = ''; // 마지막 숫자 삭제
    } else {
      updatedCode[lastFilledIndex - 1] = ''; // 마지막으로 입력된 자리를 삭제
    }
    setCode(updatedCode);
  };

  // Submit 버튼 클릭 시
  const handleSubmit = () => {
    if (code.every((digit) => digit !== '')) { // 모든 자리 입력이 완료되었는지 확인
      next(); // 다음 화면으로 이동
    } else {
      alert('Please enter the complete code.'); // 코드가 완성되지 않았을 경우 알림
    }
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-white font-['Inter'] p-4">
      {/* Back Button */}
      <div className="mt-12">
        <button
          className="w-[50px] h-[50px] border-2 border-[#070f26] rounded-xl flex items-center justify-center"
          onClick={back} // 뒤로가기 클릭 시 이전 화면으로 돌아가기
        >
          ←
        </button>
      </div>

      {/* Timer and Instructions */}
      <div className="mt-16 text-center">
        <div className="text-[40px] font-bold text-[#070f26] mb-2">{formatTime(timeLeft)}</div>
        <p className="text-base text-[#070f26]">
          Enter the verification code<br />
          we sent to your phone.
        </p>
      </div>

      {/* Code Input Display */}
      <div className="mt-16 flex justify-between px-8">
        {code.map((digit, index) => {
          let style = 'w-[77px] h-[95px] rounded-2xl flex items-center justify-center text-[40px]';
          if (digit !== '') {
            style += ' bg-pink-500 text-white';
          } else {
            style += ' border-4 border-gray-400 text-gray-400';
          }
          return (
            <div key={index} className={style}>
              {digit}
            </div>
          );
        })}
      </div>

      {/* Number Pad */}
      <div className="mt-16 px-4">
        {[
          ['1', '2', '3'],
          ['4', '5', '6'],
          ['7', '8', '9'],
          ['', '0', 'x']
        ].map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-between mb-4">
            {row.map((num, colIndex) => (
              <button
                key={colIndex}
                className="w-[100px] h-[75px] text-[32px] text-[#070f26]"
                onClick={() => {
                  if (num === 'x') {
                    handleDelete(); // 'x'를 클릭하면 마지막 입력된 숫자 삭제
                  } else {
                    handleInput(num); // 숫자 클릭 시 입력 처리
                  }
                }}
              >
                {num}
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <div className="mt-8">
        <button
          onClick={handleSubmit}
          className="w-full py-4 bg-pink-500 text-white rounded-xl font-bold text-lg"
        >
          Submit
        </button>
      </div>

      {/* Resend Code */}
      <div className="fixed bottom-8 left-0 right-0 flex flex-col items-center">
        <button className="text-lg font-semibold text-[#070f26]">
          Resend the code
        </button>
        <div className="w-[154px] h-1.5 bg-pink-500 rounded-full mt-1" />
      </div>
    </div>
  );
};

export default VerificationCode;
