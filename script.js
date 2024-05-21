document.addEventListener('DOMContentLoaded', function() {
    // Age verification logic
    if (!localStorage.getItem('ageVerified')) {
        document.getElementById('age-popup').style.display = 'flex';
        document.getElementById('yes-button').addEventListener('click', function() {
            localStorage.setItem('ageVerified', 'true');
            document.getElementById('age-popup').style.display = 'none';
        });
        document.getElementById('no-button').addEventListener('click', function() {
            window.location.href = 'https://www.google.com';
        });
    }

    // Open and close the NFT popup
    document.getElementById('openPopup').addEventListener('click', function() {
        document.getElementById('popup').style.display = 'flex';
        fetchNFTs();
    });
    document.getElementById('closePopup').addEventListener('click', function() {
        document.getElementById('popup').style.display = 'none';
    });
    window.addEventListener('click', function(event) {
        if (event.target == document.getElementById('popup')) {
            document.getElementById('popup').style.display = 'none';
        }
    });

    // Fetch and display NFTs
    function fetchNFTs() {
        const walletDomain = 'vape.box';
        const apiURL = `https://api.opensea.io/api/v1/assets?owner=${walletDomain}&order_direction=desc&offset=0&limit=20`;

        fetch(apiURL)
            .then(response => response.json())
            .then(data => displayNFTs(data.assets))
            .catch(error => console.error('Error fetching NFTs:', error));
    }

    function displayNFTs(assets) {
        const collectionDiv = document.getElementById('nft-collection');
        collectionDiv.innerHTML = ''; // Clear previous NFTs
        assets.forEach(asset => {
            const nftDiv = document.createElement('div');
            nftDiv.classList.add('nft-item');
            nftDiv.innerHTML = `
                <img src="${asset.image_url}" alt="${asset.name}" class="nft-image" />
                <p class="nft-name">${asset.name}</p>
                <a href="${asset.permalink}" target="_blank" class="nft-offer-button">Make Offer</a>
            `;
            collectionDiv.appendChild(nftDiv);
        });
    }
});

// Existing Three.js script
const container = document.getElementById('container');
const scene = new THREE.Scene();
scene.background = null; // Ensure the background is transparent
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // Enable alpha for transparency
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI; // Allow full rotation

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 10, 0); // Position light directly above
scene.add(light);

const loader = new THREE.GLTFLoader();
loader.load(
    'https://raw.githubusercontent.com/Reoneo/reoneo.github.io/main/scene.gltf',
    function (gltf) {
        const model = gltf.scene;
        scene.add(model);

        // Center the model
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3()).length();
        const center = box.getCenter(new THREE.Vector3());

        model.position.sub(center);

        camera.near = size / 100;
        camera.far = size * 100;
        camera.position.set(size, size, size);
        camera.lookAt(center);

        const colors = [
            new THREE.Color(0xff0000), // Red
            new THREE.Color(0x00ff00), // Green
            new THREE.Color(0x0000ff), // Blue
            new THREE.Color(0xffff00), // Yellow
            new THREE.Color(0xff00ff), // Magenta
            new THREE.Color(0x00ffff)  // Cyan
        ];
        let colorIndex1 = 0;
        let colorIndex2 = 1;
        let nextColorIndex1 = 1;
        let nextColorIndex2 = 2;
        let colorFactor = 0;

        const animate = function () {
            requestAnimationFrame(animate);

            colorFactor += 0.002; // Slow down the color change
            if (colorFactor >= 1) {
                colorFactor = 0;
                colorIndex1 = nextColorIndex1;
                colorIndex2 = nextColorIndex2;
                nextColorIndex1 = (nextColorIndex1 + 1) % colors.length;
                nextColorIndex2 = (nextColorIndex2 + 1) % colors.length;
            }

            const currentColor1 = colors[colorIndex1].clone().lerp(colors[nextColorIndex1], colorFactor);
            const currentColor2 = colors[colorIndex2].clone().lerp(colors[nextColorIndex2], colorFactor);

            model.traverse(function (child) {
                if (child.isMesh) {
                    child.material.color.set(currentColor1);
                    if (Array.isArray(child.material)) {
                        child.material.forEach((material, index) => {
                            material.color.set(index % 2 === 0 ? currentColor1 : currentColor2);
                        });
                    }
                }
            });

            controls.update();
            renderer.render(scene, camera);
        };
        animate();
    },
    undefined,
    function (error) {
        console.error(error);
    }
);

window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

window.addEventListener('load', function () {
    setTimeout(function () {
        document.getElementById('loading-screen').style.opacity = '0';
        setTimeout(function () {
            document.getElementById('loading-screen').style.display = 'none';
        }, 500); // Match the transition duration
    }, 500);

    setTimeout(function () {
        document.getElementById('menu-button').style.opacity = '1';
    }, 500);
});

const menuButton = document.getElementById('menu-button');
const menuOverlay = document.getElementById('menu-overlay');

menuButton.addEventListener('click', function () {
    menuButton.classList.toggle('active');
    menuOverlay.classList.toggle('active');
});