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
// 加载hdr图片

// const rgbLoader = new RGBELoader();
// rgbLoader.loadAsync('textures/hdr/002.hdr').then(function (texture) {
//   texture.mapping = THREE.EquirectangularReflectionMapping;
//   scene.background = texture;
//   scene.environment = texture;
// })
// 目标: 灯光与阴影的关系与设置



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
const planeGeometry = new THREE.PlaneGeometry(10, 10);
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
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 10, 10);
// 光照投射阴影
directionalLight.castShadow = true;
// 设置阴影贴图的模糊程度
directionalLight.shadow.radius = 20;
// 设置阴影贴图的分辨率
directionalLight.shadow.mapSize.set(2048, 2048);
// console.log(directionalLight.shadow);

// 设置平行光投射相机的属性
directionalLight.shadow.camera.near = 0;
directionalLight.shadow.camera.far = 500;
directionalLight.shadow.camera.left = -5;
directionalLight.shadow.camera.right = 5;
directionalLight.shadow.camera.top = 5;
directionalLight.shadow.camera.bottom = -5;

scene.add(directionalLight);
gui.add(directionalLight.shadow.camera, "near").min(0).max(10).step(0.1).onChange(() => {
  directionalLight.shadow.camera.updateProjectionMatrix()
})
// 初始化渲染器
const renderer = new THREE.WebGLRenderer();
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);

// 开启场景中的阴影贴图
renderer.shadowMap.enabled = true;
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