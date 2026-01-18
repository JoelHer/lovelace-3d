<template>
  <div
    class="frame"
    @pointermove="onMove"
    @pointerleave="onLeave"
  >
    <div class="card" :style="cardStyle">
      <div class="header">
        <div class="title">{{ title }}</div>
        <div class="subtitle">{{ subtitle }}</div>
      </div>

      <div class="slot">
        <slot />
      </div>

      <div class="glow" :style="glowStyle"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue"

const props = defineProps<{
  title: string
  subtitle: string
}>()

const rx = ref(0) // rotateX
const ry = ref(0) // rotateY
const gx = ref(50) // glow x (percent)
const gy = ref(50) // glow y (percent)

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

function onMove(e: PointerEvent) {
  const el = e.currentTarget as HTMLElement
  const r = el.getBoundingClientRect()

  const px = (e.clientX - r.left) / r.width
  const py = (e.clientY - r.top) / r.height

  // tilt range
  ry.value = clamp((px - 0.5) * 14, -10, 10)
  rx.value = clamp((0.5 - py) * 14, -10, 10)

  gx.value = clamp(px * 100, 0, 100)
  gy.value = clamp(py * 100, 0, 100)
}

function onLeave() {
  rx.value = 0
  ry.value = 0
  gx.value = 50
  gy.value = 50
}

const cardStyle = computed(() => ({
  transform: `rotateX(${rx.value}deg) rotateY(${ry.value}deg) translateZ(0)`,
}))

const glowStyle = computed(() => ({
  background: `radial-gradient(circle at ${gx.value}% ${gy.value}%, rgba(255,255,255,0.22), rgba(255,255,255,0.00) 55%)`,
}))
</script>

<style scoped>
.frame {
  perspective: 900px;
}

.card {
  position: relative;
  border-radius: 16px;
  overflow: hidden;

  background: var(--ha-card-background, var(--card-background-color));
  color: var(--primary-text-color);

  border: 1px solid color-mix(in srgb, var(--divider-color) 70%, transparent);
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.25);

  transform-style: preserve-3d;
  transition: transform 120ms ease;
}

.header {
  padding: 12px 12px 6px 12px;
}

.title {
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.subtitle {
  font-size: 0.9rem;
  opacity: 0.8;
  color: var(--secondary-text-color);
  margin-top: 2px;
}

.slot {
  padding: 0 0 6px 0;
}

.glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  mix-blend-mode: overlay;
}
</style>
