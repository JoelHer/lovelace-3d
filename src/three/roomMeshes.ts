import { DoubleSide, Group, Mesh, MeshStandardMaterial, Object3D } from "three";
import { makeRoomFloorMesh } from "./floorplan";
import type { Room } from "./types";

export function createFloorMaterial(): MeshStandardMaterial {
  return new MeshStandardMaterial({
    roughness: 1,
    metalness: 0,
    side: DoubleSide,
  });
}

export function createRoomFloorGroup(
  rooms: ReadonlyArray<Room>,
  floorMaterial: MeshStandardMaterial
): Group {
  const group = new Group();

  for (const room of rooms) {
    const mesh = makeRoomFloorMesh(room.polygon, { y: 0, material: floorMaterial });
    mesh.userData.roomId = room.id;
    mesh.userData.roomName = room.name;
    group.add(mesh);
  }

  return group;
}

export function disposeMeshGeometries(root: Object3D | null): void {
  if (!root) return;

  root.traverse((obj) => {
    if (obj instanceof Mesh) {
      obj.geometry.dispose();
    }
  });
}
