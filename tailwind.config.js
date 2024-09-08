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
    boxShadow: {
      "inset-1": "inset 0px 0px 2px 2px rgba(111, 4, 20, 0.4)",
      "inset-2": "inset 0px 0px 2px 2px rgba(0, 0, 0, 0.4)",
      "body-inset": "inset 0px 0px 10px 3px var(--shadowBase)",
      ridge:
        "-5px -5px 0px -1px var(--shadowBase) inset, 5px 5px 5px -3px rgba(255, 255, 255, 0.51) inset",
      "ridge-1":
        "-5px -5px 0px -1px var(--shadowBase) inset, 0px 5px 5px -3px rgba(255, 255, 255, 0.51) inset",
    },
    dropShadow: {
      deep: "0px 0px 10px rgba(50, 50, 50, 0.8)",
      "deep-down": "5px 7px 9px var(--shadowBase)",
    },
    zIndex: {
      1: "1",
    },
  },
  plugins: [],
};
