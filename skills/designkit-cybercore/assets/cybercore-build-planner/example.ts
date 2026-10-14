import type { DesignExample } from '../shared/types';
export const example: DesignExample = {
  "id": "cybercore-build-planner",
  "styleId": "cybercore",
  "name": "NODE · planner",
  "brand": "NODE",
  "kind": "planner",
  "headline": "Route your next experiment.",
  "description": "A local planning console for the tasks, notes, and decisions behind your next build.",
  "action": "Make a little progress",
  "colors": {
    "canvas": "#151A24",
    "surface": "#242E3E",
    "accent": "#9CBFD5",
    "ink": "#EBF2F8",
    "line": "#8196B5"
  },
  "fonts": {
    "heading": "Space Mono",
    "body": "IBM Plex Mono"
  },
  "items": [
    {
      "title": "Map the input",
      "detail": "Start small and give it your attention.",
      "label": "Today"
    },
    {
      "title": "Build the smallest circuit",
      "detail": "A little space for the next useful step.",
      "label": "This week"
    },
    {
      "title": "Record what changed",
      "detail": "Leave a note about what worked.",
      "label": "Reflection"
    }
  ],
  "anatomy": [
    {
      "decision": "Composition",
      "reason": "Explicit task states make the technical appearance functional rather than decorative."
    },
    {
      "decision": "Material and geometry",
      "reason": "Terminal-like modularity, acid contrast, and purposeful technical annotations."
    },
    {
      "decision": "Reading and interaction",
      "reason": "Use modular terminal panels and technical typography; group dense information with consistent alignment. Use immediate status updates and a brief focus highlight; do not flicker text or simulate failures."
    }
  ]
}
;
