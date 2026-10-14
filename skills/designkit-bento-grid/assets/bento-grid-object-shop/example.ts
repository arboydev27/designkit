import type { DesignExample } from '../shared/types';
export const example: DesignExample = {
  "id": "bento-grid-object-shop",
  "styleId": "bento-grid",
  "name": "STACK goods · shop",
  "brand": "STACK goods",
  "kind": "shop",
  "headline": "Useful things, thoughtfully arranged.",
  "description": "A collection of modular desk objects that make a small space work a little better.",
  "action": "Explore the collection",
  "colors": {
    "canvas": "#F1EAD9",
    "surface": "#EBD3AD",
    "accent": "#CA8D85",
    "ink": "#4C3530",
    "line": "#A98873"
  },
  "fonts": {
    "heading": "Space Grotesk",
    "body": "Inter"
  },
  "items": [
    {
      "title": "The stackable tray",
      "detail": "A small edition, made with care.",
      "label": "$36"
    },
    {
      "title": "A home for your cables",
      "detail": "A useful companion for everyday rituals.",
      "label": "$48"
    },
    {
      "title": "The little lamp",
      "detail": "A little character for your own space.",
      "label": "$24"
    }
  ],
  "anatomy": [
    {
      "decision": "Composition",
      "reason": "The product grid uses varied tile sizes to distinguish a featured object from supporting items."
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
