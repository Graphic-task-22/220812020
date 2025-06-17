import*as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/addons/libs/stats.module.js';
import cube from "../../mesh/cube";
import sphere from '../../mesh/sphere';
import capsule from '../../mesh/capsule';
import plane from '../../mesh/plane';
import sprite from '../../sprite/sprite';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

let renderer,camera,scene,ambientLight,animationFrameId//场景，相机，渲染器
function init() {
    //create a scene
    scene = new THREE.Scene();//object constructor new
    //scene.add(cube);
    scene.add(sphere);
    //scene.add(capsule);
    //scene.add(plane);

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
    renderer.setClearColor(0xffffff);

    renderer.render(scene, camera);
    //add the canvas element created by the renderer to doument body
    //domElement(canvas)
    
    document.body.appendChild(renderer.domElement);

     // 加载环境贴图
     /* const textureCube = new THREE.CubeTextureLoader().setPath('./src/assets/env/').load([
      'px.png', 'nx.png',
      'py.png', 'ny.png',
      'pz.png', 'nz.png'
  ], () => {
      // 贴图加载完成后更新场景和材质
      scene.environment = textureCube;
  
      cube.material.envMap = textureCube;
      cube.material.needsUpdate = true;
  
      sphere.material.envMap = textureCube;
      sphere.material.needsUpdate = true;
  
      capsule.material.envMap = textureCube;
      capsule.material.needsUpdate = true;
  }); */
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

}//动画
function animate(){
    animationFrameId = requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}
function stopAnimate() {
    cancelAnimationFrame(animationFrameId);
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

const gui = new GUI();
const obj = {
    x:0,
};

// 执行方法
const settings = {
  clear() {
      gui.children[1].reset(); // 重置
   },
   setDefault() {
    cube.position.set(0, 0, 0);
   },
   resetLight() {
    ambientLight.intensity = 0.8;
    ambientLight.color.set(0xcccccc);
   },
   startAnimate() {
    animate();
   },
   stopAnimate() {
    stopAnimate();
   },
   resetMaterial() {
    cube.material.color.set(0x00ff00);
    cube.material.transparent = true;
    cube.material.opacity = 0.7;
   },
};

const cubeMasterFolder = gui.addFolder('立方体设置');
// 分组、嵌套
const folder = cubeMasterFolder.addFolder('位置');
// 下拉菜单、单选框
folder.add(cube.position, 'x', {
  min: -10,
  max: 10,
});
folder.add(cube.position,'x',0,100);
folder.add(cube.position,'y',0,100);
folder.add(cube.position,'z',0,100);
folder.add(settings, 'setDefault').name('重置立方体位置'); // 重置到默认值

const folder3 = cubeMasterFolder.addFolder('材质');
folder3.addColor(cube.material, 'color').name('颜色')
// 布尔值设置单选框
folder3.add(cube.material, 'transparent').name('是否透明');
folder3.add(cube.material, 'opacity', 0, 1).name('透明度');
folder3.add(settings,'resetMaterial').name('重置材质'); // 重置材质

const folder2 = cubeMasterFolder.addFolder('动画');
folder2.add(settings, 'startAnimate').name('开始动画'); // 开始动画
folder2.add(settings, 'stopAnimate').name('结束动画'); // 结束动画

//球体位置
const sphereMasterFolder = gui.addFolder('球体设置');
const sphereFolder = sphereMasterFolder.addFolder('位置');
sphereFolder.add(sphere.position, 'x', -100, 100);
sphereFolder.add(sphere.position, 'y', -100, 100);
sphereFolder.add(sphere.position, 'z', -100, 100);

const sphereFolder2 = sphereMasterFolder.addFolder('材质');
sphereFolder2.addColor(sphere.material, 'color').name('颜色');
sphereFolder2.add(sphere.material, 'transparent').name('是否透明');
sphereFolder2.add(sphere.material, 'opacity', 0, 1).name('透明度');

const folder4 = gui.addFolder('灯光');
folder4.add(ambientLight,'intensity',0,1).name('环境光强度');
folder4.addColor(ambientLight, 'color').name('环境光颜色');
folder4.add(settings,'resetLight').name('重置灯光'); // 重置灯光