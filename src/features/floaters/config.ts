export type FloaterAction = "toggle" | "more-info" | "popup";

export type FloaterPoint = {
  x: number;
  y: number;
  z: number;
};

export type FloaterConfig = {
  id: string;
  entityId: string;
  label: string;
  icon: string;
  group: string;
  point: FloaterPoint;
  tapAction: FloaterAction;
  holdAction: FloaterAction;
};

export type FloaterOverlapConfig = {
  enabled: boolean;
  distancePx: number;
  minItems: number;
  expandDurationMs: number;
};

const DEFAULT_FLOATER_OVERLAP_DISTANCE_PX = 40;
const DEFAULT_FLOATER_OVERLAP_MIN_ITEMS = 2;
const DEFAULT_FLOATER_OVERLAP_EXPAND_DURATION_MS = 120;

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function asFinite(value: unknown): number | null {
  const next = Number(value);
  return Number.isFinite(next) ? next : null;
}

function defaultIconForDomain(domain: string): string {
  switch (domain) {
    case "light":
      return "mdi:lightbulb";
    case "switch":
      return "mdi:toggle-switch";
    case "fan":
      return "mdi:fan";
    case "cover":
      return "mdi:garage";
    case "climate":
      return "mdi:thermostat";
    case "lock":
      return "mdi:lock";
    case "media_player":
      return "mdi:play-circle";
    default:
      return "mdi:flash";
  }
}

function defaultIconForEntity(entityId: string): string {
  const domain = entityId.split(".", 1)[0] ?? "";
  return defaultIconForDomain(domain);
}

function parsePoint(rawPoint: unknown, fallbackSource: Record<string, unknown>): FloaterPoint | null {
  if (Array.isArray(rawPoint) && rawPoint.length >= 3) {
    const [x, y, z] = rawPoint;
    const nextX = Number(x);
    const nextY = Number(y);
    const nextZ = Number(z);
    if (Number.isFinite(nextX) && Number.isFinite(nextY) && Number.isFinite(nextZ)) {
      return { x: nextX, y: nextY, z: nextZ };
    }
  }

  const x = Number(fallbackSource.x);
  const y = Number(fallbackSource.y);
  const z = Number(fallbackSource.z);
  if (Number.isFinite(x) && Number.isFinite(y) && Number.isFinite(z)) {
    return { x, y, z };
  }

  return null;
}

function parseFloaterAction(rawValue: unknown, fallback: FloaterAction): FloaterAction {
  const normalized = String(rawValue ?? "toggle").trim().toLowerCase().replace(/_/g, "-");
  if (normalized === "more-info") return "more-info";
  if (normalized === "popup") return "popup";
  if (normalized === "toggle") return "toggle";
  return fallback;
}

function parseFloaterGroup(rawValue: unknown, fallbackEntityId: string): string {
  const explicit = String(rawValue ?? "").trim().toLowerCase();
  if (explicit) return explicit;

  const domain = fallbackEntityId.split(".", 1)[0]?.trim().toLowerCase() ?? "";
  return domain || "default";
}

export function parseFloaters(rawFloaters: unknown): FloaterConfig[] {
  if (!Array.isArray(rawFloaters)) return [];

  const parsed: FloaterConfig[] = [];

  for (let index = 0; index < rawFloaters.length; index += 1) {
    const rawFloater = rawFloaters[index];
    if (!rawFloater || typeof rawFloater !== "object") continue;

    const floater = rawFloater as Record<string, unknown>;
    const entityId = String(floater.entity ?? floater.entity_id ?? "").trim();
    if (!entityId || !entityId.includes(".")) {
      console.warn("[lovelace-3d] Invalid floater entity, expected 'domain.object_id'", rawFloater);
      continue;
    }

    const point = parsePoint(floater.position, floater);
    if (!point) {
      console.warn("[lovelace-3d] Floater is missing a valid position ([x, y, z] or x/y/z)", rawFloater);
      continue;
    }

    const tapAction = parseFloaterAction(
      floater.tap_action ?? floater.press_action ?? floater.action,
      "toggle"
    );
    const holdAction = parseFloaterAction(
      floater.hold_action ?? floater.long_press_action,
      "popup"
    );
    const id = String(floater.id ?? `${entityId}-${index + 1}`);
    const label = String(floater.label ?? floater.name ?? entityId);
    const icon = String(floater.icon ?? "").trim() || defaultIconForEntity(entityId);
    const group = parseFloaterGroup(floater.group ?? floater.category, entityId);

    parsed.push({
      id,
      entityId,
      label,
      icon,
      group,
      point,
      tapAction,
      holdAction,
    });
  }

  return parsed;
}

export function parseFloaterOverlapConfig(rawOverlap: unknown): FloaterOverlapConfig {
  const source =
    rawOverlap && typeof rawOverlap === "object" && !Array.isArray(rawOverlap)
      ? (rawOverlap as Record<string, unknown>)
      : {};

  const parsedDistance = asFinite(
    source.distance_px ?? source.distance ?? source.overlap_distance ?? source.threshold_px
  );
  const parsedMinItems = asFinite(source.min_items ?? source.minItems ?? source.group_size);
  const parsedExpandDuration = asFinite(
    source.expand_duration_ms ?? source.expandDurationMs ?? source.expand_ms
  );

  return {
    enabled: source.enabled !== false,
    distancePx: clamp(parsedDistance ?? DEFAULT_FLOATER_OVERLAP_DISTANCE_PX, 8, 240),
    minItems: Math.round(clamp(parsedMinItems ?? DEFAULT_FLOATER_OVERLAP_MIN_ITEMS, 2, 12)),
    expandDurationMs: Math.round(
      clamp(parsedExpandDuration ?? DEFAULT_FLOATER_OVERLAP_EXPAND_DURATION_MS, 0, 1000)
    ),
  };
}

export function createFloaterOverlapSignature(config: FloaterOverlapConfig): string {
  return [
    `enabled:${config.enabled}`,
    `distance:${config.distancePx.toFixed(4)}`,
    `minItems:${config.minItems}`,
    `expand:${config.expandDurationMs}`,
  ].join("|");
}

export function createFloatersSignature(floaters: ReadonlyArray<FloaterConfig>): string {
  return floaters
    .map(
      (floater) =>
        `${floater.id}|${floater.entityId}|${floater.icon}|${floater.group}|${floater.tapAction}|${floater.holdAction}|${floater.point.x.toFixed(4)},${floater.point.y.toFixed(4)},${floater.point.z.toFixed(4)}`
    )
    .join("||");
}

export function getFloaterActionLabel(action: FloaterAction): string {
  if (action === "toggle") return "Toggle";
  if (action === "popup") return "Show controls";
  return "Open controls";
}

export function getOppositeQuickAction(action: FloaterAction): FloaterAction {
  if (action === "toggle") return "more-info";
  if (action === "more-info") return "toggle";
  return "toggle";
}
