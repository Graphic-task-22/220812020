import * as THREE from 'three';

const points = [
    new THREE.Vector2(30, 10),
    new THREE.Vector2(50, 50),
    new THREE.Vector2(20, 80),
    new THREE.Vector2(80, 150)
]
const geometry  = new THREE.LatheGeometry(points,20);
const material = new THREE.MeshLambertMaterial({
    color: 'pink'
});

const mesh = new THREE.Mesh(geometry, material);

// 创建点几何体
const pointGeometry = new THREE.BufferGeometry();
pointGeometry.setFromPoints(points);
const pointMaterial = new THREE.PointsMaterial({
    color: 'blue',
    size: 10
});
const point2 = new THREE.Points(pointGeometry, pointMaterial);
mesh.add(point2);

// 创建线几何体
const lineGeometry = new THREE.BufferGeometry();
lineGeometry.setFromPoints(points);
const lineMaterial = new THREE.LineBasicMaterial({
    color: 'green'
});
const line2 = new THREE.Line(lineGeometry, lineMaterial);
mesh.add(line2);

export { mesh, point2, line2 };