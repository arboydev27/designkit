# orbital library: Glassmorphism archive

DesignKit 2.0.0. Original fictional example, reusable under MIT; bundled fonts retain their original OFL licenses.

## Project context

An organized collection of notes, experiments, and references for the next good idea.

Headline: Keep your thinking in orbit.

The primary action: Browse the archive

## Design reasoning

### Composition

A searchable archive shows how translucency can support an information-heavy interface.

### Material and geometry

Frosted layers, restrained highlights, and a scene that remains visible behind them.

### Reading and interaction

Layer a few translucent panels above a visible scene; keep text on a reliable reading surface. Short opacity and position changes describe depth; provide solid surfaces when transparency is reduced.

## Typography

Heading: Syne
Body: Inter

Treat this pairing as an interpretation. If the destination project already has a suitable typeface, preserve it unless the requested direction needs a different voice.

## Exact default tokens

```css
/* orbital library / glassmorphism / DesignKit */
:root {
  --dk-canvas: #E2EDF4;
  --dk-color-scheme: light;
  --dk-surface: #F2F8FD;
  --dk-accent: #3F7396;
  --dk-ink: #253D50;
  --dk-surface-ink: #253D50;
  --dk-on-accent: #FFFFFF;
  --dk-muted: #253D50;
  --dk-surface-muted: #253D50;
  --dk-line: #677b89;
  --dk-heading: 'Syne';
  --dk-body: 'Inter';
  --dk-radius: 22px;
  --dk-border: 1px;
  --dk-space: 24px;
  --dk-shadow: 0px 10px 24px -5px rgba(52, 48, 68, 0.16);
}
```

## Content

- Light as a material (Reference): An illustrated working reference.
- Interfaces with depth (Experiment): Notes, patterns, and useful experiments.
- A field guide to focus (Guide): A closer look at an underlying idea.

## Adaptation

Layer a few translucent panels above a visible scene; keep text on a reliable reading surface.

Short opacity and position changes describe depth; provide solid surfaces when transparency is reduced.

Use the page structure for its context, not as a universal template. Keep the user's real content and required interactions.

## Review

- Stacking too many blurred panels.
- Placing small text over unpredictable imagery.
- Depending on transparency to indicate state.

Check reading order and text contrast at phone width; ensure native controls retain keyboard and focus feedback. Preview tasks, carts, and schedules are local demonstrations, not backend integrations.

## Resources

Preview: https://designkit-vert.vercel.app/examples/glassmorphism-research-library/
Full-page preview: https://designkit-vert.vercel.app/preview/glassmorphism-research-library/
Desktop image: https://designkit-vert.vercel.app/previews/glassmorphism-research-library-desktop.webp
Phone image: https://designkit-vert.vercel.app/previews/glassmorphism-research-library-mobile.webp
Kit: https://designkit-vert.vercel.app/kits/examples/glassmorphism-research-library.zip
JSON: https://designkit-vert.vercel.app/kits/examples/glassmorphism-research-library.json
