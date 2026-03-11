import type { HassLike } from "./homeAssistant";

export type LovelaceConfig = {
  type?: string;
  entity?: string;
  rooms?: unknown;
  floaters?: unknown;
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
