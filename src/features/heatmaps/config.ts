export type HeatmapPoint = {
  x: number;
  y: number;
  z: number;
};

export type HeatmapSensorConfig = {
  id: string;
  entityId: string;
  label: string;
  point: HeatmapPoint;
  radius: number;
  weight: number;
  valueAttribute: string | null;
};

export type HeatmapColorRangeConfig = {
  value: number;
  color: string;
};

export type HeatmapConfig = {
  enabled: boolean;
  defaultVisible: boolean;
  sensors: HeatmapSensorConfig[];
  minValue: number | null;
  maxValue: number | null;
  colorRanges: HeatmapColorRangeConfig[];
  opacity: number;
  resolution: number;
  blur: number;
};

const DEFAULT_SENSOR_RADIUS = 2.8;
const DEFAULT_SENSOR_WEIGHT = 1;
const DEFAULT_OPACITY = 0.72;
const DEFAULT_RESOLUTION = 192;
const DEFAULT_BLUR = 0.55;

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function asFinite(value: unknown): number | null {
  const next = Number(value);
  return Number.isFinite(next) ? next : null;
}

function parsePoint(rawPoint: unknown, fallbackSource: Record<string, unknown>): HeatmapPoint | null {
  if (Array.isArray(rawPoint) && rawPoint.length >= 3) {
    const [x, y, z] = rawPoint;
    const nextX = asFinite(x);
    const nextY = asFinite(y);
    const nextZ = asFinite(z);
    if (nextX !== null && nextY !== null && nextZ !== null) {
      return { x: nextX, y: nextY, z: nextZ };
    }
  }

  const x = asFinite(fallbackSource.x);
  const y = asFinite(fallbackSource.y);
  const z = asFinite(fallbackSource.z);
  if (x !== null && y !== null && z !== null) {
    return { x, y, z };
  }

  return null;
}

type HeatmapGlobalDefaults = {
  radius: number;
  weight: number;
};

function parseSensors(rawSensors: unknown, defaults: HeatmapGlobalDefaults): HeatmapSensorConfig[] {
  if (!Array.isArray(rawSensors)) return [];

  const parsed: HeatmapSensorConfig[] = [];

  for (let index = 0; index < rawSensors.length; index += 1) {
    const rawSensor = rawSensors[index];
    if (!rawSensor || typeof rawSensor !== "object") continue;

    const sensor = rawSensor as Record<string, unknown>;
    const entityId = String(sensor.entity ?? sensor.entity_id ?? "").trim();
    if (!entityId || !entityId.includes(".")) {
      console.warn("[lovelace-3d] Invalid heatmap sensor entity, expected 'domain.object_id'", rawSensor);
      continue;
    }

    const point = parsePoint(sensor.position, sensor);
    if (!point) {
      console.warn("[lovelace-3d] Heatmap sensor is missing a valid position ([x, y, z] or x/y/z)", rawSensor);
      continue;
    }

    const parsedRadius = asFinite(sensor.radius);
    const radius = clamp(parsedRadius ?? defaults.radius, 0.25, 30);
    const parsedWeight = asFinite(sensor.weight);
    const weight = clamp(parsedWeight ?? defaults.weight, 0.05, 10);

    parsed.push({
      id: String(sensor.id ?? `${entityId}-${index + 1}`),
      entityId,
      label: String(sensor.label ?? sensor.name ?? entityId),
      point,
      radius,
      weight,
      valueAttribute: String(sensor.value_attribute ?? sensor.attribute ?? "").trim() || null,
    });
  }

  return parsed;
}

function parseColorRanges(rawRanges: unknown): HeatmapColorRangeConfig[] {
  if (!Array.isArray(rawRanges)) return [];

  const parsed: HeatmapColorRangeConfig[] = [];

  for (const rawRange of rawRanges) {
    if (Array.isArray(rawRange) && rawRange.length >= 2) {
      const value = asFinite(rawRange[0]);
      const color = String(rawRange[1] ?? "").trim();
      if (value === null || !color) continue;
      parsed.push({ value, color });
      continue;
    }

    if (!rawRange || typeof rawRange !== "object") continue;
    const range = rawRange as Record<string, unknown>;
    const value = asFinite(range.value ?? range.at ?? range.temperature ?? range.temp);
    const color = String(range.color ?? range.colour ?? "").trim();
    if (value === null || !color) continue;
    parsed.push({ value, color });
  }

  // Keep one range per threshold value (last one wins) and sort by value.
  const deduped = new Map<string, HeatmapColorRangeConfig>();
  for (const range of parsed) {
    deduped.set(range.value.toFixed(6), range);
  }

  return [...deduped.values()].sort((left, right) => left.value - right.value);
}

export function parseHeatmapConfig(rawHeatmaps: unknown): HeatmapConfig {
  const source =
    rawHeatmaps && typeof rawHeatmaps === "object" && !Array.isArray(rawHeatmaps)
      ? (rawHeatmaps as Record<string, unknown>)
      : null;

  const parsedDefaultRadius = asFinite(source?.radius);
  const parsedDefaultWeight = asFinite(source?.weight);
  const defaults: HeatmapGlobalDefaults = {
    radius: clamp(parsedDefaultRadius ?? DEFAULT_SENSOR_RADIUS, 0.25, 30),
    weight: clamp(parsedDefaultWeight ?? DEFAULT_SENSOR_WEIGHT, 0.05, 10),
  };

  const rawSensors = source?.sensors ?? source?.entries ?? source?.points ?? rawHeatmaps;
  const sensors = parseSensors(rawSensors, defaults);

  const parsedMin = asFinite(source?.min ?? source?.min_value);
  const parsedMax = asFinite(source?.max ?? source?.max_value);
  const minValue = parsedMin !== null ? parsedMin : null;
  const maxValue = parsedMax !== null ? parsedMax : null;
  const colorRanges = parseColorRanges(
    source?.color_ranges ?? source?.color_stops ?? source?.ranges ?? source?.temperature_ranges
  );

  const parsedOpacity = asFinite(source?.opacity);
  const parsedResolution = asFinite(source?.resolution);
  const parsedBlur = asFinite(source?.blur ?? source?.softness);

  return {
    enabled: source?.enabled !== false,
    defaultVisible: source?.default_visible !== false && source?.visible !== false,
    sensors,
    minValue,
    maxValue,
    colorRanges,
    opacity: clamp(parsedOpacity ?? DEFAULT_OPACITY, 0.05, 1),
    resolution: Math.round(clamp(parsedResolution ?? DEFAULT_RESOLUTION, 96, 384)),
    blur: clamp(parsedBlur ?? DEFAULT_BLUR, 0, 1),
  };
}

export function createHeatmapSignature(config: HeatmapConfig): string {
  return [
    `enabled:${config.enabled}`,
    `visible:${config.defaultVisible}`,
    `min:${config.minValue === null ? "auto" : config.minValue.toFixed(4)}`,
    `max:${config.maxValue === null ? "auto" : config.maxValue.toFixed(4)}`,
    config.colorRanges.map((range) => `${range.value.toFixed(4)}:${range.color}`).join("||"),
    `opacity:${config.opacity.toFixed(4)}`,
    `resolution:${config.resolution}`,
    `blur:${config.blur.toFixed(4)}`,
    config.sensors
      .map(
        (sensor) =>
          `${sensor.id}|${sensor.entityId}|${sensor.valueAttribute ?? ""}|${sensor.radius.toFixed(4)}|${sensor.weight.toFixed(4)}|${sensor.point.x.toFixed(4)},${sensor.point.y.toFixed(4)},${sensor.point.z.toFixed(4)}`
      )
      .join("||"),
  ].join("|");
}
