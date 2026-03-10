export type HassEntityState = {
  state: string;
  attributes?: Record<string, unknown>;
};

export type HassLike = {
  states?: Record<string, HassEntityState | undefined>;
  callWS?: <T = unknown>(message: Record<string, unknown>) => Promise<T>;
  callService?: (
    domain: string,
    service: string,
    serviceData?: Record<string, unknown>,
    target?: Record<string, unknown>
  ) => Promise<unknown>;
  connection?: unknown;
};
