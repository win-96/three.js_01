import * as THREE from 'three';
// console.log(THREE);

// 目标:了解three.js的基本使用

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
scene.add(cube);
// 初始化渲染器
const renderer = new THREE.WebGLRenderer();
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);
// 把渲染器添加到页面中
document.body.appendChild(renderer.domElement);
// 渲染
renderer.render(scene, camera);