/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poetsen: ["Poetsen One", "sans-serif"],
        rethink: ["Rethink Sans", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        bg: "#F0F0F0",
        primary: "#2B3A67",
        accent: "#00BFA5",
        textColor: "#333333",
        highlight: "#FF7043",
        error: "#E57373",
      },
    },
  },
  plugins: [],
};
