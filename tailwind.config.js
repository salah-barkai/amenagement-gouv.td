/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#e6eef8',
          100: '#b3cce9',
          200: '#80aadb',
          300: '#4d88cc',
          400: '#2a6dbf',
          500: '#003F8A',
          600: '#00367a',
          700: '#002d6a',
          800: '#00235a',
          900: '#001a4a',
        },
        gold: {
          50:  '#fdf9e7',
          100: '#f9edb3',
          200: '#f5e17f',
          300: '#f1d54b',
          400: '#edca24',
          500: '#D4AF37',
          600: '#b8962e',
          700: '#9c7e25',
          800: '#80661c',
          900: '#644e13',
        },
        tchad: {
          blue:   '#003F8A',
          yellow: '#F5C518',
          red:    '#C0392B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-pattern': "linear-gradient(135deg, #003F8A 0%, #001a4a 100%)",
      },
    },
  },
  plugins: [],
}
