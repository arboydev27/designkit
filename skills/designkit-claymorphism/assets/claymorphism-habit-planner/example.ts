import type { DesignExample } from '../shared/types';
export const example: DesignExample = {
  "id": "claymorphism-habit-planner",
  "styleId": "claymorphism",
  "name": "poppy · planner",
  "brand": "poppy",
  "kind": "planner",
  "headline": "Small steps. Softer days.",
  "description": "Make room for a few good habits without turning your life into a performance chart.",
  "action": "Make a little progress",
  "colors": {
    "canvas": "#F6F0E8",
    "surface": "#E8DDF7",
    "accent": "#F2B783",
    "ink": "#392D47",
    "line": "#897399"
  },
  "fonts": {
    "heading": "Nunito",
    "body": "DM Sans"
  },
  "items": [
    {
      "title": "A glass of water",
      "detail": "Start small and give it your attention.",
      "label": "Today"
    },
    {
      "title": "Ten minutes outside",
      "detail": "A little space for the next useful step.",
      "label": "This week"
    },
    {
      "title": "Something just for you",
      "detail": "Leave a note about what worked.",
      "label": "Reflection"
    }
  ],
  "anatomy": [
    {
      "decision": "Composition",
      "reason": "Inflated task cards make completion feel friendly while checkboxes keep the state explicit."
    },
    {
      "decision": "Material and geometry",
      "reason": "Puffy rounded surfaces and soft shadows with crisp, readable labels."
    },
    {
      "decision": "Reading and interaction",
      "reason": "Use rounded, inflated forms as a few friendly anchors, with open space around text and controls. A short, critically damped press response suggests softness; reduce it to color feedback when requested."
    }
  ]
}
;
