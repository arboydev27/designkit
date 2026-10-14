import type { DesignExample } from '../shared/types';
export const example: DesignExample = {
  "id": "pixel-art-quest-planner",
  "styleId": "pixel-art",
  "name": "CHECKPOINT · planner",
  "brand": "CHECKPOINT",
  "kind": "planner",
  "headline": "One good quest at a time.",
  "description": "Break your project into small missions and keep track of what actually moved forward.",
  "action": "Make a little progress",
  "colors": {
    "canvas": "#F3EBC9",
    "surface": "#DFD89E",
    "accent": "#A55666",
    "ink": "#343149",
    "line": "#343149"
  },
  "fonts": {
    "heading": "Press Start 2P",
    "body": "Space Mono"
  },
  "items": [
    {
      "title": "Explore the problem",
      "detail": "Start small and give it your attention.",
      "label": "Today"
    },
    {
      "title": "Craft the first version",
      "detail": "A little space for the next useful step.",
      "label": "This week"
    },
    {
      "title": "Save your progress",
      "detail": "Leave a note about what worked.",
      "label": "Reflection"
    }
  ],
  "anatomy": [
    {
      "decision": "Composition",
      "reason": "Pixel geometry frames ordinary tasks; a readable body face carries longer instructions."
    },
    {
      "decision": "Material and geometry",
      "reason": "Pixel-aligned forms and nostalgic game language with modern interaction clarity."
    },
    {
      "decision": "Reading and interaction",
      "reason": "Work with block geometry, crisp edges, and a coarse rhythm; pair pixel display lettering with readable body text. Use discrete state changes rather than flickering sprites; never communicate a state through animation alone."
    }
  ]
}
;
