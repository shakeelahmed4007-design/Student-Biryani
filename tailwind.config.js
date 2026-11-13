export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: 'var(--theme-primary)',
        saffron: 'var(--theme-accent)',
        chili: 'var(--theme-secondary)',
        cream: 'var(--theme-bg)',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        steam: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '50%': { opacity: 0.5 },
          '100%': { opacity: 0, transform: 'translateY(-12px)' },
        },
        slideUp: {
          from: { opacity: 0, transform: 'translateY(24px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        pop: {
          '0%': { transform: 'scale(0.85)', opacity: 0 },
          '70%': { transform: 'scale(1.04)', opacity: 1 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        floaty: {
          '0%,100%': { transform: 'translateY(0) rotate(-1deg)' },
          '50%': { transform: 'translateY(-8px) rotate(1.5deg)' },
        },
      },
      animation: {
        steam: 'steam 3s ease-in-out infinite',
        slideUp: 'slideUp .35s cubic-bezier(0.16, 1, 0.3, 1)',
        fadeIn: 'fadeIn .25s ease-out',
        pop: 'pop .25s ease-out',
        floaty: 'floaty 4.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
