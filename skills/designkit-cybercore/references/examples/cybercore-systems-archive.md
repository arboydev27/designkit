# SYS.01: Cybercore archive

DesignKit 2.0.0. Original fictional example, reusable under MIT; bundled fonts retain their original OFL licenses.

## Project context

A searchable archive of experiments in tools, networks, and human-machine collaboration.

Headline: Find the signal in the system.

The primary action: Browse the archive

## Design reasoning

### Composition

Terminal labels and modular records give the archive a technical but readable structure.

### Material and geometry

Terminal-like modularity, acid contrast, and purposeful technical annotations.

### Reading and interaction

Use modular terminal panels and technical typography; group dense information with consistent alignment. Use immediate status updates and a brief focus highlight; do not flicker text or simulate failures.

## Typography

Heading: Space Grotesk
Body: IBM Plex Mono

Treat this pairing as an interpretation. If the destination project already has a suitable typeface, preserve it unless the requested direction needs a different voice.

## Exact default tokens

```css
/* SYS.01 / cybercore / DesignKit */
:root {
  --dk-canvas: #121B17;
  --dk-color-scheme: dark;
  --dk-surface: #1D2B23;
  --dk-accent: #C3F85C;
  --dk-ink: #E9F5DC;
  --dk-surface-ink: #E9F5DC;
  --dk-on-accent: #191A1F;
  --dk-muted: #a9b4a1;
  --dk-surface-muted: #a9b4a1;
  --dk-line: #80936D;
  --dk-heading: 'Space Grotesk';
  --dk-body: 'IBM Plex Mono';
  --dk-radius: 0px;
  --dk-border: 1px;
  --dk-space: 24px;
  --dk-shadow: none;
}
```

## Content

- Protocols for public tools (Reference): An illustrated working reference.
- The open hardware notebook (Experiment): Notes, patterns, and useful experiments.
- Signals from the edge (Guide): A closer look at an underlying idea.

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

Preview: https://designkit-vert.vercel.app/examples/cybercore-systems-archive/
Full-page preview: https://designkit-vert.vercel.app/preview/cybercore-systems-archive/
Desktop image: https://designkit-vert.vercel.app/previews/cybercore-systems-archive-desktop.webp
Phone image: https://designkit-vert.vercel.app/previews/cybercore-systems-archive-mobile.webp
Kit: https://designkit-vert.vercel.app/kits/examples/cybercore-systems-archive.zip
JSON: https://designkit-vert.vercel.app/kits/examples/cybercore-systems-archive.json
