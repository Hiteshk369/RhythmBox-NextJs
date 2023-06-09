/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        darkText: "#b1b2b7",
        darkHeading: "#ebecf3",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
