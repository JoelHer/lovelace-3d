# lovelace-3d

A Home Assistant custom Lovelace card that renders a 3D floorplan and room action popups.

## Project Structure

- `src/lovelace-3d.ts`: custom element entrypoint and card registration.
- `src/lovelace-3d-editor.ts`: Lovelace visual editor (YAML rooms/actions).
- `src/composables/useAreaRegistry.ts`: loads and caches HA area registry.
- `src/components/*`: presentational Vue components.
- `src/three/*`: all Three.js geometry helpers and type definitions.

## Card Config

```yaml
type: custom:lovelace-3d
entity: sensor.temperature
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
    position: [2, 1.2, 1.5] # x, y, z in the same world-space as room polygons
    tap_action: toggle # toggle | more-info | popup
    hold_action: popup # toggle | more-info | popup
```

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

Build output is emitted to Home Assistant's `www` directory per local Vite config.
