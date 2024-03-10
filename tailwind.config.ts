import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#316FEA',
        'secondary': '#D3D8DC',
        'heading-text': '#1A1919',
        'main-text': '#060E1E',
      },
    },
  },
  plugins: [],
};
export default config;
