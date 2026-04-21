import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#18364A",
        accent: "#9DD0EF",
        sidebarGradientFrom: "#18364A",
        sidebarGradientTo: "#24506B",
        sidebarListHover: "#24425A",
      },
      borderRadius: {
        sidebar: "1.5rem",
        sidebarList: "0.75rem",
      },
      boxShadow: {
        neon: "0 0 8px 2px #9DD0EF, 0 0 16px 4px #9DD0EF55",
      },
    },
  },
  plugins: [],
};

export default config;
