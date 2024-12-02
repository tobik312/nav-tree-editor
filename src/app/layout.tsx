import { PropsWithChildren } from 'react';

import type { Metadata } from 'next';

const RootLayout: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
};

export default RootLayout;

export const metadata: Metadata = {
    title: 'Nav tree editor',
};
