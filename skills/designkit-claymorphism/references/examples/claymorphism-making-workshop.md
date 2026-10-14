# playdate: Claymorphism event

DesignKit 2.0.0. Original fictional example, reusable under MIT; bundled fonts retain their original OFL licenses.

## Project context

An afternoon of clay, color, and trying something new with people who are doing the same.

Headline: Come make a beautiful mess.

The primary action: Explore the programme

## Design reasoning

### Composition

Soft schedule blocks make the workshop approachable without hiding its practical details.

### Material and geometry

Puffy rounded surfaces and soft shadows with crisp, readable labels.

### Reading and interaction

Use rounded, inflated forms as a few friendly anchors, with open space around text and controls. A short, critically damped press response suggests softness; reduce it to color feedback when requested.

## Typography

Heading: Syne
Body: DM Sans

Treat this pairing as an interpretation. If the destination project already has a suitable typeface, preserve it unless the requested direction needs a different voice.

## Exact default tokens

```css
/* playdate / claymorphism / DesignKit */
:root {
  --dk-canvas: #FFF2E1;
  --dk-color-scheme: light;
  --dk-surface: #F6D6AD;
  --dk-accent: #ED9D7E;
  --dk-ink: #5A3736;
  --dk-surface-ink: #5A3736;
  --dk-on-accent: #5A3736;
  --dk-muted: #5A3736;
  --dk-surface-muted: #5A3736;
  --dk-line: #A37A69;
  --dk-heading: 'Syne';
  --dk-body: 'DM Sans';
  --dk-radius: 28px;
  --dk-border: 1px;
  --dk-space: 24px;
  --dk-shadow: 0px 10px 24px -5px rgba(52, 48, 68, 0.16), inset -3px -3px 6px 0px rgba(255, 255, 255, 0.5);
}
```

## Content

- Shape a tiny friend (10:00): A conversation to begin the gathering.
- Paint without a plan (13:00): Time to make, listen, and try something.
- Build a paper garden (16:00): Bring the day's ideas together.

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

Preview: https://designkit-vert.vercel.app/examples/claymorphism-making-workshop/
Full-page preview: https://designkit-vert.vercel.app/preview/claymorphism-making-workshop/
Desktop image: https://designkit-vert.vercel.app/previews/claymorphism-making-workshop-desktop.webp
Phone image: https://designkit-vert.vercel.app/previews/claymorphism-making-workshop-mobile.webp
Kit: https://designkit-vert.vercel.app/kits/examples/claymorphism-making-workshop.zip
JSON: https://designkit-vert.vercel.app/kits/examples/claymorphism-making-workshop.json
