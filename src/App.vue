<template>
  <ha-card class="ha-card-reset">
    <div class="wrap">
      <div class="content">
        <EntityState v-if="entityId" :hass="hass" :entity-id="entityId" />
        <div v-else class="hint">
          Set an <code>entity</code> in the card config to display a state.
        </div>

        <div class="three-shell">
          <div ref="threeMount" class="three-surface" aria-label="Three.js preview" />
          <div
            v-if="!areasReady"
            class="loader-overlay"
            role="status"
            aria-live="polite"
            aria-label="Loading area registry"
          >
            <div v-if="areasLoading" class="loader-spinner" aria-hidden="true" />
            <span>{{ areasLoading ? "Loading area registry..." : "Waiting for area registry..." }}</span>
          </div>
        </div>
      </div>
    </div>
  </ha-card>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import EntityState from "./components/EntityState.vue";
import { useThreeFloorplan } from "./composables/useThreeFloorplan";
import type { Room, Vec2XZ } from "./three/types";
import { useAreaRegistry } from "./composables/useAreaRegistry";

const props = defineProps<{
  state: {
    hass: any | null;
    config: Record<string, any>;
  };
}>();

const hass = computed(() => props.state?.hass);
const { ready: areasReady, loading: areasLoading, isValidArea, getAreaName } = useAreaRegistry(hass);
const cfg = computed(() => props.state?.config ?? {});
const entityId = computed(() => (cfg.value.entity as string | undefined) ?? "");

const threeMount = ref<HTMLElement | null>(null);
const three = useThreeFloorplan();

const rooms = computed<Room[]>(() => {
  if (!areasReady.value) return [];

  const rawRooms = cfg.value.rooms;
  if (!Array.isArray(rawRooms)) return [];

  const parsed: Room[] = [];

  for (const room of rawRooms) {
    if (!room || typeof room !== "object") continue;

    const areaId = String((room as any).area ?? "");
    if (!areaId) continue;

    // ✅ Validate *only once registry is loaded*
    if (areasReady.value && !isValidArea(areaId)) {
      console.warn(`[lovelace-3d] Unknown area "${areaId}" in room config`, room);
      continue;
    }

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

    const name =
      String((room as any).name ?? "") ||
      (areasReady.value ? getAreaName(areaId) : "") ||
      areaId;

    parsed.push({ id: areaId, name, polygon });
  }

  return parsed;
});

onMounted(() => {
  watch(
    () => ({ ready: areasReady.value, rooms: rooms.value }),
    ({ ready, rooms }) => {
      if (!threeMount.value) return;

      three.unmount();
      if (ready) {
        three.mount(threeMount.value, rooms);
      }
    },
    { deep: true, immediate: true }
  );
});
</script>
