import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Senior-friendly font sizes (minimum 18px for all text)
      fontSize: {
        'xs': ['1.125rem', { lineHeight: '1.6' }],     // 18px - minimum readable size
        'sm': ['1.125rem', { lineHeight: '1.6' }],     // 18px - minimum readable size
        'base': ['1.25rem', { lineHeight: '1.7' }],    // 20px - preferred body text
        'lg': ['1.5rem', { lineHeight: '1.75' }],      // 24px - large text
        'xl': ['1.875rem', { lineHeight: '1.75' }],    // 30px - extra large
        '2xl': ['2.25rem', { lineHeight: '1.8' }],     // 36px - headings
        '3xl': ['3rem', { lineHeight: '1.8' }],        // 48px - large headings
        '4xl': ['3.75rem', { lineHeight: '1.8' }],     // 60px - hero headings
      },
      // Elegant royal blue and sage color palette
      colors: {
        brand: {
          50: '#f2f6f5',
          100: '#e3ede9',
          200: '#c4d9d1',
          300: '#aac9bc',
          400: '#92b3a5',
          500: '#7a9b8e',
          600: '#5f7d71',
          700: '#4a6158',
          800: '#354540',
          900: '#202928',
        },
        primary: {
          50: '#f2f6f5',
          100: '#e3ede9',
          200: '#c4d9d1',
          300: '#aac9bc',
          400: '#92b3a5',
          500: '#7a9b8e',
          600: '#5f7d71',
          700: '#4a6158',
          800: '#354540',
          900: '#1a2842',
        },
        secondary: {
          50: '#eff3f9',
          100: '#dce6f2',
          200: '#b3cbe3',
          300: '#89afd4',
          400: '#6a8cc2',
          500: '#5375ab',
          600: '#3d5e94',
          700: '#2c4875',
          800: '#22304f',
          900: '#1a2842',
        },
        success: {
          50: '#f1f7f3',
          100: '#e0ede5',
          200: '#bfdbc9',
          300: '#9ec9ad',
          400: '#84b096',
          500: '#6b9b7f',
          600: '#557c66',
          700: '#405d4c',
          800: '#2b3e33',
          900: '#161f19',
        },
        warning: {
          50: '#faf7f2',
          100: '#f4ede3',
          200: '#e8d9c4',
          300: '#dcc5a5',
          400: '#cca984',
          500: '#b8956d',
          600: '#937757',
          700: '#6e5a42',
          800: '#4a3c2c',
          900: '#251e16',
        },
        error: {
          50: '#faf3f3',
          100: '#f4e5e5',
          200: '#e8c9c9',
          300: '#dcadad',
          400: '#cc8a8a',
          500: '#b87070',
          600: '#935a5a',
          700: '#6e4343',
          800: '#4a2d2d',
          900: '#251616',
        },
      },
      // Refined shadows with sage glow
      boxShadow: {
        'glow': '0 0 20px rgba(122, 155, 142, 0.3)',
        'glow-lg': '0 0 40px rgba(122, 155, 142, 0.4)',
      },
      // Spacing
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      // Touch targets
      minHeight: {
        'touch': '44px',
        'touch-lg': '52px',
      },
      minWidth: {
        'touch': '44px',
        'touch-lg': '52px',
      },
      // Animations
      transitionDuration: {
        'slow': '400ms',
        'slower': '600ms',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-in': 'slide-in 0.4s ease-out',
      },
    },
  },
  plugins: [],
} satisfies Config
