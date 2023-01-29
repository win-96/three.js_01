import * as THREE from 'three';
// 导入轨道控制器
import {
  OrbitControls
} from 'three/examples/jsm/controls/OrbitControls';

// 导入动画库
import gsap from 'gsap';
// console.log(THREE);

// 目标: 实现自适应画面

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
// 创建几何体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({
  color: 0xffff00
});
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
// 修改物体的位置
// cube.position.set(5, 0, 0);
// cube.position.x = 3
// 缩放位置
// cube.scale.set(3, 2, 1);
// 旋转
cube.rotation.set(Math.PI / 4, 0, 0);

scene.add(cube);
console.log(cube);
// 初始化渲染器
const renderer = new THREE.WebGLRenderer();
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);
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
let animate1 = gsap.to(cube.position, {
  duration: 5,
  x: 5,
  ease: "power3.inOut",
  // 设置重复的次数
  repeat: -1,
  // 往返运动
  yoyo: true,
  // 延迟2秒运动
  delay: 2,
  onComplete: () => {
    console.log("动画结束");
  },
  onStart: () => {
    console.log("动画开始");
  }

});
gsap.to(cube.rotation, {
  duration: 5,
  x: 2 * Math.PI,
  ease: "power3.inOut",
});
window.addEventListener('dblclick', () => {
  console.log(animate1);
  if (animate1.isActive()) {
    // 暂停
    animate1.pause();
  } else {
    // 恢复
    animate1.resume();
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