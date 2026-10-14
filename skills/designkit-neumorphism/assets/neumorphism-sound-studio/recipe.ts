import type { StyleRecipe } from '../shared/types';
export const recipe: StyleRecipe = {
  "colors": {
    "canvas": "#E4E8ED",
    "surface": "#E4E8ED",
    "accent": "#607796",
    "ink": "#29394D",
    "line": "#8293A8"
  },
  "radius": 24,
  "border": 1,
  "shadow": "inset",
  "texture": "none",
  "composition": "Use a narrow range of surfaces; distinguish controls with paired shadows and a visible focus boundary.",
  "motion": "Pressed controls move to an inset surface; preserve an explicit selected label.",
  "signature": "Soft extruded controls that share their background while retaining recognizable affordances.",
  "controls": {
    "radius": [
      0,
      48
    ],
    "shadow": true,
    "spacing": [
      16,
      40
    ]
  }
}
;
