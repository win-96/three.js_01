import * as THREE from 'three';
// 导入轨道控制器
import {
  OrbitControls
} from 'three/examples/jsm/controls/OrbitControls';

// 导入动画库
import gsap from 'gsap';
// console.log(THREE);
// 导入dat.gui
import * as dat from 'dat.gui';

// 导入RGBELoader
import {
  RGBELoader
} from 'three/examples/jsm/loaders/RGBELoader';
// 创建一个GUI
const gui = new dat.GUI();

// 目标: 聚光灯



// 1.创建一个场景
const scene = new THREE.Scene();

// 创建一个相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
// 相机位置
camera.position.set(0, 0, 10);
scene.add(camera);
// 添加物体
// 导入纹理

// 创建正方形
const sphereGeometry = new THREE.SphereGeometry(1, 20, 20);
const material = new THREE.MeshStandardMaterial();
const sphere = new THREE.Mesh(sphereGeometry, material);
// 物体 投射阴影
sphere.castShadow = true;
scene.add(sphere);
// // 给场景添加背景
// 创建平面
const planeGeometry = new THREE.PlaneGeometry(50, 50);
const plane = new THREE.Mesh(planeGeometry, material);
plane.position.set(0, -1, 0);
plane.rotation.x = -Math.PI / 2;
// 接收阴影
plane.receiveShadow = true;
scene.add(plane);

// 灯光
// 环境光
const light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);
// 直线光
const spotLight = new THREE.SpotLight(0xffffff, 1);
spotLight.position.set(10, 10, 10);
// 光照投射阴影
spotLight.castShadow = true;
spotLight.intensity = 2;
// 设置阴影贴图的模糊程度
spotLight.shadow.radius = 20;
// 设置阴影贴图的分辨率
spotLight.shadow.mapSize.set(4096, 4096);
// console.log(spotLight.shadow);
spotLight.target = sphere
spotLight.angle = Math.PI / 6;
spotLight.distance = 0
spotLight.penumbra = 0
spotLight.decay = 0;

// 设置透视相机的属性


scene.add(spotLight);
gui.add(sphere.position, "x").min(-5).max(5).step(0.1)
gui.add(spotLight, "angle").min(0).max(Math.PI / 2).step(0.01)
gui.add(spotLight, "distance").min(0).max(50).step(0.01)
gui.add(spotLight, "penumbra").min(0).max(1).step(0.01)
gui.add(spotLight, "decay").min(0).max(5).step(0.01)

// 初始化渲染器
const renderer = new THREE.WebGLRenderer();
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);

// 开启场景中的阴影贴图
renderer.shadowMap.enabled = true;
renderer.physicallyCorrectLights = true;
// 把渲染器添加到页面中
document.body.appendChild(renderer.domElement);
// 渲染
renderer.render(scene, camera);

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
// 设置控制器阻尼,让控制器更有真实效果
controls.enableDamping = true;

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);
// 设置时钟
const clock = new THREE.Clock();
// render();
// 设置动画


window.addEventListener('dblclick', () => {
  // 双击控制屏幕进入全屏,退出全屏
  if (document.webkitIsFullScreen) {
    document.webkitExitFullscreen();
  } else {
    document.body.webkitRequestFullscreen();
  }

})

function render() {
  controls.update();
  renderer.render(scene, camera);
  // 每一帧调用一次render函数
  requestAnimationFrame(render);
}
render();



// 监听画面变化,更新渲染画面
window.addEventListener('resize', () => {
  // 更新摄像头
  camera.aspect = window.innerWidth / window.innerHeight;
  // 更新摄像机的摄影矩阵
  camera.updateProjectionMatrix();
  // 更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 设置渲染器的像素比
  renderer.setPixelRatio(window.devicePixelRatio);

})