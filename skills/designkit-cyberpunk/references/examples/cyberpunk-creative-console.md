# SECTOR 7: Cyberpunk planner

DesignKit 2.0.0. Original fictional example, reusable under MIT; bundled fonts retain their original OFL licenses.

## Project context

A personal planning console for the experiments, projects, and ideas you want to bring into the world.

Headline: Keep the next move in sight.

The primary action: Make a little progress

## Design reasoning

### Composition

Task controls use explicit completion states rather than simulated warnings or glitches.

### Material and geometry

Dystopian contrast, angular surfaces, and an intentionally charged technical atmosphere.

### Reading and interaction

Use clipped corners, strong warning-like contrast, and technical alignment; retain an obvious reading path. Use immediate state feedback; avoid glitch loops, flashing text, and fake security alerts.

## Typography

Heading: Space Grotesk
Body: IBM Plex Mono

Treat this pairing as an interpretation. If the destination project already has a suitable typeface, preserve it unless the requested direction needs a different voice.

## Exact default tokens

```css
/* SECTOR 7 / cyberpunk / DesignKit */
:root {
  --dk-canvas: #251B2C;
  --dk-color-scheme: dark;
  --dk-surface: #3D2C49;
  --dk-accent: #D5A8E6;
  --dk-ink: #F8EDF9;
  --dk-surface-ink: #F8EDF9;
  --dk-on-accent: #191A1F;
  --dk-muted: #b9aebb;
  --dk-surface-muted: #b9aebb;
  --dk-line: #AD86B6;
  --dk-heading: 'Space Grotesk';
  --dk-body: 'IBM Plex Mono';
  --dk-radius: 0px;
  --dk-border: 1px;
  --dk-space: 24px;
  --dk-shadow: 5px 5px 0px 0px rgba(248, 237, 249, 1);
}
```

## Content

- Locate the useful signal (Today): Start small and give it your attention.
- Build the first prototype (This week): A little space for the next useful step.
- Record the next move (Reflection): Leave a note about what worked.

## Adaptation

Use clipped corners, strong warning-like contrast, and technical alignment; retain an obvious reading path.

Use immediate state feedback; avoid glitch loops, flashing text, and fake security alerts.

Use the page structure for its context, not as a universal template. Keep the user's real content and required interactions.

## Review

- Flashing effects or persistent visual interference.
- Decorative warning states that look actionable.
- Dense neon text without resting space.

Check reading order and text contrast at phone width; ensure native controls retain keyboard and focus feedback. Preview tasks, carts, and schedules are local demonstrations, not backend integrations.

## Resources

Preview: https://designkit-vert.vercel.app/examples/cyberpunk-creative-console/
Full-page preview: https://designkit-vert.vercel.app/preview/cyberpunk-creative-console/
Desktop image: https://designkit-vert.vercel.app/previews/cyberpunk-creative-console-desktop.webp
Phone image: https://designkit-vert.vercel.app/previews/cyberpunk-creative-console-mobile.webp
Kit: https://designkit-vert.vercel.app/kits/examples/cyberpunk-creative-console.zip
JSON: https://designkit-vert.vercel.app/kits/examples/cyberpunk-creative-console.json
