/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  theme: {
    extend: {
      keyframes: {
        showSnackbarOnTop: {
          '0%':   { opacity: '0', transform: 'translate(-50%, 0)' },
          '100%': { opacity: '1', transform: 'translate(-50%, 20px)' },
        },
        hideSnackbarOnTop: {
          '0%':   { opacity: '1', transform: 'translate(-50%, 20px)' },
          '100%': { opacity: '0', transform: 'translate(-50%, 0)' },
        },
        showSnackbarOnBottom: {
          '0%':   { opacity: '0', transform: 'translate(-50%, 0)' },
          '100%': { opacity: '1', transform: 'translate(-50%, -20px)' },
        },
        hideSnackbarOnBottom: {
          '0%':   { opacity: '1', transform: 'translate(-50%, -20px)' },
          '100%': { opacity: '0', transform: 'translate(-50%, 0)' },
        },
      },
      animation: {
        showSnackbarOnTop: 'showSnackbarOnTop 0.5s forwards',
        hideSnackbarOnTop: 'hideSnackbarOnTop 0.5s forwards',
        showSnackbarOnBottom: 'showSnackbarOnBottom 0.5s forwards',
        hideSnackbarOnBottom: 'hideSnackbarOnBottom 0.5s forwards',
      },
    },
  },
 plugins: [
    plugin(({ addComponents }) => {
      addComponents({
        '.animate-showSnackbarOnTop': {
          animation: 'showSnackbarOnTop 0.5s forwards',
        },
        // ...
      });
    }),
  ],
  
};