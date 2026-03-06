<template>
  <div
    class="room-popup"
    :style="popupStyle"
    role="dialog"
    aria-label="Room actions"
    @pointerdown.stop
  >
    <button class="close-btn" type="button" @click="$emit('close')">Close</button>
    <div class="room-name">{{ room.name }}</div>
    <div class="room-id">{{ room.id }}</div>

    <div v-if="actions.length > 0" class="actions">
      <button
        v-for="action in actions"
        :key="action.id"
        class="action-btn"
        type="button"
        :disabled="runningActionId === action.id"
        @click="$emit('run', action.id)"
      >
        {{ runningActionId === action.id ? "Running..." : action.label }}
      </button>
    </div>
    <div v-else class="empty">No actions configured for this room.</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

type PopupRoom = {
  id: string;
  name: string;
};

type PopupAction = {
  id: string;
  label: string;
};

const props = defineProps<{
  room: PopupRoom;
  actions: PopupAction[];
  x: number;
  y: number;
  runningActionId?: string | null;
}>();

defineEmits<{
  close: [];
  run: [actionId: string];
}>();

const popupStyle = computed(() => ({
  "--popup-x": `${Math.round(props.x)}px`,
  "--popup-y": `${Math.round(props.y)}px`,
  "--popup-shift-y": props.y < 110 ? "14px" : "calc(-100% - 12px)",
}));
</script>
