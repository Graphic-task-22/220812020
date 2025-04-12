import * as THREE from "three";

const vector2 = [
    new THREE.Vector2(0, 0), // 起点
    new THREE.Vector2(100, 200), // 控制点,控制曲率
    new THREE.Vector2(200, 0), // 终点
];

const curve = new THREE.QuadraticBezierCurve(...vector2); // 传入数组

const points = curve.getPoints(50);

const geometry = new THREE.BufferGeometry().setFromPoints(points);

const material = new THREE.LineBasicMaterial({
    color: 0x00ff00, // 修正颜色值
});

const curveObject = new THREE.Line(geometry, material);

const geometry2 = new THREE.BufferGeometry().setFromPoints(vector2); // 修正此处

const material2 = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 5, // 添加点的大小以便更好地显示
});

const points2 = new THREE.Points(geometry2, material2);
curveObject.add(points2);

//画线把原始点连接起来
const line = new THREE.Line(geometry2, new THREE.LineBasicMaterial({ color: 0xffffff }));
curveObject.add(line);

export default curveObject;