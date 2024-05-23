document.addEventListener('DOMContentLoaded', function() {
    // Check if the age popup has been shown before
    if (!localStorage.getItem('ageVerified')) {
        // Show the age popup
        document.getElementById('age-popup').style.display = 'flex';

        // Handle the Yes button click
        document.getElementById('yes-button').addEventListener('click', function() {
            localStorage.setItem('ageVerified', 'true');
            document.getElementById('age-popup').style.display = 'none';
        });

        // Handle the No button click
        document.getElementById('no-button').addEventListener('click', function() {
            window.location.href = 'https://www.google.com';
        });
    }

    // Info button functionality
    const infoButton = document.getElementById("info-button");
    const backButton = document.getElementById("back-button");
    const popup = document.getElementById("info-popup");
    const infoText = document.getElementById("info-text");

    const infoContent = `
        <h2>About Us</h2>
        <p>
            Welcome to Vape.₿ox, your ultimate destination for high-quality vape products. We are thrilled to announce that our website is launching soon! Currently, it is still in development, but we are excited to bring you a seamless shopping experience that caters to all your vaping needs. Our mission is to provide a wide selection of premium vape products, including e-liquids, vape pens, and accessories that meet the highest standards of quality and safety.
        </p>
        <p>
            In addition to our commitment to quality, we are also embracing the future of digital innovation. We are introducing an exclusive NFT collection that will be available soon. This collection will not only represent a unique piece of digital art but also enable holders to enjoy exclusive discounts on all purchases. By integrating Web2 and Web3 technologies, we aim to create a cutting-edge platform that offers both traditional e-commerce convenience and the benefits of blockchain technology.
        </p>
        <p>
            Our team at Vape.₿ox is dedicated to ensuring that you have access to the best vaping products on the market. We believe in the importance of innovation, quality, and customer satisfaction. As we continue to develop our website, we invite you to stay connected with us for updates and exclusive offers. We are committed to making your vaping experience exceptional and look forward to serving you soon.
        </p>
        <p>
            Stay tuned as we prepare to launch and bring you an unparalleled vaping experience. Thank you for your support, and we can't wait to welcome you to the Vape.₿ox community. Together, we will redefine the standards of the vaping industry, offering a blend of premium products and innovative solutions.
        </p>
    `;

    infoButton.addEventListener("click", function() {
        popup.classList.add("flipped");
        infoText.innerHTML = infoContent;
    });

    backButton.addEventListener("click", function() {
        popup.classList.remove("flipped");
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
                requestAnimationFrame(animate);

                // Update the color factor
                colorFactor += 0.002; // Slow down the color change
                if (colorFactor >= 1) {
                    colorFactor = 0;
                    colorIndex1 = nextColorIndex1;
                    colorIndex2 = nextColorIndex2;
                    nextColorIndex1 = (nextColorIndex1 + 1) % colors.length;
                    nextColorIndex2 = (nextColorIndex2 + 1) % colors.length;
                }

                // Interpolate and apply the colors
                const currentColor1 = colors[colorIndex1].clone().lerp(colors[nextColorIndex1], colorFactor);
                const currentColor2 = colors[colorIndex2].clone().lerp(colors[nextColorIndex2], colorFactor);

                model.traverse(function (child) {
                    if (child.isMesh) {
                        child.material.color.set(currentColor1);
                        // Apply second color to some parts if the model has multiple materials
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

    // Fade out the loading screen after 0.5 seconds
    window.addEventListener('load', function () {
        setTimeout(function () {
            document.getElementById('loading-screen').style.opacity = '0';
            setTimeout(function () {
                document.getElementById('loading-screen').style.display = 'none';
            }, 500); // Match the transition duration
        }, 500);

        // Delay the appearance of the menu button by 0.5 seconds
        setTimeout(function () {
            document.getElementById('menu-button').style.opacity = '1';
        }, 500);
    });

    // Menu button functionality
    const menuButton = document.getElementById('menu-button');
    const menuOverlay = document.getElementById('menu-overlay');

    menuButton.addEventListener('click', function () {
        menuButton.classList.toggle('active');
        menuOverlay.classList.toggle('active');
    });
});