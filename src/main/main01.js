import * as THREE from "three";
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// 导入动画库
import gsap from "gsap";

// console.log(THREE);

// 目标：掌握gsap设置各种动画效果

// 1、创建场景
const scene = new THREE.Scene();

// 2、创建相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// 设置相机位置
camera.position.set(0, 0, 10);
scene.add(camera);

// 添加物体
// 创建几何体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
// 根据几何体和材质创建物体
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

// 修改物体的位置
// cube.position.set(5, 0, 0);
// cube.position.x = 3;
// 缩放
// cube.scale.set(3, 2, 1);
// cube.scale.x = 5;
// 旋转
cube.rotation.set(Math.PI / 4, 0, 0, "XZY");

// 将几何体添加到场景中
scene.add(cube);

console.log(cube);

// 初始化渲染器
const renderer = new THREE.WebGLRenderer();
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);
// console.log(renderer);
// 将webgl渲染的canvas内容添加到body
document.body.appendChild(renderer.domElement);

// // 使用渲染器，通过相机将场景渲染进来
// renderer.render(scene, camera);

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);
// 设置时钟
const clock = new THREE.Clock();

// 设置动画
var animate1 = gsap.to(
  cube.position,
  {
    x: 5, // 终点位置
    duration: 5, // 动画持续时间
    easy: 'power1.inOut', // 控制补间期间的变化率
    repeat: -1, // 重复次数 -1代表无限循环
    yoyo: true, // 设置往返运动
    delay: 2, // 延迟运动时间
    onComplete: () => {
      console.log('动画完成')
    },
    onStart: () => {
      console.log('动画开始')
    }
  }
)
console.log(Math.PI,'Math.PI')
gsap.to(cube.rotation, {
  x: 2 * Math.PI,
  duration: 5,
  esay: 'power1.inOut'
})

window.addEventListener('click', () => {
  if (animate1.isActive()) {
    animate1.pause() // 暂停
  } else {
    animate1.resume() // 恢复
  }
})
window.addEventListener('dblclick', () => {
  const fullScreenElement = document.fullscreenElement // 全屏的状态
  if (!fullScreenElement) { // 若不是全屏就返回null
    renderer.domElement.requestFullscreen()
  } else {
    document.exitFullscreen() // 退出全屏状态
  }
})
window.addEventListener('resize', () => {
  // 页面比例发生了改变
  camera.aspect = window.innerWidth / window.innerHeight // 更新摄像头
  camera.updateProjectionMatrix() // 更新摄像机的投影矩阵

  renderer.setSize(window.innerWidth, window.innerHeight) // 更新渲染器
  renderer.setPixelRatio(window.devicePixelRatio) // 设置渲染器的像素比
})

function render() {
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}

render()