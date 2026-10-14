import type { DesignExample } from '../shared/types';
export const example: DesignExample = {
  "id": "neumorphism-listening-planner",
  "styleId": "neumorphism",
  "name": "resonant · planner",
  "brand": "resonant",
  "kind": "planner",
  "headline": "Make room for a softer rhythm.",
  "description": "A listening and reflection space for arranging a calmer part of your day.",
  "action": "Make a little progress",
  "colors": {
    "canvas": "#E4E8ED",
    "surface": "#E4E8ED",
    "accent": "#607796",
    "ink": "#29394D",
    "line": "#8293A8"
  },
  "fonts": {
    "heading": "Nunito",
    "body": "Inter"
  },
  "items": [
    {
      "title": "Choose the morning playlist",
      "detail": "Start small and give it your attention.",
      "label": "Today"
    },
    {
      "title": "Take a screen-free break",
      "detail": "A little space for the next useful step.",
      "label": "This week"
    },
    {
      "title": "Write a closing thought",
      "detail": "Leave a note about what worked.",
      "label": "Reflection"
    }
  ],
  "anatomy": [
    {
      "decision": "Composition",
      "reason": "Paired shadows suggest physical controls while labels and focus borders show their meaning."
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
