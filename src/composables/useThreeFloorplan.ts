import { onBeforeUnmount } from "vue";
import {
  AmbientLight,
  DirectionalLight,
  GridHelper,
  Group,
  MOUSE,
  Mesh,
  PerspectiveCamera,
  Raycaster,
  Scene,
  TOUCH,
  Vector2,
  Vector3,
  WebGLRenderer,
  MeshStandardMaterial,
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

type MountOptions = {
  onRoomClick?: (event: RoomClickEvent) => void;
};

type UseThreeFloorplan = {
  mount(el: HTMLElement, rooms: Room[], options?: MountOptions): void;
  updateRooms(rooms: Room[]): void;
  projectWorldPoint(worldX: number, worldY: number, worldZ: number): ProjectedPoint | null;
  subscribeFrame(listener: () => void): () => void;
  isMounted(): boolean;
  unmount(): void;
};

type PointerStartState = {
  pointerId: number;
  clientX: number;
  clientY: number;
  button: number;
  isPrimary: boolean;
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
  pointerCleanup: (() => void) | null;
  frameListeners: Set<() => void>;
  viewDirUniform: ViewDirectionUniform;
};

const CLICK_MOVE_TOLERANCE_PX = 6;
const projectedWorldPoint = new Vector3();
const cameraSpacePoint = new Vector3();

function createCamera(): PerspectiveCamera {
  const camera = new PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.set(3, 6, 10);
  camera.lookAt(3, 0, 2.5);
  return camera;
}

function createRenderer(container: HTMLElement): WebGLRenderer {
  const renderer = new WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.width = "100%";
  renderer.domElement.style.height = "100%";
  renderer.domElement.style.display = "block";
  container.appendChild(renderer.domElement);
  return renderer;
}

function createControls(camera: PerspectiveCamera, renderer: WebGLRenderer): OrbitControls {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(3, 0, 2.5);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.enableZoom = true;
  controls.mouseButtons = {
    LEFT: MOUSE.ROTATE,
    MIDDLE: MOUSE.ROTATE,
    RIGHT: MOUSE.PAN,
  };
  controls.touches = {
    ONE: TOUCH.ROTATE,
    TWO: TOUCH.PAN,
  };
  controls.update();
  return controls;
}

function addSceneDecorations(scene: Scene): void {
  scene.add(new GridHelper(100, 100, 0x888888, 0x444444));

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

  const walls = createWallGroup(rooms, state.viewDirUniform, state.wallMaterial ?? undefined);
  state.wallGroup = walls.group;
  state.wallMaterial = walls.material;
  state.scene.add(state.wallGroup);
}

function replaceRooms(state: FloorplanState, rooms: ReadonlyArray<Room>): void {
  replaceFloorGroup(state, rooms);
  replaceWallGroup(state, rooms);
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

function installPointerHandlers(
  state: FloorplanState,
  onRoomClick?: (event: RoomClickEvent) => void
): (() => void) | null {
  if (!state.renderer) return null;

  const raycaster = new Raycaster();
  const mouse = new Vector2();
  let pointerStart: PointerStartState | null = null;

  const onPointerDown = (event: PointerEvent) => {
    if (!event.isPrimary) return;
    pointerStart = {
      pointerId: event.pointerId,
      clientX: event.clientX,
      clientY: event.clientY,
      button: event.button,
      isPrimary: event.isPrimary,
    };
  };

  const onPointerUp = (event: PointerEvent) => {
    if (!pointerStart) return;

    const start = pointerStart;
    pointerStart = null;

    if (!event.isPrimary || !start.isPrimary) return;
    if (event.pointerId !== start.pointerId) return;
    if (event.pointerType === "mouse" && (start.button !== 0 || event.button !== 0)) return;

    const dx = event.clientX - start.clientX;
    const dy = event.clientY - start.clientY;
    if (dx * dx + dy * dy > CLICK_MOVE_TOLERANCE_PX * CLICK_MOVE_TOLERANCE_PX) return;

    const roomEvent = pickRoomAtPointer(state, raycaster, mouse, event.clientX, event.clientY);
    if (roomEvent) {
      onRoomClick?.(roomEvent);
    }
  };

  const clearPointerState = () => {
    pointerStart = null;
  };

  const domElement = state.renderer.domElement;
  domElement.addEventListener("pointerdown", onPointerDown);
  domElement.addEventListener("pointerup", onPointerUp);
  domElement.addEventListener("pointercancel", clearPointerState);

  return () => {
    domElement.removeEventListener("pointerdown", onPointerDown);
    domElement.removeEventListener("pointerup", onPointerUp);
    domElement.removeEventListener("pointercancel", clearPointerState);
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
    pointerCleanup: null,
    frameListeners: new Set(),
    viewDirUniform: { value: new Vector3(0, 0, -1) },
  };

  const mount = (container: HTMLElement, rooms: Room[], options?: MountOptions): void => {
    if (state.mounted) {
      cleanupState(state);
    }

    state.scene = new Scene();
    state.camera = createCamera();
    state.renderer = createRenderer(container);
    state.controls = createControls(state.camera, state.renderer);

    addSceneDecorations(state.scene);
    replaceRooms(state, rooms);

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

  const unmount = (): void => {
    cleanupState(state);
  };

  onBeforeUnmount(unmount);

  return {
    mount,
    updateRooms,
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
