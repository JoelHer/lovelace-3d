export type NavbarPosition = "left" | "right" | "top" | "bottom";
export type NavbarAction = "toggle-heatmap" | "set-floater-group";

export type NavbarItemConfig = {
  id: string;
  label: string;
  icon: string;
  action: NavbarAction;
  floaterGroup: string | null;
};

export type NavbarConfig = {
  enabled: boolean;
  position: NavbarPosition;
  transparent: boolean;
  opacity: number;
  blur: number;
  backgroundColor: string | null;
  borderColor: string | null;
  textColor: string | null;
  iconColor: string | null;
  offsetX: number;
  offsetY: number;
  items: NavbarItemConfig[];
};

const DEFAULT_ITEMS: NavbarItemConfig[] = [
  {
    id: "heatmap-toggle",
    label: "Heatmap",
    icon: "mdi:thermometer",
    action: "toggle-heatmap",
    floaterGroup: null,
  },
];

function asFinite(value: unknown): number | null {
  const next = Number(value);
  return Number.isFinite(next) ? next : null;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function parseNavbarPosition(rawValue: unknown): NavbarPosition {
  const normalized = String(rawValue ?? "left").trim().toLowerCase();
  if (normalized === "right") return "right";
  if (normalized === "top") return "top";
  if (normalized === "bottom") return "bottom";
  return "left";
}

function parseNavbarAction(rawValue: unknown): NavbarAction | null {
  const normalized = String(rawValue ?? "").trim().toLowerCase().replace(/_/g, "-");
  if (normalized === "toggle-heatmap") return "toggle-heatmap";
  if (normalized === "set-floater-group") return "set-floater-group";
  return null;
}

function parseNavbarItems(rawItems: unknown): NavbarItemConfig[] {
  if (rawItems === undefined || rawItems === null) {
    return DEFAULT_ITEMS.map((item) => ({ ...item }));
  }
  if (!Array.isArray(rawItems)) return [];

  const parsed: NavbarItemConfig[] = [];
  for (let index = 0; index < rawItems.length; index += 1) {
    const rawItem = rawItems[index];
    if (!rawItem || typeof rawItem !== "object") continue;

    const item = rawItem as Record<string, unknown>;
    const action = parseNavbarAction(item.action ?? item.type);
    if (!action) continue;

    const parsedGroup = String(item.floater_group ?? item.group ?? item.target ?? "").trim().toLowerCase();
    const floaterGroup =
      action === "set-floater-group" ? (parsedGroup || "all") : null;

    parsed.push({
      id: String(item.id ?? `${action}-${index + 1}`),
      label: String(
        item.label ??
          item.name ??
          (action === "set-floater-group"
            ? floaterGroup === "all"
              ? "All"
              : floaterGroup
            : "Heatmap")
      ),
      icon:
        String(item.icon ?? (action === "set-floater-group" ? "mdi:lightbulb-group" : "mdi:thermometer"))
          .trim() || (action === "set-floater-group" ? "mdi:lightbulb-group" : "mdi:thermometer"),
      action,
      floaterGroup,
    });
  }

  return parsed;
}

export function parseNavbarConfig(rawNavbar: unknown): NavbarConfig {
  const source =
    rawNavbar && typeof rawNavbar === "object" && !Array.isArray(rawNavbar)
      ? (rawNavbar as Record<string, unknown>)
      : {};

  const parsedOpacity = asFinite(source.opacity);
  const parsedBlur = asFinite(source.blur);
  const parsedOffsetX = asFinite(source.offset_x ?? source.offsetX);
  const parsedOffsetY = asFinite(source.offset_y ?? source.offsetY);

  return {
    enabled: source.enabled !== false,
    position: parseNavbarPosition(source.position),
    transparent: source.transparent !== false,
    opacity: clamp(parsedOpacity ?? 0.58, 0.05, 1),
    blur: clamp(parsedBlur ?? 10, 0, 28),
    backgroundColor: String(source.background ?? source.background_color ?? "").trim() || null,
    borderColor: String(source.border_color ?? source.borderColor ?? "").trim() || null,
    textColor: String(source.text_color ?? source.textColor ?? "").trim() || null,
    iconColor: String(source.icon_color ?? source.iconColor ?? "").trim() || null,
    offsetX: Math.round(clamp(parsedOffsetX ?? 14, 0, 128)),
    offsetY: Math.round(clamp(parsedOffsetY ?? 16, 0, 128)),
    items: parseNavbarItems(source.items),
  };
}

export function createNavbarSignature(config: NavbarConfig): string {
  return [
    `enabled:${config.enabled}`,
    `position:${config.position}`,
    `transparent:${config.transparent}`,
    `opacity:${config.opacity.toFixed(4)}`,
    `blur:${config.blur.toFixed(4)}`,
    `bg:${config.backgroundColor ?? "default"}`,
    `border:${config.borderColor ?? "default"}`,
    `text:${config.textColor ?? "default"}`,
    `icon:${config.iconColor ?? "default"}`,
    `offset:${config.offsetX},${config.offsetY}`,
    config.items
      .map((item) => `${item.id}|${item.label}|${item.icon}|${item.action}|${item.floaterGroup ?? ""}`)
      .join("||"),
  ].join("|");
}
