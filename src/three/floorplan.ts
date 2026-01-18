import {
  BufferAttribute,
  BufferGeometry,
  DoubleSide,
  Mesh,
  MeshStandardMaterial,
  type Material,
} from "three";
import { Earcut } from "three/src/extras/Earcut.js";
import type { Vec2XZ, RoomFloorOptions } from "./types";

export function makeRoomFloorMesh(
  poly: ReadonlyArray<Vec2XZ>,
  opts: RoomFloorOptions = {}
): Mesh {
  const y = opts.y ?? 0;

  // Flatten for Earcut triangulation: [x0,z0,x1,z1,...]
  const flat: number[] = [];
  for (const [x, z] of poly) flat.push(x, z);

  const indices = Earcut.triangulate(flat);

  // Positions: build from poly (no index access => noUncheckedIndexedAccess safe)
  const positions = new Float32Array(poly.length * 3);
  let p = 0;
  for (const [x, z] of poly) {
    positions[p++] = x;
    positions[p++] = y;
    positions[p++] = z;
  }

  const geo = new BufferGeometry();
  geo.setAttribute("position", new BufferAttribute(positions, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();

  const mat: Material =
    opts.material ??
    new MeshStandardMaterial({
      roughness: 1,
      metalness: 0,
      side: DoubleSide,
    });

  const mesh = new Mesh(geo, mat);
  mesh.receiveShadow = true;
  return mesh;
}
