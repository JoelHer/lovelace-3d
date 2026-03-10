<template>
  <div
    class="floater-popup"
    :style="popupStyle"
    role="dialog"
    aria-label="Floater controls"
    @pointerdown.stop
  >
    <button class="close-btn" type="button" @click="$emit('close')">Close</button>

    <div class="floater-head">
      <ha-icon class="floater-icon" :icon="icon" />
      <div>
        <div class="name">{{ name }}</div>
        <div class="entity">{{ entityId }}</div>
      </div>
    </div>

    <div class="state">{{ stateText }}</div>

    <div class="actions">
      <button
        class="action-btn"
        type="button"
        :disabled="runningAction === 'primary'"
        @click="$emit('primary')"
      >
        {{ runningAction === "primary" ? "Running..." : primaryLabel }}
      </button>

      <button
        class="action-btn secondary"
        type="button"
        :disabled="runningAction === 'secondary'"
        @click="$emit('secondary')"
      >
        {{ runningAction === "secondary" ? "Running..." : secondaryLabel }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  name: string;
  entityId: string;
  icon: string;
  stateText: string;
  x: number;
  y: number;
  primaryLabel: string;
  secondaryLabel: string;
  runningAction?: "primary" | "secondary" | null;
}>();

defineEmits<{
  close: [];
  primary: [];
  secondary: [];
}>();

const popupStyle = computed(() => ({
  "--popup-x": `${Math.round(props.x)}px`,
  "--popup-y": `${Math.round(props.y)}px`,
  "--popup-shift-y": props.y < 110 ? "16px" : "calc(-100% - 14px)",
}));
</script>
