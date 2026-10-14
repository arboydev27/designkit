# orbit.: Bento grid planner

DesignKit 2.0.0. Original fictional example, reusable under MIT; bundled fonts retain their original OFL licenses.

## Project context

A few useful modules for your tasks, notes, and the room you want to leave in your day.

Headline: Everything in its place.

The primary action: Make a little progress

## Design reasoning

### Composition

Unequal planning tiles have separate purposes while their controls stay aligned.

### Material and geometry

Modular composition, varied tile scale, and a coherent palette across independent content.

### Reading and interaction

Use unequal modules in a stable grid; each tile has one purpose and a deliberate reading priority. Animate a changed tile's content rather than moving the entire grid.

## Typography

Heading: DM Sans
Body: Inter

Treat this pairing as an interpretation. If the destination project already has a suitable typeface, preserve it unless the requested direction needs a different voice.

## Exact default tokens

```css
/* orbit. / bento-grid / DesignKit */
:root {
  --dk-canvas: #F6F5F0;
  --dk-color-scheme: light;
  --dk-surface: #DFD7F0;
  --dk-accent: #F0D47F;
  --dk-ink: #292830;
  --dk-surface-ink: #292830;
  --dk-on-accent: #292830;
  --dk-muted: #67666a;
  --dk-surface-muted: #191A1F;
  --dk-line: #8C8598;
  --dk-heading: 'DM Sans';
  --dk-body: 'Inter';
  --dk-radius: 22px;
  --dk-border: 1px;
  --dk-space: 24px;
  --dk-shadow: none;
}
```

## Content

- The one thing for today (Today): Start small and give it your attention.
- A small project to finish (This week): A little space for the next useful step.
- Time for yourself (Reflection): Leave a note about what worked.

## Adaptation

Use unequal modules in a stable grid; each tile has one purpose and a deliberate reading priority.

Animate a changed tile's content rather than moving the entire grid.

Use the page structure for its context, not as a universal template. Keep the user's real content and required interactions.

## Review

- Making all tiles equally loud.
- Packing unrelated material into one tile.
- Relying on desktop position to explain relationships.

Check reading order and text contrast at phone width; ensure native controls retain keyboard and focus feedback. Preview tasks, carts, and schedules are local demonstrations, not backend integrations.

## Resources

Preview: https://designkit-vert.vercel.app/examples/bento-grid-daily-planner/
Full-page preview: https://designkit-vert.vercel.app/preview/bento-grid-daily-planner/
Desktop image: https://designkit-vert.vercel.app/previews/bento-grid-daily-planner-desktop.webp
Phone image: https://designkit-vert.vercel.app/previews/bento-grid-daily-planner-mobile.webp
Kit: https://designkit-vert.vercel.app/kits/examples/bento-grid-daily-planner.zip
JSON: https://designkit-vert.vercel.app/kits/examples/bento-grid-daily-planner.json
