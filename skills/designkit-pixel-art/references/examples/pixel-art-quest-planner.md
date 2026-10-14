# CHECKPOINT: Pixel art planner

DesignKit 2.0.0. Original fictional example, reusable under MIT; bundled fonts retain their original OFL licenses.

## Project context

Break your project into small missions and keep track of what actually moved forward.

Headline: One good quest at a time.

The primary action: Make a little progress

## Design reasoning

### Composition

Pixel geometry frames ordinary tasks; a readable body face carries longer instructions.

### Material and geometry

Pixel-aligned forms and nostalgic game language with modern interaction clarity.

### Reading and interaction

Work with block geometry, crisp edges, and a coarse rhythm; pair pixel display lettering with readable body text. Use discrete state changes rather than flickering sprites; never communicate a state through animation alone.

## Typography

Heading: Press Start 2P
Body: Space Mono

Treat this pairing as an interpretation. If the destination project already has a suitable typeface, preserve it unless the requested direction needs a different voice.

## Exact default tokens

```css
/* CHECKPOINT / pixel-art / DesignKit */
:root {
  --dk-canvas: #F3EBC9;
  --dk-color-scheme: light;
  --dk-surface: #DFD89E;
  --dk-accent: #A55666;
  --dk-ink: #343149;
  --dk-surface-ink: #343149;
  --dk-on-accent: #FFFFFF;
  --dk-muted: #343149;
  --dk-surface-muted: #343149;
  --dk-line: #343149;
  --dk-heading: 'Press Start 2P';
  --dk-body: 'Space Mono';
  --dk-radius: 0px;
  --dk-border: 3px;
  --dk-space: 24px;
  --dk-shadow: 5px 5px 0px 0px rgba(52, 49, 73, 1);
}
```

## Content

- Explore the problem (Today): Start small and give it your attention.
- Craft the first version (This week): A little space for the next useful step.
- Save your progress (Reflection): Leave a note about what worked.

## Adaptation

Work with block geometry, crisp edges, and a coarse rhythm; pair pixel display lettering with readable body text.

Use discrete state changes rather than flickering sprites; never communicate a state through animation alone.

Use the page structure for its context, not as a universal template. Keep the user's real content and required interactions.

## Review

- Blurring or stretching pixel assets.
- Tiny text in dense pixel fonts.
- Mixing several incompatible pixel grids.

Check reading order and text contrast at phone width; ensure native controls retain keyboard and focus feedback. Preview tasks, carts, and schedules are local demonstrations, not backend integrations.

## Resources

Preview: https://designkit-vert.vercel.app/examples/pixel-art-quest-planner/
Full-page preview: https://designkit-vert.vercel.app/preview/pixel-art-quest-planner/
Desktop image: https://designkit-vert.vercel.app/previews/pixel-art-quest-planner-desktop.webp
Phone image: https://designkit-vert.vercel.app/previews/pixel-art-quest-planner-mobile.webp
Kit: https://designkit-vert.vercel.app/kits/examples/pixel-art-quest-planner.zip
JSON: https://designkit-vert.vercel.app/kits/examples/pixel-art-quest-planner.json
