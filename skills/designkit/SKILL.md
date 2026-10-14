---
name: designkit
description: Help choose a visual design direction for a website or interface using DesignKit's 22 original style references. Use for style discovery, comparing directions, or turning a project brief into a coherent design choice.
license: MIT
metadata:
  version: "2.0.0"
---

# Choose a direction with DesignKit

Read [the catalog](references/catalog.json) for available styles and project contexts. Match the user's audience, content, density, and interaction needs to a few relevant options. Explain the tradeoffs using concrete layout, typography, and material decisions rather than a vague mood label.

Respect an already-chosen style. Do not replace the user's project with a particular example, or treat a visual style as a mandatory page architecture.

For implementation, use the corresponding designkit-<style-id> skill when it is available, or retrieve that style's Markdown/JSON reference from https://designkit-vert.vercel.app/kits/styles/<style-id>.md. A style package includes three original React entrypoints, scoped CSS, tokens, and licensed fonts. Translate those principles if the project uses a different stack.

For a mixed direction, establish one primary system for layout and components. Treat secondary references as deliberate typography or material choices; do not randomly blend entire systems.

Review the rendered result against the actual brief, including phone layout, focus order, readable contrast, and reduced motion. Report only verified checks.

This skill supplies design references. It does not authorize external publishing, installing dependencies, or changes to unrelated settings.
