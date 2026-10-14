# soft switch: Neumorphism shop

DesignKit 2.0.0. Original fictional example, reusable under MIT; bundled fonts retain their original OFL licenses.

## Project context

Considered audio accessories for the small rituals around listening, working, and unwinding.

Headline: Tools that feel good in use.

The primary action: Explore the collection

## Design reasoning

### Composition

Raised product surfaces provide tactility without relying on shadow to communicate price or state.

### Material and geometry

Soft extruded controls that share their background while retaining recognizable affordances.

### Reading and interaction

Use a narrow range of surfaces; distinguish controls with paired shadows and a visible focus boundary. Pressed controls move to an inset surface; preserve an explicit selected label.

## Typography

Heading: DM Sans
Body: Inter

Treat this pairing as an interpretation. If the destination project already has a suitable typeface, preserve it unless the requested direction needs a different voice.

## Exact default tokens

```css
/* soft switch / neumorphism / DesignKit */
:root {
  --dk-canvas: #E9E4DD;
  --dk-color-scheme: light;
  --dk-surface: #E9E4DD;
  --dk-accent: #8C6D52;
  --dk-ink: #463629;
  --dk-surface-ink: #463629;
  --dk-on-accent: #FFFFFF;
  --dk-muted: #463629;
  --dk-surface-muted: #463629;
  --dk-line: #7f7368;
  --dk-heading: 'DM Sans';
  --dk-body: 'Inter';
  --dk-radius: 24px;
  --dk-border: 1px;
  --dk-space: 24px;
  --dk-shadow: 6px 6px 12px 0px rgba(104, 119, 140, 0.24), -5px -5px 12px 0px rgba(255, 255, 255, 0.8);
}
```

## Content

- The volume dial ($36): A small edition, made with care.
- Desk listening stand ($48): A useful companion for everyday rituals.
- The everyday cable ($24): A little character for your own space.

## Adaptation

Use a narrow range of surfaces; distinguish controls with paired shadows and a visible focus boundary.

Pressed controls move to an inset surface; preserve an explicit selected label.

Use the page structure for its context, not as a universal template. Keep the user's real content and required interactions.

## Review

- Using shadows as the only state indicator.
- Low-contrast text and icons.
- Applying soft relief to every data-heavy component.

Check reading order and text contrast at phone width; ensure native controls retain keyboard and focus feedback. Preview tasks, carts, and schedules are local demonstrations, not backend integrations.

## Resources

Preview: https://designkit-vert.vercel.app/examples/neumorphism-audio-shop/
Full-page preview: https://designkit-vert.vercel.app/preview/neumorphism-audio-shop/
Desktop image: https://designkit-vert.vercel.app/previews/neumorphism-audio-shop-desktop.webp
Phone image: https://designkit-vert.vercel.app/previews/neumorphism-audio-shop-mobile.webp
Kit: https://designkit-vert.vercel.app/kits/examples/neumorphism-audio-shop.zip
JSON: https://designkit-vert.vercel.app/kits/examples/neumorphism-audio-shop.json
