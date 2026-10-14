# keepsake club: Scrapbook shop

DesignKit 2.0.0. Original fictional example, reusable under MIT; bundled fonts retain their original OFL licenses.

## Project context

Stationery for making lists, sending love, and saving a piece of an ordinary day.

Headline: For your next little story.

The primary action: Explore the collection

## Design reasoning

### Composition

Tape-like framing is used on products while purchase actions stay straight and legible.

### Material and geometry

Handwritten accents, paper layering, and collected details rather than random clutter.

### Reading and interaction

Arrange a few layered paper pieces with slight offsets; keep navigation and text baselines dependable. Tiny press feedback makes paper feel tangible; keep larger collages still.

## Typography

Heading: Playfair Display
Body: DM Sans

Treat this pairing as an interpretation. If the destination project already has a suitable typeface, preserve it unless the requested direction needs a different voice.

## Exact default tokens

```css
/* keepsake club / scrapbook / DesignKit */
:root {
  --dk-canvas: #F7E9EB;
  --dk-color-scheme: light;
  --dk-surface: #EFC9D5;
  --dk-accent: #AE749B;
  --dk-ink: #4F3446;
  --dk-surface-ink: #4F3446;
  --dk-on-accent: #191A1F;
  --dk-muted: #4F3446;
  --dk-surface-muted: #4F3446;
  --dk-line: #A27690;
  --dk-heading: 'Playfair Display';
  --dk-body: 'DM Sans';
  --dk-radius: 2px;
  --dk-border: 1px;
  --dk-space: 24px;
  --dk-shadow: 5px 5px 0px 0px rgba(79, 52, 70, 1);
}
```

## Content

- The pocket notebook ($36): A small edition, made with care.
- A letter to a friend ($48): A useful companion for everyday rituals.
- A sheet of little stickers ($24): A little character for your own space.

## Adaptation

Arrange a few layered paper pieces with slight offsets; keep navigation and text baselines dependable.

Tiny press feedback makes paper feel tangible; keep larger collages still.

Use the page structure for its context, not as a universal template. Keep the user's real content and required interactions.

## Review

- Random rotation on every item.
- Overlapping essential text.
- Using handwriting for long paragraphs.

Check reading order and text contrast at phone width; ensure native controls retain keyboard and focus feedback. Preview tasks, carts, and schedules are local demonstrations, not backend integrations.

## Resources

Preview: https://designkit-vert.vercel.app/examples/scrapbook-stationery-shop/
Full-page preview: https://designkit-vert.vercel.app/preview/scrapbook-stationery-shop/
Desktop image: https://designkit-vert.vercel.app/previews/scrapbook-stationery-shop-desktop.webp
Phone image: https://designkit-vert.vercel.app/previews/scrapbook-stationery-shop-mobile.webp
Kit: https://designkit-vert.vercel.app/kits/examples/scrapbook-stationery-shop.zip
JSON: https://designkit-vert.vercel.app/kits/examples/scrapbook-stationery-shop.json
