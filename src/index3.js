import*as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/addons/libs/stats.module.js';
import EllipseCurve from './line/EllipseCurve';
import spline from './line/SplineCurve';
import quadratic from './line/QuadraticBezierCurve';
import curvePath from './line/curvePath';
import mountain,{updatePosition} from './demo/mountain';
import sprite from './sprite/sprite';
import points from './points/index';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

let renderer,camera,scene,ambientLight,animationFrameId//场景，相机，渲染器
function init() {
    //create a scene
    scene = new THREE.Scene();//object constructor new
    scene.add(mountain);

     // 环境光
    ambientLight = new THREE.AmbientLight(0xffffff, 0.8); //强度为0.8
    scene.add(ambientLight);

    //create a camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);//角度，宽高比，近远
    // 设置相机摆放的位置
    camera.position.set(100, 100, 100);
    // 设置相机看向的位置
    camera.lookAt(0, 0, 0);

    //create a renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    //背景颜色
    //renderer.setClearColor(0x0fffff);

    renderer.render(scene, camera);
    
    document.body.appendChild(renderer.domElement);
}

window.onresize = function () {
    //console.log(window.innerHeight, window.innerWidth);
    if(!renderer)return;
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

function initHelper(params){ //params是默认参数
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
    //const gridHelper = new THREE.GridHelper(300, 25, 0x004444, 0x004444);
    //scene.add(gridHelper);

}
function animate(){
  updatePosition();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
// 初始化性能插件
function initStats(params) {
    const stats = new Stats();
    //stats.domElement:web页面上输出计算结果,一个div元素，
    document.body.appendChild(stats.domElement);
    // 渲染函数
    function render() {
      //requestAnimationFrame循环调用的函数中调用方法update(),来刷新时间
      stats.update();
      renderer.render(scene, camera); //执行渲染操作
      requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
    }
    render();
  }
  

init();
initHelper();
initStats();
animate();