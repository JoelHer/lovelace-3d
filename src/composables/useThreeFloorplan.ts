import { onBeforeUnmount } from "vue";
import {
  AmbientLight,
  CanvasTexture,
  ClampToEdgeWrapping,
  Color,
  DirectionalLight,
  Euler,
  GridHelper,
  Group,
  LinearFilter,
  MOUSE,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  PointLight,
  Raycaster,
  Scene,
  TOUCH,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { createFloorMaterial, createRoomFloorGroup, disposeMeshGeometries } from "../three/roomMeshes";
import { createWallGroup, syncWallMaterialViewDirection, type ViewDirectionUniform } from "../three/walls";
import type { Room } from "../three/types";

export type RoomClickEvent = {
  roomId: string;
  roomName: string;
  x: number;
  y: number;
  worldX: number;
  worldY: number;
  worldZ: number;
};

export type ProjectedPoint = {
  x: number;
  y: number;
  visible: boolean;
};

export type HeatmapSample = {
  x: number;
  z: number;
  value: number;
  radius: number;
  weight: number;
};

export type HeatmapColorStop = {
  position: number;
  r: number;
  g: number;
  b: number;
};

export type HeatmapRenderData = {
  samples: HeatmapSample[];
  minValue: number;
  maxValue: number;
  colorStops: HeatmapColorStop[] | null;
  opacity: number;
  resolution: number;
  blur: number;
  visible: boolean;
};

export type ThreeCameraConfig = {
  position: {
    x: number;
    y: number;
    z: number;
  };
  rotation: {
    x: number;
    y: number;
  };
  maxZoomOut: number;
};

export type ThreeRendererConfig = {
  wallColor: string | null;
  wallOpacity: number;
  wallHeight: number;
  gridEnabled: boolean;
  gridColor: string | null;
  backgroundColor: string | null;
  lightSimulationEnabled: boolean;
  lightSimulationIntensity: number;
  lightSimulationRange: number;
  lightSimulationDecay: number;
};

export type SimulatedSceneLight = {
  id: string;
  x: number;
  y: number;
  z: number;
  color: string | null;
  intensity: number;
};

type MountOptions = {
  onRoomClick?: (event: RoomClickEvent) => void;
  camera?: ThreeCameraConfig;
  renderer?: ThreeRendererConfig;
  lights?: SimulatedSceneLight[];
};

type UseThreeFloorplan = {
  mount(el: HTMLElement, rooms: Room[], options?: MountOptions): void;
  updateRooms(rooms: Room[]): void;
  updateCamera(camera: ThreeCameraConfig): void;
  updateRenderer(renderer: ThreeRendererConfig): void;
  updateLights(lights: SimulatedSceneLight[]): void;
  updateHeatmap(data: HeatmapRenderData | null): void;
  projectWorldPoint(worldX: number, worldY: number, worldZ: number): ProjectedPoint | null;
  subscribeFrame(listener: () => void): () => void;
  isMounted(): boolean;
  unmount(): void;
};

type HeatmapBounds = {
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
};

type PointerStartState = {
  pointerId: number;
  clientX: number;
  clientY: number;
  button: number;
  isPrimary: boolean;
  pointerType: string;
};

type FloorplanState = {
  renderer: WebGLRenderer | null;
  camera: PerspectiveCamera | null;
  scene: Scene | null;
  controls: OrbitControls | null;
  frameId: number | null;
  resizeObserver: ResizeObserver | null;
  mounted: boolean;
  floorGroup: Group | null;
  floorMaterial: MeshStandardMaterial | null;
  wallGroup: Group | null;
  wallMaterial: MeshStandardMaterial | null;
  gridHelper: GridHelper | null;
  simulatedLightGroup: Group | null;
  simulatedLights: SimulatedSceneLight[];
  rendererConfig: ThreeRendererConfig;
  heatmapBounds: HeatmapBounds | null;
  heatmapMesh: Mesh | null;
  heatmapMaterial: MeshBasicMaterial | null;
  heatmapTexture: CanvasTexture | null;
  heatmapCanvas: HTMLCanvasElement | null;
  heatmapContext: CanvasRenderingContext2D | null;
  heatmapMask: Uint8Array | null;
  heatmapMaskResolution: number;
  heatmapMaskRoomsVersion: number;
  heatmapRooms: Room[];
  heatmapRoomsVersion: number;
  heatmapData: HeatmapRenderData | null;
  pointerCleanup: (() => void) | null;
  frameListeners: Set<() => void>;
  viewDirUniform: ViewDirectionUniform;
};

const CLICK_MOVE_TOLERANCE_PX = 6;
const TOUCH_GESTURE_LOCK_THRESHOLD_PX = 8;
const HEATMAP_PLANE_Y = 0.03;
const HEATMAP_BOUNDS_PADDING = 0.2;
const HEATMAP_MIN_WIDTH = 0.6;
const HEATMAP_MIN_DEPTH = 0.6;
const HEATMAP_EPSILON = 1e-6;
const HEATMAP_EDGE_EPSILON = 0.0001;
const HEATMAP_SENSOR_DISTANCE_BIAS = 0.2;
const HEATMAP_MAX_NEAREST_SEARCH_RADIUS = 18;
const HEATMAP_NEIGHBORS = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
  [-1, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
] as const;
const DEFAULT_HEATMAP_COLOR_STOPS: ReadonlyArray<HeatmapColorStop> = [
  { position: 0, r: 22, g: 82, b: 246 },
  { position: 0.3, r: 22, g: 187, b: 255 },
  { position: 0.55, r: 73, g: 219, b: 120 },
  { position: 0.78, r: 255, g: 214, b: 70 },
  { position: 1, r: 250, g: 74, b: 48 },
];
const projectedWorldPoint = new Vector3();
const cameraSpacePoint = new Vector3();
const DEFAULT_CAMERA_POSITION = { x: 3, y: 6, z: 10 };
const DEFAULT_CAMERA_ROTATION = { x: -38.66, y: 0 };
const DEFAULT_CAMERA_MAX_ZOOM_OUT = 60;
const DEFAULT_CAMERA_FALLBACK_ORBIT_DISTANCE = 9.6;
const CAMERA_TARGET_PLANE_Y = 0;
const CAMERA_TARGET_MIN_DISTANCE = 0.05;
const CAMERA_TARGET_MAX_DISTANCE = 500;
const CAMERA_TARGET_INTERSECTION_EPSILON = 0.0001;
const CAMERA_MIN_PITCH_DEG = -89;
const CAMERA_MAX_PITCH_DEG = 89;
const CAMERA_CONTROLS_MIN_POLAR_ANGLE = (1 * Math.PI) / 180;
const CAMERA_CONTROLS_MAX_POLAR_ANGLE = (89 * Math.PI) / 180;
const CAMERA_MAX_DISTANCE_PADDING = 0.001;
const CAMERA_FAR_PLANE_MULTIPLIER = 4;
const DEFAULT_WALL_COLOR_HEX = 0xffffff;
const DEFAULT_WALL_OPACITY = 1;
const DEFAULT_WALL_HEIGHT = 2.6;
const DEFAULT_GRID_ENABLED = true;
const DEFAULT_GRID_PRIMARY_COLOR_HEX = 0x888888;
const DEFAULT_GRID_SECONDARY_COLOR_HEX = 0x444444;
const DEFAULT_LIGHT_SIMULATION_ENABLED = true;
const DEFAULT_LIGHT_SIMULATION_INTENSITY = 2.4;
const DEFAULT_LIGHT_SIMULATION_RANGE = 4.5;
const DEFAULT_LIGHT_SIMULATION_DECAY = 1.2;
const DEFAULT_LIGHT_SIMULATION_COLOR_HEX = 0xffd666;

type DistanceNode = {
  index: number;
  distance: number;
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function normalizeRendererConfig(config?: ThreeRendererConfig): ThreeRendererConfig {
  const parsedWallOpacity = Number(config?.wallOpacity);
  const parsedWallHeight = Number(config?.wallHeight);
  const parsedLightSimulationIntensity = Number(config?.lightSimulationIntensity);
  const parsedLightSimulationRange = Number(config?.lightSimulationRange);
  const parsedLightSimulationDecay = Number(config?.lightSimulationDecay);

  return {
    wallColor: typeof config?.wallColor === "string" && config.wallColor.trim() ? config.wallColor.trim() : null,
    wallOpacity: clamp(Number.isFinite(parsedWallOpacity) ? parsedWallOpacity : DEFAULT_WALL_OPACITY, 0, 1),
    wallHeight: clamp(Number.isFinite(parsedWallHeight) ? parsedWallHeight : DEFAULT_WALL_HEIGHT, 0.2, 10),
    gridEnabled: config?.gridEnabled === undefined ? DEFAULT_GRID_ENABLED : config.gridEnabled !== false,
    gridColor: typeof config?.gridColor === "string" && config.gridColor.trim() ? config.gridColor.trim() : null,
    backgroundColor:
      typeof config?.backgroundColor === "string" && config.backgroundColor.trim() ? config.backgroundColor.trim() : null,
    lightSimulationEnabled:
      config?.lightSimulationEnabled === undefined
        ? DEFAULT_LIGHT_SIMULATION_ENABLED
        : config.lightSimulationEnabled !== false,
    lightSimulationIntensity: clamp(
      Number.isFinite(parsedLightSimulationIntensity)
        ? parsedLightSimulationIntensity
        : DEFAULT_LIGHT_SIMULATION_INTENSITY,
      0,
      8
    ),
    lightSimulationRange: clamp(
      Number.isFinite(parsedLightSimulationRange) ? parsedLightSimulationRange : DEFAULT_LIGHT_SIMULATION_RANGE,
      0.5,
      20
    ),
    lightSimulationDecay: clamp(
      Number.isFinite(parsedLightSimulationDecay) ? parsedLightSimulationDecay : DEFAULT_LIGHT_SIMULATION_DECAY,
      0,
      4
    ),
  };
}

function normalizeSimulatedLights(lights?: ReadonlyArray<SimulatedSceneLight>): SimulatedSceneLight[] {
  if (!Array.isArray(lights)) return [];

  const normalized: SimulatedSceneLight[] = [];
  for (const light of lights) {
    const x = Number(light?.x);
    const y = Number(light?.y);
    const z = Number(light?.z);
    const intensity = Number(light?.intensity);
    if (!Number.isFinite(x) || !Number.isFinite(y) || !Number.isFinite(z) || !Number.isFinite(intensity)) {
      continue;
    }

    const clampedIntensity = clamp(intensity, 0, 1);
    if (clampedIntensity <= 0.0001) continue;

    normalized.push({
      id: String(light?.id ?? `light-${normalized.length + 1}`),
      x,
      y,
      z,
      color: typeof light?.color === "string" && light.color.trim() ? light.color.trim() : null,
      intensity: clampedIntensity,
    });
  }

  return normalized;
}

function computeHeatmapBounds(rooms: ReadonlyArray<Room>): HeatmapBounds | null {
  let minX = Number.POSITIVE_INFINITY;
  let maxX = Number.NEGATIVE_INFINITY;
  let minZ = Number.POSITIVE_INFINITY;
  let maxZ = Number.NEGATIVE_INFINITY;

  for (const room of rooms) {
    for (const [x, z] of room.polygon) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (z < minZ) minZ = z;
      if (z > maxZ) maxZ = z;
    }
  }

  if (!Number.isFinite(minX) || !Number.isFinite(maxX) || !Number.isFinite(minZ) || !Number.isFinite(maxZ)) {
    return null;
  }

  const centerX = (minX + maxX) * 0.5;
  const centerZ = (minZ + maxZ) * 0.5;
  const width = Math.max(HEATMAP_MIN_WIDTH, maxX - minX + HEATMAP_BOUNDS_PADDING * 2);
  const depth = Math.max(HEATMAP_MIN_DEPTH, maxZ - minZ + HEATMAP_BOUNDS_PADDING * 2);

  return {
    minX: centerX - width * 0.5,
    maxX: centerX + width * 0.5,
    minZ: centerZ - depth * 0.5,
    maxZ: centerZ + depth * 0.5,
  };
}

function resolveHeatmapColorStops(colorStops: HeatmapColorStop[] | null): ReadonlyArray<HeatmapColorStop> {
  if (!Array.isArray(colorStops) || colorStops.length < 2) {
    return DEFAULT_HEATMAP_COLOR_STOPS;
  }

  const normalized = colorStops
    .map((stop) => {
      const position = Number(stop.position);
      const r = Number(stop.r);
      const g = Number(stop.g);
      const b = Number(stop.b);
      if (!Number.isFinite(position) || !Number.isFinite(r) || !Number.isFinite(g) || !Number.isFinite(b)) {
        return null;
      }

      return {
        position: clamp(position, 0, 1),
        r: Math.round(clamp(r, 0, 255)),
        g: Math.round(clamp(g, 0, 255)),
        b: Math.round(clamp(b, 0, 255)),
      };
    })
    .filter((stop): stop is HeatmapColorStop => stop !== null)
    .sort((left, right) => left.position - right.position);

  if (normalized.length < 2) {
    return DEFAULT_HEATMAP_COLOR_STOPS;
  }

  const deduped: HeatmapColorStop[] = [];
  for (const stop of normalized) {
    const last = deduped[deduped.length - 1];
    if (last && Math.abs(last.position - stop.position) <= HEATMAP_EPSILON) {
      deduped[deduped.length - 1] = stop;
      continue;
    }
    deduped.push(stop);
  }

  if (deduped.length < 2) {
    return DEFAULT_HEATMAP_COLOR_STOPS;
  }

  const first = deduped[0];
  const last = deduped[deduped.length - 1];
  if (!first || !last) {
    return DEFAULT_HEATMAP_COLOR_STOPS;
  }

  const bounded = [...deduped];
  if (first.position > 0) {
    bounded.unshift({ ...first, position: 0 });
  }
  if (last.position < 1) {
    bounded.push({ ...last, position: 1 });
  }

  return bounded;
}

function sampleHeatmapColor(t: number, colorStops: ReadonlyArray<HeatmapColorStop>): [number, number, number] {
  const clamped = clamp(t, 0, 1);

  for (let index = 1; index < colorStops.length; index += 1) {
    const current = colorStops[index];
    const previous = colorStops[index - 1];
    if (!current || !previous) continue;
    if (clamped > current.position) continue;

    const span = Math.max(HEATMAP_EPSILON, current.position - previous.position);
    const mix = (clamped - previous.position) / span;
    const r = Math.round(previous.r + (current.r - previous.r) * mix);
    const g = Math.round(previous.g + (current.g - previous.g) * mix);
    const b = Math.round(previous.b + (current.b - previous.b) * mix);
    return [r, g, b];
  }

  const lastStop = colorStops[colorStops.length - 1];
  if (!lastStop) return [255, 64, 64];
  return [lastStop.r, lastStop.g, lastStop.b];
}

function isPointOnSegment(
  pointX: number,
  pointZ: number,
  aX: number,
  aZ: number,
  bX: number,
  bZ: number
): boolean {
  const abX = bX - aX;
  const abZ = bZ - aZ;
  const apX = pointX - aX;
  const apZ = pointZ - aZ;
  const cross = Math.abs(abX * apZ - abZ * apX);
  if (cross > HEATMAP_EDGE_EPSILON) return false;

  const dot = apX * abX + apZ * abZ;
  if (dot < -HEATMAP_EDGE_EPSILON) return false;

  const segmentLengthSq = abX * abX + abZ * abZ;
  return dot <= segmentLengthSq + HEATMAP_EDGE_EPSILON;
}

function isPointInsidePolygon(pointX: number, pointZ: number, polygon: ReadonlyArray<readonly [number, number]>): boolean {
  if (polygon.length < 3) return false;

  let inside = false;

  for (let currentIndex = 0, previousIndex = polygon.length - 1; currentIndex < polygon.length; previousIndex = currentIndex, currentIndex += 1) {
    const currentPoint = polygon[currentIndex];
    const previousPoint = polygon[previousIndex];
    if (!currentPoint || !previousPoint) continue;

    const [currentX, currentZ] = currentPoint;
    const [previousX, previousZ] = previousPoint;

    if (isPointOnSegment(pointX, pointZ, currentX, currentZ, previousX, previousZ)) {
      return true;
    }

    const deltaZ = previousZ - currentZ;
    if (Math.abs(deltaZ) <= HEATMAP_EPSILON) continue;

    const intersects =
      (currentZ > pointZ) !== (previousZ > pointZ) &&
      pointX < ((previousX - currentX) * (pointZ - currentZ)) / deltaZ + currentX;

    if (intersects) inside = !inside;
  }

  return inside;
}

function ensureHeatmapMask(state: FloorplanState, resolution: number): boolean {
  const bounds = state.heatmapBounds;
  if (!bounds || state.heatmapRooms.length === 0) {
    state.heatmapMask = null;
    state.heatmapMaskResolution = 0;
    state.heatmapMaskRoomsVersion = 0;
    return false;
  }

  if (
    state.heatmapMask &&
    state.heatmapMaskResolution === resolution &&
    state.heatmapMaskRoomsVersion === state.heatmapRoomsVersion
  ) {
    return true;
  }

  const size = Math.max(16, Math.round(resolution));
  const cellCount = size * size;
  const mask = new Uint8Array(cellCount);
  const worldWidth = Math.max(HEATMAP_EPSILON, bounds.maxX - bounds.minX);
  const worldDepth = Math.max(HEATMAP_EPSILON, bounds.maxZ - bounds.minZ);

  for (let py = 0; py < size; py += 1) {
    const worldZ = bounds.minZ + ((py + 0.5) / size) * worldDepth;
    const rowOffset = py * size;

    for (let px = 0; px < size; px += 1) {
      const worldX = bounds.minX + ((px + 0.5) / size) * worldWidth;
      let inFloorArea = false;

      for (const room of state.heatmapRooms) {
        if (!room) continue;
        if (!isPointInsidePolygon(worldX, worldZ, room.polygon)) continue;
        inFloorArea = true;
        break;
      }

      if (!inFloorArea) continue;
      const index = rowOffset + px;
      mask[index] = 1;
    }
  }

  state.heatmapMask = mask;
  state.heatmapMaskResolution = size;
  state.heatmapMaskRoomsVersion = state.heatmapRoomsVersion;
  return true;
}

function findNearestMaskedCell(
  mask: Uint8Array,
  width: number,
  height: number,
  targetX: number,
  targetY: number,
  maxRadius: number
): number {
  const startX = clamp(Math.round(targetX), 0, width - 1);
  const startY = clamp(Math.round(targetY), 0, height - 1);
  const startIndex = startY * width + startX;
  if ((mask[startIndex] ?? 0) > 0) return startIndex;

  const radiusLimit = Math.max(1, Math.round(maxRadius));

  for (let radius = 1; radius <= radiusLimit; radius += 1) {
    const minX = Math.max(0, startX - radius);
    const maxX = Math.min(width - 1, startX + radius);
    const minY = Math.max(0, startY - radius);
    const maxY = Math.min(height - 1, startY + radius);

    for (let x = minX; x <= maxX; x += 1) {
      const top = minY * width + x;
      if ((mask[top] ?? 0) > 0) return top;
      const bottom = maxY * width + x;
      if (maxY !== minY && (mask[bottom] ?? 0) > 0) return bottom;
    }

    for (let y = minY + 1; y < maxY; y += 1) {
      const left = y * width + minX;
      if ((mask[left] ?? 0) > 0) return left;
      const right = y * width + maxX;
      if (maxX !== minX && (mask[right] ?? 0) > 0) return right;
    }
  }

  return -1;
}

function pushDistanceNode(heap: DistanceNode[], node: DistanceNode): void {
  heap.push(node);
  let index = heap.length - 1;

  while (index > 0) {
    const parentIndex = Math.floor((index - 1) / 2);
    const parent = heap[parentIndex];
    const current = heap[index];
    if (!parent || !current || parent.distance <= current.distance) break;
    heap[parentIndex] = current;
    heap[index] = parent;
    index = parentIndex;
  }
}

function popDistanceNode(heap: DistanceNode[]): DistanceNode | undefined {
  if (heap.length === 0) return undefined;
  const root = heap[0];
  const tail = heap.pop();
  if (!tail || heap.length === 0) {
    return root;
  }

  heap[0] = tail;
  let index = 0;

  while (true) {
    const leftIndex = index * 2 + 1;
    const rightIndex = leftIndex + 1;
    let smallestIndex = index;
    const current = heap[index];
    const left = heap[leftIndex];
    const right = heap[rightIndex];

    if (left && current && left.distance < current.distance) {
      smallestIndex = leftIndex;
    }

    const candidate = heap[smallestIndex];
    if (right && candidate && right.distance < candidate.distance) {
      smallestIndex = rightIndex;
    }

    if (smallestIndex === index) break;

    const swapTarget = heap[smallestIndex];
    if (!current || !swapTarget) break;
    heap[index] = swapTarget;
    heap[smallestIndex] = current;
    index = smallestIndex;
  }

  return root;
}

function computeDistanceMap(
  mask: Uint8Array,
  width: number,
  height: number,
  startIndex: number,
  stepX: number,
  stepZ: number
): Float32Array {
  const size = width * height;
  const distances = new Float32Array(size);
  distances.fill(Number.POSITIVE_INFINITY);

  if (startIndex < 0 || startIndex >= size || (mask[startIndex] ?? 0) === 0) {
    return distances;
  }

  const diagonalStep = Math.hypot(stepX, stepZ);
  distances[startIndex] = 0;
  const queue: DistanceNode[] = [{ index: startIndex, distance: 0 }];

  while (queue.length > 0) {
    const node = popDistanceNode(queue);
    if (!node) break;
    const currentDistance = distances[node.index] ?? Number.POSITIVE_INFINITY;
    if (node.distance > currentDistance + HEATMAP_EPSILON) continue;

    const x = node.index % width;
    const y = (node.index - x) / width;

    for (const [offsetX, offsetY] of HEATMAP_NEIGHBORS) {
      const nextX = x + offsetX;
      const nextY = y + offsetY;
      if (nextX < 0 || nextX >= width || nextY < 0 || nextY >= height) continue;

      const nextIndex = nextY * width + nextX;
      const nextMaskValue = mask[nextIndex] ?? 0;
      if (nextMaskValue === 0) continue;

      const stepDistance = offsetX === 0 || offsetY === 0 ? (offsetX === 0 ? stepZ : stepX) : diagonalStep;
      const candidateDistance = node.distance + stepDistance;

      const nextDistance = distances[nextIndex] ?? Number.POSITIVE_INFINITY;
      if (candidateDistance >= nextDistance - HEATMAP_EPSILON) continue;
      distances[nextIndex] = candidateDistance;
      pushDistanceNode(queue, { index: nextIndex, distance: candidateDistance });
    }
  }

  return distances;
}

function createCamera(config?: ThreeCameraConfig): PerspectiveCamera {
  const camera = new PerspectiveCamera(50, 1, 0.1, 100);
  const position = config?.position ?? DEFAULT_CAMERA_POSITION;
  const rotation = config?.rotation ?? DEFAULT_CAMERA_ROTATION;
  const orientation = resolveCameraOrientation(position, rotation);
  const maxDistance = resolveCameraMaxDistance(config?.maxZoomOut, orientation.orbitDistance);
  camera.position.set(position.x, position.y, position.z);
  camera.up.set(0, 1, 0);
  camera.lookAt(orientation.target.x, orientation.target.y, orientation.target.z);
  camera.far = resolveCameraFarPlane(maxDistance);
  camera.updateProjectionMatrix();
  return camera;
}

function createRenderer(container: HTMLElement): WebGLRenderer {
  const renderer = new WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.width = "100%";
  renderer.domElement.style.height = "100%";
  renderer.domElement.style.display = "block";
  renderer.domElement.style.touchAction = "none";
  container.appendChild(renderer.domElement);
  return renderer;
}

function createControls(
  camera: PerspectiveCamera,
  renderer: WebGLRenderer,
  config?: ThreeCameraConfig
): OrbitControls {
  const controls = new OrbitControls(camera, renderer.domElement);
  const position = config?.position ?? DEFAULT_CAMERA_POSITION;
  const rotation = config?.rotation ?? DEFAULT_CAMERA_ROTATION;
  const orientation = resolveCameraOrientation(position, rotation);
  controls.target.set(orientation.target.x, orientation.target.y, orientation.target.z);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.enableZoom = true;
  controls.minPolarAngle = CAMERA_CONTROLS_MIN_POLAR_ANGLE;
  controls.maxPolarAngle = CAMERA_CONTROLS_MAX_POLAR_ANGLE;
  controls.maxDistance = resolveCameraMaxDistance(config?.maxZoomOut, orientation.orbitDistance);
  controls.mouseButtons = {
    LEFT: MOUSE.ROTATE,
    MIDDLE: MOUSE.ROTATE,
    RIGHT: MOUSE.PAN,
  };
  controls.touches = {
    ONE: TOUCH.PAN,
    TWO: TOUCH.DOLLY_ROTATE,
  };
  controls.update();
  return controls;
}

function applyCameraConfig(state: FloorplanState, config: ThreeCameraConfig): void {
  const camera = state.camera;
  const controls = state.controls;
  if (!camera || !controls) return;

  const orientation = resolveCameraOrientation(config.position, config.rotation);
  const maxZoomOut = resolveCameraMaxDistance(config.maxZoomOut, orientation.orbitDistance);

  camera.position.set(config.position.x, config.position.y, config.position.z);
  camera.up.set(0, 1, 0);
  controls.target.set(orientation.target.x, orientation.target.y, orientation.target.z);
  camera.lookAt(orientation.target.x, orientation.target.y, orientation.target.z);
  camera.far = resolveCameraFarPlane(maxZoomOut);
  camera.updateProjectionMatrix();
  controls.maxDistance = maxZoomOut;
  controls.update();
}

type CameraOrientation = {
  target: { x: number; y: number; z: number };
  orbitDistance: number;
};

function toRadians(value: number): number {
  return (value * Math.PI) / 180;
}

function resolveCameraOrientation(
  position: { x: number; y: number; z: number },
  rotation: { x: number; y: number }
): CameraOrientation {
  const normalizedRotation = normalizeCameraRotation(rotation);
  const euler = new Euler(toRadians(normalizedRotation.x), toRadians(normalizedRotation.y), 0, "XYZ");
  const forward = new Vector3(0, 0, -1).applyEuler(euler).normalize();

  let orbitDistance = DEFAULT_CAMERA_FALLBACK_ORBIT_DISTANCE;
  if (Math.abs(forward.y) > CAMERA_TARGET_INTERSECTION_EPSILON) {
    const intersectionDistance = (CAMERA_TARGET_PLANE_Y - position.y) / forward.y;
    if (
      intersectionDistance >= CAMERA_TARGET_MIN_DISTANCE &&
      intersectionDistance <= CAMERA_TARGET_MAX_DISTANCE
    ) {
      orbitDistance = intersectionDistance;
    }
  }

  const target = {
    x: position.x + forward.x * orbitDistance,
    y: position.y + forward.y * orbitDistance,
    z: position.z + forward.z * orbitDistance,
  };

  return {
    target,
    orbitDistance,
  };
}

function normalizeCameraRotation(rotation: { x: number; y: number }): { x: number; y: number } {
  const x = clamp(rotation.x, CAMERA_MIN_PITCH_DEG, CAMERA_MAX_PITCH_DEG);
  const wrappedYaw = ((rotation.y % 360) + 360) % 360;
  const y = wrappedYaw > 180 ? wrappedYaw - 360 : wrappedYaw;
  return { x, y };
}

function resolveCameraMaxDistance(
  rawMaxZoomOut: unknown,
  orbitDistance: number
): number {
  const configured =
    Number.isFinite(rawMaxZoomOut) && typeof rawMaxZoomOut === "number"
      ? Math.max(2, rawMaxZoomOut)
      : DEFAULT_CAMERA_MAX_ZOOM_OUT;
  return Math.max(configured, orbitDistance + CAMERA_MAX_DISTANCE_PADDING);
}

function resolveCameraFarPlane(maxDistance: number): number {
  return Math.max(100, maxDistance * CAMERA_FAR_PLANE_MULTIPLIER);
}

function resolveColor(
  rawColor: string | null,
  fallbackHex: number
): Color {
  if (!rawColor) {
    return new Color(fallbackHex);
  }
  try {
    return new Color(rawColor);
  } catch (_error) {
    return new Color(fallbackHex);
  }
}

function applyWallMaterialConfig(material: MeshStandardMaterial | null, config: ThreeRendererConfig): void {
  if (!material) return;

  const wallColor = resolveColor(config.wallColor, DEFAULT_WALL_COLOR_HEX);
  material.color.copy(wallColor);
  material.opacity = clamp(config.wallOpacity, 0, 1);
  material.needsUpdate = true;
}

function createGridHelper(config: ThreeRendererConfig): GridHelper {
  const primary = resolveColor(config.gridColor, DEFAULT_GRID_PRIMARY_COLOR_HEX);
  const secondary = primary.clone().multiplyScalar(0.45);
  if (config.gridColor === null) {
    secondary.setHex(DEFAULT_GRID_SECONDARY_COLOR_HEX);
  }

  const grid = new GridHelper(100, 100, primary, secondary);
  grid.visible = config.gridEnabled;
  return grid;
}

function disposeGridHelper(gridHelper: GridHelper | null): void {
  if (!gridHelper) return;
  gridHelper.geometry.dispose();
  if (Array.isArray(gridHelper.material)) {
    for (const material of gridHelper.material) {
      material.dispose();
    }
  } else {
    gridHelper.material.dispose();
  }
}

function replaceGridHelper(state: FloorplanState): void {
  if (!state.scene) return;

  if (state.gridHelper) {
    state.scene.remove(state.gridHelper);
    disposeGridHelper(state.gridHelper);
    state.gridHelper = null;
  }

  const nextGrid = createGridHelper(state.rendererConfig);
  state.gridHelper = nextGrid;
  state.scene.add(nextGrid);
}

function replaceSimulatedLightGroup(state: FloorplanState): void {
  if (state.scene && state.simulatedLightGroup) {
    state.scene.remove(state.simulatedLightGroup);
  }
  state.simulatedLightGroup = null;

  if (
    !state.scene ||
    !state.rendererConfig.lightSimulationEnabled ||
    state.rendererConfig.lightSimulationIntensity <= 0 ||
    state.rendererConfig.lightSimulationRange <= 0 ||
    state.simulatedLights.length === 0
  ) {
    return;
  }

  const group = new Group();
  const intensityMultiplier = state.rendererConfig.lightSimulationIntensity;
  const distance = state.rendererConfig.lightSimulationRange;
  const decay = state.rendererConfig.lightSimulationDecay;

  for (const light of state.simulatedLights) {
    const pointLight = new PointLight(
      resolveColor(light.color, DEFAULT_LIGHT_SIMULATION_COLOR_HEX),
      light.intensity * intensityMultiplier,
      distance,
      decay
    );
    pointLight.position.set(light.x, light.y, light.z);
    group.add(pointLight);
  }

  state.simulatedLightGroup = group;
  state.scene.add(group);
}

function applySimulatedLights(state: FloorplanState, lights: ReadonlyArray<SimulatedSceneLight>): void {
  state.simulatedLights = normalizeSimulatedLights(lights);
  replaceSimulatedLightGroup(state);
}

function applySceneBackground(scene: Scene | null, backgroundColor: string | null): void {
  if (!scene) return;
  if (!backgroundColor) {
    scene.background = null;
    return;
  }
  try {
    scene.background = new Color(backgroundColor);
  } catch (_error) {
    scene.background = null;
  }
}

function applyRendererConfig(state: FloorplanState, config: ThreeRendererConfig): void {
  const previous = state.rendererConfig;
  const normalized = normalizeRendererConfig(config);
  const wallHeightChanged = Math.abs(previous.wallHeight - normalized.wallHeight) > 0.0001;
  const gridColorChanged = previous.gridColor !== normalized.gridColor;

  state.rendererConfig = normalized;
  applySceneBackground(state.scene, normalized.backgroundColor);

  if (state.scene && (gridColorChanged || !state.gridHelper)) {
    replaceGridHelper(state);
  } else if (state.gridHelper) {
    state.gridHelper.visible = normalized.gridEnabled;
  }

  applyWallMaterialConfig(state.wallMaterial, normalized);
  replaceSimulatedLightGroup(state);

  if (wallHeightChanged && state.heatmapRooms.length > 0) {
    replaceWallGroup(state, state.heatmapRooms);
  }
}

function addSceneDecorations(state: FloorplanState): void {
  const scene = state.scene;
  if (!scene) return;
  replaceGridHelper(state);
  applySceneBackground(scene, state.rendererConfig.backgroundColor);

  const keyLight = new DirectionalLight(0xffffff, 1.05);
  keyLight.position.set(4, 6, 5);

  const fillLight = new DirectionalLight(0x88b4ff, 0.5);
  fillLight.position.set(-3, -2, -4);

  const ambient = new AmbientLight(0xffffff, 0.25);

  scene.add(keyLight, fillLight, ambient);
}

function resizeRenderer(renderer: WebGLRenderer, camera: PerspectiveCamera, container: HTMLElement): void {
  const rect = container.getBoundingClientRect();
  const width = Math.max(1, Math.round(rect.width) || container.clientWidth || 300);
  const fallbackHeight = Math.round(width * 0.625);
  const height =
    Math.max(1, Math.round(rect.height)) ||
    Math.max(1, container.clientHeight) ||
    Math.max(1, fallbackHeight);

  renderer.setSize(width, height, false);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

function replaceFloorGroup(state: FloorplanState, rooms: ReadonlyArray<Room>): void {
  if (!state.scene) return;

  if (state.floorGroup) {
    state.scene.remove(state.floorGroup);
    disposeMeshGeometries(state.floorGroup);
  }

  const floorMaterial = state.floorMaterial ?? createFloorMaterial();
  state.floorMaterial = floorMaterial;
  state.floorGroup = createRoomFloorGroup(rooms, floorMaterial);
  state.scene.add(state.floorGroup);
}

function replaceWallGroup(state: FloorplanState, rooms: ReadonlyArray<Room>): void {
  if (!state.scene) return;

  if (state.wallGroup) {
    state.scene.remove(state.wallGroup);
    disposeMeshGeometries(state.wallGroup);
  }

  const walls = createWallGroup(rooms, state.viewDirUniform, state.wallMaterial ?? undefined, {
    height: state.rendererConfig.wallHeight,
  });
  state.wallGroup = walls.group;
  state.wallMaterial = walls.material;
  applyWallMaterialConfig(state.wallMaterial, state.rendererConfig);
  state.scene.add(state.wallGroup);
}

function disposeHeatmapMesh(state: FloorplanState): void {
  if (state.heatmapMesh && state.scene) {
    state.scene.remove(state.heatmapMesh);
  }
  if (state.heatmapMesh) {
    state.heatmapMesh.geometry.dispose();
  }
  state.heatmapMesh = null;
}

function disposeHeatmapTexture(state: FloorplanState): void {
  state.heatmapTexture?.dispose();
  state.heatmapTexture = null;
  state.heatmapCanvas = null;
  state.heatmapContext = null;
  if (state.heatmapMaterial) {
    state.heatmapMaterial.map = null;
  }
}

function ensureHeatmapMaterial(state: FloorplanState): MeshBasicMaterial {
  if (state.heatmapMaterial) return state.heatmapMaterial;

  state.heatmapMaterial = new MeshBasicMaterial({
    transparent: true,
    opacity: 1,
    depthWrite: false,
  });
  return state.heatmapMaterial;
}

function ensureHeatmapCanvas(state: FloorplanState, resolution: number): boolean {
  const nextResolution = Math.max(16, Math.round(resolution));
  if (
    state.heatmapCanvas &&
    state.heatmapContext &&
    state.heatmapTexture &&
    state.heatmapCanvas.width === nextResolution &&
    state.heatmapCanvas.height === nextResolution
  ) {
    return true;
  }

  disposeHeatmapTexture(state);

  const canvas = document.createElement("canvas");
  canvas.width = nextResolution;
  canvas.height = nextResolution;

  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) {
    return false;
  }

  const texture = new CanvasTexture(canvas);
  texture.minFilter = LinearFilter;
  texture.magFilter = LinearFilter;
  texture.wrapS = ClampToEdgeWrapping;
  texture.wrapT = ClampToEdgeWrapping;

  state.heatmapCanvas = canvas;
  state.heatmapContext = context;
  state.heatmapTexture = texture;

  const material = ensureHeatmapMaterial(state);
  material.map = texture;
  material.needsUpdate = true;
  return true;
}

function updateHeatmapSurface(state: FloorplanState, rooms: ReadonlyArray<Room>): void {
  state.heatmapRooms = rooms.map((room) => ({
    id: room.id,
    name: room.name,
    polygon: room.polygon.map(([x, z]) => [x, z] as const),
  }));
  state.heatmapRoomsVersion += 1;
  state.heatmapMask = null;
  state.heatmapMaskResolution = 0;
  state.heatmapMaskRoomsVersion = 0;
  state.heatmapBounds = computeHeatmapBounds(rooms);

  if (!state.scene || !state.heatmapBounds) {
    disposeHeatmapMesh(state);
    return;
  }

  const width = state.heatmapBounds.maxX - state.heatmapBounds.minX;
  const depth = state.heatmapBounds.maxZ - state.heatmapBounds.minZ;
  const centerX = (state.heatmapBounds.minX + state.heatmapBounds.maxX) * 0.5;
  const centerZ = (state.heatmapBounds.minZ + state.heatmapBounds.maxZ) * 0.5;

  const material = ensureHeatmapMaterial(state);
  const nextGeometry = new PlaneGeometry(width, depth, 1, 1);

  if (!state.heatmapMesh) {
    state.heatmapMesh = new Mesh(nextGeometry, material);
    state.heatmapMesh.rotation.x = -Math.PI / 2;
    state.heatmapMesh.renderOrder = 2;
    state.scene.add(state.heatmapMesh);
  } else {
    state.heatmapMesh.geometry.dispose();
    state.heatmapMesh.geometry = nextGeometry;
  }

  state.heatmapMesh.position.set(centerX, HEATMAP_PLANE_Y, centerZ);
}

function drawHeatmapTexture(state: FloorplanState, data: HeatmapRenderData): void {
  if (!state.heatmapBounds || !state.heatmapCanvas || !state.heatmapContext) return;

  const bounds = state.heatmapBounds;
  const { heatmapCanvas, heatmapContext } = state;
  const width = heatmapCanvas.width;
  const height = heatmapCanvas.height;
  if (width < 2 || height < 2) return;
  if (!ensureHeatmapMask(state, width) || !state.heatmapMask) return;

  const mask = state.heatmapMask;
  const worldWidth = bounds.maxX - bounds.minX;
  const worldDepth = bounds.maxZ - bounds.minZ;
  const worldStepX = worldWidth / width;
  const worldStepZ = worldDepth / height;
  const minValue = Math.min(data.minValue, data.maxValue);
  const maxValue = Math.max(data.minValue, data.maxValue);
  const valueRange = Math.max(HEATMAP_EPSILON, maxValue - minValue);
  const colorStops = resolveHeatmapColorStops(data.colorStops);
  const opacity = clamp(data.opacity, 0, 1);
  const smoothness = clamp(data.blur, 0, 1);
  const influencePower = 1.2 + (1 - smoothness) * 1.3;
  const influenceScaleMultiplier = 0.65 + smoothness * 1.5;
  const alphaScale = 0.6 + smoothness * 1.6;

  const preparedSamples = data.samples
    .map((sample) => {
      const normalizedX = ((sample.x - bounds.minX) / Math.max(worldWidth, HEATMAP_EPSILON)) * width - 0.5;
      const normalizedY =
        ((sample.z - bounds.minZ) / Math.max(worldDepth, HEATMAP_EPSILON)) * height - 0.5;
      let closestIndex = findNearestMaskedCell(
        mask,
        width,
        height,
        normalizedX,
        normalizedY,
        HEATMAP_MAX_NEAREST_SEARCH_RADIUS
      );
      if (closestIndex < 0) {
        closestIndex = findNearestMaskedCell(mask, width, height, normalizedX, normalizedY, Math.max(width, height));
      }
      if (closestIndex < 0) return null;

      const radius = Math.max(Math.max(worldStepX, worldStepZ) * 0.5, sample.radius);
      const weight = Math.max(0.05, sample.weight);
      return {
        value: sample.value,
        weight,
        influenceScale: Math.max(HEATMAP_EPSILON, radius * influenceScaleMultiplier),
        distanceMap: computeDistanceMap(mask, width, height, closestIndex, worldStepX, worldStepZ),
      };
    })
    .filter((sample): sample is NonNullable<typeof sample> => sample !== null);

  if (preparedSamples.length === 0) {
    heatmapContext.clearRect(0, 0, width, height);
    return;
  }

  const image = heatmapContext.createImageData(width, height);
  const pixels = image.data;

  for (let index = 0; index < mask.length; index += 1) {
    const pixelOffset = index * 4;

    if ((mask[index] ?? 0) === 0) {
      pixels[pixelOffset] = 0;
      pixels[pixelOffset + 1] = 0;
      pixels[pixelOffset + 2] = 0;
      pixels[pixelOffset + 3] = 0;
      continue;
    }

    let weightedValueSum = 0;
    let weightSum = 0;
    let strongestInfluence = 0;

    for (const sample of preparedSamples) {
      const distance = sample.distanceMap[index] ?? Number.POSITIVE_INFINITY;
      if (!Number.isFinite(distance)) continue;

      const normalizedDistance = distance / sample.influenceScale;
      const influence =
        sample.weight /
        Math.pow(normalizedDistance + HEATMAP_SENSOR_DISTANCE_BIAS, influencePower);
      if (!Number.isFinite(influence) || influence <= HEATMAP_EPSILON) continue;

      weightedValueSum += influence * sample.value;
      weightSum += influence;
      if (influence > strongestInfluence) {
        strongestInfluence = influence;
      }
    }

    if (weightSum <= HEATMAP_EPSILON) {
      pixels[pixelOffset] = 0;
      pixels[pixelOffset + 1] = 0;
      pixels[pixelOffset + 2] = 0;
      pixels[pixelOffset + 3] = 0;
      continue;
    }

    const value = weightedValueSum / weightSum;
    const normalizedValue = clamp((value - minValue) / valueRange, 0, 1);
    const [r, g, b] = sampleHeatmapColor(normalizedValue, colorStops);
    const confidenceAlpha = clamp(1 - Math.exp(-strongestInfluence * alphaScale), 0, 1);
    const alpha = Math.round(clamp(opacity * (0.45 + confidenceAlpha * 0.55), 0, 1) * 255);

    pixels[pixelOffset] = r;
    pixels[pixelOffset + 1] = g;
    pixels[pixelOffset + 2] = b;
    pixels[pixelOffset + 3] = alpha;
  }

  heatmapContext.putImageData(image, 0, 0);
}

function renderHeatmap(state: FloorplanState): void {
  if (!state.heatmapMesh || !state.heatmapBounds) return;

  const data = state.heatmapData;
  if (!data || !data.visible || data.samples.length === 0) {
    state.heatmapMesh.visible = false;
    return;
  }

  if (!ensureHeatmapCanvas(state, data.resolution)) {
    state.heatmapMesh.visible = false;
    return;
  }

  drawHeatmapTexture(state, data);
  if (state.heatmapTexture) {
    state.heatmapTexture.needsUpdate = true;
  }
  state.heatmapMesh.visible = true;
}

function replaceRooms(state: FloorplanState, rooms: ReadonlyArray<Room>): void {
  replaceFloorGroup(state, rooms);
  replaceWallGroup(state, rooms);
  updateHeatmapSurface(state, rooms);
  renderHeatmap(state);
}

function pickRoomAtPointer(
  state: FloorplanState,
  raycaster: Raycaster,
  mouse: Vector2,
  clientX: number,
  clientY: number
): RoomClickEvent | null {
  if (!state.renderer || !state.camera || !state.floorGroup) return null;

  const rect = state.renderer.domElement.getBoundingClientRect();
  const localX = clientX - rect.left;
  const localY = clientY - rect.top;
  if (localX < 0 || localY < 0 || localX > rect.width || localY > rect.height) return null;

  mouse.x = (localX / rect.width) * 2 - 1;
  mouse.y = -((localY / rect.height) * 2 - 1);
  raycaster.setFromCamera(mouse, state.camera);

  const floorMeshes: Mesh[] = [];
  state.floorGroup.traverse((obj) => {
    if (obj instanceof Mesh) {
      floorMeshes.push(obj);
    }
  });

  const hit = raycaster.intersectObjects(floorMeshes, true)[0];
  if (!hit) return null;

  const hitObject = hit.object as Mesh;
  return {
    roomId: String(hitObject.userData.roomId ?? ""),
    roomName: String(hitObject.userData.roomName ?? ""),
    x: localX,
    y: localY,
    worldX: hit.point.x,
    worldY: hit.point.y,
    worldZ: hit.point.z,
  };
}

function readFirstTwoTouchPoints(
  points: ReadonlyMap<number, { x: number; y: number }>
): [{ x: number; y: number }, { x: number; y: number }] | null {
  const iterator = points.values();
  const first = iterator.next().value as { x: number; y: number } | undefined;
  const second = iterator.next().value as { x: number; y: number } | undefined;
  if (!first || !second) return null;
  return [first, second];
}

function installPointerHandlers(
  state: FloorplanState,
  onRoomClick?: (event: RoomClickEvent) => void
): (() => void) | null {
  if (!state.renderer) return null;

  const raycaster = new Raycaster();
  const mouse = new Vector2();
  let pointerStart: PointerStartState | null = null;
  const activeTouchPoints = new Map<number, { x: number; y: number }>();
  let touchGestureActive = false;
  let touchGestureUsed = false;
  let touchGestureMode: "rotate" | "zoom" | null = null;
  let touchGestureStartDistance = 0;
  let touchGestureStartMidX = 0;
  let touchGestureStartMidY = 0;

  const controlsDefaultRotateEnabled = state.controls?.enableRotate ?? true;
  const controlsDefaultZoomEnabled = state.controls?.enableZoom ?? true;

  const applyTouchControlMode = () => {
    const controls = state.controls;
    if (!controls) return;

    if (!touchGestureActive) {
      controls.enableRotate = controlsDefaultRotateEnabled;
      controls.enableZoom = controlsDefaultZoomEnabled;
      return;
    }

    if (touchGestureMode === "zoom") {
      controls.enableRotate = false;
      controls.enableZoom = controlsDefaultZoomEnabled;
      return;
    }

    if (touchGestureMode === "rotate") {
      controls.enableRotate = controlsDefaultRotateEnabled;
      controls.enableZoom = false;
      return;
    }

    // Lock both until we classify the gesture to prevent mixed zoom+rotate.
    controls.enableRotate = false;
    controls.enableZoom = false;
  };

  const endTouchGesture = () => {
    touchGestureActive = false;
    touchGestureMode = null;
    touchGestureStartDistance = 0;
    touchGestureStartMidX = 0;
    touchGestureStartMidY = 0;
    if (activeTouchPoints.size === 0) {
      touchGestureUsed = false;
    }
    applyTouchControlMode();
  };

  const onPointerDown = (event: PointerEvent) => {
    if (event.pointerType === "touch") {
      activeTouchPoints.set(event.pointerId, {
        x: event.clientX,
        y: event.clientY,
      });

      if (activeTouchPoints.size > 1) {
        touchGestureUsed = true;
        pointerStart = null;
        touchGestureMode = null;

        const points = readFirstTwoTouchPoints(activeTouchPoints);
        if (points) {
          const [first, second] = points;
          const dx = second.x - first.x;
          const dy = second.y - first.y;
          touchGestureStartDistance = Math.hypot(dx, dy);
          touchGestureStartMidX = (first.x + second.x) / 2;
          touchGestureStartMidY = (first.y + second.y) / 2;
          touchGestureActive = true;
          applyTouchControlMode();
        }
      }
    }

    if (!event.isPrimary) return;
    pointerStart = {
      pointerId: event.pointerId,
      clientX: event.clientX,
      clientY: event.clientY,
      button: event.button,
      isPrimary: event.isPrimary,
      pointerType: event.pointerType,
    };
  };

  const onPointerMove = (event: PointerEvent) => {
    if (event.pointerType !== "touch") return;
    if (!activeTouchPoints.has(event.pointerId)) return;

    activeTouchPoints.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY,
    });

    if (!touchGestureActive) return;
    if (touchGestureMode) return;

    const points = readFirstTwoTouchPoints(activeTouchPoints);
    if (!points) return;
    const [first, second] = points;
    const dx = second.x - first.x;
    const dy = second.y - first.y;
    const distance = Math.hypot(dx, dy);
    const midX = (first.x + second.x) / 2;
    const midY = (first.y + second.y) / 2;

    const pinchDelta = Math.abs(distance - touchGestureStartDistance);
    const midpointDelta = Math.hypot(midX - touchGestureStartMidX, midY - touchGestureStartMidY);
    if (
      pinchDelta < TOUCH_GESTURE_LOCK_THRESHOLD_PX &&
      midpointDelta < TOUCH_GESTURE_LOCK_THRESHOLD_PX
    ) {
      return;
    }

    touchGestureMode = pinchDelta >= midpointDelta ? "zoom" : "rotate";
    applyTouchControlMode();
  };

  const onPointerUp = (event: PointerEvent) => {
    if (event.pointerType === "touch") {
      activeTouchPoints.delete(event.pointerId);
      if (activeTouchPoints.size < 2) {
        endTouchGesture();
      }
    }

    if (touchGestureUsed) {
      pointerStart = null;
      return;
    }

    if (!pointerStart) return;

    const start = pointerStart;
    pointerStart = null;

    if (!event.isPrimary || !start.isPrimary) return;
    if (event.pointerId !== start.pointerId) return;
    if (start.pointerType === "mouse" && (start.button !== 0 || event.button !== 0)) return;
    if (start.pointerType === "touch" && activeTouchPoints.size > 0) return;

    const dx = event.clientX - start.clientX;
    const dy = event.clientY - start.clientY;
    if (dx * dx + dy * dy > CLICK_MOVE_TOLERANCE_PX * CLICK_MOVE_TOLERANCE_PX) return;

    const roomEvent = pickRoomAtPointer(state, raycaster, mouse, event.clientX, event.clientY);
    if (roomEvent) {
      onRoomClick?.(roomEvent);
    }
  };

  const onPointerCancel = (event: PointerEvent) => {
    if (event.pointerType === "touch") {
      activeTouchPoints.delete(event.pointerId);
      if (activeTouchPoints.size < 2) {
        endTouchGesture();
      }
    }
    pointerStart = null;
  };

  const clearPointerState = () => {
    pointerStart = null;
    activeTouchPoints.clear();
    endTouchGesture();
  };

  const preventMultiTouchBrowserZoom = (event: TouchEvent) => {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  };

  const preventGestureEvent = (event: Event) => {
    event.preventDefault();
  };

  const domElement = state.renderer.domElement;
  domElement.addEventListener("pointerdown", onPointerDown);
  domElement.addEventListener("pointermove", onPointerMove);
  domElement.addEventListener("pointerup", onPointerUp);
  domElement.addEventListener("pointercancel", onPointerCancel);
  domElement.addEventListener("pointerleave", clearPointerState);
  domElement.addEventListener("touchmove", preventMultiTouchBrowserZoom, { passive: false });
  domElement.addEventListener("gesturestart", preventGestureEvent, { passive: false });
  domElement.addEventListener("gesturechange", preventGestureEvent, { passive: false });
  domElement.addEventListener("gestureend", preventGestureEvent, { passive: false });

  return () => {
    domElement.removeEventListener("pointerdown", onPointerDown);
    domElement.removeEventListener("pointermove", onPointerMove);
    domElement.removeEventListener("pointerup", onPointerUp);
    domElement.removeEventListener("pointercancel", onPointerCancel);
    domElement.removeEventListener("pointerleave", clearPointerState);
    domElement.removeEventListener("touchmove", preventMultiTouchBrowserZoom);
    domElement.removeEventListener("gesturestart", preventGestureEvent);
    domElement.removeEventListener("gesturechange", preventGestureEvent);
    domElement.removeEventListener("gestureend", preventGestureEvent);
  };
}

function stopAnimation(state: FloorplanState): void {
  if (state.frameId !== null) {
    window.cancelAnimationFrame(state.frameId);
    state.frameId = null;
  }
}

function renderFrame(state: FloorplanState): void {
  if (!state.renderer || !state.scene || !state.camera) return;

  state.controls?.update();

  if (state.wallMaterial) {
    state.viewDirUniform.value.set(0, 0, -1).applyQuaternion(state.camera.quaternion).normalize();
    syncWallMaterialViewDirection(state.wallMaterial, state.viewDirUniform.value);
  }

  for (const listener of state.frameListeners) {
    listener();
  }

  state.renderer.render(state.scene, state.camera);
  state.frameId = window.requestAnimationFrame(() => renderFrame(state));
}

function cleanupState(state: FloorplanState): void {
  stopAnimation(state);

  state.resizeObserver?.disconnect();
  state.resizeObserver = null;

  state.pointerCleanup?.();
  state.pointerCleanup = null;
  state.frameListeners.clear();

  state.controls?.dispose();
  state.controls = null;

  if (state.scene && state.gridHelper) {
    state.scene.remove(state.gridHelper);
  }
  disposeGridHelper(state.gridHelper);
  state.gridHelper = null;

  if (state.scene && state.simulatedLightGroup) {
    state.scene.remove(state.simulatedLightGroup);
  }
  state.simulatedLightGroup = null;
  state.simulatedLights = [];

  if (state.floorGroup) {
    disposeMeshGeometries(state.floorGroup);
    state.floorGroup = null;
  }

  state.floorMaterial?.dispose();
  state.floorMaterial = null;

  if (state.wallGroup) {
    disposeMeshGeometries(state.wallGroup);
    state.wallGroup = null;
  }

  state.wallMaterial?.dispose();
  state.wallMaterial = null;

  disposeHeatmapMesh(state);
  disposeHeatmapTexture(state);
  state.heatmapMaterial?.dispose();
  state.heatmapMaterial = null;
  state.heatmapBounds = null;
  state.heatmapMask = null;
  state.heatmapMaskResolution = 0;
  state.heatmapMaskRoomsVersion = 0;
  state.heatmapRooms = [];
  state.heatmapRoomsVersion = 0;
  state.heatmapData = null;

  if (state.renderer) {
    state.renderer.dispose();
    if (state.renderer.domElement.parentNode) {
      state.renderer.domElement.parentNode.removeChild(state.renderer.domElement);
    }
  }

  state.renderer = null;
  state.camera = null;
  state.scene = null;
  state.mounted = false;
}

function projectWorldPoint(
  state: FloorplanState,
  worldX: number,
  worldY: number,
  worldZ: number
): ProjectedPoint | null {
  if (!state.renderer || !state.camera) return null;

  const rect = state.renderer.domElement.getBoundingClientRect();
  if (rect.width <= 0 || rect.height <= 0) return null;

  state.camera.updateMatrixWorld();
  projectedWorldPoint.set(worldX, worldY, worldZ);
  cameraSpacePoint.copy(projectedWorldPoint).applyMatrix4(state.camera.matrixWorldInverse);
  projectedWorldPoint.project(state.camera);

  const x = ((projectedWorldPoint.x + 1) / 2) * rect.width;
  const y = ((-projectedWorldPoint.y + 1) / 2) * rect.height;
  const visible =
    cameraSpacePoint.z < 0 &&
    projectedWorldPoint.x >= -1 &&
    projectedWorldPoint.x <= 1 &&
    projectedWorldPoint.y >= -1 &&
    projectedWorldPoint.y <= 1;

  return { x, y, visible };
}

export function useThreeFloorplan(): UseThreeFloorplan {
  const state: FloorplanState = {
    renderer: null,
    camera: null,
    scene: null,
    controls: null,
    frameId: null,
    resizeObserver: null,
    mounted: false,
    floorGroup: null,
    floorMaterial: null,
    wallGroup: null,
    wallMaterial: null,
    gridHelper: null,
    simulatedLightGroup: null,
    simulatedLights: [],
    rendererConfig: normalizeRendererConfig(),
    heatmapBounds: null,
    heatmapMesh: null,
    heatmapMaterial: null,
    heatmapTexture: null,
    heatmapCanvas: null,
    heatmapContext: null,
    heatmapMask: null,
    heatmapMaskResolution: 0,
    heatmapMaskRoomsVersion: 0,
    heatmapRooms: [],
    heatmapRoomsVersion: 0,
    heatmapData: null,
    pointerCleanup: null,
    frameListeners: new Set(),
    viewDirUniform: { value: new Vector3(0, 0, -1) },
  };

  const mount = (container: HTMLElement, rooms: Room[], options?: MountOptions): void => {
    if (state.mounted) {
      cleanupState(state);
    }

    state.rendererConfig = normalizeRendererConfig(options?.renderer);
    state.simulatedLights = normalizeSimulatedLights(options?.lights);
    state.scene = new Scene();
    state.camera = createCamera(options?.camera);
    state.renderer = createRenderer(container);
    state.controls = createControls(state.camera, state.renderer, options?.camera);

    addSceneDecorations(state);
    replaceRooms(state, rooms);
    replaceSimulatedLightGroup(state);

    resizeRenderer(state.renderer, state.camera, container);
    state.resizeObserver = new ResizeObserver(() => {
      if (!state.renderer || !state.camera) return;
      resizeRenderer(state.renderer, state.camera, container);
    });
    state.resizeObserver.observe(container);

    state.pointerCleanup = installPointerHandlers(state, options?.onRoomClick);

    state.mounted = true;
    renderFrame(state);
  };

  const updateRooms = (rooms: Room[]): void => {
    if (!state.scene) return;
    replaceRooms(state, rooms);
  };

  const updateCamera = (cameraConfig: ThreeCameraConfig): void => {
    applyCameraConfig(state, cameraConfig);
  };

  const updateRenderer = (rendererConfig: ThreeRendererConfig): void => {
    applyRendererConfig(state, rendererConfig);
  };

  const updateLights = (lights: SimulatedSceneLight[]): void => {
    applySimulatedLights(state, lights);
  };

  const updateHeatmap = (data: HeatmapRenderData | null): void => {
    state.heatmapData = data;
    renderHeatmap(state);
  };

  const unmount = (): void => {
    cleanupState(state);
  };

  onBeforeUnmount(unmount);

  return {
    mount,
    updateRooms,
    updateCamera,
    updateRenderer,
    updateLights,
    updateHeatmap,
    projectWorldPoint: (worldX, worldY, worldZ) => projectWorldPoint(state, worldX, worldY, worldZ),
    subscribeFrame: (listener) => {
      state.frameListeners.add(listener);
      return () => {
        state.frameListeners.delete(listener);
      };
    },
    isMounted: () => state.mounted,
    unmount,
  };
}
