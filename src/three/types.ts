import type { Material } from "three";

export type Vec2XZ = readonly [number, number];

export type Room = {
  id: string;
  name: string;
  polygon: Vec2XZ[];
};

export type RoomFloorOptions = {
  y?: number;
  material?: Material;
};
