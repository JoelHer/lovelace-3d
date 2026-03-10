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
const MERGE_SCALE = 100; // 1 / scale == merge tolerance (0.01)

const roundKey = (value: number): string =>
  (Math.round(value * MERGE_SCALE) / MERGE_SCALE).toFixed(2);

function canonicalEdgeKey(a: Vec2XZ, b: Vec2XZ): string {
  const aKey = `${roundKey(a[0])},${roundKey(a[1])}`;
  const bKey = `${roundKey(b[0])},${roundKey(b[1])}`;
  return aKey < bKey ? `${aKey}|${bKey}` : `${bKey}|${aKey}`;
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

  const edges = new Map<string, { a: Vec2XZ; b: Vec2XZ }>();
  for (const room of rooms) {
    const polygon = room.polygon;
    if (!Array.isArray(polygon) || polygon.length < 2) continue;

    for (let index = 0; index < polygon.length; index += 1) {
      const a = polygon[index];
      const b = polygon[(index + 1) % polygon.length];
      if (!a || !b) continue;
      const key = canonicalEdgeKey(a, b);
      if (!edges.has(key)) {
        edges.set(key, { a, b });
      }
    }
  }

  for (const edge of edges.values()) {
    const mesh = createWallMesh(edge.a, edge.b, WALL_HEIGHT, WALL_THICKNESS, wallMaterial);
    if (mesh) {
      group.add(mesh);
    }
  }

  return { group, material: wallMaterial };
}
