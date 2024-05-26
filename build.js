const fs = require('fs');
const path = require('path');

// Function to copy files with error handling
function copyFileSync(src, dest) {
    try {
        fs.copyFileSync(src, dest);
        console.log(`Copied ${src} to ${dest}`);
    } catch (err) {
        console.error(`Error copying ${src} to ${dest}:`, err);
    }
}

// Replace placeholder in script.js
fs.readFile('script.js', 'utf8', (err, data) => {
    if (err) {
        return console.log(err);
    }
    const result = data.replace(/__OPENSEA_API_KEY__/g, process.env.OPENSEA_API_KEY);

    fs.mkdirSync('public', { recursive: true });
    fs.writeFile('public/script.js', result, 'utf8', (err) => {
        if (err) return console.log(err);
    });
});

// Copy other necessary files
const filesToCopy = ['index.html', 'styles.css', 'scene.gltf', 'scene.bin'];
filesToCopy.forEach(file => {
    copyFileSync(file, path.join('public', file));
});