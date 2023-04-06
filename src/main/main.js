import * as THREE from "three"
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
// 将几何体添加到场景
scene.add(cube)

// 初始化渲染器
const renderer = new THREE.WebGLRenderer()
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight)
// 将webgl渲染的canvas添加到body中
document.body.appendChild(renderer.domElement)
// 使用渲染器，通过相机把场景渲染出来
renderer.render(scene, camera)
