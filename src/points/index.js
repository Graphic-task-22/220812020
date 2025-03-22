import * as THREE from 'three';

const geometry = new THREE.BoxGeometry(10, 10, 10);

const pointmaterial = new THREE.PointsMaterial({
    size: 0.1,
    color: 0xffffff
});

const points = new THREE.Points(geometry, pointmaterial);
export default points;