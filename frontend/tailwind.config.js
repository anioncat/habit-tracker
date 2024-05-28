/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,tsx,html}'],
  theme: {
    fontFamily: {
      sans: ['Nunito Sans'],
    },
    extend: {
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        score0: 'var(--score0)',
        score1: 'var(--score1)',
        score2: 'var(--score2)',
        score3: 'var(--score3)',
        score4: 'var(--score4)',
        text: 'var(--text)',
        'subtext-1': 'var(--subtext-1)',
        'subtext-0': 'var(--subtext-0)',
        'overlay-2': 'var(--overlay-2)',
        'overlay-1': 'var(--overlay-1)',
        'overlay-0': 'var(--overlay-0)',
        'surface-2': 'var(--surface-2)',
        'surface-1': 'var(--surface-1)',
        'surface-0': 'var(--surface-0)',
        base: 'var(--base)',
        mantle: 'var(--mantle)',
        crust: 'var(--crust)',
      },
    },
  },
  plugins: [],
}
