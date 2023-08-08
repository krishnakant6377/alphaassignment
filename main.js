import './style.css'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000)

const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.z = 20;


const pointLight = new THREE.PointLight("white")
pointLight.position.set(0, 0, 5)
const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(ambientLight, pointLight)


const loader = new GLTFLoader()
loader.load(
  'moon.gltf',
  function (gltf) {
    const gltfObj = gltf.scene;
    gltfObj.position.set(0, -5, 14)
    scene.add(gltfObj);
    function animate() {
      requestAnimationFrame(animate)
      gltfObj.rotation.x -= 0.001
      renderer.render(scene, camera)
    }

    animate()
  })


const text = 'THE ALPHA AGENCY';
const fontLoader = new FontLoader();
fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
  const textGeometry = new TextGeometry(text, {
    font: font,
    size: 1.7,
    height: 0.2,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5
  });
  const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const textMesh = new THREE.Mesh(textGeometry, textMaterial);

  // Position the text
  textMesh.position.set(-11, 0.9, -5);

  // Add the text mesh to the scene
  scene.add(textMesh);
});

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);