/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Ethixweb signature red palette
        brand: {
          50: '#fff1f2',
          100: '#ffe1e4',
          200: '#ffc7cc',
          300: '#ffa0a8',
          400: '#f86672',
          500: '#e51d25', // Ethixweb Signature Crimson Red
          600: '#d1141c',
          700: '#b00f16',
          800: '#8a1015',
          900: '#6d1014',
          950: '#3c0306',
        },
        // Sophisticated Dark Charcoal & Off-White
        charcoal: {
          50: '#f8f9fa',
          100: '#f1f3f5',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          850: '#17191e',
          900: '#111216',
          950: '#0c0d10', // Deep obsidian/charcoal
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
