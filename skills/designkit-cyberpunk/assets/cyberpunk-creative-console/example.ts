import type { DesignExample } from '../shared/types';
export const example: DesignExample = {
  "id": "cyberpunk-creative-console",
  "styleId": "cyberpunk",
  "name": "SECTOR 7 · planner",
  "brand": "SECTOR 7",
  "kind": "planner",
  "headline": "Keep the next move in sight.",
  "description": "A personal planning console for the experiments, projects, and ideas you want to bring into the world.",
  "action": "Make a little progress",
  "colors": {
    "canvas": "#251B2C",
    "surface": "#3D2C49",
    "accent": "#D5A8E6",
    "ink": "#F8EDF9",
    "line": "#AD86B6"
  },
  "fonts": {
    "heading": "Space Grotesk",
    "body": "IBM Plex Mono"
  },
  "items": [
    {
      "title": "Locate the useful signal",
      "detail": "Start small and give it your attention.",
      "label": "Today"
    },
    {
      "title": "Build the first prototype",
      "detail": "A little space for the next useful step.",
      "label": "This week"
    },
    {
      "title": "Record the next move",
      "detail": "Leave a note about what worked.",
      "label": "Reflection"
    }
  ],
  "anatomy": [
    {
      "decision": "Composition",
      "reason": "Task controls use explicit completion states rather than simulated warnings or glitches."
    },
    {
      "decision": "Material and geometry",
      "reason": "Dystopian contrast, angular surfaces, and an intentionally charged technical atmosphere."
    },
    {
      "decision": "Reading and interaction",
      "reason": "Use clipped corners, strong warning-like contrast, and technical alignment; retain an obvious reading path. Use immediate state feedback; avoid glitch loops, flashing text, and fake security alerts."
    }
  ]
}
;
