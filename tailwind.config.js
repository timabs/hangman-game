/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poetsen: ["Poetsen One", "sans-serif"],
        protest: ["Protest Riot", "sans-serif"],
      },
    },
  },
  plugins: [],
};
