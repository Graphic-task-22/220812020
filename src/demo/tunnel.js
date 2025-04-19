import * as THREE from 'three';

// 使用圆环状闭合路径，点均匀分布在圆周上，保证顺滑
const points = [];
const radius = 40;
const height = 15;
const numPoints = 12;

for (let i = 0; i < numPoints; i++) {
  const angle = (i / numPoints) * Math.PI * 2;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius * 0.3 + height; // 加点起伏
  const z = Math.sin(angle) * radius;
  points.push(new THREE.Vector3(x, y, z));
}

const curve = new THREE.CatmullRomCurve3(points, true); // 自动首尾平滑闭合


const geometry = new THREE.TubeGeometry(curve, 100, 5, 20, true); // 100 为分段数，5 为管道半径，20 为环形分段数


const loader = new THREE.TextureLoader();
const texture =loader.load('./src/assets/light2.jpg');
texture.wrapS = THREE.RepeatWrapping;
texture.colorSpace = THREE.SRGBColorSpace;
texture.repeat.x=50;
const material = new THREE.MeshBasicMaterial({ 
    //color: 0xff0000,
    side: THREE.DoubleSide,
    map: texture,
    aoMap:texture
    //wireframe: true
 });

 const tube = new THREE.Mesh(geometry, material);
 export const tubePoints = curve.getPoints(1000); // 获取曲线上的点，用于生成管道的几何体
 export default tube;