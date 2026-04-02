import type { Room, Vec2XZ } from "../../three/types";

export type PopupState = {
  roomId: string;
  roomName: string;
  x: number;
  y: number;
  worldX: number;
  worldY: number;
  worldZ: number;
};

export type PopupAction = {
  id: string;
  label: string;
  service: string;
  serviceData: Record<string, unknown>;
  target?: Record<string, unknown>;
  closeOnRun: boolean;
};

export type RoomTapAction = "popup" | "navigate" | "none";

export type RoomClickConfig = {
  tapAction: RoomTapAction;
  navigationPath: string;
};

export type RoomActionConfig = {
  configured: boolean;
  actions: PopupAction[];
};

export type RoomEntry = {
  room: Room;
  clickConfig: RoomClickConfig;
  actionConfig: RoomActionConfig;
};

export type AreaLookup = {
  ready: boolean;
  isValidArea: (areaId: string) => boolean;
  getAreaName: (areaId: string) => string;
};

function toRecord(value: unknown): Record<string, unknown> | undefined {
  if (!value || typeof value !== "object" || Array.isArray(value)) return undefined;
  return value as Record<string, unknown>;
}

function parsePolygon(rawPolygon: unknown): Vec2XZ[] {
  if (!Array.isArray(rawPolygon)) return [];

  const polygon: Vec2XZ[] = [];
  for (const point of rawPolygon) {
    if (!Array.isArray(point) || point.length < 2) continue;
    const [x, z] = point;
    const nextX = Number(x);
    const nextZ = Number(z);
    if (!Number.isFinite(nextX) || !Number.isFinite(nextZ)) continue;
    polygon.push([nextX, nextZ] as const);
  }

  return polygon.length >= 3 ? polygon : [];
}

function parseRoomTapAction(rawValue: unknown, fallback: RoomTapAction): RoomTapAction {
  const normalized = String(rawValue ?? "").trim().toLowerCase().replace(/_/g, "-");
  if (normalized === "popup") return "popup";
  if (normalized === "navigate") return "navigate";
  if (normalized === "none" || normalized === "disabled" || normalized === "ignore") return "none";
  return fallback;
}

function parseRoomClickConfig(rawRoom: Record<string, unknown>): RoomClickConfig {
  const tapActionConfig = toRecord(rawRoom.tap_action);
  const tapAction = parseRoomTapAction(
    tapActionConfig?.action ??
      rawRoom.tap_action ??
      rawRoom.press_action ??
      rawRoom.action ??
      rawRoom.click_action ??
      rawRoom.on_click,
    "popup"
  );

  return {
    tapAction,
    navigationPath: String(
      tapActionConfig?.navigation_path ??
        tapActionConfig?.path ??
        rawRoom.navigation_path ??
        rawRoom.url_path ??
        rawRoom.path ??
        ""
    ).trim(),
  };
}

export function parsePopupActions(rawActions: unknown, contextLabel: string): RoomActionConfig {
  if (rawActions === undefined) {
    return { configured: false, actions: [] };
  }
  if (!Array.isArray(rawActions)) {
    console.warn(`[lovelace-3d] ${contextLabel} actions must be an array`, rawActions);
    return { configured: true, actions: [] };
  }

  const parsed: PopupAction[] = [];
  for (let index = 0; index < rawActions.length; index += 1) {
    const rawAction = rawActions[index];
    if (!rawAction || typeof rawAction !== "object") continue;

    const action = rawAction as Record<string, unknown>;
    const service = String(action.service ?? action.action ?? "").trim();
    if (!service || !service.includes(".")) {
      console.warn("[lovelace-3d] Invalid room action service, expected 'domain.service'", rawAction);
      continue;
    }

    parsed.push({
      id: String(action.id ?? `${service}-${index + 1}`),
      label: String(action.label ?? action.name ?? service),
      service,
      serviceData: toRecord(action.service_data) ?? toRecord(action.data) ?? {},
      target: toRecord(action.target),
      closeOnRun: action.close_on_run !== false,
    });
  }

  return { configured: true, actions: parsed };
}

export function parseRoomEntries(rawRooms: unknown, areas: AreaLookup): RoomEntry[] {
  if (!areas.ready) return [];
  if (!Array.isArray(rawRooms)) return [];

  const parsed: RoomEntry[] = [];

  for (const rawRoom of rawRooms) {
    if (!rawRoom || typeof rawRoom !== "object") continue;

    const roomObj = rawRoom as Record<string, unknown>;
    const areaId = String(roomObj.area ?? "");
    if (!areaId) continue;

    if (!areas.isValidArea(areaId)) {
      console.warn(`[lovelace-3d] Unknown area "${areaId}" in room config`, rawRoom);
      continue;
    }

    const polygon = parsePolygon(roomObj.polygon);
    if (polygon.length < 3) continue;

    const name = String(roomObj.name ?? "") || areas.getAreaName(areaId) || areaId;
    const rawRoomActions = roomObj.room_popup_actions ?? roomObj.room_actions;

    parsed.push({
      room: { id: areaId, name, polygon },
      clickConfig: parseRoomClickConfig(roomObj),
      actionConfig: parsePopupActions(rawRoomActions, `Room "${areaId}"`),
    });
  }

  return parsed;
}

export function buildRoomActionConfigMap(entries: ReadonlyArray<RoomEntry>): Record<string, RoomActionConfig> {
  const map: Record<string, RoomActionConfig> = {};
  for (const entry of entries) {
    map[entry.room.id] = entry.actionConfig;
  }
  return map;
}

export function createRoomsSignature(rooms: ReadonlyArray<Room>): string {
  return rooms
    .map(
      (room) =>
        `${room.id}|${room.name}|${room.polygon
          .map(([x, z]) => `${x.toFixed(4)},${z.toFixed(4)}`)
          .join(";")}`
    )
    .join("||");
}
