/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      xs: "360px",
      sm: "500px",
      md: "768px",
      lg: "1024px",
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
