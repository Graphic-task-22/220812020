import * as THREE from 'three';

var sphereGeometry = new THREE.SphereGeometry(30, 30, 30);

const texLoader = new THREE.TextureLoader();
const texture = texLoader.load( './src/assets/earth_atmos_2048.jpg' );

var sphereMaterial = new THREE.MeshStandardMaterial({
  /* color: 0xff0000,
  opacity: 0.8,
  transparent: true, */
  map: texture
  /* metalness:1.0,
  roughness:0 */
});
var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

sphere.position.set(0, 50, 0);
export default sphere;