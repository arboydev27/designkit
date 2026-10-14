---
name: designkit-conceptual-sketch
description: "Apply or review Conceptual sketch for a requested website or interface. Use when the user chooses Conceptual sketch and needs a coherent visual direction, relevant examples, or reusable React patterns."
license: MIT
metadata:
  version: "2.0.0"
---

# Conceptual sketch with DesignKit

Visible thinking, hand-drawn framing, and an approachable workshop atmosphere.

Use this direction to support the user's actual project, content, and chosen stack. It is not a requirement to reproduce a particular example or replace existing working interactions.

## Apply the direction

- Read [the style reference](references/style.md) for its composition, materials, useful decisions, and common mistakes.
- Choose a relevant project context from the examples below. Read only its reference and inspect its implementation when it helps the task. When image viewing is available, inspect the linked desktop and phone screenshots for its hierarchy, composition, and materials. You can compose another context using the same principles.
- When using the React assets, copy the chosen entry folder with assets/shared and preserve their relative structure. Adapt the example data to the user's content; replace local demo state with required project behavior.
- For another stack, translate the tokens, hierarchy, material, and interaction decisions into that stack rather than introducing React.
- Preserve suitable fonts, components, and conventions in an existing project. Make a change when it materially supports this direction, not simply because a kit contains an alternative.

## Example contexts

- **rough ideas (studio)**: [reference](references/examples/conceptual-sketch-creative-practice.md), [React entry](assets/conceptual-sketch-creative-practice/ExampleApp.tsx), [desktop reference](assets/shared/previews/conceptual-sketch-creative-practice-desktop.webp), [phone reference](assets/shared/previews/conceptual-sketch-creative-practice-mobile.webp).
- **FIELDNOTES (planner)**: [reference](references/examples/conceptual-sketch-project-notebook.md), [React entry](assets/conceptual-sketch-project-notebook/ExampleApp.tsx), [desktop reference](assets/shared/previews/conceptual-sketch-project-notebook-desktop.webp), [phone reference](assets/shared/previews/conceptual-sketch-project-notebook-mobile.webp).
- **the draft room (journal)**: [reference](references/examples/conceptual-sketch-process-journal.md), [React entry](assets/conceptual-sketch-process-journal/ExampleApp.tsx), [desktop reference](assets/shared/previews/conceptual-sketch-process-journal-desktop.webp), [phone reference](assets/shared/previews/conceptual-sketch-process-journal-mobile.webp).

## Evaluate the result

Check that hand-drawn lines, visible annotations, rough diagrams, paper surfaces are expressed coherently. Use imperfect drawn boundaries and annotations around a clear conceptual structure. Make editing immediate; let line-like accents remain still rather than repeatedly drawing themselves.

Review the actual rendered phone and desktop layouts, text contrast, focus order, native control affordances, relevant empty/error/loading states, and reduced-motion behavior. State what was checked and what remains unverified. Do not claim visual fidelity or accessibility from a successful build alone.

Keep font licenses with redistributed assets. This skill supplies design guidance and local source; it does not authorize publishing, installations, or changes to unrelated project settings.
