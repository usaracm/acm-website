import { compress } from 'wawoff2';
import { readFile, writeFile, readdir, stat } from 'fs/promises';
import { join, extname, basename, dirname } from 'path';

const FONTS_DIR = './public/fonts';

async function convertToWoff2(ttfPath) {
    try {
        const ttfBuffer = await readFile(ttfPath);
        const woff2Buffer = await compress(ttfBuffer);

        const dir = dirname(ttfPath);
        const name = basename(ttfPath, extname(ttfPath));
        const woff2Path = join(dir, `${name}.woff2`);

        await writeFile(woff2Path, woff2Buffer);

        const originalSize = ttfBuffer.length;
        const newSize = woff2Buffer.length;
        const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);

        console.log(`✅ ${basename(ttfPath)} → ${basename(woff2Path)}`);
        console.log(`   ${(originalSize / 1024).toFixed(1)}KB → ${(newSize / 1024).toFixed(1)}KB (${savings}% saved)`);

        return { original: originalSize, new: newSize };
    } catch (error) {
        console.error(`❌ Error converting ${ttfPath}:`, error.message);
        return null;
    }
}

async function findTtfFiles(dir) {
    const files = [];

    async function scan(currentDir) {
        const entries = await readdir(currentDir, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = join(currentDir, entry.name);

            if (entry.isDirectory()) {
                await scan(fullPath);
            } else if (entry.isFile() && extname(entry.name).toLowerCase() === '.ttf') {
                files.push(fullPath);
            }
        }
    }

    await scan(dir);
    return files;
}

async function main() {
    console.log('🔤 Font Optimization: TTF → WOFF2\n');

    const ttfFiles = await findTtfFiles(FONTS_DIR);
    console.log(`Found ${ttfFiles.length} TTF files\n`);

    let totalOriginal = 0;
    let totalNew = 0;

    for (const ttfPath of ttfFiles) {
        const result = await convertToWoff2(ttfPath);
        if (result) {
            totalOriginal += result.original;
            totalNew += result.new;
        }
    }

    console.log('\n📊 Summary:');
    console.log(`   Original: ${(totalOriginal / 1024).toFixed(1)}KB`);
    console.log(`   WOFF2: ${(totalNew / 1024).toFixed(1)}KB`);
    console.log(`   Saved: ${((totalOriginal - totalNew) / 1024).toFixed(1)}KB (${((totalOriginal - totalNew) / totalOriginal * 100).toFixed(1)}%)`);

    console.log('\n💡 Next: Update globals.css to use .woff2 files');
}

main().catch(console.error);
