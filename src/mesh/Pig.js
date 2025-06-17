import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const loader = new GLTFLoader();
const mesh = new THREE.Group();

async function loadModels() {
  try {
    // 加载 Pig 模型
    const pigGltf = await loader.loadAsync('./src/assets/gltf/Pig.gltf');//异步加载模型文件
    mesh.add(pigGltf.scene);
    console.log('Pig 模型加载成功');

    // 添加 Pig 包围盒（黄色）
    const pigBoxHelper = new THREE.BoxHelper(pigGltf.scene, 0xffff00);
    pigBoxHelper.name = 'pigBoundingBox';
    mesh.add(pigBoxHelper);

    // 设置 Pig 动画
    const pigMixer = new THREE.AnimationMixer(pigGltf.scene);
    const pigClips = pigGltf.animations;

    if (pigClips.length > 0) {
      const defaultPigAction = pigMixer.clipAction(pigClips[2]);//选择动画片段
      defaultPigAction.setLoop(THREE.LoopRepeat);
      defaultPigAction.clampWhenFinished = true;
      defaultPigAction.repetitions = Infinity;
      defaultPigAction.play();
    }

    // 将动画混合器和剪辑数组存储在 mesh 的 userData 中，以便index5.js访问
    mesh.userData.pigMixer = pigMixer;
    mesh.userData.pigClips = pigClips;

    // 加载 Sheep 模型
    const sheepGltf = await loader.loadAsync('./src/assets/gltf/Sheep.gltf');
    sheepGltf.scene.position.set(5, 0, 0); // 与 Pig 模型分开
    mesh.add(sheepGltf.scene);
    console.log('Sheep 模型加载成功');

    // 添加 Sheep 包围盒（红色）
    const sheepBoxHelper = new THREE.BoxHelper(sheepGltf.scene, 0xff0000);
    sheepBoxHelper.name = 'sheepBoundingBox';
    mesh.add(sheepBoxHelper);

    // 设置 Sheep 动画（如果有）
    const sheepClips = sheepGltf.animations;
    if (sheepClips.length > 0) {
      const sheepMixer = new THREE.AnimationMixer(sheepGltf.scene);
      const defaultSheepAction = sheepMixer.clipAction(sheepClips[2]);
      defaultSheepAction.setLoop(THREE.LoopRepeat);
      defaultSheepAction.clampWhenFinished = true;
      defaultSheepAction.repetitions = Infinity;
      defaultSheepAction.play();

      mesh.userData.sheepMixer = sheepMixer;
      mesh.userData.sheepClips = sheepClips;
    }
  } catch (error) {
    console.error('模型加载失败:', error);
  }
}

loadModels();

export default mesh;
