---
name: designkit-surrealism
description: "Apply or review Surrealism for a requested website or interface. Use when the user chooses Surrealism and needs a coherent visual direction, relevant examples, or reusable React patterns."
license: MIT
metadata:
  version: "2.0.0"
---

# Surrealism with DesignKit

Unexpected scale and spatial relationships made believable by consistent lighting.

Use this direction to support the user's actual project, content, and chosen stack. It is not a requirement to reproduce a particular example or replace existing working interactions.

## Apply the direction

- Read [the style reference](references/style.md) for its composition, materials, useful decisions, and common mistakes.
- Choose a relevant project context from the examples below. Read only its reference and inspect its implementation when it helps the task. When image viewing is available, inspect the linked desktop and phone screenshots for its hierarchy, composition, and materials. You can compose another context using the same principles.
- When using the React assets, copy the chosen entry folder with assets/shared and preserve their relative structure. Adapt the example data to the user's content; replace local demo state with required project behavior.
- For another stack, translate the tokens, hierarchy, material, and interaction decisions into that stack rather than introducing React.
- Preserve suitable fonts, components, and conventions in an existing project. Make a change when it materially supports this direction, not simply because a kit contains an alternative.

## Example contexts

- **OTHERWHERE (event)**: [reference](references/examples/surrealism-exhibition.md), [React entry](assets/surrealism-exhibition/ExampleApp.tsx), [desktop reference](assets/shared/previews/surrealism-exhibition-desktop.webp), [phone reference](assets/shared/previews/surrealism-exhibition-mobile.webp).
- **soft matter (shop)**: [reference](references/examples/surrealism-object-shop.md), [React entry](assets/surrealism-object-shop/ExampleApp.tsx), [desktop reference](assets/shared/previews/surrealism-object-shop-desktop.webp), [phone reference](assets/shared/previews/surrealism-object-shop-mobile.webp).
- **dream index (archive)**: [reference](references/examples/surrealism-image-archive.md), [React entry](assets/surrealism-image-archive/ExampleApp.tsx), [desktop reference](assets/shared/previews/surrealism-image-archive-desktop.webp), [phone reference](assets/shared/previews/surrealism-image-archive-mobile.webp).

## Evaluate the result

Check that dream logic, unexpected scale, impossible spaces, strange juxtapositions are expressed coherently. Use one improbable spatial composition, such as an arch around a floating form, beside a legible text block. Reveal a changed object briefly; avoid endless floating or motion that competes with reading.

Review the actual rendered phone and desktop layouts, text contrast, focus order, native control affordances, relevant empty/error/loading states, and reduced-motion behavior. State what was checked and what remains unverified. Do not claim visual fidelity or accessibility from a successful build alone.

Keep font licenses with redistributed assets. This skill supplies design guidance and local source; it does not authorize publishing, installations, or changes to unrelated project settings.
