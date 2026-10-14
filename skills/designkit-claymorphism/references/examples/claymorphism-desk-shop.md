# pebble objects: Claymorphism shop

DesignKit 2.0.0. Original fictional example, reusable under MIT; bundled fonts retain their original OFL licenses.

## Project context

Playful desk companions for doodlers, thinkers, and collectors of little comforts.

Headline: A happier place to make things.

The primary action: Explore the collection

## Design reasoning

### Composition

Rounded product silhouettes and puffy controls support the tactile object collection.

### Material and geometry

Puffy rounded surfaces and soft shadows with crisp, readable labels.

### Reading and interaction

Use rounded, inflated forms as a few friendly anchors, with open space around text and controls. A short, critically damped press response suggests softness; reduce it to color feedback when requested.

## Typography

Heading: Nunito
Body: DM Sans

Treat this pairing as an interpretation. If the destination project already has a suitable typeface, preserve it unless the requested direction needs a different voice.

## Exact default tokens

```css
/* pebble objects / claymorphism / DesignKit */
:root {
  --dk-canvas: #EEF3F9;
  --dk-color-scheme: light;
  --dk-surface: #D3E4F6;
  --dk-accent: #C3B0E4;
  --dk-ink: #303D55;
  --dk-surface-ink: #303D55;
  --dk-on-accent: #303D55;
  --dk-muted: #303D55;
  --dk-surface-muted: #303D55;
  --dk-line: #737d8e;
  --dk-heading: 'Nunito';
  --dk-body: 'DM Sans';
  --dk-radius: 28px;
  --dk-border: 1px;
  --dk-space: 24px;
  --dk-shadow: 0px 10px 24px -5px rgba(52, 48, 68, 0.16), inset -3px -3px 6px 0px rgba(255, 255, 255, 0.5);
}
```

## Content

- Cloud pencil pot ($36): A small edition, made with care.
- Pebble paperweight ($48): A useful companion for everyday rituals.
- Squiggle desk tray ($24): A little character for your own space.

## Adaptation

Use rounded, inflated forms as a few friendly anchors, with open space around text and controls.

A short, critically damped press response suggests softness; reduce it to color feedback when requested.

Use the page structure for its context, not as a universal template. Keep the user's real content and required interactions.

## Review

- Making every component look like a toy.
- Soft shadows as the only control boundary.
- Oversized effects on dense tables.

Check reading order and text contrast at phone width; ensure native controls retain keyboard and focus feedback. Preview tasks, carts, and schedules are local demonstrations, not backend integrations.

## Resources

Preview: https://designkit-vert.vercel.app/examples/claymorphism-desk-shop/
Full-page preview: https://designkit-vert.vercel.app/preview/claymorphism-desk-shop/
Desktop image: https://designkit-vert.vercel.app/previews/claymorphism-desk-shop-desktop.webp
Phone image: https://designkit-vert.vercel.app/previews/claymorphism-desk-shop-mobile.webp
Kit: https://designkit-vert.vercel.app/kits/examples/claymorphism-desk-shop.zip
JSON: https://designkit-vert.vercel.app/kits/examples/claymorphism-desk-shop.json
