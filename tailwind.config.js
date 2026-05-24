/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        night: '#050816',
        midnight: '#0B1026',
        deepSpace: '#171B3A',
        cosmicPurple: '#6D5DF2',
        pinkSoft: '#F8BBD0',
        starSilver: '#C7D2FE',
      },
      fontFamily: {
        heading: ['Playfair Display', 'Cormorant Garamond', 'Georgia', 'serif'],
        body: ['Inter', 'Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 24px 80px rgba(0, 0, 0, 0.34), inset 0 1px 0 rgba(255, 255, 255, 0.12)',
        soft: '0 0 30px rgba(199, 210, 254, 0.18)',
        pink: '0 0 34px rgba(248, 187, 208, 0.28)',
      },
    },
  },
  plugins: [],
}
