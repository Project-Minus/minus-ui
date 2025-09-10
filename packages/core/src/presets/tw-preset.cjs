/** @type {import('tailwindcss').Config} */
module.exports = {
  // preset에는 content 넣지 마세요 (소비자 프로젝트가 책임)
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#f5f9ff',
          100: '#eaf2ff',
          500: '#3b82f6',
          600: '#2563eb',
        },
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
      fontFamily: {
        sans: ['var(--mi-font-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    // 필요한 경우
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/typography'),
  ],
}