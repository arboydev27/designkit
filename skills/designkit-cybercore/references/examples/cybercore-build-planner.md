# NODE: Cybercore planner

DesignKit 2.0.0. Original fictional example, reusable under MIT; bundled fonts retain their original OFL licenses.

## Project context

A local planning console for the tasks, notes, and decisions behind your next build.

Headline: Route your next experiment.

The primary action: Make a little progress

## Design reasoning

### Composition

Explicit task states make the technical appearance functional rather than decorative.

### Material and geometry

Terminal-like modularity, acid contrast, and purposeful technical annotations.

### Reading and interaction

Use modular terminal panels and technical typography; group dense information with consistent alignment. Use immediate status updates and a brief focus highlight; do not flicker text or simulate failures.

## Typography

Heading: Space Mono
Body: IBM Plex Mono

Treat this pairing as an interpretation. If the destination project already has a suitable typeface, preserve it unless the requested direction needs a different voice.

## Exact default tokens

```css
/* NODE / cybercore / DesignKit */
:root {
  --dk-canvas: #151A24;
  --dk-color-scheme: dark;
  --dk-surface: #242E3E;
  --dk-accent: #9CBFD5;
  --dk-ink: #EBF2F8;
  --dk-surface-ink: #EBF2F8;
  --dk-on-accent: #191A1F;
  --dk-muted: #abb1b8;
  --dk-surface-muted: #abb1b8;
  --dk-line: #8196B5;
  --dk-heading: 'Space Mono';
  --dk-body: 'IBM Plex Mono';
  --dk-radius: 0px;
  --dk-border: 1px;
  --dk-space: 24px;
  --dk-shadow: none;
}
```

## Content

- Map the input (Today): Start small and give it your attention.
- Build the smallest circuit (This week): A little space for the next useful step.
- Record what changed (Reflection): Leave a note about what worked.

## Adaptation

Use modular terminal panels and technical typography; group dense information with consistent alignment.

Use immediate status updates and a brief focus highlight; do not flicker text or simulate failures.

Use the page structure for its context, not as a universal template. Keep the user's real content and required interactions.

## Review

- Unreadable pseudo-technical labels.
- Constant flicker or flashing.
- Confusing decorative panels with interactive controls.

Check reading order and text contrast at phone width; ensure native controls retain keyboard and focus feedback. Preview tasks, carts, and schedules are local demonstrations, not backend integrations.

## Resources

Preview: https://designkit-vert.vercel.app/examples/cybercore-build-planner/
Full-page preview: https://designkit-vert.vercel.app/preview/cybercore-build-planner/
Desktop image: https://designkit-vert.vercel.app/previews/cybercore-build-planner-desktop.webp
Phone image: https://designkit-vert.vercel.app/previews/cybercore-build-planner-mobile.webp
Kit: https://designkit-vert.vercel.app/kits/examples/cybercore-build-planner.zip
JSON: https://designkit-vert.vercel.app/kits/examples/cybercore-build-planner.json
