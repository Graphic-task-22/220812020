import * as THREE from 'three';

const geometry = new THREE.CapsuleGeometry( 20, 20, 20, 80); 
const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} ); 
const capsule = new THREE.Mesh( geometry, material );

capsule.position.set(50, 50, -50);
export default capsule;