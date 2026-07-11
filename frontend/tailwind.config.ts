import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: '#C9A84C',
        'gold-light': '#E8D5A8',
        'gold-dark': '#A8883E',
        primary: '#0A0A0A',
        secondary: '#111111',
      },
      fontFamily: {
        sans: ['Vazirmatn', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
