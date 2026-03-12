# lovelace-3d

A Home Assistant custom Lovelace card that renders a 3D floorplan and room action popups.

## Installation (HACS Custom Repository)

1. Open HACS in Home Assistant.
2. Go to the 3-dot menu -> `Custom repositories`.
3. Add this repository URL and choose the category `Dashboard`.
4. Install `Lovelace 3D` from HACS and restart Home Assistant.
5. Ensure the Lovelace resource exists (HACS often adds this automatically):

```text
/hacsfiles/lovelace-3d/lovelace-3d.js
```

## Project Structure

- `src/lovelace-3d.ts`: custom element entrypoint and card registration.
- `src/lovelace-3d-editor.ts`: Lovelace visual editor (YAML rooms/actions).
- `src/composables/useAreaRegistry.ts`: loads and caches HA area registry.
- `src/components/*`: presentational Vue components.
- `src/three/*`: all Three.js geometry helpers and type definitions.

## Card Config

```yaml
type: custom:lovelace-3d
room_popup_actions:
  - service: light.turn_on
    label: Turn lights on
    target:
      area_id: "{{ room.area_id }}"
rooms:
  - area: kitchen
    name: Kitchen
    polygon:
      - [0, 0]
      - [4, 0]
      - [4, 3]
      - [0, 3]
floaters:
  - id: kitchen-light
    entity: light.kitchen
    icon: mdi:lightbulb
    group: light
    position: [2, 1.2, 1.5] # x, y, z in the same world-space as room polygons
    tap_action: toggle # toggle | more-info | popup
    hold_action: popup # toggle | more-info | popup
floater_overlap:
  enabled: true
  distance_px: 40
  min_items: 2
  expand_duration_ms: 120
camera:
  position: [3, 6, 10] # camera world position (x, y, z)
  rotation: [-38.66, 0] # degrees: [x, y]
  max_zoom_out: 60
renderer:
  wall_color: "#ffffff"
  wall_opacity: 0.9
  wall_height: 2.6
  grid_enabled: true
  grid_color: "#888888"
  background_color: "#10131a"
  card_transparent: false
  card_background_color: ""
heatmaps:
  enabled: true
  sensors:
    - entity: sensor.kitchen_temperature
      position: [2, 1.2, 1.5]
    - entity: sensor.living_temperature
      position: [5, 1.2, 2.2]
  # Optional fixed range. If omitted, range is auto-derived from sensors.
  min: 16
  max: 28
  # Configure what is cold/warm/hot.
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
  items:
    - action: toggle-heatmap
      label: Heatmap
      icon: mdi:thermometer
    - action: set-floater-group
      floater_group: light
      label: Lights
      icon: mdi:lightbulb-group
    - action: set-floater-group
      floater_group: all
      label: All
      icon: mdi:view-grid
```

`heatmaps.color_ranges` accepts both object and tuple forms:

- `{ value: 22, color: "#49db78" }`
- `[22, "#49db78"]`

Supported template tokens in popup actions:

- `{{ room.id }}`
- `{{ room.name }}`
- `{{ room.area_id }}`
- `{{ click.x }}`, `{{ click.y }}`
- `{{ click.world_x }}`, `{{ click.world_y }}`, `{{ click.world_z }}`

## Adding Features

1. New room/action parsing behavior:
   edit `src/features/rooms/roomConfig.ts`.
2. New popup template tokens:
   edit `src/features/rooms/actionTemplates.ts`.
3. New 3D visuals (floor/walls/material effects):
   edit `src/three/roomMeshes.ts` and `src/three/walls.ts`.
4. New floating 3D-anchored controls:
   edit `src/features/floaters/config.ts` and `src/components/Floater*.vue`.
5. New UI behaviors:
   edit `src/App.vue` and presentational components under `src/components`.
6. New Lovelace editor fields:
   edit `src/lovelace-3d-editor.ts`.

## Development

```bash
npm install
npm run dev
npm run build
```

`npm run build` creates the HACS artifact at `dist/lovelace-3d.js`.

To build directly into a Home Assistant `www` folder for local testing:

```bash
BUILD_OUT_DIR=/path/to/config/www/lovelace-3d npm run build
```
