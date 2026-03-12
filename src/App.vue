<template>
  <ha-card class="ha-card-reset">
    <div class="wrap">
      <div class="content">
        <div class="three-shell">
          <div ref="threeMount" class="three-surface" aria-label="Three.js preview" />

          <div
            v-if="renderedFloaterButtons.length > 0"
            class="floater-layer"
            aria-label="Floating entity controls"
          >
            <FloaterButton
              v-for="button in renderedFloaterButtons"
              :key="button.id"
              :x="button.x"
              :y="button.y"
              :icon="button.icon"
              :label="button.label"
              :is-on="button.isOn"
              :accent-color="button.accentColor"
              :is-active="button.isActive"
              :is-group="button.isGroup"
              :group-count="button.groupCount"
              :value-text="button.valueText"
              @press="onFloaterButtonPressed(button)"
              @long-press="onFloaterButtonLongPressed(button)"
            />
          </div>

          <div
            v-if="renderedNavbarItems.length > 0"
            class="navbar-layer"
            :class="[navbarPositionClass, navbarOrientationClass]"
          >
            <nav class="control-navbar" :style="navbarStyle" aria-label="Floorplan controls">
              <button
                v-for="item in renderedNavbarItems"
                :key="item.id"
                class="navbar-btn"
                :class="{ active: isNavbarItemActive(item) }"
                type="button"
                :aria-label="item.label"
                @click="onNavbarItemPressed(item)"
              >
                <ha-icon class="navbar-icon" :icon="item.icon" />
                <span class="navbar-label">{{ item.label }}</span>
              </button>
            </nav>
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
import FloaterButton from "./components/FloaterButton.vue";
import FloaterEntityPopup from "./components/FloaterEntityPopup.vue";
import RoomActionPopup from "./components/RoomActionPopup.vue";
import {
  useThreeFloorplan,
  type HeatmapRenderData,
  type RoomClickEvent,
} from "./composables/useThreeFloorplan";
import { useAreaRegistry } from "./composables/useAreaRegistry";
import { createHeatmapSignature, parseHeatmapConfig, type HeatmapConfig } from "./features/heatmaps";
import {
  createFloatersSignature,
  type FloaterAction,
  parseFloaters,
  type FloaterConfig,
} from "./features/floaters";
import {
  parseNavbarConfig,
  type NavbarConfig,
  type NavbarItemConfig,
} from "./features/navbar";
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

const threeMount = ref<HTMLElement | null>(null);
const three = useThreeFloorplan();
const runningActionId = ref<string | null>(null);
const runningFloaterAction = ref<"primary" | "secondary" | null>(null);

const roomPopup = ref<PopupState | null>(null);
const floaterPopupId = ref<string | null>(null);
const expandedFloaterGroupId = ref<string | null>(null);
const floaterGroupExpansionAnimation = ref<{ groupId: string; startedAtMs: number } | null>(null);
const floaterGroupExpansionProgress = ref(1);
const floaterScreenById = ref<Record<string, { x: number; y: number; visible: boolean }>>({});
const heatmapSensorScreenById = ref<Record<string, { x: number; y: number; visible: boolean }>>({});
const heatmapVisible = ref(true);
const activeFloaterGroup = ref("all");
let heatmapVisibilityInitialized = false;
let unsubscribeFloaterFrame: (() => void) | null = null;

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

const heatmapConfig = computed<HeatmapConfig>(() => parseHeatmapConfig(cfg.value.heatmaps));
const navbarConfig = computed<NavbarConfig>(() => parseNavbarConfig(cfg.value.navbar));
const HEATMAP_AUTO_RANGE_PADDING_RATIO = 0.12;

const FLOATER_OVERLAP_DISTANCE_PX = 40;
const FLOATER_GROUP_ICON = "mdi:layers-triple";
const FLOATER_GROUP_COLLAPSE_ICON = "mdi:close";
const FLOATER_GROUP_RADIUS_BASE_PX = 52;
const FLOATER_GROUP_RADIUS_STEP_PX = 4;
const FLOATER_GROUP_RADIUS_CAP_PX = 84;
const FLOATER_GROUP_EXPAND_DURATION_MS = 120;

type RenderedFloater = {
  id: string;
  label: string;
  icon: string;
  x: number;
  y: number;
  isOn: boolean;
  accentColor: string | null;
  floaterId: string | null;
  sensorEntityId: string | null;
  valueText: string | null;
};

type FloaterGroup = {
  id: string;
  x: number;
  y: number;
  items: RenderedFloater[];
};

type FloaterButtonRender = {
  id: string;
  x: number;
  y: number;
  icon: string;
  label: string;
  isOn: boolean;
  accentColor: string | null;
  isActive: boolean;
  isGroup: boolean;
  groupCount: number | null;
  floaterId: string | null;
  sensorEntityId: string | null;
  groupId: string | null;
  valueText: string | null;
};

type ResolvedHeatmapSensor = {
  id: string;
  entityId: string;
  label: string;
  point: {
    x: number;
    y: number;
    z: number;
  };
  x: number;
  z: number;
  value: number;
  unit: string;
  radius: number;
  weight: number;
};

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

function parseNumericText(value: string): number | null {
  const direct = Number(value);
  if (Number.isFinite(direct)) return direct;
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

function parseHexColor(value: string): [number, number, number] | null {
  const normalized = value.trim().replace(/^#/, "");
  if (!normalized) return null;

  if (normalized.length === 3 || normalized.length === 4) {
    const c0 = normalized.charAt(0);
    const c1 = normalized.charAt(1);
    const c2 = normalized.charAt(2);
    if (!c0 || !c1 || !c2) return null;
    const r = Number.parseInt(c0 + c0, 16);
    const g = Number.parseInt(c1 + c1, 16);
    const b = Number.parseInt(c2 + c2, 16);
    if (Number.isFinite(r) && Number.isFinite(g) && Number.isFinite(b)) return [r, g, b];
    return null;
  }

  if (normalized.length === 6 || normalized.length === 8) {
    const r = Number.parseInt(normalized.slice(0, 2), 16);
    const g = Number.parseInt(normalized.slice(2, 4), 16);
    const b = Number.parseInt(normalized.slice(4, 6), 16);
    if (Number.isFinite(r) && Number.isFinite(g) && Number.isFinite(b)) return [r, g, b];
    return null;
  }

  return null;
}

function parseRgbColor(value: string): [number, number, number] | null {
  const match = value.trim().match(/^rgba?\((.+)\)$/i);
  if (!match) return null;
  const body = match[1];
  if (!body) return null;
  const channels = body.split(",").map((part) => part.trim());
  if (channels.length < 3) return null;

  const rgb: number[] = [];
  for (let index = 0; index < 3; index += 1) {
    const channel = channels[index];
    if (!channel) return null;
    if (channel.endsWith("%")) {
      const percent = Number.parseFloat(channel.slice(0, -1));
      if (!Number.isFinite(percent)) return null;
      rgb.push(Math.round(clamp01(percent / 100) * 255));
      continue;
    }

    const numeric = Number.parseFloat(channel);
    if (!Number.isFinite(numeric)) return null;
    rgb.push(Math.round(Math.min(255, Math.max(0, numeric))));
  }

  const [r, g, b] = rgb;
  if (r === undefined || g === undefined || b === undefined) return null;
  return [r, g, b];
}

function parseHeatmapRangeColor(value: string): [number, number, number] | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith("#")) {
    return parseHexColor(trimmed);
  }
  return parseRgbColor(trimmed);
}

function resolveHeatmapSensorValue(
  sensor: HeatmapConfig["sensors"][number],
  entityState: HassEntityState | undefined
): number | null {
  if (!entityState) return null;

  if (sensor.valueAttribute) {
    const rawAttributeValue = entityState.attributes?.[sensor.valueAttribute];
    if (rawAttributeValue !== undefined) {
      const numericAttributeValue = asNumber(rawAttributeValue);
      if (numericAttributeValue !== null) return numericAttributeValue;
      return parseNumericText(String(rawAttributeValue));
    }
  }

  return parseNumericText(String(entityState.state ?? ""));
}

function formatHeatmapSensorValue(value: number, unit: string): string {
  const decimals = Math.abs(value) >= 100 ? 0 : Math.abs(value) >= 10 ? 1 : 2;
  const rounded = value.toFixed(decimals);
  return unit ? `${rounded} ${unit}` : rounded;
}

const resolvedHeatmapSensors = computed<ResolvedHeatmapSensor[]>(() => {
  const config = heatmapConfig.value;
  if (!config.enabled || config.sensors.length === 0) return [];

  const resolved: ResolvedHeatmapSensor[] = [];
  for (const sensor of config.sensors) {
    const entityState = hass.value?.states?.[sensor.entityId] as HassEntityState | undefined;
    const value = resolveHeatmapSensorValue(sensor, entityState);
    if (value === null) continue;

    const unit = String(entityState?.attributes?.unit_of_measurement ?? "").trim();
    resolved.push({
      id: sensor.id,
      entityId: sensor.entityId,
      label: sensor.label,
      point: sensor.point,
      x: sensor.point.x,
      z: sensor.point.z,
      value,
      unit,
      radius: sensor.radius,
      weight: sensor.weight,
    });
  }

  return resolved;
});

const heatmapRenderData = computed<HeatmapRenderData | null>(() => {
  const sensors = resolvedHeatmapSensors.value;
  if (sensors.length === 0) return null;

  const config = heatmapConfig.value;
  let observedMin = Number.POSITIVE_INFINITY;
  let observedMax = Number.NEGATIVE_INFINITY;

  for (const sensor of sensors) {
    if (sensor.value < observedMin) observedMin = sensor.value;
    if (sensor.value > observedMax) observedMax = sensor.value;
  }

  let minValue = config.minValue ?? observedMin;
  let maxValue = config.maxValue ?? observedMax;

  if (!Number.isFinite(minValue)) minValue = observedMin;
  if (!Number.isFinite(maxValue)) maxValue = observedMax;
  if (!Number.isFinite(minValue) || !Number.isFinite(maxValue)) return null;

  const usingAutoMin = config.minValue === null;
  const usingAutoMax = config.maxValue === null;
  const baseRange = Math.max(0.0001, maxValue - minValue);
  const padding = Math.max(0.2, baseRange * HEATMAP_AUTO_RANGE_PADDING_RATIO);
  if (usingAutoMin) minValue -= padding;
  if (usingAutoMax) maxValue += padding;
  if (maxValue - minValue < 0.0001) {
    maxValue = minValue + 1;
  }

  const range = Math.max(0.0001, maxValue - minValue);
  const configuredColorStops = config.colorRanges
    .map((colorRange) => {
      const rgb = parseHeatmapRangeColor(colorRange.color);
      if (!rgb) return null;

      const [r, g, b] = rgb;
      return {
        position: clamp01((colorRange.value - minValue) / range),
        r,
        g,
        b,
      };
    })
    .filter((stop): stop is { position: number; r: number; g: number; b: number } => stop !== null)
    .sort((left, right) => left.position - right.position);

  return {
    samples: sensors.map((sensor) => ({
      x: sensor.x,
      z: sensor.z,
      value: sensor.value,
      radius: sensor.radius,
      weight: sensor.weight,
    })),
    minValue,
    maxValue,
    colorStops: configuredColorStops.length >= 2 ? configuredColorStops : null,
    opacity: config.opacity,
    resolution: config.resolution,
    blur: config.blur,
    visible: heatmapVisible.value,
  };
});

const isHeatmapFloaterMode = computed(
  () => !!heatmapRenderData.value && heatmapVisible.value
);

const renderedNavbarItems = computed<NavbarItemConfig[]>(() => {
  const config = navbarConfig.value;
  if (!config.enabled) return [];

  const hasHeatmap = heatmapConfig.value.enabled && heatmapConfig.value.sensors.length > 0;
  return config.items.filter((item) => {
    if (item.action === "toggle-heatmap") return hasHeatmap;
    if (item.action === "set-floater-group") {
      const targetGroup = item.floaterGroup ?? "all";
      return (
        targetGroup === "all" ||
        floaters.value.some((floater) => floater.group === targetGroup)
      );
    }
    return true;
  });
});

const navbarPositionClass = computed(() => `pos-${navbarConfig.value.position}`);
const navbarOrientationClass = computed(() => {
  const position = navbarConfig.value.position;
  return position === "top" || position === "bottom" ? "horizontal" : "vertical";
});

const navbarStyle = computed<Record<string, string>>(() => {
  const config = navbarConfig.value;
  const fallbackBackground = config.transparent
    ? `rgba(16, 19, 26, ${config.opacity.toFixed(3)})`
    : `rgba(16, 19, 26, 0.94)`;

  return {
    "--navbar-offset-x": `${config.offsetX}px`,
    "--navbar-offset-y": `${config.offsetY}px`,
    "--navbar-bg": config.backgroundColor ?? fallbackBackground,
    "--navbar-border": config.borderColor ?? "rgba(255, 255, 255, 0.16)",
    "--navbar-text": config.textColor ?? "var(--primary-text-color)",
    "--navbar-icon": config.iconColor ?? config.textColor ?? "var(--primary-text-color)",
    "--navbar-blur": `${config.blur}px`,
  };
});

function isNavbarItemActive(item: NavbarItemConfig): boolean {
  const heatmapModeActive = !!heatmapRenderData.value && heatmapVisible.value;
  if (item.action === "toggle-heatmap") {
    return heatmapModeActive;
  }
  if (item.action === "set-floater-group") {
    return !heatmapModeActive && activeFloaterGroup.value === (item.floaterGroup ?? "all");
  }
  return false;
}

function onNavbarItemPressed(item: NavbarItemConfig) {
  if (item.action === "toggle-heatmap") {
    const heatmapModeActive = !!heatmapRenderData.value && heatmapVisible.value;
    if (heatmapModeActive && renderedNavbarItems.value.length <= 1) {
      return;
    }
    heatmapVisible.value = !heatmapVisible.value;
    if (heatmapVisible.value) {
      closeFloaterPopup();
      closeFloaterGroup();
    }
    return;
  }

  if (item.action === "set-floater-group") {
    activeFloaterGroup.value = item.floaterGroup ?? "all";
    if (heatmapVisible.value) {
      heatmapVisible.value = false;
    }
    closeFloaterPopup();
    closeFloaterGroup();
  }
}

function collectFloaterGroups(items: ReadonlyArray<RenderedFloater>): FloaterGroup[] {
  if (items.length === 0) return [];

  const groups: FloaterGroup[] = [];
  const queued = new Set<number>();
  const overlapDistanceSquared = FLOATER_OVERLAP_DISTANCE_PX * FLOATER_OVERLAP_DISTANCE_PX;

  for (let startIndex = 0; startIndex < items.length; startIndex += 1) {
    if (queued.has(startIndex)) continue;

    const groupIndices: number[] = [];
    const indexQueue: number[] = [startIndex];
    queued.add(startIndex);

    while (indexQueue.length > 0) {
      const index = indexQueue.pop();
      if (index === undefined) break;

      groupIndices.push(index);
      const anchor = items[index];
      if (!anchor) continue;

      for (let candidateIndex = 0; candidateIndex < items.length; candidateIndex += 1) {
        if (queued.has(candidateIndex)) continue;
        const candidate = items[candidateIndex];
        if (!candidate) continue;
        const dx = anchor.x - candidate.x;
        const dy = anchor.y - candidate.y;
        if (dx * dx + dy * dy > overlapDistanceSquared) continue;

        queued.add(candidateIndex);
        indexQueue.push(candidateIndex);
      }
    }

    const groupItems = groupIndices
      .map((index) => items[index])
      .filter((item): item is RenderedFloater => item !== undefined)
      .sort((a, b) => a.id.localeCompare(b.id));
    if (groupItems.length === 0) continue;
    const groupCenter = groupItems.reduce(
      (acc, item) => {
        acc.x += item.x;
        acc.y += item.y;
        return acc;
      },
      { x: 0, y: 0 }
    );

    groups.push({
      id: groupItems.map((item) => item.id).join("|"),
      x: groupCenter.x / groupItems.length,
      y: groupCenter.y / groupItems.length,
      items: groupItems,
    });
  }

  groups.sort((a, b) => a.id.localeCompare(b.id));
  return groups;
}

function resolveGroupAccentColor(items: ReadonlyArray<RenderedFloater>): string | null {
  for (const item of items) {
    if (item.accentColor) return item.accentColor;
  }
  return null;
}

function resolveGroupIcon(items: ReadonlyArray<RenderedFloater>): string {
  for (const item of items) {
    if (item.isOn) return item.icon;
  }
  return items[0]?.icon || FLOATER_GROUP_ICON;
}

function resolveGroupRadius(itemCount: number): number {
  if (itemCount <= 2) return FLOATER_GROUP_RADIUS_BASE_PX;
  const scaledRadius = FLOATER_GROUP_RADIUS_BASE_PX + (itemCount - 2) * FLOATER_GROUP_RADIUS_STEP_PX;
  return Math.min(FLOATER_GROUP_RADIUS_CAP_PX, scaledRadius);
}

function easeOutCubic(value: number): number {
  const clamped = Math.max(0, Math.min(1, value));
  return 1 - (1 - clamped) ** 3;
}

function startFloaterGroupExpandAnimation(groupId: string) {
  floaterGroupExpansionAnimation.value = {
    groupId,
    startedAtMs: performance.now(),
  };
  floaterGroupExpansionProgress.value = 0;
}

function stopFloaterGroupExpandAnimation() {
  floaterGroupExpansionAnimation.value = null;
  floaterGroupExpansionProgress.value = 1;
}

function updateFloaterGroupExpandAnimation(nowMs: number) {
  const animation = floaterGroupExpansionAnimation.value;
  if (!animation) return;

  if (expandedFloaterGroupId.value !== animation.groupId) {
    stopFloaterGroupExpandAnimation();
    return;
  }

  const linearProgress = Math.min(
    1,
    Math.max(0, (nowMs - animation.startedAtMs) / FLOATER_GROUP_EXPAND_DURATION_MS)
  );
  floaterGroupExpansionProgress.value = linearProgress;
  if (linearProgress >= 1) {
    stopFloaterGroupExpandAnimation();
  }
}

function resolveGroupExpansionProgress(groupId: string): number {
  const animation = floaterGroupExpansionAnimation.value;
  if (!animation || animation.groupId !== groupId) return 1;
  return easeOutCubic(floaterGroupExpansionProgress.value);
}

const filteredFloaters = computed<FloaterConfig[]>(() => {
  if (isHeatmapFloaterMode.value) return [];
  if (activeFloaterGroup.value === "all") return floaters.value;
  return floaters.value.filter((floater) => floater.group === activeFloaterGroup.value);
});

const renderedEntityFloaters = computed<RenderedFloater[]>(() => {
  const rendered: RenderedFloater[] = [];

  for (const floater of filteredFloaters.value) {
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
      floaterId: floater.id,
      sensorEntityId: null,
      valueText: null,
    });
  }

  return rendered;
});

const renderedHeatmapSensorFloaters = computed<RenderedFloater[]>(() => {
  if (!isHeatmapFloaterMode.value) return [];

  const rendered: RenderedFloater[] = [];
  for (const sensor of resolvedHeatmapSensors.value) {
    const projection = heatmapSensorScreenById.value[sensor.id];
    if (!projection || !projection.visible) continue;

    rendered.push({
      id: `heatmap-sensor-${sensor.id}`,
      label: sensor.label || sensor.entityId,
      icon: "mdi:thermometer",
      x: projection.x,
      y: projection.y,
      isOn: false,
      accentColor: null,
      floaterId: null,
      sensorEntityId: sensor.entityId,
      valueText: formatHeatmapSensorValue(sensor.value, sensor.unit),
    });
  }

  return rendered;
});

const renderedFloaters = computed<RenderedFloater[]>(() =>
  isHeatmapFloaterMode.value ? renderedHeatmapSensorFloaters.value : renderedEntityFloaters.value
);

const floaterGroups = computed<FloaterGroup[]>(() => {
  if (isHeatmapFloaterMode.value) {
    return renderedFloaters.value.map((item) => ({
      id: item.id,
      x: item.x,
      y: item.y,
      items: [item],
    }));
  }
  return collectFloaterGroups(renderedFloaters.value);
});

const renderedFloaterButtons = computed<FloaterButtonRender[]>(() => {
  const buttons: FloaterButtonRender[] = [];

  for (const group of floaterGroups.value) {
    if (group.items.length === 1) {
      const item = group.items[0];
      if (!item) continue;
      buttons.push({
        id: `floater-${item.id}`,
        x: item.x,
        y: item.y,
        icon: item.icon,
        label: item.label,
        isOn: item.isOn,
        accentColor: item.accentColor,
        isActive: !!item.floaterId && floaterPopupId.value === item.floaterId,
        isGroup: false,
        groupCount: null,
        floaterId: item.floaterId,
        sensorEntityId: item.sensorEntityId,
        groupId: null,
        valueText: item.valueText,
      });
      continue;
    }

    const isExpanded = expandedFloaterGroupId.value === group.id;
    const expansionProgress = resolveGroupExpansionProgress(group.id);
    const hasActiveFloater = group.items.some(
      (item) => !!item.floaterId && floaterPopupId.value === item.floaterId
    );

    if (!isExpanded) {
      buttons.push({
        id: `group-${group.id}`,
        x: group.x,
        y: group.y,
        icon: resolveGroupIcon(group.items),
        label: `${group.items.length} overlapping controls`,
        isOn: group.items.some((item) => item.isOn),
        accentColor: resolveGroupAccentColor(group.items),
        isActive: hasActiveFloater,
        isGroup: true,
        groupCount: group.items.length,
        floaterId: null,
        sensorEntityId: null,
        groupId: group.id,
        valueText: null,
      });
      continue;
    }

    buttons.push({
      id: `group-center-${group.id}`,
      x: group.x,
      y: group.y,
      icon: FLOATER_GROUP_COLLAPSE_ICON,
      label: `Collapse ${group.items.length} controls`,
      isOn: false,
      accentColor: null,
      isActive: false,
      isGroup: true,
      groupCount: group.items.length,
      floaterId: null,
      sensorEntityId: null,
      groupId: group.id,
      valueText: null,
    });

    const radius = resolveGroupRadius(group.items.length);
    const angleStep = (Math.PI * 2) / group.items.length;
    const startAngle = -Math.PI / 2;

    group.items.forEach((item, index) => {
      const angle = startAngle + angleStep * index;
      buttons.push({
        id: `group-item-${group.id}-${item.id}`,
        x: group.x + Math.cos(angle) * radius * expansionProgress,
        y: group.y + Math.sin(angle) * radius * expansionProgress,
        icon: item.icon,
        label: item.label,
        isOn: item.isOn,
        accentColor: item.accentColor,
        isActive: !!item.floaterId && floaterPopupId.value === item.floaterId,
        isGroup: false,
        groupCount: null,
        floaterId: item.floaterId,
        sensorEntityId: item.sensorEntityId,
        groupId: null,
        valueText: item.valueText,
      });
    });
  }

  return buttons;
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

function closeFloaterGroup() {
  expandedFloaterGroupId.value = null;
  stopFloaterGroupExpandAnimation();
}

function closeFloaterPopup() {
  floaterPopupId.value = null;
  runningFloaterAction.value = null;
}

function openFloaterPopup(floaterId: string) {
  closeRoomPopup();
  closeFloaterGroup();
  floaterPopupId.value = floaterId;
}

function toggleFloaterGroup(groupId: string) {
  closeRoomPopup();
  closeFloaterPopup();

  if (expandedFloaterGroupId.value === groupId) {
    expandedFloaterGroupId.value = null;
    stopFloaterGroupExpandAnimation();
    return;
  }

  expandedFloaterGroupId.value = groupId;
  startFloaterGroupExpandAnimation(groupId);
}

function onFloaterButtonPressed(button: FloaterButtonRender) {
  if (button.groupId) {
    toggleFloaterGroup(button.groupId);
    return;
  }

  if (button.floaterId) {
    void onFloaterPressed(button.floaterId);
    return;
  }

  if (button.sensorEntityId) {
    openEntityControlDialog(button.sensorEntityId);
  }
}

function onFloaterButtonLongPressed(button: FloaterButtonRender) {
  if (button.groupId) return;

  if (button.floaterId) {
    void onFloaterLongPressed(button.floaterId);
    return;
  }

  if (button.sensorEntityId) {
    openEntityControlDialog(button.sensorEntityId);
  }
}

async function onFloaterPressed(floaterId: string) {
  const floater = floatersById.value[floaterId];
  if (!floater) return;

  closeRoomPopup();
  closeFloaterGroup();
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
  closeFloaterGroup();
  try {
    await runFloaterEntityAction(floater, floater.holdAction);
  } catch (error) {
    console.warn("[lovelace-3d] Floater long press failed", floater, error);
  }
}

function onRoomClick(event: RoomClickEvent) {
  closeFloaterPopup();
  closeFloaterGroup();
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
  updateFloaterGroupExpandAnimation(performance.now());

  if (!three.isMounted()) {
    if (Object.keys(floaterScreenById.value).length > 0) {
      floaterScreenById.value = {};
    }
    if (Object.keys(heatmapSensorScreenById.value).length > 0) {
      heatmapSensorScreenById.value = {};
    }
  } else {
    const nextFloaters: Record<string, { x: number; y: number; visible: boolean }> = {};

    for (const floater of floaters.value) {
      const projection = three.projectWorldPoint(floater.point.x, floater.point.y, floater.point.z);
      if (!projection) continue;
      nextFloaters[floater.id] = projection;
    }

    floaterScreenById.value = nextFloaters;

    const nextHeatmapSensors: Record<string, { x: number; y: number; visible: boolean }> = {};
    for (const sensor of heatmapConfig.value.sensors) {
      const projection = three.projectWorldPoint(sensor.point.x, sensor.point.y, sensor.point.z);
      if (!projection) continue;
      nextHeatmapSensors[sensor.id] = projection;
    }

    heatmapSensorScreenById.value = nextHeatmapSensors;
  }
}

function updateHeatmapOverlay() {
  if (!three.isMounted()) return;
  three.updateHeatmap(heatmapRenderData.value);
}

const roomsSignature = computed(() => createRoomsSignature(rooms.value));
const floatersSignature = computed(() => createFloatersSignature(floaters.value));
const heatmapSignature = computed(() => createHeatmapSignature(heatmapConfig.value));

onMounted(() => {
  unsubscribeFloaterFrame = three.subscribeFrame(updateFloaterProjections);

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
      updateFloaterProjections();
      updateHeatmapOverlay();
    },
    { immediate: true }
  );
});

onBeforeUnmount(() => {
  unsubscribeFloaterFrame?.();
  unsubscribeFloaterFrame = null;
});

watch(roomsSignature, () => {
  if (!roomPopup.value) return;
  const hasRoom = rooms.value.some((room) => room.id === roomPopup.value?.roomId);
  if (!hasRoom) closeRoomPopup();
});

watch(floatersSignature, () => {
  closeFloaterGroup();
  updateFloaterProjections();

  if (activeFloaterGroup.value !== "all") {
    const hasGroup = floaters.value.some((floater) => floater.group === activeFloaterGroup.value);
    if (!hasGroup) {
      activeFloaterGroup.value = "all";
    }
  }

  if (!floaterPopupId.value) return;
  if (!floatersById.value[floaterPopupId.value]) {
    closeFloaterPopup();
  }
});

watch(isHeatmapFloaterMode, (enabled) => {
  if (enabled) {
    closeFloaterPopup();
    closeFloaterGroup();
  }
});

watch(
  heatmapSignature,
  () => {
    const config = heatmapConfig.value;
    if (!config.enabled || config.sensors.length === 0) {
      heatmapVisible.value = false;
      heatmapVisibilityInitialized = false;
      updateHeatmapOverlay();
      return;
    }

    if (!heatmapVisibilityInitialized) {
      heatmapVisible.value = config.defaultVisible;
      heatmapVisibilityInitialized = true;
    }

    updateHeatmapOverlay();
  },
  { immediate: true }
);

watch(heatmapRenderData, () => {
  updateHeatmapOverlay();
});

watch(
  () => renderedNavbarItems.value.length,
  (itemCount) => {
    if (itemCount > 0) return;
    if (activeFloaterGroup.value !== "all") {
      activeFloaterGroup.value = "all";
    }
    if (heatmapVisible.value) {
      heatmapVisible.value = false;
    }
  },
  { immediate: true }
);
</script>
