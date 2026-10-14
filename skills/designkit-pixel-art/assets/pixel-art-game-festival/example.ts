import type { DesignExample } from '../shared/types';
export const example: DesignExample = {
  "id": "pixel-art-game-festival",
  "styleId": "pixel-art",
  "name": "SIDEQUEST · event",
  "brand": "SIDEQUEST",
  "kind": "event",
  "headline": "Your next adventure starts here.",
  "description": "An independent games afternoon with tiny worlds, big ideas, and room for a new player.",
  "action": "Explore the programme",
  "colors": {
    "canvas": "#1D233C",
    "surface": "#30385A",
    "accent": "#F4D476",
    "ink": "#F8EFD7",
    "line": "#8793C0"
  },
  "fonts": {
    "heading": "Press Start 2P",
    "body": "Space Mono"
  },
  "items": [
    {
      "title": "Meet the makers",
      "detail": "A conversation to begin the gathering.",
      "label": "10:00"
    },
    {
      "title": "Try a tiny world",
      "detail": "Time to make, listen, and try something.",
      "label": "13:00"
    },
    {
      "title": "The final boss showcase",
      "detail": "Bring the day's ideas together.",
      "label": "16:00"
    }
  ],
  "anatomy": [
    {
      "decision": "Composition",
      "reason": "Chunky schedule blocks feel game-like, while ticket selection follows familiar controls."
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
