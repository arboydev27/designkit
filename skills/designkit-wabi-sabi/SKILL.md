---
name: designkit-wabi-sabi
description: "Apply or review Wabi-sabi for a requested website or interface. Use when the user chooses Wabi-sabi and needs a coherent visual direction, relevant examples, or reusable React patterns."
license: MIT
metadata:
  version: "2.0.0"
---

# Wabi-sabi with DesignKit

Tactile earth tones, modest serif type, and imperfect geometry with clear controls.

Use this direction to support the user's actual project, content, and chosen stack. It is not a requirement to reproduce a particular example or replace existing working interactions.

## Apply the direction

- Read [the style reference](references/style.md) for its composition, materials, useful decisions, and common mistakes.
- Choose a relevant project context from the examples below. Read only its reference and inspect its implementation when it helps the task. When image viewing is available, inspect the linked desktop and phone screenshots for its hierarchy, composition, and materials. You can compose another context using the same principles.
- When using the React assets, copy the chosen entry folder with assets/shared and preserve their relative structure. Adapt the example data to the user's content; replace local demo state with required project behavior.
- For another stack, translate the tokens, hierarchy, material, and interaction decisions into that stack rather than introducing React.
- Preserve suitable fonts, components, and conventions in an existing project. Make a change when it materially supports this direction, not simply because a kit contains an alternative.

## Example contexts

- **tsuchi (shop)**: [reference](references/examples/wabi-sabi-earthware.md), [React entry](assets/wabi-sabi-earthware/ExampleApp.tsx), [desktop reference](assets/shared/previews/wabi-sabi-earthware-desktop.webp), [phone reference](assets/shared/previews/wabi-sabi-earthware-mobile.webp).
- **After rain (journal)**: [reference](references/examples/wabi-sabi-rain-journal.md), [React entry](assets/wabi-sabi-rain-journal/ExampleApp.tsx), [desktop reference](assets/shared/previews/wabi-sabi-rain-journal-desktop.webp), [phone reference](assets/shared/previews/wabi-sabi-rain-journal-mobile.webp).
- **ma atelier (studio)**: [reference](references/examples/wabi-sabi-architecture.md), [React entry](assets/wabi-sabi-architecture/ExampleApp.tsx), [desktop reference](assets/shared/previews/wabi-sabi-architecture-desktop.webp), [phone reference](assets/shared/previews/wabi-sabi-architecture-mobile.webp).

## Evaluate the result

Check that natural textures, quiet asymmetry, earthy neutrals, unhurried space are expressed coherently. Leave generous negative space and offset one visual anchor within a dependable reading order. Use brief fades for state changes; let stillness carry the atmosphere.

Review the actual rendered phone and desktop layouts, text contrast, focus order, native control affordances, relevant empty/error/loading states, and reduced-motion behavior. State what was checked and what remains unverified. Do not claim visual fidelity or accessibility from a successful build alone.

Keep font licenses with redistributed assets. This skill supplies design guidance and local source; it does not authorize publishing, installations, or changes to unrelated project settings.
