import type { HassLike } from "./homeAssistant";

export type LovelaceConfig = {
  type?: string;
  rooms?: unknown;
  floaters?: unknown;
  floater_overlap?: unknown;
  camera?: unknown;
  renderer?: unknown;
  heatmaps?: unknown;
  navbar?: unknown;
  room_popup_actions?: unknown;
  room_actions?: unknown;
  [key: string]: unknown;
};

export type LovelaceCardState = {
  hass: HassLike | null;
  config: LovelaceConfig;
};
