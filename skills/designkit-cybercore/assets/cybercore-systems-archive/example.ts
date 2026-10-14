import type { DesignExample } from '../shared/types';
export const example: DesignExample = {
  "id": "cybercore-systems-archive",
  "styleId": "cybercore",
  "name": "SYS.01 · archive",
  "brand": "SYS.01",
  "kind": "archive",
  "headline": "Find the signal in the system.",
  "description": "A searchable archive of experiments in tools, networks, and human-machine collaboration.",
  "action": "Browse the archive",
  "colors": {
    "canvas": "#121B17",
    "surface": "#1D2B23",
    "accent": "#C3F85C",
    "ink": "#E9F5DC",
    "line": "#80936D"
  },
  "fonts": {
    "heading": "Space Grotesk",
    "body": "IBM Plex Mono"
  },
  "items": [
    {
      "title": "Protocols for public tools",
      "detail": "An illustrated working reference.",
      "label": "Reference"
    },
    {
      "title": "The open hardware notebook",
      "detail": "Notes, patterns, and useful experiments.",
      "label": "Experiment"
    },
    {
      "title": "Signals from the edge",
      "detail": "A closer look at an underlying idea.",
      "label": "Guide"
    }
  ],
  "anatomy": [
    {
      "decision": "Composition",
      "reason": "Terminal labels and modular records give the archive a technical but readable structure."
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
