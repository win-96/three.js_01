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
// 目标: BufferGeometry设置顶点创建矩形


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
for (let i = 0; i < 50; i++) {
  const geometry = new THREE.BufferGeometry()
  const positionArray = new Float32Array([
    -1.0, -1.0, 1,
    1.0, -1.0, 1.0,
    1.0, 1.0, 1.0,
    1.0, 1.0, 1.0,
    -1.0, 1.0, 1.0,
    -1.0, -1.0, 1.0,
  ])
  // 每一个三角形,需要3个顶点,每个顶点有3个坐标
  for (let j = 0; j < 9; j++) {
    positionArray[j] = Math.random() * 5
  }
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  const Material = new THREE.MeshBasicMaterial({
    color: 0xffff00
  });
  const mesh = new THREE.Mesh(geometry, Material);
  scene.add(mesh);

}

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

gsap.to(mesh.rotation, {
  duration: 5,
  x: 2 * Math.PI,
  ease: "power3.inOut",
});
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
const gui = new dat.GUI();
const f1 = gui.addFolder('控制器');
f1.add(mesh.position, 'x', 0, 5).step(0.01).name('移动x轴').onChange((value) => {
  console.log('改变了', value);
}).onFinishChange(value => {
  console.log('改变完成', value);
})
// 修改物体的颜色
const params = {
  color: "#ffff00",
  fn: () => {
    gsap.to(mesh.position, {
      duration: 1,
      x: 5,
      ease: "power3.inOut",
      yoyo: true,
      repeat: -1
    });
  }
}
// 设置颜色
f1.addColor(params, 'color').name('颜色').onChange((value) => {
  console.log('改变了', value);
  mesh.material.color.set(value);
})
// 设置显示框
f1.add(mesh, 'visible').name('是否显示').onChange((value) => {
  console.log('改变了', value);
})
// 点击触发某个事件
f1.add(params, 'fn').name('点击触发事件');
// 设置线框
f1.add(mesh.material, 'wireframe').name('是否显示线框')