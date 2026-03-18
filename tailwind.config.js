/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html','./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brown:  { DEFAULT:'#6A4E42', dark:'#4A3228', deeper:'#2F2523', light:'#8B6655', muted:'#A08070' },
        ivory:  { DEFAULT:'#F5F1E9', dark:'#EDE6D8' },
        beige:  { DEFAULT:'#E8D9C5', dark:'#D4C4AA' },
        gold:   { DEFAULT:'#C6A75A', light:'#E8D5A3', dark:'#9A7A2E' },
      },
      fontFamily: {
        cinzel: ['Cinzel','serif'],
        lora:   ['Lora','Georgia','serif'],
        mono:   ['Montserrat','sans-serif'],
      },
    }
  },
  plugins: [],
}
