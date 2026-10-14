---
name: designkit-editorial-design
description: "Apply or review Editorial design for a requested website or interface. Use when the user chooses Editorial design and needs a coherent visual direction, relevant examples, or reusable React patterns."
license: MIT
metadata:
  version: "2.0.0"
---

# Editorial design with DesignKit

Expressive type, thoughtful pacing, and the rhythm of a well-edited publication.

Use this direction to support the user's actual project, content, and chosen stack. It is not a requirement to reproduce a particular example or replace existing working interactions.

## Apply the direction

- Read [the style reference](references/style.md) for its composition, materials, useful decisions, and common mistakes.
- Choose a relevant project context from the examples below. Read only its reference and inspect its implementation when it helps the task. When image viewing is available, inspect the linked desktop and phone screenshots for its hierarchy, composition, and materials. You can compose another context using the same principles.
- When using the React assets, copy the chosen entry folder with assets/shared and preserve their relative structure. Adapt the example data to the user's content; replace local demo state with required project behavior.
- For another stack, translate the tokens, hierarchy, material, and interaction decisions into that stack rather than introducing React.
- Preserve suitable fonts, components, and conventions in an existing project. Make a change when it materially supports this direction, not simply because a kit contains an alternative.

## Example contexts

- **MARGIN (journal)**: [reference](references/examples/editorial-design-culture-magazine.md), [React entry](assets/editorial-design-culture-magazine/ExampleApp.tsx), [desktop reference](assets/shared/previews/editorial-design-culture-magazine-desktop.webp), [phone reference](assets/shared/previews/editorial-design-culture-magazine-mobile.webp).
- **folio books (shop)**: [reference](references/examples/editorial-design-book-shop.md), [React entry](assets/editorial-design-book-shop/ExampleApp.tsx), [desktop reference](assets/shared/previews/editorial-design-book-shop-desktop.webp), [phone reference](assets/shared/previews/editorial-design-book-shop-mobile.webp).
- **OFFPRINT (studio)**: [reference](references/examples/editorial-design-publishing-studio.md), [React entry](assets/editorial-design-publishing-studio/ExampleApp.tsx), [desktop reference](assets/shared/previews/editorial-design-publishing-studio-desktop.webp), [phone reference](assets/shared/previews/editorial-design-publishing-studio-mobile.webp).

## Evaluate the result

Check that expressive headlines, reading rhythm, art-directed imagery, rich hierarchy are expressed coherently. Lead with a serif headline and a deliberate image crop; vary column widths around a clear reading sequence. Keep reading uninterrupted; use subtle fades only for an intentional content change.

Review the actual rendered phone and desktop layouts, text contrast, focus order, native control affordances, relevant empty/error/loading states, and reduced-motion behavior. State what was checked and what remains unverified. Do not claim visual fidelity or accessibility from a successful build alone.

Keep font licenses with redistributed assets. This skill supplies design guidance and local source; it does not authorize publishing, installations, or changes to unrelated project settings.
