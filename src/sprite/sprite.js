import * as THREE from 'three';

const texture = new THREE.TextureLoader().load('./src/assets/sprites/snowflake2.png');


const spriteMaterial = new THREE.SpriteMaterial({
    //color: 0xffffff,
    map: texture,
    rotation: Math.PI / 4,
    blending: THREE.AdditiveBlending
});

const sprite = new THREE.Sprite(spriteMaterial);

sprite.position.set(0, 0, 0);
sprite.scale.set(10, 10, 10);
export default sprite;