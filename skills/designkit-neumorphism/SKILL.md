---
name: designkit-neumorphism
description: "Apply or review Neumorphism for a requested website or interface. Use when the user chooses Neumorphism and needs a coherent visual direction, relevant examples, or reusable React patterns."
license: MIT
metadata:
  version: "2.0.0"
---

# Neumorphism with DesignKit

Soft extruded controls that share their background while retaining recognizable affordances.

Use this direction to support the user's actual project, content, and chosen stack. It is not a requirement to reproduce a particular example or replace existing working interactions.

## Apply the direction

- Read [the style reference](references/style.md) for its composition, materials, useful decisions, and common mistakes.
- Choose a relevant project context from the examples below. Read only its reference and inspect its implementation when it helps the task. When image viewing is available, inspect the linked desktop and phone screenshots for its hierarchy, composition, and materials. You can compose another context using the same principles.
- When using the React assets, copy the chosen entry folder with assets/shared and preserve their relative structure. Adapt the example data to the user's content; replace local demo state with required project behavior.
- For another stack, translate the tokens, hierarchy, material, and interaction decisions into that stack rather than introducing React.
- Preserve suitable fonts, components, and conventions in an existing project. Make a change when it materially supports this direction, not simply because a kit contains an alternative.

## Example contexts

- **resonant (planner)**: [reference](references/examples/neumorphism-listening-planner.md), [React entry](assets/neumorphism-listening-planner/ExampleApp.tsx), [desktop reference](assets/shared/previews/neumorphism-listening-planner-desktop.webp), [phone reference](assets/shared/previews/neumorphism-listening-planner-mobile.webp).
- **soft switch (shop)**: [reference](references/examples/neumorphism-audio-shop.md), [React entry](assets/neumorphism-audio-shop/ExampleApp.tsx), [desktop reference](assets/shared/previews/neumorphism-audio-shop-desktop.webp), [phone reference](assets/shared/previews/neumorphism-audio-shop-mobile.webp).
- **TONAL (studio)**: [reference](references/examples/neumorphism-sound-studio.md), [React entry](assets/neumorphism-sound-studio/ExampleApp.tsx), [desktop reference](assets/shared/previews/neumorphism-sound-studio-desktop.webp), [phone reference](assets/shared/previews/neumorphism-sound-studio-mobile.webp).

## Evaluate the result

Check that paired shadows, shared surface color, inset controls, soft relief are expressed coherently. Use a narrow range of surfaces; distinguish controls with paired shadows and a visible focus boundary. Pressed controls move to an inset surface; preserve an explicit selected label.

Review the actual rendered phone and desktop layouts, text contrast, focus order, native control affordances, relevant empty/error/loading states, and reduced-motion behavior. State what was checked and what remains unverified. Do not claim visual fidelity or accessibility from a successful build alone.

Keep font licenses with redistributed assets. This skill supplies design guidance and local source; it does not authorize publishing, installations, or changes to unrelated project settings.
