import type { Config } from "tailwindcss";
import plugin from 'tailwindcss/plugin'; 

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      letterSpacing: {
        'extra-tight': '-0.07em',
      },
      lineHeight: {
        'extra-loose': '2.5',
        '12': '2.2rem',
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        '.parent-padding': {
          '& > *': {
            padding: '10px', 
          },
        },
      });
    }),
  ],
};
export default config;
