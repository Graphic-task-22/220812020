import * as THREE from 'three';

const curve = new THREE.EllipseCurve(
	0,  0,            // ax, aY
	200, 200,           // xRadius, yRadius
	0,  2 * Math.PI,  // aStartAngle, aEndAngle
	false,            // aClockwise
	0                 // aRotation
);

const points = curve.getPoints( 50 );
const geometry = new THREE.BufferGeometry().setFromPoints( points );

const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );

// Create the final object to add to the scene
const ellipse = new THREE.Line( geometry, material );
ellipse.rotation.x = Math.PI / 2;

const points2=new THREE.Points(geometry, new THREE.PointsMaterial({color: 0xff00ff}))

ellipse.add(points2)
export default ellipse;
