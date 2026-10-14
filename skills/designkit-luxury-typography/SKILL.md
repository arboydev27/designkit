---
name: designkit-luxury-typography
description: "Apply or review Luxury typography for a requested website or interface. Use when the user chooses Luxury typography and needs a coherent visual direction, relevant examples, or reusable React patterns."
license: MIT
metadata:
  version: "2.0.0"
---

# Luxury typography with DesignKit

Elegant display proportions, disciplined whitespace, and considered typographic detail.

Use this direction to support the user's actual project, content, and chosen stack. It is not a requirement to reproduce a particular example or replace existing working interactions.

## Apply the direction

- Read [the style reference](references/style.md) for its composition, materials, useful decisions, and common mistakes.
- Choose a relevant project context from the examples below. Read only its reference and inspect its implementation when it helps the task. When image viewing is available, inspect the linked desktop and phone screenshots for its hierarchy, composition, and materials. You can compose another context using the same principles.
- When using the React assets, copy the chosen entry folder with assets/shared and preserve their relative structure. Adapt the example data to the user's content; replace local demo state with required project behavior.
- For another stack, translate the tokens, hierarchy, material, and interaction decisions into that stack rather than introducing React.
- Preserve suitable fonts, components, and conventions in an existing project. Make a change when it materially supports this direction, not simply because a kit contains an alternative.

## Example contexts

- **MAISON ÉDITIONS (shop)**: [reference](references/examples/luxury-typography-design-editions.md), [React entry](assets/luxury-typography-design-editions/ExampleApp.tsx), [desktop reference](assets/shared/previews/luxury-typography-design-editions-desktop.webp), [phone reference](assets/shared/previews/luxury-typography-design-editions-mobile.webp).
- **SERIF atelier (studio)**: [reference](references/examples/luxury-typography-brand-practice.md), [React entry](assets/luxury-typography-brand-practice/ExampleApp.tsx), [desktop reference](assets/shared/previews/luxury-typography-brand-practice-desktop.webp), [phone reference](assets/shared/previews/luxury-typography-brand-practice-mobile.webp).
- **ÉDITION (journal)**: [reference](references/examples/luxury-typography-culture-review.md), [React entry](assets/luxury-typography-culture-review/ExampleApp.tsx), [desktop reference](assets/shared/previews/luxury-typography-culture-review-desktop.webp), [phone reference](assets/shared/previews/luxury-typography-culture-review-mobile.webp).

## Evaluate the result

Check that high-contrast serifs, careful spacing, restrained details, dramatic scale are expressed coherently. Treat large high-contrast type as the main image; maintain precise spacing and modest supporting controls. Use restrained, brief transitions; never delay navigation to imply prestige.

Review the actual rendered phone and desktop layouts, text contrast, focus order, native control affordances, relevant empty/error/loading states, and reduced-motion behavior. State what was checked and what remains unverified. Do not claim visual fidelity or accessibility from a successful build alone.

Keep font licenses with redistributed assets. This skill supplies design guidance and local source; it does not authorize publishing, installations, or changes to unrelated project settings.
