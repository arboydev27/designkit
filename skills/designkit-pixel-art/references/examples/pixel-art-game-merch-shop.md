# 8-bit supply: Pixel art shop

DesignKit 2.0.0. Original fictional example, reusable under MIT; bundled fonts retain their original OFL licenses.

## Project context

Small-run prints and objects inspired by worlds built one square at a time.

Headline: Equip your everyday.

The primary action: Explore the collection

## Design reasoning

### Composition

A crisp product grid prevents nostalgic display type from taking over every detail.

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
/* 8-bit supply / pixel-art / DesignKit */
:root {
  --dk-canvas: #1D2A35;
  --dk-color-scheme: dark;
  --dk-surface: #2C4250;
  --dk-accent: #98C7C0;
  --dk-ink: #E7F4EC;
  --dk-surface-ink: #E7F4EC;
  --dk-on-accent: #191A1F;
  --dk-muted: #aab7b5;
  --dk-surface-muted: #aab7b5;
  --dk-line: #89A6A9;
  --dk-heading: 'Press Start 2P';
  --dk-body: 'Space Mono';
  --dk-radius: 0px;
  --dk-border: 3px;
  --dk-space: 24px;
  --dk-shadow: 5px 5px 0px 0px rgba(231, 244, 236, 1);
}
```

## Content

- Adventure map print ($36): A small edition, made with care.
- Potion enamel pin ($48): A useful companion for everyday rituals.
- Save point notebook ($24): A little character for your own space.

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

Preview: https://designkit-vert.vercel.app/examples/pixel-art-game-merch-shop/
Full-page preview: https://designkit-vert.vercel.app/preview/pixel-art-game-merch-shop/
Desktop image: https://designkit-vert.vercel.app/previews/pixel-art-game-merch-shop-desktop.webp
Phone image: https://designkit-vert.vercel.app/previews/pixel-art-game-merch-shop-mobile.webp
Kit: https://designkit-vert.vercel.app/kits/examples/pixel-art-game-merch-shop.zip
JSON: https://designkit-vert.vercel.app/kits/examples/pixel-art-game-merch-shop.json
