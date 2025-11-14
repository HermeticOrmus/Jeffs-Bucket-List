import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Senior-friendly font sizes (minimum 18px)
      fontSize: {
        'xs': ['1rem', { lineHeight: '1.5' }],
        'sm': ['1.125rem', { lineHeight: '1.6' }],
        'base': ['1.25rem', { lineHeight: '1.7' }],
        'lg': ['1.5rem', { lineHeight: '1.75' }],
        'xl': ['1.875rem', { lineHeight: '1.75' }],
        '2xl': ['2.25rem', { lineHeight: '1.8' }],
        '3xl': ['3rem', { lineHeight: '1.8' }],
        '4xl': ['3.75rem', { lineHeight: '1.8' }],
      },
      // Modern color palette
      colors: {
        brand: {
          50: '#fef7f0',
          100: '#fdeee0',
          200: '#fad9bc',
          300: '#f7c498',
          400: '#f19a50',
          500: '#eb7008',
          600: '#d46507',
          700: '#b15406',
          800: '#8e4305',
          900: '#743704',
        },
        primary: {
          50: '#fef7f0',
          100: '#fdeee0',
          200: '#fad9bc',
          300: '#f7c498',
          400: '#f19a50',
          500: '#eb7008',
          600: '#d46507',
          700: '#b15406',
          800: '#8e4305',
          900: '#743704',
        },
        secondary: {
          50: '#f0f9f9',
          100: '#d9f0f0',
          200: '#b3e0e0',
          300: '#8dd1d1',
          400: '#66c2c2',
          500: '#40b3b3',
          600: '#338f8f',
          700: '#266b6b',
          800: '#1a4848',
          900: '#0d2424',
        },
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
      },
      // Modern shadows
      boxShadow: {
        'glow': '0 0 20px rgba(235, 112, 8, 0.3)',
        'glow-lg': '0 0 40px rgba(235, 112, 8, 0.4)',
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
}

export default config
