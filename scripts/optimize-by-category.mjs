import sharp from 'sharp';
import { readdir, stat, unlink } from 'fs/promises';
import { join, extname, basename, dirname } from 'path';
import { existsSync } from 'fs';

const PUBLIC_DIR = './public';
const SUPPORTED_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp'];

// Category-specific optimization settings
// Sizes based on actual displayed dimensions (2x for retina)
const CATEGORY_SETTINGS = {
    // Team member cards: displayed at ~200-300px → 400px for retina
    team: { maxWidth: 400, quality: 80, description: 'Team member photos' },

    // Event gallery: displayed at ~391px → 500px for retina
    eventGallery: { maxWidth: 500, quality: 75, description: 'Event gallery images' },

    // Event cover images
    eventCover: { maxWidth: 800, quality: 80, description: 'Event cover images' },

    // Blog thumbnails: displayed at ~400px
    blogs: { maxWidth: 600, quality: 80, description: 'Blog thumbnails' },

    // About section images
    about: { maxWidth: 1200, quality: 80, description: 'About section images' },

    // Project images
    projects: { maxWidth: 800, quality: 80, description: 'Project images' },

    // Hero backgrounds: full-width
    hero: { maxWidth: 1920, quality: 75, description: 'Hero backgrounds' },

    // Logos: resize to reasonable size
    logo: { maxWidth: 200, quality: 90, description: 'Logos' },

    // Default fallback
    default: { maxWidth: 800, quality: 80, description: 'Other images' }
};

function getCategory(filePath) {
    const lowerPath = filePath.toLowerCase();
    const fileName = basename(lowerPath);

    // Check for logos first (highest priority)
    if (lowerPath.includes('logo')) {
        return 'logo';
    }

    // Check for hero images
    if (fileName.includes('hero')) {
        return 'hero';
    }

    // Check by directory
    if (lowerPath.includes('/team/')) {
        return fileName.includes('hero') ? 'hero' : 'team';
    }

    if (lowerPath.includes('/events/')) {
        // Event cover images are typically numbered (1.webp, 2.webp, etc.)
        if (/^\\d+\\.webp$/.test(fileName)) {
            return 'eventCover';
        }
        return 'eventGallery';
    }

    if (lowerPath.includes('/blogs/')) {
        return fileName.includes('hero') ? 'hero' : 'blogs';
    }

    if (lowerPath.includes('/about/')) {
        return 'about';
    }

    if (lowerPath.includes('/projects/')) {
        return fileName.includes('hero') ? 'hero' : 'projects';
    }

    return 'default';
}

async function getAllImages(dir) {
    const files = [];

    async function scan(currentDir) {
        const entries = await readdir(currentDir, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = join(currentDir, entry.name);

            if (entry.isDirectory()) {
                // Skip fonts folder
                if (entry.name === 'fonts') continue;
                await scan(fullPath);
            } else if (entry.isFile()) {
                const ext = extname(entry.name).toLowerCase();
                if (SUPPORTED_EXTENSIONS.includes(ext)) {
                    files.push(fullPath);
                }
            }
        }
    }

    await scan(dir);
    return files;
}

async function optimizeImage(inputPath) {
    try {
        const stats = await stat(inputPath);
        const originalSize = stats.size;
        const ext = extname(inputPath).toLowerCase();
        const name = basename(inputPath, ext);
        const dir = dirname(inputPath);

        // Get category and settings
        const category = getCategory(inputPath);
        const settings = CATEGORY_SETTINGS[category];

        // Output as WebP
        const webpPath = join(dir, `${name}.webp`);

        let sharpInstance = sharp(inputPath);
        const metadata = await sharpInstance.metadata();

        // Check if image needs resizing (width exceeds category max)
        const needsResize = settings.maxWidth && metadata.width > settings.maxWidth;

        // Skip if already webp, small enough, AND doesn't need resizing
        const sizeThreshold = 50 * 1024; // 50KB
        if (ext === '.webp' && originalSize < sizeThreshold && !needsResize) {
            console.log(`⏭️  Skip (${category}, ${(originalSize / 1024).toFixed(0)}KB, ${metadata.width}px): ${basename(inputPath)}`);
            return { skipped: true, category };
        }

        // Resize based on category settings
        if (needsResize) {
            sharpInstance = sharp(inputPath).resize(settings.maxWidth, null, {
                withoutEnlargement: true,
                fit: 'inside'
            });
        }

        // Use a temp file if input and output are the same
        const isSameFile = inputPath === webpPath;
        const outputPath = isSameFile ? `${webpPath}.temp` : webpPath;

        // Convert to WebP
        await sharpInstance
            .webp({ quality: settings.quality, effort: 6 })
            .toFile(outputPath);

        // Rename temp file if needed
        if (isSameFile) {
            const fs = await import('fs/promises');
            await fs.rename(outputPath, webpPath);
        }

        // Remove original if it's not already webp
        if (ext !== '.webp' && existsSync(inputPath)) {
            await unlink(inputPath);
        }

        const newStats = await stat(webpPath);
        const newSize = newStats.size;
        const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);

        console.log(`✅ [${category}] ${basename(inputPath)} → ${(originalSize / 1024).toFixed(0)}KB → ${(newSize / 1024).toFixed(0)}KB (${savings}% saved)`);

        return {
            category,
            original: inputPath,
            optimized: webpPath,
            originalSize,
            newSize,
            savings: parseFloat(savings)
        };
    } catch (error) {
        console.error(`❌ Error: ${inputPath}:`, error.message);
        return { error: true, path: inputPath };
    }
}

async function main() {
    console.log('🖼️  Category-Based Image Optimization\\n');
    console.log('Category settings:');
    for (const [key, val] of Object.entries(CATEGORY_SETTINGS)) {
        console.log(`  ${key}: ${val.maxWidth ? val.maxWidth + 'px' : 'no resize'}, quality ${val.quality}`);
    }
    console.log('\\nScanning for images...\\n');

    const images = await getAllImages(PUBLIC_DIR);
    console.log(`Found ${images.length} images\\n`);

    const categoryStats = {};
    let totalOriginal = 0;
    let totalNew = 0;

    for (const imagePath of images) {
        const result = await optimizeImage(imagePath);

        if (result && !result.skipped && !result.error) {
            totalOriginal += result.originalSize;
            totalNew += result.newSize;

            if (!categoryStats[result.category]) {
                categoryStats[result.category] = { count: 0, saved: 0 };
            }
            categoryStats[result.category].count++;
            categoryStats[result.category].saved += result.originalSize - result.newSize;
        }
    }

    console.log('\\n📊 Summary by Category:');
    for (const [cat, stats] of Object.entries(categoryStats)) {
        console.log(`   ${cat}: ${stats.count} images, ${(stats.saved / 1024 / 1024).toFixed(2)}MB saved`);
    }

    console.log('\\n📊 Total:');
    console.log(`   Original: ${(totalOriginal / 1024 / 1024).toFixed(2)}MB`);
    console.log(`   Optimized: ${(totalNew / 1024 / 1024).toFixed(2)}MB`);
    console.log(`   Saved: ${((totalOriginal - totalNew) / 1024 / 1024).toFixed(2)}MB (${((totalOriginal - totalNew) / totalOriginal * 100 || 0).toFixed(1)}%)`);
}

main().catch(console.error);
