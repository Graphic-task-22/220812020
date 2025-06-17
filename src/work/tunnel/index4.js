import*as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/addons/libs/stats.module.js';
import mountain,{updatePosition} from '../../demo/mountain';
import plane from '../../mesh/plane'
//import { mesh, points2, line2 } from './line/lathe'
//import { mesh, point2, line2 } from './mesh/tube'
import shape from '../../mesh/shape'
import tunnel,{tubePoints} from '../../demo/tunnel'
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

let renderer,camera,scene,ambientLight,animationFrameId//场景，相机，渲染器
function init() {
    //create a scene
    scene = new THREE.Scene();//object constructor new
    scene.add(tunnel);

     // 环境光
    ambientLight = new THREE.AmbientLight(0xffffff, 0.8); //强度为0.8
    scene.add(ambientLight);

    // 添加平行光作为主光源
    const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
    directionalLight.position.set(100, 100, 50);
    scene.add(directionalLight);
    
    // 添加半球光增强自然光照
    const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    scene.add(hemisphereLight);

    //create a camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);//角度，宽高比，近远
    // 设置相机摆放的位置（调整到更适合查看管道的位置）
    camera.position.set(150, 150, 150);
    // 设置相机看向的位置（看向管道中心区域）
    camera.lookAt(50, 50, 0);

    //create a renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    //背景颜色
    //renderer.setClearColor(0x0ffffff);

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
    const gridHelper = new THREE.GridHelper(300, 25, 0x004444, 0x004444);
    scene.add(gridHelper);

}
let i = 0;
function animate(){
  if(i < tubePoints.length-1) {
    const point = tubePoints[i];
    camera.position.copy(point);
    const nextPoint = tubePoints[i + 1]; // 最后一个点，下一个点是它自己
    camera.lookAt(nextPoint);
    i=i+1;
  }else{
    i = 0;
  }
  //updatePosition();
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