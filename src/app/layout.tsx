import { PropsWithChildren } from 'react';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './style.css';

const InterFont = Inter({
    weight: ['400', '600'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
});

const RootLayout: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <html lang="en">
            <body className={`bg-body text-black ${InterFont.variable} font-sans`}>{children}</body>
        </html>
    );
};

export default RootLayout;

export const metadata: Metadata = {
    title: 'Nav tree editor',
};
