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
            v-if="renderedFloaters.length > 0"
            class="floater-layer"
            aria-label="Floating entity controls"
          >
            <FloaterButton
              v-for="floater in renderedFloaters"
              :key="floater.id"
              :x="floater.x"
              :y="floater.y"
              :icon="floater.icon"
              :label="floater.label"
              :is-on="floater.isOn"
              :accent-color="floater.accentColor"
              :is-active="floaterPopupId === floater.id"
              @press="onFloaterPressed(floater.id)"
              @long-press="onFloaterLongPressed(floater.id)"
            />
          </div>

          <div
            v-if="activeFloater && activeFloaterScreenPoint"
            class="floater-popup-layer"
            @pointerdown.self="closeFloaterPopup"
          >
            <FloaterEntityPopup
              :name="activeFloaterName"
              :entity-id="activeFloater.entityId"
              :icon="activeFloaterIcon"
              :state-text="activeFloaterStateText"
              :x="activeFloaterScreenPoint.x"
              :y="activeFloaterScreenPoint.y"
              :primary-label="activeFloaterPrimaryLabel"
              :secondary-label="activeFloaterSecondaryLabel"
              :running-action="runningFloaterAction"
              @close="closeFloaterPopup"
              @primary="runFloaterPrimaryAction"
              @secondary="runFloaterSecondaryAction"
            />
          </div>

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
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import EntityState from "./components/EntityState.vue";
import FloaterButton from "./components/FloaterButton.vue";
import FloaterEntityPopup from "./components/FloaterEntityPopup.vue";
import RoomActionPopup from "./components/RoomActionPopup.vue";
import { useThreeFloorplan, type RoomClickEvent } from "./composables/useThreeFloorplan";
import { useAreaRegistry } from "./composables/useAreaRegistry";
import {
  createFloatersSignature,
  type FloaterAction,
  parseFloaters,
  type FloaterConfig,
} from "./features/floaters";
import {
  applyActionTemplates,
  buildRoomActionConfigMap,
  createRoomsSignature,
  parsePopupActions,
  parseRoomEntries,
  type PopupAction,
  type PopupState,
} from "./features/rooms";
import type { HassEntityState, HassLike } from "./types/homeAssistant";
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
const runningFloaterAction = ref<"primary" | "secondary" | null>(null);

const roomPopup = ref<PopupState | null>(null);
const floaterPopupId = ref<string | null>(null);
const floaterScreenById = ref<Record<string, { x: number; y: number; visible: boolean }>>({});
let floaterProjectionFrame: number | null = null;

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

const floaters = computed<FloaterConfig[]>(() => parseFloaters(cfg.value.floaters));

const floatersById = computed<Record<string, FloaterConfig>>(() => {
  const map: Record<string, FloaterConfig> = {};
  for (const floater of floaters.value) {
    map[floater.id] = floater;
  }
  return map;
});

function asNumber(value: unknown): number | null {
  const next = Number(value);
  return Number.isFinite(next) ? next : null;
}

function hsvToRgb(h: number, s: number, v: number): [number, number, number] {
  const saturation = Math.max(0, Math.min(1, s / 100));
  const value = Math.max(0, Math.min(1, v / 255));
  const c = value * saturation;
  const hh = ((h % 360) + 360) % 360 / 60;
  const x = c * (1 - Math.abs((hh % 2) - 1));
  let r = 0;
  let g = 0;
  let b = 0;

  if (hh >= 0 && hh < 1) [r, g, b] = [c, x, 0];
  else if (hh < 2) [r, g, b] = [x, c, 0];
  else if (hh < 3) [r, g, b] = [0, c, x];
  else if (hh < 4) [r, g, b] = [0, x, c];
  else if (hh < 5) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];

  const m = value - c;
  return [
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255),
  ];
}

function resolveLightColor(attributes: Record<string, unknown> | undefined): string {
  if (!attributes) return "rgb(255, 214, 102)";

  const rgb = attributes.rgb_color;
  if (Array.isArray(rgb) && rgb.length >= 3) {
    const r = asNumber(rgb[0]);
    const g = asNumber(rgb[1]);
    const b = asNumber(rgb[2]);
    if (r !== null && g !== null && b !== null) {
      return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
    }
  }

  const hs = attributes.hs_color;
  if (Array.isArray(hs) && hs.length >= 2) {
    const h = asNumber(hs[0]);
    const s = asNumber(hs[1]);
    const brightness = asNumber(attributes.brightness) ?? 255;
    if (h !== null && s !== null) {
      const [r, g, b] = hsvToRgb(h, s, brightness);
      return `rgb(${r}, ${g}, ${b})`;
    }
  }

  return "rgb(255, 214, 102)";
}

function resolveFloaterAccentColor(
  floater: FloaterConfig,
  entityState: HassEntityState | undefined
): string | null {
  if (!entityState) return null;

  if (floater.entityId.startsWith("light.") && entityState.state === "on") {
    return resolveLightColor(entityState.attributes);
  }

  if (entityState.state === "on") {
    return "var(--primary-color)";
  }

  return null;
}

const renderedFloaters = computed<
  Array<{
    id: string;
    label: string;
    icon: string;
    x: number;
    y: number;
    isOn: boolean;
    accentColor: string | null;
  }>
>(() => {
  const rendered: Array<{
    id: string;
    label: string;
    icon: string;
    x: number;
    y: number;
    isOn: boolean;
    accentColor: string | null;
  }> = [];

  for (const floater of floaters.value) {
    const projection = floaterScreenById.value[floater.id];
    if (!projection || !projection.visible) continue;

    const entityState = hass.value?.states?.[floater.entityId] as HassEntityState | undefined;
    const icon = String(entityState?.attributes?.icon ?? "").trim() || floater.icon;
    const isOn = entityState?.state === "on";
    const accentColor = resolveFloaterAccentColor(floater, entityState);

    rendered.push({
      id: floater.id,
      label: floater.label,
      icon,
      x: projection.x,
      y: projection.y,
      isOn,
      accentColor,
    });
  }

  return rendered;
});

const activeFloater = computed<FloaterConfig | null>(() => {
  if (!floaterPopupId.value) return null;
  return floatersById.value[floaterPopupId.value] ?? null;
});

const activeFloaterScreenPoint = computed<{ x: number; y: number } | null>(() => {
  if (!floaterPopupId.value) return null;
  const projection = floaterScreenById.value[floaterPopupId.value];
  if (!projection || !projection.visible) return null;
  return {
    x: projection.x,
    y: projection.y,
  };
});

const activeFloaterEntity = computed<HassEntityState | null>(() => {
  const floater = activeFloater.value;
  if (!floater) return null;
  return (hass.value?.states?.[floater.entityId] as HassEntityState | undefined) ?? null;
});

const activeFloaterName = computed(() => {
  const floater = activeFloater.value;
  if (!floater) return "";
  return String(activeFloaterEntity.value?.attributes?.friendly_name ?? floater.label ?? floater.entityId);
});

const activeFloaterIcon = computed(() => {
  const floater = activeFloater.value;
  if (!floater) return "";
  return String(activeFloaterEntity.value?.attributes?.icon ?? "").trim() || floater.icon;
});

const activeFloaterStateText = computed(() => {
  if (!activeFloater.value) return "";
  if (!activeFloaterEntity.value) return "Entity unavailable";

  const state = String(activeFloaterEntity.value.state);
  const unit = String(activeFloaterEntity.value.attributes?.unit_of_measurement ?? "").trim();
  return unit ? `${state} ${unit}` : state;
});

const activeFloaterPrimaryLabel = computed(() => "Toggle");
const activeFloaterSecondaryLabel = computed(() => "Open controls");

function closeRoomPopup() {
  roomPopup.value = null;
  runningActionId.value = null;
}

function closeFloaterPopup() {
  floaterPopupId.value = null;
  runningFloaterAction.value = null;
}

function openFloaterPopup(floaterId: string) {
  closeRoomPopup();
  floaterPopupId.value = floaterId;
}

async function onFloaterPressed(floaterId: string) {
  const floater = floatersById.value[floaterId];
  if (!floater) return;

  closeRoomPopup();
  try {
    await runFloaterEntityAction(floater, floater.tapAction);
  } catch (error) {
    console.warn("[lovelace-3d] Floater button press failed", floater, error);
  }
}

async function onFloaterLongPressed(floaterId: string) {
  const floater = floatersById.value[floaterId];
  if (!floater) return;

  closeRoomPopup();
  try {
    await runFloaterEntityAction(floater, floater.holdAction);
  } catch (error) {
    console.warn("[lovelace-3d] Floater long press failed", floater, error);
  }
}

function onRoomClick(event: RoomClickEvent) {
  closeFloaterPopup();
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

function openEntityControlDialog(entityId: string) {
  const dispatchTarget = threeMount.value ?? document.body;
  dispatchTarget.dispatchEvent(
    new CustomEvent("hass-more-info", {
      detail: { entityId },
      bubbles: true,
      composed: true,
    })
  );
}

async function toggleEntity(entityId: string) {
  const h = hass.value;
  if (!h?.callService) return;
  await h.callService("homeassistant", "toggle", {}, { entity_id: entityId });
}

async function runFloaterEntityAction(floater: FloaterConfig, action: FloaterAction) {
  if (action === "toggle") {
    await toggleEntity(floater.entityId);
    return;
  }

  if (action === "more-info") {
    closeFloaterPopup();
    openEntityControlDialog(floater.entityId);
    return;
  }

  if (action === "popup") {
    openFloaterPopup(floater.id);
  } else {
    console.warn("[lovelace-3d] Unknown floater action", action, floater);
  }
}

async function runFloaterAction(action: FloaterAction, slot: "primary" | "secondary") {
  const floater = activeFloater.value;
  if (!floater) return;

  runningFloaterAction.value = slot;

  try {
    await runFloaterEntityAction(floater, action);
  } catch (error) {
    console.warn("[lovelace-3d] Floater action failed", floater, error);
  } finally {
    if (runningFloaterAction.value === slot) {
      runningFloaterAction.value = null;
    }
  }
}

async function runFloaterPrimaryAction() {
  await runFloaterAction("toggle", "primary");
}

async function runFloaterSecondaryAction() {
  await runFloaterAction("more-info", "secondary");
}

function updateFloaterProjections() {
  if (!three.isMounted()) {
    floaterScreenById.value = {};
  } else {
    const next: Record<string, { x: number; y: number; visible: boolean }> = {};

    for (const floater of floaters.value) {
      const projection = three.projectWorldPoint(floater.point.x, floater.point.y, floater.point.z);
      if (!projection) continue;
      next[floater.id] = projection;
    }

    floaterScreenById.value = next;
  }

  floaterProjectionFrame = window.requestAnimationFrame(updateFloaterProjections);
}

function startFloaterProjectionLoop() {
  if (floaterProjectionFrame !== null) return;
  floaterProjectionFrame = window.requestAnimationFrame(updateFloaterProjections);
}

function stopFloaterProjectionLoop() {
  if (floaterProjectionFrame === null) return;
  window.cancelAnimationFrame(floaterProjectionFrame);
  floaterProjectionFrame = null;
}

const roomsSignature = computed(() => createRoomsSignature(rooms.value));
const floatersSignature = computed(() => createFloatersSignature(floaters.value));

onMounted(() => {
  startFloaterProjectionLoop();

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

onBeforeUnmount(() => {
  stopFloaterProjectionLoop();
});

watch(roomsSignature, () => {
  if (!roomPopup.value) return;
  const hasRoom = rooms.value.some((room) => room.id === roomPopup.value?.roomId);
  if (!hasRoom) closeRoomPopup();
});

watch(floatersSignature, () => {
  if (!floaterPopupId.value) return;
  if (!floatersById.value[floaterPopupId.value]) {
    closeFloaterPopup();
  }
});
</script>
