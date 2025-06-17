import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

export default function createBarChart(data) {
  const group = new THREE.Group();

  // 刻度线设置
  const axisLength = 10;
  const tickSize = 0.1;
  const tickColor = 0x000000;

  // 创建X轴
  const xAxis = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(axisLength, 0, 0)
    ]),
    new THREE.LineBasicMaterial({ color: tickColor })
  );
  group.add(xAxis);

  // 创建Y轴 
  const yAxis = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, axisLength, 0)
    ]),
    new THREE.LineBasicMaterial({ color: tickColor })
  );
  group.add(yAxis);

  // 添加刻度线
  for (let i = 1; i <= axisLength; i++) {
    // X轴刻度
    const xTick = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(i, -tickSize, 0),
        new THREE.Vector3(i, tickSize, 0)
      ]),
      new THREE.LineBasicMaterial({ color: tickColor })
    );
    group.add(xTick);

    // Y轴刻度
    const yTick = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-tickSize, i, 0),
        new THREE.Vector3(tickSize, i, 0)
      ]),
      new THREE.LineBasicMaterial({ color: tickColor })
    );
    group.add(yTick);
  }

  // 创建柱状图
  const barWidth = 0.8;
  const maxValue = Math.max(...data);
  const gradientMax = 9; // 渐变颜色的参考上限（超过这个就变红）
  const yAxisLength = Math.max(axisLength, maxValue + 2);

  // 更新Y轴长度
  yAxis.geometry.dispose();
  yAxis.geometry = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, yAxisLength, 0)
  ]);

  data.forEach((value, i) => {
    const height = value;
    const geometry = new THREE.BoxGeometry(barWidth, height, barWidth);

    const colors = [];
    const bottomColor = new THREE.Color(0x00ff00); // 绿色
    const topColor = new THREE.Color(0xff0000);    // 红色

    const position = geometry.attributes.position;
    for (let j = 0; j < position.count; j++) {
      const y = position.getY(j) + height / 2; // 顶点的世界y坐标
      const t = Math.min(Math.max(y / gradientMax, 0), 1); // 归一化，超出设为1，低于设为0
      const color = bottomColor.clone().lerp(topColor, t);
      colors.push(color.r, color.g, color.b);
    }

    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.MeshBasicMaterial({ vertexColors: true });
    const bar = new THREE.Mesh(geometry, material);

    bar.position.x = i + 0.5;
    bar.position.y = height / 2;
    group.add(bar);

    // 创建2D文字标签容器
    const labelDiv = document.createElement('div');
    labelDiv.className = 'data-label';
    labelDiv.textContent = value.toFixed(1);
    labelDiv.style.color = '#000';
    labelDiv.style.fontSize = '12px';
    labelDiv.style.fontFamily = 'Arial, sans-serif';
    labelDiv.style.fontWeight = 'bold';
    labelDiv.style.background = 'transparent'; // ✅ 没有底色

    group.userData.labels = group.userData.labels || [];
    group.userData.labels.push({
      element: labelDiv,
      position: new THREE.Vector3(i + 0.5, height + 0.2, 0)
    });
  });

  return group;
}
