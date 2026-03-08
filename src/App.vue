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
const runningActionId = ref<string | null>(null);

type PopupState = {
  roomId: string;
  roomName: string;
  x: number;
  y: number;
  worldX: number;
  worldY: number;
  worldZ: number;
};

type PopupAction = {
  id: string;
  label: string;
  service: string;
  serviceData: Record<string, unknown>;
  target?: Record<string, unknown>;
  closeOnRun: boolean;
};

type RoomActionConfig = {
  configured: boolean;
  actions: PopupAction[];
};

const roomPopup = ref<PopupState | null>(null);

function toRecord(value: unknown): Record<string, unknown> | undefined {
  if (!value || typeof value !== "object" || Array.isArray(value)) return undefined;
  return value as Record<string, unknown>;
}

function applyActionTemplates(value: unknown, popup: PopupState): unknown {
  if (typeof value === "string") {
    const tokenMap: Record<string, string> = {
      "room.id": popup.roomId,
      "room.name": popup.roomName,
      "room.area_id": popup.roomId,
      "click.x": String(Math.round(popup.x)),
      "click.y": String(Math.round(popup.y)),
      "click.world_x": popup.worldX.toFixed(4),
      "click.world_y": popup.worldY.toFixed(4),
      "click.world_z": popup.worldZ.toFixed(4),
    };

    return value.replace(/\{\{\s*([^{}]+?)\s*\}\}/g, (fullMatch, tokenName) => {
      const next = tokenMap[String(tokenName).trim()];
      return next ?? fullMatch;
    });
  }

  if (Array.isArray(value)) {
    return value.map((entry) => applyActionTemplates(entry, popup));
  }

  if (value && typeof value === "object") {
    const output: Record<string, unknown> = {};
    for (const [key, entry] of Object.entries(value as Record<string, unknown>)) {
      output[key] = applyActionTemplates(entry, popup);
    }
    return output;
  }

  return value;
}

function parsePopupActions(rawActions: unknown, contextLabel: string): RoomActionConfig {
  if (rawActions === undefined) {
    return { configured: false, actions: [] };
  }
  if (!Array.isArray(rawActions)) {
    console.warn(`[lovelace-3d] ${contextLabel} actions must be an array`, rawActions);
    return { configured: true, actions: [] };
  }
  const parsed: PopupAction[] = [];
  for (let i = 0; i < rawActions.length; i += 1) {
    const raw = rawActions[i];
    if (!raw || typeof raw !== "object") continue;

    const action = raw as Record<string, unknown>;
    const service = String(action.service ?? action.action ?? "").trim();
    if (!service || !service.includes(".")) {
      console.warn("[lovelace-3d] Invalid room action service, expected 'domain.service'", raw);
      continue;
    }

    parsed.push({
      id: String(action.id ?? `${service}-${i + 1}`),
      label: String(action.label ?? action.name ?? service),
      service,
      serviceData: toRecord(action.service_data) ?? toRecord(action.data) ?? {},
      target: toRecord(action.target),
      closeOnRun: action.close_on_run !== false,
    });
  }

  return { configured: true, actions: parsed };
}

const roomEntries = computed<
  {
    room: Room;
    actionConfig: RoomActionConfig;
  }[]
>(() => {
  if (!areasReady.value) return [];

  const rawRooms = cfg.value.rooms;
  if (!Array.isArray(rawRooms)) return [];

  const parsed: {
    room: Room;
    actionConfig: RoomActionConfig;
  }[] = [];

  for (const room of rawRooms) {
    if (!room || typeof room !== "object") continue;

    const roomObj = room as Record<string, unknown>;
    const areaId = String(roomObj.area ?? "");
    if (!areaId) continue;

    if (areasReady.value && !isValidArea(areaId)) {
      console.warn(`[lovelace-3d] Unknown area "${areaId}" in room config`, room);
      continue;
    }

    const polygonRaw = roomObj.polygon;
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

    const name = String(roomObj.name ?? "") || (areasReady.value ? getAreaName(areaId) : "") || areaId;

    const rawRoomActions = roomObj.room_popup_actions ?? roomObj.room_actions;
    parsed.push({
      room: { id: areaId, name, polygon },
      actionConfig: parsePopupActions(rawRoomActions, `Room "${areaId}"`),
    });
  }

  return parsed;
});

const rooms = computed<Room[]>(() => roomEntries.value.map((entry) => entry.room));

const roomActionConfigs = computed<Record<string, RoomActionConfig>>(() => {
  const map: Record<string, RoomActionConfig> = {};
  for (const entry of roomEntries.value) {
    map[entry.room.id] = entry.actionConfig;
  }
  return map;
});

const globalPopupActionConfig = computed<RoomActionConfig>(() =>
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
  rooms.value
    .map(
      (room) =>
        `${room.id}|${room.name}|${room.polygon
          .map(([x, z]) => `${x.toFixed(4)},${z.toFixed(4)}`)
          .join(";")}`
    )
    .join("||")
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
