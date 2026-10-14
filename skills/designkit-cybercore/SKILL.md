---
name: designkit-cybercore
description: "Apply or review Cybercore for a requested website or interface. Use when the user chooses Cybercore and needs a coherent visual direction, relevant examples, or reusable React patterns."
license: MIT
metadata:
  version: "2.0.0"
---

# Cybercore with DesignKit

Terminal-like modularity, acid contrast, and purposeful technical annotations.

Use this direction to support the user's actual project, content, and chosen stack. It is not a requirement to reproduce a particular example or replace existing working interactions.

## Apply the direction

- Read [the style reference](references/style.md) for its composition, materials, useful decisions, and common mistakes.
- Choose a relevant project context from the examples below. Read only its reference and inspect its implementation when it helps the task. When image viewing is available, inspect the linked desktop and phone screenshots for its hierarchy, composition, and materials. You can compose another context using the same principles.
- When using the React assets, copy the chosen entry folder with assets/shared and preserve their relative structure. Adapt the example data to the user's content; replace local demo state with required project behavior.
- For another stack, translate the tokens, hierarchy, material, and interaction decisions into that stack rather than introducing React.
- Preserve suitable fonts, components, and conventions in an existing project. Make a change when it materially supports this direction, not simply because a kit contains an alternative.

## Example contexts

- **SYS.01 (archive)**: [reference](references/examples/cybercore-systems-archive.md), [React entry](assets/cybercore-systems-archive/ExampleApp.tsx), [desktop reference](assets/shared/previews/cybercore-systems-archive-desktop.webp), [phone reference](assets/shared/previews/cybercore-systems-archive-mobile.webp).
- **NODE (planner)**: [reference](references/examples/cybercore-build-planner.md), [React entry](assets/cybercore-build-planner/ExampleApp.tsx), [desktop reference](assets/shared/previews/cybercore-build-planner-desktop.webp), [phone reference](assets/shared/previews/cybercore-build-planner-mobile.webp).
- **KERNEL assembly (event)**: [reference](references/examples/cybercore-creative-coding-meetup.md), [React entry](assets/cybercore-creative-coding-meetup/ExampleApp.tsx), [desktop reference](assets/shared/previews/cybercore-creative-coding-meetup-desktop.webp), [phone reference](assets/shared/previews/cybercore-creative-coding-meetup-mobile.webp).

## Evaluate the result

Check that machine graphics, chrome accents, dense metadata, sharp geometry are expressed coherently. Use modular terminal panels and technical typography; group dense information with consistent alignment. Use immediate status updates and a brief focus highlight; do not flicker text or simulate failures.

Review the actual rendered phone and desktop layouts, text contrast, focus order, native control affordances, relevant empty/error/loading states, and reduced-motion behavior. State what was checked and what remains unverified. Do not claim visual fidelity or accessibility from a successful build alone.

Keep font licenses with redistributed assets. This skill supplies design guidance and local source; it does not authorize publishing, installations, or changes to unrelated project settings.
