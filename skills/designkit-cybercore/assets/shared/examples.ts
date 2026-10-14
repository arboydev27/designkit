import type { DesignExample } from './types';
export const examples: DesignExample[] = [
  {
    "id": "cybercore-systems-archive",
    "styleId": "cybercore",
    "name": "SYS.01 · archive",
    "brand": "SYS.01",
    "kind": "archive",
    "headline": "Find the signal in the system.",
    "description": "A searchable archive of experiments in tools, networks, and human-machine collaboration.",
    "action": "Browse the archive",
    "colors": {
      "canvas": "#121B17",
      "surface": "#1D2B23",
      "accent": "#C3F85C",
      "ink": "#E9F5DC",
      "line": "#80936D"
    },
    "fonts": {
      "heading": "Space Grotesk",
      "body": "IBM Plex Mono"
    },
    "items": [
      {
        "title": "Protocols for public tools",
        "detail": "An illustrated working reference.",
        "label": "Reference"
      },
      {
        "title": "The open hardware notebook",
        "detail": "Notes, patterns, and useful experiments.",
        "label": "Experiment"
      },
      {
        "title": "Signals from the edge",
        "detail": "A closer look at an underlying idea.",
        "label": "Guide"
      }
    ],
    "anatomy": [
      {
        "decision": "Composition",
        "reason": "Terminal labels and modular records give the archive a technical but readable structure."
      },
      {
        "decision": "Material and geometry",
        "reason": "Terminal-like modularity, acid contrast, and purposeful technical annotations."
      },
      {
        "decision": "Reading and interaction",
        "reason": "Use modular terminal panels and technical typography; group dense information with consistent alignment. Use immediate status updates and a brief focus highlight; do not flicker text or simulate failures."
      }
    ]
  },
  {
    "id": "cybercore-build-planner",
    "styleId": "cybercore",
    "name": "NODE · planner",
    "brand": "NODE",
    "kind": "planner",
    "headline": "Route your next experiment.",
    "description": "A local planning console for the tasks, notes, and decisions behind your next build.",
    "action": "Make a little progress",
    "colors": {
      "canvas": "#151A24",
      "surface": "#242E3E",
      "accent": "#9CBFD5",
      "ink": "#EBF2F8",
      "line": "#8196B5"
    },
    "fonts": {
      "heading": "Space Mono",
      "body": "IBM Plex Mono"
    },
    "items": [
      {
        "title": "Map the input",
        "detail": "Start small and give it your attention.",
        "label": "Today"
      },
      {
        "title": "Build the smallest circuit",
        "detail": "A little space for the next useful step.",
        "label": "This week"
      },
      {
        "title": "Record what changed",
        "detail": "Leave a note about what worked.",
        "label": "Reflection"
      }
    ],
    "anatomy": [
      {
        "decision": "Composition",
        "reason": "Explicit task states make the technical appearance functional rather than decorative."
      },
      {
        "decision": "Material and geometry",
        "reason": "Terminal-like modularity, acid contrast, and purposeful technical annotations."
      },
      {
        "decision": "Reading and interaction",
        "reason": "Use modular terminal panels and technical typography; group dense information with consistent alignment. Use immediate status updates and a brief focus highlight; do not flicker text or simulate failures."
      }
    ]
  },
  {
    "id": "cybercore-creative-coding-meetup",
    "styleId": "cybercore",
    "name": "KERNEL assembly · event",
    "brand": "KERNEL assembly",
    "kind": "event",
    "headline": "People. Machines. Possibilities.",
    "description": "A gathering for creative coders, tool builders, and people curious about the space between.",
    "action": "Explore the programme",
    "colors": {
      "canvas": "#1E1914",
      "surface": "#332B20",
      "accent": "#D9B878",
      "ink": "#F8ECD5",
      "line": "#A38D65"
    },
    "fonts": {
      "heading": "IBM Plex Mono",
      "body": "IBM Plex Mono"
    },
    "items": [
      {
        "title": "Interfaces after the screen",
        "detail": "A conversation to begin the gathering.",
        "label": "10:00"
      },
      {
        "title": "Tools we can repair",
        "detail": "Time to make, listen, and try something.",
        "label": "13:00"
      },
      {
        "title": "Open systems lab",
        "detail": "Bring the day's ideas together.",
        "label": "16:00"
      }
    ],
    "anatomy": [
      {
        "decision": "Composition",
        "reason": "A modular timetable demonstrates technical density while preserving the reading order."
      },
      {
        "decision": "Material and geometry",
        "reason": "Terminal-like modularity, acid contrast, and purposeful technical annotations."
      },
      {
        "decision": "Reading and interaction",
        "reason": "Use modular terminal panels and technical typography; group dense information with consistent alignment. Use immediate status updates and a brief focus highlight; do not flicker text or simulate failures."
      }
    ]
  }
]
;
