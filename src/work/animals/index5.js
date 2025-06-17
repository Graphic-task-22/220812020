// index5.js
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import pig from '../../mesh/Pig.js';

const scene = new THREE.Scene();

const pigMesh = pig;
pigMesh.position.set(0, 0, 0);
scene.add(pigMesh);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(100, 50, 100);
camera.lookAt(0, 0, 0);

const light = new THREE.PointLight(0xffffff, 2, 1000, 0);
light.position.set(130, 150, 100);
scene.add(light);

const pointLightHelper = new THREE.PointLightHelper(light);
scene.add(pointLightHelper);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', function () {
  renderer.render(scene, camera);
});

const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();
  if (pigMesh.userData.pigMixer) pigMesh.userData.pigMixer.update(delta);
  if (pigMesh.userData.sheepMixer) pigMesh.userData.sheepMixer.update(delta);
  controls.update();
  renderer.render(scene, camera);
}
animate();

window.onresize = () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};

const axesHelper = new THREE.AxesHelper(200);
// scene.add(axesHelper);
const gridHelper = new THREE.GridHelper(300, 25, 0x004444, 0x004444);
scene.add(gridHelper);

// === GUI 控制面板 ===
const gui = new GUI({ width: 300 });
const controlObj = {
  playPig: true,
  playSheep: true,
  pigAnimationIndex: 2,
  sheepAnimationIndex: 2
};

const guiFolder = gui.addFolder('动画控制');

// 控制Pig动画开关
guiFolder.add(controlObj, 'playPig').name('播放Pig动画').onChange(val => {
  const mixer = pigMesh.userData.pigMixer;
  if (mixer) mixer.timeScale = val ? 1 : 0;
});

// 控制Sheep动画开关
guiFolder.add(controlObj, 'playSheep').name('播放Sheep动画').onChange(val => {
  const mixer = pigMesh.userData.sheepMixer;
  if (mixer) mixer.timeScale = val ? 1 : 0;
});

// 动画切换控制器
guiFolder.add(controlObj, 'pigAnimationIndex', { Idle: 0, Death: 1, WalkSlow: 2, Jump: 3,Walk: 4 }).name('Pig动画').onChange(index => {
  const mixer = pigMesh.userData.pigMixer;
  const clips = pigMesh.userData.pigClips;
  if (mixer && clips) {
    mixer.stopAllAction();
    mixer.clipAction(clips[index]).play();
  }
});

guiFolder.add(controlObj, 'sheepAnimationIndex', { WalkSlow: 0, Death: 1, Jump: 2, Walk: 3,Idle: 4 }).name('Sheep动画').onChange(index => {
  const mixer = pigMesh.userData.sheepMixer;
  const clips = pigMesh.userData.sheepClips;
  if (mixer && clips) {
    mixer.stopAllAction();
    mixer.clipAction(clips[index]).play();
  }
});

guiFolder.open();