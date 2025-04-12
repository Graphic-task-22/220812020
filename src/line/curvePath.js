import * as THREE from 'three';

// 定义场景
const scene = new THREE.Scene();

// 线1
const p1 = new THREE.Vector2(0,0);
const p2 = new THREE.Vector2(100, 100);
const line1 = new THREE.LineCurve(p1, p2);

// 线2
const p3 = new THREE.Vector2(100, 100); // 修改起点以连接线1和线2
const p4 = new THREE.Vector2(-100, -100);
const line2 = new THREE.LineCurve(p3, p4);

// 椭圆
const ellipse = new THREE.EllipseCurve(
  0, 0, // center
  100, 50, // radius
  0, 2 * Math.PI, // start angle
  false, // counterclockwise
  0 // rotation
);

// 将椭圆转换为点集
const ellipsePoints = ellipse.getPoints(20);

// 将椭圆点集转换为 LineCurve
const ellipseLine = new THREE.SplineCurve(ellipsePoints);

// 连接
const curvePath = new THREE.CurvePath();
curvePath.add(line1);
curvePath.add(line2);
curvePath.add(ellipseLine);

const geometry = new THREE.BufferGeometry().setFromPoints(curvePath.getPoints(50));
const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
const line = new THREE.Line(geometry, material);

scene.add(line);

export default line;