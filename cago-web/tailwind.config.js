/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "sans": ["Noto Sans KR", "sans-serif"],
      },
    },
    screens: {
      xs: "360px",
      sm: "500px",
      md: "768px",
      lg: "1024px",
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
