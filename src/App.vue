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

        <div class="meta">
          <span class="pill">Vue</span>
          <span class="pill">Vite</span>
          <span class="pill">custom:lovelace-3d</span>
        </div>
      </div>
    </div>
  </ha-card>
</template>

<script setup lang="ts">
import { computed } from "vue"
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
</script>
