---
name: designkit-synthwave
description: "Apply or review Synthwave for a requested website or interface. Use when the user chooses Synthwave and needs a coherent visual direction, relevant examples, or reusable React patterns."
license: MIT
metadata:
  version: "2.0.0"
---

# Synthwave with DesignKit

Retro-futurist horizons, luminous accent lines, and cinematic contrast.

Use this direction to support the user's actual project, content, and chosen stack. It is not a requirement to reproduce a particular example or replace existing working interactions.

## Apply the direction

- Read [the style reference](references/style.md) for its composition, materials, useful decisions, and common mistakes.
- Choose a relevant project context from the examples below. Read only its reference and inspect its implementation when it helps the task. When image viewing is available, inspect the linked desktop and phone screenshots for its hierarchy, composition, and materials. You can compose another context using the same principles.
- When using the React assets, copy the chosen entry folder with assets/shared and preserve their relative structure. Adapt the example data to the user's content; replace local demo state with required project behavior.
- For another stack, translate the tokens, hierarchy, material, and interaction decisions into that stack rather than introducing React.
- Preserve suitable fonts, components, and conventions in an existing project. Make a change when it materially supports this direction, not simply because a kit contains an alternative.

## Example contexts

- **NIGHTDRIVE (event)**: [reference](references/examples/synthwave-music-night.md), [React entry](assets/synthwave-music-night/ExampleApp.tsx), [desktop reference](assets/shared/previews/synthwave-music-night-desktop.webp), [phone reference](assets/shared/previews/synthwave-music-night-mobile.webp).
- **tape deck (shop)**: [reference](references/examples/synthwave-record-shop.md), [React entry](assets/synthwave-record-shop/ExampleApp.tsx), [desktop reference](assets/shared/previews/synthwave-record-shop-desktop.webp), [phone reference](assets/shared/previews/synthwave-record-shop-mobile.webp).
- **AFTER HOURS (journal)**: [reference](references/examples/synthwave-music-journal.md), [React entry](assets/synthwave-music-journal/ExampleApp.tsx), [desktop reference](assets/shared/previews/synthwave-music-journal-desktop.webp), [phone reference](assets/shared/previews/synthwave-music-journal-mobile.webp).

## Evaluate the result

Check that neon horizons, perspective grids, sunset gradients, retro futurism are expressed coherently. Set a horizon-like visual behind a clear foreground panel; use a limited pink-violet spectrum. Static horizons preserve the mood; keep interaction feedback brief and avoid flashing neon.

Review the actual rendered phone and desktop layouts, text contrast, focus order, native control affordances, relevant empty/error/loading states, and reduced-motion behavior. State what was checked and what remains unverified. Do not claim visual fidelity or accessibility from a successful build alone.

Keep font licenses with redistributed assets. This skill supplies design guidance and local source; it does not authorize publishing, installations, or changes to unrelated project settings.
