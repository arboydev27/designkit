---
name: designkit-glassmorphism
description: "Apply or review Glassmorphism for a requested website or interface. Use when the user chooses Glassmorphism and needs a coherent visual direction, relevant examples, or reusable React patterns."
license: MIT
metadata:
  version: "2.0.0"
---

# Glassmorphism with DesignKit

Frosted layers, restrained highlights, and a scene that remains visible behind them.

Use this direction to support the user's actual project, content, and chosen stack. It is not a requirement to reproduce a particular example or replace existing working interactions.

## Apply the direction

- Read [the style reference](references/style.md) for its composition, materials, useful decisions, and common mistakes.
- Choose a relevant project context from the examples below. Read only its reference and inspect its implementation when it helps the task. When image viewing is available, inspect the linked desktop and phone screenshots for its hierarchy, composition, and materials. You can compose another context using the same principles.
- When using the React assets, copy the chosen entry folder with assets/shared and preserve their relative structure. Adapt the example data to the user's content; replace local demo state with required project behavior.
- For another stack, translate the tokens, hierarchy, material, and interaction decisions into that stack rather than introducing React.
- Preserve suitable fonts, components, and conventions in an existing project. Make a change when it materially supports this direction, not simply because a kit contains an alternative.

## Example contexts

- **aura (planner)**: [reference](references/examples/glassmorphism-focus-app.md), [React entry](assets/glassmorphism-focus-app/ExampleApp.tsx), [desktop reference](assets/shared/previews/glassmorphism-focus-app-desktop.webp), [phone reference](assets/shared/previews/glassmorphism-focus-app-mobile.webp).
- **prism practice (studio)**: [reference](references/examples/glassmorphism-digital-studio.md), [React entry](assets/glassmorphism-digital-studio/ExampleApp.tsx), [desktop reference](assets/shared/previews/glassmorphism-digital-studio-desktop.webp), [phone reference](assets/shared/previews/glassmorphism-digital-studio-mobile.webp).
- **orbital library (archive)**: [reference](references/examples/glassmorphism-research-library.md), [React entry](assets/glassmorphism-research-library/ExampleApp.tsx), [desktop reference](assets/shared/previews/glassmorphism-research-library-desktop.webp), [phone reference](assets/shared/previews/glassmorphism-research-library-mobile.webp).

## Evaluate the result

Check that frosted panels, translucent layers, fine highlights, luminous gradients are expressed coherently. Layer a few translucent panels above a visible scene; keep text on a reliable reading surface. Short opacity and position changes describe depth; provide solid surfaces when transparency is reduced.

Review the actual rendered phone and desktop layouts, text contrast, focus order, native control affordances, relevant empty/error/loading states, and reduced-motion behavior. State what was checked and what remains unverified. Do not claim visual fidelity or accessibility from a successful build alone.

Keep font licenses with redistributed assets. This skill supplies design guidance and local source; it does not authorize publishing, installations, or changes to unrelated project settings.
