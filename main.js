import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

/* =========================================================
   MARITIME3DORBIS - COMPLETE MAIN.JS
========================================================= */

const app = document.querySelector('#app');

app.innerHTML = `
  <div class="app-shell">

    <header class="top-header">
      <div class="brand">
        MARITIME<span>3D</span>ORBIS
      </div>

      <div class="system-status">
        <span class="status-dot"></span>
        SYSTEM ONLINE
      </div>
    </header>

    <main class="main-layout">

      <aside class="component-panel">
        <div class="panel-heading">
          <div>ASSET COMPONENTS</div>
          <small>09 COMPONENTS</small>
        </div>

        <div class="component-list" id="componentList"></div>

        <button class="reset-button" id="resetCamera">
          RESET CAMERA
        </button>
      </aside>

      <section class="viewer-section">

        <div class="section-header">
          <span>3D ASSET VIEWER</span>
          <span class="live-model">
            <i></i> LIVE MODEL
          </span>
        </div>

        <div id="viewer"></div>

        <div class="viewer-help">
          Drag to rotate &nbsp; | &nbsp; Scroll to zoom &nbsp; | &nbsp;
          Double-click to reset
        </div>

      </section>

      <aside class="engineering-panel" id="engineeringPanel">
      </aside>

    </main>

    <footer class="bottom-footer">
      <span>MARITIME3DORBIS · DIGITAL ENGINEERING PLATFORM</span>
      <span>ASSET INSPECTION AND MONITORING SYSTEM</span>
    </footer>

  </div>
`;

/* =========================================================
   COMPLETE CSS
========================================================= */

const style = document.createElement('style');

style.textContent = `
  * {
    box-sizing: border-box;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #03151e;
    color: #eaf7ff;
    font-family: Arial, Helvetica, sans-serif;
  }

  #app {
    width: 100%;
    height: 100vh;
  }

  .app-shell {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background: #03151e;
  }

  .top-header {
    height: 74px;
    min-height: 74px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 28px;
    border-bottom: 1px solid #123746;
    background: #061d28;
  }

  .brand {
    font-size: 27px;
    font-weight: 900;
    letter-spacing: 4px;
    color: #f2f6f8;
  }

  .brand span {
    color: #00c8ff;
  }

  .system-status {
    color: #00c8ff;
    font-size: 13px;
    font-weight: bold;
    letter-spacing: 2px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .status-dot {
    width: 12px;
    height: 12px;
    background: #00ffbf;
    border-radius: 50%;
    box-shadow: 0 0 14px #00ffbf;
  }

  .main-layout {
    flex: 1;
    min-height: 0;
    display: grid;
    grid-template-columns: 205px minmax(0, 1fr) 320px;
  }

  .component-panel {
    min-height: 0;
    display: flex;
    flex-direction: column;
    border-right: 1px solid #123746;
    background: #061d28;
  }

  .panel-heading {
    padding: 18px 14px 14px;
    color: #00c8ff;
    font-size: 13px;
    font-weight: bold;
    letter-spacing: 2px;
    border-bottom: 1px solid #123746;
  }

  .panel-heading small {
    display: block;
    margin-top: 10px;
    color: #477b91;
    font-size: 10px;
    letter-spacing: 1px;
  }

  .component-list {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 12px 8px;
  }

  .component-list::-webkit-scrollbar {
    width: 8px;
  }

  .component-list::-webkit-scrollbar-track {
    background: #04141c;
  }

  .component-list::-webkit-scrollbar-thumb {
    background: #15556c;
    border-radius: 8px;
  }

  .component-card {
    width: 100%;
    min-height: 76px;
    margin-bottom: 10px;
    padding: 13px 12px;
    border: 1px solid #16475b;
    border-radius: 5px;
    background: #092b3a;
    color: white;
    cursor: pointer;
    transition: 0.2s;
    text-align: left;
    position: relative;
  }

  .component-card:hover {
    border-color: #00c8ff;
    background: #0c3a4d;
  }

  .component-card.active {
    border: 1px solid #00d5ff;
    background: #0d4055;
    box-shadow:
      inset 4px 0 0 #00d5ff,
      0 0 12px rgba(0, 200, 255, 0.12);
  }

  .component-card .component-name {
    display: block;
    font-size: 14px;
    font-weight: bold;
    line-height: 18px;
    padding-right: 15px;
  }

  .component-card .component-type {
    display: block;
    margin-top: 7px;
    color: #4ab9df;
    font-size: 11px;
  }

  .component-card::after {
    content: '›';
    position: absolute;
    right: 12px;
    top: 27px;
    color: #00c8ff;
    font-size: 22px;
  }

  .reset-button {
    flex-shrink: 0;
    margin: 10px 8px;
    height: 48px;
    border: 1px solid #00c8ff;
    background: #082635;
    color: #00c8ff;
    font-weight: bold;
    letter-spacing: 1px;
    cursor: pointer;
  }

  .reset-button:hover {
    background: #0c4055;
  }

  .viewer-section {
    min-width: 0;
    min-height: 0;
    display: flex;
    flex-direction: column;
    position: relative;
    background: #02151f;
  }

  .section-header {
    height: 48px;
    flex-shrink: 0;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #123746;
    color: #00c8ff;
    font-size: 13px;
    font-weight: bold;
    letter-spacing: 2px;
  }

  .live-model {
    color: #e8f4f8;
    font-size: 11px;
    letter-spacing: 1px;
  }

  .live-model i {
    display: inline-block;
    width: 7px;
    height: 7px;
    margin-right: 8px;
    border-radius: 50%;
    background: #00ffbf;
    box-shadow: 0 0 8px #00ffbf;
  }

  #viewer {
    flex: 1;
    min-height: 0;
    width: 100%;
    position: relative;
    overflow: hidden;
  }

  #viewer canvas {
    display: block;
    width: 100%;
    height: 100%;
  }

  .viewer-help {
    position: absolute;
    bottom: 12px;
    left: 0;
    width: 100%;
    text-align: center;
    pointer-events: none;
    color: #6ca9bf;
    font-size: 11px;
  }

  .engineering-panel {
    min-width: 0;
    min-height: 0;
    overflow-y: auto;
    padding: 22px 20px;
    border-left: 1px solid #123746;
    background: #061d28;
  }

  .engineering-panel::-webkit-scrollbar {
    width: 8px;
  }

  .engineering-panel::-webkit-scrollbar-thumb {
    background: #15556c;
  }

  .engineering-label {
    color: #91b7c7;
    font-size: 12px;
    font-weight: bold;
    letter-spacing: 2px;
    margin-bottom: 12px;
  }

  .engineering-title {
    color: #00c8ff;
    font-size: 25px;
    line-height: 29px;
    font-weight: bold;
    margin-bottom: 18px;
  }

  .engineering-description {
    color: #f0f5f7;
    font-size: 14px;
    font-weight: bold;
    line-height: 20px;
    margin-bottom: 10px;
  }

  .engineering-type {
    color: #159bc8;
    font-size: 12px;
    margin-bottom: 22px;
  }

  .data-row {
    min-height: 48px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    border-top: 1px solid #123746;
    font-size: 13px;
  }

  .data-row span:first-child {
    color: #00a7d8;
  }

  .data-row span:last-child {
    color: #f0f6f8;
    font-weight: bold;
    text-align: right;
  }

  .status-box {
    margin-top: 22px;
    padding: 17px;
    border: 1px solid #176074;
    background: #102f38;
  }

  .status-box.warning {
    border-color: #c59b00;
    background: #292b1b;
  }

  .status-caption {
    color: #9cb9c2;
    font-size: 11px;
    letter-spacing: 1px;
    margin-bottom: 10px;
  }

  .status-value {
    color: #00ffbf;
    font-size: 16px;
    font-weight: bold;
  }

  .status-box.warning .status-value {
    color: #ffd000;
  }

  .maintenance-title {
    margin-top: 26px;
    color: #eaf4f7;
    font-size: 12px;
    font-weight: bold;
    letter-spacing: 1px;
  }

  .maintenance-text {
    margin-top: 10px;
    color: #61b4d4;
    font-size: 12px;
    line-height: 19px;
  }

  .bottom-footer {
    height: 30px;
    min-height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 12px;
    border-top: 1px solid #123746;
    background: #061d28;
    color: #51859a;
    font-size: 9px;
    letter-spacing: 0.5px;
  }

  @media (max-width: 1000px) {
    .main-layout {
      grid-template-columns: 185px minmax(0, 1fr) 290px;
    }

    .engineering-title {
      font-size: 21px;
    }
  }
`;

document.head.appendChild(style);

/* =========================================================
   ENGINEERING DATA
========================================================= */

const engineeringData = {
  pumpCasing: {
    name: 'Pump Casing',
    type: 'Rotating Equipment',
    description: 'Main centrifugal pump casing',
    pressure: '4.2 bar',
    flow: '109 m³/h',
    temperature: '34 °C',
    vibration: 'Normal',
    wear: '18%',
    condition: 'Operational',
    status: 'OPERATIONAL',
    maintenance: 'Continue normal operation'
  },

  electricMotor: {
    name: 'Electric Motor',
    type: 'Drive Equipment',
    description: 'Electric motor driving the centrifugal pump',
    pressure: '—',
    flow: '—',
    temperature: '38 °C',
    vibration: 'Normal',
    wear: '12%',
    condition: 'Good',
    status: 'OPERATIONAL',
    maintenance: 'Motor operating within normal parameters'
  },

  suctionPipe: {
    name: 'Suction Pipe',
    type: 'Pipeline',
    description: 'Pump suction-side pipeline',
    pressure: '1.8 bar',
    flow: '109 m³/h',
    temperature: '32 °C',
    vibration: 'Low',
    wear: '15%',
    condition: 'Good',
    status: 'OPERATIONAL',
    maintenance: 'No immediate maintenance required'
  },

  dischargePipe: {
    name: 'Discharge Pipe',
    type: 'Pipeline',
    description: 'Pump discharge-side pipeline',
    pressure: '4.2 bar',
    flow: '109 m³/h',
    temperature: '34 °C',
    vibration: 'Normal',
    wear: '22%',
    condition: 'Good',
    status: 'OPERATIONAL',
    maintenance: 'Monitor pressure during operation'
  },

  bolts: {
    name: 'Bolts',
    type: 'Mechanical Fasteners',
    description: 'Mechanical fastening elements',
    pressure: '—',
    flow: '—',
    temperature: '34 °C',
    vibration: 'Low',
    wear: '10%',
    condition: 'Good',
    status: 'OPERATIONAL',
    maintenance: 'Check torque during scheduled inspection'
  },

  dischargeUnion: {
    name: 'Discharge Union',
    type: 'Pipeline Connection',
    description: 'Discharge pipeline connection joint',
    pressure: '4.2 bar',
    flow: '109 m³/h',
    temperature: '34 °C',
    vibration: 'Normal',
    wear: '28%',
    condition: 'Inspection Due',
    status: 'INSPECTION DUE',
    maintenance: 'Inspect joint sealing and connection'
  },

  outletElbow: {
    name: 'Outlet Discharge Elbow',
    type: 'Pipeline Connection',
    description: 'Discharge direction elbow',
    pressure: '4.2 bar',
    flow: '109 m³/h',
    temperature: '34 °C',
    vibration: 'Low',
    wear: '20%',
    condition: 'Good',
    status: 'OPERATIONAL',
    maintenance: 'Check elbow connection during maintenance'
  },

  terminalBox: {
    name: 'Terminal Box',
    type: 'Electrical Component',
    description: 'Motor electrical connection box',
    pressure: '—',
    flow: '—',
    temperature: '37 °C',
    vibration: 'Normal',
    wear: '8%',
    condition: 'Good',
    status: 'OPERATIONAL',
    maintenance: 'Check electrical terminal tightness'
  },

  electricMotorCasing: {
    name: 'Electric Motor Casing',
    type: 'Drive Equipment',
    description: 'Protective casing of electric motor',
    pressure: '—',
    flow: '—',
    temperature: '38 °C',
    vibration: 'Normal',
    wear: '14%',
    condition: 'Good',
    status: 'OPERATIONAL',
    maintenance: 'Continue routine motor inspection'
  }
};

/* =========================================================
   COMPONENT LIST
========================================================= */

const componentList = document.querySelector('#componentList');

const components = [
  ['pumpCasing', 'Pump Casing', 'Rotating Equipment'],
  ['electricMotor', 'Electric Motor', 'Drive Equipment'],
  ['suctionPipe', 'Suction Pipe', 'Pipeline'],
  ['dischargePipe', 'Discharge Pipe', 'Pipeline'],
  ['bolts', 'Bolts', 'Mechanical Fasteners'],
  ['dischargeUnion', 'Discharge Union', 'Pipeline Connection'],
  ['outletElbow', 'Outlet Discharge Elbow', 'Pipeline Connection'],
  ['terminalBox', 'Terminal Box', 'Electrical Component'],
  ['electricMotorCasing', 'Electric Motor Casing', 'Drive Equipment']
];

components.forEach(([key, name, type]) => {
  const button = document.createElement('button');

  button.className = 'component-card';
  button.dataset.component = key;

  button.innerHTML = `
    <span class="component-name">${name}</span>
    <span class="component-type">${type}</span>
  `;

  button.addEventListener('click', () => {
    selectComponent(key);
  });

  componentList.appendChild(button);
});

/* =========================================================
   THREE.JS SETUP
========================================================= */

const viewer = document.querySelector('#viewer');

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x02151f);

const camera = new THREE.PerspectiveCamera(
  45,
  viewer.clientWidth / viewer.clientHeight,
  0.1,
  5000
);

camera.position.set(4, 3, 5);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: false
});

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(viewer.clientWidth, viewer.clientHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;

viewer.appendChild(renderer.domElement);

/* =========================================================
   LIGHTING
========================================================= */

const ambientLight = new THREE.AmbientLight(0xffffff, 2.2);
scene.add(ambientLight);

const keyLight = new THREE.DirectionalLight(0xffffff, 3.5);
keyLight.position.set(5, 8, 6);
scene.add(keyLight);

const fillLight = new THREE.DirectionalLight(0x8bdcff, 2.5);
fillLight.position.set(-6, 3, 4);
scene.add(fillLight);

const rimLight = new THREE.DirectionalLight(0xffffff, 2);
rimLight.position.set(2, 5, -7);
scene.add(rimLight);

/* =========================================================
   GRID
========================================================= */

const grid = new THREE.GridHelper(
  30,
  30,
  0x07506c,
  0x063247
);

grid.position.y = -1.15;
scene.add(grid);

/* =========================================================
   CONTROLS
========================================================= */

const controls = new OrbitControls(camera, renderer.domElement);

controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.enablePan = false;
controls.minDistance = 1.2;
controls.maxDistance = 30;
controls.target.set(0, 0, 0);

/* =========================================================
   MODEL LOADING
========================================================= */

let loadedModel = null;
let originalMaterials = new Map();
let selectedMeshes = [];

const loader = new GLTFLoader();

loader.load(
  '/models/pump.glb',

  (gltf) => {
    loadedModel = gltf.scene;

    loadedModel.traverse((object) => {
      if (object.isMesh) {
        object.castShadow = true;
        object.receiveShadow = true;

        originalMaterials.set(object.uuid, object.material);

        console.log('GLB OBJECT NAME:', object.name);
      }
    });

    scene.add(loadedModel);

    // Center and scale model
    const box = new THREE.Box3().setFromObject(loadedModel);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    loadedModel.position.sub(center);

    const maxDimension = Math.max(size.x, size.y, size.z);

    if (maxDimension > 0) {
      const scale = 3.2 / maxDimension;
      loadedModel.scale.setScalar(scale);
    }

    // Recenter after scaling
    const scaledBox = new THREE.Box3().setFromObject(loadedModel);
    const scaledCenter = scaledBox.getCenter(new THREE.Vector3());
    loadedModel.position.sub(scaledCenter);

    console.log('MODEL LOADED SUCCESSFULLY');

    const availableMeshes = [];

    loadedModel.traverse((object) => {
      if (object.isMesh) {
        availableMeshes.push(object.name);
      }
    });

    console.log('AVAILABLE MESHES:', availableMeshes);

    resetCamera();
    selectComponent('pumpCasing');
  },

  undefined,

  (error) => {
    console.error('MODEL LOAD ERROR:', error);
  }
);

/* =========================================================
   EXACT BLENDER OBJECT MAPPING
========================================================= */

const meshMapping = {
  pumpCasing: [
    'Pump_casing'
  ],

  electricMotor: [
    'Electric_motor_',
    'Статор_Circle',
    'Статор_Circle_1'
  ],

  suctionPipe: [
    'Suction_pipe_'
  ],

  dischargePipe: [
    'Discharge_pipe'
  ],

  bolts: [
    'Bolts_'
  ],

  dischargeUnion: [
    'Труба_Circle002',
    'Труба_Circle002_1'
  ],

  outletElbow: [
    'Труба_Circle003',
    'Труба_Circle003_1'
  ],

  terminalBox: [
    'Terminal_box_'
  ],

  electricMotorCasing: [
    'Труба_Circle002',
    'Труба_Circle002_1',
    'Статор_Circle',
    'Статор_Circle_1'
  ]
};

/* =========================================================
   FIND MESHES
========================================================= */

function findMeshesForComponent(componentKey) {
  if (!loadedModel) return [];

  const targetNames = meshMapping[componentKey] || [];
  const matched = [];

  loadedModel.traverse((object) => {
    if (!object.isMesh) return;

    if (targetNames.includes(object.name)) {
      matched.push(object);
    }
  });

  console.log(
    'Selected component:',
    componentKey,
    'Matched meshes:',
    matched.map((mesh) => mesh.name)
  );

  return matched;
}

/* =========================================================
   RESTORE ALL ORIGINAL MATERIALS
========================================================= */

function restoreAllMaterials() {
  if (!loadedModel) return;

  loadedModel.traverse((object) => {
    if (!object.isMesh) return;

    const original = originalMaterials.get(object.uuid);

    if (original) {
      object.material = original;
    }
  });

  selectedMeshes = [];
}

/* =========================================================
   YELLOW HIGHLIGHT
========================================================= */

function highlightMeshes(meshes) {
  selectedMeshes = meshes;

  meshes.forEach((mesh) => {
    const originalMaterial = originalMaterials.get(mesh.uuid);

    if (!originalMaterial) return;

    const highlightMaterial = originalMaterial.clone();

    // Darker golden-yellow professional highlight
    highlightMaterial.color = new THREE.Color(0xb88600);
    highlightMaterial.emissive = new THREE.Color(0x5c4300);
    highlightMaterial.emissiveIntensity = 0.55;
    highlightMaterial.metalness = 0.25;
    highlightMaterial.roughness = 0.28;

    mesh.material = highlightMaterial;
  });
}

/* =========================================================
   CAMERA FOCUS
========================================================= */

function focusCameraOnMeshes(meshes) {
  if (!meshes || meshes.length === 0) {
    resetCamera();
    return;
  }

  const focusBox = new THREE.Box3();

  meshes.forEach((mesh) => {
    focusBox.expandByObject(mesh);
  });

  if (focusBox.isEmpty()) {
    resetCamera();
    return;
  }

  const focusCenter = focusBox.getCenter(new THREE.Vector3());
  const focusSize = focusBox.getSize(new THREE.Vector3());

  const maxSize = Math.max(
    focusSize.x,
    focusSize.y,
    focusSize.z
  );

  // Prevent camera from getting extremely close to small objects
  const distance = Math.max(maxSize * 3.5, 2.8);

  const direction = new THREE.Vector3(1, 0.7, 1).normalize();

  const newCameraPosition = focusCenter
    .clone()
    .add(direction.multiplyScalar(distance));

  camera.position.copy(newCameraPosition);
  controls.target.copy(focusCenter);

  camera.near = 0.01;
  camera.far = 5000;
  camera.updateProjectionMatrix();

  controls.update();
}

/* =========================================================
   SELECT COMPONENT
========================================================= */

function selectComponent(componentKey) {
  const data = engineeringData[componentKey];

  if (!data) return;

  // Update active left card
  document.querySelectorAll('.component-card').forEach((card) => {
    card.classList.toggle(
      'active',
      card.dataset.component === componentKey
    );
  });

  // Update engineering panel
  const engineeringPanel = document.querySelector('#engineeringPanel');

  const isWarning =
    data.status === 'INSPECTION DUE' ||
    data.status === 'ATTENTION';

  engineeringPanel.innerHTML = `
    <div class="engineering-label">ENGINEERING DATA</div>

    <div class="engineering-title">
      ${data.name}
    </div>

    <div class="engineering-description">
      ${data.description}
    </div>

    <div class="engineering-type">
      ${data.type}
    </div>

    <div class="data-row">
      <span>Pressure</span>
      <span>${data.pressure}</span>
    </div>

    <div class="data-row">
      <span>Flow Rate</span>
      <span>${data.flow}</span>
    </div>

    <div class="data-row">
      <span>Temperature</span>
      <span>${data.temperature}</span>
    </div>

    <div class="data-row">
      <span>Vibration</span>
      <span>${data.vibration}</span>
    </div>

    <div class="data-row">
      <span>Wear Level</span>
      <span>${data.wear}</span>
    </div>

    <div class="data-row">
      <span>Condition</span>
      <span>${data.condition}</span>
    </div>

    <div class="status-box ${isWarning ? 'warning' : ''}">
      <div class="status-caption">CURRENT STATUS</div>
      <div class="status-value">${data.status}</div>
    </div>

    <div class="maintenance-title">
      MAINTENANCE RECOMMENDATION
    </div>

    <div class="maintenance-text">
      ${data.maintenance}
    </div>
  `;

  if (!loadedModel) return;

  restoreAllMaterials();

  const meshes = findMeshesForComponent(componentKey);

  if (meshes.length > 0) {
    highlightMeshes(meshes);
    focusCameraOnMeshes(meshes);
  } else {
    console.warn(
      'No exact mesh found for:',
      componentKey,
      'Showing complete model.'
    );

    resetCamera();
  }
}

/* =========================================================
   RESET CAMERA
========================================================= */

function resetCamera() {
  if (!loadedModel) return;

  const box = new THREE.Box3().setFromObject(loadedModel);
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());

  const maxSize = Math.max(size.x, size.y, size.z);

  const distance = Math.max(maxSize * 2.8, 4);

  camera.position.set(
    center.x + distance,
    center.y + distance * 0.65,
    center.z + distance
  );

  controls.target.copy(center);
  controls.update();
}

/* =========================================================
   RESET BUTTON
========================================================= */

document.querySelector('#resetCamera').addEventListener('click', () => {
  restoreAllMaterials();
  resetCamera();
  selectComponent('pumpCasing');
});

/* =========================================================
   DOUBLE CLICK RESET
========================================================= */

renderer.domElement.addEventListener('dblclick', () => {
  restoreAllMaterials();
  resetCamera();
  selectComponent('pumpCasing');
});

/* =========================================================
   RESIZE
========================================================= */

window.addEventListener('resize', () => {
  const width = viewer.clientWidth;
  const height = viewer.clientHeight;

  if (width <= 0 || height <= 0) return;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
});

/* =========================================================
   ANIMATION
========================================================= */

function animate() {
  requestAnimationFrame(animate);

  controls.update();
  renderer.render(scene, camera);
}

animate();