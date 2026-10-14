---
name: designkit-neo-brutalism
description: "Apply or review Neo-brutalism for a requested website or interface. Use when the user chooses Neo-brutalism and needs a coherent visual direction, relevant examples, or reusable React patterns."
license: MIT
metadata:
  version: "2.0.0"
---

# Neo-brutalism with DesignKit

Heavy outlines and hard shadows give ordinary controls poster-like presence.

Use this direction to support the user's actual project, content, and chosen stack. It is not a requirement to reproduce a particular example or replace existing working interactions.

## Apply the direction

- Read [the style reference](references/style.md) for its composition, materials, useful decisions, and common mistakes.
- Choose a relevant project context from the examples below. Read only its reference and inspect its implementation when it helps the task. When image viewing is available, inspect the linked desktop and phone screenshots for its hierarchy, composition, and materials. You can compose another context using the same principles.
- When using the React assets, copy the chosen entry folder with assets/shared and preserve their relative structure. Adapt the example data to the user's content; replace local demo state with required project behavior.
- For another stack, translate the tokens, hierarchy, material, and interaction decisions into that stack rather than introducing React.
- Preserve suitable fonts, components, and conventions in an existing project. Make a change when it materially supports this direction, not simply because a kit contains an alternative.

## Example contexts

- **LOUD® (studio)**: [reference](references/examples/neo-brutalism-creative-studio.md), [React entry](assets/neo-brutalism-creative-studio/ExampleApp.tsx), [desktop reference](assets/shared/previews/neo-brutalism-creative-studio-desktop.webp), [phone reference](assets/shared/previews/neo-brutalism-creative-studio-mobile.webp).
- **Elsewhere press (shop)**: [reference](references/examples/neo-brutalism-print-shop.md), [React entry](assets/neo-brutalism-print-shop/ExampleApp.tsx), [desktop reference](assets/shared/previews/neo-brutalism-print-shop-desktop.webp), [phone reference](assets/shared/previews/neo-brutalism-print-shop-mobile.webp).
- **GOOD NOISE (event)**: [reference](references/examples/neo-brutalism-music-weekender.md), [React entry](assets/neo-brutalism-music-weekender/ExampleApp.tsx), [desktop reference](assets/shared/previews/neo-brutalism-music-weekender-desktop.webp), [phone reference](assets/shared/previews/neo-brutalism-music-weekender-mobile.webp).

## Evaluate the result

Check that heavy outlines, hard shadows, loud contrast, direct typography are expressed coherently. Build a blunt graphic hierarchy with thick rules, one oversized headline, and hard-edged panels. A pressed control moves into its offset shadow immediately; navigation stays direct.

Review the actual rendered phone and desktop layouts, text contrast, focus order, native control affordances, relevant empty/error/loading states, and reduced-motion behavior. State what was checked and what remains unverified. Do not claim visual fidelity or accessibility from a successful build alone.

Keep font licenses with redistributed assets. This skill supplies design guidance and local source; it does not authorize publishing, installations, or changes to unrelated project settings.
