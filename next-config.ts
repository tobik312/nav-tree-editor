import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            use: [
                {
                    loader: '@svgr/webpack',
                },
            ],
        });

        return config;
    },
    output: 'standalone',
};

export default nextConfig;
