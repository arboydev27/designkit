import type { DesignExample } from '../shared/types';
export const example: DesignExample = {
  "id": "claymorphism-desk-shop",
  "styleId": "claymorphism",
  "name": "pebble objects · shop",
  "brand": "pebble objects",
  "kind": "shop",
  "headline": "A happier place to make things.",
  "description": "Playful desk companions for doodlers, thinkers, and collectors of little comforts.",
  "action": "Explore the collection",
  "colors": {
    "canvas": "#EEF3F9",
    "surface": "#D3E4F6",
    "accent": "#C3B0E4",
    "ink": "#303D55",
    "line": "#7990AE"
  },
  "fonts": {
    "heading": "Nunito",
    "body": "DM Sans"
  },
  "items": [
    {
      "title": "Cloud pencil pot",
      "detail": "A small edition, made with care.",
      "label": "$36"
    },
    {
      "title": "Pebble paperweight",
      "detail": "A useful companion for everyday rituals.",
      "label": "$48"
    },
    {
      "title": "Squiggle desk tray",
      "detail": "A little character for your own space.",
      "label": "$24"
    }
  ],
  "anatomy": [
    {
      "decision": "Composition",
      "reason": "Rounded product silhouettes and puffy controls support the tactile object collection."
    },
    {
      "decision": "Material and geometry",
      "reason": "Puffy rounded surfaces and soft shadows with crisp, readable labels."
    },
    {
      "decision": "Reading and interaction",
      "reason": "Use rounded, inflated forms as a few friendly anchors, with open space around text and controls. A short, critically damped press response suggests softness; reduce it to color feedback when requested."
    }
  ]
}
;
