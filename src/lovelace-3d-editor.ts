import { LitElement, css, html, nothing } from "lit";
import type { HassLike } from "./types/homeAssistant";
import type { LovelaceConfig } from "./types/lovelace";

const EDITOR_TAG = "lovelace-3d-editor";
const CARD_TYPE = "custom:lovelace-3d";
const ROOMS_KEY = "rooms";
const FLOATERS_KEY = "floaters";
const HEATMAPS_KEY = "heatmaps";
const NAVBAR_KEY = "navbar";
const ACTIONS_KEY = "room_popup_actions";
const LEGACY_ACTIONS_KEY = "room_actions";

const ROOMS_ICON = "mdi:floor-plan";
const FLOATERS_ICON = "mdi:lightbulb-group";
const HEATMAPS_ICON = "mdi:thermometer";
const NAVBAR_ICON = "mdi:dock-left";
const ACTIONS_ICON = "mdi:gesture-tap-button";

const DEFAULT_HEATMAP_RADIUS = 2.8;
const DEFAULT_HEATMAP_WEIGHT = 1;
const DEFAULT_HEATMAP_OPACITY = 0.72;
const DEFAULT_HEATMAP_RESOLUTION = 192;
const DEFAULT_HEATMAP_BLUR = 0.55;

type EditorRecord = Record<string, unknown>;

type Point2Editor = {
  x: number;
  z: number;
};

type Point3Editor = {
  x: number;
  y: number;
  z: number;
};

type RoomEditorEntry = {
  area: string;
  name: string;
  polygon: Point2Editor[];
  extra: EditorRecord;
};

type FloaterAction = "toggle" | "more-info" | "popup";

type FloaterEditorEntry = {
  id: string;
  entity: string;
  label: string;
  icon: string;
  group: string;
  tapAction: FloaterAction;
  holdAction: FloaterAction;
  position: Point3Editor;
  extra: EditorRecord;
};

type HeatmapColorRangeEditorEntry = {
  value: number;
  color: string;
  extra: EditorRecord;
};

type HeatmapSensorEditorEntry = {
  id: string;
  entity: string;
  label: string;
  valueAttribute: string;
  radius: number;
  weight: number;
  position: Point3Editor;
  extra: EditorRecord;
};

type HeatmapEditorConfig = {
  enabled: boolean;
  defaultVisible: boolean;
  minValue: string;
  maxValue: string;
  radius: number;
  weight: number;
  opacity: number;
  resolution: number;
  blur: number;
  sensors: HeatmapSensorEditorEntry[];
  colorRanges: HeatmapColorRangeEditorEntry[];
  extra: EditorRecord;
};

type NavbarPosition = "left" | "right" | "top" | "bottom";
type NavbarAction = "toggle-heatmap" | "set-floater-group";

type NavbarItemEditorEntry = {
  id: string;
  label: string;
  icon: string;
  action: NavbarAction;
  floaterGroup: string;
  extra: EditorRecord;
};

type NavbarEditorConfig = {
  enabled: boolean;
  position: NavbarPosition;
  transparent: boolean;
  opacity: number;
  blur: number;
  backgroundColor: string;
  borderColor: string;
  textColor: string;
  iconColor: string;
  offsetX: number;
  offsetY: number;
  items: NavbarItemEditorEntry[];
  extra: EditorRecord;
};

type PopupActionEditorEntry = {
  id: string;
  label: string;
  service: string;
  closeOnRun: boolean;
  serviceDataJson: string;
  targetJson: string;
  extra: EditorRecord;
};

class Lovelace3DEditor extends LitElement {
  public hass: HassLike | null = null;

  private _config: LovelaceConfig = {};
  private _rooms: RoomEditorEntry[] = [];
  private _floaters: FloaterEditorEntry[] = [];
  private _heatmap: HeatmapEditorConfig = this._createDefaultHeatmapEditorConfig();
  private _navbar: NavbarEditorConfig = this._createDefaultNavbarEditorConfig();
  private _actions: PopupActionEditorEntry[] = [];
  private _actionsError = "";
  private _heatmapsConfigured = false;
  private _navbarConfigured = false;
  private _panelExpanded: Record<string, boolean> = {};

  static properties = {
    hass: { attribute: false },
    _config: { state: true },
    _rooms: { state: true },
    _floaters: { state: true },
    _heatmap: { state: true },
    _navbar: { state: true },
    _actions: { state: true },
    _actionsError: { state: true },
    _heatmapsConfigured: { state: true },
    _navbarConfigured: { state: true },
    _panelExpanded: { state: true },
  };

  static styles = css`
    :host {
      display: block;
    }

    .editor-shell {
      display: grid;
      gap: 12px;
      padding: 12px 0 6px;
    }

    .section-panel,
    .item-panel {
      border: 1px solid color-mix(in srgb, var(--divider-color, #40444f) 72%, transparent);
      border-radius: 12px;
      background: color-mix(in srgb, var(--card-background-color, #1d2028) 94%, transparent);
      overflow: hidden;
    }

    .section-panel ha-expansion-panel,
    .item-panel ha-expansion-panel {
      background: transparent;
      --ha-card-background: transparent;
      --expansion-panel-border-width: 0px;
      --expansion-panel-content-padding: 0px;
      --expansion-panel-summary-padding: 0 12px;
    }

    .section-title,
    .item-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin: 0;
      min-height: 54px;
      color: var(--primary-text-color);
    }

    .section-title-label {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 16px;
      font-weight: 640;
    }

    .section-title-label ha-icon {
      color: var(--primary-text-color);
    }

    .item-header {
      font-size: 13px;
      font-weight: 600;
    }

    .item-header ha-icon {
      color: var(--primary-text-color);
    }

    .section-content {
      padding: 0 12px 12px;
      display: grid;
      gap: 10px;
    }

    .item-content {
      padding: 0 10px 10px;
      display: grid;
      gap: 10px;
    }

    .section-help {
      color: var(--secondary-text-color);
      font-size: 12px;
      line-height: 1.4;
    }

    .list {
      display: grid;
      gap: 8px;
    }

    .item-title {
      margin: 0;
      color: var(--secondary-text-color);
      font-size: 11px;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      font-weight: 700;
    }

    .sub-block {
      display: grid;
      gap: 8px;
    }

    .inline-row {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 8px;
      align-items: end;
    }

    .add-button,
    .remove-button {
      border: 1px solid color-mix(in srgb, var(--divider-color, #40444f) 74%, transparent);
      border-radius: 8px;
      height: 30px;
      padding: 0 10px;
      cursor: pointer;
      background: color-mix(in srgb, var(--secondary-background-color, #212530) 72%, transparent);
      color: var(--primary-text-color);
      font-size: 12px;
      font-weight: 600;
    }

    .add-button {
      justify-self: start;
    }

    .remove-button {
      color: var(--secondary-text-color);
      justify-self: end;
    }

    .remove-button:hover,
    .add-button:hover {
      border-color: color-mix(in srgb, var(--primary-color, #3a8dff) 60%, var(--divider-color, #40444f));
      color: var(--primary-text-color);
    }

    .error {
      color: var(--error-color, #db4437);
      font-size: 12px;
      font-weight: 600;
      border: 1px solid color-mix(in srgb, var(--error-color, #db4437) 50%, transparent);
      border-radius: 8px;
      padding: 8px 10px;
      background: color-mix(in srgb, var(--error-color, #db4437) 12%, transparent);
    }

    ha-textfield {
      width: 100%;
    }

    code {
      background: color-mix(in srgb, var(--primary-color, #3a8dff) 18%, transparent);
      border-radius: 5px;
      padding: 1px 4px;
    }
  `;

  public setConfig(config: LovelaceConfig) {
    this._config = { ...(config ?? {}) };
    this._rooms = this._parseRooms(this._config[ROOMS_KEY]);
    this._floaters = this._parseFloaters(this._config[FLOATERS_KEY]);
    this._heatmap = this._parseHeatmap(this._config[HEATMAPS_KEY]);
    this._navbar = this._parseNavbar(this._config[NAVBAR_KEY]);
    this._actions = this._parseActions(this._config[ACTIONS_KEY] ?? this._config[LEGACY_ACTIONS_KEY]);
    this._actionsError = "";
    this._heatmapsConfigured = this._config[HEATMAPS_KEY] !== undefined;
    this._navbarConfigured = this._config[NAVBAR_KEY] !== undefined;
  }

  protected render() {
    if (!this.hass) return nothing;

    return html`
      <div class="editor-shell">
        ${this._renderCardSection()} ${this._renderRoomsSection()} ${this._renderFloatersSection()}
        ${this._renderHeatmapSection()} ${this._renderNavbarSection()} ${this._renderActionsSection()}
      </div>
    `;
  }

  private _renderCardSection() {
    return html`
      <section class="section-panel">
        <ha-expansion-panel
          outlined
          ?expanded=${this._isPanelExpanded("card", true)}
          @expanded-changed=${(ev: Event) => {
            this._panelExpandedChanged("card", ev);
          }}
        >
          ${this._renderSectionHeader("mdi:cube-outline", "Card Settings")}
          <div class="section-content">
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
          </div>
        </ha-expansion-panel>
      </section>
    `;
  }

  private _renderRoomsSection() {
    return html`
      <section class="section-panel">
        <ha-expansion-panel
          outlined
          ?expanded=${this._isPanelExpanded("rooms", true)}
          @expanded-changed=${(ev: Event) => {
            this._panelExpandedChanged("rooms", ev);
          }}
        >
          ${this._renderSectionHeader(ROOMS_ICON, "Rooms")}
          <div class="section-content">
            <div class="section-help">
              Add rooms and polygon points. Each room needs an <code>area</code> and polygon.
            </div>
            <div class="list">
              ${this._rooms.map((room, roomIndex) =>
                html`
                  <section class="item-panel">
                    <ha-expansion-panel
                      outlined
                      ?expanded=${this._isPanelExpanded(`rooms-item-${roomIndex}`, roomIndex === 0)}
                      @expanded-changed=${(ev: Event) => {
                        this._panelExpandedChanged(`rooms-item-${roomIndex}`, ev);
                      }}
                    >
                      <h5 slot="header" class="item-header">
                        <span class="section-title-label">
                          <ha-icon .icon=${"mdi:vector-polygon"}></ha-icon>
                          Room ${roomIndex + 1}
                        </span>
                        <button
                          class="remove-button"
                          type="button"
                          @click=${(ev: Event) => {
                            this._handleHeaderButtonClick(ev, () => this._removeRoom(roomIndex));
                          }}
                        >
                          Remove
                        </button>
                      </h5>
                      <div class="item-content">
                        <ha-form
                          .hass=${this.hass}
                          .data=${{ area: room.area, name: room.name }}
                          .schema=${[
                            { name: "area", selector: { text: {} } },
                            { name: "name", selector: { text: {} } },
                          ]}
                          .computeLabel=${this._computeLabel}
                          @value-changed=${(ev: CustomEvent) => {
                            this._roomChanged(roomIndex, ev);
                          }}
                        ></ha-form>

                        <div class="sub-block">
                          <div class="item-title">Polygon Points</div>
                          ${room.polygon.map((point, pointIndex) =>
                            html`
                              <div class="inline-row">
                                <ha-form
                                  .hass=${this.hass}
                                  .data=${{ x: point.x, z: point.z }}
                                  .schema=${[
                                    { name: "x", selector: { number: { step: 0.1 } } },
                                    { name: "z", selector: { number: { step: 0.1 } } },
                                  ]}
                                  .computeLabel=${this._computeLabel}
                                  @value-changed=${(ev: CustomEvent) => {
                                    this._roomPointChanged(roomIndex, pointIndex, ev);
                                  }}
                                ></ha-form>
                                <button
                                  class="remove-button"
                                  type="button"
                                  @click=${() => {
                                    this._removeRoomPoint(roomIndex, pointIndex);
                                  }}
                                >
                                  Remove
                                </button>
                              </div>
                            `
                          )}
                          <button
                            class="add-button"
                            type="button"
                            @click=${() => {
                              this._addRoomPoint(roomIndex);
                            }}
                          >
                            + Add point
                          </button>
                        </div>
                      </div>
                    </ha-expansion-panel>
                  </section>
                `
              )}
              <button class="add-button" type="button" @click=${this._addRoom}>+ Add room</button>
            </div>
          </div>
        </ha-expansion-panel>
      </section>
    `;
  }

  private _renderFloatersSection() {
    return html`
      <section class="section-panel">
        <ha-expansion-panel
          outlined
          ?expanded=${this._isPanelExpanded("floaters", true)}
          @expanded-changed=${(ev: Event) => {
            this._panelExpandedChanged("floaters", ev);
          }}
        >
          ${this._renderSectionHeader(FLOATERS_ICON, "Floaters")}
          <div class="section-content">
            <div class="section-help">
              Create floaters with entity, position and actions. Use <code>group</code> to control navbar filtering.
            </div>
            <div class="list">
              ${this._floaters.map((floater, floaterIndex) =>
                html`
                  <section class="item-panel">
                    <ha-expansion-panel
                      outlined
                      ?expanded=${this._isPanelExpanded(`floaters-item-${floaterIndex}`, floaterIndex === 0)}
                      @expanded-changed=${(ev: Event) => {
                        this._panelExpandedChanged(`floaters-item-${floaterIndex}`, ev);
                      }}
                    >
                      <h5 slot="header" class="item-header">
                        <span class="section-title-label">
                          <ha-icon .icon=${"mdi:circle-medium"}></ha-icon>
                          Floater ${floaterIndex + 1}
                        </span>
                        <button
                          class="remove-button"
                          type="button"
                          @click=${(ev: Event) => {
                            this._handleHeaderButtonClick(ev, () => this._removeFloater(floaterIndex));
                          }}
                        >
                          Remove
                        </button>
                      </h5>

                      <div class="item-content">
                        <ha-form
                          .hass=${this.hass}
                          .data=${{
                            id: floater.id,
                            entity: floater.entity,
                            label: floater.label,
                            icon: floater.icon,
                            group: floater.group,
                            tap_action: floater.tapAction,
                            hold_action: floater.holdAction,
                          }}
                          .schema=${[
                            { name: "id", selector: { text: {} } },
                            { name: "entity", selector: { entity: {} } },
                            { name: "label", selector: { text: {} } },
                            { name: "icon", selector: { text: {} } },
                            { name: "group", selector: { text: {} } },
                            {
                              name: "tap_action",
                              selector: {
                                select: {
                                  mode: "dropdown",
                                  options: [
                                    { label: "Toggle", value: "toggle" },
                                    { label: "More info", value: "more-info" },
                                    { label: "Popup", value: "popup" },
                                  ],
                                },
                              },
                            },
                            {
                              name: "hold_action",
                              selector: {
                                select: {
                                  mode: "dropdown",
                                  options: [
                                    { label: "Popup", value: "popup" },
                                    { label: "More info", value: "more-info" },
                                    { label: "Toggle", value: "toggle" },
                                  ],
                                },
                              },
                            },
                          ]}
                          .computeLabel=${this._computeLabel}
                          @value-changed=${(ev: CustomEvent) => {
                            this._floaterChanged(floaterIndex, ev);
                          }}
                        ></ha-form>

                        <div class="sub-block">
                          <div class="item-title">Position [x, y, z]</div>
                          <ha-form
                            .hass=${this.hass}
                            .data=${{
                              x: floater.position.x,
                              y: floater.position.y,
                              z: floater.position.z,
                            }}
                            .schema=${[
                              { name: "x", selector: { number: { step: 0.1 } } },
                              { name: "y", selector: { number: { step: 0.1 } } },
                              { name: "z", selector: { number: { step: 0.1 } } },
                            ]}
                            .computeLabel=${this._computeLabel}
                            @value-changed=${(ev: CustomEvent) => {
                              this._floaterPositionChanged(floaterIndex, ev);
                            }}
                          ></ha-form>
                        </div>
                      </div>
                    </ha-expansion-panel>
                  </section>
                `
              )}
              <button class="add-button" type="button" @click=${this._addFloater}>+ Add floater</button>
            </div>
          </div>
        </ha-expansion-panel>
      </section>
    `;
  }

  private _renderHeatmapSection() {
    return html`
      <section class="section-panel">
        <ha-expansion-panel
          outlined
          ?expanded=${this._isPanelExpanded("heatmaps", true)}
          @expanded-changed=${(ev: Event) => {
            this._panelExpandedChanged("heatmaps", ev);
          }}
        >
          ${this._renderSectionHeader(HEATMAPS_ICON, "Heatmaps")}
          <div class="section-content">
            <div class="section-help">
              Configure global heatmap values, color ranges and sensors. Sensors ignore height for interpolation.
            </div>

            <ha-form
              .hass=${this.hass}
              .data=${{
                enabled: this._heatmap.enabled,
                default_visible: this._heatmap.defaultVisible,
                min_value: this._heatmap.minValue,
                max_value: this._heatmap.maxValue,
                radius: this._heatmap.radius,
                weight: this._heatmap.weight,
                opacity: this._heatmap.opacity,
                resolution: this._heatmap.resolution,
                blur: this._heatmap.blur,
              }}
              .schema=${[
                { name: "enabled", selector: { boolean: {} } },
                { name: "default_visible", selector: { boolean: {} } },
                { name: "min_value", selector: { text: {} } },
                { name: "max_value", selector: { text: {} } },
                { name: "radius", selector: { number: { min: 0.25, max: 30, step: 0.1 } } },
                { name: "weight", selector: { number: { min: 0.05, max: 10, step: 0.05 } } },
                { name: "opacity", selector: { number: { min: 0.05, max: 1, step: 0.01 } } },
                { name: "resolution", selector: { number: { min: 96, max: 384, step: 1 } } },
                { name: "blur", selector: { number: { min: 0, max: 1, step: 0.01 } } },
              ]}
              .computeLabel=${this._computeLabel}
              @value-changed=${this._heatmapConfigChanged}
            ></ha-form>

            <section class="item-panel">
              <ha-expansion-panel
                outlined
                ?expanded=${this._isPanelExpanded("heatmaps-color-ranges", true)}
                @expanded-changed=${(ev: Event) => {
                  this._panelExpandedChanged("heatmaps-color-ranges", ev);
                }}
              >
                <h5 slot="header" class="item-header">
                  <span class="section-title-label">
                    <ha-icon .icon=${"mdi:gradient-horizontal"}></ha-icon>
                    Color Ranges
                  </span>
                </h5>
                <div class="item-content">
                  <div class="list">
                    ${this._heatmap.colorRanges.map((range, rangeIndex) =>
                      html`
                        <section class="item-panel">
                          <ha-expansion-panel
                            outlined
                            ?expanded=${this._isPanelExpanded(`heatmaps-color-item-${rangeIndex}`, rangeIndex === 0)}
                            @expanded-changed=${(ev: Event) => {
                              this._panelExpandedChanged(`heatmaps-color-item-${rangeIndex}`, ev);
                            }}
                          >
                            <h5 slot="header" class="item-header">
                              <span class="section-title-label">
                                <ha-icon .icon=${"mdi:palette-outline"}></ha-icon>
                                Range ${rangeIndex + 1}
                              </span>
                              <button
                                class="remove-button"
                                type="button"
                                @click=${(ev: Event) => {
                                  this._handleHeaderButtonClick(ev, () => this._removeHeatmapColorRange(rangeIndex));
                                }}
                              >
                                Remove
                              </button>
                            </h5>
                            <div class="item-content">
                              <ha-form
                                .hass=${this.hass}
                                .data=${{ value: range.value, color: range.color }}
                                .schema=${[
                                  { name: "value", selector: { number: { step: 0.1 } } },
                                  { name: "color", selector: { text: {} } },
                                ]}
                                .computeLabel=${this._computeLabel}
                                @value-changed=${(ev: CustomEvent) => {
                                  this._heatmapColorRangeChanged(rangeIndex, ev);
                                }}
                              ></ha-form>
                            </div>
                          </ha-expansion-panel>
                        </section>
                      `
                    )}
                  </div>
                  <button class="add-button" type="button" @click=${this._addHeatmapColorRange}>+ Add color range</button>
                </div>
              </ha-expansion-panel>
            </section>

            <section class="item-panel">
              <ha-expansion-panel
                outlined
                ?expanded=${this._isPanelExpanded("heatmaps-sensors", true)}
                @expanded-changed=${(ev: Event) => {
                  this._panelExpandedChanged("heatmaps-sensors", ev);
                }}
              >
                <h5 slot="header" class="item-header">
                  <span class="section-title-label">
                    <ha-icon .icon=${"mdi:access-point"}></ha-icon>
                    Sensors
                  </span>
                </h5>
                <div class="item-content">
                  <div class="list">
                    ${this._heatmap.sensors.map((sensor, sensorIndex) =>
                      html`
                        <section class="item-panel">
                          <ha-expansion-panel
                            outlined
                            ?expanded=${this._isPanelExpanded(`heatmaps-sensor-item-${sensorIndex}`, sensorIndex === 0)}
                            @expanded-changed=${(ev: Event) => {
                              this._panelExpandedChanged(`heatmaps-sensor-item-${sensorIndex}`, ev);
                            }}
                          >
                            <h5 slot="header" class="item-header">
                              <span class="section-title-label">
                                <ha-icon .icon=${"mdi:thermometer-lines"}></ha-icon>
                                Sensor ${sensorIndex + 1}
                              </span>
                              <button
                                class="remove-button"
                                type="button"
                                @click=${(ev: Event) => {
                                  this._handleHeaderButtonClick(ev, () => this._removeHeatmapSensor(sensorIndex));
                                }}
                              >
                                Remove
                              </button>
                            </h5>

                            <div class="item-content">
                              <ha-form
                                .hass=${this.hass}
                                .data=${{
                                  id: sensor.id,
                                  entity: sensor.entity,
                                  label: sensor.label,
                                  value_attribute: sensor.valueAttribute,
                                  radius: sensor.radius,
                                  weight: sensor.weight,
                                }}
                                .schema=${[
                                  { name: "id", selector: { text: {} } },
                                  { name: "entity", selector: { entity: {} } },
                                  { name: "label", selector: { text: {} } },
                                  { name: "value_attribute", selector: { text: {} } },
                                  { name: "radius", selector: { number: { min: 0.25, max: 30, step: 0.1 } } },
                                  { name: "weight", selector: { number: { min: 0.05, max: 10, step: 0.05 } } },
                                ]}
                                .computeLabel=${this._computeLabel}
                                @value-changed=${(ev: CustomEvent) => {
                                  this._heatmapSensorChanged(sensorIndex, ev);
                                }}
                              ></ha-form>

                              <div class="sub-block">
                                <div class="item-title">Position [x, y, z]</div>
                                <ha-form
                                  .hass=${this.hass}
                                  .data=${{
                                    x: sensor.position.x,
                                    y: sensor.position.y,
                                    z: sensor.position.z,
                                  }}
                                  .schema=${[
                                    { name: "x", selector: { number: { step: 0.1 } } },
                                    { name: "y", selector: { number: { step: 0.1 } } },
                                    { name: "z", selector: { number: { step: 0.1 } } },
                                  ]}
                                  .computeLabel=${this._computeLabel}
                                  @value-changed=${(ev: CustomEvent) => {
                                    this._heatmapSensorPositionChanged(sensorIndex, ev);
                                  }}
                                ></ha-form>
                              </div>
                            </div>
                          </ha-expansion-panel>
                        </section>
                      `
                    )}
                  </div>
                  <button class="add-button" type="button" @click=${this._addHeatmapSensor}>+ Add sensor</button>
                </div>
              </ha-expansion-panel>
            </section>
          </div>
        </ha-expansion-panel>
      </section>
    `;
  }

  private _renderNavbarSection() {
    return html`
      <section class="section-panel">
        <ha-expansion-panel
          outlined
          ?expanded=${this._isPanelExpanded("navbar", true)}
          @expanded-changed=${(ev: Event) => {
            this._panelExpandedChanged("navbar", ev);
          }}
        >
          ${this._renderSectionHeader(NAVBAR_ICON, "Navbar")}
          <div class="section-content">
            <div class="section-help">Configure navbar placement, look, and grouped actions.</div>

            <ha-form
              .hass=${this.hass}
              .data=${{
                enabled: this._navbar.enabled,
                position: this._navbar.position,
                transparent: this._navbar.transparent,
                opacity: this._navbar.opacity,
                blur: this._navbar.blur,
                background_color: this._navbar.backgroundColor,
                border_color: this._navbar.borderColor,
                text_color: this._navbar.textColor,
                icon_color: this._navbar.iconColor,
                offset_x: this._navbar.offsetX,
                offset_y: this._navbar.offsetY,
              }}
              .schema=${[
                { name: "enabled", selector: { boolean: {} } },
                {
                  name: "position",
                  selector: {
                    select: {
                      mode: "dropdown",
                      options: [
                        { label: "Left", value: "left" },
                        { label: "Right", value: "right" },
                        { label: "Top", value: "top" },
                        { label: "Bottom", value: "bottom" },
                      ],
                    },
                  },
                },
                { name: "transparent", selector: { boolean: {} } },
                { name: "opacity", selector: { number: { min: 0.05, max: 1, step: 0.01 } } },
                { name: "blur", selector: { number: { min: 0, max: 28, step: 1 } } },
                { name: "background_color", selector: { text: {} } },
                { name: "border_color", selector: { text: {} } },
                { name: "text_color", selector: { text: {} } },
                { name: "icon_color", selector: { text: {} } },
                { name: "offset_x", selector: { number: { min: 0, max: 128, step: 1 } } },
                { name: "offset_y", selector: { number: { min: 0, max: 128, step: 1 } } },
              ]}
              .computeLabel=${this._computeLabel}
              @value-changed=${this._navbarConfigChanged}
            ></ha-form>

            <section class="item-panel">
              <ha-expansion-panel
                outlined
                ?expanded=${this._isPanelExpanded("navbar-items", true)}
                @expanded-changed=${(ev: Event) => {
                  this._panelExpandedChanged("navbar-items", ev);
                }}
              >
                <h5 slot="header" class="item-header">
                  <span class="section-title-label">
                    <ha-icon .icon=${"mdi:view-list"}></ha-icon>
                    Navbar Items
                  </span>
                </h5>
                <div class="item-content">
                  <div class="list">
                    ${this._navbar.items.map((item, itemIndex) =>
                      html`
                        <section class="item-panel">
                          <ha-expansion-panel
                            outlined
                            ?expanded=${this._isPanelExpanded(`navbar-item-${itemIndex}`, itemIndex === 0)}
                            @expanded-changed=${(ev: Event) => {
                              this._panelExpandedChanged(`navbar-item-${itemIndex}`, ev);
                            }}
                          >
                            <h5 slot="header" class="item-header">
                              <span class="section-title-label">
                                <ha-icon .icon=${"mdi:format-list-bulleted-square"}></ha-icon>
                                Item ${itemIndex + 1}
                              </span>
                              <button
                                class="remove-button"
                                type="button"
                                @click=${(ev: Event) => {
                                  this._handleHeaderButtonClick(ev, () => this._removeNavbarItem(itemIndex));
                                }}
                              >
                                Remove
                              </button>
                            </h5>
                            <div class="item-content">
                              <ha-form
                                .hass=${this.hass}
                                .data=${{
                                  id: item.id,
                                  label: item.label,
                                  icon: item.icon,
                                  action: item.action,
                                  floater_group: item.floaterGroup,
                                }}
                                .schema=${[
                                  { name: "id", selector: { text: {} } },
                                  { name: "label", selector: { text: {} } },
                                  { name: "icon", selector: { text: {} } },
                                  {
                                    name: "action",
                                    selector: {
                                      select: {
                                        mode: "dropdown",
                                        options: [
                                          { label: "Toggle heatmap", value: "toggle-heatmap" },
                                          { label: "Set floater group", value: "set-floater-group" },
                                        ],
                                      },
                                    },
                                  },
                                  { name: "floater_group", selector: { text: {} } },
                                ]}
                                .computeLabel=${this._computeLabel}
                                @value-changed=${(ev: CustomEvent) => {
                                  this._navbarItemChanged(itemIndex, ev);
                                }}
                              ></ha-form>
                            </div>
                          </ha-expansion-panel>
                        </section>
                      `
                    )}
                  </div>
                  <button class="add-button" type="button" @click=${this._addNavbarItem}>+ Add navbar item</button>
                </div>
              </ha-expansion-panel>
            </section>
          </div>
        </ha-expansion-panel>
      </section>
    `;
  }

  private _renderActionsSection() {
    return html`
      <section class="section-panel">
        <ha-expansion-panel
          outlined
          ?expanded=${this._isPanelExpanded("actions", true)}
          @expanded-changed=${(ev: Event) => {
            this._panelExpandedChanged("actions", ev);
          }}
        >
          ${this._renderSectionHeader(ACTIONS_ICON, "Default Popup Actions")}
          <div class="section-content">
            <div class="section-help">
              Used when a room does not define local <code>room_popup_actions</code>.
            </div>
            <div class="list">
              ${this._actions.map((action, actionIndex) =>
                html`
                  <section class="item-panel">
                    <ha-expansion-panel
                      outlined
                      ?expanded=${this._isPanelExpanded(`actions-item-${actionIndex}`, actionIndex === 0)}
                      @expanded-changed=${(ev: Event) => {
                        this._panelExpandedChanged(`actions-item-${actionIndex}`, ev);
                      }}
                    >
                      <h5 slot="header" class="item-header">
                        <span class="section-title-label">
                          <ha-icon .icon=${"mdi:gesture-tap-button"}></ha-icon>
                          Action ${actionIndex + 1}
                        </span>
                        <button
                          class="remove-button"
                          type="button"
                          @click=${(ev: Event) => {
                            this._handleHeaderButtonClick(ev, () => this._removeAction(actionIndex));
                          }}
                        >
                          Remove
                        </button>
                      </h5>
                      <div class="item-content">
                        <ha-form
                          .hass=${this.hass}
                          .data=${{
                            id: action.id,
                            label: action.label,
                            service: action.service,
                            close_on_run: action.closeOnRun,
                          }}
                          .schema=${[
                            { name: "id", selector: { text: {} } },
                            { name: "label", selector: { text: {} } },
                            { name: "service", selector: { text: {} } },
                            { name: "close_on_run", selector: { boolean: {} } },
                          ]}
                          .computeLabel=${this._computeLabel}
                          @value-changed=${(ev: CustomEvent) => {
                            this._actionChanged(actionIndex, ev);
                          }}
                        ></ha-form>

                        <ha-textfield
                          .label=${"service_data (JSON object)"}
                          .value=${action.serviceDataJson}
                          @input=${(ev: Event) => {
                            this._actionServiceDataChanged(actionIndex, this._inputValue(ev));
                          }}
                        ></ha-textfield>

                        <ha-textfield
                          .label=${"target (JSON object)"}
                          .value=${action.targetJson}
                          @input=${(ev: Event) => {
                            this._actionTargetChanged(actionIndex, this._inputValue(ev));
                          }}
                        ></ha-textfield>
                      </div>
                    </ha-expansion-panel>
                  </section>
                `
              )}

              <button class="add-button" type="button" @click=${this._addAction}>+ Add action</button>
              ${this._actionsError ? html`<div class="error">${this._actionsError}</div>` : nothing}
            </div>
          </div>
        </ha-expansion-panel>
      </section>
    `;
  }

  private _renderSectionHeader(icon: string, title: string) {
    return html`
      <h4 slot="header" class="section-title">
        <span class="section-title-label">
          <ha-icon .icon=${icon}></ha-icon>
          ${title}
        </span>
      </h4>
    `;
  }

  private _handleHeaderButtonClick(event: Event, action: () => void) {
    event.preventDefault();
    event.stopPropagation();
    action();
  }

  private _isPanelExpanded(panelId: string, _fallback: boolean): boolean {
    const value = this._panelExpanded[panelId];
    if (typeof value === "boolean") return value;
    return false;
  }

  private _panelExpandedChanged(panelId: string, event: Event) {
    if (event.target !== event.currentTarget) return;

    const custom = event as CustomEvent<{ expanded?: boolean; value?: boolean }>;
    const detail = custom.detail;
    const target = event.currentTarget as { expanded?: boolean } | null;

    const expanded =
      typeof detail?.expanded === "boolean"
        ? detail.expanded
        : typeof detail?.value === "boolean"
          ? detail.value
          : typeof target?.expanded === "boolean"
            ? target.expanded
            : false;

    this._panelExpanded = {
      ...this._panelExpanded,
      [panelId]: expanded,
    };
  }

  private _computeLabel = (schema: { name?: string }) => {
    switch (schema.name) {
      case "entity":
        return "Entity";
      case "area":
        return "Area ID";
      case "name":
        return "Name";
      case "id":
        return "ID";
      case "label":
        return "Label";
      case "icon":
        return "Icon";
      case "group":
        return "Floater Group";
      case "tap_action":
        return "Tap Action";
      case "hold_action":
        return "Hold Action";
      case "value_attribute":
        return "Value Attribute";
      case "value":
        return "Value";
      case "color":
        return "Color";
      case "enabled":
        return "Enabled";
      case "default_visible":
        return "Visible By Default";
      case "min_value":
        return "Min Value";
      case "max_value":
        return "Max Value";
      case "radius":
        return "Radius";
      case "weight":
        return "Weight";
      case "opacity":
        return "Opacity";
      case "resolution":
        return "Resolution";
      case "blur":
        return "Blur";
      case "position":
        return "Position";
      case "transparent":
        return "Transparent";
      case "background_color":
        return "Background Color";
      case "border_color":
        return "Border Color";
      case "text_color":
        return "Text Color";
      case "icon_color":
        return "Icon Color";
      case "offset_x":
        return "Offset X";
      case "offset_y":
        return "Offset Y";
      case "action":
        return "Action";
      case "floater_group":
        return "Floater Group";
      case "service":
        return "Service";
      case "close_on_run":
        return "Close On Run";
      case "x":
        return "X";
      case "y":
        return "Y";
      case "z":
        return "Z";
      default:
        return schema.name ?? "";
    }
  };

  private _entityChanged = (ev: CustomEvent) => {
    const nextEntity = String(ev.detail?.value?.entity ?? "").trim();
    const nextConfig = { ...this._config };
    if (nextEntity) {
      nextConfig.entity = nextEntity;
    } else {
      delete nextConfig.entity;
    }

    this._config = nextConfig;
    this._emitConfigFromEditor();
  };

  private _addRoom = () => {
    this._rooms = [
      ...this._rooms,
      {
        area: "",
        name: "",
        polygon: this._createDefaultRoomPolygon(),
        extra: {},
      },
    ];
    this._emitConfigFromEditor();
  };

  private _removeRoom(index: number) {
    this._rooms = this._rooms.filter((_, itemIndex) => itemIndex !== index);
    this._emitConfigFromEditor();
  }

  private _roomChanged(index: number, ev: CustomEvent) {
    const value = this._asRecord(ev.detail?.value) ?? {};
    const room = this._rooms[index];
    if (!room) return;

    const nextRooms = [...this._rooms];
    nextRooms[index] = {
      ...room,
      area: this._nextTextValue(value, "area", room.area),
      name: this._nextTextValue(value, "name", room.name),
    };

    this._rooms = nextRooms;
    this._emitConfigFromEditor();
  }

  private _addRoomPoint(roomIndex: number) {
    const room = this._rooms[roomIndex];
    if (!room) return;

    const points = [...room.polygon];
    const last = points[points.length - 1] ?? { x: 0, z: 0 };
    points.push({ x: last.x + 1, z: last.z });

    const nextRooms = [...this._rooms];
    nextRooms[roomIndex] = { ...room, polygon: points };
    this._rooms = nextRooms;
    this._emitConfigFromEditor();
  }

  private _removeRoomPoint(roomIndex: number, pointIndex: number) {
    const room = this._rooms[roomIndex];
    if (!room) return;

    const points = room.polygon.filter((_, index) => index !== pointIndex);
    const nextRooms = [...this._rooms];
    nextRooms[roomIndex] = {
      ...room,
      polygon: points.length > 0 ? points : this._createDefaultRoomPolygon(),
    };

    this._rooms = nextRooms;
    this._emitConfigFromEditor();
  }

  private _roomPointChanged(roomIndex: number, pointIndex: number, ev: CustomEvent) {
    const value = this._asRecord(ev.detail?.value) ?? {};
    const room = this._rooms[roomIndex];
    const point = room?.polygon[pointIndex];
    if (!room || !point) return;

    const points = [...room.polygon];
    points[pointIndex] = {
      x: this._toFinite(value.x, point.x),
      z: this._toFinite(value.z, point.z),
    };

    const nextRooms = [...this._rooms];
    nextRooms[roomIndex] = { ...room, polygon: points };
    this._rooms = nextRooms;
    this._emitConfigFromEditor();
  }

  private _addFloater = () => {
    const nextIndex = this._floaters.length + 1;
    this._floaters = [
      ...this._floaters,
      {
        id: `floater_${nextIndex}`,
        entity: "",
        label: "",
        icon: "mdi:lightbulb",
        group: "light",
        tapAction: "toggle",
        holdAction: "popup",
        position: { x: 0, y: 0, z: 0 },
        extra: {},
      },
    ];
    this._emitConfigFromEditor();
  };

  private _removeFloater(index: number) {
    this._floaters = this._floaters.filter((_, itemIndex) => itemIndex !== index);
    this._emitConfigFromEditor();
  }

  private _floaterChanged(index: number, ev: CustomEvent) {
    const value = this._asRecord(ev.detail?.value) ?? {};
    const floater = this._floaters[index];
    if (!floater) return;

    const tapAction = this._normalizeFloaterAction(value.tap_action, floater.tapAction);
    const holdAction = this._normalizeFloaterAction(value.hold_action, floater.holdAction);

    const nextFloaters = [...this._floaters];
    nextFloaters[index] = {
      ...floater,
      id: this._nextTextValue(value, "id", floater.id),
      entity: this._nextTextValue(value, "entity", floater.entity),
      label: this._nextTextValue(value, "label", floater.label),
      icon: this._nextTextValue(value, "icon", floater.icon),
      group: this._nextTextValue(value, "group", floater.group).toLowerCase(),
      tapAction,
      holdAction,
    };

    this._floaters = nextFloaters;
    this._emitConfigFromEditor();
  }

  private _floaterPositionChanged(index: number, ev: CustomEvent) {
    const value = this._asRecord(ev.detail?.value) ?? {};
    const floater = this._floaters[index];
    if (!floater) return;

    const nextFloaters = [...this._floaters];
    nextFloaters[index] = {
      ...floater,
      position: {
        x: this._toFinite(value.x, floater.position.x),
        y: this._toFinite(value.y, floater.position.y),
        z: this._toFinite(value.z, floater.position.z),
      },
    };

    this._floaters = nextFloaters;
    this._emitConfigFromEditor();
  }

  private _heatmapConfigChanged = (ev: CustomEvent) => {
    const value = this._asRecord(ev.detail?.value) ?? {};
    this._heatmapsConfigured = true;
    this._heatmap = {
      ...this._heatmap,
      enabled: this._hasValueKey(value, "enabled") ? value.enabled !== false : this._heatmap.enabled,
      defaultVisible: this._hasValueKey(value, "default_visible")
        ? value.default_visible !== false
        : this._heatmap.defaultVisible,
      minValue: this._nextTextValue(value, "min_value", this._heatmap.minValue),
      maxValue: this._nextTextValue(value, "max_value", this._heatmap.maxValue),
      radius: this._clamp(this._toFinite(value.radius, this._heatmap.radius), 0.25, 30),
      weight: this._clamp(this._toFinite(value.weight, this._heatmap.weight), 0.05, 10),
      opacity: this._clamp(this._toFinite(value.opacity, this._heatmap.opacity), 0.05, 1),
      resolution: Math.round(this._clamp(this._toFinite(value.resolution, this._heatmap.resolution), 96, 384)),
      blur: this._clamp(this._toFinite(value.blur, this._heatmap.blur), 0, 1),
    };
    this._emitConfigFromEditor();
  };

  private _addHeatmapColorRange = () => {
    this._heatmapsConfigured = true;
    this._heatmap = {
      ...this._heatmap,
      colorRanges: [...this._heatmap.colorRanges, { value: 22, color: "#49db78", extra: {} }],
    };
    this._emitConfigFromEditor();
  };

  private _removeHeatmapColorRange(index: number) {
    this._heatmapsConfigured = true;
    this._heatmap = {
      ...this._heatmap,
      colorRanges: this._heatmap.colorRanges.filter((_, itemIndex) => itemIndex !== index),
    };
    this._emitConfigFromEditor();
  }

  private _heatmapColorRangeChanged(index: number, ev: CustomEvent) {
    const value = this._asRecord(ev.detail?.value) ?? {};
    const colorRange = this._heatmap.colorRanges[index];
    if (!colorRange) return;

    const colorRanges = [...this._heatmap.colorRanges];
    colorRanges[index] = {
      ...colorRange,
      value: this._toFinite(value.value, colorRange.value),
      color: this._nextTextValue(value, "color", colorRange.color),
    };

    this._heatmapsConfigured = true;
    this._heatmap = { ...this._heatmap, colorRanges };
    this._emitConfigFromEditor();
  }

  private _addHeatmapSensor = () => {
    const nextIndex = this._heatmap.sensors.length + 1;
    this._heatmapsConfigured = true;
    this._heatmap = {
      ...this._heatmap,
      sensors: [
        ...this._heatmap.sensors,
        {
          id: `heatmap_sensor_${nextIndex}`,
          entity: "",
          label: "",
          valueAttribute: "",
          radius: this._heatmap.radius,
          weight: this._heatmap.weight,
          position: { x: 0, y: 0, z: 0 },
          extra: {},
        },
      ],
    };
    this._emitConfigFromEditor();
  };

  private _removeHeatmapSensor(index: number) {
    this._heatmapsConfigured = true;
    this._heatmap = {
      ...this._heatmap,
      sensors: this._heatmap.sensors.filter((_, itemIndex) => itemIndex !== index),
    };
    this._emitConfigFromEditor();
  }

  private _heatmapSensorChanged(index: number, ev: CustomEvent) {
    const value = this._asRecord(ev.detail?.value) ?? {};
    const sensor = this._heatmap.sensors[index];
    if (!sensor) return;

    const sensors = [...this._heatmap.sensors];
    sensors[index] = {
      ...sensor,
      id: this._nextTextValue(value, "id", sensor.id),
      entity: this._nextTextValue(value, "entity", sensor.entity),
      label: this._nextTextValue(value, "label", sensor.label),
      valueAttribute: this._nextTextValue(value, "value_attribute", sensor.valueAttribute),
      radius: this._clamp(this._toFinite(value.radius, sensor.radius), 0.25, 30),
      weight: this._clamp(this._toFinite(value.weight, sensor.weight), 0.05, 10),
    };

    this._heatmapsConfigured = true;
    this._heatmap = { ...this._heatmap, sensors };
    this._emitConfigFromEditor();
  }

  private _heatmapSensorPositionChanged(index: number, ev: CustomEvent) {
    const value = this._asRecord(ev.detail?.value) ?? {};
    const sensor = this._heatmap.sensors[index];
    if (!sensor) return;

    const sensors = [...this._heatmap.sensors];
    sensors[index] = {
      ...sensor,
      position: {
        x: this._toFinite(value.x, sensor.position.x),
        y: this._toFinite(value.y, sensor.position.y),
        z: this._toFinite(value.z, sensor.position.z),
      },
    };

    this._heatmapsConfigured = true;
    this._heatmap = { ...this._heatmap, sensors };
    this._emitConfigFromEditor();
  }

  private _navbarConfigChanged = (ev: CustomEvent) => {
    const value = this._asRecord(ev.detail?.value) ?? {};

    this._navbarConfigured = true;
    this._navbar = {
      ...this._navbar,
      enabled: this._hasValueKey(value, "enabled") ? value.enabled !== false : this._navbar.enabled,
      position: this._hasValueKey(value, "position")
        ? this._normalizeNavbarPosition(value.position)
        : this._navbar.position,
      transparent: this._hasValueKey(value, "transparent")
        ? value.transparent !== false
        : this._navbar.transparent,
      opacity: this._clamp(this._toFinite(value.opacity, this._navbar.opacity), 0.05, 1),
      blur: this._clamp(this._toFinite(value.blur, this._navbar.blur), 0, 28),
      backgroundColor: this._nextTextValue(value, "background_color", this._navbar.backgroundColor),
      borderColor: this._nextTextValue(value, "border_color", this._navbar.borderColor),
      textColor: this._nextTextValue(value, "text_color", this._navbar.textColor),
      iconColor: this._nextTextValue(value, "icon_color", this._navbar.iconColor),
      offsetX: Math.round(this._clamp(this._toFinite(value.offset_x, this._navbar.offsetX), 0, 128)),
      offsetY: Math.round(this._clamp(this._toFinite(value.offset_y, this._navbar.offsetY), 0, 128)),
    };

    this._emitConfigFromEditor();
  };

  private _addNavbarItem = () => {
    this._navbarConfigured = true;
    const nextIndex = this._navbar.items.length + 1;
    this._navbar = {
      ...this._navbar,
      items: [
        ...this._navbar.items,
        {
          id: `navbar_item_${nextIndex}`,
          label: "",
          icon: "mdi:lightbulb-group",
          action: "set-floater-group",
          floaterGroup: "all",
          extra: {},
        },
      ],
    };

    this._emitConfigFromEditor();
  };

  private _removeNavbarItem(index: number) {
    this._navbarConfigured = true;
    this._navbar = {
      ...this._navbar,
      items: this._navbar.items.filter((_, itemIndex) => itemIndex !== index),
    };

    this._emitConfigFromEditor();
  }

  private _navbarItemChanged(index: number, ev: CustomEvent) {
    const value = this._asRecord(ev.detail?.value) ?? {};
    const item = this._navbar.items[index];
    if (!item) return;

    const action = this._normalizeNavbarAction(value.action, item.action);
    const nextItems = [...this._navbar.items];
    nextItems[index] = {
      ...item,
      id: this._nextTextValue(value, "id", item.id),
      label: this._nextTextValue(value, "label", item.label),
      icon: this._nextTextValue(value, "icon", item.icon),
      action,
      floaterGroup:
        action === "set-floater-group"
          ? this._nextTextValue(value, "floater_group", item.floaterGroup).toLowerCase()
          : "",
    };

    this._navbarConfigured = true;
    this._navbar = { ...this._navbar, items: nextItems };
    this._emitConfigFromEditor();
  }

  private _addAction = () => {
    const nextIndex = this._actions.length + 1;
    this._actions = [
      ...this._actions,
      {
        id: `action_${nextIndex}`,
        label: "",
        service: "",
        closeOnRun: true,
        serviceDataJson: "",
        targetJson: "",
        extra: {},
      },
    ];

    this._emitConfigFromEditor();
  };

  private _removeAction(index: number) {
    this._actions = this._actions.filter((_, itemIndex) => itemIndex !== index);
    this._emitConfigFromEditor();
  }

  private _actionChanged(index: number, ev: CustomEvent) {
    const value = this._asRecord(ev.detail?.value) ?? {};
    const action = this._actions[index];
    if (!action) return;

    const nextActions = [...this._actions];
    nextActions[index] = {
      ...action,
      id: this._nextTextValue(value, "id", action.id),
      label: this._nextTextValue(value, "label", action.label),
      service: this._nextTextValue(value, "service", action.service),
      closeOnRun: this._hasValueKey(value, "close_on_run") ? value.close_on_run !== false : action.closeOnRun,
    };

    this._actions = nextActions;
    this._emitConfigFromEditor();
  }

  private _actionServiceDataChanged(index: number, value: string) {
    const action = this._actions[index];
    if (!action) return;

    const nextActions = [...this._actions];
    nextActions[index] = { ...action, serviceDataJson: value.trim() };
    this._actions = nextActions;
    this._emitConfigFromEditor();
  }

  private _actionTargetChanged(index: number, value: string) {
    const action = this._actions[index];
    if (!action) return;

    const nextActions = [...this._actions];
    nextActions[index] = { ...action, targetJson: value.trim() };
    this._actions = nextActions;
    this._emitConfigFromEditor();
  }

  private _emitConfigFromEditor() {
    const nextConfig: LovelaceConfig = this._createBaseConfig();

    const rooms = this._serializeRooms();
    if (rooms.length > 0) nextConfig[ROOMS_KEY] = rooms;
    else delete nextConfig[ROOMS_KEY];

    const floaters = this._serializeFloaters();
    if (floaters.length > 0) nextConfig[FLOATERS_KEY] = floaters;
    else delete nextConfig[FLOATERS_KEY];

    const heatmaps = this._serializeHeatmap();
    if (heatmaps) nextConfig[HEATMAPS_KEY] = heatmaps;
    else delete nextConfig[HEATMAPS_KEY];

    const navbar = this._serializeNavbar();
    if (navbar) nextConfig[NAVBAR_KEY] = navbar;
    else delete nextConfig[NAVBAR_KEY];

    const actions = this._serializeActions();
    if (!actions) return;
    if (actions.length > 0) nextConfig[ACTIONS_KEY] = actions;
    else delete nextConfig[ACTIONS_KEY];

    delete nextConfig[LEGACY_ACTIONS_KEY];

    this._fireConfigChanged(nextConfig);
  }

  private _serializeRooms(): EditorRecord[] {
    return this._rooms.map((room) => {
      const next: EditorRecord = {
        ...room.extra,
        area: room.area.trim(),
        polygon: room.polygon.map((point) => [point.x, point.z]),
      };

      const name = room.name.trim();
      if (name) next.name = name;
      else delete next.name;

      return next;
    });
  }

  private _serializeFloaters(): EditorRecord[] {
    return this._floaters.map((floater, index) => {
      const id = floater.id.trim() || `floater_${index + 1}`;
      const label = floater.label.trim();
      const icon = floater.icon.trim();
      const group = floater.group.trim().toLowerCase();

      const next: EditorRecord = {
        ...floater.extra,
        id,
        entity: floater.entity.trim(),
        position: [floater.position.x, floater.position.y, floater.position.z],
        tap_action: floater.tapAction,
        hold_action: floater.holdAction,
      };

      if (label) next.label = label;
      else delete next.label;
      if (icon) next.icon = icon;
      else delete next.icon;
      if (group) next.group = group;
      else delete next.group;

      return next;
    });
  }

  private _serializeHeatmap(): EditorRecord | null {
    const minValue = this._parseOptionalNumber(this._heatmap.minValue);
    const maxValue = this._parseOptionalNumber(this._heatmap.maxValue);

    const sensors = this._heatmap.sensors.map((sensor, index) => {
      const next: EditorRecord = {
        ...sensor.extra,
        id: sensor.id.trim() || `heatmap_sensor_${index + 1}`,
        entity: sensor.entity.trim(),
        position: [sensor.position.x, sensor.position.y, sensor.position.z],
        radius: sensor.radius,
        weight: sensor.weight,
      };

      const label = sensor.label.trim();
      if (label) next.label = label;
      else delete next.label;

      const valueAttribute = sensor.valueAttribute.trim();
      if (valueAttribute) next.value_attribute = valueAttribute;
      else delete next.value_attribute;

      return next;
    });

    const colorRanges = this._heatmap.colorRanges.map((range) => {
      const next: EditorRecord = {
        ...range.extra,
        value: range.value,
        color: range.color.trim(),
      };

      return next;
    });

    const next: EditorRecord = {
      ...this._heatmap.extra,
      enabled: this._heatmap.enabled,
      default_visible: this._heatmap.defaultVisible,
      radius: this._heatmap.radius,
      weight: this._heatmap.weight,
      opacity: this._heatmap.opacity,
      resolution: this._heatmap.resolution,
      blur: this._heatmap.blur,
      sensors,
    };

    if (minValue !== null) next.min = minValue;
    else delete next.min;

    if (maxValue !== null) next.max = maxValue;
    else delete next.max;

    if (colorRanges.length > 0) next.color_ranges = colorRanges;
    else delete next.color_ranges;

    const hasContent =
      this._heatmapsConfigured ||
      sensors.length > 0 ||
      colorRanges.length > 0 ||
      minValue !== null ||
      maxValue !== null ||
      this._hasNonDefaultHeatmapGlobals() ||
      Object.keys(this._heatmap.extra).length > 0;

    return hasContent ? next : null;
  }

  private _serializeNavbar(): EditorRecord | null {
    const items = this._navbar.items.map((item, index) => {
      const next: EditorRecord = {
        ...item.extra,
        id: item.id.trim() || `navbar_item_${index + 1}`,
        label: item.label.trim(),
        icon: item.icon.trim(),
        action: item.action,
      };

      if (item.action === "set-floater-group") {
        next.floater_group = item.floaterGroup.trim().toLowerCase() || "all";
      } else {
        delete next.floater_group;
      }

      return next;
    });

    const next: EditorRecord = {
      ...this._navbar.extra,
      enabled: this._navbar.enabled,
      position: this._navbar.position,
      transparent: this._navbar.transparent,
      opacity: this._navbar.opacity,
      blur: this._navbar.blur,
      offset_x: this._navbar.offsetX,
      offset_y: this._navbar.offsetY,
      items,
    };

    const backgroundColor = this._navbar.backgroundColor.trim();
    if (backgroundColor) next.background_color = backgroundColor;
    else delete next.background_color;

    const borderColor = this._navbar.borderColor.trim();
    if (borderColor) next.border_color = borderColor;
    else delete next.border_color;

    const textColor = this._navbar.textColor.trim();
    if (textColor) next.text_color = textColor;
    else delete next.text_color;

    const iconColor = this._navbar.iconColor.trim();
    if (iconColor) next.icon_color = iconColor;
    else delete next.icon_color;

    const hasContent = this._navbarConfigured || Object.keys(this._navbar.extra).length > 0;
    return hasContent ? next : null;
  }

  private _serializeActions(): EditorRecord[] | null {
    this._actionsError = "";
    const parsed: EditorRecord[] = [];

    for (let index = 0; index < this._actions.length; index += 1) {
      const action = this._actions[index];
      if (!action) continue;
      const serviceData = this._parseJsonObject(action.serviceDataJson, `Action ${index + 1} service_data`);
      if (serviceData === null) return null;

      const target = this._parseJsonObject(action.targetJson, `Action ${index + 1} target`);
      if (target === null) return null;

      const next: EditorRecord = {
        ...action.extra,
        id: action.id.trim() || `action_${index + 1}`,
        label: action.label.trim(),
        service: action.service.trim(),
        close_on_run: action.closeOnRun,
      };

      if (serviceData) next.service_data = serviceData;
      else delete next.service_data;

      if (target) next.target = target;
      else delete next.target;

      parsed.push(next);
    }

    return parsed;
  }

  private _parseRooms(rawRooms: unknown): RoomEditorEntry[] {
    if (!Array.isArray(rawRooms)) return [];

    return rawRooms
      .map((rawRoom) => {
        const room = this._asRecord(rawRoom);
        if (!room) return null;

        const polygon = this._parsePolygon(room.polygon);

        return {
          area: String(room.area ?? "").trim(),
          name: String(room.name ?? "").trim(),
          polygon: polygon.length > 0 ? polygon : this._createDefaultRoomPolygon(),
          extra: this._withoutKeys(room, ["area", "name", "polygon"]),
        };
      })
      .filter((entry): entry is RoomEditorEntry => !!entry);
  }

  private _parseFloaters(rawFloaters: unknown): FloaterEditorEntry[] {
    if (!Array.isArray(rawFloaters)) return [];

    return rawFloaters
      .map((rawFloater, index) => {
        const floater = this._asRecord(rawFloater);
        if (!floater) return null;

        const position = this._parsePoint3(floater.position, floater, { x: 0, y: 0, z: 0 });

        return {
          id: String(floater.id ?? `floater_${index + 1}`),
          entity: String(floater.entity ?? floater.entity_id ?? "").trim(),
          label: String(floater.label ?? floater.name ?? "").trim(),
          icon: String(floater.icon ?? "").trim(),
          group: String(floater.group ?? floater.category ?? "").trim().toLowerCase(),
          tapAction: this._normalizeFloaterAction(
            floater.tap_action ?? floater.press_action ?? floater.action,
            "toggle"
          ),
          holdAction: this._normalizeFloaterAction(floater.hold_action ?? floater.long_press_action, "popup"),
          position,
          extra: this._withoutKeys(floater, [
            "id",
            "entity",
            "entity_id",
            "label",
            "name",
            "icon",
            "group",
            "category",
            "tap_action",
            "press_action",
            "action",
            "hold_action",
            "long_press_action",
            "position",
            "x",
            "y",
            "z",
          ]),
        };
      })
      .filter((entry): entry is FloaterEditorEntry => !!entry);
  }

  private _parseHeatmap(rawHeatmaps: unknown): HeatmapEditorConfig {
    const source = this._asRecord(rawHeatmaps);

    const rawSensors = source?.sensors ?? source?.entries ?? source?.points ?? rawHeatmaps;
    const sensors = this._parseHeatmapSensors(rawSensors);
    const colorRanges = this._parseHeatmapColorRanges(
      source?.color_ranges ?? source?.color_stops ?? source?.ranges ?? source?.temperature_ranges
    );

    return {
      enabled: source?.enabled !== false,
      defaultVisible: source?.default_visible !== false && source?.visible !== false,
      minValue: this._numberToString(source?.min ?? source?.min_value),
      maxValue: this._numberToString(source?.max ?? source?.max_value),
      radius: this._clamp(this._toFinite(source?.radius, DEFAULT_HEATMAP_RADIUS), 0.25, 30),
      weight: this._clamp(this._toFinite(source?.weight, DEFAULT_HEATMAP_WEIGHT), 0.05, 10),
      opacity: this._clamp(this._toFinite(source?.opacity, DEFAULT_HEATMAP_OPACITY), 0.05, 1),
      resolution: Math.round(this._clamp(this._toFinite(source?.resolution, DEFAULT_HEATMAP_RESOLUTION), 96, 384)),
      blur: this._clamp(this._toFinite(source?.blur ?? source?.softness, DEFAULT_HEATMAP_BLUR), 0, 1),
      sensors,
      colorRanges,
      extra: this._withoutKeys(source, [
        "enabled",
        "default_visible",
        "visible",
        "min",
        "min_value",
        "max",
        "max_value",
        "radius",
        "weight",
        "opacity",
        "resolution",
        "blur",
        "softness",
        "sensors",
        "entries",
        "points",
        "color_ranges",
        "color_stops",
        "ranges",
        "temperature_ranges",
      ]),
    };
  }

  private _parseHeatmapSensors(rawSensors: unknown): HeatmapSensorEditorEntry[] {
    if (!Array.isArray(rawSensors)) return [];

    return rawSensors
      .map((rawSensor, index) => {
        const sensor = this._asRecord(rawSensor);
        if (!sensor) return null;

        const position = this._parsePoint3(sensor.position, sensor, { x: 0, y: 0, z: 0 });

        return {
          id: String(sensor.id ?? `heatmap_sensor_${index + 1}`),
          entity: String(sensor.entity ?? sensor.entity_id ?? "").trim(),
          label: String(sensor.label ?? sensor.name ?? "").trim(),
          valueAttribute: String(sensor.value_attribute ?? sensor.attribute ?? "").trim(),
          radius: this._clamp(this._toFinite(sensor.radius, DEFAULT_HEATMAP_RADIUS), 0.25, 30),
          weight: this._clamp(this._toFinite(sensor.weight, DEFAULT_HEATMAP_WEIGHT), 0.05, 10),
          position,
          extra: this._withoutKeys(sensor, [
            "id",
            "entity",
            "entity_id",
            "label",
            "name",
            "value_attribute",
            "attribute",
            "radius",
            "weight",
            "position",
            "x",
            "y",
            "z",
          ]),
        };
      })
      .filter((entry): entry is HeatmapSensorEditorEntry => !!entry);
  }

  private _parseHeatmapColorRanges(rawRanges: unknown): HeatmapColorRangeEditorEntry[] {
    if (!Array.isArray(rawRanges)) return [];

    return rawRanges
      .map((rawRange) => {
        if (Array.isArray(rawRange) && rawRange.length >= 2) {
          return {
            value: this._toFinite(rawRange[0], 0),
            color: String(rawRange[1] ?? "").trim(),
            extra: {},
          };
        }

        const range = this._asRecord(rawRange);
        if (!range) return null;

        return {
          value: this._toFinite(range.value ?? range.at ?? range.temperature ?? range.temp, 0),
          color: String(range.color ?? range.colour ?? "").trim(),
          extra: this._withoutKeys(range, ["value", "at", "temperature", "temp", "color", "colour"]),
        };
      })
      .filter((entry): entry is HeatmapColorRangeEditorEntry => !!entry);
  }

  private _parseNavbar(rawNavbar: unknown): NavbarEditorConfig {
    const source = this._asRecord(rawNavbar);

    return {
      enabled: source?.enabled !== false,
      position: this._normalizeNavbarPosition(source?.position),
      transparent: source?.transparent !== false,
      opacity: this._clamp(this._toFinite(source?.opacity, 0.58), 0.05, 1),
      blur: this._clamp(this._toFinite(source?.blur, 10), 0, 28),
      backgroundColor: String(source?.background_color ?? source?.background ?? "").trim(),
      borderColor: String(source?.border_color ?? source?.borderColor ?? "").trim(),
      textColor: String(source?.text_color ?? source?.textColor ?? "").trim(),
      iconColor: String(source?.icon_color ?? source?.iconColor ?? "").trim(),
      offsetX: Math.round(this._clamp(this._toFinite(source?.offset_x ?? source?.offsetX, 14), 0, 128)),
      offsetY: Math.round(this._clamp(this._toFinite(source?.offset_y ?? source?.offsetY, 16), 0, 128)),
      items: this._parseNavbarItems(source?.items),
      extra: this._withoutKeys(source, [
        "enabled",
        "position",
        "transparent",
        "opacity",
        "blur",
        "background",
        "background_color",
        "border_color",
        "borderColor",
        "text_color",
        "textColor",
        "icon_color",
        "iconColor",
        "offset_x",
        "offsetX",
        "offset_y",
        "offsetY",
        "items",
      ]),
    };
  }

  private _parseNavbarItems(rawItems: unknown): NavbarItemEditorEntry[] {
    if (!Array.isArray(rawItems)) {
      return [
        {
          id: "heatmap-toggle",
          label: "Heatmap",
          icon: "mdi:thermometer",
          action: "toggle-heatmap",
          floaterGroup: "",
          extra: {},
        },
      ];
    }

    const parsed = rawItems
      .map((rawItem, index) => {
        const item = this._asRecord(rawItem);
        if (!item) return null;

        const action = this._normalizeNavbarAction(item.action ?? item.type, "toggle-heatmap");

        return {
          id: String(item.id ?? `navbar_item_${index + 1}`).trim(),
          label: String(item.label ?? item.name ?? "").trim(),
          icon: String(item.icon ?? "").trim(),
          action,
          floaterGroup: String(item.floater_group ?? item.group ?? item.target ?? "").trim().toLowerCase(),
          extra: this._withoutKeys(item, [
            "id",
            "label",
            "name",
            "icon",
            "action",
            "type",
            "floater_group",
            "group",
            "target",
          ]),
        };
      })
      .filter((entry): entry is NavbarItemEditorEntry => !!entry);

    if (parsed.length > 0) return parsed;

    return [
      {
        id: "heatmap-toggle",
        label: "Heatmap",
        icon: "mdi:thermometer",
        action: "toggle-heatmap",
        floaterGroup: "",
        extra: {},
      },
    ];
  }

  private _parseActions(rawActions: unknown): PopupActionEditorEntry[] {
    if (!Array.isArray(rawActions)) return [];

    return rawActions
      .map((rawAction, index) => {
        const action = this._asRecord(rawAction);
        if (!action) return null;

        const serviceData = this._asRecord(action.service_data) ?? this._asRecord(action.data);
        const target = this._asRecord(action.target);

        return {
          id: String(action.id ?? `action_${index + 1}`).trim(),
          label: String(action.label ?? action.name ?? "").trim(),
          service: String(action.service ?? action.action ?? "").trim(),
          closeOnRun: action.close_on_run !== false,
          serviceDataJson: serviceData ? JSON.stringify(serviceData) : "",
          targetJson: target ? JSON.stringify(target) : "",
          extra: this._withoutKeys(action, [
            "id",
            "label",
            "name",
            "service",
            "action",
            "service_data",
            "data",
            "target",
            "close_on_run",
          ]),
        };
      })
      .filter((entry): entry is PopupActionEditorEntry => !!entry);
  }

  private _createDefaultRoomPolygon(): Point2Editor[] {
    return [
      { x: 0, z: 0 },
      { x: 2, z: 0 },
      { x: 2, z: 2 },
      { x: 0, z: 2 },
    ];
  }

  private _createDefaultHeatmapEditorConfig(): HeatmapEditorConfig {
    return {
      enabled: true,
      defaultVisible: true,
      minValue: "",
      maxValue: "",
      radius: DEFAULT_HEATMAP_RADIUS,
      weight: DEFAULT_HEATMAP_WEIGHT,
      opacity: DEFAULT_HEATMAP_OPACITY,
      resolution: DEFAULT_HEATMAP_RESOLUTION,
      blur: DEFAULT_HEATMAP_BLUR,
      sensors: [],
      colorRanges: [],
      extra: {},
    };
  }

  private _createDefaultNavbarEditorConfig(): NavbarEditorConfig {
    return {
      enabled: true,
      position: "left",
      transparent: true,
      opacity: 0.58,
      blur: 10,
      backgroundColor: "",
      borderColor: "",
      textColor: "",
      iconColor: "",
      offsetX: 14,
      offsetY: 16,
      items: [
        {
          id: "heatmap-toggle",
          label: "Heatmap",
          icon: "mdi:thermometer",
          action: "toggle-heatmap",
          floaterGroup: "",
          extra: {},
        },
      ],
      extra: {},
    };
  }

  private _asRecord(value: unknown): EditorRecord | null {
    if (!value || typeof value !== "object" || Array.isArray(value)) return null;
    return value as EditorRecord;
  }

  private _withoutKeys(record: EditorRecord | null | undefined, keys: string[]): EditorRecord {
    if (!record) return {};

    const excluded = new Set(keys);
    const output: EditorRecord = {};
    for (const [key, value] of Object.entries(record)) {
      if (excluded.has(key)) continue;
      output[key] = value;
    }
    return output;
  }

  private _parsePolygon(rawPolygon: unknown): Point2Editor[] {
    if (!Array.isArray(rawPolygon)) return [];

    const polygon: Point2Editor[] = [];
    for (const rawPoint of rawPolygon) {
      if (!Array.isArray(rawPoint) || rawPoint.length < 2) continue;
      const x = Number(rawPoint[0]);
      const z = Number(rawPoint[1]);
      if (!Number.isFinite(x) || !Number.isFinite(z)) continue;
      polygon.push({ x, z });
    }

    return polygon;
  }

  private _parsePoint3(rawPoint: unknown, fallbackSource: EditorRecord, fallback: Point3Editor): Point3Editor {
    if (Array.isArray(rawPoint) && rawPoint.length >= 3) {
      const x = Number(rawPoint[0]);
      const y = Number(rawPoint[1]);
      const z = Number(rawPoint[2]);
      if (Number.isFinite(x) && Number.isFinite(y) && Number.isFinite(z)) {
        return { x, y, z };
      }
    }

    const x = Number(fallbackSource.x);
    const y = Number(fallbackSource.y);
    const z = Number(fallbackSource.z);
    if (Number.isFinite(x) && Number.isFinite(y) && Number.isFinite(z)) {
      return { x, y, z };
    }

    return { ...fallback };
  }

  private _normalizeFloaterAction(value: unknown, fallback: FloaterAction): FloaterAction {
    const normalized = String(value ?? "").trim().toLowerCase().replace(/_/g, "-");
    if (normalized === "more-info") return "more-info";
    if (normalized === "popup") return "popup";
    if (normalized === "toggle") return "toggle";
    return fallback;
  }

  private _normalizeNavbarPosition(value: unknown): NavbarPosition {
    const normalized = String(value ?? "").trim().toLowerCase();
    if (normalized === "right") return "right";
    if (normalized === "top") return "top";
    if (normalized === "bottom") return "bottom";
    return "left";
  }

  private _normalizeNavbarAction(value: unknown, fallback: NavbarAction): NavbarAction {
    const normalized = String(value ?? "").trim().toLowerCase().replace(/_/g, "-");
    if (normalized === "set-floater-group") return "set-floater-group";
    if (normalized === "toggle-heatmap") return "toggle-heatmap";
    return fallback;
  }

  private _toFinite(value: unknown, fallback: number): number {
    if (value === null || value === undefined) return fallback;
    if (typeof value === "string" && value.trim() === "") return fallback;
    const next = Number(value);
    return Number.isFinite(next) ? next : fallback;
  }

  private _hasValueKey(record: EditorRecord, key: string): boolean {
    return Object.prototype.hasOwnProperty.call(record, key);
  }

  private _nextTextValue(record: EditorRecord, key: string, fallback: string): string {
    if (!this._hasValueKey(record, key)) return fallback;
    return String(record[key] ?? "").trim();
  }

  private _clamp(value: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, value));
  }

  private _numberToString(value: unknown): string {
    const next = Number(value);
    if (!Number.isFinite(next)) return "";
    return String(next);
  }

  private _parseOptionalNumber(value: string): number | null {
    const trimmed = value.trim();
    if (!trimmed) return null;
    const parsed = Number(trimmed);
    return Number.isFinite(parsed) ? parsed : null;
  }

  private _parseJsonObject(value: string, label: string): Record<string, unknown> | null | undefined {
    const trimmed = value.trim();
    if (!trimmed) return undefined;

    try {
      const parsed = JSON.parse(trimmed);
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
        this._actionsError = `${label} must be a JSON object.`;
        return null;
      }
      return parsed as Record<string, unknown>;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this._actionsError = `${label} contains invalid JSON (${message}).`;
      return null;
    }
  }

  private _inputValue(ev: Event): string {
    const target = ev.target as HTMLInputElement | null;
    return String(target?.value ?? "");
  }

  private _hasNonDefaultHeatmapGlobals(): boolean {
    return (
      this._heatmap.enabled !== true ||
      this._heatmap.defaultVisible !== true ||
      Math.abs(this._heatmap.radius - DEFAULT_HEATMAP_RADIUS) > 0.0001 ||
      Math.abs(this._heatmap.weight - DEFAULT_HEATMAP_WEIGHT) > 0.0001 ||
      Math.abs(this._heatmap.opacity - DEFAULT_HEATMAP_OPACITY) > 0.0001 ||
      this._heatmap.resolution !== DEFAULT_HEATMAP_RESOLUTION ||
      Math.abs(this._heatmap.blur - DEFAULT_HEATMAP_BLUR) > 0.0001
    );
  }

  private _createBaseConfig(): LovelaceConfig {
    return {
      ...this._config,
      type: String(this._config.type ?? CARD_TYPE),
    };
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
