import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}', // Catch-all
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF9900',
        secondary: '#222',
        overlay: 'rgba(0, 0, 0, 0.6)',
      },
      zIndex: {
        '-10': '-10',
        '0': '0',
        '1': '1',
        '5': '5',
        '10': '10',
        '20': '20',
        '30': '30',
        '40': '40',
        '50': '50',
        'auto': 'auto',
      },
    },
  },
  plugins: [],
};

export default config;
