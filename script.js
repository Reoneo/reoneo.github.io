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

        model.position.x += (model.position.x - center.x);
        model.position.y += (model.position.y - center.y);
        model.position.z += (model.position.z - center.z);

        camera.near = size / 100;
        camera.far = size * 100;
        camera.position.set(size, size, size);
        camera.lookAt(center);

        // Colors for interpolation
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