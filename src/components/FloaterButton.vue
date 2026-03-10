<template>
  <button
    class="floater-btn"
    :class="{ active: !!isActive, on: !!isOn }"
    :style="buttonStyle"
    type="button"
    :aria-label="label"
    @pointerdown="onPointerDown"
    @pointerup="onPointerUp"
    @pointercancel="onPointerCancel"
    @lostpointercapture="onPointerCancel"
    @keydown.enter.prevent="$emit('press')"
    @keydown.space.prevent="$emit('press')"
    @contextmenu.prevent
  >
    <ha-icon class="floater-icon" :icon="icon" />
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

const LONG_PRESS_MS = 460;

const props = defineProps<{
  x: number;
  y: number;
  icon: string;
  label: string;
  isActive?: boolean;
  isOn?: boolean;
  accentColor?: string | null;
}>();

const emit = defineEmits<{
  press: [];
  "long-press": [];
}>();

let holdTimer: number | null = null;
let activePointerId: number | null = null;
let didLongPress = false;

const buttonStyle = computed(() => ({
  "--floater-x": `${Math.round(props.x)}px`,
  "--floater-y": `${Math.round(props.y)}px`,
  ...(props.accentColor ? { "--floater-accent": props.accentColor } : {}),
}));

function clearHoldTimer() {
  if (holdTimer !== null) {
    window.clearTimeout(holdTimer);
    holdTimer = null;
  }
}

function resetPointerState() {
  clearHoldTimer();
  activePointerId = null;
  didLongPress = false;
}

function onPointerDown(event: PointerEvent) {
  if (activePointerId !== null) return;

  const target = event.currentTarget as HTMLElement;
  activePointerId = event.pointerId;
  didLongPress = false;
  target.setPointerCapture(event.pointerId);

  holdTimer = window.setTimeout(() => {
    holdTimer = null;
    didLongPress = true;
    emit("long-press");
  }, LONG_PRESS_MS);
}

function onPointerUp(event: PointerEvent) {
  if (activePointerId !== event.pointerId) return;

  const target = event.currentTarget as HTMLElement;
  clearHoldTimer();
  if (!didLongPress) {
    emit("press");
  }

  if (target.hasPointerCapture(event.pointerId)) {
    target.releasePointerCapture(event.pointerId);
  }
  resetPointerState();
}

function onPointerCancel() {
  resetPointerState();
}
</script>
