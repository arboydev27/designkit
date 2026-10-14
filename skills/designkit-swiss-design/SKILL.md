---
name: designkit-swiss-design
description: "Apply or review Swiss design for a requested website or interface. Use when the user chooses Swiss design and needs a coherent visual direction, relevant examples, or reusable React patterns."
license: MIT
metadata:
  version: "2.0.0"
---

# Swiss design with DesignKit

Typographic order, disciplined alignment, asymmetry, and concise graphic contrast.

Use this direction to support the user's actual project, content, and chosen stack. It is not a requirement to reproduce a particular example or replace existing working interactions.

## Apply the direction

- Read [the style reference](references/style.md) for its composition, materials, useful decisions, and common mistakes.
- Choose a relevant project context from the examples below. Read only its reference and inspect its implementation when it helps the task. When image viewing is available, inspect the linked desktop and phone screenshots for its hierarchy, composition, and materials. You can compose another context using the same principles.
- When using the React assets, copy the chosen entry folder with assets/shared and preserve their relative structure. Adapt the example data to the user's content; replace local demo state with required project behavior.
- For another stack, translate the tokens, hierarchy, material, and interaction decisions into that stack rather than introducing React.
- Preserve suitable fonts, components, and conventions in an existing project. Make a change when it materially supports this direction, not simply because a kit contains an alternative.

## Example contexts

- **FORM / 25 (event)**: [reference](references/examples/swiss-design-design-programme.md), [React entry](assets/swiss-design-design-programme/ExampleApp.tsx), [desktop reference](assets/shared/previews/swiss-design-design-programme-desktop.webp), [phone reference](assets/shared/previews/swiss-design-design-programme-mobile.webp).
- **INDEX (journal)**: [reference](references/examples/swiss-design-design-publication.md), [React entry](assets/swiss-design-design-publication/ExampleApp.tsx), [desktop reference](assets/shared/previews/swiss-design-design-publication-desktop.webp), [phone reference](assets/shared/previews/swiss-design-design-publication-mobile.webp).
- **WERK (studio)**: [reference](references/examples/swiss-design-industrial-studio.md), [React entry](assets/swiss-design-industrial-studio/ExampleApp.tsx), [desktop reference](assets/shared/previews/swiss-design-industrial-studio-desktop.webp), [phone reference](assets/shared/previews/swiss-design-industrial-studio-mobile.webp).

## Evaluate the result

Check that systematic grids, sans-serif type, asymmetric balance, clear hierarchy are expressed coherently. Align text and imagery to a visible grid; communicate hierarchy through scale, weight, and position. Prefer immediate state changes and restrained fades; avoid decorative bounce.

Review the actual rendered phone and desktop layouts, text contrast, focus order, native control affordances, relevant empty/error/loading states, and reduced-motion behavior. State what was checked and what remains unverified. Do not claim visual fidelity or accessibility from a successful build alone.

Keep font licenses with redistributed assets. This skill supplies design guidance and local source; it does not authorize publishing, installations, or changes to unrelated project settings.
