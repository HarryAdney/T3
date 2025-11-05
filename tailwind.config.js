/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        parchment: {
          50: '#fdfbf7',
          100: '#faf6ed',
          200: '#f5edd8',
          300: '#ede0be',
          400: '#e3cf9f',
          500: '#d9bd80',
          600: '#c9a860',
          700: '#a8884d',
          800: '#86693d',
          900: '#6b5331',
        },
        sage: {
          50: '#f6f7f4',
          100: '#eef0e9',
          200: '#dde2d3',
          300: '#c4cdb5',
          400: '#a8b492',
          500: '#8d9a73',
          600: '#748060',
          700: '#5d674d',
          800: '#4c543f',
          900: '#404636',
        },
        stone: {
          50: '#f8f8f7',
          100: '#efeeec',
          200: '#dddbd7',
          300: '#c4c1bb',
          400: '#a8a39a',
          500: '#918b81',
          600: '#7a746b',
          700: '#65615a',
          800: '#55524c',
          900: '#494641',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'serif'],
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 2px 6px -2px rgba(0, 0, 0, 0.05)',
        'soft-lg': '0 10px 40px -10px rgba(0, 0, 0, 0.1), 0 4px 10px -4px rgba(0, 0, 0, 0.06)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      backgroundImage: {
        'texture': "url(\"data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' /%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E\")",
      },
      typography: {
        DEFAULT: {
          css: {
            lineHeight: '1.7',
            h1: {
              fontFamily: 'Georgia, serif',
            },
            h2: {
              fontFamily: 'Georgia, serif',
            },
            h3: {
              fontFamily: 'Georgia, serif',
            },
          },
        },
      },
    },
  },
  plugins: [],
};
