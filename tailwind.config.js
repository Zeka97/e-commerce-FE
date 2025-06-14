/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    spacing: {
      2: "2px",
      4: "4px",
      8: "8px",
      16: "16px",
      24: "24px",
      32: "32px",
      40: "40px",
      64: "64px",
      100: "100px",
      128: "128px",
    },
    extend: {
      backgroundImage: {
        "cart-icon": "url('/public/Cart.png')",
        login: "url('/public/login.png')",
      },
    },
  },
  plugins: [],
};
