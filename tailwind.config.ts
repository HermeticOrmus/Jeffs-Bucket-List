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
        'xs': ['1rem', { lineHeight: '1.5' }],      // 16px
        'sm': ['1.125rem', { lineHeight: '1.6' }],  // 18px
        'base': ['1.25rem', { lineHeight: '1.7' }], // 20px
        'lg': ['1.5rem', { lineHeight: '1.75' }],   // 24px
        'xl': ['1.875rem', { lineHeight: '1.75' }], // 30px
        '2xl': ['2.25rem', { lineHeight: '1.8' }],  // 36px
        '3xl': ['3rem', { lineHeight: '1.8' }],     // 48px
      },
      // High contrast colors for better visibility
      colors: {
        // Warm, welcoming palette
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
        // Calming secondary
        secondary: {
          50: '#f0f7f7',
          100: '#e0efef',
          200: '#c2dfdf',
          300: '#a3cfcf',
          400: '#66afaf',
          500: '#298f8f',
          600: '#258181',
          700: '#1f6b6b',
          800: '#195656',
          900: '#154646',
        },
        // High contrast text
        text: {
          primary: '#1a1a1a',
          secondary: '#4a4a4a',
          muted: '#6a6a6a',
        }
      },
      // Generous spacing for easier interaction
      spacing: {
        '18': '4.5rem',   // 72px
        '22': '5.5rem',   // 88px
        '26': '6.5rem',   // 104px
        '30': '7.5rem',   // 120px
      },
      // Large touch targets (minimum 44x44px)
      minHeight: {
        'touch': '44px',
      },
      minWidth: {
        'touch': '44px',
      },
      // Smooth animations (not too fast)
      transitionDuration: {
        'slow': '400ms',
        'slower': '600ms',
      },
    },
  },
  plugins: [],
}

export default config
