const sharp = require('sharp');
const fs = require('fs');

const input = 'public/team/ritwik_mittal.jpg';
const output = 'public/team/ritwik.webp';

if (fs.existsSync(input)) {
    console.log(`Optimizing ${input}...`);
    sharp(input)
        .resize(800, null, { withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(output)
        .then(() => {
            console.log(`Success: ${output}`);
            fs.unlinkSync(input); // Delete original
        })
        .catch(err => console.error(err));
} else {
    console.error(`Input file not found: ${input}`);
}
