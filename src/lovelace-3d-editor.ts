import { dump, load } from "js-yaml";
import { LitElement, css, html, nothing } from "lit";
import type { HassLike } from "./types/homeAssistant";
import type { LovelaceConfig } from "./types/lovelace";

const EDITOR_TAG = "lovelace-3d-editor";
const CARD_TYPE = "custom:lovelace-3d";
const ROOMS_KEY = "rooms";
const ACTIONS_KEY = "room_popup_actions";
const LEGACY_ACTIONS_KEY = "room_actions";

class Lovelace3DEditor extends LitElement {
  public hass: HassLike | null = null;
  private _config: LovelaceConfig = {};
  private _roomsYaml = "";
  private _actionsYaml = "";
  private _roomsError = "";
  private _actionsError = "";

  static properties = {
    hass: { attribute: false },
    _config: { state: true },
    _roomsYaml: { state: true },
    _actionsYaml: { state: true },
    _roomsError: { state: true },
    _actionsError: { state: true },
  };

  static styles = css`
    :host {
      display: block;
    }

    .editor {
      display: grid;
      gap: 12px;
      padding: 12px 0;
    }

    .panel-content {
      display: grid;
      gap: 8px;
      padding: 8px 0 2px 0;
    }

    .help {
      color: var(--secondary-text-color);
      font-size: 12px;
      line-height: 1.35;
    }

    .error {
      color: var(--error-color, #db4437);
      font-size: 12px;
      font-weight: 600;
    }

    .preview {
      border: 1px solid color-mix(in srgb, var(--divider-color) 68%, transparent);
      border-radius: 10px;
      padding: 10px;
      background: color-mix(in srgb, var(--secondary-background-color) 76%, transparent);
    }

    .preview-title {
      color: var(--secondary-text-color);
      font-size: 11px;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      margin-bottom: 6px;
      font-weight: 700;
    }

    .preview-list {
      margin: 0;
      padding: 0;
      list-style: none;
      display: grid;
      gap: 6px;
    }

    .preview-row {
      display: flex;
      justify-content: space-between;
      gap: 8px;
      font-size: 12px;
    }

    .preview-meta {
      color: var(--secondary-text-color);
      opacity: 0.8;
    }
  `;

  public setConfig(config: LovelaceConfig) {
    this._config = { ...(config ?? {}) };
    this._roomsYaml = this._toYamlArray(this._config[ROOMS_KEY]);
    this._actionsYaml = this._toYamlArray(this._config[ACTIONS_KEY] ?? this._config[LEGACY_ACTIONS_KEY]);
    this._roomsError = "";
    this._actionsError = "";
  }

  protected render() {
    if (!this.hass) return nothing;

    const roomsPreview = this._safeParseYamlArray(this._roomsYaml);

    return html`
      <div class="editor">
        <ha-form
          .hass=${this.hass}
          .data=${{ entity: this._config.entity ?? "" }}
          .schema=${[
            {
              name: "entity",
              selector: { entity: {} },
            },
          ]}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._entityChanged}
        ></ha-form>

        <ha-expansion-panel outlined expanded>
          <h4 slot="header">Rooms YAML</h4>
          <div class="panel-content">
            <ha-code-editor
              .hass=${this.hass}
              .mode=${"yaml"}
              .value=${this._roomsYaml}
              @value-changed=${this._roomsYamlChanged}
            ></ha-code-editor>
            <div class="help">
              Define room polygons here. Add <code>room_popup_actions</code> inside a room for per-room overrides.
            </div>
            ${this._roomsError ? html`<div class="error">${this._roomsError}</div>` : nothing}
          </div>
        </ha-expansion-panel>

        <ha-expansion-panel outlined>
          <h4 slot="header">Default Popup Actions YAML</h4>
          <div class="panel-content">
            <ha-code-editor
              .hass=${this.hass}
              .mode=${"yaml"}
              .value=${this._actionsYaml}
              @value-changed=${this._actionsYamlChanged}
            ></ha-code-editor>
            <div class="help">
              Used only when a room does not define local <code>room_popup_actions</code>.
            </div>
            ${this._actionsError ? html`<div class="error">${this._actionsError}</div>` : nothing}
          </div>
        </ha-expansion-panel>

        <div class="preview">
          <div class="preview-title">Rooms Preview</div>
          <ul class="preview-list">
            ${roomsPreview.length === 0
              ? html`<li class="preview-row"><span>No rooms configured.</span></li>`
              : roomsPreview.map((room, index) => this._renderRoomPreviewRow(room, index))}
          </ul>
        </div>
      </div>
    `;
  }

  private _renderRoomPreviewRow(room: unknown, index: number) {
    const roomObj =
      room && typeof room === "object" ? (room as Record<string, unknown>) : ({} as Record<string, unknown>);
    const area = String(roomObj.area ?? `room_${index + 1}`);
    const name = String(roomObj.name ?? area);

    const localActionsRaw = roomObj.room_popup_actions ?? roomObj.room_actions;
    let actionsLabel = "uses defaults";
    if (Array.isArray(localActionsRaw)) {
      actionsLabel = `${localActionsRaw.length} local action${localActionsRaw.length === 1 ? "" : "s"}`;
    } else if (localActionsRaw !== undefined) {
      actionsLabel = "invalid local actions";
    }

    return html`
      <li class="preview-row">
        <span>${name}</span>
        <span class="preview-meta">${area} - ${actionsLabel}</span>
      </li>
    `;
  }

  private _safeParseYamlArray(yamlText: string): unknown[] {
    try {
      return this._parseYamlArray(yamlText, "Rooms");
    } catch (_) {
      return [];
    }
  }

  private _computeLabel = (schema: { name?: string }) => {
    if (schema.name === "entity") return "Entity";
    return schema.name ?? "";
  };

  private _entityChanged = (ev: CustomEvent) => {
    const nextEntity = ev.detail?.value?.entity ?? "";
    const nextConfig: LovelaceConfig = this._createBaseConfig();
    if (nextEntity) nextConfig.entity = nextEntity;
    else delete nextConfig.entity;
    this._fireConfigChanged(nextConfig);
  };

  private _roomsYamlChanged = (ev: CustomEvent) => {
    this._updateYamlField("rooms", String(ev.detail?.value ?? ""));
  };

  private _actionsYamlChanged = (ev: CustomEvent) => {
    this._updateYamlField("actions", String(ev.detail?.value ?? ""));
  };

  private _updateYamlField(field: "rooms" | "actions", nextValue: string) {
    if (field === "rooms") this._roomsYaml = nextValue;
    else this._actionsYaml = nextValue;
    this._emitConfigFromYaml();
  }

  private _emitConfigFromYaml() {
    const nextConfig: LovelaceConfig = this._createBaseConfig();

    const rooms = this._parseYamlArraySafe(this._roomsYaml, "Rooms", "_roomsError");
    const actions = this._parseYamlArraySafe(this._actionsYaml, "Default popup actions", "_actionsError");

    if (!rooms || !actions) return;

    if (rooms.length > 0) nextConfig[ROOMS_KEY] = rooms;
    else delete nextConfig[ROOMS_KEY];

    if (actions.length > 0) nextConfig[ACTIONS_KEY] = actions;
    else delete nextConfig[ACTIONS_KEY];
    delete nextConfig[LEGACY_ACTIONS_KEY];

    this._fireConfigChanged(nextConfig);
  }

  private _parseYamlArraySafe(
    yamlText: string,
    label: string,
    errorField: "_roomsError" | "_actionsError"
  ): unknown[] | null {
    try {
      const parsed = this._parseYamlArray(yamlText, label);
      this[errorField] = "";
      return parsed;
    } catch (err) {
      this[errorField] = err instanceof Error ? err.message : String(err);
      return null;
    }
  }

  private _createBaseConfig(): LovelaceConfig {
    return {
      ...this._config,
      type: String(this._config.type ?? CARD_TYPE),
    };
  }

  private _parseYamlArray(text: string, label: string): unknown[] {
    const clean = text.trim();
    if (!clean) return [];

    const parsed = load(clean);
    if (parsed == null) return [];
    if (!Array.isArray(parsed)) {
      throw new Error(`${label} YAML must be an array/list.`);
    }
    return parsed;
  }

  private _toYamlArray(value: unknown): string {
    if (!Array.isArray(value) || value.length === 0) return "";
    return dump(value, { noRefs: true, lineWidth: 120 }).trim();
  }

  private _fireConfigChanged(config: LovelaceConfig) {
    this._config = { ...config };
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config },
        bubbles: true,
        composed: true,
      })
    );
  }
}

export function ensureLovelace3DEditorDefined() {
  if (!customElements.get(EDITOR_TAG)) {
    customElements.define(EDITOR_TAG, Lovelace3DEditor);
  }
}
