import * as THREE from 'three';

// 定义曲线路径点 - 更自然的贝塞尔曲线控制点
const points = [
    new THREE.Vector3(0, 0, 0),       // 起点
    new THREE.Vector3(40, 80, -30),    // 第一个平滑转折
    new THREE.Vector3(80, 120, 20),    // 高点
    new THREE.Vector3(120, 60, -20),   // 下降转折
    new THREE.Vector3(160, 20, 10),    // 终点
    new THREE.Vector3(200, 50, 0)      // 延伸点
];

// 创建曲线
const curve = new THREE.CatmullRomCurve3(points);
// 创建管道几何体
const geometry = new THREE.TubeGeometry(curve, 64, 2, 8, false);
const material = new THREE.MeshLambertMaterial({ 
    color: 'pink',
    wireframe: true
});
const mesh = new THREE.Mesh(geometry, material);

// 创建点标记
const geometry2 = new THREE.BufferGeometry();
geometry2.setFromPoints(points);
const material2 = new THREE.PointsMaterial({
    color: new THREE.Color('blue'),
    size: 10
});
const points2 = new THREE.Points(geometry2, material2);

// 创建连线
const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
const line2 = new THREE.Line(geometry2, lineMaterial);

// 添加到mesh
mesh.add(points2);
mesh.add(line2);

// 导出
export { mesh, points2 as point2, line2 };
export default mesh;