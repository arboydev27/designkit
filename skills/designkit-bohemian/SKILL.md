---
name: designkit-bohemian
description: "Apply or review Bohemian for a requested website or interface. Use when the user chooses Bohemian and needs a coherent visual direction, relevant examples, or reusable React patterns."
license: MIT
metadata:
  version: "2.0.0"
---

# Bohemian with DesignKit

Earth-made color, eclectic craft, and organic silhouettes used with restraint.

Use this direction to support the user's actual project, content, and chosen stack. It is not a requirement to reproduce a particular example or replace existing working interactions.

## Apply the direction

- Read [the style reference](references/style.md) for its composition, materials, useful decisions, and common mistakes.
- Choose a relevant project context from the examples below. Read only its reference and inspect its implementation when it helps the task. When image viewing is available, inspect the linked desktop and phone screenshots for its hierarchy, composition, and materials. You can compose another context using the same principles.
- When using the React assets, copy the chosen entry folder with assets/shared and preserve their relative structure. Adapt the example data to the user's content; replace local demo state with required project behavior.
- For another stack, translate the tokens, hierarchy, material, and interaction decisions into that stack rather than introducing React.
- Preserve suitable fonts, components, and conventions in an existing project. Make a change when it materially supports this direction, not simply because a kit contains an alternative.

## Example contexts

- **sol & luna (shop)**: [reference](references/examples/bohemian-crafted-shop.md), [React entry](assets/bohemian-crafted-shop/ExampleApp.tsx), [desktop reference](assets/shared/previews/bohemian-crafted-shop-desktop.webp), [phone reference](assets/shared/previews/bohemian-crafted-shop-mobile.webp).
- **WANDER NOTES (journal)**: [reference](references/examples/bohemian-travel-journal.md), [React entry](assets/bohemian-travel-journal/ExampleApp.tsx), [desktop reference](assets/shared/previews/bohemian-travel-journal-desktop.webp), [phone reference](assets/shared/previews/bohemian-travel-journal-mobile.webp).
- **desert house (event)**: [reference](references/examples/bohemian-creative-retreat.md), [React entry](assets/bohemian-creative-retreat/ExampleApp.tsx), [desktop reference](assets/shared/previews/bohemian-creative-retreat-desktop.webp), [phone reference](assets/shared/previews/bohemian-creative-retreat-mobile.webp).

## Evaluate the result

Check that warm pigments, textile textures, eclectic layers, organic shapes are expressed coherently. Build a collected composition using warm materials, organic arches, and a few handmade details. Use brief press feedback; tactile patterns stay still behind text.

Review the actual rendered phone and desktop layouts, text contrast, focus order, native control affordances, relevant empty/error/loading states, and reduced-motion behavior. State what was checked and what remains unverified. Do not claim visual fidelity or accessibility from a successful build alone.

Keep font licenses with redistributed assets. This skill supplies design guidance and local source; it does not authorize publishing, installations, or changes to unrelated project settings.
