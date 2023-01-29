import * as THREE from 'three';
// 导入轨道控制器
import {
  OrbitControls
} from 'three/examples/jsm/controls/OrbitControls';
// console.log(THREE);

// 目标: 控制3d物体缩放

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
// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);


function render(timer) {
  // console.log(timer);
  // cube.position.x += 0.01;
  // cube.rotation.x += 0.01;

  let t = timer / 1000 % 5;
  cube.position.x = t * 1
  // if (cube.position.x > 5) {
  //   cube.position.x = 0;
  // }
  renderer.render(scene, camera);
  // 每一帧调用一次render函数
  requestAnimationFrame(render);
}
render();