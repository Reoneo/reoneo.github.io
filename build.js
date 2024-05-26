const fs = require('fs');

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

fs.copyFileSync('index.html', 'public/index.html');
fs.copyFileSync('styles.css', 'public/styles.css');
fs.copyFileSync('scene.gltf', 'public/scene.gltf');
fs.copyFileSync('scene.bin', 'public/scene.bin');