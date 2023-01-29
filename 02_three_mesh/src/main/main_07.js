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
// 目标: Ao环境遮挡


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
const textureLoader = new THREE.TextureLoader();
const doorColorText = textureLoader.load('./textures/door/color.jpg')
const doorAplhaTexture = textureLoader.load('./textures/door/alpha.jpg');
const doorAoTexture = textureLoader.load('./textures/door/ambientOcclusion.jpg');


// 创建正方形
const cubeGeometry = new THREE.BoxBufferGeometry(1, 1, 1);
// 创建材质
const basicMaterial = new THREE.MeshBasicMaterial({
  color: '#ffff00',
  map: doorColorText,
  alphaMap: doorAplhaTexture,
  transparent: true,
  aoMap: doorAoTexture,
  aoMapIntensity: 1,
  // opacity: 0.3,
  // side: THREE.DoubleSide
});
basicMaterial.side = THREE.DoubleSide;
const cube = new THREE.Mesh(cubeGeometry, basicMaterial);
scene.add(cube);

// 给cube添加第二个uv
cubeGeometry.setAttribute('uv2', new THREE.BufferAttribute(cubeGeometry.attributes.uv.array, 2));

const planeGeometry = new THREE.PlaneBufferGeometry(1, 1);
// 添加平面
const plane = new THREE.Mesh(
  planeGeometry,
  basicMaterial
)
plane.position.set(3, 0, 0);
// 给平面设置第二组uv
planeGeometry.setAttribute('uv2', new THREE.BufferAttribute(planeGeometry.attributes.uv.array, 2));

scene.add(plane);

// console.log(plane);


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
// 创建一个GUI