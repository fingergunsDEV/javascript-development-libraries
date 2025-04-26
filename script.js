// DOM Elements
const showAllBtn = document.getElementById('show-all');
const filter2dBtn = document.getElementById('filter-2d');
const filter3dBtn = document.getElementById('filter-3d');
const filterXrBtn = document.getElementById('filter-xr');
const libraryCards = document.querySelectorAll('.library-card');
const demoButtons = document.querySelectorAll('.demo-btn');
const demoContainer = document.getElementById('demo-container');
const demoTitle = document.getElementById('demo-title');
const demoContent = document.getElementById('demo-content');
const closeDemo = document.getElementById('close-demo');

// Filter functionality
showAllBtn.addEventListener('click', () => {
    toggleActiveButton(showAllBtn);
    libraryCards.forEach(card => {
        card.style.display = 'flex';
    });
});

filter2dBtn.addEventListener('click', () => {
    toggleActiveButton(filter2dBtn);
    filterCards('2D');
});

filter3dBtn.addEventListener('click', () => {
    toggleActiveButton(filter3dBtn);
    filterCards('3D');
});

filterXrBtn.addEventListener('click', () => {
    toggleActiveButton(filterXrBtn);
    filterCards('XR');
});

function toggleActiveButton(activeButton) {
    [showAllBtn, filter2dBtn, filter3dBtn, filterXrBtn].forEach(btn => {
        btn.classList.remove('active');
    });
    activeButton.classList.add('active');
}

function filterCards(type) {
    libraryCards.forEach(card => {
        if (card.dataset.type === type) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

// Demo functionality
demoButtons.forEach(button => {
    button.addEventListener('click', () => {
        const library = button.dataset.library;
        openDemo(library);
    });
});

closeDemo.addEventListener('click', () => {
    demoContainer.classList.add('hidden');
    demoContent.innerHTML = '';
});

function openDemo(library) {
    demoContainer.classList.remove('hidden');
    
    // Set the title based on library
    demoTitle.textContent = `${library.charAt(0).toUpperCase() + library.slice(1)} Demo`;
    
    // Clear previous demo
    demoContent.innerHTML = '';
    
    // Load demo based on library
    switch(library) {
        case 'three':
            loadThreeJsDemo();
            break;
        case 'phaser':
            loadPhaserDemo();
            break;
        case 'pixi':
            loadPixiDemo();
            break;
        case 'babylon':
            loadBabylonDemo();
            break;
        case 'webxr':
            loadWebXRDemo();
            break;
        case 'aframe':
            loadAFrameDemo();
            break;
        default:
            demoContent.innerHTML = `<div style="padding: 2rem; text-align: center;">
                <p>Demo for ${library} is not available in this preview.</p>
                <p>Check the official documentation for examples.</p>
            </div>`;
    }
}

// Existing demo functions remain the same
function loadThreeJsDemo() {
    // Create a simple Three.js scene with rotating cube
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    
    const camera = new THREE.PerspectiveCamera(70, demoContent.clientWidth / demoContent.clientHeight, 0.1, 1000);
    camera.position.z = 5;
    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(demoContent.clientWidth, demoContent.clientHeight);
    demoContent.appendChild(renderer.domElement);
    
    // Create a cube
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshPhongMaterial({ 
        color: 0x6200ee,
        specular: 0x555555,
        shininess: 30
    });
    
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    
    // Add some lighting
    const light1 = new THREE.DirectionalLight(0xffffff, 1);
    light1.position.set(1, 1, 1);
    scene.add(light1);
    
    const light2 = new THREE.DirectionalLight(0x03dac6, 0.5);
    light2.position.set(-1, -1, -1);
    scene.add(light2);
    
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = demoContent.clientWidth / demoContent.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(demoContent.clientWidth, demoContent.clientHeight);
    });
}

function loadPhaserDemo() {
    // Since we can't load Phaser directly, show a placeholder
    demoContent.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; background-color: #f8f9fa;">
            <svg width="200" height="200" viewBox="0 0 100 100">
                <rect x="20" y="20" width="60" height="60" fill="#6200ee" rx="5">
                    <animate attributeName="y" values="20;30;20" dur="2s" repeatCount="indefinite" />
                </rect>
                <circle cx="50" cy="50" r="15" fill="#03dac6">
                    <animate attributeName="cx" values="50;65;50;35;50" dur="3s" repeatCount="indefinite" />
                </circle>
            </svg>
            <p style="margin-top: 20px; font-weight: bold; color: #6200ee;">Phaser requires the full library to be loaded</p>
            <p>Visit <a href="https://phaser.io/examples" target="_blank" style="color: #6200ee;">Phaser Examples</a> for interactive demos</p>
        </div>
    `;
}

function loadPixiDemo() {
    demoContent.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; background-color: #f8f9fa;">
            <svg width="200" height="200" viewBox="0 0 100 100">
                <g id="pixiSprites">
                    <circle cx="30" cy="30" r="10" fill="#ff3e3e">
                        <animate attributeName="cy" values="30;70;30" dur="1.5s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="50" cy="50" r="10" fill="#4bb3fd">
                        <animate attributeName="cx" values="50;70;30;50" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="70" cy="70" r="10" fill="#9c64f4">
                        <animate attributeName="r" values="10;15;10;5;10" dur="1.7s" repeatCount="indefinite" />
                    </circle>
                </g>
            </svg>
            <p style="margin-top: 20px; font-weight: bold; color: #6200ee;">PixiJS requires the full library to be loaded</p>
            <p>Visit <a href="https://pixijs.io/examples" target="_blank" style="color: #6200ee;">PixiJS Examples</a> for interactive demos</p>
        </div>
    `;
}

function loadBabylonDemo() {
    demoContent.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; background-color: #f8f9fa;">
            <svg width="200" height="200" viewBox="0 0 100 100">
                <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#E01A4F; stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#f7b801; stop-opacity:1" />
                    </linearGradient>
                </defs>
                <polygon points="50,10 90,50 50,90 10,50" fill="url(#grad)">
                    <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="10s" repeatCount="indefinite" />
                </polygon>
                <circle cx="50" cy="50" r="5" fill="white" />
            </svg>
            <p style="margin-top: 20px; font-weight: bold; color: #6200ee;">Babylon.js requires the full library to be loaded</p>
            <p>Visit <a href="https://playground.babylonjs.com/" target="_blank" style="color: #6200ee;">Babylon.js Playground</a> for interactive demos</p>
        </div>
    `;
}

// New WebXR demo function
function loadWebXRDemo() {
    demoContent.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; background-color: #f8f9fa;">
            <svg width="200" height="200" viewBox="0 0 100 100">
                <defs>
                    <linearGradient id="xrGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#4285F4; stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#34A853; stop-opacity:1" />
                    </linearGradient>
                </defs>
                <!-- VR Headset Icon -->
                <g transform="translate(20, 30)">
                    <rect x="0" y="0" width="60" height="35" rx="10" fill="url(#xrGrad)" />
                    <rect x="10" y="10" width="40" height="15" rx="5" fill="#202124" />
                    <!-- Animated VR effect -->
                    <circle cx="30" cy="50" r="8" fill="#4285F4" opacity="0.5">
                        <animate attributeName="r" values="2;8;2" dur="3s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.8;0.2;0.8" dur="3s" repeatCount="indefinite" />
                    </circle>
                </g>
            </svg>
            <p style="margin-top: 20px; font-weight: bold; color: #4285F4;">WebXR requires VR/AR hardware access</p>
            <p>WebXR is an API that requires device permissions and compatible hardware</p>
            <p>Visit <a href="https://immersiveweb.dev/" target="_blank" style="color: #4285F4;">Immersive Web</a> for examples</p>
        </div>
    `;
}

// New A-Frame demo function
function loadAFrameDemo() {
    demoContent.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; background-color: #f8f9fa;">
            <svg width="200" height="200" viewBox="0 0 100 100">
                <!-- A-Frame Logo -->
                <g transform="translate(15, 15)">
                    <polygon points="35,0 70,60 0,60" fill="#EF2D5E" />
                    <polygon points="35,10 60,55 10,55" fill="#F2F2F2" />
                    <animateTransform attributeName="transform" type="rotate" from="0 35 35" to="360 35 35" dur="6s" repeatCount="indefinite" />
                </g>
            </svg>
            <p style="margin-top: 20px; font-weight: bold; color: #EF2D5E;">A-Frame requires HTML integration</p>
            <p>A-Frame uses custom HTML elements to create VR scenes</p>
            <p>Visit <a href="https://aframe.io/examples/" target="_blank" style="color: #EF2D5E;">A-Frame Examples</a> for interactive demos</p>
        </div>
    `;
}
