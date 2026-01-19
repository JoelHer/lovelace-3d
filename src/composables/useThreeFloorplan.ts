import { onBeforeUnmount } from "vue";
import {
  AmbientLight,
  DirectionalLight,
  GridHelper,
  Group,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  MeshStandardMaterial,
  DoubleSide,
  MOUSE,
  TOUCH,
  Raycaster,
  Mesh,
  Vector2,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import type { Room } from "../three/types";
import { makeRoomFloorMesh } from "../three/floorplan";

type UseThreeFloorplan = {
  mount(el: HTMLElement, rooms: Room[]): void;
  unmount(): void;
};

export function useThreeFloorplan(): UseThreeFloorplan {
  let renderer: WebGLRenderer | null = null;
  let camera: PerspectiveCamera | null = null;
  let scene: Scene | null = null;
  let controls: OrbitControls | null = null;

  let frameId: number | null = null;
  let resizeObserver: ResizeObserver | null = null;

  let floorGroup: Group | null = null;
  let floorMat: MeshStandardMaterial | null = null;

  
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
  
  const animate = () => {
    if (!renderer || !scene || !camera) return;
    controls?.update();
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

    // Start render loop
    animate();
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

    if (renderer) {
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    }

    renderer = null;
    camera = null;
    scene = null;
  };

  // optional: auto cleanup if you call composable inside component
  onBeforeUnmount(() => unmount());

  return { mount, unmount };
}
