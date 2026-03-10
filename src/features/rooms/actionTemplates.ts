import type { PopupState } from "./roomConfig";

type TemplateTokenResolver = (popup: PopupState) => string;

const TEMPLATE_TOKENS: Record<string, TemplateTokenResolver> = {
  "room.id": (popup) => popup.roomId,
  "room.name": (popup) => popup.roomName,
  "room.area_id": (popup) => popup.roomId,
  "click.x": (popup) => String(Math.round(popup.x)),
  "click.y": (popup) => String(Math.round(popup.y)),
  "click.world_x": (popup) => popup.worldX.toFixed(4),
  "click.world_y": (popup) => popup.worldY.toFixed(4),
  "click.world_z": (popup) => popup.worldZ.toFixed(4),
};

function applyStringTemplate(template: string, popup: PopupState): string {
  return template.replace(/\{\{\s*([^{}]+?)\s*\}\}/g, (fullMatch, tokenName) => {
    const resolver = TEMPLATE_TOKENS[String(tokenName).trim()];
    return resolver ? resolver(popup) : fullMatch;
  });
}

export function applyActionTemplates(value: unknown, popup: PopupState): unknown {
  if (typeof value === "string") {
    return applyStringTemplate(value, popup);
  }

  if (Array.isArray(value)) {
    return value.map((entry) => applyActionTemplates(entry, popup));
  }

  if (value && typeof value === "object") {
    const output: Record<string, unknown> = {};
    for (const [key, entry] of Object.entries(value as Record<string, unknown>)) {
      output[key] = applyActionTemplates(entry, popup);
    }
    return output;
  }

  return value;
}
