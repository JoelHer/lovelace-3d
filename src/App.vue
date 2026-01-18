<template>
  <ha-card class="ha-card-reset">
    <div class="wrap">
      <div class="content">
        <EntityState v-if="entityId" :hass="hass" :entity-id="entityId" />
        <div v-else class="hint">
          Set an <code>entity</code> in the card config to display a state.
        </div>

        <div ref="threeMount" class="three-surface" aria-label="Three.js preview" />
      </div>
    </div>
  </ha-card>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import EntityState from "./components/EntityState.vue";
import { useThreeFloorplan } from "./composables/useThreeFloorplan";
import type { Room, Vec2XZ } from "./three/types";

const props = defineProps<{
  state: {
    hass: any | null;
    config: Record<string, any>;
  };
}>();

const hass = computed(() => props.state?.hass);
const cfg = computed(() => props.state?.config ?? {});
const entityId = computed(() => (cfg.value.entity as string | undefined) ?? "");

const threeMount = ref<HTMLElement | null>(null);
const three = useThreeFloorplan();

const rooms = computed<Room[]>(() => {
  const rawRooms = cfg.value.rooms;
  if (!Array.isArray(rawRooms)) return [];

  const parsed: Room[] = [];

  for (const room of rawRooms) {
    if (!room || typeof room !== "object") continue;

    const polygonRaw = (room as any).polygon;
    if (!Array.isArray(polygonRaw)) continue;

    const polygon: Vec2XZ[] = [];
    for (const point of polygonRaw) {
      if (!Array.isArray(point) || point.length < 2) continue;
      const [x, z] = point;
      const nx = Number(x);
      const nz = Number(z);
      if (!Number.isFinite(nx) || !Number.isFinite(nz)) continue;
      polygon.push([nx, nz] as const);
    }

    if (polygon.length < 3) continue;

    const id = String((room as any).id ?? "");
    if (!id) continue;

    const name = String((room as any).name ?? id);
    parsed.push({ id, name, polygon });
  }

  return parsed;
});

onMounted(() => {
  if (!threeMount.value) return;
  three.mount(threeMount.value, rooms.value);
});
</script>
