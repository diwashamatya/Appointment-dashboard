/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "fade-in": "fade-in 200ms ease-in-out",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      fontFamily: {
        man: ["Montserrat", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        caveat: ["Caveat", "cursive"],
        marker: ["Permanent Marker", "cursive"],

        flower: ["Indie Flower", "cursive"],
        roboto: ["Roboto", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      boxShadow: {
        shado2: "0px 2px 8px 0px rgba(149, 157, 165, 0.2)",
      },
    },
  },
  plugins: [],
};
