---
name: designkit-minimalism
description: "Apply or review Minimalism for a requested website or interface. Use when the user chooses Minimalism and needs a coherent visual direction, relevant examples, or reusable React patterns."
license: MIT
metadata:
  version: "2.0.0"
---

# Minimalism with DesignKit

Few decisions, expressed consistently, with generous space and clear purpose.

Use this direction to support the user's actual project, content, and chosen stack. It is not a requirement to reproduce a particular example or replace existing working interactions.

## Apply the direction

- Read [the style reference](references/style.md) for its composition, materials, useful decisions, and common mistakes.
- Choose a relevant project context from the examples below. Read only its reference and inspect its implementation when it helps the task. When image viewing is available, inspect the linked desktop and phone screenshots for its hierarchy, composition, and materials. You can compose another context using the same principles.
- When using the React assets, copy the chosen entry folder with assets/shared and preserve their relative structure. Adapt the example data to the user's content; replace local demo state with required project behavior.
- For another stack, translate the tokens, hierarchy, material, and interaction decisions into that stack rather than introducing React.
- Preserve suitable fonts, components, and conventions in an existing project. Make a change when it materially supports this direction, not simply because a kit contains an alternative.

## Example contexts

- **still. (studio)**: [reference](references/examples/minimalism-architecture-studio.md), [React entry](assets/minimalism-architecture-studio/ExampleApp.tsx), [desktop reference](assets/shared/previews/minimalism-architecture-studio-desktop.webp), [phone reference](assets/shared/previews/minimalism-architecture-studio-mobile.webp).
- **OBJECT (shop)**: [reference](references/examples/minimalism-everyday-shop.md), [React entry](assets/minimalism-everyday-shop/ExampleApp.tsx), [desktop reference](assets/shared/previews/minimalism-everyday-shop-desktop.webp), [phone reference](assets/shared/previews/minimalism-everyday-shop-mobile.webp).
- **LESS (journal)**: [reference](references/examples/minimalism-design-journal.md), [React entry](assets/minimalism-design-journal/ExampleApp.tsx), [desktop reference](assets/shared/previews/minimalism-design-journal-desktop.webp), [phone reference](assets/shared/previews/minimalism-design-journal-mobile.webp).

## Evaluate the result

Check that reduced elements, generous space, precise typography, restrained color are expressed coherently. Reduce to essential content and clear affordances; give spacing and typography explicit roles. Prefer immediate navigation and subtle state feedback; avoid ornamental reveals.

Review the actual rendered phone and desktop layouts, text contrast, focus order, native control affordances, relevant empty/error/loading states, and reduced-motion behavior. State what was checked and what remains unverified. Do not claim visual fidelity or accessibility from a successful build alone.

Keep font licenses with redistributed assets. This skill supplies design guidance and local source; it does not authorize publishing, installations, or changes to unrelated project settings.
