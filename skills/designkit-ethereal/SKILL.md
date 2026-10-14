---
name: designkit-ethereal
description: "Apply or review Ethereal for a requested website or interface. Use when the user chooses Ethereal and needs a coherent visual direction, relevant examples, or reusable React patterns."
license: MIT
metadata:
  version: "2.0.0"
---

# Ethereal with DesignKit

Light, delicate forms and gentle color transitions with readable text.

Use this direction to support the user's actual project, content, and chosen stack. It is not a requirement to reproduce a particular example or replace existing working interactions.

## Apply the direction

- Read [the style reference](references/style.md) for its composition, materials, useful decisions, and common mistakes.
- Choose a relevant project context from the examples below. Read only its reference and inspect its implementation when it helps the task. When image viewing is available, inspect the linked desktop and phone screenshots for its hierarchy, composition, and materials. You can compose another context using the same principles.
- When using the React assets, copy the chosen entry folder with assets/shared and preserve their relative structure. Adapt the example data to the user's content; replace local demo state with required project behavior.
- For another stack, translate the tokens, hierarchy, material, and interaction decisions into that stack rather than introducing React.
- Preserve suitable fonts, components, and conventions in an existing project. Make a change when it materially supports this direction, not simply because a kit contains an alternative.

## Example contexts

- **lumière (studio)**: [reference](references/examples/ethereal-wellness-practice.md), [React entry](assets/ethereal-wellness-practice/ExampleApp.tsx), [desktop reference](assets/shared/previews/ethereal-wellness-practice-desktop.webp), [phone reference](assets/shared/previews/ethereal-wellness-practice-mobile.webp).
- **DRIFT (planner)**: [reference](references/examples/ethereal-reflection-planner.md), [React entry](assets/ethereal-reflection-planner/ExampleApp.tsx), [desktop reference](assets/shared/previews/ethereal-reflection-planner-desktop.webp), [phone reference](assets/shared/previews/ethereal-reflection-planner-mobile.webp).
- **halo objects (shop)**: [reference](references/examples/ethereal-ritual-shop.md), [React entry](assets/ethereal-ritual-shop/ExampleApp.tsx), [desktop reference](assets/shared/previews/ethereal-ritual-shop-desktop.webp), [phone reference](assets/shared/previews/ethereal-ritual-shop-mobile.webp).

## Evaluate the result

Check that diffused light, airy spacing, soft gradients, delicate forms are expressed coherently. Use airy spacing and translucent light shapes, anchored by a high-contrast reading surface. Short fades preserve softness; omit drifting backgrounds and parallax.

Review the actual rendered phone and desktop layouts, text contrast, focus order, native control affordances, relevant empty/error/loading states, and reduced-motion behavior. State what was checked and what remains unverified. Do not claim visual fidelity or accessibility from a successful build alone.

Keep font licenses with redistributed assets. This skill supplies design guidance and local source; it does not authorize publishing, installations, or changes to unrelated project settings.
