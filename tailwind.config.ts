import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#10b981',
        secondary: '#059669',
        accent: '#f59e0b',
        background: '#ffffff',
        foreground: '#1f2937',
      },
    },
  },
  plugins: [],
}
export default config
