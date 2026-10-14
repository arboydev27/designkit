---
name: designkit-y2k
description: "Apply or review Y2K aesthetic for a requested website or interface. Use when the user chooses Y2K aesthetic and needs a coherent visual direction, relevant examples, or reusable React patterns."
license: MIT
metadata:
  version: "2.0.0"
---

# Y2K aesthetic with DesignKit

Glossy pop shapes, early-digital optimism, and deliberate kitsch.

Use this direction to support the user's actual project, content, and chosen stack. It is not a requirement to reproduce a particular example or replace existing working interactions.

## Apply the direction

- Read [the style reference](references/style.md) for its composition, materials, useful decisions, and common mistakes.
- Choose a relevant project context from the examples below. Read only its reference and inspect its implementation when it helps the task. When image viewing is available, inspect the linked desktop and phone screenshots for its hierarchy, composition, and materials. You can compose another context using the same principles.
- When using the React assets, copy the chosen entry folder with assets/shared and preserve their relative structure. Adapt the example data to the user's content; replace local demo state with required project behavior.
- For another stack, translate the tokens, hierarchy, material, and interaction decisions into that stack rather than introducing React.
- Preserve suitable fonts, components, and conventions in an existing project. Make a change when it materially supports this direction, not simply because a kit contains an alternative.

## Example contexts

- **gloss.exe (shop)**: [reference](references/examples/y2k-accessory-shop.md), [React entry](assets/y2k-accessory-shop/ExampleApp.tsx), [desktop reference](assets/shared/previews/y2k-accessory-shop-desktop.webp), [phone reference](assets/shared/previews/y2k-accessory-shop-mobile.webp).
- **AFTERGLOW (event)**: [reference](references/examples/y2k-pop-night.md), [React entry](assets/y2k-pop-night/ExampleApp.tsx), [desktop reference](assets/shared/previews/y2k-pop-night-desktop.webp), [phone reference](assets/shared/previews/y2k-pop-night-mobile.webp).
- **orbit club (journal)**: [reference](references/examples/y2k-culture-zine.md), [React entry](assets/y2k-culture-zine/ExampleApp.tsx), [desktop reference](assets/shared/previews/y2k-culture-zine-desktop.webp), [phone reference](assets/shared/previews/y2k-culture-zine-mobile.webp).

## Evaluate the result

Check that glossy finishes, chrome details, bubble forms, digital nostalgia are expressed coherently. Pair inflated or chrome-like shapes with compact product panels and playful display type. Short shine or press feedback is optional; keep chrome effects static under reduced motion.

Review the actual rendered phone and desktop layouts, text contrast, focus order, native control affordances, relevant empty/error/loading states, and reduced-motion behavior. State what was checked and what remains unverified. Do not claim visual fidelity or accessibility from a successful build alone.

Keep font licenses with redistributed assets. This skill supplies design guidance and local source; it does not authorize publishing, installations, or changes to unrelated project settings.
