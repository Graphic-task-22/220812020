import * as THREE from 'three';

const geometry = new THREE.BufferGeometry();

const point1 = new THREE.Vector3(0, 0, 0);
const point2 = new THREE.Vector3(100, 0, 0);
const point3 = new THREE.Vector3(0, 100, 0);

geometry.setFromPoints([point1, point2, point3,]);

const color = new Float32Array([
    1, 0, 0,  // 红
    0, 1, 0,  // 绿
    0, 0, 1,  // 蓝
]);

geometry.attributes.color = new THREE.BufferAttribute(color, 3);


const material = new THREE.PointsMaterial({
    vertexColors: true,
    size: 30,
});

const mesh= new THREE.Mesh(geometry, material);

export default mesh;
