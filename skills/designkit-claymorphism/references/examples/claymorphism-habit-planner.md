# poppy: Claymorphism planner

DesignKit 2.0.0. Original fictional example, reusable under MIT; bundled fonts retain their original OFL licenses.

## Project context

Make room for a few good habits without turning your life into a performance chart.

Headline: Small steps. Softer days.

The primary action: Make a little progress

## Design reasoning

### Composition

Inflated task cards make completion feel friendly while checkboxes keep the state explicit.

### Material and geometry

Puffy rounded surfaces and soft shadows with crisp, readable labels.

### Reading and interaction

Use rounded, inflated forms as a few friendly anchors, with open space around text and controls. A short, critically damped press response suggests softness; reduce it to color feedback when requested.

## Typography

Heading: Nunito
Body: DM Sans

Treat this pairing as an interpretation. If the destination project already has a suitable typeface, preserve it unless the requested direction needs a different voice.

## Exact default tokens

```css
/* poppy / claymorphism / DesignKit */
:root {
  --dk-canvas: #F6F0E8;
  --dk-color-scheme: light;
  --dk-surface: #E8DDF7;
  --dk-accent: #F2B783;
  --dk-ink: #392D47;
  --dk-surface-ink: #392D47;
  --dk-on-accent: #392D47;
  --dk-muted: #726877;
  --dk-surface-muted: #191A1F;
  --dk-line: #897399;
  --dk-heading: 'Nunito';
  --dk-body: 'DM Sans';
  --dk-radius: 28px;
  --dk-border: 1px;
  --dk-space: 24px;
  --dk-shadow: 0px 10px 24px -5px rgba(52, 48, 68, 0.16), inset -3px -3px 6px 0px rgba(255, 255, 255, 0.5);
}
```

## Content

- A glass of water (Today): Start small and give it your attention.
- Ten minutes outside (This week): A little space for the next useful step.
- Something just for you (Reflection): Leave a note about what worked.

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

Preview: https://designkit-vert.vercel.app/examples/claymorphism-habit-planner/
Full-page preview: https://designkit-vert.vercel.app/preview/claymorphism-habit-planner/
Desktop image: https://designkit-vert.vercel.app/previews/claymorphism-habit-planner-desktop.webp
Phone image: https://designkit-vert.vercel.app/previews/claymorphism-habit-planner-mobile.webp
Kit: https://designkit-vert.vercel.app/kits/examples/claymorphism-habit-planner.zip
JSON: https://designkit-vert.vercel.app/kits/examples/claymorphism-habit-planner.json
