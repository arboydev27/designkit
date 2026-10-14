---
name: designkit-scrapbook
description: "Apply or review Scrapbook for a requested website or interface. Use when the user chooses Scrapbook and needs a coherent visual direction, relevant examples, or reusable React patterns."
license: MIT
metadata:
  version: "2.0.0"
---

# Scrapbook with DesignKit

Handwritten accents, paper layering, and collected details rather than random clutter.

Use this direction to support the user's actual project, content, and chosen stack. It is not a requirement to reproduce a particular example or replace existing working interactions.

## Apply the direction

- Read [the style reference](references/style.md) for its composition, materials, useful decisions, and common mistakes.
- Choose a relevant project context from the examples below. Read only its reference and inspect its implementation when it helps the task. When image viewing is available, inspect the linked desktop and phone screenshots for its hierarchy, composition, and materials. You can compose another context using the same principles.
- When using the React assets, copy the chosen entry folder with assets/shared and preserve their relative structure. Adapt the example data to the user's content; replace local demo state with required project behavior.
- For another stack, translate the tokens, hierarchy, material, and interaction decisions into that stack rather than introducing React.
- Preserve suitable fonts, components, and conventions in an existing project. Make a change when it materially supports this direction, not simply because a kit contains an alternative.

## Example contexts

- **little things (journal)**: [reference](references/examples/scrapbook-personal-journal.md), [React entry](assets/scrapbook-personal-journal/ExampleApp.tsx), [desktop reference](assets/shared/previews/scrapbook-personal-journal-desktop.webp), [phone reference](assets/shared/previews/scrapbook-personal-journal-mobile.webp).
- **paper trail (studio)**: [reference](references/examples/scrapbook-illustration-studio.md), [React entry](assets/scrapbook-illustration-studio/ExampleApp.tsx), [desktop reference](assets/shared/previews/scrapbook-illustration-studio-desktop.webp), [phone reference](assets/shared/previews/scrapbook-illustration-studio-mobile.webp).
- **keepsake club (shop)**: [reference](references/examples/scrapbook-stationery-shop.md), [React entry](assets/scrapbook-stationery-shop/ExampleApp.tsx), [desktop reference](assets/shared/previews/scrapbook-stationery-shop-desktop.webp), [phone reference](assets/shared/previews/scrapbook-stationery-shop-mobile.webp).

## Evaluate the result

Check that paper layers, handwritten notes, taped photographs, casual composition are expressed coherently. Arrange a few layered paper pieces with slight offsets; keep navigation and text baselines dependable. Tiny press feedback makes paper feel tangible; keep larger collages still.

Review the actual rendered phone and desktop layouts, text contrast, focus order, native control affordances, relevant empty/error/loading states, and reduced-motion behavior. State what was checked and what remains unverified. Do not claim visual fidelity or accessibility from a successful build alone.

Keep font licenses with redistributed assets. This skill supplies design guidance and local source; it does not authorize publishing, installations, or changes to unrelated project settings.
