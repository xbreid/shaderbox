import {
  WebGLRenderer,
  Scene,
} from 'three'
import { gui } from './gui'

export const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
  aspect: 1
}

// Scene
export const scene = new Scene()
scene.background = null

const canvas: HTMLElement = document.querySelector('#webgl') as HTMLElement

// Renderer
export const renderer = new WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
})

export default {
  renderer,
  gui,
}
