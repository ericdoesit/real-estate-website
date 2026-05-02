import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
      },
      colors: {
        wheat: '#eadbbb',
        cream: '#efede8',
        'dark-green': '#48553f',
        goldenrod: '#eebd2d',
        crimson: '#db2727',
        charcoal: '#3b3932',
        'dark-footer': '#1a1a1a',
        muted: '#6B6B6B',
      },
      letterSpacing: {
        luxury: '0.1em',
      },
      fontSize: {
        h1: ['4.5rem', { lineHeight: '1.2', fontWeight: '600' }],
        h2: ['3rem', { lineHeight: '1.3', fontWeight: '600' }],
        h3: ['2rem', { lineHeight: '1.3', fontWeight: '600' }],
        h4: ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }],
        h5: ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],
        h6: ['1rem', { lineHeight: '1.5', fontWeight: '600' }],
      },
    },
  },
  plugins: [],
}

export default config
