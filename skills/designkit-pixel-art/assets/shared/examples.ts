import type { DesignExample } from './types';
export const examples: DesignExample[] = [
  {
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
  },
  {
    "id": "pixel-art-quest-planner",
    "styleId": "pixel-art",
    "name": "CHECKPOINT · planner",
    "brand": "CHECKPOINT",
    "kind": "planner",
    "headline": "One good quest at a time.",
    "description": "Break your project into small missions and keep track of what actually moved forward.",
    "action": "Make a little progress",
    "colors": {
      "canvas": "#F3EBC9",
      "surface": "#DFD89E",
      "accent": "#A55666",
      "ink": "#343149",
      "line": "#343149"
    },
    "fonts": {
      "heading": "Press Start 2P",
      "body": "Space Mono"
    },
    "items": [
      {
        "title": "Explore the problem",
        "detail": "Start small and give it your attention.",
        "label": "Today"
      },
      {
        "title": "Craft the first version",
        "detail": "A little space for the next useful step.",
        "label": "This week"
      },
      {
        "title": "Save your progress",
        "detail": "Leave a note about what worked.",
        "label": "Reflection"
      }
    ],
    "anatomy": [
      {
        "decision": "Composition",
        "reason": "Pixel geometry frames ordinary tasks; a readable body face carries longer instructions."
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
  },
  {
    "id": "pixel-art-game-merch-shop",
    "styleId": "pixel-art",
    "name": "8-bit supply · shop",
    "brand": "8-bit supply",
    "kind": "shop",
    "headline": "Equip your everyday.",
    "description": "Small-run prints and objects inspired by worlds built one square at a time.",
    "action": "Explore the collection",
    "colors": {
      "canvas": "#1D2A35",
      "surface": "#2C4250",
      "accent": "#98C7C0",
      "ink": "#E7F4EC",
      "line": "#89A6A9"
    },
    "fonts": {
      "heading": "Press Start 2P",
      "body": "Space Mono"
    },
    "items": [
      {
        "title": "Adventure map print",
        "detail": "A small edition, made with care.",
        "label": "$36"
      },
      {
        "title": "Potion enamel pin",
        "detail": "A useful companion for everyday rituals.",
        "label": "$48"
      },
      {
        "title": "Save point notebook",
        "detail": "A little character for your own space.",
        "label": "$24"
      }
    ],
    "anatomy": [
      {
        "decision": "Composition",
        "reason": "A crisp product grid prevents nostalgic display type from taking over every detail."
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
]
;
