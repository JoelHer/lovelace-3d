import { computed, ref, watch, type Ref } from "vue";

export type AreaEntry = {
  area_id: string;
  name: string;
};

export function useAreaRegistry(hassRef: Ref<any | null>) {
  const areas = ref<AreaEntry[]>([]);
  const error = ref<unknown>(null);
  const loading = ref(false);
  const loaded = ref(false);

  const areasById = computed<Record<string, AreaEntry>>(() => {
    const map: Record<string, AreaEntry> = {};
    for (const a of areas.value) map[a.area_id] = a;
    return map;
  });

  const ready = computed(() => loaded.value && !loading.value);

  async function refresh() {
    const hass = hassRef.value;
    if (!hass?.callWS) return;

    loading.value = true;
    try {
      error.value = null;
      const res: AreaEntry[] = await hass.callWS({
        type: "config/area_registry/list",
      });
      areas.value = Array.isArray(res) ? res : [];
      loaded.value = true;
    } catch (e) {
      error.value = e;
      areas.value = [];
      loaded.value = false;
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

  // Auto-load when hass becomes available / changes
  watch(
    hassRef,
    (h: any | null) => {
      if (h) {
        loaded.value = false;
        refresh();
      } else {
        areas.value = [];
        loaded.value = false;
        error.value = null;
      }
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
