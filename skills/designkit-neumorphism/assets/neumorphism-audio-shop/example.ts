import type { DesignExample } from '../shared/types';
export const example: DesignExample = {
  "id": "neumorphism-audio-shop",
  "styleId": "neumorphism",
  "name": "soft switch · shop",
  "brand": "soft switch",
  "kind": "shop",
  "headline": "Tools that feel good in use.",
  "description": "Considered audio accessories for the small rituals around listening, working, and unwinding.",
  "action": "Explore the collection",
  "colors": {
    "canvas": "#E9E4DD",
    "surface": "#E9E4DD",
    "accent": "#8C6D52",
    "ink": "#463629",
    "line": "#A89680"
  },
  "fonts": {
    "heading": "DM Sans",
    "body": "Inter"
  },
  "items": [
    {
      "title": "The volume dial",
      "detail": "A small edition, made with care.",
      "label": "$36"
    },
    {
      "title": "Desk listening stand",
      "detail": "A useful companion for everyday rituals.",
      "label": "$48"
    },
    {
      "title": "The everyday cable",
      "detail": "A little character for your own space.",
      "label": "$24"
    }
  ],
  "anatomy": [
    {
      "decision": "Composition",
      "reason": "Raised product surfaces provide tactility without relying on shadow to communicate price or state."
    },
    {
      "decision": "Material and geometry",
      "reason": "Soft extruded controls that share their background while retaining recognizable affordances."
    },
    {
      "decision": "Reading and interaction",
      "reason": "Use a narrow range of surfaces; distinguish controls with paired shadows and a visible focus boundary. Pressed controls move to an inset surface; preserve an explicit selected label."
    }
  ]
}
;
