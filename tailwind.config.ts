import type { Config } from 'tailwindcss';

export default {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/views/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        fontFamily: {
            sans: ['var(--font-inter)'],
        },
        colors: {
            inherit: 'inherit',
            transparent: '#ffff',
            white: '#fff',
            black: '#101828',
            body: '#fcfcfd',
            primary: {
                lighter: '#F9F5FF',
                light: '#D6BBFB',
                DEFAULT: '#7F56D9',
                dark: '#6941C6',
            },
            secondary: {
                light: '#EAECF0',
                DEFAULT: '#D0D5DD',
                dark: '#344054',
            },
            teritary: {
                light: '#F9FAFB',
                DEFAULT: '#475467',
                dark: '#667085',
            },
            error: {
                light: '#FDA29B',
                DEFAULT: '#F04438',
            },
        },
        extend: {
            dropShadow: {
                DEFAULT: '0 1px 2px rgba(16, 24, 40, 0.05)',
            },
            boxShadow: {
                ['focus-primary']: '0 0 0 4px rgba(158, 119, 237, 0.24)',
                ['focus-secondary']: '0 0 0 4px rgba(152, 162, 179, 0.4)',
                ['focus-error']: '0 0 0 4px rgba(240, 68, 56, 0.2)',
            },
        },
    },
    plugins: [],
} satisfies Config;
