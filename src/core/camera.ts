import { OrthographicCamera } from 'three'
import { scene, sizes } from './renderer'

// const VERTICAL_FIELD_OF_VIEW = 70 // degrees 45 is the normal

// export const camera = new PerspectiveCamera(
//   VERTICAL_FIELD_OF_VIEW,
//   sizes.width / sizes.height,
// )

export const camera = new OrthographicCamera(
  1 / -2,
  1 / 2,
  1 / 2,
  1 / -2,
  -1000,
  1000
)

camera.position.set(0, 0, 2)

scene.add(camera)

export default camera
