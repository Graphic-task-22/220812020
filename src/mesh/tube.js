import * as THREE from 'three';

const arr = [
  new THREE.Vector3(-100, 0, 0),
  new THREE.Vector3(-50, 150, 0),
  new THREE.Vector3(0, 0, 50),
  new THREE.Vector3(100, 50, -50),
];
const curve = new THREE.CubicBezierCurve3(...arr);
const points = curve.getPoints(30);
const geometry = new THREE.TubeGeometry(curve, 30, 50, 30, false);
const material = new THREE.MeshLambertMaterial({
  color: new THREE.Color('white'),
  // side: THREE.DoubleSide,
  // wireframe: true,
});
const tube = new THREE.Mesh(geometry, material);
// const geometry2 = new THREE.BufferGeometry();
// geometry2.setFromPoints(points);
// const material2 = new THREE.PointsMaterial({
//   color: new THREE.Color('blue'),
//   size: 10,
// });
// const points2 = new THREE.Points(geometry2, material2);
// const line2 = new THREE.Line(geometry2, new THREE.LineBasicMaterial());
// tube.add(points2, line2);

export default tube;
