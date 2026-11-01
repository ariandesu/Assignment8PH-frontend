/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f0f7f4',
          100: '#e0efe6',
          200: '#cbe2cd',
          300: '#aecfad',
          400: '#8db386',
          500: '#174D3B',
          600: '#123d2f',
          700: '#0e2e23',
          800: '#0a1f18',
          900: '#050f0b',
        },
        sage: '#D9E9D8',
        cream: '#F5F2E9',
        orange: '#EAA86B',
      },
      fontFamily: {
        heading: ['"Manrope"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      borderRadius: {
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
