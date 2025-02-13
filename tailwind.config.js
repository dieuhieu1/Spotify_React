/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}",
    "./node_modules/@shadcn/ui/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: "#121212",
        bgPrimary: "#181818",
        bgHover: "#2a2a2a",
        textPrimary: "#A7A7A7",
        padding: "#2A2A2A",
      },
      backgroundImage: {
        loginImg:
          "url('https://cdn.pixabay.com/photo/2024/02/17/16/08/ai-generated-8579704_1280.jpg')",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
