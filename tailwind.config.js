/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        /* Light theme base */
        paper:     '#f0eeea',
        paperdark: '#e8e4de',
        ink:       '#1a1614',
        inksoft:   '#4a4542',
        mist:      '#8a8480',
        /* Brand accents */
        gold:      '#c4933f',
        champagne: '#d4b896',
        ember:     '#c8622a',
        /* Dark sections */
        obsidian:  '#111010',
        /* Legacy */
        cream:     '#f0e8d8',
        ash:       '#6b6560',
        snow:      '#f5f3ef',
      },
      fontFamily: {
        display:  ['"Cormorant Garamond"', 'Georgia', 'serif'],
        script:   ['"Born Ready Slanted"', 'cursive'],
        body:     ['"Futura LT Pro"', '"DM Sans"', 'system-ui', 'sans-serif'],
        futura:   ['"Futura LT Pro"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        ultra: '0.5em',
        wide2: '0.3em',
        wide3: '0.4em',
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}
