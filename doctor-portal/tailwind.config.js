/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#228B22",
        secondary: "#4A90E2",
      },
    },
  },
  plugins: [],
};
