import * as THREE from 'three'
import { renderer, scene, sizes } from './core/renderer'
import { fpsGraph, gui } from './core/gui'
import camera from './core/camera'
import { controls } from './core/orbit-control'

import './style.css'

// Shaders
import vertexShader from '/@/shaders/vertex.glsl'
import fragmentShader from '/@/shaders/fragment.glsl'

const clock = new THREE.Clock()
const planeGeometry = new THREE.PlaneBufferGeometry(1, 1, 1, 1)
const planeMaterial = new THREE.ShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
    uFrequency: { value: new THREE.Vector2(20, 15) },
    resolution: { value: new THREE.Vector4() }
  },
  vertexShader,
  fragmentShader,
  extensions: {
    // @ts-ignore
    derivatives: "#extension GL_OES_standard_derivatives : enable"
  },

  side: THREE.DoubleSide
})

const plane = new THREE.Mesh(planeGeometry, planeMaterial)

scene.add(plane)

function updateRenderer() {
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // To avoid performance problems on devices with higher pixel ratio
  renderer.setClearColor(0xffffff, 1)
}

function onResize() {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  sizes.aspect = 1
  let z, w

  updateRenderer()

  if (sizes.height / sizes.width > sizes.aspect) {
    z = (sizes.width / sizes.height) * sizes.aspect;
    w = 1;
  } else {
    z = 1;
    w = (sizes.height / sizes.width) * sizes.aspect;
  }

  planeMaterial.uniforms.resolution.value.x = sizes.width
  planeMaterial.uniforms.resolution.value.y = sizes.height
  planeMaterial.uniforms.resolution.value.z = z
  planeMaterial.uniforms.resolution.value.w = w
  
  camera.updateProjectionMatrix()
}

window.addEventListener('resize', onResize, false)

onResize()

const loop = () => {
  planeMaterial.uniforms.uTime.value = clock.getElapsedTime()

  fpsGraph.begin()

  controls.update()
  renderer.render(scene, camera)

  fpsGraph.end()
  requestAnimationFrame(loop)
}

loop()
