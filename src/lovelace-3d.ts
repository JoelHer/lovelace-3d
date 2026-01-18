// Minimal browser shim (fixes "process is not defined" if any dep references it)
;(window as any).process ??= { env: {} }
;(window as any).process.env ??= {}

import { createApp, reactive } from "vue"
import App from "./App.vue"

// Inline CSS into Shadow DOM
// @ts-ignore - Vite supports ?inline
import cssText from "./style.css?inline"

type Hass = any
type LovelaceConfig = Record<string, any>

const state = reactive<{
  hass: Hass | null
  config: LovelaceConfig
}>({
  hass: null,
  config: {},
})

class Lovelace3DCard extends HTMLElement {
  private _app: ReturnType<typeof createApp> | null = null
  private _mountEl: HTMLDivElement | null = null
  private _root: ShadowRoot

  constructor() {
    super()
    this._root = this.attachShadow({ mode: "open" })
    this._root.innerHTML = `
      <style>${cssText}</style>
      <div id="root"></div>
    `
    this._mountEl = this._root.querySelector("#root")
  }

  setConfig(config: LovelaceConfig) {
    state.config = config ?? {}
  }

  set hass(hass: Hass) {
    state.hass = hass
  }

  connectedCallback() {
    if (this._app || !this._mountEl) return
    this._app = createApp(App, { state })
    this._app.mount(this._mountEl)
  }

  disconnectedCallback() {
    if (!this._app) return
    this._app.unmount()
    this._app = null
  }

  // Optional: helps Lovelace estimate card height
  getCardSize() {
    return 3
  }
}

// Register element once
if (!customElements.get("lovelace-3d")) {
  customElements.define("lovelace-3d", Lovelace3DCard)
}

// Card picker metadata (shows up nicer in UI)
;(window as any).customCards = (window as any).customCards || []
;(window as any).customCards.push({
  type: "lovelace-3d",
  name: "Lovelace 3D",
  description: "A tiny Vue-based 3D-tilting card",
})
