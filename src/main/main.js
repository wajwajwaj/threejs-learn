import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
console.log(THREE)
// 目的：了解threejs的最基本的内容 

// 创建场景
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera( // 透视摄像机
  75, // 视野角度
  window.innerWidth / window.innerHeight, // 宽高比
  0.1, // 近截面
  1000, // 远截面
);
// 设置相机的位置
camera.position.set(0, 0, 10)
scene.add(camera)

// 添加物体
// 创建几何体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 }) // 设置材质 基础的网格材质
// 根据几何体和材质创建物体
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
// 修改物体的位置
// cube.position.x = 3
// scale设置缩放（相当于调整物体大小），例如设置x轴放大3倍、y轴方向放大2倍、z轴方向不变
cube.scale.set(1, 1, 1);
// 将几何体添加到场景
scene.add(cube)

// 初始化渲染器
const renderer = new THREE.WebGLRenderer()
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight)
// 将webgl渲染的canvas添加到body中
document.body.appendChild(renderer.domElement)
// 使用渲染器，通过相机把场景渲染出来
// renderer.render(scene, camera)

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)

// 添加坐标轴辅助器
// 红色：x轴，绿色：y轴，蓝色：z轴
// const dir = new THREE.Vector3(1, 2, 0) // 基于箭头原点的位置
// dir.normalize()
// const origin = new THREE.Vector3(0, 0, 0) // 箭头的原点
// const length = 1 // 箭头的长度
// const hex = 0xffff00 // 箭头的颜色 十六进制值

// const axesHelper = new THREE.AxesHelper(dir, origin, length, hex)
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

let preTime
const clock = new THREE.Clock()

// 渲染函数
function render(time) {
  if (preTime === undefined) {
    preTime = time
  }
  const delaTime = time - preTime //计算每帧的画面的间隔时间
  // console.log(delaTime, time) // 时间间隔有差异，但是要保证运动速度一致  移动速度 = 速度 * 时间
  // preTime = time
  let t 
  // t = time  // 单位秒
  // cube.position.x = 1 * (t / 1000 % 5) // 处理性能
  t = clock.getElapsedTime() // 单位毫秒 
  cube.position.x = 1 * (t % 5) // 处理性能

  // cube.position.x = t * 1;
  // cube.position.x += 0.01
  cube.rotation.y += 0.01
  // 设置旋转 参数分别为x，y，z 最后一个参数表明了旋转的顺序
  // cube.rotation.set(-Math.PI / 4, 0, 0, "XZY"); 
  if (cube.position.x > 5) {
    cube.position.x = 0
  }
  // 如果需要控制器有阻尼效果，或者自动旋转效果，就要加入controls.update()
  controls.update()
  renderer.render(scene, camera)
  // 保证画面流畅，请求动画帧，在渲染下一帧的时候触发回调 执行画面的渲染---requestAnimationFrame浏览器自带函数
  requestAnimationFrame(render)
}

render()
