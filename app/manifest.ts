import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Quick queue',
        short_name: 'QuickQ',
        description: 'The quick queue web application',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
            {
                src: 'public/assets/manifest-icon-192.maskable.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'any',
            },
            {
                src: 'public/assets/manifest-icon-192.maskable.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'maskable',
            },
            {
                src: 'public/assets/manifest-icon-512.maskable.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any',
            },
            {
                src: 'public/assets/manifest-icon-512.maskable.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable',
            },
        ],
    };
}
