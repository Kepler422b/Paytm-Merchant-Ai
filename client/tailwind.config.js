/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paytm: {
          navy: '#002E6E',
          cyan: '#00BAF2',
          blue: '#1E6BFF',
          lightBlue: '#F0F8FF',
          darkBlue: '#002150'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(30, 107, 255, 0.15)',
        'glass-lg': '0 20px 60px -15px rgba(0, 46, 110, 0.2)',
        'glass-floating': '0 30px 60px -20px rgba(30, 107, 255, 0.25)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #F0F8FF 0%, #E6F0FA 100%)',
      }
    },
  },
  plugins: [],
}
