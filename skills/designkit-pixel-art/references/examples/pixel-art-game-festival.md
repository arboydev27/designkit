# SIDEQUEST: Pixel art event

DesignKit 2.0.0. Original fictional example, reusable under MIT; bundled fonts retain their original OFL licenses.

## Project context

An independent games afternoon with tiny worlds, big ideas, and room for a new player.

Headline: Your next adventure starts here.

The primary action: Explore the programme

## Design reasoning

### Composition

Chunky schedule blocks feel game-like, while ticket selection follows familiar controls.

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
/* SIDEQUEST / pixel-art / DesignKit */
:root {
  --dk-canvas: #1D233C;
  --dk-color-scheme: dark;
  --dk-surface: #30385A;
  --dk-accent: #F4D476;
  --dk-ink: #F8EFD7;
  --dk-surface-ink: #F8EFD7;
  --dk-on-accent: #191A1F;
  --dk-muted: #b6b2a9;
  --dk-surface-muted: #b6b2a9;
  --dk-line: #8793C0;
  --dk-heading: 'Press Start 2P';
  --dk-body: 'Space Mono';
  --dk-radius: 0px;
  --dk-border: 3px;
  --dk-space: 24px;
  --dk-shadow: 5px 5px 0px 0px rgba(248, 239, 215, 1);
}
```

## Content

- Meet the makers (10:00): A conversation to begin the gathering.
- Try a tiny world (13:00): Time to make, listen, and try something.
- The final boss showcase (16:00): Bring the day's ideas together.

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

Preview: https://designkit-vert.vercel.app/examples/pixel-art-game-festival/
Full-page preview: https://designkit-vert.vercel.app/preview/pixel-art-game-festival/
Desktop image: https://designkit-vert.vercel.app/previews/pixel-art-game-festival-desktop.webp
Phone image: https://designkit-vert.vercel.app/previews/pixel-art-game-festival-mobile.webp
Kit: https://designkit-vert.vercel.app/kits/examples/pixel-art-game-festival.zip
JSON: https://designkit-vert.vercel.app/kits/examples/pixel-art-game-festival.json
