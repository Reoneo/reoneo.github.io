// Basic Three.js setup
const canvasWrapper = document.getElementById('canvas-wrapper');
const width = canvasWrapper.clientWidth;
const height = canvasWrapper.clientHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(width, height);
canvasWrapper.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

const animate = function () {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
};

animate();

// Example of using TweenMax for animation
TweenMax.to(cube.position, 2, { x: 2, yoyo: true, repeat: -1, ease: "power1.inOut" });
