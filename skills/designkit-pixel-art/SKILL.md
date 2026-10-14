---
name: designkit-pixel-art
description: "Apply or review Pixel art for a requested website or interface. Use when the user chooses Pixel art and needs a coherent visual direction, relevant examples, or reusable React patterns."
license: MIT
metadata:
  version: "2.0.0"
---

# Pixel art with DesignKit

Pixel-aligned forms and nostalgic game language with modern interaction clarity.

Use this direction to support the user's actual project, content, and chosen stack. It is not a requirement to reproduce a particular example or replace existing working interactions.

## Apply the direction

- Read [the style reference](references/style.md) for its composition, materials, useful decisions, and common mistakes.
- Choose a relevant project context from the examples below. Read only its reference and inspect its implementation when it helps the task. When image viewing is available, inspect the linked desktop and phone screenshots for its hierarchy, composition, and materials. You can compose another context using the same principles.
- When using the React assets, copy the chosen entry folder with assets/shared and preserve their relative structure. Adapt the example data to the user's content; replace local demo state with required project behavior.
- For another stack, translate the tokens, hierarchy, material, and interaction decisions into that stack rather than introducing React.
- Preserve suitable fonts, components, and conventions in an existing project. Make a change when it materially supports this direction, not simply because a kit contains an alternative.

## Example contexts

- **SIDEQUEST (event)**: [reference](references/examples/pixel-art-game-festival.md), [React entry](assets/pixel-art-game-festival/ExampleApp.tsx), [desktop reference](assets/shared/previews/pixel-art-game-festival-desktop.webp), [phone reference](assets/shared/previews/pixel-art-game-festival-mobile.webp).
- **CHECKPOINT (planner)**: [reference](references/examples/pixel-art-quest-planner.md), [React entry](assets/pixel-art-quest-planner/ExampleApp.tsx), [desktop reference](assets/shared/previews/pixel-art-quest-planner-desktop.webp), [phone reference](assets/shared/previews/pixel-art-quest-planner-mobile.webp).
- **8-bit supply (shop)**: [reference](references/examples/pixel-art-game-merch-shop.md), [React entry](assets/pixel-art-game-merch-shop/ExampleApp.tsx), [desktop reference](assets/shared/previews/pixel-art-game-merch-shop-desktop.webp), [phone reference](assets/shared/previews/pixel-art-game-merch-shop-mobile.webp).

## Evaluate the result

Check that crisp pixels, limited palettes, grid-built icons, stepped edges are expressed coherently. Work with block geometry, crisp edges, and a coarse rhythm; pair pixel display lettering with readable body text. Use discrete state changes rather than flickering sprites; never communicate a state through animation alone.

Review the actual rendered phone and desktop layouts, text contrast, focus order, native control affordances, relevant empty/error/loading states, and reduced-motion behavior. State what was checked and what remains unverified. Do not claim visual fidelity or accessibility from a successful build alone.

Keep font licenses with redistributed assets. This skill supplies design guidance and local source; it does not authorize publishing, installations, or changes to unrelated project settings.
