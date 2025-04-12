import*as THREE from 'three';
import { createNoise2D } from 'simplex-noise';

const geometry=new THREE.PlaneGeometry(500,500,100,100);
const noise2D=createNoise2D();

const material=new THREE.MeshBasicMaterial({
    color: new THREE.Color('pink'),
    wireframe:true,
});

const planeMesh=new THREE.Mesh(geometry,material);

function updatePosition(){
    const positions = geometry.attributes.position;
    for(let i=0;i<positions.count;i++){
        const x=positions.getX(i);
        const y=positions.getY(i);
        const z=noise2D(x/100,y/100)*50;
        const sinNum = Math.sin(Date.now() * 0.002 + x * 0.05) * 10;

        positions.setZ(i, z+sinNum);
    }
    positions.needsUpdate=true;
}

planeMesh.rotation.x=-Math.PI/2;
export default planeMesh;
export{updatePosition};