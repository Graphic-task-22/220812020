import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import createBarChart from '../../mesh/bar.js';

// 示例数据
const sampleData = [3, 7, 5, 9, 6, 4, 8];

// 创建场景
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0);

// 添加柱状图
const barChart = createBarChart(sampleData);
barChart.position.set(-4, -3, 0);
scene.add(barChart);

// 创建相机
const camera = new THREE.PerspectiveCamera(
  75, 
  window.innerWidth / window.innerHeight,
  0.1, 
  1000
);
camera.position.set(0, 0, 15);

// 创建WebGL渲染器
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 创建CSS2D渲染器
const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0';
labelRenderer.domElement.style.pointerEvents = 'none';
document.body.appendChild(labelRenderer.domElement);

// 添加轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// 添加光源
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 10, 7);
scene.add(directionalLight);

// 添加2D标签
const labels = [];
if (barChart.userData.labels) {
  barChart.userData.labels.forEach(labelInfo => {
    const label = new CSS2DObject(labelInfo.element);
    label.position.copy(labelInfo.position);
    barChart.add(label);
    labels.push(label);
  });
}

// 动画循环
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
}
animate();

// 响应式调整
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  labelRenderer.setSize(window.innerWidth, window.innerHeight);
});

// 添加CSS样式
const style = document.createElement('style');
style.textContent = `
  .data-label {
    background: rgba(255,255,255,0.7);
    padding: 2px 5px;
    border-radius: 3px;
    transform: translate(-50%, 0);
    white-space: nowrap;
  }
`;
document.head.appendChild(style);
