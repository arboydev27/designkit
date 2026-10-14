# aura: Glassmorphism planner

DesignKit 2.0.0. Original fictional example, reusable under MIT; bundled fonts retain their original OFL licenses.

## Project context

A calm planning space for the work that deserves your attention today.

Headline: Find a little clarity.

The primary action: Make a little progress

## Design reasoning

### Composition

Frosted planning panels separate tasks from the atmospheric background.

### Material and geometry

Frosted layers, restrained highlights, and a scene that remains visible behind them.

### Reading and interaction

Layer a few translucent panels above a visible scene; keep text on a reliable reading surface. Short opacity and position changes describe depth; provide solid surfaces when transparency is reduced.

## Typography

Heading: Inter
Body: Inter

Treat this pairing as an interpretation. If the destination project already has a suitable typeface, preserve it unless the requested direction needs a different voice.

## Exact default tokens

```css
/* aura / glassmorphism / DesignKit */
:root {
  --dk-canvas: #E4E8F7;
  --dk-color-scheme: light;
  --dk-surface: #F5F6FF;
  --dk-accent: #8463E9;
  --dk-ink: #252443;
  --dk-surface-ink: #252443;
  --dk-on-accent: #000000;
  --dk-muted: #5e5f79;
  --dk-surface-muted: #5e5f79;
  --dk-line: #686982;
  --dk-heading: 'Inter';
  --dk-body: 'Inter';
  --dk-radius: 22px;
  --dk-border: 1px;
  --dk-space: 24px;
  --dk-shadow: 0px 10px 24px -5px rgba(52, 48, 68, 0.16);
}
```

## Content

- Plan one meaningful task (Today): Start small and give it your attention.
- Make room for a break (This week): A little space for the next useful step.
- Close the day with a note (Reflection): Leave a note about what worked.

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

Preview: https://designkit-vert.vercel.app/examples/glassmorphism-focus-app/
Full-page preview: https://designkit-vert.vercel.app/preview/glassmorphism-focus-app/
Desktop image: https://designkit-vert.vercel.app/previews/glassmorphism-focus-app-desktop.webp
Phone image: https://designkit-vert.vercel.app/previews/glassmorphism-focus-app-mobile.webp
Kit: https://designkit-vert.vercel.app/kits/examples/glassmorphism-focus-app.zip
JSON: https://designkit-vert.vercel.app/kits/examples/glassmorphism-focus-app.json
