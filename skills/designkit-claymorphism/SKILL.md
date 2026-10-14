---
name: designkit-claymorphism
description: "Apply or review Claymorphism for a requested website or interface. Use when the user chooses Claymorphism and needs a coherent visual direction, relevant examples, or reusable React patterns."
license: MIT
metadata:
  version: "2.0.0"
---

# Claymorphism with DesignKit

Puffy rounded surfaces and soft shadows with crisp, readable labels.

Use this direction to support the user's actual project, content, and chosen stack. It is not a requirement to reproduce a particular example or replace existing working interactions.

## Apply the direction

- Read [the style reference](references/style.md) for its composition, materials, useful decisions, and common mistakes.
- Choose a relevant project context from the examples below. Read only its reference and inspect its implementation when it helps the task. When image viewing is available, inspect the linked desktop and phone screenshots for its hierarchy, composition, and materials. You can compose another context using the same principles.
- When using the React assets, copy the chosen entry folder with assets/shared and preserve their relative structure. Adapt the example data to the user's content; replace local demo state with required project behavior.
- For another stack, translate the tokens, hierarchy, material, and interaction decisions into that stack rather than introducing React.
- Preserve suitable fonts, components, and conventions in an existing project. Make a change when it materially supports this direction, not simply because a kit contains an alternative.

## Example contexts

- **poppy (planner)**: [reference](references/examples/claymorphism-habit-planner.md), [React entry](assets/claymorphism-habit-planner/ExampleApp.tsx), [desktop reference](assets/shared/previews/claymorphism-habit-planner-desktop.webp), [phone reference](assets/shared/previews/claymorphism-habit-planner-mobile.webp).
- **pebble objects (shop)**: [reference](references/examples/claymorphism-desk-shop.md), [React entry](assets/claymorphism-desk-shop/ExampleApp.tsx), [desktop reference](assets/shared/previews/claymorphism-desk-shop-desktop.webp), [phone reference](assets/shared/previews/claymorphism-desk-shop-mobile.webp).
- **playdate (event)**: [reference](references/examples/claymorphism-making-workshop.md), [React entry](assets/claymorphism-making-workshop/ExampleApp.tsx), [desktop reference](assets/shared/previews/claymorphism-making-workshop-desktop.webp), [phone reference](assets/shared/previews/claymorphism-making-workshop-mobile.webp).

## Evaluate the result

Check that rounded volume, matte surfaces, soft shadows, friendly colors are expressed coherently. Use rounded, inflated forms as a few friendly anchors, with open space around text and controls. A short, critically damped press response suggests softness; reduce it to color feedback when requested.

Review the actual rendered phone and desktop layouts, text contrast, focus order, native control affordances, relevant empty/error/loading states, and reduced-motion behavior. State what was checked and what remains unverified. Do not claim visual fidelity or accessibility from a successful build alone.

Keep font licenses with redistributed assets. This skill supplies design guidance and local source; it does not authorize publishing, installations, or changes to unrelated project settings.
