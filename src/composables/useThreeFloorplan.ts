import { onBeforeUnmount } from "vue";
import {
  AmbientLight,
  BufferAttribute,
  BoxGeometry,
  DirectionalLight,
  GridHelper,
  Group,
  Mesh,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  MeshStandardMaterial,
  MOUSE,
  TOUCH,
  Raycaster,
  Vector2,
  Vector3,
  DoubleSide,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import type { Room, Vec2XZ } from "../three/types";
import { makeRoomFloorMesh } from "../three/floorplan";

type UseThreeFloorplan = {
  mount(el: HTMLElement, rooms: Room[]): void;
  updateRooms(rooms: Room[]): void;
  isMounted(): boolean;
  unmount(): void;
};

const WALL_HEIGHT = 2.6;
const WALL_THICKNESS = 0.08;
const WALL_BASE_OFFSET = 0.02;
const BOTTOM_ALPHA = 0.9;
const TOP_ALPHA = 0.2;
const MERGE_SCALE = 100; // 1 / scale == merge tolerance (0.01)
const FRONT_WALL_HIDE_THRESHOLD = 0.02;

const roundKey = (v: number) => (Math.round(v * MERGE_SCALE) / MERGE_SCALE).toFixed(2);

function canonicalEdgeKey(a: Vec2XZ, b: Vec2XZ) {
  const aKey = `${roundKey(a[0])},${roundKey(a[1])}`;
  const bKey = `${roundKey(b[0])},${roundKey(b[1])}`;
  return aKey < bKey ? `${aKey}|${bKey}` : `${bKey}|${aKey}`;
}

function makeWallMesh(
  a: Vec2XZ,
  b: Vec2XZ,
  height: number,
  thickness: number,
  material: MeshStandardMaterial
) {
  const dir = new Vector3(b[0] - a[0], 0, b[1] - a[1]);
  const length = dir.length();
  if (!Number.isFinite(length) || length <= 0.001) return null;

  const adjustedLength = Math.max(0.01, length - thickness * 1.4); // inset ends to avoid corner overlap
  const geometry = new BoxGeometry(adjustedLength, height, thickness);
  const posAttr = geometry.getAttribute("position") as BufferAttribute;
  const opacity = new Float32Array(posAttr.count);
  for (let i = 0; i < posAttr.count; i++) {
    const y = posAttr.getY(i);
    const t = (y + height / 2) / height;
    opacity[i] = BOTTOM_ALPHA + (TOP_ALPHA - BOTTOM_ALPHA) * t;
  }
  geometry.setAttribute("opacity", new BufferAttribute(opacity, 1));

  const mesh = new Mesh(geometry, material);
  const angle = -Math.atan2(dir.z, dir.x);
  mesh.rotation.y = angle;
  mesh.position.set((a[0] + b[0]) / 2, height / 2 + WALL_BASE_OFFSET, (a[1] + b[1]) / 2);

  return mesh;
}

function createWallMaterial(viewDirUniform: { value: Vector3 }) {
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

    material.userData.shader = shader;
  };

  return material;
}

function makeWalls(
  rooms: Room[],
  viewDirUniform: { value: Vector3 },
  material?: MeshStandardMaterial
) {
  const mat = material ?? createWallMaterial(viewDirUniform);
  const group = new Group();

  const edges = new Map<string, { a: Vec2XZ; b: Vec2XZ }>();
  for (const room of rooms) {
    const poly = room.polygon;
    if (!Array.isArray(poly) || poly.length < 2) continue;

    for (let i = 0; i < poly.length; i++) {
      const a = poly[i];
      const b = poly[(i + 1) % poly.length];
      if (!a || !b) continue;
      const key = canonicalEdgeKey(a, b);
      if (!edges.has(key)) edges.set(key, { a, b });
    }
  }

  for (const edge of edges.values()) {
    const mesh = makeWallMesh(edge.a, edge.b, WALL_HEIGHT, WALL_THICKNESS, mat);
    if (mesh) group.add(mesh);
  }

  return { group, material: mat };
}

export function useThreeFloorplan(): UseThreeFloorplan {
  let renderer: WebGLRenderer | null = null;
  let camera: PerspectiveCamera | null = null;
  let scene: Scene | null = null;
  let controls: OrbitControls | null = null;

  let frameId: number | null = null;
  let resizeObserver: ResizeObserver | null = null;
  let mounted = false;

  let floorGroup: Group | null = null;
  let floorMat: MeshStandardMaterial | null = null;
  let wallGroup: Group | null = null;
  let wallMat: MeshStandardMaterial | null = null;
  const viewDirUniform = { value: new Vector3(0, 0, -1) };
  let pointerHandler: ((e: PointerEvent) => void) | null = null;
  const cameraSide = new Vector2();
  const wallSide = new Vector2();
  const handleResize = (el?: HTMLElement) => {
    if (!renderer || !camera || !el) return;
    const rect = el.getBoundingClientRect();
    const width = Math.max(1, Math.round(rect.width) || el.clientWidth || 300);
    const fallbackHeight = Math.round(width * 0.625);
    const height =
      Math.max(1, Math.round(rect.height)) ||
      Math.max(1, el.clientHeight) ||
      Math.max(1, fallbackHeight);

    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };

  const updateFrontWallVisibility = () => {
    if (!wallGroup || !camera || !controls) return;

    const target = controls.target;
    cameraSide.set(camera.position.x - target.x, camera.position.z - target.z);
    if (cameraSide.lengthSq() < 1e-6) {
      wallGroup.traverse((obj) => {
        if (obj instanceof Mesh) obj.visible = true;
      });
      return;
    }

    wallGroup.traverse((obj) => {
      if (!(obj instanceof Mesh)) return;
      wallSide.set(obj.position.x - target.x, obj.position.z - target.z);
      const side = wallSide.dot(cameraSide);
      obj.visible = side <= FRONT_WALL_HIDE_THRESHOLD;
    });
  };

  const animate = () => {
    if (!renderer || !scene || !camera) return;
    if (wallMat) {
      viewDirUniform.value.set(0, 0, -1).applyQuaternion(camera.quaternion).normalize();
      const shader = wallMat.userData.shader;
      if (shader?.uniforms?.uViewDir) {
        shader.uniforms.uViewDir.value.copy(viewDirUniform.value);
      }
    }
    controls?.update();
    updateFrontWallVisibility();
    renderer.render(scene, camera);
    frameId = window.requestAnimationFrame(animate);
  };

  const mount = (el: HTMLElement, rooms: Room[]) => {
    // Scene
    scene = new Scene();

    // Camera
    camera = new PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.set(3, 6, 10);
    camera.lookAt(3, 0, 2.5);

    // Renderer
    renderer = new WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    el.appendChild(renderer.domElement);

    // Controls (must be created before setting target)
    controls = new OrbitControls(camera, renderer.domElement);
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

    // Optional grid
    const grid = new GridHelper(100, 100, 0x888888, 0x444444);
    scene.add(grid);

    // Floor material
    floorMat = new MeshStandardMaterial({
      roughness: 1,
      metalness: 0,
      side: DoubleSide,
    });

    // Build floors
    floorGroup = new Group();
    for (const room of rooms) {
      const mesh = makeRoomFloorMesh(room.polygon, { y: 0, material: floorMat });
      mesh.userData.roomId = room.id;
      mesh.userData.roomName = room.name;
      floorGroup.add(mesh);
    }
    scene.add(floorGroup);

    const walls = makeWalls(rooms, viewDirUniform);
    wallGroup = walls.group;
    wallMat = walls.material;
    scene.add(wallGroup);

    // Lights
    const keyLight = new DirectionalLight(0xffffff, 1.05);
    keyLight.position.set(4, 6, 5);

    const fillLight = new DirectionalLight(0x88b4ff, 0.5);
    fillLight.position.set(-3, -2, -4);

    const ambient = new AmbientLight(0xffffff, 0.25);

    scene.add(keyLight, fillLight, ambient);

    // Resize handling
    handleResize(el);
    resizeObserver = new ResizeObserver(() => handleResize(el));
    resizeObserver.observe(el);

    // Click detection (raycast rooms)
    const raycaster = new Raycaster();
    const mouse = new Vector2();

    const onPointerDown = (e: PointerEvent) => {
      if (!renderer || !camera || !floorGroup) return;

      const r = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      mouse.y = -(((e.clientY - r.top) / r.height) * 2 - 1);

      raycaster.setFromCamera(mouse, camera);

      // Collect all meshes in the floorGroup
      const floorMeshes: Mesh[] = [];
      floorGroup.traverse((obj) => {
        if (obj instanceof Mesh) floorMeshes.push(obj);
      });

      const hits = raycaster.intersectObjects(floorMeshes, true);
      const firstHit = hits[0];
      if (!firstHit) return;

      const hitObj = firstHit.object as Mesh;
      console.log("Clicked room:", hitObj.userData.roomId, hitObj.userData.roomName);
    };

    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    pointerHandler = onPointerDown;

    mounted = true;
    // Start render loop
    animate();
  };

  const updateRooms = (rooms: Room[]) => {
    if (!scene) return;

    // Rebuild floors
    if (floorGroup && scene) scene.remove(floorGroup);
    if (floorGroup) {
      floorGroup.traverse((obj) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const anyObj = obj as any;
        if (anyObj.isMesh && anyObj.geometry) {
          anyObj.geometry.dispose();
        }
      });
    }
    floorGroup = new Group();
    const floorMaterial =
      floorMat ??
      new MeshStandardMaterial({
        roughness: 1,
        metalness: 0,
        side: DoubleSide,
      });
    floorMat = floorMaterial;
    for (const room of rooms) {
      const mesh = makeRoomFloorMesh(room.polygon, { y: 0, material: floorMaterial });
      mesh.userData.roomId = room.id;
      mesh.userData.roomName = room.name;
      floorGroup.add(mesh);
    }
    scene.add(floorGroup);

    // Rebuild walls
    if (wallGroup && scene) scene.remove(wallGroup);
    if (wallGroup) {
      wallGroup.traverse((obj) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const anyObj = obj as any;
        if (anyObj.isMesh && anyObj.geometry) {
          anyObj.geometry.dispose();
        }
      });
    }
    const walls = makeWalls(rooms, viewDirUniform, wallMat ?? undefined);
    wallGroup = walls.group;
    wallMat = walls.material;
    scene.add(wallGroup);
  };

  const unmount = () => {
    if (frameId) {
      window.cancelAnimationFrame(frameId);
      frameId = null;
    }

    resizeObserver?.disconnect();
    resizeObserver = null;

    controls?.dispose();
    controls = null;

    if (renderer?.domElement && pointerHandler) {
      renderer.domElement.removeEventListener("pointerdown", pointerHandler);
      pointerHandler = null;
    }

    // Dispose room meshes geometry (materials shared)
    if (floorGroup) {
      floorGroup.traverse((obj) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const anyObj = obj as any;
        if (anyObj.isMesh && anyObj.geometry) {
          anyObj.geometry.dispose();
        }
      });
      floorGroup = null;
    }

    floorMat?.dispose();
    floorMat = null;

    if (wallGroup) {
      wallGroup.traverse((obj) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const anyObj = obj as any;
        if (anyObj.isMesh && anyObj.geometry) {
          anyObj.geometry.dispose();
        }
      });
      wallGroup = null;
    }

    wallMat?.dispose();
    wallMat = null;

    if (renderer) {
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    }

    renderer = null;
    camera = null;
    scene = null;
    mounted = false;
  };

  // optional: auto cleanup if you call composable inside component
  onBeforeUnmount(() => unmount());

  return { mount, updateRooms, isMounted: () => mounted, unmount };
}
