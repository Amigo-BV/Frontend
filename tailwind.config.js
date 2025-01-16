/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Tailwind를 적용할 파일 경로
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          500: '#d45b90', // 프로젝트 전용 핑크
        },
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'], // 폰트 추가
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // 플러그인 추가
  ],
};
