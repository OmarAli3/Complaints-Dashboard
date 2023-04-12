/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  important: true,
  theme: {
    extend: {
      minWidth: {
        sm: "10rem",
        md: "15rem",
      },
    },
  },
  plugins: [],
};
