import { BufferAttribute, BoxGeometry, DoubleSide, Group, Mesh, MeshStandardMaterial, Vector3 } from "three";
import type { Room, Vec2XZ } from "./types";

export type ViewDirectionUniform = {
  value: Vector3;
};

type WallShaderUniforms = {
  uViewDir?: {
    value: Vector3;
  };
};

type WallShaderState = {
  uniforms?: WallShaderUniforms;
};

const WALL_HEIGHT = 2.6;
const WALL_THICKNESS = 0.08;
const WALL_BASE_OFFSET = 0.02;
const BOTTOM_ALPHA = 0.9;
const TOP_ALPHA = 0.2;
const WALL_GEOMETRY_EPSILON = 1e-4;
const EDGE_KEY_SCALE = 1000;
const EDGE_KEY_DECIMALS = 3;

type EdgeSegment = {
  a: Vec2XZ;
  b: Vec2XZ;
};

type CountedEdgeSegment = {
  segment: EdgeSegment;
  count: number;
};

const roundKey = (value: number): string =>
  (Math.round(value * EDGE_KEY_SCALE) / EDGE_KEY_SCALE).toFixed(EDGE_KEY_DECIMALS);

function canonicalEdgeKey(a: Vec2XZ, b: Vec2XZ): string {
  const aKey = `${roundKey(a[0])},${roundKey(a[1])}`;
  const bKey = `${roundKey(b[0])},${roundKey(b[1])}`;
  return aKey < bKey ? `${aKey}|${bKey}` : `${bKey}|${aKey}`;
}

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

function cross2D(ax: number, az: number, bx: number, bz: number): number {
  return ax * bz - az * bx;
}

function segmentLengthSq(segment: EdgeSegment): number {
  const dx = segment.b[0] - segment.a[0];
  const dz = segment.b[1] - segment.a[1];
  return dx * dx + dz * dz;
}

function isSegmentDegenerate(segment: EdgeSegment): boolean {
  return segmentLengthSq(segment) <= WALL_GEOMETRY_EPSILON * WALL_GEOMETRY_EPSILON;
}

function isPointOnSegment(point: Vec2XZ, start: Vec2XZ, end: Vec2XZ): boolean {
  const dx = end[0] - start[0];
  const dz = end[1] - start[1];
  const lengthSq = dx * dx + dz * dz;
  if (lengthSq <= WALL_GEOMETRY_EPSILON * WALL_GEOMETRY_EPSILON) {
    return false;
  }

  const pointDx = point[0] - start[0];
  const pointDz = point[1] - start[1];
  const distanceToLine = Math.abs(cross2D(dx, dz, pointDx, pointDz)) / Math.sqrt(lengthSq);
  if (distanceToLine > WALL_GEOMETRY_EPSILON) {
    return false;
  }

  const dot = pointDx * dx + pointDz * dz;
  return dot >= -WALL_GEOMETRY_EPSILON && dot <= lengthSq + WALL_GEOMETRY_EPSILON;
}

function segmentParameter(point: Vec2XZ, start: Vec2XZ, end: Vec2XZ): number {
  const dx = end[0] - start[0];
  const dz = end[1] - start[1];

  if (Math.abs(dx) >= Math.abs(dz)) {
    if (Math.abs(dx) <= WALL_GEOMETRY_EPSILON) return 0;
    return (point[0] - start[0]) / dx;
  }

  if (Math.abs(dz) <= WALL_GEOMETRY_EPSILON) return 0;
  return (point[1] - start[1]) / dz;
}

function areCollinearSegments(first: EdgeSegment, second: EdgeSegment): boolean {
  const firstDx = first.b[0] - first.a[0];
  const firstDz = first.b[1] - first.a[1];
  const secondDx = second.b[0] - second.a[0];
  const secondDz = second.b[1] - second.a[1];
  const firstLength = Math.hypot(firstDx, firstDz);
  const secondLength = Math.hypot(secondDx, secondDz);
  if (firstLength <= WALL_GEOMETRY_EPSILON || secondLength <= WALL_GEOMETRY_EPSILON) return false;

  const parallelError = Math.abs(cross2D(firstDx, firstDz, secondDx, secondDz)) / (firstLength * secondLength);
  if (parallelError > WALL_GEOMETRY_EPSILON) return false;

  const pointDx = second.a[0] - first.a[0];
  const pointDz = second.a[1] - first.a[1];
  const offsetFromLine = Math.abs(cross2D(firstDx, firstDz, pointDx, pointDz)) / firstLength;
  return offsetFromLine <= WALL_GEOMETRY_EPSILON;
}

function interpolatePoint(start: Vec2XZ, end: Vec2XZ, t: number): Vec2XZ {
  const clampedT = clamp01(t);
  return [
    start[0] + (end[0] - start[0]) * clampedT,
    start[1] + (end[1] - start[1]) * clampedT,
  ] as const;
}

function pushUniqueParameter(parameters: number[], parameter: number): void {
  const clamped = clamp01(parameter);
  for (const existing of parameters) {
    if (Math.abs(existing - clamped) <= WALL_GEOMETRY_EPSILON) {
      return;
    }
  }
  parameters.push(clamped);
}

function collectRoomEdgeSegments(rooms: ReadonlyArray<Room>): EdgeSegment[] {
  const edges: EdgeSegment[] = [];

  for (const room of rooms) {
    const polygon = room.polygon;
    if (!Array.isArray(polygon) || polygon.length < 2) continue;

    for (let index = 0; index < polygon.length; index += 1) {
      const start = polygon[index];
      const end = polygon[(index + 1) % polygon.length];
      if (!start || !end) continue;
      const edge: EdgeSegment = { a: start, b: end };
      if (isSegmentDegenerate(edge)) continue;
      edges.push(edge);
    }
  }

  return edges;
}

function resolveBoundaryEdgeSegments(rooms: ReadonlyArray<Room>): EdgeSegment[] {
  const rawEdges = collectRoomEdgeSegments(rooms);
  if (rawEdges.length === 0) return [];

  const countedEdges = new Map<string, CountedEdgeSegment>();

  for (const edge of rawEdges) {
    const splitParameters: number[] = [0, 1];

    for (const candidate of rawEdges) {
      if (!areCollinearSegments(edge, candidate)) continue;

      if (isPointOnSegment(candidate.a, edge.a, edge.b)) {
        pushUniqueParameter(splitParameters, segmentParameter(candidate.a, edge.a, edge.b));
      }
      if (isPointOnSegment(candidate.b, edge.a, edge.b)) {
        pushUniqueParameter(splitParameters, segmentParameter(candidate.b, edge.a, edge.b));
      }
    }

    splitParameters.sort((left, right) => left - right);

    for (let index = 0; index < splitParameters.length - 1; index += 1) {
      const startParam = splitParameters[index];
      const endParam = splitParameters[index + 1];
      if (startParam === undefined || endParam === undefined) continue;
      if (endParam - startParam <= WALL_GEOMETRY_EPSILON) continue;

      const segmentStart = interpolatePoint(edge.a, edge.b, startParam);
      const segmentEnd = interpolatePoint(edge.a, edge.b, endParam);
      const segment: EdgeSegment = { a: segmentStart, b: segmentEnd };
      if (isSegmentDegenerate(segment)) continue;

      const key = canonicalEdgeKey(segment.a, segment.b);
      const existing = countedEdges.get(key);
      if (existing) {
        existing.count += 1;
      } else {
        countedEdges.set(key, { segment, count: 1 });
      }
    }
  }

  const boundarySegments: EdgeSegment[] = [];
  for (const edge of countedEdges.values()) {
    // Shared overlaps appear at least twice and should not produce visible walls.
    if (edge.count % 2 === 0) continue;
    boundarySegments.push(edge.segment);
  }

  return boundarySegments;
}

function createWallMesh(
  start: Vec2XZ,
  end: Vec2XZ,
  height: number,
  thickness: number,
  material: MeshStandardMaterial
): Mesh | null {
  const direction = new Vector3(end[0] - start[0], 0, end[1] - start[1]);
  const length = direction.length();
  if (!Number.isFinite(length) || length <= 0.001) return null;

  // Inset each wall slightly to avoid visible overlap at corners.
  const adjustedLength = Math.max(0.01, length - thickness * 1.4);
  const geometry = new BoxGeometry(adjustedLength, height, thickness);
  const positionAttr = geometry.getAttribute("position") as BufferAttribute;
  const opacity = new Float32Array(positionAttr.count);

  for (let index = 0; index < positionAttr.count; index += 1) {
    const y = positionAttr.getY(index);
    const t = (y + height / 2) / height;
    opacity[index] = BOTTOM_ALPHA + (TOP_ALPHA - BOTTOM_ALPHA) * t;
  }

  geometry.setAttribute("opacity", new BufferAttribute(opacity, 1));

  const mesh = new Mesh(geometry, material);
  mesh.rotation.y = -Math.atan2(direction.z, direction.x);
  mesh.position.set((start[0] + end[0]) / 2, height / 2 + WALL_BASE_OFFSET, (start[1] + end[1]) / 2);

  return mesh;
}

export function createWallMaterial(viewDirUniform: ViewDirectionUniform): MeshStandardMaterial {
  const material = new MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.35,
    metalness: 0,
    transparent: true,
    depthWrite: false,
    polygonOffset: true,
    polygonOffsetFactor: 1,
    polygonOffsetUnits: 1,
    side: DoubleSide,
  });

  material.onBeforeCompile = (shader) => {
    shader.uniforms.uViewDir = viewDirUniform;

    shader.vertexShader = shader.vertexShader
      .replace(
        "#include <common>",
        `#include <common>
attribute float opacity;
varying float vOpacity;
varying vec3 vWorldPos;`
      )
      .replace(
        "#include <begin_vertex>",
        `#include <begin_vertex>
vOpacity = opacity;
vWorldPos = (modelMatrix * vec4(transformed, 1.0)).xyz;`
      );

    shader.fragmentShader = shader.fragmentShader
      .replace(
        "#include <common>",
        `#include <common>
uniform vec3 uViewDir;
varying float vOpacity;
varying vec3 vWorldPos;`
      )
      .replace(
        "#include <dithering_fragment>",
        `#include <dithering_fragment>
float alignment = dot(normalize(vWorldPos - cameraPosition), normalize(uViewDir));
float centerFade = smoothstep(0.35, 0.95, alignment);
float finalAlpha = vOpacity * (1.0 - 0.9 * centerFade);
gl_FragColor.a *= finalAlpha;`
      );

    material.userData.wallShader = shader as WallShaderState;
  };

  return material;
}

export function syncWallMaterialViewDirection(
  material: MeshStandardMaterial | null,
  viewDirection: Vector3
): void {
  if (!material) return;

  const shader = material.userData.wallShader as WallShaderState | undefined;
  const uniform = shader?.uniforms?.uViewDir;
  if (uniform) {
    uniform.value.copy(viewDirection);
  }
}

export function createWallGroup(
  rooms: ReadonlyArray<Room>,
  viewDirUniform: ViewDirectionUniform,
  material?: MeshStandardMaterial
): {
  group: Group;
  material: MeshStandardMaterial;
} {
  const wallMaterial = material ?? createWallMaterial(viewDirUniform);
  const group = new Group();

  for (const segment of resolveBoundaryEdgeSegments(rooms)) {
    const mesh = createWallMesh(segment.a, segment.b, WALL_HEIGHT, WALL_THICKNESS, wallMaterial);
    if (mesh) {
      group.add(mesh);
    }
  }

  return { group, material: wallMaterial };
}
