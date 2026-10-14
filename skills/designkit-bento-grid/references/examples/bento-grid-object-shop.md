# STACK goods: Bento grid shop

DesignKit 2.0.0. Original fictional example, reusable under MIT; bundled fonts retain their original OFL licenses.

## Project context

A collection of modular desk objects that make a small space work a little better.

Headline: Useful things, thoughtfully arranged.

The primary action: Explore the collection

## Design reasoning

### Composition

The product grid uses varied tile sizes to distinguish a featured object from supporting items.

### Material and geometry

Modular composition, varied tile scale, and a coherent palette across independent content.

### Reading and interaction

Use unequal modules in a stable grid; each tile has one purpose and a deliberate reading priority. Animate a changed tile's content rather than moving the entire grid.

## Typography

Heading: Space Grotesk
Body: Inter

Treat this pairing as an interpretation. If the destination project already has a suitable typeface, preserve it unless the requested direction needs a different voice.

## Exact default tokens

```css
/* STACK goods / bento-grid / DesignKit */
:root {
  --dk-canvas: #F1EAD9;
  --dk-color-scheme: light;
  --dk-surface: #EBD3AD;
  --dk-accent: #CA8D85;
  --dk-ink: #4C3530;
  --dk-surface-ink: #4C3530;
  --dk-on-accent: #191A1F;
  --dk-muted: #4C3530;
  --dk-surface-muted: #4C3530;
  --dk-line: #86746b;
  --dk-heading: 'Space Grotesk';
  --dk-body: 'Inter';
  --dk-radius: 22px;
  --dk-border: 1px;
  --dk-space: 24px;
  --dk-shadow: none;
}
```

## Content

- The stackable tray ($36): A small edition, made with care.
- A home for your cables ($48): A useful companion for everyday rituals.
- The little lamp ($24): A little character for your own space.

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

Preview: https://designkit-vert.vercel.app/examples/bento-grid-object-shop/
Full-page preview: https://designkit-vert.vercel.app/preview/bento-grid-object-shop/
Desktop image: https://designkit-vert.vercel.app/previews/bento-grid-object-shop-desktop.webp
Phone image: https://designkit-vert.vercel.app/previews/bento-grid-object-shop-mobile.webp
Kit: https://designkit-vert.vercel.app/kits/examples/bento-grid-object-shop.zip
JSON: https://designkit-vert.vercel.app/kits/examples/bento-grid-object-shop.json
