# DRIFT: Ethereal planner

DesignKit 2.0.0. Original fictional example, reusable under MIT; bundled fonts retain their original OFL licenses.

## Project context

An unhurried space to notice how the day feels and choose what would help.

Headline: A little pause, just for you.

The primary action: Make a little progress

## Design reasoning

### Composition

Soft task panels use explicit states so the atmosphere never replaces usability.

### Material and geometry

Light, delicate forms and gentle color transitions with readable text.

### Reading and interaction

Use airy spacing and translucent light shapes, anchored by a high-contrast reading surface. Short fades preserve softness; omit drifting backgrounds and parallax.

## Typography

Heading: Cormorant Garamond
Body: DM Sans

Treat this pairing as an interpretation. If the destination project already has a suitable typeface, preserve it unless the requested direction needs a different voice.

## Exact default tokens

```css
/* DRIFT / ethereal / DesignKit */
:root {
  --dk-canvas: #EAF2F8;
  --dk-color-scheme: light;
  --dk-surface: #D2E7EC;
  --dk-accent: #CAA5CE;
  --dk-ink: #4C4F68;
  --dk-surface-ink: #4C4F68;
  --dk-on-accent: #191A1F;
  --dk-muted: #4C4F68;
  --dk-surface-muted: #4C4F68;
  --dk-line: #83889a;
  --dk-heading: 'Cormorant Garamond';
  --dk-body: 'DM Sans';
  --dk-radius: 40px;
  --dk-border: 1px;
  --dk-space: 24px;
  --dk-shadow: 0px 10px 24px -5px rgba(52, 48, 68, 0.16);
}
```

## Content

- Notice one good thing (Today): Start small and give it your attention.
- Take a longer breath (This week): A little space for the next useful step.
- Leave a note for tomorrow (Reflection): Leave a note about what worked.

## Adaptation

Use airy spacing and translucent light shapes, anchored by a high-contrast reading surface.

Short fades preserve softness; omit drifting backgrounds and parallax.

Use the page structure for its context, not as a universal template. Keep the user's real content and required interactions.

## Review

- Very pale text on pale backgrounds.
- Slow animations that delay access to content.
- Making every edge indistinct.

Check reading order and text contrast at phone width; ensure native controls retain keyboard and focus feedback. Preview tasks, carts, and schedules are local demonstrations, not backend integrations.

## Resources

Preview: https://designkit-vert.vercel.app/examples/ethereal-reflection-planner/
Full-page preview: https://designkit-vert.vercel.app/preview/ethereal-reflection-planner/
Desktop image: https://designkit-vert.vercel.app/previews/ethereal-reflection-planner-desktop.webp
Phone image: https://designkit-vert.vercel.app/previews/ethereal-reflection-planner-mobile.webp
Kit: https://designkit-vert.vercel.app/kits/examples/ethereal-reflection-planner.zip
JSON: https://designkit-vert.vercel.app/kits/examples/ethereal-reflection-planner.json
