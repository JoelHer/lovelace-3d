# Lovelace 3D

A Home Assistant custom Lovelace card that renders a 3D floorplan with room popups, floating controls, heatmaps, and a configurable navbar.

**Please note, that this card is still early in development, and therefore may conatin bugs, and is not feature-complete**

## Features

- 3D room polygons with clickable room action popups
- Floating entity controls (`toggle`, `more-info`, `popup`)
- Overlap grouping for dense floater layouts
- Sensor heatmap overlay with configurable ranges/colors
- Camera and renderer tuning (wall height, opacity, grid, background, light simulation)
- Optional floating navbar (heatmap toggle, floater group filters)
- Built-in visual editor (`show visual editor` in Lovelace)

## Requirements

- Home Assistant with Lovelace dashboards
- HACS (recommended for install/updates)
- Existing HA areas/entities referenced in your YAML

## Installation (HACS, recommended)

1. Open HACS in Home Assistant.
2. Open the top-right menu, then `Custom repositories`.
3. Add this repository URL `https://github.com/JoelHer/lovelace-3d`.
4. Select category `Dashboard`.
5. Install `Lovelace 3D`.
6. Restart Home Assistant.

## Installation (manual)

1. Download `lovelace-3d.js` from `dist/` (or from a release artifact).
2. Copy it to:

```text
/config/www/lovelace-3d/lovelace-3d.js
```

3. Add this Lovelace resource:

```yaml
url: /local/lovelace-3d/lovelace-3d.js
type: module
```

4. Restart Home Assistant.
5. Hard-refresh your browser (`Ctrl+F5` / `Cmd+Shift+R`).

## Add The Card

In a dashboard card config, use:

```yaml
type: custom:lovelace-3d
rooms: []
```

Then switch to visual editor or paste a full YAML config.

## Quickstart YAML (Normal Floorplan Example)

Replace `area` IDs and entity IDs with your own Home Assistant values. Rooms will not be displayed, until a valid area is given. The Heatmap will also not work until at least one valid sensor is given.

```yaml
type: custom:lovelace-3d
room_popup_actions:
  - id: action_1
    label: Turn lights on
    service: light.turn_on
    close_on_run: true
    target:
      area_id: "{{ room.area_id }}"
rooms:
  - area: flur
    name: Flur
    polygon:
      - - 2
        - 0
      - - 6
        - 0
      - - 6
        - 2
      - - 2
        - 2
  - area: bedroom
    name: Bedroom
    polygon:
      - - 0
        - 0
      - - 2
        - 0
      - - 2
        - 4.5
      - - 0
        - 4.5
  - area: bathroom
    name: Bathroom
    polygon:
      - - 2
        - 2
      - - 3.8
        - 2
      - - 3.8
        - 4.5
      - - 2
        - 4.5
  - area: kitchen
    name: Kitchen
    polygon:
      - - 3.8
        - 2
      - - 8
        - 2
      - - 8
        - 5.5
      - - 3.8
        - 5.5
  - area: livingroom
    name: Livingroom
    polygon:
      - - 0
        - 0
      - - 2
        - 0
      - - 2
        - -1
      - - 6
        - -1
      - - 6
        - 0
      - - 8
        - 0
      - - 8
        - -3.8
      - - 0
        - -3.8
floaters:
  - id: kitchen-light
    entity: light.kitchen
    position:
      - 6.6
      - 1.2
      - 3.7
    tap_action: toggle
    hold_action: popup
    icon: mdi:lightbulb
    group: light
  - id: floater_2
    entity: switch.some_switch
    position:
      - 4.1
      - 1.2
      - 1
    tap_action: toggle
    hold_action: more-info
    icon: mdi:power-socket-eu
    group: switch
floater_overlap:
  enabled: true
  distance_px: 40
  min_items: 2
  expand_duration_ms: 120
camera:
  position:
    - 4
    - 7
    - 11
  rotation:
    - -35
    - 0
  max_zoom_out: 60
renderer:
  wall_opacity: 0.9
  wall_height: 2.6
  grid_enabled: true
  light_simulation_enabled: true
  light_simulation_intensity: 2.4
  light_simulation_range: 4.5
  light_simulation_decay: 1.2
  card_transparent: false
  wall_color: "#ffffff"
  grid_color: "#888888"
  background_color: "#10131a"
heatmaps:
  enabled: true
  default_visible: true
  radius: 2.8
  weight: 1
  opacity: 0.72
  resolution: 192
  blur: 0.55
  sensors:
    - id: heatmap_sensor_1
      entity: sensor.kitchen_temperature
      position:
        - 6.4
        - 1.2
        - 3.8
      radius: 2.8
      weight: 1
    - id: heatmap_sensor_2
      entity: sensor.living_temperature
      position:
        - 4.5
        - 1.2
        - -2.2
      radius: 2.8
      weight: 1
  min: 16
  max: 28
  color_ranges:
    - value: 16
      color: "#1652f6"
    - value: 20
      color: "#16bbff"
    - value: 23
      color: "#49db78"
    - value: 25
      color: "#ffd646"
    - value: 28
      color: "#fa4a30"
navbar:
  enabled: true
  position: left
  transparent: true
  opacity: 0.58
  blur: 10
  offset_x: 14
  offset_y: 16
  items:
    - id: navbar_item_1
      label: Heatmap
      icon: mdi:thermometer
      action: toggle-heatmap
    - id: navbar_item_2
      label: Lights
      icon: mdi:lightbulb-group
      action: set-floater-group
      floater_group: light
    - id: navbar_item_3
      label: Switches
      icon: mdi:power-socket-eu
      action: set-floater-group
      floater_group: switch
    - id: navbar_item_4
      label: All
      icon: mdi:view-grid
      action: set-floater-group
      floater_group: all
```

## Room Popup Template Tokens

These tokens are supported in `room_popup_actions` values:

- `{{ room.id }}`
- `{{ room.name }}`
- `{{ room.area_id }}`
- `{{ click.x }}`, `{{ click.y }}`
- `{{ click.world_x }}`, `{{ click.world_y }}`, `{{ click.world_z }}`

## Top-Level Config Keys

- `rooms`: room polygons and names (required)
- `room_popup_actions`: global popup actions used for all rooms
- `floaters`: 3D entity buttons
- `floater_overlap`: overlap grouping behavior
- `camera`: camera position/rotation/zoom limits
- `renderer`: wall/grid/background/card styling and simulated light controls
- `heatmaps`: sensor overlays and color mapping
- `navbar`: floating control bar

## Troubleshooting

- Card shows as red error card:
  - Check resource URL and `type: module`
  - Confirm file exists at `/hacsfiles/...` or `/local/...`
- Room click popup does nothing:
  - Verify `room_popup_actions[].service` is `domain.service`
  - Check Home Assistant logs for service call errors
- Empty floorplan:
  - Confirm every room has at least 3 polygon points
  - Confirm each `rooms[].area` exists in HA Areas
- Changes do not appear:
  - Hard refresh browser cache
  - Add a version query to resource URL (for manual installs)

## Development

```bash
npm install
npm run dev
npm run build
```

`npm run build` outputs the distributable file at `dist/lovelace-3d.js`.

To build directly into a Home Assistant `www` folder for local testing:

```bash
BUILD_OUT_DIR=/path/to/config/www/lovelace-3d npm run build
```
