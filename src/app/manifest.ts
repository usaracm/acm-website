import { MetadataRoute } from 'next';

export const dynamic = 'force-static';


export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'GGSIPU EDC ACM Student Chapter',
        short_name: 'ACM GGSIPU',
        description: 'Empowering students to innovate, collaborate, and lead in the world of computing.',
        start_url: '/',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#0085CA',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
    };
}
