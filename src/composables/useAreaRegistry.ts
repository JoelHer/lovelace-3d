import { computed, ref, watch, type Ref } from "vue";
import type { HassLike } from "../types/homeAssistant";

export type AreaEntry = {
  area_id: string;
  name: string;
};

export function useAreaRegistry(hassRef: Ref<HassLike | null>) {
  const areas = ref<AreaEntry[]>([]);
  const error = ref<unknown>(null);
  const loading = ref(false);
  const loaded = ref(false);
  let activeConnection: HassLike["connection"] | null = null;

  const areasById = computed<Record<string, AreaEntry>>(() => {
    const map: Record<string, AreaEntry> = {};
    for (const a of areas.value) map[a.area_id] = a;
    return map;
  });

  const ready = computed(() => loaded.value || areas.value.length > 0);

  async function refresh() {
    const hass = hassRef.value;
    if (!hass?.callWS) return;

    const hadData = areas.value.length > 0;
    loading.value = true;
    try {
      error.value = null;
      const res = await hass.callWS<AreaEntry[]>({
        type: "config/area_registry/list",
      });
      areas.value = Array.isArray(res) ? res : [];
      loaded.value = true;
    } catch (e) {
      error.value = e;
      if (!hadData) {
        areas.value = [];
        loaded.value = false;
      }
      console.warn("[lovelace-3d] Failed to load areas", e);
    } finally {
      loading.value = false;
    }
  }

  function isValidArea(areaId: string) {
    return !!areasById.value[areaId];
  }

  function getAreaName(areaId: string) {
    return areasById.value[areaId]?.name ?? "";
  }

  function reset() {
    areas.value = [];
    loaded.value = false;
    error.value = null;
    activeConnection = null;
  }

  // Auto-load only when the HA session/connection changes, not on every state push.
  watch(
    hassRef,
    (hass) => {
      if (!hass) {
        reset();
        return;
      }

      const nextConnection = hass.connection ?? null;
      if (nextConnection) {
        if (loaded.value && activeConnection === nextConnection) return;
        activeConnection = nextConnection;
        refresh();
        return;
      }

      // Fallback for environments where `connection` is not exposed.
      if (!loaded.value) refresh();
    },
    { immediate: true }
  );

  return {
    areas,
    areasById,
    ready,
    error,
    loading,
    refresh,
    isValidArea,
    getAreaName,
  };
}
