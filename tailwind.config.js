/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poetsen: ["Poetsen One", "sans-serif"],
        rethink: ["Rethink Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
