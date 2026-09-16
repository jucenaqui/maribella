/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        fuchsia: '#D6236B',
        purple: '#4B2E63',
        beige: '#EDE3D3',
        ink: '#2A1838',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Outfit"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 24px 60px rgba(75, 46, 99, 0.14)',
      },
    },
  },
  plugins: [],
}
