import { createApp, reactive } from "vue";
import App from "./App.vue";

// Inline CSS into Shadow DOM
// @ts-ignore - Vite supports ?inline
import cssText from "./style.css?inline";

import type { HassLike } from "./types/homeAssistant";
import type { LovelaceCardState, LovelaceConfig } from "./types/lovelace";

type WindowWithProcess = Window & {
  process?: {
    env?: Record<string, unknown>;
  };
  customCards?: Array<{
    type: string;
    name: string;
    description: string;
  }>;
};

const globalWindow = window as WindowWithProcess;
globalWindow.process ??= { env: {} };
globalWindow.process.env ??= {};

const CARD_TAG = "lovelace-3d";

class Lovelace3DCard extends HTMLElement {
  private readonly _state = reactive<LovelaceCardState>({
    hass: null,
    config: {},
  });

  private _app: ReturnType<typeof createApp> | null = null;
  private _mountEl: HTMLDivElement | null = null;
  private readonly _root: ShadowRoot;

  constructor() {
    super();
    this._root = this.attachShadow({ mode: "open" });
    this._root.innerHTML = `
      <style>${cssText}</style>
      <div id="root"></div>
    `;
    this._mountEl = this._root.querySelector("#root");
  }

  setConfig(config: LovelaceConfig) {
    this._state.config = { ...(config ?? {}) };
  }

  set hass(hass: HassLike | null) {
    this._state.hass = hass;
  }

  connectedCallback() {
    if (this._app || !this._mountEl) return;
    this._app = createApp(App, { state: this._state });
    this._app.mount(this._mountEl);
  }

  disconnectedCallback() {
    if (!this._app) return;
    this._app.unmount();
    this._app = null;
  }

  getCardSize() {
    return 3;
  }

  static async getConfigElement() {
    const { ensureLovelace3DEditorDefined } = await import("./lovelace-3d-editor");
    ensureLovelace3DEditorDefined();
    return document.createElement("lovelace-3d-editor");
  }

  static getStubConfig(): LovelaceConfig {
    return {
      type: "custom:lovelace-3d",
      rooms: [],
    };
  }
}

if (!customElements.get(CARD_TAG)) {
  customElements.define(CARD_TAG, Lovelace3DCard);
}

globalWindow.customCards ??= [];
if (!globalWindow.customCards.some((card) => card.type === CARD_TAG)) {
  globalWindow.customCards.push({
    type: CARD_TAG,
    name: "Lovelace 3D",
    description: "A 3D visualization card for your home automation system",
  });
}
