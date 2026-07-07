import { MetadataRoute } from 'next';
import { eventsData } from '@/data/eventsData';

export const dynamic = 'force-static';


export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://usar.acm.org';

    // Static routes
    const routes = [
        '',
        '/about',
        '/events',
        '/teams',
        '/projects',
        '/blogs',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Dynamic routes (Events)
    const eventRoutes = eventsData.map((event) => ({
        url: `${baseUrl}/events/${event.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    return [...routes, ...eventRoutes];
}
