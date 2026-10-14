import type { DesignExample } from '../shared/types';
export const example: DesignExample = {
  "id": "bento-grid-daily-planner",
  "styleId": "bento-grid",
  "name": "orbit. · planner",
  "brand": "orbit.",
  "kind": "planner",
  "headline": "Everything in its place.",
  "description": "A few useful modules for your tasks, notes, and the room you want to leave in your day.",
  "action": "Make a little progress",
  "colors": {
    "canvas": "#F6F5F0",
    "surface": "#DFD7F0",
    "accent": "#F0D47F",
    "ink": "#292830",
    "line": "#8C8598"
  },
  "fonts": {
    "heading": "DM Sans",
    "body": "Inter"
  },
  "items": [
    {
      "title": "The one thing for today",
      "detail": "Start small and give it your attention.",
      "label": "Today"
    },
    {
      "title": "A small project to finish",
      "detail": "A little space for the next useful step.",
      "label": "This week"
    },
    {
      "title": "Time for yourself",
      "detail": "Leave a note about what worked.",
      "label": "Reflection"
    }
  ],
  "anatomy": [
    {
      "decision": "Composition",
      "reason": "Unequal planning tiles have separate purposes while their controls stay aligned."
    },
    {
      "decision": "Material and geometry",
      "reason": "Modular composition, varied tile scale, and a coherent palette across independent content."
    },
    {
      "decision": "Reading and interaction",
      "reason": "Use unequal modules in a stable grid; each tile has one purpose and a deliberate reading priority. Animate a changed tile's content rather than moving the entire grid."
    }
  ]
}
;
