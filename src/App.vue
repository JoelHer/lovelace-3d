<template>
  <ha-card class="ha-card-reset">
    <div class="wrap">
      <div class="content">
        <EntityState
          v-if="entityId"
          :hass="hass"
          :entity-id="entityId"
        />
        <div v-else class="hint">
          Set an <code>entity</code> in the card config to display a state.
        </div>

        <div ref="threeMount" class="three-surface" aria-label="Three.js preview" />
      </div>
    </div>
  </ha-card>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue"
import {
  AmbientLight,
  BoxGeometry,
  DirectionalLight,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  MOUSE,
  TOUCH,
} from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import EntityState from "./components/EntityState.vue"

const props = defineProps<{
  state: {
    hass: any | null
    config: Record<string, any>
  }
}>()

const hass = computed(() => props.state?.hass)
const cfg = computed(() => props.state?.config ?? {})

const entityId = computed(() => (cfg.value.entity as string | undefined) ?? "")

const threeMount = ref<HTMLElement | null>(null)

let renderer: WebGLRenderer | null = null
let camera: PerspectiveCamera | null = null
let scene: Scene | null = null
let cube: Mesh<BoxGeometry, MeshStandardMaterial> | null = null
let frameId: number | null = null
let resizeObserver: ResizeObserver | null = null
let controls: OrbitControls | null = null

const handleResize = () => {
  if (!renderer || !camera || !threeMount.value) return
  const rect = threeMount.value.getBoundingClientRect()
  const width = Math.max(1, Math.round(rect.width) || threeMount.value.clientWidth || 300)
  const fallbackHeight = Math.round(width * 0.625)
  const height =
    Math.max(1, Math.round(rect.height)) ||
    Math.max(1, threeMount.value.clientHeight) ||
    Math.max(1, fallbackHeight)
  renderer.setSize(width, height, false)
  camera.aspect = width / height
  camera.updateProjectionMatrix()
}

const animate = () => {
  if (!renderer || !scene || !camera) return
  controls?.update()
  renderer.render(scene, camera)
  frameId = window.requestAnimationFrame(animate)
}

const setupThree = () => {
  if (!threeMount.value) return

  scene = new Scene()
  camera = new PerspectiveCamera(50, 1, 0.1, 100)
  camera.position.set(2.8, 2, 3.2)
  camera.lookAt(0, 0, 0)

  renderer = new WebGLRenderer({ antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.domElement.style.width = "100%"
  renderer.domElement.style.height = "100%"
  renderer.domElement.style.display = "block"
  threeMount.value.appendChild(renderer.domElement)

  cube = new Mesh(
    new BoxGeometry(1.2, 1.2, 1.2),
    new MeshStandardMaterial({ color: 0x4e9aff, metalness: 0.35, roughness: 0.4 })
  )
  scene.add(cube)

  const keyLight = new DirectionalLight(0xffffff, 1.05)
  keyLight.position.set(4, 6, 5)
  const fillLight = new DirectionalLight(0x88b4ff, 0.5)
  fillLight.position.set(-3, -2, -4)
  const ambient = new AmbientLight(0xffffff, 0.25)

  scene.add(keyLight, fillLight, ambient)

  handleResize()
  resizeObserver = new ResizeObserver(() => handleResize())
  resizeObserver.observe(threeMount.value)

  controls = new OrbitControls(camera, renderer.domElement)
  controls.target.set(0, 0, 0)
  controls.enableDamping = true
  controls.dampingFactor = 0.08
  controls.enableZoom = true
  controls.mouseButtons = {
    LEFT: MOUSE.ROTATE,
    MIDDLE: MOUSE.ROTATE,
    RIGHT: MOUSE.PAN,
  }
  controls.touches = {
    ONE: TOUCH.ROTATE,
    TWO: TOUCH.PAN,
  }
  controls.update()

  animate()
}

onMounted(() => {
  setupThree()
  window.addEventListener("resize", handleResize)
})

onBeforeUnmount(() => {
  if (frameId) {
    window.cancelAnimationFrame(frameId)
    frameId = null
  }
  window.removeEventListener("resize", handleResize)

  if (cube) {
    cube.geometry.dispose()
    cube.material.dispose()
    cube = null
  }

  controls?.dispose()
  controls = null

  resizeObserver?.disconnect()
  resizeObserver = null

  renderer?.dispose()
  if (renderer?.domElement?.parentNode) {
    renderer.domElement.parentNode.removeChild(renderer.domElement)
  }

  renderer = null
  camera = null
  scene = null
})
</script>
