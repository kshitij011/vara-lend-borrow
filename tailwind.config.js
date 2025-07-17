/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: '#0F172A',
        surface: '#1E293B',
        'surface-light': '#334155',
        border: '#374151',
        foreground: '#F8FAFC',
        primary: {
          50: '#eff6ff',
          500: '#3B82F6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        purple: {
          500: '#8B5CF6',
          600: '#7c3aed',
          700: '#6d28d9',
        },
        teal: {
          500: '#2DD4BF',
          600: '#14b8a6',
        },
        success: '#10B981',
        error: '#EF4444',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};