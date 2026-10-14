# GOOD NOISE: Neo-brutalism event

DesignKit 2.0.0. Original fictional example, reusable under MIT; bundled fonts retain their original OFL licenses.

## Project context

Independent music, experimental talks, and a room full of people making something happen.

Headline: A weekend worth shouting about.

The primary action: Explore the programme

## Design reasoning

### Composition

Large schedule labels and outlined ticket controls give useful information the same energy as the poster.

### Material and geometry

Heavy outlines and hard shadows give ordinary controls poster-like presence.

### Reading and interaction

Build a blunt graphic hierarchy with thick rules, one oversized headline, and hard-edged panels. A pressed control moves into its offset shadow immediately; navigation stays direct.

## Typography

Heading: Archivo Black
Body: Space Grotesk

Treat this pairing as an interpretation. If the destination project already has a suitable typeface, preserve it unless the requested direction needs a different voice.

## Exact default tokens

```css
/* GOOD NOISE / neo-brutalism / DesignKit */
:root {
  --dk-canvas: #DAECFF;
  --dk-color-scheme: light;
  --dk-surface: #BFCBFA;
  --dk-accent: #F7E579;
  --dk-ink: #181B2C;
  --dk-surface-ink: #181B2C;
  --dk-on-accent: #181B2C;
  --dk-muted: #525a6b;
  --dk-surface-muted: #191A1F;
  --dk-line: #181B2C;
  --dk-heading: 'Archivo Black';
  --dk-body: 'Space Grotesk';
  --dk-radius: 0px;
  --dk-border: 2px;
  --dk-space: 24px;
  --dk-shadow: 5px 5px 0px 0px rgba(24, 27, 44, 1);
}
```

## Content

- Friday: the opening set (10:00): A conversation to begin the gathering.
- Saturday: make trouble (13:00): Time to make, listen, and try something.
- Sunday: leave inspired (16:00): Bring the day's ideas together.

## Adaptation

Build a blunt graphic hierarchy with thick rules, one oversized headline, and hard-edged panels.

A pressed control moves into its offset shadow immediately; navigation stays direct.

Use the page structure for its context, not as a universal template. Keep the user's real content and required interactions.

## Review

- Competing emphasis on every control.
- Turning body copy into all caps.
- Shadows that obscure adjacent content.

Check reading order and text contrast at phone width; ensure native controls retain keyboard and focus feedback. Preview tasks, carts, and schedules are local demonstrations, not backend integrations.

## Resources

Preview: https://designkit-vert.vercel.app/examples/neo-brutalism-music-weekender/
Full-page preview: https://designkit-vert.vercel.app/preview/neo-brutalism-music-weekender/
Desktop image: https://designkit-vert.vercel.app/previews/neo-brutalism-music-weekender-desktop.webp
Phone image: https://designkit-vert.vercel.app/previews/neo-brutalism-music-weekender-mobile.webp
Kit: https://designkit-vert.vercel.app/kits/examples/neo-brutalism-music-weekender.zip
JSON: https://designkit-vert.vercel.app/kits/examples/neo-brutalism-music-weekender.json
