/* eslint-disable global-require */
/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xxxs: '375px',
      xxs: '390px',
      xs: '505px',
      ...defaultTheme.screens,
    },
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '6rem',
        '2xl': '8rem',
      },
    },
    extend: {
      colors: {
        'grey-100': '#F7F9FD',
        'grey-200': '#D9DFED',
        'grey-300': '#B8BECC',
        'grey-400': '#9EA4B3',
        'skyblue-100': '#C9D8F8',
        'skyblue-200': '#B7CBF5',
        'skyblue-300': '#A8C1F5',
        'skyblue-400': '#93B0FF',
        'skyblue-500': '#636D88',
        'skyblue-600': '#383E4D',
        dark: '#1D1C1B',
        green: '#89CDB5',
        red: '#F97066',
      },
      fontSize: {
        '3xl': '1.6875rem !important',
      },
      borderRadius: {
        xl: '.625rem !important',
      },
      backgroundImage: {
        'body-texture-sm': "url('/assets/bg-bolero-sm.jpg')",
        'body-texture-md': "url('/assets/bg-bolero-lg.jpg')",
      },
      boxShadow: {
        xs: '0px 0px 5px rgba(0, 0, 0, 0.1)',
        'y-md': '0px 0px 6px -2px rgba(0, 0, 0, 0.1);',
        inner:
          'inset 0px 40px 40px -30px rgba(0,0,0,0.9), inset 0px -40px 40px -30px rgba(0,0,0,0.9);',
      },
      animation: {
        enter: 'enter 200ms ease-out',
        leave: 'leave 150ms ease-in forwards',
        fade: 'fadeIn 3s ease-in-out',
        fadelonger: 'fadeIn 6s ease-in-out',
        flip: 'flip 1s cubic-bezier(0, 0, 0.2, 1) infinite',
        moveSlideshow: 'moveSlideshow 10s linear infinite',
        text: 'textAnnimate 5s linear 1s infinite alternate',
      },
      keyframes: {
        enter: {
          '0%': { transform: 'scale(0.9)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        leave: {
          '0%': { transform: 'scale(1)', opacity: 1 },
          '100%': { transform: 'scale(0.9)', opacity: 0 },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        flip: {
          from: { transform: 'rotateX(0deg)', transformOrigin: '50% bottom ' },
          to: { transform: 'rotateX(180deg)', transformOrigin: '50% bottom ' },
        },
        shimmer: {
          '100%': {
            transform: 'translateX(100%)',
          },
        },
        moveSlideshow: {
          '100%': {
            transform: 'translateX(-66.6666%)',
          },
        },
        textAnnimate: {
          '30%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
    fontFamily: {
      satoshi: ['Satoshi', ...fontFamily.sans],
      larken: ['Larken', ...fontFamily.serif],
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('tailwind-scrollbar')({ nocompatible: true }),
    require('@headlessui/tailwindcss')({ prefix: 'ui' }),
  ],
};
