---
name: designkit-maximalism
description: "Apply or review Maximalism for a requested website or interface. Use when the user chooses Maximalism and needs a coherent visual direction, relevant examples, or reusable React patterns."
license: MIT
metadata:
  version: "2.0.0"
---

# Maximalism with DesignKit

High visual density and eclectic contrast controlled by an unmistakable focal point.

Use this direction to support the user's actual project, content, and chosen stack. It is not a requirement to reproduce a particular example or replace existing working interactions.

## Apply the direction

- Read [the style reference](references/style.md) for its composition, materials, useful decisions, and common mistakes.
- Choose a relevant project context from the examples below. Read only its reference and inspect its implementation when it helps the task. When image viewing is available, inspect the linked desktop and phone screenshots for its hierarchy, composition, and materials. You can compose another context using the same principles.
- When using the React assets, copy the chosen entry folder with assets/shared and preserve their relative structure. Adapt the example data to the user's content; replace local demo state with required project behavior.
- For another stack, translate the tokens, hierarchy, material, and interaction decisions into that stack rather than introducing React.
- Preserve suitable fonts, components, and conventions in an existing project. Make a change when it materially supports this direction, not simply because a kit contains an alternative.

## Example contexts

- **MORE IS MORE® (event)**: [reference](references/examples/maximalism-creative-festival.md), [React entry](assets/maximalism-creative-festival/ExampleApp.tsx), [desktop reference](assets/shared/previews/maximalism-creative-festival-desktop.webp), [phone reference](assets/shared/previews/maximalism-creative-festival-mobile.webp).
- **ODD OBJECTS (shop)**: [reference](references/examples/maximalism-design-shop.md), [React entry](assets/maximalism-design-shop/ExampleApp.tsx), [desktop reference](assets/shared/previews/maximalism-design-shop-desktop.webp), [phone reference](assets/shared/previews/maximalism-design-shop-mobile.webp).
- **AMPLIFY (studio)**: [reference](references/examples/maximalism-creative-agency.md), [React entry](assets/maximalism-creative-agency/ExampleApp.tsx), [desktop reference](assets/shared/previews/maximalism-creative-agency-desktop.webp), [phone reference](assets/shared/previews/maximalism-creative-agency-mobile.webp).

## Evaluate the result

Check that layered patterns, bold color mixing, expressive type, visual abundance are expressed coherently. Give one loud message priority, then build a deliberate collage of type and shapes around it. Let explicit actions trigger brief feedback; multiple simultaneous loops would weaken the hierarchy.

Review the actual rendered phone and desktop layouts, text contrast, focus order, native control affordances, relevant empty/error/loading states, and reduced-motion behavior. State what was checked and what remains unverified. Do not claim visual fidelity or accessibility from a successful build alone.

Keep font licenses with redistributed assets. This skill supplies design guidance and local source; it does not authorize publishing, installations, or changes to unrelated project settings.
