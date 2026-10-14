---
name: designkit-cyberpunk
description: "Apply or review Cyberpunk for a requested website or interface. Use when the user chooses Cyberpunk and needs a coherent visual direction, relevant examples, or reusable React patterns."
license: MIT
metadata:
  version: "2.0.0"
---

# Cyberpunk with DesignKit

Dystopian contrast, angular surfaces, and an intentionally charged technical atmosphere.

Use this direction to support the user's actual project, content, and chosen stack. It is not a requirement to reproduce a particular example or replace existing working interactions.

## Apply the direction

- Read [the style reference](references/style.md) for its composition, materials, useful decisions, and common mistakes.
- Choose a relevant project context from the examples below. Read only its reference and inspect its implementation when it helps the task. When image viewing is available, inspect the linked desktop and phone screenshots for its hierarchy, composition, and materials. You can compose another context using the same principles.
- When using the React assets, copy the chosen entry folder with assets/shared and preserve their relative structure. Adapt the example data to the user's content; replace local demo state with required project behavior.
- For another stack, translate the tokens, hierarchy, material, and interaction decisions into that stack rather than introducing React.
- Preserve suitable fonts, components, and conventions in an existing project. Make a change when it materially supports this direction, not simply because a kit contains an alternative.

## Example contexts

- **NØ SIGNAL (event)**: [reference](references/examples/cyberpunk-night-festival.md), [React entry](assets/cyberpunk-night-festival/ExampleApp.tsx), [desktop reference](assets/shared/previews/cyberpunk-night-festival-desktop.webp), [phone reference](assets/shared/previews/cyberpunk-night-festival-mobile.webp).
- **NIGHT MARKET (shop)**: [reference](references/examples/cyberpunk-streetwear-shop.md), [React entry](assets/cyberpunk-streetwear-shop/ExampleApp.tsx), [desktop reference](assets/shared/previews/cyberpunk-streetwear-shop-desktop.webp), [phone reference](assets/shared/previews/cyberpunk-streetwear-shop-mobile.webp).
- **SECTOR 7 (planner)**: [reference](references/examples/cyberpunk-creative-console.md), [React entry](assets/cyberpunk-creative-console/ExampleApp.tsx), [desktop reference](assets/shared/previews/cyberpunk-creative-console-desktop.webp), [phone reference](assets/shared/previews/cyberpunk-creative-console-mobile.webp).

## Evaluate the result

Check that neon accents, dark urban surfaces, industrial details, controlled interference are expressed coherently. Use clipped corners, strong warning-like contrast, and technical alignment; retain an obvious reading path. Use immediate state feedback; avoid glitch loops, flashing text, and fake security alerts.

Review the actual rendered phone and desktop layouts, text contrast, focus order, native control affordances, relevant empty/error/loading states, and reduced-motion behavior. State what was checked and what remains unverified. Do not claim visual fidelity or accessibility from a successful build alone.

Keep font licenses with redistributed assets. This skill supplies design guidance and local source; it does not authorize publishing, installations, or changes to unrelated project settings.
