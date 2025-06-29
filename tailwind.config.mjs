/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary - Coffee browns
        primary: {
          50: '#FAF6F1',
          100: '#F3EAE0',
          200: '#E6D5C1',
          300: '#D9BFA1',
          400: '#C9A47C',
          500: '#B78B5E', // Base primary
          600: '#9A7046',
          700: '#7D5935',
          800: '#604325',
          900: '#432D18',
        },
        // Secondary - Creams
        secondary: {
          50: '#FFFDF7',
          100: '#FFF9E9',
          200: '#FFF3D3',
          300: '#FFECBD',
          400: '#FFE3A1',
          500: '#FFD980', // Base secondary
          600: '#DBAD52',
          700: '#B78A30',
          800: '#936818',
          900: '#6F470B',
        },
        // Accent - Rust red
        accent: {
          50: '#FCF4F4',
          100: '#F9E8E8',
          200: '#F2C9C9',
          300: '#E9A5A5',
          400: '#DD7575',
          500: '#D05353', // Base accent
          600: '#B33939',
          700: '#8F2828',
          800: '#6B1A1A',
          900: '#471111',
        },
        // Success - Forest green
        success: {
          50: '#EFF8F1',
          100: '#DEEEE2',
          200: '#BBDDBD',
          300: '#8FC993',
          400: '#5FB167',
          500: '#3A994A', // Base success
          600: '#2B833C',
          700: '#1D692F',
          800: '#144F24',
          900: '#0B351A',
        },
        // Warning - Amber
        warning: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B', // Base warning
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        // Error - Berry red
        error: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#EF4444', // Base error
          600: '#DC2626',
          700: '#B91C1C',
          800: '#991B1B',
          900: '#7F1D1D',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      spacing: {
        '72': '18rem',
        '80': '20rem',
        '96': '24rem',
        '128': '32rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        soft: '0 10px 30px -10px rgba(0, 0, 0, 0.1)',
        medium: '0 10px 30px -5px rgba(0, 0, 0, 0.15)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};