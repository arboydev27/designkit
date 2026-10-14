import type { DesignExample } from './types';
export const examples: DesignExample[] = [
  {
    "id": "bento-grid-daily-planner",
    "styleId": "bento-grid",
    "name": "orbit. · planner",
    "brand": "orbit.",
    "kind": "planner",
    "headline": "Everything in its place.",
    "description": "A few useful modules for your tasks, notes, and the room you want to leave in your day.",
    "action": "Make a little progress",
    "colors": {
      "canvas": "#F6F5F0",
      "surface": "#DFD7F0",
      "accent": "#F0D47F",
      "ink": "#292830",
      "line": "#8C8598"
    },
    "fonts": {
      "heading": "DM Sans",
      "body": "Inter"
    },
    "items": [
      {
        "title": "The one thing for today",
        "detail": "Start small and give it your attention.",
        "label": "Today"
      },
      {
        "title": "A small project to finish",
        "detail": "A little space for the next useful step.",
        "label": "This week"
      },
      {
        "title": "Time for yourself",
        "detail": "Leave a note about what worked.",
        "label": "Reflection"
      }
    ],
    "anatomy": [
      {
        "decision": "Composition",
        "reason": "Unequal planning tiles have separate purposes while their controls stay aligned."
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
  },
  {
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
  },
  {
    "id": "bento-grid-digital-practice",
    "styleId": "bento-grid",
    "name": "ASSEMBLY · studio",
    "brand": "ASSEMBLY",
    "kind": "studio",
    "headline": "Good ideas work together.",
    "description": "A digital practice connecting research, identity, and useful interfaces into one considered whole.",
    "action": "Explore our work",
    "colors": {
      "canvas": "#EAF0F6",
      "surface": "#D5E4F1",
      "accent": "#A69BD1",
      "ink": "#343A52",
      "line": "#8790B3"
    },
    "fonts": {
      "heading": "Syne",
      "body": "Inter"
    },
    "items": [
      {
        "title": "An archive that invites discovery",
        "detail": "Identity, concept, and visual direction.",
        "label": "Identity"
      },
      {
        "title": "A tool for local makers",
        "detail": "Research shaped into a useful experience.",
        "label": "Digital"
      },
      {
        "title": "An identity in modules",
        "detail": "A considered system, made to grow.",
        "label": "Objects"
      }
    ],
    "anatomy": [
      {
        "decision": "Composition",
        "reason": "Different case-study formats fit together as an intentional modular composition."
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
]
;
