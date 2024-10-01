/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        secondary: "#2A8FBD",
        primary: "#0047AB",
        tertiary: "#004D78",
      },
    },
  },
  plugins: [],
};
