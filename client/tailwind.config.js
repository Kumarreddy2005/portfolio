/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#080b10",
        panel: "#0e131b",
        line: "#1e2530",
        gold: "#c9a36a",
        goldSoft: "#e7cfa0",
        bone: "#efe9dd",
        fog: "#8a93a3",
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        body: ["'Inter'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
