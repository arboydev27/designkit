---
name: designkit-victorian
description: "Apply or review Victorian for a requested website or interface. Use when the user chooses Victorian and needs a coherent visual direction, relevant examples, or reusable React patterns."
license: MIT
metadata:
  version: "2.0.0"
---

# Victorian with DesignKit

Decorative framing and historic display character with contemporary reading clarity.

Use this direction to support the user's actual project, content, and chosen stack. It is not a requirement to reproduce a particular example or replace existing working interactions.

## Apply the direction

- Read [the style reference](references/style.md) for its composition, materials, useful decisions, and common mistakes.
- Choose a relevant project context from the examples below. Read only its reference and inspect its implementation when it helps the task. When image viewing is available, inspect the linked desktop and phone screenshots for its hierarchy, composition, and materials. You can compose another context using the same principles.
- When using the React assets, copy the chosen entry folder with assets/shared and preserve their relative structure. Adapt the example data to the user's content; replace local demo state with required project behavior.
- For another stack, translate the tokens, hierarchy, material, and interaction decisions into that stack rather than introducing React.
- Preserve suitable fonts, components, and conventions in an existing project. Make a change when it materially supports this direction, not simply because a kit contains an alternative.

## Example contexts

- **THE CHRONICLE (journal)**: [reference](references/examples/victorian-literary-journal.md), [React entry](assets/victorian-literary-journal/ExampleApp.tsx), [desktop reference](assets/shared/previews/victorian-literary-journal-desktop.webp), [phone reference](assets/shared/previews/victorian-literary-journal-mobile.webp).
- **CABINET & CO. (shop)**: [reference](references/examples/victorian-curiosity-shop.md), [React entry](assets/victorian-curiosity-shop/ExampleApp.tsx), [desktop reference](assets/shared/previews/victorian-curiosity-shop-desktop.webp), [phone reference](assets/shared/previews/victorian-curiosity-shop-mobile.webp).
- **THE SOCIETY (event)**: [reference](references/examples/victorian-literary-salon.md), [React entry](assets/victorian-literary-salon/ExampleApp.tsx), [desktop reference](assets/shared/previews/victorian-literary-salon-desktop.webp), [phone reference](assets/shared/previews/victorian-literary-salon-mobile.webp).

## Evaluate the result

Check that ornate borders, decorative lettering, engraved imagery, framed compositions are expressed coherently. Frame a clear central hierarchy with ornamental rules; reserve blackletter for short display moments. Keep ornament static and state changes direct; readable body type carries detailed information.

Review the actual rendered phone and desktop layouts, text contrast, focus order, native control affordances, relevant empty/error/loading states, and reduced-motion behavior. State what was checked and what remains unverified. Do not claim visual fidelity or accessibility from a successful build alone.

Keep font licenses with redistributed assets. This skill supplies design guidance and local source; it does not authorize publishing, installations, or changes to unrelated project settings.
