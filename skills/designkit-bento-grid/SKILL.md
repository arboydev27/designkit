---
name: designkit-bento-grid
description: "Apply or review Bento grid for a requested website or interface. Use when the user chooses Bento grid and needs a coherent visual direction, relevant examples, or reusable React patterns."
license: MIT
metadata:
  version: "2.0.0"
---

# Bento grid with DesignKit

Modular composition, varied tile scale, and a coherent palette across independent content.

Use this direction to support the user's actual project, content, and chosen stack. It is not a requirement to reproduce a particular example or replace existing working interactions.

## Apply the direction

- Read [the style reference](references/style.md) for its composition, materials, useful decisions, and common mistakes.
- Choose a relevant project context from the examples below. Read only its reference and inspect its implementation when it helps the task. When image viewing is available, inspect the linked desktop and phone screenshots for its hierarchy, composition, and materials. You can compose another context using the same principles.
- When using the React assets, copy the chosen entry folder with assets/shared and preserve their relative structure. Adapt the example data to the user's content; replace local demo state with required project behavior.
- For another stack, translate the tokens, hierarchy, material, and interaction decisions into that stack rather than introducing React.
- Preserve suitable fonts, components, and conventions in an existing project. Make a change when it materially supports this direction, not simply because a kit contains an alternative.

## Example contexts

- **orbit. (planner)**: [reference](references/examples/bento-grid-daily-planner.md), [React entry](assets/bento-grid-daily-planner/ExampleApp.tsx), [desktop reference](assets/shared/previews/bento-grid-daily-planner-desktop.webp), [phone reference](assets/shared/previews/bento-grid-daily-planner-mobile.webp).
- **STACK goods (shop)**: [reference](references/examples/bento-grid-object-shop.md), [React entry](assets/bento-grid-object-shop/ExampleApp.tsx), [desktop reference](assets/shared/previews/bento-grid-object-shop-desktop.webp), [phone reference](assets/shared/previews/bento-grid-object-shop-mobile.webp).
- **ASSEMBLY (studio)**: [reference](references/examples/bento-grid-digital-practice.md), [React entry](assets/bento-grid-digital-practice/ExampleApp.tsx), [desktop reference](assets/shared/previews/bento-grid-digital-practice-desktop.webp), [phone reference](assets/shared/previews/bento-grid-digital-practice-mobile.webp).

## Evaluate the result

Check that modular tiles, varied proportions, shared gutters, compact storytelling are expressed coherently. Use unequal modules in a stable grid; each tile has one purpose and a deliberate reading priority. Animate a changed tile's content rather than moving the entire grid.

Review the actual rendered phone and desktop layouts, text contrast, focus order, native control affordances, relevant empty/error/loading states, and reduced-motion behavior. State what was checked and what remains unverified. Do not claim visual fidelity or accessibility from a successful build alone.

Keep font licenses with redistributed assets. This skill supplies design guidance and local source; it does not authorize publishing, installations, or changes to unrelated project settings.
