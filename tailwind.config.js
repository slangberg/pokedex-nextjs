module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--dot-gothic)", "sans-serif"],
        heading: ["var(--nanum-gothic)", "sans-serif"],
      },
    },
    backgroundImage: {
      screen: "url('/screen-background.png')",
      metal: "url('/red-metal.jpg')",
    },
    listStyleType: {
      square: "square",
    },
  },
  plugins: [],
};
