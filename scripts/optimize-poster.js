const sharp = require('sharp');
const fs = require('fs');

const input = 'public/home/EDC-poster.jpg';
const output = 'public/home/EDC-poster.webp';

if (fs.existsSync(input)) {
    console.log(`Optimizing ${input}...`);
    sharp(input)
        .resize(1920, null, { withoutEnlargement: true })
        .webp({ quality: 60, effort: 6 })
        .toFile(output)
        .then(() => {
            console.log(`Success: ${output}`);
            fs.unlinkSync(input); // Clean up jpg
        })
        .catch(err => console.error(err));
} else {
    console.error(`Input file not found: ${input}`);
}
