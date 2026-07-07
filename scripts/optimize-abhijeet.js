const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const input = 'public/team/abhijeet.jpg';
const output = 'public/team/abhijeet.webp';

if (fs.existsSync(input)) {
    console.log(`Optimizing ${input}...`);
    sharp(input)
        .resize(800, null, { withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(output)
        .then(() => console.log(`Success: ${output}`))
        .catch(err => console.error(err));
} else {
    console.error(`Input file not found: ${input}`);
}
