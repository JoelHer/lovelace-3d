export type CameraPoint = {
  x: number;
  y: number;
  z: number;
};

export type CameraRotation = {
  x: number;
  y: number;
};

export type CameraConfig = {
  position: CameraPoint;
  rotation: CameraRotation;
  maxZoomOut: number;
};

const DEFAULT_CAMERA_POSITION: CameraPoint = { x: 3, y: 6, z: 10 };
const DEFAULT_CAMERA_ROTATION: CameraRotation = { x: -38.66, y: 0 };
const DEFAULT_CAMERA_TARGET: CameraPoint = { x: 3, y: 0, z: 2.5 };
const DEFAULT_MAX_ZOOM_OUT = 60;
const LOOK_DIRECTION_EPSILON = 0.0001;
const MIN_CAMERA_PITCH_DEG = -89;
const MAX_CAMERA_PITCH_DEG = 89;

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function asFinite(value: unknown): number | null {
  const next = Number(value);
  return Number.isFinite(next) ? next : null;
}

function normalizeCameraRotation(rotation: CameraRotation): CameraRotation {
  const x = clamp(rotation.x, MIN_CAMERA_PITCH_DEG, MAX_CAMERA_PITCH_DEG);
  const wrappedYaw = ((rotation.y % 360) + 360) % 360;
  const y = wrappedYaw > 180 ? wrappedYaw - 360 : wrappedYaw;
  return { x, y };
}

function parsePoint(
  rawPoint: unknown,
  fallbackSource: Record<string, unknown>,
  fallback: CameraPoint
): CameraPoint {
  if (rawPoint && typeof rawPoint === "object" && !Array.isArray(rawPoint)) {
    const record = rawPoint as Record<string, unknown>;
    const nextX = asFinite(record.x);
    const nextY = asFinite(record.y);
    const nextZ = asFinite(record.z);
    if (nextX !== null && nextY !== null && nextZ !== null) {
      return { x: nextX, y: nextY, z: nextZ };
    }
  }

  if (Array.isArray(rawPoint) && rawPoint.length >= 3) {
    const [x, y, z] = rawPoint;
    const nextX = asFinite(x);
    const nextY = asFinite(y);
    const nextZ = asFinite(z);
    if (nextX !== null && nextY !== null && nextZ !== null) {
      return { x: nextX, y: nextY, z: nextZ };
    }
  }

  const x = asFinite(fallbackSource.x);
  const y = asFinite(fallbackSource.y);
  const z = asFinite(fallbackSource.z);
  if (x !== null && y !== null && z !== null) {
    return { x, y, z };
  }

  return { ...fallback };
}

function parseRotation(
  rawRotation: unknown,
  fallbackSource: Record<string, unknown>,
  fallback: CameraRotation
): CameraRotation {
  if (rawRotation && typeof rawRotation === "object" && !Array.isArray(rawRotation)) {
    const record = rawRotation as Record<string, unknown>;
    const nextX = asFinite(record.x);
    const nextY = asFinite(record.y);
    if (nextX !== null && nextY !== null) {
      return normalizeCameraRotation({ x: nextX, y: nextY });
    }
  }

  if (Array.isArray(rawRotation) && rawRotation.length >= 2) {
    const [x, y] = rawRotation;
    const nextX = asFinite(x);
    const nextY = asFinite(y);
    if (nextX !== null && nextY !== null) {
      return normalizeCameraRotation({ x: nextX, y: nextY });
    }
  }

  const x = asFinite(fallbackSource.x);
  const y = asFinite(fallbackSource.y);
  if (x !== null && y !== null) {
    return normalizeCameraRotation({ x, y });
  }

  return normalizeCameraRotation({ ...fallback });
}

function hasLegacyTarget(source: Record<string, unknown>): boolean {
  return (
    source.target !== undefined ||
    source.look_at !== undefined ||
    source.lookat !== undefined ||
    source.target_x !== undefined ||
    source.target_y !== undefined ||
    source.target_z !== undefined ||
    source.look_at_x !== undefined ||
    source.look_at_y !== undefined ||
    source.look_at_z !== undefined ||
    source.lookat_x !== undefined ||
    source.lookat_y !== undefined ||
    source.lookat_z !== undefined
  );
}

function hasRotation(source: Record<string, unknown>): boolean {
  return (
    source.rotation !== undefined ||
    source.rotate !== undefined ||
    source.camera_rotation !== undefined ||
    source.rotation_x !== undefined ||
    source.rotation_y !== undefined ||
    source.rotation_z !== undefined ||
    source.rotate_x !== undefined ||
    source.rotate_y !== undefined ||
    source.rotate_z !== undefined ||
    source.camera_rotation_x !== undefined ||
    source.camera_rotation_y !== undefined ||
    source.camera_rotation_z !== undefined
  );
}

function deriveRotationFromTarget(position: CameraPoint, target: CameraPoint): CameraRotation {
  const directionX = target.x - position.x;
  const directionY = target.y - position.y;
  const directionZ = target.z - position.z;
  const length = Math.sqrt(directionX * directionX + directionY * directionY + directionZ * directionZ);
  if (length <= LOOK_DIRECTION_EPSILON) {
    return { ...DEFAULT_CAMERA_ROTATION };
  }

  const normalizedX = directionX / length;
  const normalizedY = directionY / length;
  const normalizedZ = directionZ / length;

  const pitchRad = Math.asin(clamp(normalizedY, -1, 1));
  const yawRad = Math.atan2(-normalizedX, -normalizedZ);

  const radToDeg = 180 / Math.PI;
  return {
    x: pitchRad * radToDeg,
    y: yawRad * radToDeg,
  };
}

export function parseCameraConfig(rawCamera: unknown): CameraConfig {
  const source =
    rawCamera && typeof rawCamera === "object" && !Array.isArray(rawCamera)
      ? (rawCamera as Record<string, unknown>)
      : {};

  const positionFallback: Record<string, unknown> = {
    x: source.position_x ?? source.camera_x,
    y: source.position_y ?? source.camera_y,
    z: source.position_z ?? source.camera_z,
  };
  const rotationFallback: Record<string, unknown> = {
    x: source.rotation_x ?? source.rotate_x ?? source.camera_rotation_x,
    y: source.rotation_y ?? source.rotate_y ?? source.camera_rotation_y,
  };
  const targetFallback: Record<string, unknown> = {
    x: source.target_x ?? source.look_at_x ?? source.lookat_x,
    y: source.target_y ?? source.look_at_y ?? source.lookat_y,
    z: source.target_z ?? source.look_at_z ?? source.lookat_z,
  };

  const position = parsePoint(
    source.position ?? source.camera_position,
    positionFallback,
    DEFAULT_CAMERA_POSITION
  );
  const parsedRotation = parseRotation(
    source.rotation ?? source.rotate ?? source.camera_rotation,
    rotationFallback,
    DEFAULT_CAMERA_ROTATION
  );
  const legacyTarget = parsePoint(source.target ?? source.look_at ?? source.lookat, targetFallback, DEFAULT_CAMERA_TARGET);
  const rotation = hasRotation(source)
    ? parsedRotation
    : hasLegacyTarget(source)
      ? normalizeCameraRotation(deriveRotationFromTarget(position, legacyTarget))
      : parsedRotation;

  const parsedMaxZoomOut = asFinite(
    source.max_zoom_out ?? source.maxZoomOut ?? source.max_distance ?? source.maxDistance
  );

  return {
    position,
    rotation,
    maxZoomOut: clamp(parsedMaxZoomOut ?? DEFAULT_MAX_ZOOM_OUT, 2, 300),
  };
}

export function createCameraSignature(config: CameraConfig): string {
  return [
    `pos:${config.position.x.toFixed(4)},${config.position.y.toFixed(4)},${config.position.z.toFixed(4)}`,
    `rot:${config.rotation.x.toFixed(4)},${config.rotation.y.toFixed(4)}`,
    `maxZoomOut:${config.maxZoomOut.toFixed(4)}`,
  ].join("|");
}
