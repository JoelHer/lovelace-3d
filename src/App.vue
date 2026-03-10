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
          <div
            v-if="roomPopup && popupRoom"
            class="room-popup-layer"
            @pointerdown.self="closeRoomPopup"
          >
            <RoomActionPopup
              :room="popupRoom"
              :actions="popupActionButtons"
              :x="roomPopup.x"
              :y="roomPopup.y"
              :running-action-id="runningActionId"
              @close="closeRoomPopup"
              @run="runRoomPopupAction"
            />
          </div>
        </div>
      </div>
    </div>
  </ha-card>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import EntityState from "./components/EntityState.vue";
import RoomActionPopup from "./components/RoomActionPopup.vue";
import { useThreeFloorplan, type RoomClickEvent } from "./composables/useThreeFloorplan";
import { useAreaRegistry } from "./composables/useAreaRegistry";
import {
  applyActionTemplates,
  buildRoomActionConfigMap,
  createRoomsSignature,
  parsePopupActions,
  parseRoomEntries,
  type PopupAction,
  type PopupState,
} from "./features/rooms";
import type { HassLike } from "./types/homeAssistant";
import type { LovelaceCardState, LovelaceConfig } from "./types/lovelace";

const props = defineProps<{
  state: LovelaceCardState;
}>();

const hass = computed<HassLike | null>(() => props.state?.hass ?? null);
const { ready: areasReady, loading: areasLoading, isValidArea, getAreaName } = useAreaRegistry(hass);
const cfg = computed<LovelaceConfig>(() => props.state?.config ?? {});
const entityId = computed(() => (cfg.value.entity as string | undefined) ?? "");

const threeMount = ref<HTMLElement | null>(null);
const three = useThreeFloorplan();
const runningActionId = ref<string | null>(null);

const roomPopup = ref<PopupState | null>(null);
const roomEntries = computed(() =>
  parseRoomEntries(cfg.value.rooms, {
    ready: areasReady.value,
    isValidArea,
    getAreaName,
  })
);

const rooms = computed(() => roomEntries.value.map((entry) => entry.room));

const roomActionConfigs = computed(() => buildRoomActionConfigMap(roomEntries.value));

const globalPopupActionConfig = computed(() =>
  parsePopupActions(cfg.value.room_popup_actions ?? cfg.value.room_actions, "Card")
);

const activePopupActions = computed<PopupAction[]>(() => {
  if (!roomPopup.value) return [];
  const local = roomActionConfigs.value[roomPopup.value.roomId];
  if (local?.configured) return local.actions;
  return globalPopupActionConfig.value.actions;
});

const popupActionButtons = computed(() =>
  activePopupActions.value.map((action) => ({
    id: action.id,
    label: action.label,
  }))
);

const popupRoom = computed(() => {
  if (!roomPopup.value) return null;
  return {
    id: roomPopup.value.roomId,
    name: roomPopup.value.roomName,
  };
});

function closeRoomPopup() {
  roomPopup.value = null;
  runningActionId.value = null;
}

function onRoomClick(event: RoomClickEvent) {
  roomPopup.value = {
    roomId: event.roomId,
    roomName: event.roomName || event.roomId,
    x: event.x,
    y: event.y,
    worldX: event.worldX,
    worldY: event.worldY,
    worldZ: event.worldZ,
  };
}

async function runRoomPopupAction(actionId: string) {
  const h = hass.value;
  const popup = roomPopup.value;
  if (!h?.callService || !popup) return;

  const action = activePopupActions.value.find((entry) => entry.id === actionId);
  if (!action) return;

  const [domain, service] = action.service.split(".", 2);
  if (!domain || !service) {
    console.warn("[lovelace-3d] Invalid room action service", action.service);
    return;
  }

  runningActionId.value = action.id;

  try {
    const serviceData = applyActionTemplates(action.serviceData, popup) as Record<string, unknown>;
    const target = action.target
      ? (applyActionTemplates(action.target, popup) as Record<string, unknown>)
      : undefined;
    await h.callService(domain, service, serviceData, target);
    if (action.closeOnRun) closeRoomPopup();
  } catch (error) {
    console.warn("[lovelace-3d] Room action failed", action, error);
  } finally {
    if (runningActionId.value === action.id) runningActionId.value = null;
  }
}

const roomsSignature = computed(() =>
  createRoomsSignature(rooms.value)
);

onMounted(() => {
  watch(
    [areasReady, roomsSignature],
    ([ready]) => {
      if (!threeMount.value) return;
      if (!ready) return;
      const nextRooms = rooms.value;

      if (!three.isMounted()) {
        three.mount(threeMount.value, nextRooms, { onRoomClick });
      } else {
        three.updateRooms(nextRooms);
      }
    },
    { immediate: true }
  );
});

watch(roomsSignature, () => {
  if (!roomPopup.value) return;
  const hasRoom = rooms.value.some((room) => room.id === roomPopup.value?.roomId);
  if (!hasRoom) closeRoomPopup();
});
</script>
