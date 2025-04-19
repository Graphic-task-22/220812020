import * as THREE from 'three';
import { depth } from 'three/tsl';

const shape = new THREE.Shape();

// 五角星参数
const centerX = 50;
const centerY = 50;
const outerRadius = 40;
const innerRadius = 15;

// 绘制五角星
for (let i = 0; i <= 10; i++) {
    const angle = Math.PI * 2 * i / 10 - Math.PI/2;
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    
    if (i === 0) {
        shape.moveTo(x, y);
    } else {
        shape.lineTo(x, y);
    }
}

// 闭合形状
shape.lineTo(
    centerX + outerRadius * Math.cos(Math.PI * 2 * 0 / 10 - Math.PI/2),
    centerY + outerRadius * Math.sin(Math.PI * 2 * 0 / 10 - Math.PI/2)
);

// 创建五角星孔洞
const starPath = new THREE.Path();
const holeRadius = 15; // 孔洞大小
const holeCenterX = 50;
const holeCenterY = 50;

for (let i = 0; i <= 10; i++) {
    const angle = Math.PI * 2 * i / 10 - Math.PI/2;
    const radius = i % 2 === 0 ? holeRadius : holeRadius * 0.4;
    const x = holeCenterX + radius * Math.cos(angle);
    const y = holeCenterY + radius * Math.sin(angle);
    
    if (i === 0) {
        starPath.moveTo(x, y);
    } else {
        starPath.lineTo(x, y);
    }
}

// 闭合孔洞形状
starPath.lineTo(
    holeCenterX + holeRadius * Math.cos(Math.PI * 2 * 0 / 10 - Math.PI/2),
    holeCenterY + holeRadius * Math.sin(Math.PI * 2 * 0 / 10 - Math.PI/2)
);

shape.holes.push(starPath);

// 创建挤出几何体
const extrudeSettings = {
    depth: 10,          // 挤出厚度
    bevelEnabled: true,  // 启用倒角
    bevelSize: 1,       // 倒角大小
    bevelThickness: 1    // 倒角厚度
};
const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
const material = new THREE.MeshPhongMaterial({ 
    color: 'pink',
    side: THREE.DoubleSide,
    specular: 0x111111,
    shininess: 30
});

const mesh = new THREE.Mesh(geometry, material);
export default mesh;