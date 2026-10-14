import type { DesignExample } from '../shared/types';
export const example: DesignExample = {
  "id": "glassmorphism-research-library",
  "styleId": "glassmorphism",
  "name": "orbital library · archive",
  "brand": "orbital library",
  "kind": "archive",
  "headline": "Keep your thinking in orbit.",
  "description": "An organized collection of notes, experiments, and references for the next good idea.",
  "action": "Browse the archive",
  "colors": {
    "canvas": "#E2EDF4",
    "surface": "#F2F8FD",
    "accent": "#3F7396",
    "ink": "#253D50",
    "line": "#809CAE"
  },
  "fonts": {
    "heading": "Syne",
    "body": "Inter"
  },
  "items": [
    {
      "title": "Light as a material",
      "detail": "An illustrated working reference.",
      "label": "Reference"
    },
    {
      "title": "Interfaces with depth",
      "detail": "Notes, patterns, and useful experiments.",
      "label": "Experiment"
    },
    {
      "title": "A field guide to focus",
      "detail": "A closer look at an underlying idea.",
      "label": "Guide"
    }
  ],
  "anatomy": [
    {
      "decision": "Composition",
      "reason": "A searchable archive shows how translucency can support an information-heavy interface."
    },
    {
      "decision": "Material and geometry",
      "reason": "Frosted layers, restrained highlights, and a scene that remains visible behind them."
    },
    {
      "decision": "Reading and interaction",
      "reason": "Layer a few translucent panels above a visible scene; keep text on a reliable reading surface. Short opacity and position changes describe depth; provide solid surfaces when transparency is reduced."
    }
  ]
}
;
