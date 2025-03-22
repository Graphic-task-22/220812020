import * as THREE from 'three';

const geometry = new THREE.PlaneGeometry( 200, 100,100,100 );

const texLoader = new THREE.TextureLoader();
const texture = texLoader.load( './src/assets/earth_atmos_2048.jpg' );

texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set( 6, 3 );

const material = new THREE.MeshBasicMaterial( {
    //color: 0x00ff00, 
    opacity: 0.8,
    //transparent: true,
    map: texture
} );

const plane = new THREE.Mesh( geometry, material );

plane.rotation.x = -0.5 * Math.PI;
plane.position.y = -1;

export default plane;