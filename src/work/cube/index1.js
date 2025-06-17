import { render } from 'lit';
import *as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
//创造场景
const scene=new THREE.Scene();
//创建立方体
const geometry = new THREE.BoxGeometry(1,1,1);
//材质
const material = new THREE.MeshBasicMaterial({
  color:0x00ff00,
  opacity:0.5,
  transparent:true,
});
//网格
//const cube = new THREE.Mesh(geometry,material);
for(let i=0;i<10;i++){
  for(let j=0;j<10;j++){
    const cube = new THREE.Mesh(geometry,material);
    cube.position.x=2*i;
    cube.position.z=2*j;
    scene.add(cube);
  }
}

//立方体添加
//scene.add(cube);

//创建相机
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
camera.position.set(100,50,100)
camera.lookAt(0,0,0);

//添加光源
const light = new THREE.PointLight(0xffffff,1,1000,0);
light.position.set(50,50,50);
scene.add(light);

// 点光源辅助观察
const pointLightHelpler = new THREE.PointLightHelper(light);
scene.add(pointLightHelpler);

//创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.render(scene,camera);

/* function animate(params){
  requestAnimationFrame(animate);
  renderer.render(scene,camera);
  cube.rotation.x+=0.01;
  cube.rotation.y+=0.01;
} */
//定时器
//setInterval(animate,1000/60);
//animate();
window.onresize=()=>{
  console.log(window.innerHeight,window.innerWidth);
  renderer.setSize(window.innerWidth,window.innerHeight);
  camera.aspect=window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.render(scene, camera);
};

// 辅助坐标轴
const axesHelper = new THREE.AxesHelper(50);
scene.add(axesHelper);


// 设置相机控件轨道控制器OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
// 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
controls.addEventListener('change', function () {
  renderer.render(scene, camera); //执行渲染操作
}); //监听鼠标、键盘事件

// 添加一个辅助网格地面 网格地面辅助观察GridHelper
const gridHelper = new THREE.GridHelper(300, 25, 0x004444, 0x004444);
scene.add(gridHelper);