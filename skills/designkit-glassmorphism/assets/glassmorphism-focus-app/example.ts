import type { DesignExample } from '../shared/types';
export const example: DesignExample = {
  "id": "glassmorphism-focus-app",
  "styleId": "glassmorphism",
  "name": "aura · planner",
  "brand": "aura",
  "kind": "planner",
  "headline": "Find a little clarity.",
  "description": "A calm planning space for the work that deserves your attention today.",
  "action": "Make a little progress",
  "colors": {
    "canvas": "#E4E8F7",
    "surface": "#F5F6FF",
    "accent": "#8463E9",
    "ink": "#252443",
    "line": "#929CBD"
  },
  "fonts": {
    "heading": "Inter",
    "body": "Inter"
  },
  "items": [
    {
      "title": "Plan one meaningful task",
      "detail": "Start small and give it your attention.",
      "label": "Today"
    },
    {
      "title": "Make room for a break",
      "detail": "A little space for the next useful step.",
      "label": "This week"
    },
    {
      "title": "Close the day with a note",
      "detail": "Leave a note about what worked.",
      "label": "Reflection"
    }
  ],
  "anatomy": [
    {
      "decision": "Composition",
      "reason": "Frosted planning panels separate tasks from the atmospheric background."
    },
    {
      "decision": "Material and geometry",
      "reason": "Frosted layers, restrained highlights, and a scene that remains visible behind them."
    },
    {
      "decision": "Reading and interaction",
      "reason": "Layer a few translucent panels above a visible scene; keep text on a reliable reading surface. Short opacity and position changes describe depth; provide solid surfaces when transparency is reduced."
    }
  ]
}
;
