/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        cmrl: {
          blue: {
            50: '#f0f9ff',
            100: '#e0f2fe',
            200: '#bae6fd',
            300: '#7dd3fc',
            400: '#38bdf8',
            500: '#0ea5e9',
            600: '#0284c7', // Primary Light
            700: '#0369a1',
            800: '#075985',
            900: '#0c4a6e', // Primary Dark
            950: '#082f49', // Background Dark
          },
          accent: {
            DEFAULT: '#8b5cf6', // Violet
            hover: '#7c3aed',
          }
        },
        semantic: {
          success: '#10b981', // Green - AVAILABLE/COMPLETED/VERIFIED/ACTIVE
          info: '#3b82f6',    // Blue - RESERVED/STUDYING/IN_PROGRESS
          warning: '#f59e0b', // Yellow - PROPOSED/UNDER_REVIEW/PLANNED/PENDING
          danger: '#ef4444',  // Red - FAILED/BLACKLISTED/REJECTED/SUSPENDED
          neutral: '#6b7280', // Gray - ARCHIVED/NOT_STUDIED/INACTIVE
          special: '#8b5cf6', // Purple - PUBLISHED
        }
      }
    },
  },
  plugins: [],
}
