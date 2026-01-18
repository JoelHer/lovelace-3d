<template>
  <div class="row">
    <div class="left">
      <div class="entity">{{ entityId }}</div>
      <div class="name" v-if="friendlyName">{{ friendlyName }}</div>
      <div class="name" v-else>—</div>
    </div>

    <div class="right">
      <div class="state">{{ stateText }}</div>
      <div class="unit" v-if="unit">{{ unit }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"

const props = defineProps<{
  hass: any | null
  entityId: string
}>()

const entity = computed(() => {
  const h = props.hass
  if (!h?.states || !props.entityId) return null
  return h.states[props.entityId] ?? null
})

const friendlyName = computed(() => entity.value?.attributes?.friendly_name ?? "")

const unit = computed(() => entity.value?.attributes?.unit_of_measurement ?? "")

const stateText = computed(() => {
  if (!props.entityId) return "No entity"
  if (!entity.value) return "Entity not found"
  return String(entity.value.state)
})
</script>

<style scoped>
.row {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 12px;
  align-items: center;

  padding: 10px 12px;
  border-radius: 14px;

  background: color-mix(in srgb, var(--secondary-background-color) 80%, transparent);
  border: 1px solid color-mix(in srgb, var(--divider-color) 70%, transparent);
}

.entity {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
  font-size: 12px;
  opacity: 0.85;
}

.name {
  font-size: 14px;
  font-weight: 600;
  margin-top: 2px;
}

.right {
  display: grid;
  justify-items: end;
  gap: 2px;
}

.state {
  font-size: 18px;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.unit {
  font-size: 12px;
  opacity: 0.75;
  color: var(--secondary-text-color);
}
</style>
