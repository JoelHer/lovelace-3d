export type RendererConfig = {
  wallColor: string | null;
  wallOpacity: number;
  wallHeight: number;
  gridEnabled: boolean;
  gridColor: string | null;
  backgroundColor: string | null;
  cardTransparent: boolean;
  cardBackgroundColor: string | null;
};

const DEFAULT_WALL_OPACITY = 1;
const DEFAULT_WALL_HEIGHT = 2.6;
const DEFAULT_GRID_ENABLED = true;
const DEFAULT_CARD_TRANSPARENT = false;

function asFinite(value: unknown): number | null {
  const next = Number(value);
  return Number.isFinite(next) ? next : null;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function asTrimmedColor(value: unknown): string | null {
  const next = String(value ?? "").trim();
  return next ? next : null;
}

export function parseRendererConfig(rawRenderer: unknown): RendererConfig {
  const source =
    rawRenderer && typeof rawRenderer === "object" && !Array.isArray(rawRenderer)
      ? (rawRenderer as Record<string, unknown>)
      : {};

  const parsedWallOpacity = asFinite(
    source.wall_opacity ?? source.wallOpacity ?? source.wall_alpha ?? source.wallAlpha
  );
  const parsedWallHeight = asFinite(source.wall_height ?? source.wallHeight ?? source.walls_height ?? source.wallsHeight);
  const rawGridEnabled = source.grid_enabled ?? source.gridEnabled ?? source.grid ?? source.show_grid;

  return {
    wallColor: asTrimmedColor(source.wall_color ?? source.wallColor ?? source.walls_color ?? source.wallsColor),
    wallOpacity: clamp(parsedWallOpacity ?? DEFAULT_WALL_OPACITY, 0, 1),
    wallHeight: clamp(parsedWallHeight ?? DEFAULT_WALL_HEIGHT, 0.2, 10),
    gridEnabled: rawGridEnabled === undefined ? DEFAULT_GRID_ENABLED : rawGridEnabled !== false,
    gridColor: asTrimmedColor(source.grid_color ?? source.gridColor),
    backgroundColor: asTrimmedColor(
      source.background_color ??
        source.backgroundColor ??
        source.background ??
        source.scene_background_color ??
        source.sceneBackgroundColor
    ),
    cardTransparent:
      (source.card_transparent ?? source.cardTransparent ?? source.transparent_card ?? source.transparentCard) === true ||
      (source.card_transparent ?? source.cardTransparent ?? source.transparent_card ?? source.transparentCard) ===
        "true" ||
      DEFAULT_CARD_TRANSPARENT,
    cardBackgroundColor: asTrimmedColor(
      source.card_background_color ?? source.cardBackgroundColor ?? source.card_background ?? source.cardBackground
    ),
  };
}

export function createRendererSignature(config: RendererConfig): string {
  return [
    `wallColor:${config.wallColor ?? "default"}`,
    `wallOpacity:${config.wallOpacity.toFixed(4)}`,
    `wallHeight:${config.wallHeight.toFixed(4)}`,
    `gridEnabled:${config.gridEnabled}`,
    `gridColor:${config.gridColor ?? "default"}`,
    `background:${config.backgroundColor ?? "transparent"}`,
    `cardTransparent:${config.cardTransparent}`,
    `cardBackground:${config.cardBackgroundColor ?? "default"}`,
  ].join("|");
}
