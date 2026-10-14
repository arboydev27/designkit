import type { DesignExample } from '../shared/types';
export const example: DesignExample = {
  "id": "minimalism-everyday-shop",
  "styleId": "minimalism",
  "name": "OBJECT · shop",
  "brand": "OBJECT",
  "kind": "shop",
  "headline": "A few things, chosen well.",
  "description": "Everyday objects with a clear purpose, honest materials, and no unnecessary detail.",
  "action": "Explore the collection",
  "colors": {
    "canvas": "#EEEDE8",
    "surface": "#DDDCD3",
    "accent": "#7B6657",
    "ink": "#35302D",
    "line": "#8C857D"
  },
  "fonts": {
    "heading": "Inter",
    "body": "DM Sans"
  },
  "items": [
    {
      "title": "The everyday glass",
      "detail": "A small edition, made with care.",
      "label": "$36"
    },
    {
      "title": "A simple desk light",
      "detail": "A useful companion for everyday rituals.",
      "label": "$48"
    },
    {
      "title": "One good notebook",
      "detail": "A little character for your own space.",
      "label": "$24"
    }
  ],
  "anatomy": [
    {
      "decision": "Composition",
      "reason": "Product labels and whitespace make selection easy without decorative containers."
    },
    {
      "decision": "Material and geometry",
      "reason": "Few decisions, expressed consistently, with generous space and clear purpose."
    },
    {
      "decision": "Reading and interaction",
      "reason": "Reduce to essential content and clear affordances; give spacing and typography explicit roles. Prefer immediate navigation and subtle state feedback; avoid ornamental reveals."
    }
  ]
}
;
