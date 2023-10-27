import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff8862',
        'primary-text': '#ff8862',
        'primary-dark': '#cc6a4c',
        'primary-light': '#ffa382',
        'primary-5percent': 'rgba(255, 136, 98, 0.05)',
        tertiary: '#444',
        'tertiary-light': '#4444446e',
        accent: '#ff704d',
        'accent-dark': '#b24c33',
        'accent-light': '#ff9980',
        success: '#4caf50',
        'success-dark': '#388e3c',
        'success-light': '#81c784',
        error: '#f44336',
        'error-dark': '#d32f2f',
        'error-light': '#e57373',
        warning: '#ff9800',
        'warning-dark': '#f57c00',
        'warning-light': '#ffb74d',
        'shadow-primary': 'rgba(255, 136, 98, 0.5)',
        'shadow-primary-bright': 'rgba(255, 136, 98, 0.8)',
        'grey-subtle-accent': 'rgba(255, 136, 98, 0.02)',

        'grey-darkest': '#1e1e1e',
        'grey-darker': '#282c34',
        'grey-darkerish': '#2b2b2b',
        'grey-dark': '#2e2e2e',
        'grey-dark-seethrough': '#2e2e2eb8',
        'grey-dark-seethrougher': 'rgba(46, 46, 46, 0.35)',
        'grey-dark-bluish-seethrough': 'rgba(40, 44, 52, 0.8)',
        'grey-darkish': '#3d3d3d',
        'grey-darkish-seethrough': 'rgba(61, 61, 61, 0.5)',
        grey: '#5a5a5a',
        'grey-lightish': '#6e6e6e',
        'grey-light': '#bbb',
        'grey-lighter': '#ddd',
        'grey-lightest': '#fff',
        foreground: '#f0f0f0',
        'foreground-bright': '#fff',
        'foreground-muted': '#8d8d8d',
        'foreground-on-primary': '#1e1e1e',
      },
      boxShadow: {
        primary:
          '0 1px 3px 0 rgba(255, 136, 98, 0.5), 0 1px 2px 0 rgba(255, 136, 98, 0.8)',
        'primary-bright':
          '0 1px 3px 0 rgba(255, 136, 98, 0.8), 0 1px 2px 0 rgba(255, 136, 98, 0.8)',
      },
    },
  },
  plugins: [],
};
export default config;
